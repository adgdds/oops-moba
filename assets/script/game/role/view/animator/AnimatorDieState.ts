/*
 * @Author: dgflash
 * @Date: 2022-06-09 18:23:42
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 18:05:17
 */
import { AnimatorStateLogic } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/core/AnimatorStateLogic";
import { Role } from "../../Role";
import { RoleViewComp } from "../RoleViewComp";
import { AnimatorEventHandler } from "./AnimatorEventHandler";
import { RoleViewAnimatorSkeletal } from "./RoleViewAnimatorSkeletal";

/** 跑动逻辑 */
export class AnimatorDieState extends AnimatorStateLogic {
    private rvas: RoleViewAnimatorSkeletal;
    private role: Role;

    constructor(rvas: RoleViewAnimatorSkeletal, anim: AnimatorEventHandler) {
        super();
        this.rvas = rvas;
        this.role = rvas.getComponent(RoleViewComp)!.ent as Role;
    }

    onEntry() {
        this.rvas.isNoMove = true;
    }

    onUpdate() {

    }

    onExit() {

    }
}