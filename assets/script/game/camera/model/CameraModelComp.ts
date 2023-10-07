/*
 * @Author: dgflash
 * @Date: 2022-03-24 16:46:52
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-08 16:41:55
 */

import { Camera } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { OrbitCamera } from "../../../../../extensions/oops-plugin-framework/assets/libs/camera/OrbitCamera";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";

/** 摄像机数据 */
@ecs.register('CameraModel')
export class CameraModelComp extends ecs.Comp {
    /** 三维主摄像机 */
    camera: Camera = null!;
    /** 轨道相机控制器 */
    orbit: OrbitCamera = null!;

    init() {
        this.camera = oops.game.root.getComponentInChildren(Camera)!;
        this.orbit = oops.game.root.getComponentInChildren(OrbitCamera)!;
    }

    reset(): void {
        this.camera = null;
        this.orbit = null;
    }
}