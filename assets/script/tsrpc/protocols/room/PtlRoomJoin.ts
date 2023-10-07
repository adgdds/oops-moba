/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:53:54
 */
import { RoomDetailed } from "../../types/RoomState";
import { BaseRequest, BaseResponse } from "../base";

/** 房间加入请求数据 */
export interface ReqRoomJoin extends BaseRequest {
    /** 玩家账号编号 */
    userId: number,
    /** 房间编号 */
    roomId: string
}

/** 房间加入响应数据 */
export interface ResRoomJoin extends BaseResponse {
    /** 当前玩家编号 */
    roleId: string,
    /** 房间信息 */
    room: RoomDetailed
}