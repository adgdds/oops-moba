/*
 * @Author: dgflash
 * @Date: 2022-03-22 17:53:34
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-07 15:51:31
 */
import { Component, macro, Node, Quat, Vec3, _decorator } from "cc";

const { ccclass, property } = _decorator;

/** 
 * 角色动画接口 
 * 注：修改指定动画剪辑播放速度时，要修改状态机中的配置，否则动画组件的配置中的速度会覆盖动态设置的值
 */
export class RoleViewAnimator extends Component {
    @property({ type: Node, tooltip: '飘血提示位置' })
    posBlood: Node = null!;

    @property({ type: Node, tooltip: '名子提示位置' })
    posName: Node = null!;

    @property({ type: Node, tooltip: '自身特效位置' })
    posEffect: Node = null!;

    @property({ type: Node, tooltip: '弓箭发射的节点' })
    loose: Node = null!

    @property({ type: Node, tooltip: '手节点' })
    hand: Node = null!

    @property({ type: Node, tooltip: '攻击时候展示的弓箭' })
    arrow: Node = null!;

    /**
     * 是否不可移动
     * @returns true 为不可移动
     */
    get isNoMove(): boolean { return false; }
    set isNoMove(value: boolean) { }

    /** 待机动作 */
    idle() { };

    /** 跑动动作 */
    run(type?: number) { };

    /** 攻击动作 */
    attack(type?: number) { };

    /** 死亡动作 */
    die() { }

    /** 复活动作 */
    revive() { }

    /** 模型朝向目标方向 */
    lootAt(target: Vec3) {
        var x = this.node.position.x - target.x;
        var z = this.node.position.z - target.z;
        var y = (Math.atan2(x, z) * macro.DEG) % 360;
        this.node.setRotationFromEuler(0, y + 180, 0);
    }

    /** 旋转到指定角度 */
    rotation(val: Vec3 | Quat | number) {
        if (val instanceof Vec3) {
            this.node.eulerAngles = val;
        }
        else if (val instanceof Quat) {
            this.node.setRotation(val);
        }
        else {
            this.node.setRotationFromEuler(0, val - 90, 0);
        }
    }
}
