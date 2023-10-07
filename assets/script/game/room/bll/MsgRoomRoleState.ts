/*
 * @Author: dgflash
 * @Date: 2022-05-18 09:57:57
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 17:53:09
 */
import { Vec3 } from "cc";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { RoleSkillShiftingComp } from "../../battle/skill/model/RoleSkillShiftingComp";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { RoomUtil } from "./RoomUtil";

/** 
 * 玩家状态同步逻辑 
 * 1、验证数据正确性
 */
@ecs.register('MsgRoomRoleState')
export class MsgRoomRoleStateComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoomRoleStateSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoomRoleStateComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoomRoleState`, v => {
            for (let uid in v.states) {
                let us = v.states[uid];
                const role = e.RoomModel.roles.get(uid);
                if (!RoomUtil.isOwner(role)) {
                    // 是否正处于技能位移动画状态      
                    if (role && !role.has(RoleSkillShiftingComp)) {
                        const rv = role.RoleView;
                        if (Vec3.squaredDistance(rv.node.position, us.pos) > 2) {
                            // 缓动移动到与服务器同步的位置
                            rv.moveTween(us);
                        }
                    }
                }
            }
        });
    }
}