
/*
 * @Author: dgflash
 * @Date: 2021-11-18 17:47:56
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:36:17
 */
import { Node, Vec3 } from "cc";
import { Logger } from "../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { oops } from "../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ViewUtil } from "../../../../extensions/oops-plugin-framework/assets/core/utils/ViewUtil";
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { SkillState } from "../../tsrpc/protocols/room/server/MsgRoleAttack";
import { RoleSkillLearnedComp } from "../battle/skill/model/RoleSkillLearnedComp";
import { Skill } from "../battle/skill/Skill";
import { UIID } from "../common/config/GameUIConfig";
import { smc } from "../common/SingletonModuleComp";
import { RoleAttributeType } from "./model/RoleEnum";
import { RoleModelComp } from "./model/RoleModelComp";
import { RoleViewComp } from "./view/RoleViewComp";
import { RoleViewUIJoystickComp } from "./view/RoleViewUIJoystickComp";
import { RoleViewUITopComp } from "./view/RoleViewUITopComp";
import { RoleViewUITouchComp } from "./view/RoleViewUITouchComp";

/** 
 * 角色实体
 */
@ecs.register(`Role`)
export class Role extends ecs.Entity {
    RoleModel!: RoleModelComp;
    RoleSkillLearned!: RoleSkillLearnedComp;

    RoleView!: RoleViewComp;
    RoleViewUITop!: RoleViewUITopComp;
    RoleViewUIJoystick!: RoleViewUIJoystickComp;
    RoleViewUITouch!: RoleViewUITouchComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            RoleModelComp,
            RoleSkillLearnedComp);
    }

    /**
     * 是否死亡
     * @return true为死亡;false为存活
     */
    get die(): boolean {
        return this.RoleModel.attributes.get(RoleAttributeType.hp).value == 0;
    }

    /** 准备释放技能 */
    readyCastSkill(skillId: number) {
        if (this.die || this.RoleView.isNoMove) return;

        // 普通攻击
        var skill = this.RoleSkillLearned.skills.get(skillId);
        var casting = skill.SkillModel.casting;
        casting.skill = skill;
        casting.caster = this;

        // 自动选目标
        if (casting.autoSelectTarget()) {
            // 验证是否在技能限制的释放范围内
            if (casting.checkDistance()) {
                this.attackCmd(skillId);
            }
            // 自动移动到技能可施放的范围
            else {
                if (casting.target instanceof Role)         // 指定目标角色方向移动
                    smc.room.roleMoveTarget(casting.target.RoleView.node.position, skillId, casting.target.RoleModel.id);
                else                                        // 指定具体坐标方向移动
                    smc.room.roleMoveTarget(casting.target, skillId);
            }
        }
        else {
            oops.gui.toast("游戏中没有其它玩家可攻击，攻击时会优先攻击距离最近玩家")
        }
    }

    /** 攻击命令 */
    attackCmd(skillId: number) {
        var skill = this.RoleSkillLearned.skills.get(skillId);
        if (skill.SkillModel.table.front)
            smc.room.roleAttack(this, skill.SkillModel.casting.target, skill.SkillModel.id, SkillState.Front);
        else
            smc.room.roleAttack(this, skill.SkillModel.casting.target, skill.SkillModel.id, SkillState.Casting);
    }

    /**
     * 攻击目标动作
     * @param target 攻击
     */
    attack(target: Role | Vec3, skill: Skill) {
        smc.room.BattlefieldModel.readyCastSkill = skill;
        if (target instanceof Role) {
            this.RoleView.lootAt(target.RoleView.node.position);
        }
        else {
            this.RoleView.lootAt(target);
        }
        this.RoleView.attack();
    }

    /** 释放角色对象 */
    destroy(): void {
        Logger.logBusiness(`【角色】释放角色 - ${this.RoleModel.nickname}`);

        this.remove(RoleSkillLearnedComp);
        this.remove(RoleViewUITopComp);
        this.remove(RoleViewComp);

        if (this.RoleViewUIJoystick) this.remove(RoleViewUIJoystickComp);
        if (this.RoleViewUITouch) this.remove(RoleViewUITouchComp);

        super.destroy();
    }

    /** 加载模型 */
    load(parent: Node): Node | null {
        var path = this.RoleModel.res;
        // 注：防一个客户端切到后面，一个玩家加入又退出时，玩家模型资源后，玩家对象被释放了
        if (this.RoleModel) {
            var node = ViewUtil.createPrefabNode(path);
            var comp = node.getComponent(RoleViewComp)!;
            node.parent = parent;
            this.add(comp);
            return node;
        }
        else {
            node.destroy();
            return null;
        }
    }

    /** 加载摇撼控制 */
    async loadUIJoystick() {
        var node = await oops.gui.openAsync(UIID.Demo_Role_Controller);
        var comp = node.getComponent(RoleViewUIJoystickComp);
        this.add(comp);
        comp.init();
    }

    /** 加载触摸控制 */
    loadUITouchMove() {
        var comp = oops.game.root.addComponent(RoleViewUITouchComp);
        this.add(comp);
    }

    /** 加载角色头顶名字与血条 */
    loadUITop() {
        var top_node = ViewUtil.createPrefabNode("game/content/player/player_top");
        var top = top_node.getComponent(RoleViewUITopComp);
        top.setTarget(this.RoleView.posName);
        this.add(top);
        top_node.parent = oops.gui.game;
    }
}

export class EcsRoleSystem extends ecs.System {
    constructor() {
        super();
    }
}