/*
 * @Author: dgflash
 * @Date: 2022-03-28 16:45:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:44:24
 */

import { AnimatorStateLogic } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/core/AnimatorStateLogic";
import { SkillState } from "../../../../tsrpc/protocols/room/server/MsgRoleAttack";
import { smc } from "../../../common/SingletonModuleComp";
import { Role } from "../../Role";
import { AnimatorEvent } from "../RoleAnimatorEnum";
import { RoleViewComp } from "../RoleViewComp";
import { AnimatorEventHandler } from "./AnimatorEventHandler";
import { RoleViewAnimatorSkeletal } from "./RoleViewAnimatorSkeletal";

/** 攻击逻辑 */
export class AnimatorAttackState extends AnimatorStateLogic {
    private role: Role;

    constructor(rvas: RoleViewAnimatorSkeletal, anim: AnimatorEventHandler) {
        super();
        this.role = rvas.getComponent(RoleViewComp)!.ent as Role;
        anim.addFrameEvent(AnimatorEvent.Attack, this.onAttack, this);
        anim.addFrameEvent(AnimatorEvent.Attack_End, this.onAttackEnd, this);
    }

    private onAttack() {
        this.role.RoleView.isNoMove = true;
        this.role.RoleView.onAttack && this.role.RoleView.onAttack();

        // 通知服务器广播释放技能命令
        if (this.role == smc.room.RoomModel.owner) {
            var sm = smc.room.BattlefieldModel.readyCastSkill.SkillModel;
            var skillId = sm.id;
            var target = sm.casting.target as Role;

            // 通知技能释放命令
            smc.room.roleAttack(this.role, target, skillId, SkillState.Casting);
        }
    }

    private onAttackEnd() {
        this.role.RoleView.isNoMove = false;
    }

    onEntry() {

    }

    onUpdate() {

    }

    onExit() {

    }
}