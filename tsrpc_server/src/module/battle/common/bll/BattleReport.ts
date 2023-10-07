/*
 * @Author: dgflash
 * @Date: 2022-08-24 13:44:24
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-21 17:45:21
 */
import { Vec3 } from "../../../common/math/vec3";
import { Role } from "../../../role/Role";
import { SkillCasting } from "../../skill/bll/SkillCasting";
import { Effect, ISkillReport, ISkillReportHit } from "../../skill/model/ISkillReport";
import { BattleBridge } from "./BattleBridge";

/** 技能动画战报 */
export class BattleReport {
    /** 生成一次施放技能战报 */
    static casting(sc: SkillCasting, target: Role | Vec3): ISkillReport {
        if (BattleBridge.server) return null!;

        // 生成战报
        if (sc) {
            var sr: ISkillReport = {
                caster: sc.caster,
                target: target,
                skill: sc.skill,
                hits: []
            };
            sc.srs.push(sr);
        }
        else {
            // 服务器推送复活命令时的战报
            var sr: ISkillReport = {
                caster: null!,
                target: target,
                skill: null!,
                hits: []
            };
        }

        return sr;
    }

    /** 生成技能产生的受击效果战报 */
    static skill(sr: ISkillReport, target: Role | Vec3, effect: Effect) {
        if (BattleBridge.server) return null!;

        sr.hits.push({ target: target, effect });
    }

    /** 生成BUFF产添加或移除战报 */
    static buff(hits: ISkillReportHit[], target: Role | Vec3, effect: Effect) {
        if (BattleBridge.server) return null!;

        hits.push({ target: target, effect });
    }
}