/*
 * @Author: dgflash
 * @Date: 2022-05-16 14:44:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 13:51:47
 */
import { ApiCall, PrefixLogger } from "tsrpc";
import * as uuid from 'uuid';
import { ecs } from "../../../../core/ecs/ECS";
import { Config } from "../../../../module/config/Config";
import { Room } from "../../../../module/room/Room";
import { sr } from "../../../../ServerRoom";
import { ReqRoomCreate, ResRoomCreate } from "../../../../tsrpc/protocols/room/admin/PtlRoomCreate";

/** 匹配服务器通知创建房间 */
export async function ApiRoomCreate(call: ApiCall<ReqRoomCreate, ResRoomCreate>) {
    let room = ecs.getEntity<Room>(Room);
    let rm = room.RoomModel;

    rm.data = {
        id: uuid.v4(),
        max: Config.room.max_user_num,
        name: call.req.roomName,
        roles: [],
        npcs: [],
        messages: [],
        timeStartMatch: Date.now(),
        timeUpdate: Date.now()
    };

    /** 房间默认NPC逻辑开始 */
    room.addNpc("靶子1", { x: 10.348768903200611, y: 1.6001317054033297, z: -1.6186361156938958 }, { x: 0, y: 0, z: 0, w: 0 });
    room.addNpc("靶子2", { x: 5.821206395531185, y: 1.5870302174363964, z: 2.969326790016373 }, { x: 0, y: 0, z: 0, w: 0 });
    room.addNpc("靶子3", { x: 0.8674733515101634, y: 1.5793065324363624, z: 8.011606335184727 }, { x: 0, y: 0, z: 0, w: 0 });
    /** 房间默认NPC逻辑结束 */

    rm.logger = new PrefixLogger({
        logger: sr.ServerRoomModel.wssRoom.logger,
        prefixs: [`[Room ${rm.data.id}]`],
    });

    sr.ServerRoomModel.rooms.set(room.RoomModel.data.id, room);

    call.succ({
        roomId: room.RoomModel.data.id
    });
}