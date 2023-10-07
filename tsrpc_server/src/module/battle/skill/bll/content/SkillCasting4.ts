/*
 * @Author: dgflash
 * @Date: 2022-08-18 15:58:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:24:12
 */

import { Role } from "../../../../role/Role";
import { RoleRecovery } from "../../../common/bll/attribute/RoleRecovery";
import { BattleReport } from "../../../common/bll/BattleReport";
import { SkillCasting } from "../SkillCasting";

/** 恢复生命 */
export class SkillCasting4 extends SkillCasting {
    onCasting(): void {
        if (this.target instanceof Role) {
            // 技能施放战报
            var sr = BattleReport.casting(this, this.target);

            // 恢复数值计算
            var effect = RoleRecovery.normal(this.caster, this.target);

            // 技能受击战报
            BattleReport.skill(sr, this.target, effect);
        }
    }
}