/*
 * @Author: dgflash
 * @Date: 2022-05-20 14:03:53
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 12:30:50
 */

import { ecs } from "../../core/ecs/ECS";
import { MsgRoleRevive } from "../../tsrpc/protocols/room/server/MsgRoleRevive";
import { RoleSkillLearnedComp } from "../battle/skill/model/RoleSkillLearnedComp";
import { RoleLeaveRoom } from "./bll/RoleLeaveRoom";
import { RoleMsgs } from "./bll/RoleMsgs";
import { RoleAttributeType } from "./model/RoleEnum";
import { RoleModelComp } from "./model/RoleModelComp";
import { RoleViewComp } from "./model/RoleViewComp";

/** 房间中玩家连接对象 */
@ecs.register(`Role`)
export class Role extends ecs.Entity {
    RoleModel!: RoleModelComp;
    RoleView!: RoleViewComp;

    RoleSkillLearned!: RoleSkillLearnedComp;

    /**
     * 是否死亡
     * return true为死亡;false为存活
     */
    get die(): boolean {
        return this.RoleModel.attributes.get(RoleAttributeType.hp).value == 0;
    }

    protected init() {
        this.addComponents<ecs.Comp>(
            RoleModelComp,
            RoleViewComp,
            RoleSkillLearnedComp
        );
    }

    /** 离开房间 */
    leave() {
        RoleLeaveRoom.leave(this);
    }

    /** 添加监听消息 */
    addMsgs() {
        RoleMsgs.add(this);
    }

    /** 删除监听消息 */
    removeMsgs() {
        RoleMsgs.remove(this);
    }

    /** 死亡后3秒复活 */
    revive() {
        if (this.die) {
            console.log(`【${this.RoleModel.nickname}】3秒后复活`);

            var hp = this.RoleModel.attributes.get(RoleAttributeType.hp);
            var hpMax = this.RoleModel.attributes.get(RoleAttributeType.hpMax);
            hp.skill = hpMax.value;

            setTimeout(() => {
                var msg: MsgRoleRevive = { uid: this.RoleModel.info.id };
                this.RoleModel.room.broadcastMsg(`server/RoleRevive`, msg);
            }, 3000);
        }
    }

    /** 释放角色对象 */
    destroy(): void {
        this.remove(RoleSkillLearnedComp);
        super.destroy();
    }
}