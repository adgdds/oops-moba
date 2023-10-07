/*
 * @Author: dgflash
 * @Date: 2022-06-28 17:57:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:29:15
 */

import chalk from "chalk";
import { HttpClient, HttpServer, HttpServerOptions, PrefixLogger, WsClient, WsServer, WsServerOptions } from "tsrpc";
import { Security } from "../../tsrpc/models/Security";
import { ShareConfig } from "../../tsrpc/models/ShareConfig";
import { serviceProto as ServiceProtoGate, ServiceType as ServiceTypeGate } from "../../tsrpc/protocols/ServiceProtoGate";
import { serviceProto as ServiceProtoMatch, ServiceType as ServiceTypeMatch } from "../../tsrpc/protocols/ServiceProtoMatch";
import { serviceProto as ServiceProtoRoom, ServiceType as ServiceTypeRoom } from "../../tsrpc/protocols/ServiceProtoRoom";
import { account } from "../account/Account";
import { Config } from "../config/Config";
import { CommonUtil } from "./CommonUtil";

/** TSRPC 客户端、服务器对象工厂 */
export class CommonFactory {
    /** 创建 Http 网关服务端对象 */
    static createHsGate() {
        var options: Partial<HttpServerOptions<ServiceTypeGate>> = {
            port: parseInt(Config.gate.port),
            json: ShareConfig.json,
            https: CommonUtil.getCertificate()
        }

        var hs = new HttpServer(ServiceProtoGate, options);
        this.flowServerApi(hs);

        return hs;
    }

    /** 创建 Http 匹配服务端对象 */
    static createHsMatch() {
        var options: Partial<HttpServerOptions<ServiceTypeMatch>> = {
            port: parseInt(Config.match.port),
            json: ShareConfig.json,
            https: CommonUtil.getCertificate()
        }

        var hs = new HttpServer(ServiceProtoMatch, options);
        this.flowServerApi(hs);
        account.checkAuth(hs);                     // 检查客户端身份

        return hs;
    }

    /** 创建 Websocket 房间服务器 */
    static createWssRoom() {
        let options: Partial<WsServerOptions<ServiceTypeRoom>> = {
            port: parseInt(Config.room.port),
            logMsg: Config.room.logMsg,
            json: ShareConfig.json,
            wss: CommonUtil.getCertificate()
        }

        let wss = new WsServer(ServiceProtoRoom, options);
        this.flowServerMsg(wss);
        account.checkAuth(wss);                   // 检查客户端身份

        return wss;
    }

    /**
     * 创建 Websocket 匹配服务连接房间服务器的客户端
     * @param serverUrl     房间 Websocket 服务器地址
     * @param server        匹配服务器对象
     * @returns WsClient
     */
    static createWscRoom(serverUrl: string, server: HttpServer) {
        let wsc = new WsClient(ServiceProtoRoom, {
            server: serverUrl,
            logger: new PrefixLogger({
                logger: server.logger,
                prefixs: [chalk.green(`房间服务器 ${serverUrl}`)]
            }),
            heartbeat: {
                interval: ShareConfig.heartbeat_interval,
                timeout: ShareConfig.heartbeat_timeout
            },
            logMsg: Config.room.logMsg
        });
        this.flowClientMsg(wsc);

        return wsc;
    }

    /** 创建匹配服务器的 Http 客户端连接 */
    static createHcMatch(serverUrl: string) {
        let url = `${ShareConfig.https ? "https" : "http"}://${serverUrl}/`;
        let hc = new HttpClient(ServiceProtoMatch, { server: url });
        this.flowClientApi(hc);

        return hc;
    }

    /** HTTP 服务端协议数据加密、解密 */
    private static flowServerApi(hs: HttpServer) {
        if (!ShareConfig.security) return;

        // 在将数据发送到网络之前，通常要进行加密/解密
        hs.flows.preSendDataFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.encrypt(v.data);
            }
            return v;
        });

        // 在处理接收到的数据之前，通常要进行加密/解密
        hs.flows.preRecvDataFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.decrypt(v.data);
            }
            return v;
        });
    }

    /** HTTP 客户端协议数据加密、解密 */
    private static flowClientApi(hc: HttpClient<ServiceTypeGate> | HttpClient<ServiceTypeMatch>) {
        if (!ShareConfig.security) return;

        hc.flows.preSendDataFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.encrypt(v.data);
            }
            return v;
        });

        // 在处理接收到的数据之前，通常要进行加密/解密
        hc.flows.preRecvDataFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.decrypt(v.data);
            }
            return v;
        });

    }

    /** WebSocket 服务器协议数据加密、解密 */
    private static flowServerMsg(wss: WsServer) {
        if (!ShareConfig.security) return;

        wss.flows.preSendMsgFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.encrypt(v.data);
            }
            return v;
        });

        // 在处理 MsgCall 之前
        wss.flows.preMsgCallFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.decrypt(v.data);
            }
            return v;
        });
    }

    /** WebSocket 客户端协议数据加密、解密 */
    private static flowClientMsg(wsc: WsClient<ServiceTypeRoom>) {
        if (!ShareConfig.security) return;

        // 发送 Message 之前
        wsc.flows.preSendMsgFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.encrypt(v.data);
            }
            return v;
        });

        // 触发 Message 监听事件之前
        wsc.flows.preRecvMsgFlow.push((v: any) => {
            if (v.data instanceof Uint8Array) {
                v.data = Security.decrypt(v.data);
            }
            return v;
        });
    }
}