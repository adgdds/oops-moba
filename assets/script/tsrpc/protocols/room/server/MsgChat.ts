/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 09:50:54
 */

import { RoleInfo } from "../../../types/RoleState";

/** 服务器广播聊天数据 */
export interface MsgChat {
    /** 发送时间 */
    time: Date,
    /** 玩家信息 */
    roleInfo: RoleInfo,
    /** 聊天内容 */
    content: string
}