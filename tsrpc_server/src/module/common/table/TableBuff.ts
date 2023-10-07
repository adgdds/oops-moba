
export class TableBuff {
    static TableName: string = "/config/Buff.json";
    static Table: any = null!;

    static load() {
        var fs = require('fs');
        var data = fs.readFileSync(__dirname + this.TableName, 'utf8');
        this.Table = JSON.parse(data);
    }

    private data: any;

    init(id: number) {
        this.data = TableBuff.Table[id];
        this.id = id;
    }

    /** 编号【KEY】 */
    id: number = 0;

    /** 状态名 */
    get name(): string {
        return this.data.name;
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
    