/*
 * @Author: dgflash
 * @Date: 2022-09-22 16:41:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 17:06:38
 */

import { Role } from "../../../../role/Role";

/** 功能型BUFF */
export class BuffAbility {
    /**
     * 不允许移动状态
     * @param target 目标对象
     * @returns true为不能移动，false为可移动
     */
    static moveNotAllowed(target: Role): boolean {
        return target.RoleSkillLearned.buffs.get(3) != null;
    }
}