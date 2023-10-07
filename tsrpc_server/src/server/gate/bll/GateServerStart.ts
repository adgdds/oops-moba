/*
 * @Author: dgflash
 * @Date: 2022-06-22 18:32:20
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 17:34:57
 */
import chalk from "chalk";
import path from "path";
import { ecs } from "../../../core/ecs/ECS";
import { User } from "../../../module/account/bll/User";
import { CommonFactory } from "../../../module/common/CommonFactory";
import { MongoDB } from "../../../module/common/MongoDB";
import { ServerGate } from "../ServerGate";

/** 启动网关服务器 */
@ecs.register('GateServerStart')
export class GateServerStartComp extends ecs.Comp {
    reset(): void { }
}

export class GateServerStartSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(GateServerStartComp);
    }

    async entityEnter(e: ServerGate) {
        let server = CommonFactory.createHsGate();
        e.GateModel.hsGate = server;

        // 如果指定 autoImplementApi 的第 2 个参数为 true，则开启延迟挂载，即延迟到对应接口被调用时才执行挂载操作，加快冷启动速度
        await server.autoImplementApi(path.resolve(__dirname, '../api'), true);
        server.logger.log(chalk.green(`[网关服务器] 服务已初始化完成`));    

        // 连接数据库
        await MongoDB.init();
        server.logger.log(chalk.green(`[网关服务器] 数据库实始化完成`));

        // 启动匹配服务器
        await server.start();
        server.logger.log(chalk.green(`[网关服务器] 成功启动`));

        // 用户数据表
        User.init();
    }
}