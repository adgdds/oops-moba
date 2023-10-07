/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-02 00:15:09
 */

import { BaseConf, BaseRequest, BaseResponse } from "../base";

/** 开始匹配请求信息 */
export interface ReqMatchStart extends BaseRequest {

}

/** 开始匹配响应信息 */
export interface ResMatchStart extends BaseResponse {
    /** 房间服务器地址 */
    serverUrl: string,
    /** 房间编号 */
    roomId: string
}

export const conf: BaseConf = {
    needLogin: true
}