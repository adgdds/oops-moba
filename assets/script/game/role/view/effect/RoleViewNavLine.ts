/*
 * @Author: dgflash
 * @Date: 2022-03-25 18:12:10
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-07 15:42:10
 */
import { Component, instantiate, Node, Prefab, Vec3, _decorator } from "cc";
import { oops } from "../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { NavLine } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/3d/NavLine";

const { ccclass, property } = _decorator;

/** 角色导航线 */
@ccclass('RoleViewNavLine')
export class RoleViewNavLine extends Component {
    /** 导航线 */
    private navline: Prefab = null!;
    /** 目标点提示 */
    private pryamid: Prefab = null!;
    /** 导航线级 */
    private line: NavLine = null!;
    /** 目标提示节点 */
    private target: Node = null!;

    onLoad() {
        this.navline = oops.res.get("game/effect/navline/navline", Prefab);
        this.pryamid = oops.res.get("game/effect/pryamid/pointer", Prefab);

        this.target = instantiate(this.pryamid);
        this.line = instantiate(this.navline).getComponent(NavLine)!;
        this.line.player = this.node;
        this.line.node.parent = this.node.parent;
    }

    show(target: Vec3) {
        this.target.parent = this.node.parent;
        this.target.setWorldPosition(target);
        this.line.show(target);
    }

    hide() {
        this.target.parent = null;
        this.line.hide();
    }

    protected onDestroy() {
        this.target.destroy();
        this.line.node.destroy();
    }
}