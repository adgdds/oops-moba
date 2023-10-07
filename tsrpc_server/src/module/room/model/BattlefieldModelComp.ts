/*
 * @Author: dgflash
 * @Date: 2022-08-17 16:22:27
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 13:39:58
 */
import { ecs } from "../../../core/ecs/ECS";
import { Buff } from "../../battle/buff/Buff";
import { Skill } from "../../battle/skill/Skill";

/** 数据层对象 */
@ecs.register('BattlefieldModel')
export class BattlefieldModelComp extends ecs.Comp {
    /** 当前准备释放的技能 */
    readyCastSkill: Skill = null!;
    /** 间隔触发状态效果 */
    buffs: Map<number, Buff> = new Map();

    reset() {
        this.readyCastSkill = null!;
    }
}