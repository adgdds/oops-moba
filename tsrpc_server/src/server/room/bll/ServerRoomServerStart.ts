/*
 * @Author: dgflash
 * @Date: 2022-05-06 11:44:11
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-06 16:57:26
 */
import chalk from "chalk";
import path from "path";
import { ecs } from "../../../core/ecs/ECS";
import { CommonFactory } from "../../../module/common/CommonFactory";
import { Config } from "../../../module/config/Config";
import { ServerRoom } from "../ServerRoom";
import { ServerRoomCheckLoginComp } from "./ServerRoomCheckLogin";
import { ServerRoomDisconnectComp } from "./ServerRoomDisconnect";
import { ServerRoomEmptyClearComp } from "./ServerRoomEmptyClear";
import { ServerRoomJoinMathServerComp } from "./ServerRoomServerJoinMatch";

/** 启动匹配服务器 */
@ecs.register('ServerRoomServerStart')
export class ServerRoomServerStartComp extends ecs.Comp {
    reset(): void { }
}

export class ServerRoomServerStartSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(ServerRoomServerStartComp);
    }

    async entityEnter(e: ServerRoom) {
        let wss = CommonFactory.createWssRoom();
        e.ServerRoomModel.wssRoom = wss;
        e.ServerRoomModel.hcMatch = CommonFactory.createHcMatch(Config.room.match_url_http);

        // 登录态校验
        e.add(ServerRoomCheckLoginComp);

        // 与匹配服务器断开后清理房间
        e.add(ServerRoomDisconnectComp);

        // 如果指定 autoImplementApi 的第 2 个参数为 true，则开启延迟挂载，即延迟到对应接口被调用时才执行挂载操作，加快冷启动速度
        await wss.autoImplementApi(path.resolve(__dirname, '../api'), true);
        wss.logger.log(chalk.green(`[房间服务器] 服务已初始化完成`));

        // 启动房间服务器
        await wss.start();
        wss.logger.log(chalk.green(`[房间服务器] 成功启动`));

        // 定时检测加入匹配服务
        e.add(ServerRoomJoinMathServerComp);

        // 定时清除闲置的房间
        e.add(ServerRoomEmptyClearComp);

        e.remove(ServerRoomServerStartComp);
    }
}