/*
 * @Author: dgflash
 * @Date: 2022-03-30 16:55:13
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-26 23:08:40
 */

/** 动画事件 */
export enum AnimatorEvent {
    Run1 = "Run1",
    Run2 = "Run2",
    Attack = "Attack",
    Attack_End = "Attack_End",
}

/** 动画状态 */
export enum AnimatorState {
    Idle = "idle",
    Run = "run",
    Attack = "attack",
    Die = "die",
    Revive = "revive",
}