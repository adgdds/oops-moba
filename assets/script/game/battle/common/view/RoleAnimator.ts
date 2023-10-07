/*
 * @Author: dgflash
 * @Date: 2022-09-16 09:38:53
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 09:58:10
 */
import { oops } from "../../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { smc } from "../../../common/SingletonModuleComp";
import { Role } from "../../../role/Role";
import { Effect, EffectDamage, StateType } from "../../skill/model/ISkillReport";

/** 角色动画 */
export class RoleAnimator {
    /**
     * 角色死亡动作
     * @param target  目标角色
     * @param effect  伤害效果
     */
    static die(target: Role, effect: Effect) {
        if (effect instanceof EffectDamage && effect.state == StateType.Die) {
            var time = 3;
            var id = setInterval(() => {
                time--;
                if (time == 0) {
                    clearInterval(id);
                    target.RoleView.revive();
                }
                else {
                    if (smc.room.RoomModel.owner == target) oops.gui.toast(`还有${time}秒复活`);
                }
            }, 1000);

            target.RoleView.die();
        }
    }
}