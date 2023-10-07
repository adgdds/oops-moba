/*
 * @Author: dgflash
 * @Date: 2021-11-18 14:20:46
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 14:16:21
 */
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { Camera } from "../camera/Camera";
import { Initialize } from "../initialize/Initialize";
import { Room } from "../room/Room";
import { Scene } from "../scene/Scene";
import { CommonNet } from "./CommonNet";

/** 游戏模块 */
@ecs.register('SingletonModule')
export class SingletonModuleComp extends ecs.Comp {
    /** 网络模块 */
    net: CommonNet = null!;
    /** 游戏初始化模块 */
    initialize: Initialize = null!;
    /** 摄像机 */
    camera: Camera = null!
    /** 场景模块 */
    scene: Scene = null!;
    /** 房间模块 */
    room: Room = null!;

    reset() { }
}

export var smc = ecs.getSingleton(SingletonModuleComp);