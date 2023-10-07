/*
 * @Author: dgflash
 * @Date: 2022-08-16 10:06:35
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 11:41:14
 */

import { ecs } from "../../../core/ecs/ECS";
import { BuffIntervalComp, BuffIntervalSystem } from "./bll/BuffInterval";
import { TrapTriggerComp, TrapTriggerSystem } from "./bll/TrapTrigger";
import { BuffModelComp } from "./model/BuffModelComp";

/** 
 * 状态类技能
 * 1、技能添加状态效果
 * 2、技能移除状态效果
 * 3、自定义状态效果逻辑
 * 4、持续间隔出发、功能标记、持续属性变化
 */
@ecs.register(`Buff`)
export class Buff extends ecs.Entity {
    BuffModel!: BuffModelComp;

    /** 实始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(
            BuffModelComp
        );
    }

    destroy(): void {
        this.remove(BuffIntervalComp);
        this.remove(TrapTriggerComp);
        super.destroy();
    }
}

export class EcsBuffSystem extends ecs.System {
    constructor() {
        super();

        this.add(new BuffIntervalSystem());
        this.add(new TrapTriggerSystem());
    }
}