/*
 * @Author: dgflash
 * @Date: 2022-08-18 15:58:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 16:14:03
 */

import { Role } from "../../../../role/Role";
import { RoleAttack } from "../../../common/bll/attribute/RoleAttack";
import { BattleReport } from "../../../common/bll/BattleReport";
import { BuffAdd } from "../../../common/bll/buff/BuffAdd";
import { RoleShifting } from "../../../common/bll/RoleShifting";
import { SkillCasting } from "../SkillCasting";

/** 冲锋攻击 */
export class SkillCasting7 extends SkillCasting {
    onCasting(): void {
        if (this.target instanceof Role) {
            var sr = BattleReport.casting(this, this.target);

            // 冲锋效果
            var es = RoleShifting.charge(this.caster, this.target);
            BattleReport.skill(sr, this.target, es);

            // 眩晕
            var vertigo = BuffAdd.dot(this.caster, this.target, this.skill, 3);
            BattleReport.skill(sr, this.target, vertigo);

            // 攻击数值计算
            var ea = RoleAttack.normal(this.caster, this.target);
            BattleReport.skill(sr, this.target, ea);
        }
    }
}