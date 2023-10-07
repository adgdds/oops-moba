/*
 * @Author: dgflash
 * @Date: 2022-06-22 18:30:08
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 14:15:28
 */

import { HttpClient, HttpServer } from "tsrpc";
import { ecs } from "../../../core/ecs/ECS";
import { ServiceType as ServiceTypeMatch } from "../../../tsrpc/protocols/ServiceProtoMatch";

/** 网关服务器数据 */
@ecs.register('GateModel')
export class GateModelComp extends ecs.Comp {
    /** 服务管理器 */
    hsGate: HttpServer = null!;
    /** 匹配服务器 Http 连接对象 */
    hcMatch = new Map<string, HttpClient<ServiceTypeMatch>>();

    reset(): void {
        
    }
}