/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-01 16:17:19
 */

import { BaseConf, BaseRequest, BaseResponse } from "../base";

/** 创建房间请求信息 */
export interface ReqRoomCreate extends BaseRequest {
    /** 房间名 */
    roomName: string
}

/** 创建房间响应信息 */
export interface ResRoomCreate extends BaseResponse {
    /** 房间服务器地址 */
    serverUrl: string,
    /** 房间编号 */
    roomId: string
}

export const conf: BaseConf = {
    needLogin: true
}