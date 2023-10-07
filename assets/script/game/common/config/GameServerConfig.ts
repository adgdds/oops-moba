/*
 * @Author: dgflash
 * @Date: 2022-08-08 18:49:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-11-14 11:22:15
 */

/** 游戏服务器配置 */
export class GameServerConfig {
    /** 匹配服务器地址（网关服务器返回）*/
    static match: string = "";
    /** 客户端发送玩家状态信息的频率 */
    static player_state_update_rate: number = 0.066;
}