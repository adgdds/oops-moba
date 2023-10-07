/*
 * @Author: dgflash
 * @Date: 2022-05-12 19:29:37
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 17:34:44
 */
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { UIID } from "../../common/config/GameUIConfig";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { RoomNetMsgComp } from "./RoomNetMsg";

/** 自己离开房间后续逻辑 */
@ecs.register('RoomOwnerLeave')
export class RoomOwnerLeaveComp extends ecs.Comp {
    reset(): void { }
}

export class RoomOwnerLeaveSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomOwnerLeaveComp);
    }

    entityEnter(e: Room): void {
        e.remove(RoomNetMsgComp);

        // 房间数据清理
        e.RoomModel.reset();

        // 卸载地图
        smc.scene.unload();

        // 打开匹配界面
        oops.gui.open(UIID.Demo_Match);

        // 关闭角色只界面
        oops.gui.remove(UIID.Demo_Role_Controller);

        e.remove(RoomOwnerLeaveComp);

        Logger.logBusiness("【房间】自己离开");
    }
}