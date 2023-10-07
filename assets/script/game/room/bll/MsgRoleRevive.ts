/*
 * @Author: dgflash
 * @Date: 2022-09-01 10:56:00
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-21 17:51:51
 */
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";

/** 角色复活 */
@ecs.register('MsgRoleRevive')
export class MsgRoleReviveComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleReviveSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleReviveComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoleRevive`, v => {
            let target = e.RoomModel.roles.get(v.uid);
            if (target == null) {
                Logger.logNet(`编号为【${v.uid}】的角色不存在`);
                return;
            }

            Logger.logNet(`收到【${target.RoleModel.nickname}】复活`);
        });
    }
}