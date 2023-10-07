/*
 * @Author: dgflash
 * @Date: 2022-05-16 14:44:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-23 18:20:06
 */
import { ApiCall } from 'tsrpc';
import { sr } from "../../../ServerRoom";
import { ReqRoomJoin, ResRoomJoin } from "../../../tsrpc/protocols/room/PtlRoomJoin";
import { RoomConnection } from "../model/ServerRoomModelComp";

/** 请求加入房间 */
export async function ApiRoomJoin(call: ApiCall<ReqRoomJoin, ResRoomJoin>) {
    // 在匹配服务器获取玩家详细数据
    let ret = await sr.ServerRoomModel.hcMatch.callApi(`admin/UserInfo`, { __ssoToken: call.req.__ssoToken });
    if (ret.isSucc == false) call.error("到匹配服务器获取玩家数据失败", { code: 'USER_NO_EXISTS' });

    const user = ret.res!.user!;
    const conn = call.conn as RoomConnection;

    let room = sr.ServerRoomModel.rooms.get(call.req.roomId)!;
    let rm = room.RoomModel;
    if (!room) {
        return call.error('房间不存在', { code: 'ROOM_NOT_EXISTS' });
    }

    if (rm.data.roles.length >= rm.data.max) {
        return call.error('该房间已满员');
    }

    // 注：移除同账号踢下线功能，后续转移动网关服务器开发

    // // 玩家已经在本房间中，可能是通过其它设备登录，踢出旧连接
    // let existedConns = rm.conns.filter(v => v.role.RoleModel.user.key === call.req.userId);
    // existedConns.forEach(v => {
    //     call.server.logger.log('玩家已经在本房间中，可能是通过其它设备登录，踢出旧连接');
    //     v.role.leave();
    // });

    // // 玩家正在其它房间中，从已有房间中退出（转到其它房间时用到）
    // if (conn.room) {
    //     call.server.logger.log('玩家正在其它房间中，从已有房间中退出');
    //     conn.role.leave();
    // }

    // 创建一个玩家对象
    var rd = room.addRole(conn, user);

    // 响应玩家加入房间请求数据
    call.succ({
        roleId: rd.roleInfo.id,
        room: rm.data
    });

    // 广播房间内其它玩家加入
    room.broadcastMsg(`server/RoleJoin`, {
        time: new Date,
        role: rd
    });
}