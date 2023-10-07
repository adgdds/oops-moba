/*
 * @Author: dgflash
 * @Date: 2022-07-01 09:51:14
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-01 18:06:41
 */
import { ApiCall } from "tsrpc";
import { account } from "../../../../module/account/Account";
import { ReqLogined, ResLogined } from "../../../../tsrpc/protocols/match/admin/PtlLogined";

/** 缓存网关服务器发过来的玩家登录数据 */
export async function ApiLogined(call: ApiCall<ReqLogined, ResLogined>) {
    call.logger.log(`匹配服务器[${call.req.user.username}]已登录`);

    var user = call.req.user;
    account.AccountModel.users.set(user.key, user);
    var sso = await account.createSsoToken(user.key);

    call.succ({ __ssoToken: sso });
}