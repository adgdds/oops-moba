/*
 * @Author: dgflash
 * @Date: 2022-05-27 16:03:19
 * @LastEditors: dgflash
 * @LastEditTime: 2023-05-18 09:56:21
 */

import { v3, Vec3 } from "cc";
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { SkillState } from "../../../tsrpc/protocols/room/server/MsgRoleAttack";
import { ISkillReport } from "../../battle/skill/model/ISkillReport";
import { smc } from "../../common/SingletonModuleComp";
import { Role } from "../../role/Role";
import { Room } from "../Room";

/** 接受服务器角色攻击命令 */
@ecs.register('MsgRoleAttack')
export class MsgRoleAttackComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleAttackSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleAttackComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoleAttack`, v => {
            // 技能施放者
            let caster = e.RoomModel.roles.get(v.uid);
            if (caster == null) {
                Logger.logNet(`编号为【${v.uid}】的技能施放者不存在`);
                return;
            }

            // 释放技能
            let skill = caster.RoleSkillLearned.skills.get(v.skillId);

            // 技能玩家指定目标
            let target: Role | Vec3 = null;
            if (v.targetId) {
                target = e.RoomModel.roles.get(v.targetId);
                if (target == null) {
                    Logger.logNet(`编号为【${v.targetId}】的技能受击者不存在`);
                    return;
                }

                if (v.state == SkillState.Front) {
                    Logger.logNet(`收到【${caster.RoleModel.nickname}】对【${target.RoleModel.nickname}】释放【${skill.SkillModel.table.name}】技能前摇开始`);
                }
                else if (v.state == SkillState.Casting) {
                    Logger.logNet(`收到【${caster.RoleModel.nickname}】对【${target.RoleModel.nickname}】释放【${skill.SkillModel.table.name}】技能成功`);
                }
            }
            else if (v.pos) {
                target = v3(v.pos.x, v.pos.y, v.pos.z);
                Logger.logNet(`收到【${caster.RoleModel.nickname}】对【${target.toString()}】点释放【${skill.SkillModel.table.name}】技能`);
            }

            // 施放技能前摇动作
            if (v.state == SkillState.Front) {
                caster.attack(target, skill);
            }
            // 施放技能计算技能效果
            else if (v.state == SkillState.Casting) {
                let sc = skill.SkillModel.casting;
                sc.caster = caster;
                sc.target = target;
                sc.skill = skill;
                sc.onCasting();

                // 技能战报动画播放
                this.play(sc.srs);
            }
            else if (v.state == SkillState.Back) {

            }
        });
    }

    /** 开始播放技能动画 */
    private play(isrs: ISkillReport[]) {
        console.assert(isrs.length != 0, "技能无战报动画");

        // 单次攻击逻辑，多次连击类技能自行扩展解析战报逻辑
        while (isrs.length > 0) {
            var isr = isrs.shift();

            // 技能动画配置中有自定义技能动画则选用，否则使用默认技能动画
            var animator = isr.skill.SkillModel.animator;
            animator.isr = isr;
            animator.casting();
        }
    }
}