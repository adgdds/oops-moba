/*
 * @Author: dgflash
 * @Date: 2022-09-13 09:32:13
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 10:20:17
 */
import { ecs } from "../../../../core/ecs/ECS";
import { TableBuff } from "../../../common/table/TableBuff";
import { BuffCastingConfig } from "../../common/bll/config/BuffCastingConfig";
import { BuffCasting } from "../bll/BuffCasting";

/** 状态效果数据 */
@ecs.register('BuffModel')
export class BuffModelComp extends ecs.Comp {
    /** 状态效果编号 */
    public get id(): number {
        return this.table.id;
    }
    public set id(value: number) {
        if (this.table == null)
            this.table = new TableBuff();
        this.table.init(value);

        var clsNum = BuffCastingConfig[value];
        console.assert(clsNum != null, `没找到找编号为【${value}】的BUFF逻辑组件`);
        if (clsNum) this.casting = new clsNum();
    }

    /** 状态效果策划配置表 */
    table: TableBuff = null!;
    /** 状态效果计算流程 */
    casting: BuffCasting = null!;

    reset() {

    }
}