/*
 * @Author: dgflash
 * @Date: 2022-06-24 09:55:51
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:29:54
 */
import { EditBox, EventTouch, instantiate, Label, Node, Toggle, ToggleContainer, _decorator } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCVMParentComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCVMParentComp";
import { ShareConfig } from "../../../tsrpc/models/ShareConfig";
import { GameServerConfig } from "../../common/config/GameServerConfig";
import { UIID } from "../../common/config/GameUIConfig";
import { smc } from "../../common/SingletonModuleComp";
import { InitializeEvent } from "../InitializeEvent";

const { ccclass, property } = _decorator;

const NAMES = ['oops', 'framework', 'moba', 'guide', 'game', 'aprg', 'slg', 'crpg', 'rpg', 'rts'];

/** 帐号登录界面 */
@ccclass('LoginViewComp')
@ecs.register('LoginView', false)
export class LoginViewComp extends CCVMParentComp {
    @property(EditBox)
    eb_name: EditBox = null!;

    @property(Node)
    tg_area: Node = null!;

    @property(Node)
    toggle: Node = null!;

    /** 视图层逻辑代码分离演示 */
    onLoad() {
        this.on(InitializeEvent.Logined, this.onHandler, this);
    }

    start() {
        this.eb_name.string = NAMES[NAMES.length * Math.random() | 0];
        this.showGameArea();
    }

    /** 获取区服信息 */
    async showGameArea() {
        var ret = await smc.net.hcGate.callApi(`GameArea`, {});
        if (ret.isSucc) {
            smc.initialize.GateModel.area = ret.res.area;

            this.toggle.removeFromParent();

            var tc = this.tg_area.getComponent(ToggleContainer);
            var i = 0;
            ret.res.area.forEach(a => {
                var node = instantiate(this.toggle);
                node.name = i.toString();
                node.parent = this.tg_area;
                var lab = node.getChildByName("Label");
                lab.name = i.toString();
                lab.getComponent(Label).string = a.name;
                lab.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
                    var index = parseInt(event.target.name);
                    tc.toggleItems[index].isChecked = true;
                }, this);
                i++;
            });
        }
        else {
            oops.gui.toast(ret.err.message);
        }
    }

    /** 登录 */
    btnLogin() {
        var url = "";
        this.tg_area.children.forEach(n => {
            if (n.getComponent(Toggle).isChecked) {
                // 记录选中的匹配服务器地址
                url = smc.initialize.GateModel.area[parseInt(n.name)].server;
            }
        });

        GameServerConfig.match = `${ShareConfig.https ? "https" : "http"}://${url}/`;
        smc.initialize.login(this.eb_name.string, url);
    }

    /** 全局消息逻辑处理 */
    private onHandler(event: string, args: any) {
        switch (event) {
            case InitializeEvent.Logined:
                oops.gui.open(UIID.Demo_Match);
                oops.gui.remove(UIID.Demo_Gate);
                break;
        }
    }

    /** 视图对象通过 ecs.Entity.remove(ModuleViewComp) 删除组件是触发组件处理自定义释放逻辑 */
    reset() {
        this.node.destroy();
    }
}