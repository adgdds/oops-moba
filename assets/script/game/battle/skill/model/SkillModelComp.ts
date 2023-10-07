/*
 * @Author: dgflash
 * @Date: 2021-11-18 15:56:01
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 10:16:30
 */
import { ecs } from "../../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { TableSkill } from "../../../common/table/TableSkill";
import { SkillAnimatorConfig } from "../../common/bll/config/SkillAnimatorConfig";
import { SkillCastingConfig } from "../../common/bll/config/SkillCastingConfig";
import { SkillCasting } from "../bll/SkillCasting";
import { BulletViewFollow } from "../view/ballistic/BulletViewFollow";
import { BulletViewsTraightLine } from "../view/ballistic/BulletViewsTraightLine";
import { SkillAnimator } from "../view/SkillAnimator";
import { HitPosType } from "./SkillEnum";

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

        // 技能动画组件
        var clsAnim = SkillAnimatorConfig[value];
        if (clsAnim)
            this.animator = new clsAnim();
        else
            this.animator = new SkillAnimator();
    }

    /** 技能策划配置表 */
    table: TableSkill = null!;
    /** 技能数值逻辑对象 */
    casting: SkillCasting = null!;
    /** 技能动画逻辑对象 */
    animator: SkillAnimator = null!;

    /** 弹道动画资源 */
    get ballisticRes(): string {
        return `game/content/skill/ballistic/${this.table.ballistic}`;
    }

    /** 
     * 飞弹动画类型 
     * 1、文件名中带"follow_"的为跟踪类必中飞弹，命中后回收
     * 2、文件名中带"line_"的为直线飞行飞弹，命中后或移动到屏幕边缘回收
     */
    get ballisticCls(): any {
        if (this.table.ballistic.indexOf("follow_") == 0)
            return BulletViewFollow;
        if (this.table.ballistic.indexOf("line_") == 0)
            return BulletViewsTraightLine;
        return null
    }

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
        this.id = -1;
    }
}