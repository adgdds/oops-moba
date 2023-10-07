/*
 * @Author: dgflash
 * @Date: 2022-05-18 09:49:43
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 10:02:20
 */
import { RoleState } from "../../../types/RoleState"

/** 房间内所有玩家状态 */
export interface MsgRoomRoleState {
    /** 房间内所有玩家状态数据 */
    states: {
        [uid: string]: RoleState
    }
}