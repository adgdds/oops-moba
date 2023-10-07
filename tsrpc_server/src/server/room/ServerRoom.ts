/*
 * @Author: dgflash
 * @Date: 2022-05-06 10:59:28
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 10:21:38
 */
import { ApiCall } from "tsrpc";
import { ecs } from "../../core/ecs/ECS";
import { ReqAuth, ResAuth } from "../../tsrpc/protocols/room/admin/PtlAuth";
import { ServerRoomAuthComp, ServerRoomAuthSystem } from "./bll/ServerRoomAuth";
import { ServerRoomCheckLoginComp, ServerRoomCheckLoginSystem } from "./bll/ServerRoomCheckLogin";
import { ServerRoomDisconnectComp, ServerRoomDisconnectSystem } from "./bll/ServerRoomDisconnect";
import { ServerRoomEmptyClearComp, ServerRoomEmptyClearSystem } from "./bll/ServerRoomEmptyClear";
import { ServerRoomJoinMathServerComp, ServerRoomJoinMathServerSystem } from "./bll/ServerRoomServerJoinMatch";
import { ServerRoomServerStartComp, ServerRoomServerStartSystem } from "./bll/ServerRoomServerStart";
import { ServerRoomModelComp } from "./model/ServerRoomModelComp";

/** 
 * 房间服务器 
 * 1、自动找匹配服务器、并进入工作状态
 * 2、房间模块
 *    2.1、房间创建逻辑
 *    2.2、房间聊天逻辑
 *    2.3、房间加入逻辑
 *    2.4、房间离开逻辑
 *    2.5、释放空房逻辑
 *    2.6、房间内玩家状态数据与客户端同步
 * 3、角色模块
 *    3.1、角色数据管理
 *    3.2、角色自定义玩法行为管理（战斗逻辑）
 */
@ecs.register(`ServerRoom`)
export class ServerRoom extends ecs.Entity {
    ServerRoomModel!: ServerRoomModelComp;

    ServerRoomAuth!: ServerRoomAuthComp;
    ServerRoomStart!: ServerRoomServerStartComp;
    ServerRoomJoinMathServer!: ServerRoomJoinMathServerComp;
    ServerRoomCheckLogin!: ServerRoomCheckLoginComp;
    ServerRoomDisconnect!: ServerRoomDisconnectComp;
    ServerRoomEmptyClear!: ServerRoomEmptyClearComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            ServerRoomModelComp
        );
    }

    /** 开启房间服务器 */
    start() {
        this.add(ServerRoomServerStartComp);
    }

    auth(call: ApiCall<ReqAuth, ResAuth>) {
        this.add(ServerRoomAuthComp).call = call;
    }
}

export class EcsServerRoomSystem extends ecs.System {
    constructor() {
        super();

        this.add(new ServerRoomAuthSystem());
        this.add(new ServerRoomServerStartSystem());
        this.add(new ServerRoomJoinMathServerSystem());
        this.add(new ServerRoomCheckLoginSystem());
        this.add(new ServerRoomDisconnectSystem());
        this.add(new ServerRoomEmptyClearSystem());
    }
}