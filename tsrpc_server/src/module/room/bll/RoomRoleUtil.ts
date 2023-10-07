/*
 * @Author: dgflash
 * @Date: 2022-08-24 09:41:37
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 17:16:16
 */
import * as uuid from 'uuid';
import { ecs } from "../../../core/ecs/ECS";
import { RoomConnection } from "../../../server/room/model/ServerRoomModelComp";
import { RoleDetailed, RoleInfo, RolePosition, RoleRotation } from "../../../tsrpc/types/RoleState";
import { DbUser } from "../../account/bll/User";
import { RoleSkillLearnedComp } from '../../battle/skill/model/RoleSkillLearnedComp';
import { Skill } from '../../battle/skill/Skill';
import { RoleAttributeType } from "../../role/model/RoleEnum";
import { Role } from "../../role/Role";
import { Room } from "../Room";

export class RoomRoleUtil {
    static addRole(room: Room, conn: RoomConnection, user: DbUser): RoleDetailed {
        let role = ecs.getEntity<Role>(Role);
        conn.room = room;
        conn.role = role;

        let ri: RoleInfo = {
            id: uuid.v4(),
            nickname: user.username
        }

        let roomModel = room.RoomModel;
        roomModel.conns.push(conn);                          // 新玩家连接状态添加

        let roleModel = role.RoleModel;
        roleModel.user = user;
        roleModel.room = room;
        roleModel.info = ri;
        roleModel.conn = conn;

        // 新玩家位置数据加到即时同步集合中
        let rms = {
            id: ri.id,
            pos: user.pos!,
            rotation: user.rotation!,
            action: "idle"
        }
        roleModel.state = rms;
        roomModel.states[rms.id] = roleModel.state;

        // 创建新玩家详细数据加到房间数组中
        this.createRoleAttributes(conn.role)
        var rd: RoleDetailed = {
            roleInfo: roleModel.info,
            state: rms,
            attributes: roleModel.attributes.states
        }
        roomModel.data.roles.push(rd);
        roomModel.members.set(rms.id, role);

        roomModel.data.timeLastEmpty = undefined;            // 房间空房时间
        roomModel.data.timeUpdate = Date.now();              // 房间更新时间

        // 添加与客户端交互的监听
        role.addMsgs();

        // 创建技能数据（测试数据）
        var srl = role.get(RoleSkillLearnedComp)!;
        var skill1 = ecs.getEntity<Skill>(Skill);
        skill1.SkillModel.id = 1;
        srl.skills.set(skill1.SkillModel.id, skill1);

        var skill2 = ecs.getEntity<Skill>(Skill);
        skill2.SkillModel.id = 2;
        srl.skills.set(skill2.SkillModel.id, skill2);

        var skill3 = ecs.getEntity<Skill>(Skill);
        skill3.SkillModel.id = 3;
        srl.skills.set(skill3.SkillModel.id, skill3);

        var skill4 = ecs.getEntity<Skill>(Skill);
        skill4.SkillModel.id = 4;
        srl.skills.set(skill4.SkillModel.id, skill4);

        var skill5 = ecs.getEntity<Skill>(Skill);
        skill5.SkillModel.id = 5;
        srl.skills.set(skill5.SkillModel.id, skill5);

        var skill6 = ecs.getEntity<Skill>(Skill);
        skill6.SkillModel.id = 6;
        srl.skills.set(skill6.SkillModel.id, skill6);

        var skill7 = ecs.getEntity<Skill>(Skill);
        skill7.SkillModel.id = 7;
        srl.skills.set(skill7.SkillModel.id, skill7);

        return rd;
    }

    /** 移除房间中玩家 */
    static removeRole(conn: RoomConnection) {
        let uid = conn.role.RoleModel.state.id;
        let roomModel = conn.room.RoomModel;
        delete roomModel.states[uid];                                 // 从房间中移除玩家状态数据
        roomModel.members.delete(uid);                                // 从房间中移除玩家详细数据
        roomModel.conns.removeOne(v => v === conn);                   // 从房间中移除离开的连接对象
        roomModel.data.roles.removeOne(v => v.state.id === uid);      // 从房间玩家列表中移除离开的玩家
        roomModel.data.timeUpdate = Date.now();                       // 记录房间更新时间
        conn.role.removeMsgs();                                       // 删除玩家监听的逻辑消息
        conn.role.destroy();
        conn.role = null!;
        conn.room = null!;

        // 记录上一次空房时间
        if (roomModel.conns.length === 0) {
            roomModel.data.timeLastEmpty = Date.now();
        }
    }

    static addNpc(room: Room, nickname: string, pos: RolePosition, rotation: RoleRotation) {
        let npc = ecs.getEntity<Role>(Role);
        let roomModel = room.RoomModel;
        let roleModel = npc.RoleModel;
        const ri: RoleInfo = {
            id: uuid.v4(),
            nickname
        }
        roleModel.info = ri;
        roleModel.room = room;

        roleModel.state = {
            id: ri.id,
            pos: pos,
            rotation: rotation,
            action: "idle"
        }

        let rms = roleModel.state;
        roomModel.states[rms.id] = rms;

        // 创建新玩家详细数据加到房间数组中
        let rma = npc.RoleModel.attributes;
        rma.get(RoleAttributeType.hpMax).base = 200;
        rma.get(RoleAttributeType.hp).skill = 200;
        rma.get(RoleAttributeType.speed).base = 5;
        rma.get(RoleAttributeType.ad).base = 50;
        rma.get(RoleAttributeType.ap).base = 50;

        let rd: RoleDetailed = {
            roleInfo: ri,
            state: rms,
            attributes: npc.RoleModel.attributes.states
        }
        roomModel.data.npcs.push(rd);
        roomModel.members.set(rms.id, npc);
    }

    private static createRoleAttributes(target: Role) {
        let rma = target.RoleModel.attributes;
        rma.get(RoleAttributeType.hpMax).base = 350;
        rma.get(RoleAttributeType.hp).skill = 350;
        rma.get(RoleAttributeType.speed).base = 5;
        rma.get(RoleAttributeType.ad).base = 50;
        rma.get(RoleAttributeType.ap).base = 8;
    }
}