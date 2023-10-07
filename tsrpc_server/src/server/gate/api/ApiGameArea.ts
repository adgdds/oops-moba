/*
 * @Author: dgflash
 * @Date: 2022-06-23 17:48:28
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-28 11:14:53
 */
import { ApiCall } from "tsrpc";
import { Config } from "../../../module/config/Config";
import { ReqGameArea, ResGameArea } from "../../../tsrpc/protocols/gate/PtlGameArea";

/** 获取游戏分区信息与分区服务器地址 */
export async function ApiGameArea(call: ApiCall<ReqGameArea, ResGameArea>) {
    call.succ({
        area: Config.gate.area
    });
}