/*
 * @Author: dgflash
 * @Date: 2022-08-24 16:12:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 09:52:45
 */
import { Collection } from "../../../../../../extensions/oops-plugin-framework/assets/libs/collection/Collection";
import { Role } from "../../../role/Role";

/** 技能计算桥接器 */
export class BattleBridge {
    /** 是否为服务端 */
    static server: boolean = false;
    /** 玩家自己 */
    static owner: Role = null!;
    /** 房间所有玩家 */
    static roles: Collection<string, Role> = null!;
}