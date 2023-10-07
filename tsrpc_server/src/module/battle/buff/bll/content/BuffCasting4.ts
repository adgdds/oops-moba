/*
 * @Author: dgflash
 * @Date: 2022-09-13 16:46:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-16 17:12:41
 */
import { Vec3 } from "../../../../common/math/vec3";
import { RoleAttack } from "../../../common/bll/attribute/RoleAttack";
import { BattleBridge } from "../../../common/bll/BattleBridge";
import { BuffRemove } from "../../../common/bll/buff/BuffRemove";
import { BuffCasting } from "../BuffCasting";

/** 陷阱效果 */
export class BuffCasting4 extends BuffCasting {
    onInterval(): void {
        var bm = this.buff.BuffModel;

        for (let i = 0; i < BattleBridge.roles.array.length; i++) {
            var target = BattleBridge.roles.array[i];
            if (!target.die && target != bm.casting.caster) {
                // 玩家与敌人的方向向量
                var d = Vec3.distance(bm.casting.target as Vec3, target.RoleView.node.position);
                // 陷阱触发范围
                if (d <= 1.5) {
                    RoleAttack.buff(this.buff, target, -99);
                    BuffRemove.trap(this.buff);
                    break;
                }
            }
        }
    }
}