/*
 * @Author: dgflash
 * @Date: 2022-04-07 14:40:59
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 17:20:36
 */
import { Component, Label, Vec3, _decorator } from "cc";
import { oops } from "../../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { EffectSingleCase } from "../../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { smc } from "../../../../common/SingletonModuleComp";
import { Role } from "../../../../role/Role";
import { EffectDamage, EffectRecovery, ISkillReportHit } from "../../model/ISkillReport";

const { ccclass, property } = _decorator;

/** 漂血提示动画资源路径 */
var BloodPath = "game/content/skill/blood/";

/** 受击生命提示（防生命提示重叠效果） */
@ccclass('RoleViewHitHpPrompt')
export class RoleViewHitHpPrompt extends Component {
    /** 生命提示动画数据 */
    hpTips: ISkillReportHit[] = [];

    private onoff: boolean = true;

    update(dt: number) {
        if (this.onoff && this.hpTips.length > 0) {
            var hit = this.hpTips.shift();
            var target = hit.target as Role;
            var pos = target.RoleView.posBlood.worldPosition.clone();
            smc.camera.CameraModel.camera.convertToUINode(pos, oops.gui.game, pos);

            if (hit.effect instanceof EffectDamage) {
                target.RoleViewUITop.setHp(hit.effect.hp, hit.effect.hpMax);
                this.damage(pos, hit.effect);
            }
            else if (hit.effect instanceof EffectRecovery) {
                target.RoleViewUITop.setHp(hit.effect.hp, hit.effect.hpMax);
                this.recovery(pos, hit.effect);
            }

            this.onoff = false;
            setTimeout(() => {
                this.onoff = true;
            }, 100);
        }
    }

    /** 恢复数值提示动画 */
    private recovery(pos: Vec3, effect: EffectRecovery) {
        var node = EffectSingleCase.instance.show(BloodPath + "recovery", oops.gui.game, { pos: pos, isPlayFinishedRelease: true });
        var lab_blood = node.getChildByName("lab_blood").getComponent(Label);
        lab_blood.string = effect.value.toString();
    }

    /** 伤害数值提示动画 */
    private damage(pos: Vec3, effect: EffectDamage) {
        // 显示对象池方式管理资源显示
        var node = EffectSingleCase.instance.show(BloodPath + "damage", oops.gui.game, { pos: pos, isPlayFinishedRelease: true });
        var lab_blood = node.getChildByName("lab_blood").getComponent(Label);
        lab_blood.string = effect.value.toString();
    }
}