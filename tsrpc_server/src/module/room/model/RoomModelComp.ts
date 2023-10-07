/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 13:41:25
 */
import { PrefixLogger } from "tsrpc";
import { Collection } from "../../../core/collection/Collection";
import { ecs } from "../../../core/ecs/ECS";
import { RoomConnection } from "../../../server/room/model/ServerRoomModelComp";
import { RoleState } from "../../../tsrpc/types/RoleState";
import { RoomDetailed } from "../../../tsrpc/types/RoomState";
import { Role } from "../../role/Role";

/** 游戏房间数据 */
@ecs.register('RoomModel')
export class RoomModelComp extends ecs.Comp {
    /** 日志前缀 */
    logger: PrefixLogger = null!;
    /** 游戏房间数据 */
    data: RoomDetailed = null!;
    /** 游戏房间所有回话状态（用于广播数据参数） */
    conns: RoomConnection[] = [];
    /** 用于同步位置数据的玩家状态 */
    states: {
        [uid: string]: RoleState
    } = {};
    /** 游戏房间所有成员详细信息 */
    members: Collection<string, Role> = new Collection();

    reset(): void {
        this.logger = null!;
        this.data = null!;
        this.conns.splice(0, this.conns.length);
        for (let uid in this.states) delete this.states[uid];
    }
}