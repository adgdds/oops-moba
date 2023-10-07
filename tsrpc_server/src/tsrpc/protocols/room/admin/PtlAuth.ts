/*
 * @Author: dgflash
 * @Date: 2022-05-12 14:18:40
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-02 00:15:00
 */

import { BaseConf } from "../../base";

/** 房间服务器授权请求信息 */
export interface ReqAuth {
    type: 'MatchServer'
}

/** 房间服务器授权响应信息 */
export interface ResAuth {

}

export const conf: BaseConf = {
    needCheckAddress: true
}