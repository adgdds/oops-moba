/*
 * @Author: dgflash
 * @Date: 2022-05-11 10:47:14
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:28:50
 */

import chalk from "chalk";
import { ecs } from "../../../core/ecs/ECS";
import { Config } from "../../../module/config/Config";
import { ShareConfig } from "../../../tsrpc/models/ShareConfig";
import { ServerRoom } from "../ServerRoom";

/** 房间服务器加入匹配服务器 */
@ecs.register('ServerRoomJoinMathServer')
export class ServerRoomJoinMathServerComp extends ecs.Comp {
    reset(): void { }
}

export class ServerRoomJoinMathServerSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(ServerRoomJoinMathServerComp);
    }

    async entityEnter(e: ServerRoom) {
        await this.joinMatchServer(e);
    }

    async joinMatchServer(e: ServerRoom) {
        let rm = e.ServerRoomModel;
        let logger = rm.wssRoom.logger;

        // 房间服务器的地址通知匹配服务器，建立 WebSocket 连接
        let wsUrlRoom = `${ShareConfig.https ? "wss" : "ws"}://${Config.room.match_url_ws}:${Config.room.port}/`;
        let ret = await rm.hcMatch.callApi('admin/RoomServerJoin', {
            serverUrl: wsUrlRoom
        });

        // 添加匹配服务器失败时，延时5秒继续尝试加入
        if (!ret.isSucc) {
            logger.error(`通知匹配服务器链接地址[${wsUrlRoom}]失败,3秒后尝试再次加入匹配服务器`, ret.err);
            setTimeout(this.joinMatchServer.bind(this, e), 3000);
            return;
        }

        logger.log(chalk.green('房间服务器开始服务'));
        e.remove(ServerRoomJoinMathServerComp);
    }
}