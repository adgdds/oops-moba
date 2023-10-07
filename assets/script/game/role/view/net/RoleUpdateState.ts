/*
 * @Author: dgflash
 * @Date: 2022-05-17 17:13:02
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 10:29:43
 */
import { Component, _decorator } from "cc";
import { MoveTo } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTo";
import { MoveTranslate } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-move/MoveTranslate";
import { MsgRoleState } from "../../../../../../tsrpc_server/src/tsrpc/protocols/room/client/MsgRoleState";
import { GameServerConfig } from "../../../common/config/GameServerConfig";
import { smc } from "../../../common/SingletonModuleComp";
import { Role } from "../../Role";
import { RoleViewComp } from "../RoleViewComp";

const { ccclass, property } = _decorator;

/** 同步自己的状态给服务器 */
@ccclass('RoleUpdateState')
export class RoleUpdateState extends Component {
    role: Role = null;

    onLoad() {
        this.role = this.getComponent(RoleViewComp).ent as Role;
        this.schedule(this.updateState, GameServerConfig.player_state_update_rate);
    }

    updateState() {
        let move = this.getComponent(MoveTranslate);
        let action;
        if (move) {
            if (move.speed > 0)
                action = "run";
            else
                action = "idle";
        }
        else {
            let moveTo = this.getComponent(MoveTo);
            if (moveTo)
                action = "run";
            else
                action = "idle";
        }

        var msg: MsgRoleState = {
            pos: this.node.position,
            rotation: this.node.rotation,
            action
        }
        smc.net.wscRoom.sendMsg(`client/RoleState`, msg);
    }
}