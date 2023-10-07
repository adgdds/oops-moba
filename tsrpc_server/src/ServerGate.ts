/*
 * @Author: dgflash
 * @Date: 2022-06-22 18:37:06
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 16:43:57
 */
import { ecs } from "./core/ecs/ECS";
import { CommonUtil } from "./module/common/CommonUtil";
import { dev } from "./module/config/Config";
import { ServerGate } from "./server/gate/ServerGate";
import { ServerGateSystem } from "./server/gate/ServerGateSystem";

/** 网关服务器对象 */
export var sg: ServerGate = null!

function main() {
    dev();

    CommonUtil.init(new ServerGateSystem());

    sg = ecs.getEntity<ServerGate>(ServerGate);
    sg.start()
}

main();