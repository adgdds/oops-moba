import { BuffViewEffectComp } from "../../buff/view/BuffViewEffect";
import { TrapViewEffectComp } from "../../buff/view/TrapViewEffect";
import { EffectBuff, ISkillReportHit } from "../../skill/model/ISkillReport";

/** 角色BUFF技能受击动画流程 */
export class RoleHit {
    /**
     * BUFF添加/移除动画
     * @param sr        技能战报
     * @param hit       受击战报
     * @param effect    BUFF特效
     */
    static buff(hit: ISkillReportHit, effect: EffectBuff) {
        var buff = effect.buff;
        if (effect.addto) {
            // 同类BUFF只显示一个特效
            if (!buff.has(BuffViewEffectComp)) {
                buff.add(BuffViewEffectComp).hit = hit;
            }
        }
        else {
            buff.destroy();
        }
    }

    /**
     * 陷阱添加/移除动画
     * @param sr        技能战报
     * @param hit       受击战报
     * @param effect    BUFF特效
     */
    static trap(hit: ISkillReportHit, effect: EffectBuff) {
        var buff = effect.buff;
        if (effect.addto) {
            // 同类BUFF只显示一个特效
            if (!buff.has(TrapViewEffectComp)) {
                buff.add(TrapViewEffectComp).hit = hit;
            }
        }
        else {
            buff.destroy();
        }
    }
}