
import { JsonUtil } from "../../../../../extensions/oops-plugin-framework/assets/core/utils/JsonUtil";

export class TableSkill {
    static TableName: string = "Skill";

    private data: any;

    init(id: number) {
        var table = JsonUtil.get(TableSkill.TableName);
        this.data = table[id];
        this.id = id;
    }

    /** 编号【KEY】 */
    id: number = 0;

    /** 技能名 */
    get name(): string {
        return this.data.name;
    }
    /** 技能描述 */
    get describe(): string {
        return this.data.describe;
    }
    /** 是否有前摇动作 */
    get front(): number {
        return this.data.front;
    }
    /** 弹道特效 */
    get ballistic(): string {
        return this.data.ballistic;
    }
    /** 受击特效 */
    get hit(): string {
        return this.data.hit;
    }
    /** 技能释放距离 */
    get distance(): number {
        return this.data.distance;
    }
}
    