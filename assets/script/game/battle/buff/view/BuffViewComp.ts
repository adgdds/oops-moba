import { _decorator } from "cc";
import { EffectSingleCase } from "../../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/EffectSingleCase";
import { ecs } from "../../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCComp } from "../../../../../../extensions/oops-plugin-framework/assets/module/common/CCComp";

const { ccclass, property } = _decorator;

/** BUFF持续特效显示对象 */
@ccclass('BuffViewComp')
@ecs.register('BuffView', false)
export class BuffViewComp extends CCComp {
    reset() {
        EffectSingleCase.instance.put(this.node);
    }
}