/*
 * @Author: dgflash
 * @Date: 2022-05-13 10:12:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-14 15:13:35
 */

import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { ResRoomJoin } from '../../../tsrpc/protocols/room/PtlRoomJoin';
import { BattleBridge } from "../../battle/common/bll/BattleBridge";
import { Camera } from "../../camera/Camera";
import { smc } from "../../common/SingletonModuleComp";
import { RoleCampType } from "../../role/model/RoleEnum";
import { RoleUpdateState } from "../../role/view/net/RoleUpdateState";
import { Scene } from "../../scene/Scene";
import { Room } from "../Room";
import { BattlefieldEnterComp } from "./BattlefieldEnter";
import { RoomUtil } from "./RoomUtil";

/** 自己加入房间 - 初始化游戏世界数据 */
@ecs.register('RoomOwnerJoin')
export class RoomOwnerJoinComp extends ecs.Comp {
    data: ResRoomJoin = null;

    reset(): void {
        this.data = null!;
    }
}

export class RoomOwnerJoinSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(RoomOwnerJoinComp);
    }

    async entityEnter(e: Room) {
        // 初始化房间信息
        this.initRoomInit(e);
        // 初始化游戏世界
        this.initWorld();
        // 初始化游戏中玩家
        this.initPlayers(e);
        // 初始化游戏中非玩家角色
        this.initNpcs(e);

        // 设置桥接数据
        BattleBridge.owner = e.RoomModel.owner;
        BattleBridge.roles = e.RoomModel.roles;
        e.add(BattlefieldEnterComp);

        e.remove(RoomOwnerJoinComp);
    }

    /** 初始化房间信息 */
    initRoomInit(e: Room) {
        var data = e.get(RoomOwnerJoinComp).data;

        // 绑定房间显示数据
        e.RoomModel.vm = {
            server: e.RoomModel.serverUrl,
            name: data.room.name,
            max: data.room.max,
            amount: data.room.roles.length,
            ping: smc.net.wscRoom.lastHeartbeatLatency
        }
        e.RoomModel.vmAdd();
    }

    /** 初始化游戏世界 */
    initWorld() {
        // 创建三维摄像机管理对象
        smc.camera = ecs.getEntity<Camera>(Camera);

        // 创建游戏地图管理对象
        smc.scene = ecs.getEntity<Scene>(Scene);
        smc.scene.load("an");
    }

    /** 初始化游戏中玩家 */
    initPlayers(e: Room) {
        var data = e.get(RoomOwnerJoinComp).data;

        // 添加其它玩家
        data.room.roles.forEach(d => {
            let role = RoomUtil.roleCreate(d);

            if (data.roleId == d.roleInfo.id) {

                role.RoleModel.camp = RoleCampType.Friendly;
                smc.room.RoomModel.owner = role;

                // 同步客户端状态组件
                role.RoleView.node.addComponent(RoleUpdateState);
                // 设置跟随摄像机
                smc.camera.setFollow(role.RoleView.node);
                // 添加遥感控制
                role.loadUIJoystick();
                // 添加点击地图控制
                role.loadUITouchMove();
            }
            else {
                role.RoleModel.camp = RoleCampType.Enemy;
            }
            role.loadUITop();
        });
    }

    /** 初始化游戏中非玩家角色 */
    initNpcs(e: Room) {
        var data = e.get(RoomOwnerJoinComp).data;
        // 添加其它玩家
        data.room.npcs.forEach(d => {
            let npc = RoomUtil.roleCreate(d);
            npc.RoleModel.camp = RoleCampType.Enemy;
            npc.RoleView.lootAt(smc.room.RoomModel.owner.RoleView.node.position);
            npc.loadUITop();
        });
    }
}