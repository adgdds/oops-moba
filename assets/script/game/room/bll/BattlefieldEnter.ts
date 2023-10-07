/*
 * @Author: dgflash
 * @Date: 2022-08-16 14:07:00
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-16 18:02:00
 */
import { EventMessage } from "../../../../../extensions/oops-plugin-framework/assets/core/common/event/EventMessage";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { BattleBridge } from "../../battle/common/bll/BattleBridge";
import { Room } from "../Room";
import { RoomUtil } from "./RoomUtil";

/** 进入战场 */
@ecs.register('BattlefieldEnter')
export class BattlefieldEnterComp extends ecs.Comp {
    reset() { }
}

export class BattlefieldEnterSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem, ecs.IEntityRemoveSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(BattlefieldEnterComp);
    }

    entityEnter(e: Room): void {
        // 进入战场触发所有角色被动技能
        BattleBridge.roles.forEach(role => {
            role.RoleSkillLearned.skills.forEach(skill => {
                skill.SkillModel.casting.onPassive();
            });
        });

        oops.message.on(EventMessage.GAME_ENTER, this.onHandler, this);
    }

    entityRemove(e: Room): void {
        oops.message.off(EventMessage.GAME_ENTER, this.onHandler, this);
    }

    private onHandler(event: string, args: any) {
        switch (event) {
            case EventMessage.GAME_ENTER:
                RoomUtil.resetRolesHp();
                break;
        }
    }
}