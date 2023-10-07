/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 13:48:46
 */
import { _decorator, profiler } from 'cc';
import { DEBUG } from 'cc/env';
import { oops } from '../../extensions/oops-plugin-framework/assets/core/Oops';
import { Root } from '../../extensions/oops-plugin-framework/assets/core/Root';
import { ecs } from '../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import { EcsBuffSystem } from './game/battle/buff/Buff';
import { EcsSkillSystem } from './game/battle/skill/Skill';
import { smc } from './game/common/SingletonModuleComp';
import { UIConfigData } from './game/common/config/GameUIConfig';
import { EcsInitializeSystem, Initialize } from './game/initialize/Initialize';
import { EcsRoleSystem } from './game/role/Role';
import { EcsRoomSystem } from './game/room/Room';
import { EcsSceneSystem } from './game/scene/Scene';

const { ccclass, property } = _decorator;

/**
 * RoleViewNavLine组件中的资源在native模式下闪退
 */
@ccclass('Main')
export class Main extends Root {
    start() {
        // 清除上一个版本的本地存储数据，数据结构有变化，避免报错
        oops.storage.clear();

        if (DEBUG) profiler.showStats();
    }

    protected run() {
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
    }

    protected initGui() {
        oops.gui.init(UIConfigData);
    }

    protected initEcsSystem() {
        oops.ecs.add(new EcsInitializeSystem());
        oops.ecs.add(new EcsRoomSystem());
        oops.ecs.add(new EcsSceneSystem());
        oops.ecs.add(new EcsRoleSystem());
        oops.ecs.add(new EcsSkillSystem());
        oops.ecs.add(new EcsBuffSystem());
    }
}