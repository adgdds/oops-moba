
/*
 * @Author: dgflash
 * @Date: 2021-11-18 17:47:56
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 11:26:54
 */
import { ecs } from "../../../core/ecs/ECS";
import { SkillModelComp } from "./model/SkillModelComp";

/** 技能 */
@ecs.register(`Skill`)
export class Skill extends ecs.Entity {
    // 数据层
    SkillModel!: SkillModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            SkillModelComp);
    }
}

export class EcsSkillSystem extends ecs.System {
    constructor() {
        super();
    }
}
