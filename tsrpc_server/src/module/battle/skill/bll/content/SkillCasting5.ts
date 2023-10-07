/*
 * @Author: dgflash
 * @Date: 2022-08-18 15:58:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 16:14:03
 */

import { Role } from "../../../../role/Role";
import { BattleReport } from "../../../common/bll/BattleReport";
import { BuffAdd } from "../../../common/bll/buff/BuffAdd";
import { SkillCasting } from "../SkillCasting";

/** 腐蚀光环 */
export class SkillCasting5 extends SkillCasting {
    autoSelectTarget(): boolean {
        this.target = this.caster;
        return true;
    }

    onCasting(): void {
        if (this.target instanceof Role) {
            var sr = BattleReport.casting(this, this.target);

            var buff = BuffAdd.dot(this.caster, this.target, this.skill, 2);
            BattleReport.skill(sr, this.target, buff);
        }
    }
}