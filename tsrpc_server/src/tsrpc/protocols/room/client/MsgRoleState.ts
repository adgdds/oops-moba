/*
 * @Author: dgflash
 * @Date: 2022-05-05 17:10:49
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 13:34:37
 */

import { RoleState } from "../../../types/RoleState";


/** 接受客户端同步当前状态数据 */
export type MsgRoleState = Omit<RoleState, 'id'>