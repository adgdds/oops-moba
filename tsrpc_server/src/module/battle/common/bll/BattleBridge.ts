/*
 * @Author: dgflash
 * @Date: 2022-08-24 16:12:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 09:41:43
 */
import { Collection } from "../../../../core/collection/Collection";
import { Role } from "../../../role/Role";

/** 技能计算桥接器 */
export class BattleBridge {
    /** 是否为服务端 */
    static server: boolean = true;
    /** 玩家自己 */
    static owner: Role = null!;
    /** 房间所有玩家 */
    static roles: Collection<string, Role> = null!;
}