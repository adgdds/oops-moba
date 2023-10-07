/*
 * @Author: dgflash
 * @Date: 2022-04-11 09:52:33
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-31 14:17:16
 */
import { Component, Vec3, _decorator } from "cc";
import { MoveRigidBody } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveRigidBody";
import { MoveTo } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTo";
import { MoveTranslate } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTranslate";
import { smc } from "../../../common/SingletonModuleComp";
import { RoleViewNavLine } from "../effect/RoleViewNavLine";
import { RoleViewRunSmoke } from "../effect/RoleViewRunSmoke";
import { JoystickDataType } from "../joystick/Joystick";
import { RoleViewAnimator } from "../RoleViewAnimator";

const { ccclass, property } = _decorator;

/** 角色摇杆移动控制 */
@ccclass('RoleViewJoystick')
export class RoleViewJoystick extends Component {
    /** 是否为物理方式控制 */
    physics: boolean = false;

    /** 角色动画组件 */
    rva: RoleViewAnimator = null!;
    /** 角色导航线 */
    rvnl: RoleViewNavLine = null!;
    /** 跑步时地面灰尘 */
    rvrs: RoleViewRunSmoke = null!;

    private velocity: Vec3 = new Vec3();

    start() {
        this.rva = this.getComponent(RoleViewAnimator)!;
        this.rvnl = this.getComponent(RoleViewNavLine)!;
        this.rvrs = this.getComponent(RoleViewRunSmoke)!;
    }

    move(speed: number, data: JoystickDataType) {
        // 禁止移动状态验证
        if (this.rva.isNoMove) return;

        // 移动方向计算
        var offset_camera = smc.camera.CameraModel.orbit.targetRotation.y;
        var angle_animator = data.angle + offset_camera;                              // 摄像机Y轴旋转了135度补上
        this.velocity.x = -data.vector.x;
        this.velocity.z = data.vector.y;
        // this.velocity.normalize();

        // 移除直线移动组件
        var moveTo = this.getComponent(MoveTo);
        if (moveTo) {
            moveTo.destroy();
            this.rva.idle();
            this.rvnl.hide();
        }

        // 摇杆移动
        var move;
        if (this.physics)
            move = this.getComponent(MoveRigidBody) || this.addComponent(MoveRigidBody);
        else
            move = this.getComponent(MoveTranslate) || this.addComponent(MoveTranslate);

        if (move) {
            move.enabled = true;
            move.speed = speed;
            move.velocity = this.velocity;
            this.rva.rotation(angle_animator);       // 角色旋转朝向
            this.rva.run(speed);                     // 播放跑步动作
            this.rvrs.show();                        // 播放跑步灰尘特效
        }
    }

    /** 待机动画 */
    stop() {
        var move;
        if (this.physics)
            move = this.getComponent(MoveRigidBody);
        else
            move = this.getComponent(MoveTranslate);

        if (move) {
            move.destroy();
            move.speed = 0;
            move.velocity.set(Vec3.ZERO);
        }

        // 待机动画
        this.rva.idle();                             // 播放待机动作
    }
}