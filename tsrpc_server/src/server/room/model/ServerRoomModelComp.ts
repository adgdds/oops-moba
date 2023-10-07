/*
 * @Author: dgflash
 * @Date: 2022-05-06 11:03:18
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 18:10:28
 */

import { HttpClient, WsConnection, WsServer } from "tsrpc";
import { Collection } from "../../../core/collection/Collection";
import { ecs } from "../../../core/ecs/ECS";
import { Role } from "../../../module/role/Role";
import { Room } from "../../../module/room/Room";
import { ServiceType as ServiceTypeMatch } from "../../../tsrpc/protocols/ServiceProtoMatch";
import { ServiceType as ServiceTypeRoom } from "../../../tsrpc/protocols/ServiceProtoRoom";

/** 房间服务器数据 */
@ecs.register('ServerRoomModel')
export class ServerRoomModelComp extends ecs.Comp {
    /** 房间 websocket 服务器 */
    wssRoom: WsServer<ServiceTypeRoom> = null!;

    /** 与匹配服务器连接的 HTTP 客户端 */
    hcMatch: HttpClient<ServiceTypeMatch> = null!;

    /** 与匹配服务器的 WebSocket 连接对象 */
    matchServerConn?: WsConnection<ServiceTypeRoom>;

    /** 房间对象集合 */
    rooms: Collection<string, Room> = new Collection();

    reset(): void {

    }
}

/** 房间服务器中的客户端 WebSocket 连接类型 */
export type RoomConnection = WsConnection<ServiceTypeRoom> & {
    /** 游戏房间对象 */
    room: Room;
    /** 游戏玩家对象 */
    role: Role;
};