/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 13:42:56
 */
import { ecs } from "../../core/ecs/ECS";
import { EcsBuffSystem } from "../../module/battle/buff/Buff";
import { EcsSkillSystem } from "../../module/battle/skill/Skill";
import { EcsRoomSystem } from "../../module/room/Room";
import { EcsServerRoomSystem } from "./ServerRoom";

/** 房间服务器模块 */
export class ServerRoomSystem extends ecs.RootSystem {
    constructor() {
        super();

        this.add(new EcsServerRoomSystem());
        this.add(new EcsRoomSystem());
        this.add(new EcsSkillSystem());
        this.add(new EcsBuffSystem());
    }
}
