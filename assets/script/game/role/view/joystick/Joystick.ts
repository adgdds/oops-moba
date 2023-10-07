import { CCFloat, Component, Enum, error, EventTouch, macro, Node, UIOpacity, UITransform, Vec2, Vec3, _decorator } from "cc";

const { ccclass, property } = _decorator;

/**
 * 方向类型
 */
export enum DirectionType {
    FOUR,
    EIGHT,
    ALL,
}

/**
 * 速度类型
 */
export enum SpeedType {
    Start,
    STOP,
    NORMAL,
    FAST,
}

/**
 * 摇杆类型
 */
export enum JoystickType {
    FIXED,
    FOLLOW,
}

export interface JoystickDataType {
    /** 速度类型 */
    type: SpeedType;

    /** 移动向量 */
    vector: Vec3;

    /** 角度 */
    angle: number;
}


export type ControllerFunc = (event: EventTouch, data: JoystickDataType) => void;

/** 摇杆 */
@ccclass("Joystick")
export class Joystick extends Component {
    @property({
        type: Node,
        tooltip: "摇杆操纵点",
    })
    dot: Node | null = null;

    @property({
        type: Node,
        tooltip: "摇杆背景节点",
    })
    ring: Node | null = null;

    @property({
        type: Enum(JoystickType),
        tooltip: "触摸类型",
    })
    joystickType = JoystickType.FIXED;

    @property({
        type: Enum(DirectionType),
        tooltip: "方向类型",
    })
    directionType = DirectionType.ALL;

    @property({
        tooltip: "摇杆所在位置"
    })
    _stickPos = new Vec3();

    @property({
        tooltip: "触摸位置"
    })
    _touchLocation = new Vec2();

    @property({
        type: CCFloat,
        tooltip: "摇杆背景半径"
    })
    radius = -1;

    onController: ControllerFunc | null = null;

    onLoad() {
        if (!this.dot) {
            error("Joystick Dot is null!");
            return;
        }

        if (!this.ring) {
            error("Joystick Ring is null!");
            return;
        }

        // 摇杆背景半径
        if (this.radius == -1)
            this.radius = this.ring.getComponent(UITransform)!.width / 2;

        // 摇杆跟随跟随时默认隐藏界面
        const uiOpacity = this.node.getComponent(UIOpacity);
        if (this.joystickType === JoystickType.FOLLOW && uiOpacity) {
            uiOpacity.opacity = 0;
        }

        this._initTouchEvent();
    }

    /**
     * 改变摇杆类型
     * @param type
     */
    setJoystickType(type: JoystickType) {
        this.joystickType = type;
        const uiOpacity = this.node.getComponent(UIOpacity);
        if (uiOpacity) {
            uiOpacity.opacity = type === JoystickType.FIXED ? 255 : 0;
        }
    }

    /**
     * 初始化触摸事件
     */
    private _initTouchEvent() {
        this.node.on(Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    }

    /**
     * 触摸开始回调函数
     * @param event
     */
    private _touchStartEvent(event: EventTouch) {
        if (!this.ring || !this.dot) return;

        if (this.onController) {
            this.onController(event, {
                type: SpeedType.Start,
                vector: Vec3.ZERO,
                angle: 0
            });
        }

        const location = event.getUILocation();
        const touchPos = new Vec3(location.x, location.y);

        if (this.joystickType === JoystickType.FIXED) {
            this._stickPos = this.ring.getWorldPosition();

            // 相对中心的向量
            const moveVec = touchPos.subtract(this.ring.getWorldPosition());
            // 触摸点与圆圈中心的距离
            const distance = moveVec.length();

            // 手指在圆圈内触摸,控杆跟随触摸点
            if (this.radius > distance) {
                this.dot.setPosition(moveVec);
            }
        }
        else if (this.joystickType === JoystickType.FOLLOW) {
            // 记录摇杆位置，给 touch move 使用
            this.node.getComponent(UIOpacity)!.opacity = 255;
            this._stickPos = touchPos;
            this._touchLocation = event.getUILocation();
            // 更改摇杆的位置

            this.ring.setWorldPosition(touchPos);
            this.dot.setPosition(Vec3.ZERO);
        }
    }

    /**
     * 触摸移动回调函数
     * @param event
     */
    private _touchMoveEvent(event: EventTouch) {
        if (!this.dot || !this.ring) return;

        // 如果 touch start 位置和 touch move 相同，禁止移动
        if (this.joystickType === JoystickType.FOLLOW && this._touchLocation === event.getUILocation()) {
            return false;
        }

        // 以圆圈为锚点获取触摸坐标
        const location = event.getUILocation();
        const touchPos = new Vec3(location.x, location.y);

        // 移动向量
        const moveVec = touchPos.subtract(this.ring.getWorldPosition());
        const distance = moveVec.length();

        let speedType = SpeedType.NORMAL;
        if (this.radius > distance) {
            this.dot.setPosition(moveVec);
            speedType = SpeedType.NORMAL;
        }
        else {
            // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
            this.dot.setPosition(moveVec.normalize().multiplyScalar(this.radius));
            speedType = SpeedType.FAST;
        }

        // 算出与(1,0)的夹角
        let angle = this.covertToAngle(moveVec);

        if (this.onController) {
            this.onController(event, {
                type: speedType,
                vector: moveVec.normalize(),
                angle
            });
        }
    }

    /** 根据位置转化角度 */
    private covertToAngle(pos: Vec3) {
        let angle = Math.atan2(pos.y, pos.x);
        return angle * macro.DEG;
    }

    /**
     * 触摸结束回调函数
     * @param event
     */
    private _touchEndEvent(event: EventTouch) {
        if (!this.dot || !this.ring) return;

        this.dot.setPosition(new Vec3());
        if (this.joystickType === JoystickType.FOLLOW) {
            this.node.getComponent(UIOpacity)!.opacity = 0;
        }

        if (this.onController) {
            this.onController(event, {
                type: SpeedType.STOP,
                vector: Vec3.ZERO,
                angle: 0
            });
        }
    }
}
