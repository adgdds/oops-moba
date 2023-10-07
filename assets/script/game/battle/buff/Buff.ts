/*
 * @Author: dgflash
 * @Date: 2022-08-16 10:06:35
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-16 17:49:29
 */

import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { BuffIntervalSystem } from "./bll/BuffInterval";
import { TrapTriggerSystem } from "./bll/TrapTrigger";
import { BuffModelComp } from "./model/BuffModelComp";
import { BuffViewComp } from "./view/BuffViewComp";
import { BuffViewEffectComp, BuffViewEffectSystem } from "./view/BuffViewEffect";
import { TrapViewEffecSystem, TrapViewEffectComp } from "./view/TrapViewEffect";

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
    BuffView!: BuffViewComp;

    /** 实始添加的数据层组件 */
    protected init() {
        this.addComponents<ecs.Comp>(
            BuffModelComp
        );
    }

    /** 模块资源释放 */
    destroy() {
        this.remove(BuffViewComp);
        this.remove(BuffViewEffectComp);
        this.remove(TrapViewEffectComp);
        super.destroy();
    }
}

export class EcsBuffSystem extends ecs.System {
    constructor() {
        super();

        this.add(new BuffIntervalSystem());
        this.add(new BuffViewEffectSystem());
        this.add(new TrapTriggerSystem());
        this.add(new TrapViewEffecSystem());
    }
}