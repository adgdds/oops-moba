/** 受击特效位置类型 */
export enum HitPosType {
    /** 头顶位置（后续有需求在扩展） */
    Head,
    /** 腰部位置(通过在角色模型身上定位posEffect节点的位置) */
    Waist,
    /** 脚底位置(角色模型默认中心点为脚下) */
    Foot
}