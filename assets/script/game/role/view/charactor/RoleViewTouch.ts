/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2023-07-27 09:53:15
 */
import { Component, Node, Vec3, _decorator } from "cc";
import { MoveTo } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTo";
import { MoveTranslate } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTranslate";
import { smc } from "../../../common/SingletonModuleComp";
import { RoleViewNavLine } from "../effect/RoleViewNavLine";
import { RoleViewRunSmoke } from "../effect/RoleViewRunSmoke";
import { RoleViewAnimator } from "../RoleViewAnimator";

const { ccclass, property } = _decorator;

/** 角色触摸移动控制 */
@ccclass('RoleViewTouch')
export class RoleViewTouch extends Component {
    /** 角色动画组件 */
    rva: RoleViewAnimator = null!;
    /** 角色导航线 */
    rvnl: RoleViewNavLine = null!;
    /** 跑步时地面灰尘 */
    rvrs: RoleViewRunSmoke = null!;

    start() {
        this.rva = this.getComponent(RoleViewAnimator)!;
        this.rvnl = this.getComponent(RoleViewNavLine)!;
        this.rvrs = this.getComponent(RoleViewRunSmoke)!;
    }

    move(target: Vec3 | Node, speed: number, offset: number = 0, callback?: Function) {
        // 禁止移动状态验证
        if (this.rva.isNoMove) return;

        // 停止摇杆移动方式
        var move = this.getComponent(MoveTranslate);
        if (move) {
            move.destroy();
        }

        // 导航提示
        var pos;
        if (target instanceof Vec3)
            pos = target;
        else
            pos = target.position;
        this.rva.lootAt(pos);                // 设置角色朝向

        // 触摸移动
        var moveTo = this.getComponent(MoveTo) || this.addComponent(MoveTo);
        moveTo.enabled = true;
        moveTo.node = this.node;
        moveTo.target = target;
        moveTo.offset = offset;
        moveTo.speed = speed;
        moveTo.hasYAxis = true;
        moveTo.onStart = () => {
            this.rva.run();                 // 播放跑步动作
            this.rvrs.show();               // 播放跑步灰尘特效

            // 播放引导线
            if (this == smc.room.RoomModel.owner.RoleView.getComponent(RoleViewTouch)) {
                this.rvnl.show(pos);
            }
        }
        moveTo.onComplete = () => {
            this.stop();
            callback && callback();
        };
    }

    /** 待机动画 */
    stop() {
        // 触摸移动停止
        var moveTo = this.getComponent(MoveTo);
        if (moveTo) {
            moveTo.destroy();
        }

        // 待机动画
        this.rva.idle();                    // 播放待机动作
        this.rvrs.hide();                   // 隐藏跑步灰尘特效

        // 隐藏引导线
        if (this == smc.room.RoomModel.owner.RoleView.getComponent(RoleViewTouch)) {
            this.rvnl.hide();
        }
    }
}