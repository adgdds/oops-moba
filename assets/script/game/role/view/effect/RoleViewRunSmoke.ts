/*
 * @Author: dgflash
 * @Date: 2022-03-25 18:12:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-19 14:32:22
 */
import { Component, Node, ParticleSystemComponent, _decorator } from "cc";
import { ViewUtil } from "../../../../../../extensions/oops-plugin-framework/assets/core/utils/ViewUtil";

const { ccclass, property } = _decorator;

/** 跑步脚底灰尘特效 */
@ccclass('RoleViewRunSmoke')
export class RoleViewRunSmoke extends Component {
    @property({ tooltip: '控制整个粒子系统的更新速度' })
    speed: number = 1;

    @property({ tooltip: '特效节点回收时间' })
    recycleTime: number = 0;

    /** 特效播放完成回调 */
    callback: Function = null!;

    /** 灰尘特效 */
    private effect: Node = null!;

    onLoad() {
        this.effect = ViewUtil.createPrefabNode("game/content/player/run_smoke/run_smoke");
        this.effect.parent = this.node;

        var maxDuration: number = 0;
        var particle: ParticleSystemComponent[] = this.effect.getComponentsInChildren(ParticleSystemComponent);
        particle.forEach((element: ParticleSystemComponent) => {
            element.simulationSpeed = this.speed;
            element.clear();
            element.stop();
            element.play();

            maxDuration = element.duration > maxDuration ? element.duration : maxDuration;
        });

        // 特效播放完成时间
        if (this.callback) {
            let seconds: number = this.recycleTime && this.recycleTime > 0 ? this.recycleTime : maxDuration;
            this.scheduleOnce(this.callback, seconds);
        }
    }

    show() {
        this.effect.active = true;
    }

    hide() {
        this.effect.active = false;
    }
}