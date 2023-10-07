/*
 * @Author: dgflash
 * @Date: 2022-08-25 10:57:44
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-15 09:42:33
 */

/** 技能日志 */
export class BattleLogger {
    static log(value: string) {
        console.log(`${this.getDateString()}[技能日志]:${value}`);
    }

    private static getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = "[" + timeStr + "]";
        return timeStr;
    }
}