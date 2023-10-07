/*
 * @Author: dgflash
 * @Date: 2022-06-24 10:09:49
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-29 10:00:35
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";

/** 网管网络对象 */
@ecs.register('GateModel')
export class GateModelComp extends ecs.Comp {
    /** 游戏区服 */
    area: {
        /** 游戏分区名 */
        name: string,
        /** 服务器地址 */
        server: string
    }[];

    /** 数据层组件移除时，重置所有数据为默认值 */
    reset() {

    }
}