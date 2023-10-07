/*
 * @Author: dgflash
 * @Date: 2022-08-20 10:41:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 14:26:44
 */
import { tween } from "cc";
import { Role } from "../../../../role/Role";
import { EffectShifting } from "../../model/ISkillReport";
import { RoleSkillShiftingComp } from "../../model/RoleSkillShiftingComp";
import { SkillAnimator } from "../SkillAnimator";

/** 冲锋攻击 */
export class SkillAnimator7 extends SkillAnimator {
	protected animCasting() {
		// 位移动画
		var shifting = this.isr.hits[0];
		var caster = this.isr.caster;
		var target = shifting.target as Role;
		caster.RoleView.lootAt(target.RoleView.node.position);
		caster.RoleView.run();

		// 记录位移状态
		caster.add(RoleSkillShiftingComp);

		// 冲锋动画
		tween(caster.RoleView.node)
			.to(0.2, { position: (shifting.effect as EffectShifting).pos }, { easing: 'linear' })
			.call(() => {
				caster.RoleView.idle();
				caster.remove(RoleSkillShiftingComp);

				// 伤害动画
				for (let i = 1; i < this.isr.hits.length; i++) {
					this.onRoleHit(this.isr.hits[i]);
				}
			})
			.start();
	}
}