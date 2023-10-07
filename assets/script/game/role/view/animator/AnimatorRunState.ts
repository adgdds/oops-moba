/*
 * @Author: dgflash
 * @Date: 2022-03-28 16:45:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-21 16:24:09
 */

import { oops } from "../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { AnimatorStateLogic } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/core/AnimatorStateLogic";
import { RoomRoleUtil } from "../../../../../../tsrpc_server/src/module/room/bll/RoomRoleUtil";
import { RoomUtil } from "../../../room/bll/RoomUtil";
import { Role } from "../../Role";
import { AnimatorEvent } from "../RoleAnimatorEnum";
import { RoleViewComp } from "../RoleViewComp";
import { AnimatorEventHandler } from "./AnimatorEventHandler";
import { RoleViewAnimatorSkeletal } from "./RoleViewAnimatorSkeletal";

/** 跑动逻辑 */
export class AnimatorRunState extends AnimatorStateLogic {
    private anim: AnimatorEventHandler;
    private role: Role;

    constructor(rvas: RoleViewAnimatorSkeletal, anim: AnimatorEventHandler) {
        super();
        this.anim = anim;
        this.role = rvas.getComponent(RoleViewComp)!.ent as Role;
        this.anim.addFrameEvent(AnimatorEvent.Run1, this.onRun1, this);
        this.anim.addFrameEvent(AnimatorEvent.Run2, this.onRun2, this);
    }

    private onRun1() {
        if (RoomUtil.isOwner(this.role)) oops.audio.playEffect(`audio/foot_step1`);
    }

    private onRun2() {
        if (RoomUtil.isOwner(this.role)) oops.audio.playEffect(`audio/foot_step2`);
    }

    public onEntry() {

    }

    public onUpdate() {

    }

    public onExit() {

    }
}