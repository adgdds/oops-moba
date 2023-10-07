/*
 * @Author: dgflash
 * @Date: 2022-05-13 13:39:02
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 16:54:17
 */
import { Logger } from "../../../../../extensions/oops-plugin-framework/assets/core/common/log/Logger";
import { oops } from '../../../../../extensions/oops-plugin-framework/assets/core/Oops';
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from '../../common/SingletonModuleComp';
import { Room } from "../Room";
import { RoomNetMsgComp } from './RoomNetMsg';
import { RoomOwnerJoinComp } from './RoomOwnerJoin';
import { RoomOwnerLeaveComp } from './RoomOwnerLeave';

/** 连接房间服务器 */
@ecs.register('RoomServerConnect')
export class RoomServerConnectComp extends ecs.Comp {
    reset(): void { }
}

export class RoomServerConnectSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomServerConnectComp);
    }

    async entityEnter(e: Room) {
        let rm = e.RoomModel;

        // 创建连接房间服务器 Websocket 客户端
        smc.net.wscRoom = smc.net.createWscRoom(rm.serverUrl);

        // 客户端断开连接后逻辑
        this.postDisconnectFlow(e);

        // 连接房间服务器
        let resConnect = await smc.net.wscRoom.connect();
        if (!resConnect.isSucc) {
            Logger.logBusiness(resConnect.errMsg, '【房间】连接房间服务器失败');
            e.remove(RoomServerConnectComp);
            return;
        }

        let retRoomJoin = await smc.net.wscRoom.callApi(`RoomJoin`, {
            roomId: rm.roomId,
            userId: smc.initialize.AccountModel.key
        });

        if (retRoomJoin.isSucc) {
            e.add(RoomNetMsgComp);
            e.add(RoomOwnerJoinComp).data = retRoomJoin.res;
        }
        else {
            Logger.logBusiness(retRoomJoin.err, '【房间】房间加入失败');
        }

        e.remove(RoomServerConnectComp);
    }

    /** 客户端与服务器断开事件 */
    private postDisconnectFlow(e: Room) {
        smc.net.wscRoom.flows.postDisconnectFlow.push(v => {
            // 非客户端手动断开时处理（例：网络错误、服务器关闭）
            if (!v.isManual) {
                oops.gui.toast(`服务器维护`);
                e.add(RoomOwnerLeaveComp);
            }
            return v;
        });
    }
}