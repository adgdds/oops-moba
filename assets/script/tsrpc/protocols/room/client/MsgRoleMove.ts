/*
 * @Author: dgflash
 * @Date: 2022-05-17 14:34:59
 * @LastEditors: dgflash
 * @LastEditTime: 2022-05-30 10:33:39
 */
import { RoleMove } from "../../../types/RoleState";

/** 接受客户端的游戏操作数据 */
export type MsgRoleMove = Omit<RoleMove, 'uid'>
