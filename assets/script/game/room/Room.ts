/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:28:43
 */

import { Vec3 } from "cc";
import { Logger } from "../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { JsonUtil } from "../../../../extensions/oops-plugin-framework/assets/core/utils/JsonUtil";
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { MsgRoleMove } from "../../tsrpc/protocols/room/client/MsgRoleMove";
import { SkillState } from "../../tsrpc/protocols/room/server/MsgRoleAttack";
import { smc } from "../common/SingletonModuleComp";
import { TableBuff } from "../common/table/TableBuff";
import { TableSkill } from "../common/table/TableSkill";
import { Role } from "../role/Role";
import { BattlefieldEnterSystem } from "./bll/BattlefieldEnter";
import { MsgRoleAttackSystem } from "./bll/MsgRoleAttack";
import { MsgRoleChatSystem } from "./bll/MsgRoleChat";
import { MsgRoleJoinSystem } from "./bll/MsgRoleJoin";
import { MsgRoleLeaveSystem } from "./bll/MsgRoleLeave";
import { MsgRoleMoveSystem } from "./bll/MsgRoleMove";
import { MsgRoleReviveSystem } from "./bll/MsgRoleRevive";
import { MsgRoomRoleStateSystem } from "./bll/MsgRoomRoleState";
import { RoomNetMsgSystem } from "./bll/RoomNetMsg";
import { RoomOwnerCreateComp, RoomOwnerCreateSystem } from "./bll/RoomOwnerCreate";
import { RoomOwnerJoinSystem } from "./bll/RoomOwnerJoin";
import { RoomOwnerLeaveComp, RoomOwnerLeaveSystem } from "./bll/RoomOwnerLeave";
import { RoomOwnerMatchStartComp, RoomOwnerMatchStartSystem } from "./bll/RoomOwnerMatchStart";
import { RoomServerConnectComp, RoomServerConnectSystem } from "./bll/RoomServerConnect";
import { BattlefieldModelComp } from "./model/BattlefieldModelComp";
import { RoomModelComp } from "./model/RoomModelComp";

/** 房间管理 */
@ecs.register(`Room`)
export class Room extends ecs.Entity {
    RoomModel!: RoomModelComp;
    BattlefieldModel!: BattlefieldModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            RoomModelComp,
            BattlefieldModelComp);
    }

    destroy() {
        this.remove(BattlefieldModelComp);
        super.destroy();
    }

    /**
     * 开始匹配
     * @param playerName  玩家名
     */
    matchStart(playerName: string) {
        this.add(RoomOwnerMatchStartComp).nickname = playerName;
    }

    /** 停止匹配 */
    matchStop() {

    }

    /**
     * 创建房间
     * @param roomName    房间名
     * @param nickname    玩家昵称
     */
    create(roomName: string, nickname: string) {
        var comp = this.add(RoomOwnerCreateComp);
        comp.roomName = roomName;
        comp.nickname = nickname;
    }

    /**
     * 加入房间
     * @param roomId        房间编号
     * @param serverUrl     房间服地址
     * @param nickname      玩家昵称
     */
    join(roomId?: string, serverUrl?: string, nickname?: string) {
        if (roomId) this.RoomModel.roomId = roomId;
        if (serverUrl) this.RoomModel.serverUrl = serverUrl;
        if (nickname) this.RoomModel.nickname = nickname;
        this.add(RoomServerConnectComp);
    }

    /** 离开房间 */
    leave() {
        this.add(RoomOwnerLeaveComp);
    }

    /** 房间聊天 */
    async chat(content: string) {
        let ret = await smc.net.wscRoom.callApi(`RoomChat`, {
            content: content
        });

        if (!ret.isSucc) {
            Logger.logBusiness("【房间】发送聊天信息失败");
        }
    }

    /**
     * 玩家摇杆移动
     * @param vector    移动方向
     * @param angle     移动角度
     */
    roleMoveJoystick(vector?: Vec3, angle?: number) {
        var data: MsgRoleMove = {};
        if (vector) {
            data = {
                joystick: true,
                vector,
                angle
            }
        }
        smc.net.wscRoom.sendMsg(`client/RoleMove`, data);
    }

    /**
     * 玩家移动到目标位置
     * @param target    目标位置
     * @param skillId   移动到技能范围发动技能
     * @param targetId  技能攻击目标编号
     */
    roleMoveTarget(target: Vec3, skillId?: number, targetId?: string) {
        var data: MsgRoleMove = { joystick: false, target, skillId, targetId };
        smc.net.wscRoom.sendMsg(`client/RoleMove`, data);
    }

    /**
     * 玩家攻击
     * @param attacker  攻击者
     * @param target    受击者
     * @param skilleId  技能编号
     */
    roleAttack(attacker: Role, target: Role | Vec3 | string, skilleId: number, state: SkillState) {
        var targetId = null;
        var pos = null;
        if (target instanceof Role)
            targetId = target.RoleModel.id;
        else if (target instanceof Vec3)
            pos = target
        else
            targetId = target;

        smc.net.wscRoom.sendMsg(`server/RoleAttack`, {
            uid: attacker.RoleModel.id,
            skillId: skilleId,
            state,
            targetId,
            pos
        });
    }
}

export class EcsRoomSystem extends ecs.System {
    constructor() {
        super();

        this.loadTable();

        this.add(new RoomNetMsgSystem());
        this.add(new RoomServerConnectSystem());
        this.add(new RoomOwnerMatchStartSystem());
        this.add(new RoomOwnerCreateSystem());
        this.add(new RoomOwnerJoinSystem());
        this.add(new RoomOwnerLeaveSystem());
        this.add(new MsgRoomRoleStateSystem());
        this.add(new MsgRoleJoinSystem());
        this.add(new MsgRoleLeaveSystem());
        this.add(new MsgRoleChatSystem());
        this.add(new MsgRoleMoveSystem());
        this.add(new MsgRoleAttackSystem());
        this.add(new MsgRoleReviveSystem());
        this.add(new BattlefieldEnterSystem());
    }

    async loadTable() {
        await JsonUtil.loadAsync(TableSkill.TableName);
        await JsonUtil.loadAsync(TableBuff.TableName);
    }
}