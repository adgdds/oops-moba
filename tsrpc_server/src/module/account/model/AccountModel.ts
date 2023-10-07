/*
 * @Author: dgflash
 * @Date: 2022-06-30 10:37:02
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 15:36:18
 */

import { ecs } from "../../../core/ecs/ECS";
import { DbUser } from "../bll/User";

/** 匹配数据 */
@ecs.register('AccountModel')
export class AccountModelComp extends ecs.Comp {
    /** 在线用户数据 */
    users = new Map<number, DbUser>();

    /** 用户通行证信息 */
    ssoTokens: { [token: string]: { expiredTime: number, key: number } } = {};

    reset(): void {
        this.users.clear();
        this.ssoTokens = {};
    }
}