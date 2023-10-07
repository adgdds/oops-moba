
import { JsonUtil } from "../../../../../extensions/oops-plugin-framework/assets/core/utils/JsonUtil";

export class TableBuff {
    static TableName: string = "Buff";

    private data: any;

    init(id: number) {
        var table = JsonUtil.get(TableBuff.TableName);
        this.data = table[id];
        this.id = id;
    }

    /** 编号【KEY】 */
    id: number = 0;

    /** 状态名 */
    get name(): string {
        return this.data.name;
    }
    /** 状态描述 */
    get describe(): string {
        return this.data.describe;
    }
    /** 受击特效 */
    get hit(): string {
        return this.data.hit;
    }
    /** 效果类型 */
    get isGain(): number {
        return this.data.isGain;
    }
    /** 可叠加层数上限 */
    get overlying(): number {
        return this.data.overlying;
    }
    /** 效果持续时间（毫秒） */
    get duration(): number {
        return this.data.duration;
    }
    /** 间隔触发时间（毫秒） */
    get interval(): number {
        return this.data.interval;
    }
    /** 间隔触发时间（毫秒） */
    get delay(): number {
        return this.data.delay;
    }
}
    