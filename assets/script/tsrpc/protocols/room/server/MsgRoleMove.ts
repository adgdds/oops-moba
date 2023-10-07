/*
 * @Author: dgflash
 * @Date: 2022-05-17 13:51:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-05-30 10:32:17
 */
import { RoleMove as RoleMove } from "../../../types/RoleState";

/** 服务器广播玩家控制数据 */
export interface MsgRoleMove {
    /** 房间控制数据 */
    state: RoleMove
}