/*
 * @Author: dgflash
 * @Date: 2022-02-11 19:32:06
 * @LastEditors: dgflash
 * @LastEditTime: 2023-01-19 15:31:20
 */

import { Node, _decorator } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { Timer } from "../../../../../extensions/oops-plugin-framework/assets/core/common/timer/Timer";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";

const { ccclass, property } = _decorator;

/** 地图 */
@ccclass("MapViewComp")
@ecs.register('MapView', false)
export class MapViewComp extends CCComp {
    private timer: Timer = new Timer(0.2);

    update(dt: number) {
        // 角色头顶名子深度排序
        if (this.timer.update(dt))
            oops.gui.game.children.sort(this.sort);
    }

    private sort(a: Node, b: Node) {
        let a_y = a.position.y;
        let b_y = b.position.y;
        return a_y - b_y;
    }

    reset(): void {
        this.node.destroy();
    }
}