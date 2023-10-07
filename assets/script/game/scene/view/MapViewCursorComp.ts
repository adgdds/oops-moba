/*
 * @Author: dgflash
 * @Date: 2022-04-08 12:21:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-08 18:34:38
 */
import { EventMouse, EventTouch, geometry, input, Input, Node, PhysicsSystem, Quat, sys, Vec2, Vec3, _decorator } from 'cc';
import { EDITOR } from 'cc/env';
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from '../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp';
import { smc } from '../../common/SingletonModuleComp';

const { ccclass, property } = _decorator;

/** 地图上的光标 */
@ccclass("MapViewCursorComp")
@ecs.register('MapViewCursor', false)
export class MapViewCursorComp extends CCComp {
    @property
    protected _adaptToSurface: boolean = false;
    @property({ displayName: '适应目标表面' })
    public get adaptToSurface() {
        return this._adaptToSurface;
    }
    public set adaptToSurface(value: boolean) {
        this._adaptToSurface = value;
        if (!EDITOR && !value) {
            this.node.setWorldRotation(Quat.fromEuler(new Quat, 0, 0, 0));
        }
    }

    @property({ type: Node, displayName: '参照节点（留空则参照世界原点）', visible() { return this.adaptToSurface; } })
    public referNode: Node = null;

    private tempVec3: Vec3 = new Vec3();
    private tempQuat: Quat = new Quat();
    private ray: geometry.Ray = new geometry.Ray();

    reset(): void {
        Logger.logBusiness("【地图】释放光标");
        this.node.destroy();
    }

    onLoad() {
        if (sys.platform === sys.Platform.MOBILE_BROWSER) {
            // 手机
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
        else {
            // 电脑
            input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        }
    }

    onDestroy() {
        if (sys.platform === sys.Platform.MOBILE_BROWSER) {
            // 手机
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
            input.off(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }
        else {
            // 电脑
            input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
            input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        }
    }

    /** 鼠标点下 */
    protected onMouseDown(event: EventMouse) {
        this.followScreenPos(event.getLocation());
    }

    /** 鼠标移动 */
    protected onMouseMove(event: EventMouse) {
        this.followScreenPos(event.getLocation());
    }

    /** 触摸开始 */
    private onTouchStart(event: EventTouch) {
        if (event.getAllTouches().length > 1) return;
        this.followScreenPos(event.getLocation());
    }

    /** 触摸移动 */
    private onTouchMove(event: EventTouch) {
        if (event.getAllTouches().length > 1) return;
        this.followScreenPos(event.getLocation());
    }

    /** 触摸结束 */
    private onTouchEnd(event: EventTouch) {
        if (event.getAllTouches().length > 1) return;
        this.followScreenPos(event.getLocation());
    }

    /** 跟随屏幕光标移动 */
    private followScreenPos(screenPos: Vec2) {
        // 创建射线
        this.ray = smc.camera.CameraModel.camera.screenPointToRay(screenPos.x, screenPos.y);

        // 射线投射
        if (!PhysicsSystem.instance.raycastClosest(this.ray)) return;

        // 获取点击位置
        const raycastClosest = PhysicsSystem.instance.raycastClosestResult;
        // 击中点的坐标
        const hitPoint = raycastClosest.hitPoint;
        // 击中面的法线
        const hitNormal = raycastClosest.hitNormal;
        // 控制光标
        this.set(hitPoint, hitNormal);
    }

    /**
     * 设置光标
     * @param position 位置
     * @param normal   法线
     */
    private set(position: Vec3, normal?: Vec3) {
        // 位置
        this.node.setWorldPosition(position.add3f(0, 0.1, 0));

        // 旋转
        if (this.adaptToSurface && normal) {
            // 参照位置
            const referPos = this.referNode?.getWorldPosition() ?? Vec3.ZERO;

            // 创建一条从参照位置指向目标位置的方向向量
            const direction = Vec3.subtract(this.tempVec3, position, referPos);

            // 将方向向量投影到法线所表示的平面上，归一化后作为向前向量使用
            const forward = Vec3.projectOnPlane(new Vec3, direction, normal).normalize();

            // 以给定的法线作为正上方向，向前向量作为正前方向
            const rotation = Quat.fromViewUp(this.tempQuat, forward, normal);
            this.node.setWorldRotation(rotation);
        }
    }
}
