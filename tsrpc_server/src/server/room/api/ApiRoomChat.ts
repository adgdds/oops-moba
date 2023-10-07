/*
 * @Author: dgflash
 * @Date: 2022-05-16 14:44:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:08:07
 */
import { ApiCall } from "tsrpc";
import { ReqRoomChat, ResRoomChat } from "../../../tsrpc/protocols/room/PtlRoomChat";
import { RoomConnection } from "../model/ServerRoomModelComp";

/** 房间内聊天 */
export async function ApiRoomChat(call: ApiCall<ReqRoomChat, ResRoomChat>) {
    const conn = call.conn as RoomConnection;
    const room = conn.room;

    room.broadcastMsg(`server/Chat`, {
        time: new Date,
        roleInfo: conn.role.RoleModel.info,
        content: call.req.content
    })

    call.succ({});
}