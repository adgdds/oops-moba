/*
 * @Author: dgflash
 * @Date: 2022-05-11 13:53:35
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-06 18:30:51
 */
import chalk from "chalk";
import path from "path";
import { ecs } from "../../../core/ecs/ECS";
import { CommonFactory } from "../../../module/common/CommonFactory";
import { Config } from "../../../module/config/Config";
import { ServerMatch } from "../ServerMatch";
import { MatchStartComp } from "./MatchStart";

/** 启动匹配服务器 */
@ecs.register('MatchServerStart')
export class MatchServerStartComp extends ecs.Comp {
    reset(): void { }
}

export class MatchServerStartSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(MatchServerStartComp);
    }

    async entityEnter(e: ServerMatch) {
        let server = CommonFactory.createHsMatch();
        e.MatchModel.hsMatch = server;

        // 如果指定 autoImplementApi 的第 2 个参数为 true，则开启延迟挂载，即延迟到对应接口被调用时才执行挂载操作，加快冷启动速度
        await server.autoImplementApi(path.resolve(__dirname, '../api'), true);
        server.logger.log(chalk.green(`[匹配服务器] 服务已初始化完成`));
        
        // 启动匹配服务器
        await server.start();
        server.logger.log(chalk.green(`[匹配服务器] 启动成功`));

        // 定时 log 播报房间状态
        var rooms = e.MatchModel.rooms;
        setInterval(() => {
            server.logger.log(`
        [匹配服务器状态播报]
        - 房间已连接数量 = ${rooms.count(v => !!v.state)}
        - 房间连接中数量 = ${rooms.count(v => !v.state)}
        - 房间总数　　　 = ${rooms.sum(v => v.state?.rooms.length ?? 0)}
        - 房内用户数　　 = ${rooms.sum(v => v.state?.rooms.sum(v => v.amount) ?? 0)}`);
        }, Config.match.interval_logger);

        // 定时匹配验证（考虑修改为触发时匹配验证）
        e.add(MatchStartComp);
    }
}