/*
 * @Author: dgflash
 * @Date: 2022-01-26 14:14:34
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-07 17:22:05
 */

/** 角色属性类型 */
export enum RoleAttributeType {
    /** 当前生命值 */
    hp = "hp",
    /** 生命最大值 */
    hpMax = "hpMax",
    /** 移动速度 */
    speed = "speed",
    /** 攻击力 */
    ad = "ad",
    /** 魔力 */
    ap = "ap"
}

/** 角色阵营类型 */
export enum RoleCampType {
    /** 友军 */
    Friendly = 0,
    /** 敌军 */
    Enemy = 1
}