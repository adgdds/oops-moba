/*
 * @Author: dgflash
 * @Date: 2022-08-24 16:27:29
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-13 17:19:13
 */

import { RoleAttributeType } from "../../../../role/model/RoleEnum";
import { Role } from "../../../../role/Role";
import { EffectRecovery } from "../../../skill/model/ISkillReport";
import { BattleLogger } from "../BattleLogger";

/** 角色恢复技能计算流程 */
export class RoleRecovery {
    /** 回复生命计算 */
    static normal(caster: Role, target: Role): EffectRecovery {
        var effect = new EffectRecovery();

        // 恢复生命值
        effect.value = caster.RoleModel.attributes.get(RoleAttributeType.ap).value;

        var hp = target.RoleModel.attributes.get(RoleAttributeType.hp);
        var hpMax = target.RoleModel.attributes.get(RoleAttributeType.hpMax).value;
        hp.skill += effect.value;
        if (hp.value > hpMax) {
            hp.skill = hpMax;
        }
        effect.hp = hp.value;
        effect.hpMax = hpMax;

        // 日志
        BattleLogger.log(`【${caster.RoleModel.nickname}】恢复【${target.RoleModel.nickname}】【${effect.value}】点生命,【${target.RoleModel.attributes.get(RoleAttributeType.hp).value}/${target.RoleModel.attributes.get(RoleAttributeType.hpMax).value}】`);

        return effect;
    }
}
