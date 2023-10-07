/*
 * @Author: dgflash
 * @Date: 2022-09-07 16:04:29
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-04 16:48:30
 */
import { Component, Prefab, tween, v3, Vec3, _decorator } from 'cc';
import { oops } from '../extensions/oops-plugin-framework/assets/core/Oops';
import { EncryptUtil } from '../extensions/oops-plugin-framework/assets/core/utils/EncryptUtil';
import { RotateUtil } from '../extensions/oops-plugin-framework/assets/core/utils/RotateUtil';
import { ViewUtil } from '../extensions/oops-plugin-framework/assets/core/utils/ViewUtil';

const { ccclass, property } = _decorator;

@ccclass('SkillTest')
export class SkillTest extends Component {
    start() {
        // 向自己前方向闪现5米
        var v = RotateUtil.circularEdgePosition(v3(0, 1.7, 0), 5, 30);
        console.log(v);

        var a = EncryptUtil.aesEncrypt("abc", "key", "iv")
        console.log(a);
        var b = EncryptUtil.aesDecrypt(a, "key", "iv");
        console.log(b);

        oops.res.load("Cube", Prefab, (err: Error | null, p: Prefab) => {
            var node = ViewUtil.createPrefabNode("Cube");
            node.parent = this.node
            node.setPosition(v);
            // node.setScale(1.5, 1.5, 1.5)

            // 获取网格范围
            // var dir = Vec3.subtract(new Vec3, this.node.position, node.position).normalize().negative().multiplyScalar(node.scale.x);
            // var target = Vec3.add(new Vec3, this.node.position, dir);
            // setTimeout(() => {
            //     tween(node)
            //         .to(0.2, { position: target }, { easing: 'linear' })
            //         .start();
            // }, 1000); 
        });
    }

    update(deltaTime: number) {

    }
}

