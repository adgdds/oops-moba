/*
 * @Author: dgflash
 * @Date: 2022-03-28 09:45:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-26 15:58:20
 */
import { animation, _decorator } from "cc";
import { RoleViewAnimator } from "../RoleViewAnimator";

const { ccclass, property } = _decorator;

/** 角色动画*/
@ccclass('RoleViewMarionette')
export class RoleViewMarionette extends RoleViewAnimator {
    @property({ type: animation.AnimationController, tooltip: '动画控制器' })
    animator: animation.AnimationController = null!;

    start() {
        this.isNoMove = false;
    }

    get isNoMove(): boolean {
        return this.animator.getValue("Attack") > 0;
    }
    set isNoMove(value: boolean) {
        this.animator.setValue("NoMove", value);
    }

    idle() {
        this.animator.setValue("Speed", 0);
    }

    run(type: number = 1) {
        this.animator.setValue("Speed", type);
    }

    attack(): void {
        this.animator.setValue("Attack", true);
    }

    die() {
        this.animator.setValue("Die", true);
    }

    revive() {
        this.animator.setValue("Die", false);
        this.animator.setValue("Revive", true);
    }
}