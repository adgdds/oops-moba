
export class TableSkill {
    static TableName: string = "/config/Skill.json";
    static Table: any = null!;

    static load() {
        var fs = require('fs');
        var data = fs.readFileSync(__dirname + this.TableName, 'utf8');
        this.Table = JSON.parse(data);
    }

    private data: any;

    init(id: number) {
        this.data = TableSkill.Table[id];
        this.id = id;
    }

    /** 编号【KEY】 */
    id: number = 0;

    /** 技能名 */
    get name(): string {
        return this.data.name;
    }
    /** 技能释放距离 */
    get distance(): number {
        return this.data.distance;
    }
}
    