/*
 * @Author: dgflash
 * @Date: 2022-09-13 10:34:39
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-16 17:15:15
 */
import { Vec3 } from "../../../common/math/vec3";
import { Role } from "../../../role/Role";
import { ISkillReportHit } from "../../skill/model/ISkillReport";
import { Skill } from "../../skill/Skill";
import { Buff } from "../Buff";

/** 状态效果触发逻辑 */
export class BuffCasting {
    /** 施放效果的技能 */
    skill: Skill = null!;
    /** 当前施放的技能 */
    buff: Buff = null!;
    /** 效果施放者 */
    caster: Role = null!;
    /** 效果受击者 */
    target: Role | Vec3 = null!;
    /** BUFF当前层数 */
    layer: number = 0;
    /** 状态效果受击战报 */
    hits: ISkillReportHit[] = [];

    /** ----------效果触发事件---------- */

    /** 间隔固定时间触发 */
    onInterval() { }

    /** 自己释放释放技能时触发 */
    onCasting() { }

    /** 目标受击时触发 */
    onHit() { }

    /** 目标死亡时触发 */
    onDead() { }
}

