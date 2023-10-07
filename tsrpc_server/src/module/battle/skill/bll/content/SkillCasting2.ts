/*
 * @Author: dgflash
 * @Date: 2022-09-13 15:21:30
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:24:03
 */

import { Role } from "../../../../role/Role";
import { BattleReport } from "../../../common/bll/BattleReport";
import { BuffAdd } from "../../../common/bll/buff/BuffAdd";
import { SkillCasting } from "../SkillCasting";

/** 持续流血 */
export class SkillCasting2 extends SkillCasting {
    onCasting(): void {
        if (this.target instanceof Role) {
            // 技能施放战报
            var sr = BattleReport.casting(this, this.target);

            // 攻击数值计算
            var effect = BuffAdd.dot(this.caster, this.target, this.skill, 1);

            // 技能受击战报
            BattleReport.skill(sr, this.target, effect);
        }
    }
}