
# TSRPC API 接口文档

## 通用说明

- 所有请求方法均为 `POST`
- 所有请求均需加入以下 Header :
    - `Content-Type: application/json`

## 目录

- [GameArea](#/GameArea)
- [登录请求信息](#/Login)
- [用户注册请求](#/Register)

---

## GameArea <a id="/GameArea"></a>

**路径**
- POST `/GameArea`

**请求**
```ts
interface ReqGameArea {

}
```

**响应**
```ts
interface ResGameArea {
    area: {
        /** 游戏分区名 */
        name: string,
        /** 服务器地址 */
        server: string
    }[]
}
```

---

## 登录请求信息 <a id="/Login"></a>

**路径**
- POST `/Login`

**请求**
```ts
interface ReqLogin {
    /** 用户名 */
    username: string
}
```

**响应**
```ts
interface ResLogin {
    /** 通行证 */
    __ssoToken: string,
    /** 玩家唯一标识 */
    user: {
        /** 自增量唯一标识 */
        key: number,
        /** 用户名 */
        username: string,
        /** 创建时间 */
        createtime: /*datetime*/ string,
        /** 玩家位置信息 */
        pos?: {
            /** X 轴位置 */
            x: number,
            /** Y 轴位置 */
            y: number,
            /** Z 轴位置 */
            z: number
        },
        /** 玩家旋转信息 */
        rotation?: {
            /** 四元数 X */
            x: number,
            /** 四元数 Y */
            y: number,
            /** 四元数 Z */
            z: number,
            /** 四元数 W */
            w: number
        }
    }
}
```

---

## 用户注册请求 <a id="/Register"></a>

**路径**
- POST `/Register`

**请求**
```ts
interface ReqRegister {
    /** 用户名 */
    username: string
}
```

**响应**
```ts
interface ResRegister {
    key: number
}
```

