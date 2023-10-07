/*
 * @Author: dgflash
 * @Date: 2022-05-06 14:59:29
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-01 15:06:52
 */
import { ApiCall } from "tsrpc";
import { ecs } from "../../core/ecs/ECS";
import { ReqRoomServerJoin, ResRoomServerJoin } from "../../tsrpc/protocols/match/admin/PtlRoomServerJoin";
import { MatchServerJoinRoomComp, MatchServerJoinRoomSystem } from "./bll/MatchServerJoinRoom";
import { MatchServerStartComp, MatchServerStartSystem } from "./bll/MatchServerStart";
import { MatchStartComp, MatchStartSystem } from "./bll/MatchStart";
import { MatchModelComp } from "./model/MatchModelComp";

/** 
 * 匹配服务器
 * 1、动态检查是否有新的房间服务器加入到工作状态
 * 2、同步房间服务传递过来的所有房间信息
 * 3、玩家主动创建房间
 * 4、玩家开始匹配有空位的房间
 * 5、获取所有还有空位的房间列表
 */
@ecs.register(`ServerMatch`)
export class ServerMatch extends ecs.Entity {
    MatchModel!: MatchModelComp;

    MatchServerStart!: MatchServerStartComp;
    MatchStart!: MatchStartComp;
    MatchServerJoinRoom!: MatchServerJoinRoomComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            MatchModelComp);
    }

    /** 开启匹配服务器 */
    start() {
        this.add(MatchServerStartComp);
    }

    /** 加入房间服务器进入工作状态 */
    joinRoomServer(call: ApiCall<ReqRoomServerJoin, ResRoomServerJoin>) {
        var comp = this.get(MatchServerJoinRoomComp) || this.add(MatchServerJoinRoomComp);
        comp.calls.push(call);
    }
}

export class EcsMatchSystem extends ecs.System {
    constructor() {
        super();

        this.add(new MatchServerStartSystem());
        this.add(new MatchStartSystem());
        this.add(new MatchServerJoinRoomSystem());
    }
}