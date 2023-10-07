/*
 * @Author: dgflash
 * @Date: 2022-03-28 09:45:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-07 15:23:57
 */

import { ITriggerEvent, Node, Vec3, _decorator } from "cc";
import { CollisionType, GameCollision } from "../../../../../../../extensions/oops-plugin-framework/assets/core/game/GameCollision";
import { Vec3Util } from "../../../../../../../extensions/oops-plugin-framework/assets/core/utils/Vec3Util";
import { EffectSingleCase } from "../../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { Role } from "../../../../role/Role";
import { RoleViewComp } from "../../../../role/view/RoleViewComp";
import { Skill } from "../../Skill";

const { ccclass, property } = _decorator;

/** 飞弹类特效抽象类 */
export abstract class BulletView extends GameCollision {
    /** 施放者对象 */
    caster: Role = null!;
    /** 受击目标对象 */
    target: Role | Vec3 = null!;
    /** 当前技能对象 */
    skill: Skill = null!;
    /** 移动速度 */
    speed: number = 10;

    /** 移动方向 */
    protected velocity: Vec3 = Vec3Util.forward;
    /** 起点位置 */
    protected pos_start: Vec3 = new Vec3();
    /** 目标位置 */
    protected pos_end: Vec3 = new Vec3();
    /** 移动增量 */
    protected trans: Vec3 = new Vec3();

    onLoad() {
        this.type = CollisionType.Ballistic;
        super.onLoad();
    }

    /** 发射 */
    launch() {
        // 特效起始位置
        this.pos_start.set(this.caster.RoleView.loose.worldPosition);
        this.node.setWorldPosition(this.pos_start);
        this.dir();
    }

    /** 飞弹移动动画 */
    update(dt: number) {
        Vec3.multiplyScalar(this.trans, this.velocity, this.speed * dt);
        this.node.translate(this.trans, Node.NodeSpace.LOCAL);
    }

    /** 计算子弹飞行方向 */
    protected dir() {
        // 目标点
        if (this.target instanceof Role) {
            this.pos_end.set(this.target.RoleView.node.worldPosition.x, this.pos_start.y, this.target.RoleView.node.worldPosition.z);
        }
        else {
            this.pos_end.set(this.target.x, this.pos_start.y, this.target.z);
        }

        // 飞行方向
        this.node.forward = Vec3Util.sub(this.node.worldPosition, this.pos_end).normalize();
    }

    protected onTriggerEnter(event: ITriggerEvent) {
        // 碰到自己不触发碰撞事件
        var attacker_node = this.caster.RoleView.node;
        if (attacker_node.uuid == event.otherCollider.node.uuid) {
            // console.warn("弓箭碰到射击者，调整碰撞组件尺寸");
            return;
        }

        // 射击到其它目标验证
        var gc = event.otherCollider.node.getComponent(GameCollision);
        if (gc) {
            switch (gc.type) {
                case CollisionType.Role:                                        // 物理分组 DEFAULT 与 GAME_OBJECT_SELECT 的碰撞矩阵都开启时才能触发
                    var rv = event.otherCollider.getComponent(RoleViewComp);
                    rv.onHit && rv.onHit();
                    break;
                case CollisionType.Wall:
                    console.log("打到墙");
                    break;
            }
        }

        // 移除弓箭
        this.removeSelf();
    }

    /** 移除自己 */
    protected removeSelf() {
        EffectSingleCase.instance.put(this.node);
    }
}