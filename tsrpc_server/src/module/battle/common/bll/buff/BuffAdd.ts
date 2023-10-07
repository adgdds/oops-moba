import { ecs } from "../../../../../core/ecs/ECS";
import { Vec3 } from "../../../../common/math/vec3";
import { Role } from "../../../../role/Role";
import { BuffIntervalComp } from "../../../buff/bll/BuffInterval";
import { TrapTriggerComp } from "../../../buff/bll/TrapTrigger";
import { Buff } from "../../../buff/Buff";
import { EffectBuff, EffectTrap } from "../../../skill/model/ISkillReport";
import { Skill } from "../../../skill/Skill";
import { BattleLogger } from "../BattleLogger";

/*
 * @Author: dgflash
 * @Date: 2022-09-16 17:30:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 16:37:07
 */
export class BuffAdd {
    /**
     * 添加持续时间间隔触发型BUFF
     * @param caster 技能施放者
     * @param target 技能受击者
     * @param skill  施放BUFF的技能
     * @param buffId 施放BUFF的编号
     */
    static dot(caster: Role, target: Role, skill: Skill, buffId: number): EffectBuff {
        var buff = target.RoleSkillLearned.buffs.get(buffId);
        if (buff == null) {
            buff = this.create(caster, target, skill, buffId);
        }
        else {
            this.cover(caster, target, skill, buff);
        }

        // 添加同类BUFF时，重置持续时间
        var comp = buff.get(BuffIntervalComp) || buff.add(BuffIntervalComp);
        comp.interval = buff.BuffModel.table.interval;
        comp.duration = buff.BuffModel.table.duration;

        return this.effect(buff);
    }

    /** 添加陷阱技能效果 */
    static trap(caster: Role, target: Vec3, skill: Skill, buffId: number): EffectTrap {
        var buff = ecs.getEntity<Buff>(Buff);
        buff.BuffModel.id = buffId;

        var casting = buff.BuffModel.casting;
        casting.buff = buff;
        casting.skill = skill;
        casting.caster = caster;

        // 记录技能施放者的陷阱技能
        caster.RoleSkillLearned.traps.set(buff.BuffModel.id, buff);

        var comp = buff.add(TrapTriggerComp);
        comp.target = target;
        comp.duration = buff.BuffModel.table.duration;
        comp.delay = buff.BuffModel.table.delay;

        // BUFF添加战报
        var effect = new EffectTrap();
        effect.addto = true;
        effect.buff = buff;
        effect.target = target;

        return effect;
    }

    /**
    * 加永久持续型BUFF
    * @param caster 技能施放者
    * @param target 技能受击者
    * @param skill  施放BUFF的技能
    * @param buffId 施放BUFF的编号
    */
    static forever(caster: Role, target: Role, skill: Skill, buffId: number): EffectBuff {
        var buff = target.RoleSkillLearned.buffs.get(buffId);
        if (buff == null) {
            buff = this.create(caster, target, skill, buffId);
            return this.effect(buff);
        }
        else {
            console.error(`不能添加编号为【${buffId}】的永久BUFF多次`);
        }
        return null!;
    }

    /** 添加持续时间层数叠加型BUFF */

    /** 创建BUFF逻辑 */
    private static create(caster: Role, target: Role, skill: Skill, buffId: number): Buff {
        var buff = ecs.getEntity<Buff>(Buff);
        buff.BuffModel.id = buffId;

        // 目标身上记录BUFF数据
        target.RoleSkillLearned.buffs.set(buff.BuffModel.id, buff);

        var casting = buff.BuffModel.casting;
        casting.buff = buff;
        casting.skill = skill;
        casting.caster = caster;
        casting.target = target;
        casting.layer = 1;

        BattleLogger.log(`【添加】【${caster.RoleModel.nickname}】的【${skill.SkillModel.table.name}】技能向【${target.RoleModel.nickname}】施放的【${buff.BuffModel.table.name}】BUFF，层数为【${casting.layer}/${buff.BuffModel.table.overlying}】`);

        return buff;
    }

    /** 覆盖BUFF逻辑 */
    private static cover(caster: Role, target: Role, skill: Skill, buff: Buff) {
        var casting = buff.BuffModel.casting;

        // BUFF覆盖：持续时间刷新、层数增加（记录在策划配置表中）
        if (casting.layer < buff.BuffModel.table.overlying) casting.layer++;

        BattleLogger.log(`【覆盖】【${caster.RoleModel.nickname}】的【${skill.SkillModel.table.name}】技能向【${target.RoleModel.nickname}】施放的【${buff.BuffModel.table.name}】BUFF，层数为【${casting.layer}/${buff.BuffModel.table.overlying}】`);
    }

    /** 效果战报 */
    private static effect(buff: Buff): EffectBuff {
        // BUFF添加战报
        var effect = new EffectBuff();
        effect.addto = true;
        effect.buff = buff;

        return effect;
    }
}