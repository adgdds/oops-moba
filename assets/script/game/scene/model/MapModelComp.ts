/*
 * @Author: dgflash
 * @Date: 2022-03-21 11:12:03
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-21 16:45:58
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";

/** 地图数据 */
@ecs.register('MapModel')
export class MapModelComp extends ecs.Comp {
    /** 资源名 */
    res: string = "map";

    /** 资源路径 */
    get path(): string {
        return `game/content/scene/${this.res}`;
    }

    reset(): void {
        this.res = "";
    }
}