/*
 * @Author: dgflash
 * @Date: 2022-05-16 17:21:57
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:04:37
 */
import { ecs } from "../../../core/ecs/ECS";
import { Config } from "../../config/Config";
import { Room } from "../Room";

/** 房间所有玩家状态广播 */
@ecs.register('RoomBroadcastPlayerState')
export class RoomBroadcastRoleStateComp extends ecs.Comp {
    _interval: ReturnType<typeof setInterval> = null!;

    reset(): void {
        clearInterval(this._interval);
    }
}

export class RoomBroadcastRoleStateSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomBroadcastRoleStateComp);
    }

    entityEnter(e: Room): void {
        let comp = e.get(RoomBroadcastRoleStateComp);
        comp._interval = setInterval(() => {
            if (e.RoomModel.conns.length > 0) {
                e.broadcastMsg(`server/RoomRoleState`, {
                    states: e.RoomModel.states
                });
            }
        }, Config.room.broadcast_player_state_rate);
    }
}