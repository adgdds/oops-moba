/*
 * @Author: dgflash
 * @Date: 2022-07-02 05:07:07
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 15:31:00
 */
import { DbUser } from "../../../../module/account/bll/User";
import { BaseConf, BaseRequest } from "../../base";

/** 获取玩家信息请求数据 */
export interface ReqUserInfo extends BaseRequest {

}

/** 获取玩家信息响应数据 */
export interface ResUserInfo {
    user: DbUser
}

export const conf: BaseConf = {
    needCheckAddress: true
}