/*
 * @Author: dgflash
 * @Date: 2022-08-15 15:39:14
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 16:52:18
 */
import { ecs } from "../../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { Buff } from "../../buff/Buff";
import { Skill } from "../Skill";

/** 角色已学会技能配置 */
@ecs.register('RoleSkillLearned')
export class RoleSkillLearnedComp extends ecs.Comp {
    /** 角色已学会技能 */
    skills: Map<number, Skill> = new Map();
    /** 角色身上的持续效果 */
    buffs: Map<number, Buff> = new Map();
    /** 角色施放的陷阱技能 */
    traps: Map<number, Buff> = new Map();

    /** 服务器派发的战斗技能随机种子 */
    seed: number = 0;
    /** 随机数生成器 */
    seedrandom: any = null!;

    reset() {
        this.skills.clear();
        this.buffs.forEach(buff => {
            buff.destroy();
        });
        this.buffs.clear();

        this.traps.forEach(trap => {
            trap.destroy();
        });
        this.traps.clear();
    }
}