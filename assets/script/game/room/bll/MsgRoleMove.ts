/*
 * @Author: dgflash
 * @Date: 2022-05-16 18:38:07
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:36:50
 */
import { v3 } from "cc";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Room } from "../Room";
import { RoomUtil } from "./RoomUtil";

/** 角色位置同步 */
@ecs.register('MsgRoleMove')
export class MsgRoleMoveComp extends ecs.Comp {
    reset(): void { }
}

export class MsgRoleMoveSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MsgRoleMoveComp);
    }

    entityEnter(e: Room): void {
        smc.net.wscRoom.listenMsg(`server/RoleMove`, v => {
            let role = e.RoomModel.roles.get(v.state.uid);
            if (role && role.RoleView) {
                if (v.state.target) {
                    let pos = v3(v.state.target.x, v.state.target.y, v.state.target.z);

                    // 移动到技能施放范围后触发技能
                    if (RoomUtil.isOwner(role) && v.state.skillId) {
                        let skill = role.RoleSkillLearned.skills.get(v.state.skillId);
                        role.RoleView.moveTouch(pos, skill.SkillModel.table.distance, () => {
                            role.attackCmd(v.state.skillId);
                        });
                    }
                    // 目标位置移动
                    else {
                        role.RoleView.moveTouch(pos);
                    }
                }
                else {
                    // 摇杆移动
                    if (v.state.joystick) {
                        role.RoleView.moveJoystick(v.state);
                    }
                    // 停止移动
                    else {
                        role.RoleView.idle();
                    }
                }
            }
        });
    }
}