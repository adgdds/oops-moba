/*
 * @Author: dgflash
 * @Date: 2022-05-05 12:13:02
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 17:05:30
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { RoomEvent } from "../RoomEvent";

/** 自己创建房间 */
@ecs.register('RoomOwnerCreate')
export class RoomOwnerCreateComp extends ecs.Comp {
    /** 房间名 */
    roomName: string = null;
    /** 玩家名 */
    nickname: string = null;

    reset(): void {
        this.roomName = null;
        this.nickname = null;
    }
}

export class RoomOwnerCreateSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomOwnerCreateComp);
    }

    async entityEnter(e: Room) {
        let roc = e.get(RoomOwnerCreateComp);
        let ret = await smc.net.hcMatch.callApi(`RoomCreate`, { roomName: roc.roomName });
        if (ret.isSucc) {
            e.RoomModel.roomId = ret.res.roomId;
            e.RoomModel.serverUrl = ret.res.serverUrl;
            e.RoomModel.nickname = roc.nickname;

            // 通知创建房间完成
            oops.message.dispatchEvent(RoomEvent.RoomEnter);
        }
        else {
            oops.gui.toast(`【房间】${ret.err.message}`);
        }
        e.remove(RoomOwnerCreateComp);
    }
}