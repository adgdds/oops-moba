/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-31 14:57:18
 */
import { Component, tween, TweenSystem, _decorator } from "cc";
import { MoveTo } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTo";
import { MoveTranslate } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTranslate";
import { RoleState } from "../../../../tsrpc/types/RoleState";
import { RoleViewAnimator } from "../RoleViewAnimator";

const { ccclass, property } = _decorator;

/** 角色位置与服务器位置不同步时，强制同步位置快速平滑移动 */
@ccclass('RoleViewTween')
export class RoleViewTween extends Component {
    /** 角色动画组件 */
    rva: RoleViewAnimator = null!;

    start() {
        this.enabled = false;
        this.rva = this.getComponent(RoleViewAnimator)!;
    }

    move(state: RoleState) {
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node.position as any);

        // 位移
        tween(this.node.position).to(0.1, state.pos, {
            onStart: (target?: object) => {
                var move = this.getComponent(MoveTranslate);
                if (move) {
                    move.destroy();
                }
                var moveTo = this.getComponent(MoveTo);
                if (moveTo) {
                    moveTo.destroy();
                }

                this.rva.isNoMove = true;
                this.rva.idle();
                this.node.setRotation(state.rotation.x, state.rotation.y, state.rotation.z, state.rotation.w);
            },
            onUpdate: (target?: object, ratio?: number) => {
                this.node.position = this.node.position;
            },
            onComplete: (target?: object) => {
                this.rva.isNoMove = false;
            }
        }).start();
    }

    protected onDestroy() {
        TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node.position as any);
    }
}