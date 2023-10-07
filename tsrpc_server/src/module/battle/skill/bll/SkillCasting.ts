/*
 * @Author: dgflash
 * @Date: 2022-06-24 21:11:50
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 09:42:05
 */
import { Vec3 } from "../../../common/math/vec3";
import { Role } from "../../../role/Role";
import { RoleSelector } from "../../common/bll/RoleSelector";
import { ISkillReport } from "../model/ISkillReport";
import { Skill } from "../Skill";

/** 
 * 技能施放流程 
 * 1、对象处理时能获取技能施放者与技能目标信息，技能目标可以是角色或地面坐标的范围技能
 * 2、对象处理时能获取战斗场景中所有角色信息、所有战斗环境信息，辅助技能效果验证
 * 
 * 辅助计算工具
 * 1、伤害计算
 * 2、恢复计算
 * 3、死亡、复活流程处理
 * 4、属性叠加
 * 5、属性覆盖
 * 6、分类战报生成工具
 * 7、技能触发条件验证工具
 * 
 * 技能自定义施放条件配置
 * 
 * 技能自定义效果配置
 * 
 * 问题：
 * 1、服务器验证逻辑不需要战斗报，只需要验证HP、技能冷却（HP变化值一样为验证通过）
 * 2、与客户端对象路径不一样的，通过定义一个同样路径的对象做为桥接
 * 3、数据安全转发操作，服务器不验证逻辑，服务器同步随机种子（只要同步生命就要服务器自己验证逻辑）
 */
export class SkillCasting {
    /** 当前施放的技能 */
    skill: Skill = null!;
    /** 技能发起者 */
    caster: Role = null!;
    /** 玩家选中的技能释放目标或技能目标点 */
    target: Role | Vec3 = null!;
    /** 技能释放生成的动画战报数据 */
    srs: ISkillReport[] = [];

    /** 获取当前等级的技能配置数据 */
    config() {

    }

    /** 验证技能施放距离 */
    checkDistance(): boolean {
        var target_pos;
        if (this.target instanceof Role)
            target_pos = this.target.RoleView.node.position;
        else
            target_pos = this.target;

        // 施放距离验证
        var d = Vec3.distance(this.caster.RoleView.node.position, target_pos);
        if (d <= this.skill.SkillModel.table.distance)
            return true;
        return false;
    }

    /** 
     * 自动选目标（默认选施放者最近的一个目标） 
     * @return 返回true为找到目标可以释放技能，返回false为没找到目标无法释放技能
     */
    autoSelectTarget(): boolean {
        this.target = RoleSelector.nearest(this.caster) as Role;

        if (this.target)
            return true;
        return false;
    }

    /** ----------技能事件---------- */

    /** 主动技能施放逻辑 */
    onCasting() { }

    /** 被动技能施放逻辑 */
    onPassive() {

    }
}

