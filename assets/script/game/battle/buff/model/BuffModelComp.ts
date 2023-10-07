/*
 * @Author: dgflash
 * @Date: 2022-09-13 09:32:13
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 15:52:56
 */
import { ecs } from "../../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { TableBuff } from "../../../common/table/TableBuff";
import { BuffAnimatorConfig } from "../../common/bll/config/BuffAnimatorConfig";
import { BuffCastingConfig } from "../../common/bll/config/BuffCastingConfig";
import { HitPosType } from "../../skill/model/SkillEnum";
import { BuffCasting } from "../bll/BuffCasting";
import { BuffAnimator } from "../view/BuffAnimator";

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


        // BUFF效果计算组件
        var clsNum = BuffCastingConfig[value];
        if (clsNum)
            this.casting = new clsNum();
        else
            this.casting = new BuffCasting();

        // BUFF动画组件
        var clsAnim = BuffAnimatorConfig[value];
        if (clsAnim)
            this.animator = new clsAnim();
        else
            this.animator = new BuffAnimator();
    }

    /** 状态效果策划配置表 */
    table: TableBuff = null!;
    /** 状态效果计算流程 */
    casting: BuffCasting = null!;
    /** 状态动画播放流程 */
    animator: BuffAnimator = null!;

    /** 受击动画资源 */
    get hitRes(): string {
        return `game/content/skill/hit/${this.table.hit}`;
    }

    /** 
     * 受击特效位置类型 
     * 1、文件名中带"foot_"的为脚底特效
     * 2、文件名中带"head_"的为头顶特效
     * 3、默认为角色腰部位置特效
     */
    get hitPos(): HitPosType {
        if (this.table.hit && this.table.hit.indexOf("foot_") == 0)
            return HitPosType.Foot;
        else if (this.table.hit && this.table.hit.indexOf("head_") == 0)
            return HitPosType.Head;
        else
            return HitPosType.Waist;
    }

    reset() {

    }
}