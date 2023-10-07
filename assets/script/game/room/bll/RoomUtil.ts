/*
 * @Author: dgflash
 * @Date: 2022-05-13 15:42:58
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-13 15:49:41
 */

import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { RoleDetailed, RoleInfo, RolePosition, RoleRotation } from "../../../tsrpc/types/RoleState";
import { BattleBridge } from "../../battle/common/bll/BattleBridge";
import { Skill } from "../../battle/skill/Skill";
import { smc } from "../../common/SingletonModuleComp";
import { RoleAttributeType } from "../../role/model/RoleEnum";
import { Role } from "../../role/Role";

export class RoomUtil {
    /**
     * 设置角色已学会的技能
     * @param role 目标角色
     */
    static roleSkillInit(role: Role) {
        // 创建技能数据（测试数据）
        var srl = role.RoleSkillLearned;
        var skill1 = ecs.getEntity<Skill>(Skill);
        skill1.SkillModel.id = 1;
        srl.skills.set(skill1.SkillModel.id, skill1);

        var skill2 = ecs.getEntity<Skill>(Skill);
        skill2.SkillModel.id = 2;
        srl.skills.set(skill2.SkillModel.id, skill2);

        var skill3 = ecs.getEntity<Skill>(Skill);
        skill3.SkillModel.id = 3;
        srl.skills.set(skill3.SkillModel.id, skill3);

        var skill4 = ecs.getEntity<Skill>(Skill);
        skill4.SkillModel.id = 4;
        srl.skills.set(skill4.SkillModel.id, skill4);

        var skill5 = ecs.getEntity<Skill>(Skill);
        skill5.SkillModel.id = 5;
        srl.skills.set(skill5.SkillModel.id, skill5);

        var skill6 = ecs.getEntity<Skill>(Skill);
        skill6.SkillModel.id = 6;
        srl.skills.set(skill6.SkillModel.id, skill6);

        var skill7 = ecs.getEntity<Skill>(Skill);
        skill7.SkillModel.id = 7;
        srl.skills.set(skill7.SkillModel.id, skill7);
    }

    /** 添加玩家数据到房间中 */
    static roleCreate(data: RoleDetailed): Role {
        let role = ecs.getEntity<Role>(Role);
        role.RoleModel.id = data.roleInfo.id;
        role.RoleModel.nickname = data.roleInfo.nickname;
        role.load(oops.game.root);

        this.setAttributes(role, data.attributes);
        this.roleViewInit(role, data.state.pos, data.state.rotation);
        this.roleSkillInit(role);

        // 准备初始化的玩家对象
        smc.room.RoomModel.roles.set(role.RoleModel.id, role);

        return role;
    }

    /** 设置玩家初始位置与方向 */
    static roleViewInit(role: Role, pos: RolePosition, rotation: RoleRotation) {
        role.RoleView.node.setPosition(pos.x, pos.y, pos.z);
        role.RoleView.node.setRotation(rotation.x, rotation.y, rotation.z, rotation.w);
    }

    /**
     * 批量设置角色属性
     * @param role  目标角色
     * @param data  属性数据
     */
    static setAttributes(role: Role, data: { [type: string]: number }) {
        var attributes = role.RoleModel.attributes;
        for (var type in data) {
            attributes.get(type as RoleAttributeType).skill = data[type];
        }
    }

    /**
     * 是否为自己
     * @param target 玩家
     */
    static isOwner(target: RoleInfo | Role) {
        if (target instanceof Role) {
            return target === BattleBridge.owner;
        }
        else {
            return target.id != BattleBridge.owner.RoleModel.id;
        }
    }

    /** 网卡、断线重连接、断点时重置所有角色HP */
    static resetRolesHp() {
        setTimeout(() => {
            smc.room.RoomModel.roles.forEach(role => {
                var hp = role.RoleModel.attributes.get(RoleAttributeType.hp);
                var hpMax = role.RoleModel.attributes.get(RoleAttributeType.hpMax);
                role.RoleViewUITop.setHp(hp.value, hpMax.value);
            });
        }, 1000);
    }
}