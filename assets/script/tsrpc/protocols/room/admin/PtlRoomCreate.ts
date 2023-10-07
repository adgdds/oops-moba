/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-02 00:15:02
 */

import { BaseConf } from "../../base";

/** 创建房间请求数据 */
export interface ReqRoomCreate {
    /** 房间名 */
    roomName: string
}

/** 创建房间反回数据 */
export interface ResRoomCreate {
    /** 房间编号 */
    roomId: string
}

export const conf: BaseConf = {
    needCheckAddress: true
}