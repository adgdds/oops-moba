/*
 * @Author: dgflash
 * @Date: 2022-08-18 15:58:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 16:14:03
 */

import { Vec3 } from "cc";
import { BattleReport } from "../../../common/bll/BattleReport";
import { BuffAdd } from "../../../common/bll/buff/BuffAdd";
import { SkillCasting } from "../SkillCasting";

/** 陷阱技能 */
export class SkillCasting6 extends SkillCasting {
    autoSelectTarget(): boolean {
        this.target = this.caster.RoleView.node.position.clone();
        return true;
    }

    checkDistance(): boolean {
        return true;
    }

    onCasting(): void {
        var sr = BattleReport.casting(this, this.target);
        var trap = BuffAdd.trap(this.caster, this.target as Vec3, this.skill, 4);
        BattleReport.skill(sr, this.target, trap);
    }
}