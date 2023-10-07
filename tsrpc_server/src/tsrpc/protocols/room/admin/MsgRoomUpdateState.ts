/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-04 11:48:52
 */

import { RoomState } from "../../../types/RoomState";
import { BaseConf } from "../../base";

/** 更新房间状态信息 */
export interface MsgRoomUpdateState {
    /** 房间数组 */
    rooms: RoomState[];
}

export const conf: BaseConf = {
    needCheckAddress: true
}