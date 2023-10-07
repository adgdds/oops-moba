/*
 * @Author: dgflash
 * @Date: 2022-06-23 17:48:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-27 13:34:21
 */
export interface ReqGameArea {

}

export interface ResGameArea {
    area: {
        /** 游戏分区名 */
        name: string,
        /** 服务器地址 */
        server: string
    }[]
}
