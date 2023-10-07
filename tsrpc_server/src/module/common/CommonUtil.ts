/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-20 10:29:07
 */

import fs from 'fs';
import path from "path";
import { ecs } from "../../core/ecs/ECS";
import { ShareConfig } from '../../tsrpc/models/ShareConfig';
import { Config } from "../config/Config";

/** 服务器工具 */
export class CommonUtil {
    /** ECS 实始化 */
    static init<T>(sys: ecs.RootSystem) {
        sys.init();

        var ms = 1 / 60;
        setInterval(() => {
            sys.execute(ms);
        }, ms);
    }

    /** 获取证书 */
    static getCertificate(): any {
        if (ShareConfig.https) {
            return {
                key: fs.readFileSync(path.resolve(__dirname, `../../${Config.certificate}.key`)),
                cert: fs.readFileSync(path.resolve(__dirname, `../../${Config.certificate}.crt`))
            }
        }
        return undefined;
    }
}