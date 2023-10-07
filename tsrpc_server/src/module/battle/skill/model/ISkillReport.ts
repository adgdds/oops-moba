/*
 * @Author: dgflash
 * @Date: 2022-08-15 18:51:00
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-21 17:33:53
 */

import { Vec3 } from "../../../common/math/vec3";
import { Role } from "../../../role/Role";
import { Buff } from "../../buff/Buff";
import { Skill } from "../Skill";

/** 受击效果 */
export type Effect = EffectDamage | EffectRecovery | EffectBuff | EffectShifting | EffectRevive | EffectTrap;

/** 技能施放战报 */
export interface ISkillReport {
    /** 技能施放者 */
    caster: Role,
    /** 玩家选中目标玩家或技能释放点（范围技能或陷阱技能） */
    target?: Role | Vec3,
    /** 使用的技能 */
    skill: Skill,
    /** 受击目标 */
    hits: ISkillReportHit[],
}

/** 技能施放后的受击战报 */
export interface ISkillReportHit {
    /** 受击目标 */
    target: Role | Vec3;
    /** 技能效果 */
    effect: Effect;
}

/** 伤害效果 */
export class EffectDamage {
    /** 生命上限 */
    hpMax: number = 0;
    /** 当前生命（为零时死亡） */
    hp: number = 0;
    /** 角色状态  */
    state: StateType = StateType.Alive;
    /** 伤害值（负为伤害，正为恢复） */
    value: number = 0;
}

/** 恢复生命效果 */
export class EffectRecovery {
    /** 生命上限 */
    hpMax: number = 0;
    /** 当前生命 */
    hp: number = 0;
    /** 回复生命 */
    value: number = 0;
}

/** 位移效果 */
export class EffectShifting {
    /** 目标位置 */
    pos: Vec3 = null!;
}

/** 持续状态类效果 */
export class EffectBuff {
    /** 是否为添加到目标身上（true为添加，false移除） */
    addto: boolean = true;
    /** BUFF效果 */
    buff: Buff = null!;
}

/** 陷阱状态类效果 */
export class EffectTrap {
    /** 是否为添加到目标身上（true为添加，false移除） */
    addto: boolean = true;
    /** BUFF效果 */
    buff: Buff = null!;
    /** 初始位置 */
    target: Vec3 = null!
}

/** 复活效果 */
export class EffectRevive {
    /** 复活类型（0为技能复活，1为定时服务器复活） */
    type: number = 1;
}

/** 伤害变化类型 */
export enum DamageType {
    /** 标准 */
    Normal,
    /** 招架 */
    Parry,
    /** 格挡 */
    Block,
    /** 偏斜 */
    Skew,
    /** 暴击 */
    Critical,
    /** 免伤 */
    immune
}

/** 角色状态类型 */
export enum StateType {
    /** 存活 */
    Alive,
    /** 死亡 */
    Die,
    /** 复活 */
    Revive
}