/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 14:48:20
 */
import { PrefixLogger } from "tsrpc";
import { ecs } from "../../core/ecs/ECS";
import { RoomConnection } from "../../server/room/model/ServerRoomModelComp";
import { sr } from "../../ServerRoom";
import { ServiceType } from "../../tsrpc/protocols/ServiceProtoRoom";
import { RoleDetailed, RolePosition, RoleRotation } from "../../tsrpc/types/RoleState";
import { DbUser } from "../account/bll/User";
import { BattleBridge } from "../battle/common/bll/BattleBridge";
import { TableBuff } from "../common/table/TableBuff";
import { TableSkill } from "../common/table/TableSkill";
import { BattlefieldEnterComp, BattlefieldEnterSystem } from "./bll/BattlefieldEnter";
import { RoomBroadcastRoleStateComp, RoomBroadcastRoleStateSystem } from "./bll/RoomBroadcastRoleState";
import { RoomRoleUtil } from "./bll/RoomRoleUtil";
import { BattlefieldModelComp } from "./model/BattlefieldModelComp";
import { RoomModelComp } from "./model/RoomModelComp";

/** 
 * 游戏房间 
 * 1、状态同步，实时广播玩家游戏中状态（例：位置信息）
 *    优点：
 *          1、服务器可以做逻辑验证
 *    缺点：
 *          1、数据包较大，网络传输较慢时
 *          2、如果与玩家自己的客户端做和解逻辑，容易出现位置信息作弊情况。
 *          3、如果不做和解逻辑，玩家不会被服务器数据拽回来感觉卡顿效果
 *          4、其它玩家做插值移动时，与客户端自己做平滑移动效果略差一点
 * 2、帧同步：
 *    优点：
 *          1、只传输玩家操作状态，数据包小
 *          2、网络正常情况下、玩家移动动画体验较好，所有玩家移动逻辑都是客户端计算
 *    缺点：
 *          1、断线重连接时，需要补帧同步玩家状态
 *          2、客户端随机都是伪随即保持多端计算结果同步
 *          3、网络卡时，玩家玩法控制角色，会朝向一个方向移动（可选策略）
 */
@ecs.register(`Room`)
export class Room extends ecs.Entity {
    RoomModel!: RoomModelComp;
    BattlefieldModel!: BattlefieldModelComp;

    get logger(): PrefixLogger {
        return this.RoomModel.logger;
    }

    protected init() {
        this.addComponents<ecs.Comp>(
            RoomModelComp,
            RoomBroadcastRoleStateComp,
            BattlefieldModelComp,
            BattlefieldEnterComp
        );

        BattleBridge.roles = this.RoomModel.members;
    }

    destroy(): void {
        this.remove(RoomBroadcastRoleStateComp);
        super.destroy();
    }

    /** 添加房间中玩家 */
    addRole(conn: RoomConnection, user: DbUser): RoleDetailed {
        return RoomRoleUtil.addRole(this, conn, user);
    }

    /** 移除房间中玩家 */
    removeRole(conn: RoomConnection) {
        RoomRoleUtil.removeRole(conn);
    }

    /** 添加房间中非玩家角色 */
    addNpc(nickname: string, pos: RolePosition, rotation: RoleRotation) {
        RoomRoleUtil.addNpc(this, nickname, pos, rotation);
    }

    /** 房间内消息广播 */
    broadcastMsg<T extends keyof ServiceType['msg']>(msgName: T, msg: ServiceType['msg'][T]) {
        sr.ServerRoomModel.wssRoom.broadcastMsg(msgName, msg, this.RoomModel.conns);
    }
}

export class EcsRoomSystem extends ecs.System {
    constructor() {
        super();

        TableSkill.load();
        TableBuff.load();

        this.add(new RoomBroadcastRoleStateSystem());
        this.add(new BattlefieldEnterSystem());
    }
}