/** 
 * 定时跳动组件 
 * @example
    export class Test extends Component {
        // 创建一个定时跳动组件
        private timer: Timer = new Timer(1);

        update(dt: number) {
            if (this.timer.update(this.dt)) {
                console.log(每一秒触发一次);
            }
        }
    }
 */
    export class Timer {
        /** 定时到了回调 */
        callback: Function | null = null;
    
        private _elapsedTime: number = 0;
    
        /** 逝去时间 */
        get elapsedTime(): number {
            return this._elapsedTime;
        }
    
        private _step: number = 0;
        /** 获取触发间隔时间单位秒 */
        get step(): number {
            return this._step;
        }
        /** 设置触发间隔时间单位秒 */
        set step(step: number) {
            this._step = step;                     // 每次修改时间
            this._elapsedTime = 0;                 // 逝去时间
        }
    
        /** 进度 */
        get progress(): number {
            return this._elapsedTime / this._step;
        }
    
        /**
         * 构造函数
         * @param step 每跳动一次步长单位位
         */
        constructor(step: number = 0) {
            this.step = step;
        }
    
        /** 游戏引擎的cc.Component组件的update方法调用 */
        update(dt: number) {
            this._elapsedTime += dt;
    
            if (this._elapsedTime >= this._step) {
                this._elapsedTime -= this._step;
                this.callback?.call(this);
                return true;
            }
            return false;
        }
    
        /** 重置 */
        reset() {
            this._elapsedTime = 0;
        }
    }