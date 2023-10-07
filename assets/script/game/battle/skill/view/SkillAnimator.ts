/*
 * @Author: dgflash
 * @Date: 2022-08-20 10:19:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:48:09
 */
import { oops } from "../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { EffectSingleCase } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { Role } from "../../../role/Role";
import { RoleAnimator } from "../../common/view/RoleAnimator";
import { RoleEffect } from "../../common/view/RoleEffect";
import { RoleHit } from "../../common/view/RoleHit";
import { EffectBuff, EffectDamage, EffectRecovery, EffectTrap, ISkillReport, ISkillReportHit } from "../model/ISkillReport";
import { BulletView } from "./ballistic/BulletView";

/** 
 * 技能战报动画逻辑
 * 设计思路：
 * 1、自定义技能动画逻辑与自定义效果计算逻辑分离是为了后续将计算逻辑直接复制到服务器做数值验证用 
 * 2、模板可实现自定义释放、弹道、受击、飘血提示动画
 */
export class SkillAnimator {
    /** 战报数据 */
    isr: ISkillReport;

    /** 施放动画（通用） */
    casting() {
        oops.log.logView(`【${this.isr.skill.SkillModel.table.name}】技能释放动画`);
        this.animCasting();
    }

    /** 施放者自身技能动画（多态） */
    protected animCasting() {
        this.onAttack();
    }

    /** 
     * 攻击动画事件触发 
     * 1、有弹道动画优先播放
     * 2、无弹道触发目标受击流程
     */
    private onAttack() {
        // 弹道技能
        if (this.isr.skill.SkillModel.table.ballistic) {
            oops.log.logView(`【${this.isr.skill.SkillModel.table.name}】技能弹道动画`);
            this.isr.hits.forEach(hit => {
                if (hit.target instanceof Role)
                    hit.target.RoleView.onHit = this.onRoleHit.bind(this, hit);
            });

            this.animBallistic();
        }
        // 瞬发技能
        else {
            oops.log.logView(`【${this.isr.skill.SkillModel.table.name}】瞬发受击动画`);
            this.isr.hits.forEach(hit => {
                this.onRoleHit(hit);
            });
        }
    }

    /** 弹道动画（多态） */
    protected async animBallistic() {
        this.isr.hits.forEach(async hit => {
            var node = await EffectSingleCase.instance.loadAndShow(this.isr.skill.SkillModel.ballisticRes);
            node.parent = oops.game.root;

            var comp =
                node.getComponent(this.isr.skill.SkillModel.ballisticCls) as BulletView ||
                node.addComponent(this.isr.skill.SkillModel.ballisticCls) as BulletView;
            comp.caster = this.isr.caster;
            comp.target = hit.target;
            comp.skill = this.isr.skill;
            comp.launch();
        });
    }

    /** 受击事件触发 */
    protected onRoleHit(hit: ISkillReportHit) {
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
        RoleEffect.skill(this.isr.skill, hit);

        // 添加生命变化动画队列中
        target.RoleView.hpPrompt.hpTips.push(hit);

        // 死亡动作
        RoleAnimator.die(target, hit.effect);
    }

    protected onEffectRecovery(hit: ISkillReportHit) {
        var target = hit.target as Role;

        // 受击特效
        RoleEffect.skill(this.isr.skill, hit);

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