/*
 * @Author: dgflash
 * @Date: 2022-03-28 09:45:31
 * @LastEditors: dgflash
 * @LastEditTime: 2023-01-19 15:31:05
 */

import { _decorator } from "cc";
import { Timer } from "../../../../../../../extensions/oops-plugin-framework/assets/core/common/timer/Timer";
import { CameraUtil } from "../../../../../../../extensions/oops-plugin-framework/assets/core/utils/CameraUtil";
import { smc } from "../../../../common/SingletonModuleComp";
import { BulletView } from "./BulletView";

const { ccclass, property } = _decorator;

/** 
 * 直线飞行特效
 */
@ccclass('BulletViewsTraightLine')
export class BulletViewsTraightLine extends BulletView {
    /** 验证删除的间隔时间 */
    private timer: Timer = new Timer(1);

    update(dt: number) {
        super.update(dt);

        // 不在屏幕显示区域内删除弹道模块
        if (this.timer.update(dt)) {
            var flag = CameraUtil.isInView(smc.camera.CameraModel.camera, this.node.worldPosition);
            if (flag == false) {
                this.removeSelf();
            }
        }
    }
}