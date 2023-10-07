/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 16:42:29
 */
import { ecs } from "./core/ecs/ECS";
import { CommonUtil } from "./module/common/CommonUtil";
import { dev } from "./module/config/Config";
import { ServerMatch } from "./server/match/ServerMatch";
import { ServerMatchSystem } from "./server/match/ServerMatchSystem";

/** 匹配服务器对象 */
export var sm: ServerMatch = null!

function main() {
    dev();

    CommonUtil.init(new ServerMatchSystem());

    sm = ecs.getEntity<ServerMatch>(ServerMatch);
    sm.start()
}

main();