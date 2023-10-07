/*
 * @Author: dgflash
 * @Date: 2022-02-12 11:02:21
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 16:47:11
 */
import { oops } from "../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ViewUtil } from "../../../../extensions/oops-plugin-framework/assets/core/utils/ViewUtil";
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { MapModelComp } from "./model/MapModelComp";
import { MapViewComp } from "./view/MapViewComp";
import { MapViewCursorComp } from "./view/MapViewCursorComp";

/** 游戏地图 */
@ecs.register(`Scene`)
export class Scene extends ecs.Entity {
    // 数据层
    MapModel!: MapModelComp;

    // 视图层
    MapView!: MapViewComp;
    MapViewCursor!: MapViewCursorComp;

    protected init(): void {
        this.addComponents<ecs.Comp>(
            MapModelComp);
    }

    /** 加载地图 */
    load(res: string) {
        this.MapModel.res = res;

        // 显示地图
        var node = ViewUtil.createPrefabNode(this.MapModel.path);
        node.parent = oops.game.root;

        // 地图加到ECS实体中
        let mv = node.getComponent(MapViewComp) || node.addComponent(MapViewComp);
        this.add(mv);

        // 光标
        // this.loadCursor();
    }

    /** 卸载地图 */
    unload() {
        // 释放地图显示对象
        this.remove(MapViewComp);
        this.remove(MapViewCursorComp);

        // 释放地图资源
        // oops.res.release(e.MapModel.path);
        // oops.res.releaseDir("game");

        oops.log.logBusiness("【地图】释放地图资源");
    }

    /** 加载光标 */
    loadCursor() {
        var cursor = ViewUtil.createPrefabNode("game/effect/cursor/cursor");
        this.add(cursor.getComponent(MapViewCursorComp));
        cursor.parent = oops.game.root;
    }
}

export class EcsSceneSystem extends ecs.System {
    constructor() {
        super();
    }
}
