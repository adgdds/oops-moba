import { Node, v3, Vec3 } from "cc";
import { oops } from "../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { EffectSingleCase } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { Role } from "../../../role/Role";
import { Buff } from "../../buff/Buff";
import { ISkillReportHit } from "../../skill/model/ISkillReport";
import { HitPosType } from "../../skill/model/SkillEnum";
import { Skill } from "../../skill/Skill";

/** 角色自身特效 */
export class RoleEffect {
    /**
     * 角色技能自身特效
     * @param sr                        技能战报
     * @param hit                       受击战报
     * @param isPlayFinishedRelease     是否播放完成后删除特效
     */
    static async skill(skill: Skill, hit: ISkillReportHit, isPlayFinishedRelease: boolean = true): Promise<Node> {
        if (skill.SkillModel.table.hit == null) return null;
        return this.show(hit.target as Role, skill.SkillModel.hitPos, skill.SkillModel.hitRes, isPlayFinishedRelease);
    }

    /**
     * 角色BUFF自身特效
     */
    static async buff(target: Role, buff: Buff, isPlayFinishedRelease: boolean = true): Promise<Node> {
        if (buff.BuffModel.table.hit == null) return null;
        return this.show(target, buff.BuffModel.hitPos, buff.BuffModel.hitRes, isPlayFinishedRelease);
    }

    /**
     * 目标角色身上加特效
     * @param target   目标角色
     * @param hitPos   特效高度类型
     * @param hitRes   特效资源
     * @param isPlayFinishedRelease  是否播放完一次后移除
     * @returns 
     */
    private static async show(target: Role, hitPos: HitPosType, hitRes: string, isPlayFinishedRelease: boolean): Promise<Node> {
        var y = 0;                     // 脚底位置
        switch (hitPos) {
            case HitPosType.Foot:
                y = 0;
                break;
            case HitPosType.Waist:
                y = target.RoleView.posEffect.position.y;
                break;
            case HitPosType.Head:
                break;
        }

        return await EffectSingleCase.instance.loadAndShow(
            hitRes,
            target.RoleView.node,
            {
                pos: v3(0, y, 0),
                isPlayFinishedRelease
            });
    }

    /**
     * 地图特效
     * @param hitRes   特效资源
     * @param pos      位置信息
     */
    static async effect(hitRes: string, pos: Vec3): Promise<Node> {
        return await EffectSingleCase.instance.loadAndShow(
            hitRes,
            oops.game.root,
            {
                pos,
                isPlayFinishedRelease: false
            });
    }
}