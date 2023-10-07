/*
 * @Author: dgflash
 * @Date: 2022-02-14 09:46:50
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-26 15:32:35
 */
import { animation, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("StateAttackComponent")
export class StateAttackComponent extends animation.StateMachineComponent {
    /**
     * Called when a motion state right after it entered.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateEnter(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // Can be overrode
        console.log("进入攻击状态");
        console.timeEnd("AAA");

    }

    /**
     * Called when a motion state is going to be exited.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateExit(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // controller.setValue("Attack", 0);
        // console.log("退出攻击状态");
    }

    /**
     * Called when a motion state updated except for the first and last frame.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateUpdate(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        // Can be overrode
        // console.log("更新攻击状态");
    }

    /**
     * Called when a state machine right after it entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineEnter(controller: animation.AnimationController) {
        // Can be overrode
        // console.log("onStateMachineEnter");
    }

    /**
     * Called when a state machine right after it entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineExit(controller: animation.AnimationController) {
        // console.log("onStateMachineExit");
    }
}
