/*
 * @Author: dgflash
 * @Date: 2022-05-20 22:56:27
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-26 19:44:26
 */
import { Role } from "../Role";

/** 玩家离开房间 */
export class RoleLeaveRoom {
    static leave(e: Role) {
        let pm = e.RoleModel;
        let room = pm.conn.room;

        room.logger.log('玩家离开房间', pm.state);

        // 广播玩家离开房间
        room.broadcastMsg(`server/RoleLeave`, {
            time: new Date,
            roleInfo: pm.info
        });

        // 移除房间中的玩家
        room.removeRole(pm.conn);
    }
}