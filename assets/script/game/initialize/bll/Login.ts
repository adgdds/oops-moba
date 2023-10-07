/*
 * @Author: dgflash
 * @Date: 2022-06-24 10:13:46
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-08 18:21:13
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { smc } from "../../common/SingletonModuleComp";
import { Initialize } from "../Initialize";
import { InitializeEvent } from "../InitializeEvent";

/** 
 * 游戏登录逻辑 
 * 1、登录时有帐号直接登录，没帐号会先创建一个后在登录
 */
@ecs.register('Login')
export class LoginComp extends ecs.Comp {
    /** 匹配服务器地址 */
    server: string = null;
    /** 玩家帐号名 */
    username: string = null!;

    reset() {
        this.server = null!;
        this.username = null!;
    }
}

export class LoginSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(LoginComp);
    }

    entityEnter(e: Initialize) {
        this.login(e);
    }

    async login(e: Initialize) {
        let login = e.get(LoginComp);

        // 设置本地存储独立用户标签
        oops.storage.setUser(login.username);

        // 请求登录
        let retLogin = await smc.net.hcGate.callApi(`Login`, {
            server: login.server,
            username: login.username
        });

        if (retLogin.isSucc) {
            let account = e.AccountModel;
            account.key = retLogin.res.key;
            account.username = login.username;
            e.remove(LoginComp);

            // 创建连接匹配服务器 Http 客户端
            smc.net.createHcMatch();

            // 进入匹配大厅
            oops.message.dispatchEvent(InitializeEvent.Logined);
        }
        else if (retLogin.err.code == "Exist_No_UserName") {
            this.register(e);
        }
        else {
            oops.gui.toast("当前区在维护中");
            e.remove(LoginComp);
        }
    }

    async register(e: Initialize) {
        let login = e.get(LoginComp);
        let retRegister = await smc.net.hcGate.callApi(`Register`, {
            username: login.username
        });

        if (retRegister.isSucc) {
            this.login(e);
        }
        else {
            oops.gui.toast(retRegister.err.message);
            e.remove(LoginComp);
        }
    }
}