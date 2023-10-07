/*
 * @Author: dgflash
 * @Date: 2022-08-20 10:19:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-13 18:17:10
 */
import { Role } from "../../../role/Role";
import { RoleAnimator } from "../../common/view/RoleAnimator";
import { RoleEffect } from "../../common/view/RoleEffect";
import { RoleHit } from "../../common/view/RoleHit";
import { EffectBuff, EffectDamage, EffectRecovery, EffectTrap, ISkillReportHit } from "../../skill/model/ISkillReport";
import { BuffCasting } from "../bll/BuffCasting";

/** 
 * 技能战报动画逻辑
 * 设计思路：
 * 1、自定义技能动画逻辑与自定义效果计算逻辑分离是为了后续将计算逻辑直接复制到服务器做数值验证用 
 * 2、模板可实现自定义释放、弹道、受击、飘血提示动画
 */
export class BuffAnimator {
    /** 战报数据 */
    bc: BuffCasting;

    /** 施放动画（通用） */
    casting() {
        while (this.bc.hits.length > 0) {
            var hit = this.bc.hits.shift();
            this.onRoleHit(hit);
        }
        this.bc.hits.splice(0, this.bc.hits.length);
    }

    /** 受击事件触发 */
    private onRoleHit(hit: ISkillReportHit) {
        if (hit.effect instanceof EffectDamage) {
            this.onEffectDamage(hit);
        }
        else if (hit.effect instanceof EffectRecovery) {
            this.onEffectRecovery(hit);
        }
        else if (hit.effect instanceof EffectBuff) {
            this.onEffectBuff(hit);
        }
        else if (hit.effect instanceof EffectTrap) {
            this.onEffectTrap(hit);
        }
    }

    protected onEffectDamage(hit: ISkillReportHit) {
        var target = hit.target as Role;

        // 受击特效
        RoleEffect.buff(target as Role, this.bc.buff);

        // 添加生命变化动画队列中
        target.RoleView.hpPrompt.hpTips.push(hit);

        // 死亡动作
        RoleAnimator.die(target, hit.effect);
    }

    protected onEffectRecovery(hit: ISkillReportHit) {
        var target = hit.target as Role;

        // 受击特效
        RoleEffect.buff(target, this.bc.buff);

        // 添加生命变化动画队列中
        target.RoleView.hpPrompt.hpTips.push(hit);
    }

    protected onEffectBuff(hit: ISkillReportHit) {
        RoleHit.buff(hit, hit.effect as EffectBuff);
    }

    protected onEffectTrap(hit: ISkillReportHit) {
        RoleHit.trap(hit, hit.effect as EffectTrap);
    }
}