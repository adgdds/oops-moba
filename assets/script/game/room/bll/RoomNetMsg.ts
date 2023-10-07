/*
 * @Author: dgflash
 * @Date: 2022-05-17 10:58:13
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-01 10:58:13
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { MsgRoleAttackComp } from "./MsgRoleAttack";
import { MsgRoleChatComp } from "./MsgRoleChat";
import { MsgRoleJoinComp } from "./MsgRoleJoin";
import { MsgRoleLeaveComp } from "./MsgRoleLeave";
import { MsgRoleMoveComp } from "./MsgRoleMove";
import { MsgRoleReviveComp } from "./MsgRoleRevive";
import { MsgRoomRoleStateComp } from "./MsgRoomRoleState";

/** 自己创建房间 */
@ecs.register('RoomNetMsg')
export class RoomNetMsgComp extends ecs.Comp {
    reset(): void { }
}

export class RoomNetMsgSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.IEntityRemoveSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomNetMsgComp);
    }

    entityEnter(e: Room): void {
        e.add(MsgRoomRoleStateComp);     // 监视服务器角色状态数据
        e.add(MsgRoleJoinComp);          // 监视它角色加入房间
        e.add(MsgRoleLeaveComp);         // 监视它角色离开房间
        e.add(MsgRoleChatComp);          // 监视角色聊天
        e.add(MsgRoleMoveComp);          // 监视角色移动命令
        e.add(MsgRoleAttackComp);        // 监视角色攻击命令
        e.add(MsgRoleReviveComp);        // 监视角色复活命令
    }

    entityRemove(e: Room): void {
        smc.net.wscRoom.disconnect();

        e.remove(MsgRoomRoleStateComp);
        e.remove(MsgRoleJoinComp);
        e.remove(MsgRoleLeaveComp);
        e.remove(MsgRoleChatComp);
        e.remove(MsgRoleMoveComp);
        e.remove(MsgRoleAttackComp);
        e.remove(MsgRoleReviveComp);
    }
}