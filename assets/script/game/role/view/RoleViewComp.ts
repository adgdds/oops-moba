/*
 * @Author: dgflash
 * @Date: 2021-11-18 17:42:59
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-26 15:24:52
 */

import { Node, Quat, Vec3, _decorator } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";
import { RoleState } from "../../../tsrpc/types/RoleState";
import { RoleViewHitHpPrompt } from "../../battle/skill/view/hit/RoleViewHitHpPrompt";
import { Role } from "../Role";
import { RoleViewCharactor } from "./RoleViewCharactor";

const { ccclass, property } = _decorator;

/** 角色显示组件 */
@ccclass('RoleViewComp')
@ecs.register('RoleView', false)
export class RoleViewComp extends CCComp {
    /** 受击生命提示 */
    hpPrompt: RoleViewHitHpPrompt = null!;

    /** 施放技能事件 */
    onAttack: Function = null!;
    /** 受到攻击事件 */
    onHit: Function = null!;

    /** 角色行为控制器 */
    private rvc: RoleViewCharactor = null!;

    /** 是否不可移动 */
    get isNoMove(): boolean {
        return this.rvc.rva.isNoMove;
    }
    set isNoMove(value: boolean) {
        this.rvc.rva.isNoMove = value;
    }

    /** 飘血提示位置 */
    get posBlood(): Node {
        return this.rvc.rva.posBlood;
    }

    /** 名子提示位置 */
    get posName(): Node {
        return this.rvc.rva.posName;
    }

    /** 自身特效位置 */
    get posEffect(): Node {
        return this.rvc.rva.posEffect;
    }

    /** 弓箭发射的节点 */
    get loose(): Node {
        return this.rvc.rva.loose;
    }

    /** 手节点 */
    get hand(): Node {
        return this.rvc.rva.hand;
    }

    /** 攻击时候展示的弓箭 */
    get arrow(): Node {
        return this.rvc.rva.arrow;
    }

    onLoad() {
        this.rvc = this.addComponent(RoleViewCharactor);
        this.hpPrompt = this.addComponent(RoleViewHitHpPrompt);
    }

    /** 待机动画 */
    idle() {
        this.rvc.idle();
    }

    /** 跑步动作 */
    run() {
        try {
            this.rvc.rva.run();
        }
        catch {
            oops.log.logView("角色动画未初始化完时收眼移动动画事件");
        }
    }

    /** 攻击动画 */
    attack(type?: number) {
        try {
            this.rvc.attack(type);
        }
        catch {
            oops.log.logView("角色动画未初始化完时收到服务器攻击命令，则直接触发攻击动画事件");
            this.onAttack && this.onAttack();
        }
    }

    /** 角色死亡动作 */
    die() {
        this.rvc.rvTouch.stop();
        this.rvc.rvJoystick.stop();
        this.rvc.rva.die();
    }

    /** 角色复活动作 */
    revive() {
        this.rvc.rva.revive();
    }

    /**
     * 触摸移动
     * @param target    目标位置
     * @param offset    偏移值
     * @param callback  移动完成回调
     */
    moveTouch(target: Vec3 | Node, offset: number = 0, callback?: Function) {
        this.rvc.moveTouch(this.ent as Role, target, offset, callback);
    }

    /**
     * 摇杆移动
     * @param data      摇杆数据
     */
    moveJoystick(data: any) {
        this.rvc.moveJoystick(this.ent as Role, data);
    }

    /** 缓动移动 */
    moveTween(state: RoleState) {
        // 旋转到与服务器同步的角度
        this.node.setRotation(state.rotation.x, state.rotation.y, state.rotation.z, state.rotation.w);
        this.rvc.moveTween(state);
    }

    /** 模型朝向目标方向 */
    lootAt(target: Vec3) {
        this.rvc.rva.lootAt(target);
    }

    /** 旋转到指定角度 */
    rotation(val: Vec3 | Quat | number) {
        this.rvc.rva.rotation(val);
    }

    reset() {
        this.node.destroy();
    }
}