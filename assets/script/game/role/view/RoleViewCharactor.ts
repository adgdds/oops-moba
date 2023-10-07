/*
 * @Author: dgflash
 * @Date: 2022-03-22 17:53:34
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-31 14:29:12
 */
import { Component, Node, Vec3 } from "cc";
import { RoleState } from "../../../tsrpc/types/RoleState";
import { RoleAttributeType } from "../model/RoleEnum";
import { Role } from "../Role";
import { RoleViewJoystick } from "./charactor/RoleViewJoystick";
import { RoleViewTouch } from "./charactor/RoleViewTouch";
import { RoleViewTween } from "./charactor/RoleViewTween";
import { JoystickDataType } from "./joystick/Joystick";
import { RoleViewAnimator } from "./RoleViewAnimator";

/** 
 * 角色行为控制器，管理角色动画与行为
 * 1、角色触摸屏幕移动与动画控制
 * 2、角色摇杆方式移动与动画控制
 * 3、角色攻击动画控制
 */
export class RoleViewCharactor extends Component {
    /** 角色动画组件 */
    rva: RoleViewAnimator = null!;
    /** 角色触摸屏幕控制 */
    rvTouch: RoleViewTouch = null!;
    /** 角色摇杆控制 */
    rvJoystick: RoleViewJoystick = null!;
    /** 角色位置与服务器位置不同步时，强制同步位置快速平滑移动 */
    rvTween: RoleViewTween = null!;

    onLoad() {
        this.rva = this.getComponent(RoleViewAnimator);
        this.rvTouch = this.addComponent(RoleViewTouch);
        this.rvJoystick = this.addComponent(RoleViewJoystick);
        this.rvTween = this.addComponent(RoleViewTween);
    }

    /** 待机动画 */
    idle() {
        this.rvTouch.stop();
        this.rvJoystick.stop();
    }

    /** 攻击动画 */
    attack(type?: number) {
        // 攻击前先待机
        this.idle();
        // 播放攻击动画
        this.rva.attack(type);
    }

    /**
     * 触摸移动
     * @param target    目标位置
     * @param offset    偏移值
     * @param callback  移动完成回调
     */
    moveTouch(role: Role, target: Vec3 | Node, offset: number = 0, callback?: Function) {
        var speed = role.RoleModel.attributes.get(RoleAttributeType.speed).value;
        this.rvTouch.move(target, speed, offset, callback);
    }

    /**
     * 摇杆移动
     * @param role      控制的角色
     * @param data      摇杆数据
     */
    moveJoystick(role: Role, data: JoystickDataType) {
        var speed = role.RoleModel.attributes.get(RoleAttributeType.speed).value;
        this.rvJoystick.move(speed, data);
    }

    /** 角色位置与服务器位置不同步时，强制同步位置快速平滑移动 */
    moveTween(pos: RoleState) {
        this.rvTween.move(pos);
    }
}
