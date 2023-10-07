/*
 * @Author: dgflash
 * @Date: 2022-06-23 09:36:16
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-06 16:54:47
 */

import { BaseResponse } from "../base";

/** 登录请求信息 */
export interface ReqLogin {
    /** 匹配服务器地址 */
    server: string,
    /** 用户名 */
    username: string
}

/** 开始匹配响应信息 */
export interface ResLogin extends BaseResponse {
    /** 玩家唯一标识 */
    key: number;
}