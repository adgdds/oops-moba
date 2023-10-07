/*
 * @Author: dgflash
 * @Date: 2022-05-12 19:32:02
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:10:16
 */

import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";

/** 房间内角色之间聊天 */
@ecs.register('MsgRoleChat')
export class MsgRoleChatComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleChatSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleChatComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/Chat`, v => {
            oops.gui.toast(`${v.roleInfo.nickname}:${v.content}`);
        });
    }
}