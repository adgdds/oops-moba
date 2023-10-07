/*
 * @Author: dgflash
 * @Date: 2022-05-27 11:31:21
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:27:06
 */

import { RolePosition } from "../../../types/RoleState";

/** 技能施放状态 */
export enum SkillState {
    /** 前摇状态 */
    Front,
    /** 施放状态 */
    Casting,
    /** 后摇状态 */
    Back
}

/** 服务器接受与广播攻击行为 */
export interface MsgRoleAttack {
    /** 玩家编号 */
    uid: string,
    /** 技能标号 */
    skillId: number,
    /** 技能状态 */
    state: SkillState,
    /** 目标玩家编号 */
    targetId?: string,
    /** 技能释放目标点 */
    pos?: RolePosition
}