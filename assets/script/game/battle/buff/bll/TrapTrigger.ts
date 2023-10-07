
/*
 * @Author: dgflash
 * @Date: 2022-09-16 16:52:53
 * @LastEditors: dgflash
 * @LastEditTime: 2023-01-19 15:31:38
 */

import { Vec3 } from "cc";
import { Timer } from "../../../../../../extensions/oops-plugin-framework/assets/core/common/timer/Timer";
import { ecs } from "../../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { Buff } from "../Buff";

/** 陷阱圆形范围触发触发器 */
@ecs.register('TrapTrigger')
export class TrapTriggerComp extends ecs.Comp {
    /** 目标位置 */
    target: Vec3 = null!;

    /** 延时器 */
    _timerDelay: Timer = new Timer();
    /** 技能持续时间计时器 */
    _timerDuration: Timer = new Timer();
    /** 延时后启动陷阱触发验证 */
    _startUp: boolean = false;

    /** 技能间隔触发时间 */
    set delay(value: number) {
        this._timerDelay.step = value / 1000;
        this._timerDelay.reset();
    }

    /** 技能持续时间 */
    set duration(value: number) {
        this._timerDuration.step = value / 1000;
        this._timerDuration.reset();
    }

    reset(): void {
        this.target = null!;
        this._startUp = false;
        this._timerDelay.reset();
        this._timerDuration.reset();
    }
}

export class TrapTriggerSystem extends ecs.ComblockSystem implements ecs.ISystemUpdate {
    filter(): ecs.IMatcher {
        return ecs.allOf(TrapTriggerComp);
    }

    update(e: Buff): void {
        var bi = e.get(TrapTriggerComp);
        var bm = e.BuffModel;

        if (!bi._startUp) {
            if (bi._timerDelay.update(this.dt)) bi._startUp = true;
        }
        else {
            bm.casting.target = bi.target;
            bm.casting.onInterval();
            if (bm.casting.hits.length) {
                bm.animator.bc = bm.casting;
                bm.animator.casting();
            }
        }

        // 陷阱持续时间结束
        if (bi._timerDuration.update(this.dt)) {
            e.remove(TrapTriggerComp);
            e.destroy();
        }
    }
}

