/*
 * @Author: dgflash
 * @Date: 2022-05-13 14:04:06
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 15:50:29
 */
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { RoleCampType } from "../../role/model/RoleEnum";
import { Room } from "../Room";
import { RoomUtil } from "./RoomUtil";

/** 其它角色加入房间 */
@ecs.register('MsgRoleJoin')
export class MsgRoleJoinComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleJoinSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleJoinComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoleJoin`, v => {
            var data = v.role;
            if (RoomUtil.isOwner(data.roleInfo)) {
                e.RoomModel.vm.amount++;
                if (!e.RoomModel.roles.has(data.roleInfo.id)) {
                    let role = RoomUtil.roleCreate(data);
                    role.RoleModel.camp = RoleCampType.Enemy;
                    role.loadUITop();
                    Logger.logBusiness(`【房间】加入玩家【${role.RoleModel.nickname}】`);
                }
            }
        });
    }
}