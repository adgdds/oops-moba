/*
 * @Author: dgflash
 * @Date: 2022-05-20 14:04:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-01 11:24:15
 */

import { ecs } from "../../../core/ecs/ECS";
import { RoomConnection } from "../../../server/room/model/ServerRoomModelComp";
import { RoleInfo, RoleState } from "../../../tsrpc/types/RoleState";
import { DbUser } from "../../account/bll/User";
import { Room } from "../../room/Room";
import { RoleNumericMap } from "./attribute/RoleNumericMap";

/** 房间连接状态数据 */
@ecs.register('RoleModel')
export class RoleModelComp extends ecs.Comp {
    /** 玩家帐号数据 */
    user: DbUser = null!;
    /** 角色所在房间 */
    room: Room = null!;
    /** 游戏房间连接 */
    conn: RoomConnection = null!;
    /** 玩家信息 */
    info: RoleInfo = null!;
    /** 玩家位置数据 */
    state: RoleState = null!;
    /** 角色属性 */
    attributes: RoleNumericMap = new RoleNumericMap();

    get nickname(): string {
        return this.info.nickname;
    }

    reset(): void {
        this.user = null!;
        this.room = null!;
        this.info = null!;
        this.state = null!;
        this.attributes.reset();
        this.conn.role = null!;
        this.conn.room = null!;
        this.conn.close();
        this.conn = null!;
    }
}