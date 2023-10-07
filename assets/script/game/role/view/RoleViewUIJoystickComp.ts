/*
 * @Author: dgflash
 * @Date: 2022-02-12 13:38:13
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-22 17:10:00
 */

import { EditBox, EventTouch, Label, Node, _decorator } from 'cc';
import { DEBUG } from 'cc/env';
import { oops } from '../../../../../extensions/oops-plugin-framework/assets/core/Oops';
import { ecs } from '../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import VMLabel from '../../../../../extensions/oops-plugin-framework/assets/libs/model-view/VMLabel';
import { CCComp } from '../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp';
import { BuffAbility } from '../../battle/common/bll/buff/BuffAbility';
import { smc } from '../../common/SingletonModuleComp';
import { Role } from '../Role';
import { Joystick, JoystickDataType, SpeedType } from './joystick/Joystick';

const { ccclass, property } = _decorator;

/** 角色摇撼控制 */
@ccclass("RoleViewUIJoystickComp")
@ecs.register('RoleViewUIJoystick', false)
export class RoleViewUIJoystickComp extends CCComp {
    @property({ type: Joystick })
    joystick: Joystick = null!;

    @property({ type: EditBox })
    chatContent: EditBox = null!;

    @property({ type: Node })
    labelTitle: Node = null!;

    @property({ type: Node })
    labelServerUrl: Node = null!;

    /** 目标控制角色 */
    private owner: Role;

    init() {
        if (!DEBUG) {
            this.labelServerUrl.active = false;

            this.labelTitle.getComponent(VMLabel).destroy();
            this.labelTitle.getComponent(Label).string = "点击获取源码";
            this.labelTitle.on(Node.EventType.TOUCH_END, () => {
                window.open("https://store.cocos.com/app/detail/3814", "_blank");
            }, this);
        }

        this.owner = this.ent as Role
        this.joystick.onController = (event: EventTouch, data: JoystickDataType) => {
            if (this.owner.die || BuffAbility.moveNotAllowed(this.owner) || this.owner.RoleView.isNoMove) return;

            switch (data.type) {
                case SpeedType.NORMAL:
                case SpeedType.FAST:
                    smc.room.roleMoveJoystick(data.vector, data.angle);
                    break;
                case SpeedType.STOP:
                    smc.room.roleMoveJoystick();
                    break;
            }
        }
    }

    // 简单的技能冷却功能
    private cd: number = 0;
    private cd_start: number = 0;

    /** 技能施放 */
    private skill(event: Event, customEventData: string) {
        var t = oops.timer.getTime();
        if (t - this.cd_start >= this.cd || this.cd_start == 0) {
            this.cd_start = t;
        }
        else {
            return;
        }

        smc.room.RoomModel.owner.readyCastSkill(parseInt(customEventData));
    }

    private exit() {
        smc.room.leave();
    }

    /** 聊天 */
    private chat() {
        if (this.chatContent.string != "") {
            smc.room.chat(this.chatContent.string);
            this.chatContent.string = "";
        }
    }

    reset(): void {

    }
}