/*
 * @Author: dgflash
 * @Date: 2022-02-14 09:46:50
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-28 13:53:22
 */
import { animation, _decorator } from "cc";
const { ccclass, property } = _decorator;

@ccclass("StateAttackAfterComponent")
export class StateAttackAfterComponent extends animation.StateMachineComponent {
    /**
     * Called when a motion state right after it entered.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateEnter(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
        console.log("后摇");
    }

    /**
     * Called when a motion state is going to be exited.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateExit(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {
    }

    /**
     * Called when a motion state updated except for the first and last frame.
     * @param controller The animation controller it within.
     * @param motionStateStatus The status of the motion.
     */
    public onMotionStateUpdate(controller: animation.AnimationController, motionStateStatus: Readonly<animation.MotionStateStatus>): void {

    }

    /**
     * Called when a state machine right after it entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineEnter(controller: animation.AnimationController) {

    }

    /**
     * Called when a state machine right after it entered.
     * @param controller The animation controller it within.
     */
    public onStateMachineExit(controller: animation.AnimationController) {

    }
}
