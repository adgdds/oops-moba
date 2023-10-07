/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 09:51:01
 */
import { RoleDetailed } from "../../../types/RoleState"

/** 服务器通知客户端加入房间 */
export interface MsgRoleJoin {
    role: RoleDetailed,
    /** 加入房间时间 */
    time: Date
}