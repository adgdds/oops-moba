/*
 * @Author: dgflash
 * @Date: 2022-05-16 16:41:19
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:05:16
 */
import { Role } from "../../Role";

/** 客户端发数据同步当前玩家状态数据 */
export class MsgRoleState {
    static listenMsg(e: Role) {
        e.RoleModel.conn.listenMsg(`client/RoleState`, call => {
            var msg = call.msg;
            var state = e.RoleModel.state;
            state.pos = msg.pos;
            state.rotation = msg.rotation;
            state.action = msg.action;
        });
    }

    static unlistenMsg(e: Role) {
        e.RoleModel.conn.unlistenMsgAll(`client/RoleState`);
    }
}