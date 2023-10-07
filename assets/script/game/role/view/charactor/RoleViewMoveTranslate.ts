
/*
 * @Author: dgflash
 * @Date: 2022-03-25 18:12:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-21 16:28:53
 */
import { Component, geometry, PhysicsSystem, Vec3, _decorator } from "cc";
import { PhysicsUtil } from "../../../../../../extensions/oops-plugin-framework/assets/core/utils/PhysicsUtil";
import { Vec3Util } from "../../../../../../extensions/oops-plugin-framework/assets/core/utils/Vec3Util";

const { ccclass, property } = _decorator;

/** 
 * 角色摇杆坐标移动 （测试）
 * 问题：
 * 撞墙抖动，被摄像机剔除的部分，射线检查不会生效
 * 高度验证出来时，角色不会靠墙壁滑行
 */
@ccclass('RoleViewMoveTranslate')
export class RoleViewMoveTranslate extends Component {
    /** 移动方向 */
    velocity: Vec3 = Vec3Util.zero;
    /** 移动速度 */
    speed: number = 0;

    private vector: Vec3 = new Vec3();

    private ray = geometry.Ray.create(0, 0, 0, 0, -1, 0);
    private ray_forward = new geometry.Ray();
    private from: Vec3 = new Vec3();
    private to: Vec3 = new Vec3();
    /** 间隔墙壁距离 */
    private space: number = 1;
    private pos: Vec3 = new Vec3();

    update(dt: number) {
        if (this.speed > 0) {
            this.vector = Vec3Util.mul(this.velocity, this.speed * dt);

            // 射线起点
            this.from.set(this.node.worldPosition);
            this.from.y += 0.5;
            // 射线方向
            this.to = Vec3Util.add(this.from, this.vector);
            this.to.z += 0.5;

            // 撞墙防抖动
            geometry.Ray.fromPoints(this.ray_forward, this.from, this.to);
            if (PhysicsSystem.instance.raycastClosest(this.ray_forward, PhysicsUtil.GAME_OBJECT_SELECT.mask, this.space)) {
                const r = PhysicsSystem.instance.raycastClosestResult;
                this.vector = Vec3Util.sub(r.hitPoint, this.from);
                this.vector.z -= this.space;
            }

            // 玩家移动后的目标位置
            Vec3.add(this.pos, this.node.worldPosition, this.vector);

            // 上坡高度计算
            this.ray.o.set(this.pos);
            this.ray.o.y += 1
            if (PhysicsSystem.instance.raycastClosest(this.ray, PhysicsUtil.DEFAULT.mask)) {
                const r = PhysicsSystem.instance.raycastClosestResult;
                // 斜坡与角色之间的夹角
                const angle = Vec3Util.angle(r.hitNormal, Vec3.UP);
                // console.log("斜坡角度", angle, "斜坡高度", r.hitPoint.y, r.collider.name);

                if (angle <= 30) {
                    this.ray.o.y = r.hitPoint.y;
                    this.node.worldPosition = this.ray.o;
                }
            }
            else {
                this.node.worldPosition = this.pos;
            }

            // this.node.worldPosition = this.pos;
            // this.pos.set(this.vector.multiplyScalar(this.speed * dt));
            // this.node.setWorldPosition(this.pos);
            // this.node.translate(this.vector, Node.NodeSpace.WORLD);

            // // 地图模型网格检测点击
            // var mrs = smc.map.MapView.node.getComponentsInChildren(MeshRenderer);
            // var mesh: Component = null!;
            // var distance = Number.MAX_VALUE;
            // for (var i = 0; i < mrs.length; i++) {
            //     const m = mrs[i];
            //     if (!isValid(m.node, true) || !m.node.active || !m.model) {
            //         continue;
            //     }

            //     const dis = geometry.intersect.rayModel(this.ray, m.model, {
            //         mode: geometry.ERaycastMode.CLOSEST,
            //         doubleSided: false,
            //         distance: Number.MAX_VALUE
            //     });

            //     if (dis && dis < distance) {
            //         distance = dis;
            //         mesh = m;
            //     }
            // }

            // if (mesh == null) return;

            // // 根据给定距离计算出射线上的一点
            // this.ray.computeHit(this.pos, distance);
            // this.node.worldPosition = this.pos;
        }
    }
}