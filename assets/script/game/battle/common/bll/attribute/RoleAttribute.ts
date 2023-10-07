/*
 * @Author: dgflash
 * @Date: 2022-08-15 18:32:58
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-24 16:09:18
 */

import { RoleAttributeType } from "../../../../role/model/RoleEnum";
import { Role } from "../../../../role/Role";

/** 角色属性修改器 */
export class RoleAttribute {
    /**
     * 附加一个属性值
     * @param role      修改属性角色
     * @param type      属性类型
     * @param value     属性值
     */
    static add(role: Role, type: RoleAttributeType, value: number) {

    }

    /**
     * 覆盖一个附加属性值
     * @param role      修改属性角色
     * @param type      属性类型
     * @param value     属性值
     */
    static cover(role: Role, type: RoleAttributeType, value: number) {

    }

    /**
     * 附加从一个属性转换到另外一个属性值
     * @param role      修改属性角色
     * @param from      带转化的属性
     * @param to        附加到的目标属性
     * @param value     转化比例值
     */
    static convert(role: Role, from: RoleAttributeType, to: RoleAttributeType, value: number) {

    }
}