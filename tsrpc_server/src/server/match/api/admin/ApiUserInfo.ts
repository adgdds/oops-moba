/*
 * @Author: dgflash
 * @Date: 2022-07-02 05:07:07
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-02 05:15:12
 */
import { ApiCall } from "tsrpc";
import { account } from "../../../../module/account/Account";
import { ReqUserInfo, ResUserInfo } from "../../../../tsrpc/protocols/match/admin/PtlUserInfo";

/** 获取用户信息 */
export async function ApiUserInfo(call: ApiCall<ReqUserInfo, ResUserInfo>) {
    if (call.req.__ssoToken) {
        var dUser = account.parseSSO(call.req.__ssoToken);
        if (dUser) call.succ({ user: dUser });
    }
    else {
        call.error("登录令牌不存在");
    }
}