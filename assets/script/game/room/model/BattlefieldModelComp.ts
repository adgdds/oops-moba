/*
 * @Author: dgflash
 * @Date: 2022-08-17 16:22:27
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 14:11:23
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { Buff } from "../../battle/buff/Buff";
import { Skill } from "../../battle/skill/Skill";

/** 数据层对象 */
@ecs.register('BattlefieldModel')
export class BattlefieldModelComp extends ecs.Comp {
    /** 当前准备释放的技能 */
    readyCastSkill: Skill = null!;

    reset() {
        this.readyCastSkill = null!;
    }
}