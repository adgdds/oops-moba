/*
 * @Author: dgflash
 * @Date: 2022-03-28 09:45:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 15:03:25
 */
import { _decorator } from "cc";
import { AnimatorSkeletal } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/AnimatorSkeletal";
import { AnimatorStateLogic } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/core/AnimatorStateLogic";
import { AnimatorState } from "../RoleAnimatorEnum";
import { RoleViewAnimator } from "../RoleViewAnimator";
import { AnimatorAttackState } from "./AnimatorAttackState";
import { AnimatorDieState } from "./AnimatorDieState";
import { AnimatorEventHandler } from "./AnimatorEventHandler";
import { AnimatorReviveState } from "./AnimatorReviveState";
import { AnimatorRunState } from "./AnimatorRunState";

const { ccclass, property } = _decorator;

/** 角色动画 */
@ccclass('RoleViewAnimatorSkeletal')
export class RoleViewAnimatorSkeletal extends RoleViewAnimator {
    @property({ type: AnimatorSkeletal, tooltip: '动画控制器' })
    animator: AnimatorSkeletal = null!;

    start() {
        // 动画状态机
        let anim = new AnimatorEventHandler();
        let map: Map<string, AnimatorStateLogic> = new Map();
        map.set(AnimatorState.Run, new AnimatorRunState(this, anim));
        map.set(AnimatorState.Attack, new AnimatorAttackState(this, anim));
        map.set(AnimatorState.Die, new AnimatorDieState(this, anim));
        map.set(AnimatorState.Revive, new AnimatorReviveState(this, anim));

        // 玩家有界面输入控制
        this.animator!.onInit(map, anim, (fromState: string, toState: string) => {

        });

        // 测试攻击速度提升
        this.animator.getState(AnimatorState.Attack)!.speed = 3;
        this.isNoMove = false;
    }

    get isNoMove(): boolean {
        return this.animator.getBool("NoMove");
    }
    set isNoMove(value: boolean) {
        this.animator.setBool("NoMove", value);
    }

    idle() {
        this.animator.setNumber("Speed", 0);
    }

    run(type: number = 1) {
        this.animator.setNumber("Speed", type);
    }

    attack() {
        this.animator.setTrigger("Attack");
    }

    die() {
        this.animator.setBool("Die", true);
    }

    revive() {
        this.animator.setBool("Die", false);
        this.animator.setTrigger("Revive");
    }
}