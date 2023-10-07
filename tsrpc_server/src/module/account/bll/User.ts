/*
 * @Author: dgflash
 * @Date: 2022-07-12 15:29:32
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-12 16:11:48
 */

import { Collection, ObjectId, OptionalId } from "mongodb";
import { RolePosition, RoleRotation } from "../../../tsrpc/types/RoleState";
import { DbCollectionName, MongoDB } from "../../common/MongoDB";

/** 用户表数据结构 */
export interface DbUser {
    _id: ObjectId,
    /** 自增量唯一标识 */
    key: number,
    /** 用户名 */
    username: string,
    /** 创建时间 */
    createtime: Date,
    /** 玩家位置信息 */
    pos?: RolePosition,
    /** 玩家旋转信息 */
    rotation?: RoleRotation
}

/** 用户数据表逻辑 */
export class User {
    private static c: Collection<OptionalId<DbUser>> = null!;

    static init() {
        this.c = MongoDB.db.collection(DbCollectionName.user);
    }

    /**
     * 注册新玩家
     * @param username 玩家名
     * @returns 玩家自增唯一编号
     */
    static addUser(username: string): Promise<number> {
        return new Promise(async (resolve: Function, reject: Function) => {
            var key = await MongoDB.getNextSequenceValue(DbCollectionName.user);
            // 插入用户数据
            await this.c.insertOne({
                key,
                username: username,
                createtime: new Date(),
                pos: { x: 0, y: 1.7, z: 0 },                        // 初始位置
                rotation: { x: 0, y: 0, z: 0, w: 1 }                // 初始旋转
            });

            // 返回客户端结果
            resolve(key);
        });
    }

    /**
     * 通过玩家名删除玩家数据
     * @param username  玩家名
     * @returns 是否删除成功
     */
    static delUserByUserName(username: string): Promise<boolean> {
        return new Promise(async (resolve: Function, reject: Function) => {
            var ret = await this.c.deleteOne({ username: username });
            if (ret.acknowledged && ret.deletedCount > 0)
                resolve(true);
            else
                resolve(false);
        });
    }

    /**
      * 删除所有玩家数据
      * @returns 是否删除成功
      */
    static delUserByAll() {
        return new Promise(async (resolve: Function, reject: Function) => {
            var ret = await this.c.deleteMany({});
            if (ret.acknowledged && ret.deletedCount > 0)
                resolve(true);
            else
                resolve(false);
        });
    }

    /** 修改玩家状态数据 */
    static updatePlayerState(_id: ObjectId, pos: RolePosition, rotation: RoleRotation) {
        return new Promise(async (resolve: Function, reject: Function) => {
            this.c.updateOne(
                {
                    _id
                },
                {
                    $set: {
                        pos,
                        rotation
                    }
                }
            ).then(ret => {
                if (ret.acknowledged && ret.modifiedCount > 0)
                    resolve(true);
                else
                    resolve(false);
            });
        });
    }

    /**
     * 通过账号名获取玩家数据
     * @param username  玩家名
     * @returns 玩家数据
     */
    static getUserByUserName(username: string): Promise<DbUser> {
        return new Promise(async (resolve: Function, reject: Function) => {
            var dUser = await this.c.findOne({ username: username });
            resolve(dUser);
        });
    }
}