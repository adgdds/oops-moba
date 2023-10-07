/*
 * @Author: dgflash
 * @Date: 2022-08-20 10:41:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-07 15:37:01
 */

import { Vec3 } from "cc";
import { oops } from "../../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { EffectSingleCase } from "../../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { Role } from "../../../../role/Role";
import { ISkillReportHit } from "../../model/ISkillReport";
import { SkillAnimator } from "../SkillAnimator";

/** 链锁闪电 */
export class SkillAnimator3 extends SkillAnimator {
	private index: number = 0;
	private start = new Vec3();
	private end = new Vec3();
	private offset = new Vec3();

	protected async animBallistic() {
		this.index = 0;
		var hit = this.isr.hits[this.index];
		this.lightning(this.isr.caster, hit, true);
	}

	/**
	 * 闪电特效
	 * @param origin 	发射原点位置
	 * @param hit 		受击战报
	 * @param isCaster 	是否为技能发起者
	 */
	private async lightning(origin: Role, hit: ISkillReportHit, isCaster: boolean) {
		// 加载闪电显示对象
		var node = await EffectSingleCase.instance.loadAndShow(this.isr.skill.SkillModel.ballisticRes);
		var target = hit.target as Role;

		// 闪电起点位置
		if (isCaster)
			this.start.set(origin.RoleView.loose.worldPosition);
		else
			this.start.set(origin.RoleView.posEffect.worldPosition);

		// 闪点终点位置
		this.end.set(target.RoleView.posEffect.worldPosition);

		// 计算闪电方向量
		Vec3.subtract(this.offset, this.end, this.start);

		// 闪电长度
		node.setWorldScale(1, this.offset.length(), 1);			// -0.5为处理动画避免射到目标身体后方导致的效果不理想

		// 闪电方向
		node.forward = this.offset.normalize().negative();
		node.worldPosition = this.start;
		node.parent = oops.game.root;

		// 闪电链持续指定时间后，触发目标角色受击
		setTimeout(() => {
			EffectSingleCase.instance.put(node);
			this.onRoleHit(hit);

			this.index++;
			if (this.index < this.isr.hits.length) {
				this.lightning(target, this.isr.hits[this.index], false);
			}
		}, 100);
	}
}