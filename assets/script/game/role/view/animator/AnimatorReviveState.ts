/*
 * @Author: dgflash
 * @Date: 2022-06-10 10:28:39
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-21 18:37:32
 */
import { EffectSingleCase } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { AnimatorStateLogic } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator/core/AnimatorStateLogic";
import { RoleAttributeType } from "../../model/RoleEnum";
import { Role } from "../../Role";
import { RoleViewComp } from "../RoleViewComp";
import { AnimatorEventHandler } from "./AnimatorEventHandler";
import { RoleViewAnimatorSkeletal } from "./RoleViewAnimatorSkeletal";

/** 跑动逻辑 */
export class AnimatorReviveState extends AnimatorStateLogic {
    private rvas: RoleViewAnimatorSkeletal;
    private role: Role;

    constructor(rvas: RoleViewAnimatorSkeletal, anim: AnimatorEventHandler) {
        super();
        this.rvas = rvas;
        this.role = rvas.getComponent(RoleViewComp)!.ent as Role;
    }

    async onEntry() {
        console.log(`【${this.role.RoleModel.nickname}】复活`);

        // 复活回满生命
        var hp = this.role.RoleModel.attributes.get(RoleAttributeType.hp);
        var hpMax = this.role.RoleModel.attributes.get(RoleAttributeType.hpMax);
        hp.skill = hpMax.value;
        this.role.RoleViewUITop.setHp(hp.skill, hpMax.value);

        // 复活特效
        await EffectSingleCase.instance.loadAndShow(
            "game/content/skill/hit/foot_revival",
            this.role.RoleView.node,
            { isPlayFinishedRelease: true });
    }

    public onUpdate() {

    }

    public onExit() {
        console.log("复活完成");

        this.rvas.isNoMove = false;
    }
}