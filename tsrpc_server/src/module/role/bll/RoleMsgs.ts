/*
 * @Author: dgflash
 * @Date: 2022-05-20 14:07:18
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-30 17:03:20
 */
import { Role } from "../Role";
import { MsgRoleAttack } from "./msg/MsgRoleAttack";
import { MsgRoleMove } from "./msg/MsgRoleMove";
import { MsgRoleState } from "./msg/MsgRoleState";

/** 
 * 玩家连接对象管理 
 * 1、处理各种游戏协议逻辑
 */
export class RoleMsgs {
    static add(e: Role) {
        MsgRoleState.listenMsg(e);
        MsgRoleMove.listenMsg(e);
        MsgRoleAttack.listenMsg(e);
    }

    static remove(e: Role) {
        MsgRoleState.unlistenMsg(e);
        MsgRoleMove.unlistenMsg(e);
        MsgRoleAttack.unlistenMsg(e);
    }
}