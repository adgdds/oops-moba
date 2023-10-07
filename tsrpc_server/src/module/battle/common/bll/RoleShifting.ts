/*
 * @Author: dgflash
 * @Date: 2022-09-09 13:37:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 09:38:53
 */

import { Vec3 } from "../../../common/math/vec3";
import { Role } from "../../../role/Role";
import { EffectShifting } from "../../skill/model/ISkillReport";

/** 角色位移效果 */
export class RoleShifting {
    /** 冲锋 */
    static charge(caster: Role, target: Role): EffectShifting {
        var caster_node = caster.RoleView.node;
        var target_node = target.RoleView.node;

        var effect = new EffectShifting();

        // 施放者与目标的方向->归一化->取反->距离放大（可选）
        var dir = Vec3.subtract(new Vec3, target_node.position, caster_node.position).normalize().negative();

        // 避免重合
        effect.pos = Vec3.add(new Vec3, target_node.position, dir);

        return effect;
    }
}