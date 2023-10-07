/*
 * @Author: dgflash
 * @Date: 2022-05-27 11:33:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:22:45
 */
import { BattleBridge } from "../../../battle/common/bll/BattleBridge";
import { v3, Vec3 } from "../../../common/math/vec3";
import { Role } from "../../Role";

/** 客户端发起攻击命令 */
export class MsgRoleAttack {
    static listenMsg(e: Role) {
        e.RoleModel.conn.listenMsg(`server/RoleAttack`, call => {
            // 技能同步验证逻辑
            let room = e.RoleModel.conn.room;
            let caster = room.RoomModel.members.get(call.msg.uid);
            let target: Role | Vec3 = null!;
            if (call.msg.targetId) {
                target = room.RoomModel.members.get(call.msg.targetId)!;
            }
            else if (call.msg.pos) {
                target = v3(call.msg.pos.x, call.msg.pos.y, call.msg.pos.z);
            }
            let skill = caster!.RoleSkillLearned.skills.get(call.msg.skillId);

            if (skill && caster) {
                BattleBridge.owner = caster;

                let casting = skill.SkillModel.casting;
                casting.caster = caster!;
                casting.target = target!;
                casting.skill = skill;
                casting.onCasting();
            }

            // 技能施放成功广播逻辑
            e.RoleModel.conn.room.broadcastMsg(`server/RoleAttack`, call.msg);
        });
    }

    static unlistenMsg(e: Role) {
        e.RoleModel.conn.unlistenMsgAll(`server/RoleAttack`);
    }
}