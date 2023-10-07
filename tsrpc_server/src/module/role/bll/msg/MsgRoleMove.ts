/*
 * @Author: dgflash
 * @Date: 2022-05-20 13:53:29
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-01 09:41:05
 */
import { RoomConnection } from "../../../../server/room/model/ServerRoomModelComp";
import { Role } from "../../Role";

/** 客户端发数据房间转发移动命令（摇杆方向、目标方向） */
export class MsgRoleMove {
    static listenMsg(e: Role) {
        e.RoleModel.conn.listenMsg(`client/RoleMove`, call => {
            const conn = call.conn as RoomConnection;
            e.RoleModel.conn.room.broadcastMsg(`server/RoleMove`, {
                state: {
                    uid: conn.role.RoleModel.state.id,
                    ...call.msg
                }
            });
        });
    }

    static unlistenMsg(e: Role) {
        e.RoleModel.conn.unlistenMsgAll(`client/RoleMove`);
    }
}