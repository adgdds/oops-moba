/*
 * @Author: dgflash
 * @Date: 2022-05-17 13:52:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:29:06
 */

/** 用于客户端定时与服务务同步位置信息与服务器定时广播给房间内其它玩家 */
export interface RoleState {
    /** 玩家进房间时生成的唯一编号 */
    id: string
    /** 玩家位置 */
    pos: RolePosition
    /** 玩家旋转信息 */
    rotation: RoleRotation
    /** 玩家动作（暂不需要使用） */
    action: string
}

/** 玩家在房间内详细数据 */
export interface RoleDetailed {
    /** 角色信息 */
    roleInfo: RoleInfo,
    /** 玩家状态 */
    state: RoleState
    /** 玩家数值属性 */
    attributes: {
        [type: string]: number
    };
}

/** 玩家信息 */
export interface RoleInfo {
    /** 玩家编号 */
    id: string,
    /** 玩家昵称 */
    nickname: string
}

/** 玩家位置信息 */
export interface RolePosition {
    /** X 轴位置 */
    x: number,
    /** Y 轴位置 */
    y: number,
    /** Z 轴位置 */
    z: number
}

/** 玩家旋转信息 */
export interface RoleRotation {
    /** 四元数 X */
    x: number,
    /** 四元数 Y */
    y: number,
    /** 四元数 Z */
    z: number,
    /** 四元数 W */
    w: number
}

/** 玩家移动控制请求与广播数据 */
export interface RoleMove {
    /** 玩家编号 */
    uid: string;
    /** 触摸地图目标位置移动信息 */
    target?: RolePosition;
    /** 摇杆移动方向信息 */
    vector?: RolePosition;
    /** 角度 */
    angle?: number;
    /** 是否为摇杆方式移动 */
    joystick?: boolean;
    /** 是否选最近的目标发动技能 */
    skillId?: number;
    /** 技能攻击目标编号 */
    targetId?: string;
}