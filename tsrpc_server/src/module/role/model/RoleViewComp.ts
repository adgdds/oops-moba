/*
 * @Author: dgflash
 * @Date: 2022-08-25 12:04:32
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-25 12:14:54
 */

import { ecs } from "../../../core/ecs/ECS";
import { Vec3 } from "../../common/math/vec3";
import { RoleModelComp } from "./RoleModelComp";

class Node {
    private rv: RoleViewComp = null!;
    private pos: Vec3 = new Vec3();

    constructor(rv: RoleViewComp) {
        this.rv = rv;
    }

    get position(): Vec3 {
        var pos = this.rv.ent.get(RoleModelComp).state.pos;
        this.pos.set(pos.x, pos.y, pos.z)
        return this.pos;
    }
}

/** 角色桥接数据 */
@ecs.register('RoleView')
export class RoleViewComp extends ecs.Comp {
    node: Node = new Node(this);

    reset(): void {
        this.node = null!;
    }
}