/*
 * @Author: dgflash
 * @Date: 2022-05-06 14:59:29
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 12:28:01
 */
import { ecs } from "../../core/ecs/ECS";
import { GateServerStartComp, GateServerStartSystem } from "./bll/GateServerStart";
import { GateModelComp } from "./model/GateModelComp";

/** 
 * 网关服务器
 * 1、管理玩家帐号登录
 * 2、管理游戏分区服务器组，起到负载均衡的作用
 * 3、管理心跳，如果某个客户端掉线了，那么网关就通知各个服务器去做玩家的下线处理（待扩展）
 */
@ecs.register(`ServerGate`)
export class ServerGate extends ecs.Entity {
    GateModel!: GateModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            GateModelComp);
    }

    /** 开启网关服务器 */
    start() {
        this.add(GateServerStartComp);

        // // 断线重连接的玩家需要补帧重计算前面的逻辑
        // // 同样的随机种子，同样的顺序随机出来的都是一样的结果，为了保证战斗体验不一样，每个玩家每次进游戏都要记录本场战斗生成的随机种子。同时要记录随机了多少次，重连接时，要把前面的次数随机用掉
        // // 要么重给种子，要么记录随机次数，要记录操作数据
        // // 每个角色一个随机对象
        // var seedrandom = require('seedrandom');
        // var rng1 = seedrandom(1);
        // for (let index = 0; index < 5; index++) {
        //     console.log(rng1.int32());
        // }
        // console.log(rng1);

        // var rng2 = seedrandom(1);
        // for (let index = 0; index < 5; index++) {
        //     console.log(rng2.int32());
        // }
    }
}

export class EcsGateSystem extends ecs.System {
    constructor() {
        super();

        this.add(new GateServerStartSystem());
    }
}