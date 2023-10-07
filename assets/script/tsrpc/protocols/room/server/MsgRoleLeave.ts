/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 09:51:08
 */

import { RoleInfo } from "../../../types/RoleState";

/** 服务器通知客户端离开房间 */
export interface MsgRoleLeave {
    /** 离开房间时间 */
    time: Date,
    /** 离开房间的玩家信息 */
    roleInfo: RoleInfo
}