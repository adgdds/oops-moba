/*
 * @Author: dgflash
 * @Date: 2022-07-01 09:51:08
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 15:30:49
 */

import { DbUser } from "../../../../module/account/bll/User";
import { BaseConf, BaseRequest, BaseResponse } from "../../base";

/** 网关服务器通知匹配服务登录成功请求数据 */
export interface ReqLogined extends BaseRequest {
    /** 玩家数据 */
    user: DbUser;
}

/** 网关服务器通知匹配服务登录成功响应数据 */
export interface ResLogined extends BaseResponse {

}

export const conf: BaseConf = {
    needCheckAddress: true
}