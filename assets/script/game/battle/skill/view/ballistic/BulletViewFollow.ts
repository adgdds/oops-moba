/*
 * @Author: dgflash
 * @Date: 2022-03-28 09:45:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-20 14:24:18
 */

import { _decorator } from "cc";
import { BulletView } from "./BulletView";

const { ccclass, property } = _decorator;

/** 跟踪飞弹，必中目标 */
@ccclass('BulletViewFollow')
export class BulletViewFollow extends BulletView {
    update(dt: number) {
        if (!this.target.RoleView.node.worldPosition.strictEquals(this.pos_end)) {
            this.dir();
        }

        super.update(dt);
    }
}