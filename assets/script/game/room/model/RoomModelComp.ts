/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-20 15:23:00
 */
import { Collection } from "../../../../../extensions/oops-plugin-framework/assets/libs/collection/Collection";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { VM } from "../../../../../extensions/oops-plugin-framework/assets/libs/model-view/ViewModel";
import { Role } from "../../role/Role";

/** 房间显示数据 */
export interface IRoomVM {
    /** 服务器地址 */
    server: string,
    /** 房间名 */
    name: string,
    /** 房间可容纳的最大人数 */
    max: number,
    /** 当前玩家数量 */
    amount: number,
    /** 延时 */
    ping: number
}

/** 房间数据 */
@ecs.register('RoomModel')
export class RoomModelComp extends ecs.Comp {
    /** 显示数据 */
    vm: IRoomVM = null!;

    /** 房间编号 */
    roomId: string = null!;
    /** 房间服务器地址 */
    serverUrl: string = null!;
    /** 玩家自己名 */
    nickname: string = null;

    /** 玩家自己 */
    owner: Role = null!;
    /** 房间所有玩家 */
    roles: Collection<string, Role> = new Collection();

    vmAdd() {
        VM.add(this.vm, "Room");
    }

    vmRemove() {
        VM.remove("Room");
        this.vm = null;
    }

    reset(): void {
        // 清理地图上的玩家
        this.roles.forEach(r => {
            r.destroy();
        });
        this.roles.clear();

        this.vmRemove();
        this.roomId = null!;
        this.serverUrl = null!;
        this.nickname = null;
        this.owner = null;
    }
}
