/*
 * @Author: dgflash
 * @Date: 2022-03-08 15:00:27
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 17:08:08
 */
import { Component, EventTouch, geometry, Input, input, isValid, MeshRenderer, PhysicsSystem, Vec3, _decorator } from "cc";
import { PhysicsUtil } from "../../../../../extensions/oops-plugin-framework/assets/core/utils/PhysicsUtil";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";
import { BuffAbility } from "../../battle/common/bll/buff/BuffAbility";
import { smc } from "../../common/SingletonModuleComp";
import { Role } from "../Role";
import { RoleViewComp } from "./RoleViewComp";

const { ccclass, property } = _decorator;

/** 触摸地图移动 */
@ccclass("RoleViewUITouchComp")
@ecs.register('RoleViewUITouch', false)
export class RoleViewUITouchComp extends CCComp {
    /** 射线 */
    private ray: geometry.Ray = new geometry.Ray();
    /** 目标位置 */
    private targetPos = new Vec3();
    /** 目标控制角色 */
    private owner: Role;

    start() {
        this.owner = this.ent as Role;
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchEnd(event: EventTouch) {
        if (this.owner.die || BuffAbility.moveNotAllowed(this.owner) || this.owner.RoleView.isNoMove) return;

        // 获取屏幕点到三维空间的射线
        smc.camera.CameraModel.camera.screenPointToRay(event.getLocationX(), event.getLocationY(), this.ray);

        // 触摸只能选中物理类型为可选中的对象（项目->设置->物理->碰撞矩阵）
        if (PhysicsSystem.instance.raycastClosest(this.ray, PhysicsUtil.GAME_OBJECT_SELECT.mask)) {
            // 选中可选中的对象
            smc.room.roleMoveTarget(rv.node.worldPosition);
            var rv = PhysicsSystem.instance.raycastClosestResult.collider.node.getComponent(RoleViewComp);
            this.owner.RoleView.moveTouch(rv.node.position, 5, () => {
                this.owner.RoleView.attack(1);
            });
        }
        else {
            // 地图模型网格检测点击
            var mrs = smc.scene.MapView.node.getComponentsInChildren(MeshRenderer);
            var mesh: Component = null!;
            var distance = Number.MAX_VALUE;
            for (var i = 0; i < mrs.length; i++) {
                const m = mrs[i];
                if (!isValid(m.node, true) || !m.node.active || !m.model) {
                    continue;
                }

                // 检查射线是否穿过模型
                const dis = geometry.intersect.rayModel(this.ray, m.model, {
                    mode: geometry.ERaycastMode.CLOSEST,
                    doubleSided: false,
                    distance: Number.MAX_VALUE
                });

                // 获取先与射线相交的网格
                if (dis && dis < distance) {
                    distance = dis;
                    mesh = m;
                }
            }

            if (mesh == null) return;

            // 根据给定距离计算出射线上的一点（移动目标点）
            this.ray.computeHit(this.targetPos, distance);

            // 角色移动
            smc.room.roleMoveTarget(this.targetPos);
        }
    }

    reset() {
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}