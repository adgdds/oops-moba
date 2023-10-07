/*
 * @Author: dgflash
 * @Date: 2021-11-11 17:45:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-01 15:04:24
 */
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CommonNet } from "../common/CommonNet";
import { smc } from "../common/SingletonModuleComp";
import { InitResComp, InitResSystem } from "./bll/InitRes";
import { LoginComp, LoginSystem } from "./bll/Login";
import { AccountModelComp } from "./model/AccountModelComp";
import { GateModelComp } from "./model/GateModelComp";

/** 游戏进入初始化模块 */
@ecs.register(`Initialize`)
export class Initialize extends ecs.Entity {
    GateModel: GateModelComp;
    AccountModel: AccountModelComp;

    protected init() {
        this.addComponents<ecs.Comp>(
            GateModelComp,
            AccountModelComp);

        // 实始化TSRPC网络模块
        smc.net = new CommonNet();

        // 初始化游戏公共资源
        this.add(InitResComp);
    }

    /** 帐号登录 */
    login(username: string, server: string) {
        var comp = this.add(LoginComp);
        comp.username = username;
        comp.server = server;
    }
}

export class EcsInitializeSystem extends ecs.System {
    constructor() {
        super();

        this.add(new InitResSystem());
        this.add(new LoginSystem());
    }
}