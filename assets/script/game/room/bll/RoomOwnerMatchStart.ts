/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 17:06:02
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { RoomEvent } from "../RoomEvent";

/** 开始匹配 */
@ecs.register('RoomOwnerMatchStart')
export class RoomOwnerMatchStartComp extends ecs.Comp {
    /** 角色名 */
    nickname: string = null;

    reset(): void {
        this.nickname = null;
    }
}

export class RoomOwnerMatchStartSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomOwnerMatchStartComp);
    }

    async entityEnter(e: Room) {
        let ret = await smc.net.hcMatch.callApi('MatchStart', {}, { timeout: 5000 });
        if (ret.isSucc) {
            e.RoomModel.roomId = ret.res.roomId;
            e.RoomModel.serverUrl = ret.res.serverUrl;
            e.RoomModel.nickname = e.get(RoomOwnerMatchStartComp).nickname;

            // 通知创建房间完成
            oops.message.dispatchEvent(RoomEvent.RoomEnter);
        }
        else {
            oops.gui.toast(`【房间】${ret.err.message}`);
        }
        e.remove(RoomOwnerMatchStartComp);
    }
}