/*
 * @Author: dgflash
 * @Date: 2022-09-16 17:28:25
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-16 18:20:20
 */

import { Role } from "../../../../role/Role";
import { Buff } from "../../../buff/Buff";
import { EffectBuff } from "../../../skill/model/ISkillReport";
import { BattleBridge } from "../BattleBridge";
import { BattleLogger } from "../BattleLogger";

export class BuffRemove {
    /**
    * 移除指定BUFF
    * @param target 技能受击者
    * @param buffId 施放BUFF的编号
    */
    static rbBuffId(target: Role, buffId: number): EffectBuff {
        var buff = target.RoleSkillLearned.buffs.get(buffId);
        if (buff) {
            return this.buff(buff);
        }
        return null!;
    }

    /** 移除指定类型BUFF */
    static byIsGain(target: Role, isGain: number): EffectBuff[] {
        var buffs = target.RoleSkillLearned.buffs;
        if (buffs.size > 0) {
            var effects: EffectBuff[] = [];
            buffs.forEach(buff => {
                if (buff.BuffModel.table.isGain == isGain) {
                    effects.push(this.buff(buff));
                }
            });
            return effects;
        }
        return null!;
    }

    /**
     * 删除陷阱
     * @param buff BUFF对象
     */
    static trap(buff: Buff): EffectBuff {
        var trigger = buff.BuffModel.casting;
        BattleLogger.log(`【移除】【${trigger.caster.RoleModel.nickname}】施放的【${buff.BuffModel.table.name}】陷阱`);

        trigger.caster.RoleSkillLearned.traps.delete(buff.BuffModel.id);

        if (BattleBridge.server) {
            buff.destroy();
            return null!;
        }
        else {
            var effect = new EffectBuff();
            effect.addto = false;
            effect.buff = buff;
            return effect;
        }
    }

    /** BUFF持续时间结束 */
    static buff(buff: Buff): EffectBuff {
        var trigger = buff.BuffModel.casting;
        var target = trigger.target as Role;
        try {
            BattleLogger.log(`【移除】【${trigger.caster.RoleModel.nickname}】的【${trigger.skill.SkillModel.table.name}】技能向【${target.RoleModel.nickname}】施放的【${buff.BuffModel.table.name}】BUFF`);
        }
        catch {
            // BUFF施放者可能在施放后，BUFF效果还没有结束时，就退出房间
        }
        target.RoleSkillLearned.buffs.delete(buff.BuffModel.id);

        if (BattleBridge.server) {
            buff.destroy();
            return null!;
        }
        else {
            var effect = new EffectBuff();
            effect.addto = false;
            effect.buff = buff;
            return effect;
        }
    }

    /** 目标死亡移除所有BUFF */
    static byTargetDead(target: Role): EffectBuff[] {
        var buffs = target.RoleSkillLearned.buffs;
        if (buffs.size > 0) {
            var effects: EffectBuff[] = [];
            buffs.forEach(buff => {
                effects.push(this.buff(buff));
            });
            buffs.clear();
            return effects;
        }

        return null!;
    }
}