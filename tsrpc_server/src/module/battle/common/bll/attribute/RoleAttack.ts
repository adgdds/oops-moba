/*
 * @Author: dgflash
 * @Date: 2022-08-18 11:44:34
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-13 17:22:06
 */

import { Vec3 } from "../../../../common/math/vec3";
import { RoleAttributeType } from "../../../../role/model/RoleEnum";
import { Role } from "../../../../role/Role";
import { Buff } from "../../../buff/Buff";
import { EffectDamage, StateType } from "../../../skill/model/ISkillReport";
import { BattleLogger } from "../BattleLogger";

/** 角色攻击流程计算 */
export class RoleAttack {
    /** 普通攻击伤害计算 */
    static normal(caster: Role, target: Role): EffectDamage {
        var effect = new EffectDamage();

        // 初始伤害值
        effect.value = -caster.RoleModel.attributes.get(RoleAttributeType.ad).value;

        // 攻击类型计算（招架、格档、闪避、暴击、免伤）（后续扩展）

        // 护盾计算流程（后续扩展）

        effect.state = this.damage(target, effect.value);
        effect.hp = target.RoleModel.attributes.get(RoleAttributeType.hp).value;
        effect.hpMax = target.RoleModel.attributes.get(RoleAttributeType.hpMax).value;

        // 日志
        BattleLogger.log(`【${caster.RoleModel.nickname}】攻击【${target.RoleModel.nickname}】造成【${effect.value}】点伤害,【${target.RoleModel.attributes.get(RoleAttributeType.hp).value}/${target.RoleModel.attributes.get(RoleAttributeType.hpMax).value}】`);

        return effect;
    }

    /** BUFF攻击伤害计算 */
    static buff(buff: Buff, target: Role | Vec3, value: number): EffectDamage {
        if (target instanceof Role) {
            var effect = new EffectDamage();
            effect.value = value;
            effect.state = RoleAttack.damage(target, effect.value);
            effect.hp = target.RoleModel.attributes.get(RoleAttributeType.hp).value;
            effect.hpMax = target.RoleModel.attributes.get(RoleAttributeType.hpMax).value;

            // 日志
            BattleLogger.log(`【BUFF】【${buff.BuffModel.table.name}】对【${target.RoleModel.nickname}】造成【${effect.value}】点伤害,【${target.RoleModel.attributes.get(RoleAttributeType.hp).value}/${target.RoleModel.attributes.get(RoleAttributeType.hpMax).value}】`);

            return effect;
        }
        return null!;
    }

    /**
     * 伤害扣除
     * @param target 受击目标
     * @param value  伤害值
     */
    static damage(target: Role, value: number) {
        var hp = target.RoleModel.attributes.get(RoleAttributeType.hp);
        hp.skill += value;
        if (hp.value <= 0) {
            hp.skill = 0;

            // 复活
            target.revive();

            return StateType.Die;
        }
        else {
            return StateType.Alive;
        }
    }
}