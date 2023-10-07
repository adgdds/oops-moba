/*
 * @Author: dgflash
 * @Date: 2022-08-16 14:07:00
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 13:47:33
 */
import { ecs } from "../../../core/ecs/ECS";
import { BattleBridge } from "../../battle/common/bll/BattleBridge";
import { Room } from "../Room";

/** 进入战场 */
@ecs.register('BattlefieldEnter')
export class BattlefieldEnterComp extends ecs.Comp {
    reset() { }
}

export class BattlefieldEnterSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
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
    }
}