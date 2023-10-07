/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:45
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 15:18:05
 */
import { Label, Node, _decorator } from 'cc';
import { Effect2DFollow3D } from '../../../../../extensions/oops-plugin-framework/assets/libs/animator-effect/Effect2DFollow3D';
import { ecs } from '../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import { CCVMParentComp } from '../../../../../extensions/oops-plugin-framework/assets/module/common/CCVMParentComp';
import { smc } from '../../common/SingletonModuleComp';
import { RoleAttributeType } from '../model/RoleEnum';
import { Role } from '../Role';
const { ccclass, property } = _decorator;

/** 角色名字 */
@ccclass('RoleViewUITopComp')
@ecs.register('RoleViewUITop', false)
export class RoleViewUITopComp extends CCVMParentComp {
    @property({ type: Label, tooltip: '角色名' })
    private labName: Label = null!;

    /** 跟随目标 */
    private followTarget: Node = null!;

    protected data: any = {
        /** 控制血条生命当前值 */
        hp: 0,
        /** 控制血条生命最大值 */
        hpMax: 0,
        /** 阵营控制血条显示不同颜色 */
        type: 0,
    };

    /** 2D跟随3D节点的组件 */
    private ui3dc: Effect2DFollow3D = null!;

    onLoad() {
        super.onLoad();

        this.ui3dc = this.node.addComponent(Effect2DFollow3D)!;
        this.ui3dc.nodeUi = this.node;
        this.ui3dc.camera = smc.camera.CameraModel.camera;
        this.ui3dc.node3d = this.followTarget;

        var role = this.ent as Role;
        this.data.hp = role.RoleModel.attributes.get(RoleAttributeType.hp).value;
        this.data.hpMax = role.RoleModel.attributes.get(RoleAttributeType.hpMax).value;
        this.data.camp = role.RoleModel.camp;

        this.labName.string = role.RoleModel.nickname;
    }

    /** 设置跟随目标 */
    setTarget(target: Node) {
        this.followTarget = target;
    }

    /** 设置血条 */
    setHp(hp: number, hpMax: number) {
        this.data.hp = hp;
        this.data.hpMax = hpMax;
    }

    reset(): void {
        this.node.destroy();
    }
}
