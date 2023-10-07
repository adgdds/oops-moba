
import { log, macro, Node, Vec3 } from 'cc';
import { oops } from '../../../../../extensions/oops-plugin-framework/assets/core/Oops';
import { Vec3Util } from '../../../../../extensions/oops-plugin-framework/assets/core/utils/Vec3Util';

/** 角色攻击范围与目标方位验证 */
export class RoleUtil {
    /**
     * 判断转向目标方向时顺时针还是逆时针
     * @param self            自己
     * @param target          目标
     * @return  正值为顺时针转;负值为逆时针转;0为不旋转
     */
    public static checkRotationDirection(self: Node, target: Node) {
        // 自己与目标单位向量
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition).normalize();

        // 计算自己前方向与朝向目标方向平面法线
        var cross = Vec3.cross(new Vec3(), self.forward, dir);          // a X b = -b X a

        // 计算夹角
        var dot = Vec3.dot(self.forward, dir);                          // a · b = b · a
        var angle = Math.acos(dot) * macro.DEG;

        if (cross.y > 0)              // 顺时针转
            return angle;
        else if (cross.y < 0)         // 逆时针转
            return -angle;
        else                          // 没有旋转
            return 0;
    }

    /**
     * 判断目标在自己的左还是右
     * @param self            自己
     * @param target          目标
     */
    public static checkLeftOrRight(self: Node, target: Node) {
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition).normalize();
        var cross = Vec3.cross(new Vec3, self.forward, dir);

        // 右手坐标系，默认 x 向右，y 向上，z 向外，同时使用 -z 轴为正前方朝向
        if (cross.y > 0) {
            log("目标在我左边");
        }
        else if (cross.y < 0) {
            log("目标在我右边");
        }
    }

    /**
     * 判断目标在自己的前还是后
     * @param self            自己
     * @param target          目标
     */
    public static checkBeforeAndAfter(self: Node, target: Node) {
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition).normalize();
        var dot = Vec3.dot(self.forward, dir);
        if (dot > 0) {
            oops.gui.toast("目标在我前面");
        }
        else if (dot < 0) {
            oops.gui.toast("目标在我后面");
        }
    }

    /**
     * 检查目标是否在扇形范围内
     * @param self            自己
     * @param target          目标
     * @param maxRadius       扇形半径
     * @param maxAngle        扇形角度
     */
    public static checkSectorRange(self: Node, target: Node, maxRadius: number, maxAngle: number) {
        // 玩家与敌人的方向向量
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition)
        var radius = dir.length();

        // 求两个向量的夹角
        var dot = Vec3.dot(self.forward, dir.normalize());
        var angle = Math.acos(dot) * macro.DEG;

        if (radius <= maxRadius && angle <= maxAngle * 0.5) {
            oops.gui.toast("在扇形范围内");
            return true;
        }
        else {
            oops.gui.toast("在扇形范围之外");
            return false;
        }
    }

    /**
     * 检查目标是否在半圆范围内
     * @param self            自己
     * @param target          目标
     * @param maxRadius       半圆半径
     */
    public static checkSemicircleRange(self: Node, target: Node, maxRadius: number) {
        // 玩家与敌人的方向向量
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition);
        // 与玩家正前方做点积
        var radius = Vec3.dot(self.forward, dir);

        // 判断目标是否在自己前方向
        if (radius > 0 && radius <= maxRadius) {
            oops.gui.toast("进入半圆范围");
            return true;
        }
        oops.gui.toast("不在半圆范围");
        return false;
    }

    /**
     * 检查目标是否在矩形范围内
     * @param self            自己
     * @param target          目标
     * @param maxHeight       矩形长
     * @param maxWidth        矩形宽
     */
    public static checkRectRange(self: Node, target: Node, maxHeight: number, maxWidth: number) {
        // 玩家与敌人的方向向量
        var dir: Vec3 = Vec3.subtract(new Vec3, self.worldPosition, target.worldPosition);
        // 与玩家正前方到目标的距离
        var distance = Vec3.dot(self.forward, dir);

        // 判断目标是否在自己前方向
        if (distance > 0 && distance <= maxHeight) {
            var right = Vec3.transformQuat(new Vec3, Vec3.RIGHT, self.rotation);
            var rightDistance = Vec3.dot(dir, right);

            // 判断目标是否在矩形宽度内
            if (Math.abs(rightDistance) <= maxWidth) {
                oops.gui.toast("进入矩形范围");
                return true;
            }
        }
        oops.gui.toast("不在矩形范围");
        return false;
    }

    /**
     * 目标在自己的左边还是右边
     * @param owner     自己节点
     * @param target    目标节点
     */
    public static LeftOrRight(owner: Node, target: Node) {
        var dir: Vec3 = Vec3.subtract(new Vec3, owner.worldPosition, target.worldPosition).normalize();
        var dot = Vec3Util.dot(this.getNodeRight(owner), dir);

        if (dot < 0) {
            log("目标在我左边");
        }
        else if (dot > 0) {
            log("目标在我右边");
        }
    }

    /**
     * 目标在自己的上边还是下边
     * @param owner     自己节点
     * @param target    目标节点
     */
    public static UpOrDown(owner: Node, target: Node) {
        var dir: Vec3 = Vec3.subtract(new Vec3, owner.worldPosition, target.worldPosition).normalize();
        var dot = Vec3Util.dot(this.getNodeUp(owner), dir);

        if (dot < 0) {
            log("目标在我上边");
        }
        else if (dot > 0) {
            log("目标在我下边");
        }
    }

    public static getNodeUp(node: Node): Vec3 {
        return Vec3.transformQuat(new Vec3(), Vec3.UP, node.worldRotation);
    }

    public static getNodeRight(node: Node): Vec3 {
        return Vec3.transformQuat(new Vec3(), Vec3.RIGHT, node.worldRotation);
    }

}