/*
 * @Author: dgflash
 * @Date: 2021-11-18 15:56:01
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 10:21:26
 */
import { ecs } from "../../../../core/ecs/ECS";
import { TableSkill } from "../../../common/table/TableSkill";
import { SkillCastingConfig } from "../../common/bll/config/SkillCastingConfig";
import { SkillCasting } from "../bll/SkillCasting";

/** 
 * 技能数据 
 * 
 * 设计思种
 * 1、技能配置表数据
 * 2、技能释放流程配置数据
 * 3、多层级触发的技能设计
 */
@ecs.register('SkillModel')
export class SkillModelComp extends ecs.Comp {
    /** 技能编号 */
    public get id(): number {
        return this.table.id;
    }
    public set id(value: number) {
        if (this.table == null)
            this.table = new TableSkill();
        this.table.init(value);

        // 技能数值组件
        var clsNum = SkillCastingConfig[value];
        console.assert(clsNum != null, `没找到找编号为【${value}】的技能逻辑组件`);
        if (clsNum) this.casting = new clsNum();
    }

    /** 技能策划配置表 */
    table: TableSkill = null!;
    /** 技能数值逻辑对象 */
    casting: SkillCasting = null!;

    reset() {
        this.id = -1;
    }
}