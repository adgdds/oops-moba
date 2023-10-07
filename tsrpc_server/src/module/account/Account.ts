/*
 * @Author: dgflash
 * @Date: 2022-06-30 10:36:30
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-01 15:07:06
 */
import { HttpServer, WsServer } from "tsrpc";
import * as uuid from "uuid";
import { ecs } from "../../core/ecs/ECS";
import { DbUser } from "./bll/User";
import { BaseConf, BaseRequest } from "../../tsrpc/protocols/base";
import { Config } from "../config/Config";
import { AccountModelComp } from "./model/AccountModel";

/** 登录令牌过期时间为7天 */
const SSO_VALID_TIME = 86400000 * 7;

/** 帐号管理 */
@ecs.register(`Account`)
export class Account extends ecs.Entity {
    AccountModel!: AccountModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            AccountModelComp);
    }

    /** 创建登录令牌 */
    createSsoToken(uid: number): string {
        let token = uuid.v1();
        let expiredTime = Date.now() + SSO_VALID_TIME;          // 过期时间

        // 删除在其它客户端登录的同名用户
        var current: string = null!;
        for (var key in this.AccountModel.ssoTokens) {
            var value = this.AccountModel.ssoTokens[key];
            if (value.key == uid) {
                current = key
                break;
            }
        }
        if (current) {
            delete this.AccountModel.ssoTokens[current];
        }

        this.AccountModel.ssoTokens[token] = {
            key: uid,
            expiredTime: expiredTime
        };

        return token;
    }

    /** 释放令牌 */
    destroySsoToken(ssoToken: string) {
        delete this.AccountModel.ssoTokens[ssoToken];
    }

    /** 检查服务器身份 */
    checkAuth(server: HttpServer | WsServer) {
        server.flows.preApiCallFlow.push(async call => {
            let conf: BaseConf | undefined = call.service.conf;

            // 执行 API 接口实现之前通过令牌获取当前用户信息
            let req = call.req as BaseRequest;
            if (req.__ssoToken) {
                call.user = this.parseSSO(req.__ssoToken);
            }

            // 验证请求客户端地址是否在白名单列表中
            if (conf?.needCheckAddress && (Config.ips as any)[call.conn.ip] == undefined) {
                await call.error('没有访问权限', { code: 'NEED_AUTHORITY' });
                return null;
            }
            // 玩家必须登录才可以访问服务
            else if (conf?.needLogin && !call.user) {
                await call.error('登录后获取访问权限', { code: 'NEED_LOGIN' });
                return null;
            }

            return call;
        });
    }

    /** 执行 API 接口实现之前通过令牌获取当前用户信息 */
    parseSSO(ssoToken: string): DbUser | undefined {
        let info = this.AccountModel.ssoTokens[ssoToken];

        // 令牌不存在或已过期
        if (!info || info.expiredTime < Date.now()) {
            return undefined;
        }

        // 解析用户信息
        let user = this.AccountModel.users.get(info.key);
        if (!user) {
            return undefined;
        }

        // 延长过期时间
        info.expiredTime = Date.now() + SSO_VALID_TIME;

        return user;
    }
}

declare module 'tsrpc' {
    export interface ApiCall {
        user?: DbUser;
    }
}

export var account = ecs.getEntity<Account>(Account);