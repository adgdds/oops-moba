/*
 * @Author: dgflash
 * @Date: 2022-06-28 15:07:08
 * @LastEditors: dgflash
 * @LastEditTime: 2022-06-29 16:41:07
 */

/** 数据传输加密 */
export class Security {
    /** 加密 */
    static encrypt(buf: Uint8Array): Uint8Array {
        for (let i = 0; i < buf.length; ++i) {
            buf[i] -= 1;
        }
        return buf;
    }

    /** 解密 */
    static decrypt(buf: Uint8Array): Uint8Array {
        for (let i = 0; i < buf.length; ++i) {
            buf[i] += 1;
        }
        return buf;
    }
}