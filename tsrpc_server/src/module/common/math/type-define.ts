/*
 * @Author: dgflash
 * @Date: 2022-09-09 16:24:39
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-09 16:24:51
 */
export interface IColorLike {
    r: number;
    g: number;
    b: number;
    a: number;
    _val: number;

}

export interface IMat3Like {
    m00: number; m01: number; m02: number;
    m03: number; m04: number; m05: number;
    m06: number; m07: number; m08: number;
}

export interface IMat4Like {
    m00: number; m01: number; m02: number; m03: number;
    m04: number; m05: number; m06: number; m07: number;
    m08: number; m09: number; m10: number; m11: number;
    m12: number; m13: number; m14: number; m15: number;
}

export interface IQuatLike {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface IRectLike {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ISizeLike {
    width: number;
    height: number;
}

export interface IVec2Like {
    x: number;
    y: number;
}

export interface IVec3Like {
    x: number;
    y: number;
    z: number;
}

export interface IVec4Like {
    x: number;
    y: number;
    z: number;
    w: number;
}

export type FloatArray = Float64Array | Float32Array;
export type IVec2 = IVec2Like | Readonly<IVec2Like>;
export type IVec3 = IVec3Like | Readonly<IVec3Like>;
export type IVec4 = IVec4Like | Readonly<IVec4Like>;
export type IMat3 = IMat3Like | Readonly<IMat3Like>;
export type IMat4 = IMat4Like | Readonly<IMat4Like>;
export type IRect = IRectLike | Readonly<IRectLike>;
export type IQuat = IQuatLike | Readonly<IQuatLike>;
export type IColor = IColorLike | Readonly<IColorLike>;
