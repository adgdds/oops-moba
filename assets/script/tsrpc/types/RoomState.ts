/*
 * @Author: dgflash
 * @Date: 2022-05-16 12:00:15
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 18:38:33
 */
import { uint } from "tsrpc-proto";
import { RoleDetailed, RoleInfo, RolePosition, RoleRotation } from "./RoleState";

/** 与匹配服务器同步的房间数据 */
export interface RoomState {
    /** 房间编号 */
    id: string,
    /** 房间名 */
    name: string,
    /** 房间当前用户数量 */
    amount: uint,
    /** 房间最大用户数量 */
    max: uint,
    /** 房间信息的最后更新时间 */
    timeUpdate: uint,
    /** 为 undefined 代表不在匹配中 */
    timeStartMatch?: uint
}

/** 房间详细数据 */
export interface RoomDetailed {
    /** 房间编号 */
    id: string,
    /** 房间名 */
    name: string,
    /** 房间可容纳的最大人数 */
    max: uint,
    /** 上一次空房的时间（undefined 代表房内有人） 用于定时解散无人的房间 */
    timeLastEmpty?: number,
    /** 开始匹配的时间，`undefined` 代表不在匹配中 */
    timeStartMatch?: number,
    /** 房间信息的最后更新时间 */
    timeUpdate: number,
    /** 房间内的用户 */
    roles: RoleDetailed[],
    /** 房间内非玩家角色 */
    npcs: RoleDetailed[],
    /** 历史聊天信息（只保留最近的 N 条） */
    messages: {
        time: Date,
        role: RoleInfo,
        content: string
    }[]
}