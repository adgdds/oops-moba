/*
 * @Author: dgflash
 * @Date: 2022-08-19 21:08:26
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:24:07
 */

import { Role } from "../../../../role/Role";
import { RoleAttack } from "../../../common/bll/attribute/RoleAttack";
import { BattleBridge } from "../../../common/bll/BattleBridge";
import { BattleReport } from "../../../common/bll/BattleReport";
import { SkillCasting } from "../SkillCasting";

/** 链锁闪电 */
export class SkillCasting3 extends SkillCasting {
    onCasting(): void {
        if (this.target instanceof Role) {
            var sr = BattleReport.casting(this, this.target);

            // 选中房间所有其它玩家攻击，开发者可自定义细节逻辑
            for (let i = 0; i < BattleBridge.roles.array.length; i++) {
                var target = BattleBridge.roles.array[i];
                if (target != this.caster && !target.die) {
                    // 攻击数值计算
                    var effect = RoleAttack.normal(this.caster, target);

                    // 技能受击战报
                    BattleReport.skill(sr, this.target, effect);
                }
            }
        }
    }
}