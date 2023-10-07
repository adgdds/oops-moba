/*
 * @Author: dgflash
 * @Date: 2022-05-12 19:29:37
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:10:04
 */
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";

/** 其它角色离开房间 */
@ecs.register('MsgRoleLeave')
export class MsgRoleLeaveComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleLeaveSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleLeaveComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoleLeave`, v => {
            e.RoomModel.vm.amount--;

            var role = e.RoomModel.roles.get(v.roleInfo.id);
            if (role) {
                Logger.logBusiness(`【房间】离开玩家【${role.RoleModel.nickname}】`);
                e.RoomModel.roles.delete(v.roleInfo.id);
                role.destroy();
            }
        });
    }
}