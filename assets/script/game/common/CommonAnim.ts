import * as cc from "cc";

/** 游戏动画暂停/恢复 */
module CommonAnim {
	const pause_data = new (class {
		/** 暂停状态 */
		state_b = false;
		/** 2d物理系统状态 */
		physics_2d_b: boolean;
		/** 3d物理系统状态 */
		physics_3d_b: boolean;
		/** 定时器对象列表 */
		scheduler_as: any[];
		/** 动画列表 */
		anim_as: cc.AnimationState[] = [];
		/** 缓动对象列表 */
		tween_target_as: any[];
		/**龙 骨组件列表 */
		dragon_bones_as: cc.dragonBones.ArmatureDisplay[];
		/** SPINE组件列表 */
		spine_as: cc.sp.Skeleton[];
	})();

	/** 暂停游戏配置 */
	export class pause_config {
		/** 排除节点 */
		exclude_as?: cc.Node[];
		/** 递归排除节点 */
		recu_exclude_as?: cc.Node[];
	}

	function recu_node_list(node_: cc.Node, result_as: cc.Node[] = []): cc.Node[] {
		if (!node_) {
			return result_as;
		}
		result_as.push(node_);
		node_.children.forEach(v1 => {
			result_as.push(v1);
			recu_node_list(v1);
		});
		return result_as;
	}

	/**暂停游戏 */
	export function pause(config_?: pause_config): void {
		if (pause_data.state_b) return;

		// 暂停定时器
		pause_data.scheduler_as = cc.director.getScheduler().pauseAllTargets();

		// 暂停当前动画
		{
			let anim_system = cc.director.getSystem(cc.AnimationManager.ID);
			pause_data.anim_as.splice(0, pause_data.anim_as.length, ...anim_system["_anims"].array);
			pause_data.anim_as.forEach(v1 => {
				v1.pause();
			});
		}

		// 暂停龙骨动画
		{
			pause_data.spine_as = cc.director
				.getScene()
				.getComponentsInChildren(cc.sp.Skeleton);
			pause_data.spine_as.forEach(v1 => {
				v1.timeScale = 0;
			});
		}

		{
			pause_data.dragon_bones_as = cc.director
				.getScene()
				.getComponentsInChildren(cc.dragonBones.ArmatureDisplay);
			pause_data.dragon_bones_as.forEach(v1 => {
				v1.timeScale = 0;
			});
		}

		// 暂停当前缓动
		pause_data.tween_target_as = cc.TweenSystem.instance.ActionManager.pauseAllRunningActions();

		// 暂停物理系统
		{
			if (cc.PhysicsSystem2D && cc.PhysicsSystem2D.instance.enable) {
				pause_data.physics_2d_b = cc.PhysicsSystem2D.instance.enable;
				cc.PhysicsSystem2D.instance.enable = false;
			}
			if (cc.PhysicsSystem && cc.PhysicsSystem.instance.enable) {
				pause_data.physics_3d_b = cc.PhysicsSystem.instance.enable;
				cc.PhysicsSystem.instance.enable = false;
			}
		}

		// 恢复排除节点
		if (config_) {
			let exclude_as: cc.Node[] = [];
			exclude_as.push(...config_.exclude_as);
			config_.recu_exclude_as?.forEach(v1 => {
				exclude_as.push(...recu_node_list(v1));
			});
			exclude_as.forEach(v1 => {
				resume_node(v1);
			});
		}
		pause_data.state_b = true;
	}

	/** 恢复游戏 */
	export function resume(): void {
		// 恢复定时器
		cc.director.getScheduler().resumeTargets(pause_data.scheduler_as);

		// 恢复动画
		pause_data.anim_as.forEach(v1 => {
			if (v1.isPlaying && v1.isPaused) {
				v1.play();
			}
		});

		// 恢复龙骨动画
		pause_data.dragon_bones_as.forEach(v1 => {
			v1.timeScale = 1;
		});

		pause_data.spine_as.forEach(v1 => {
			v1.timeScale = 1;
		});

		// 恢复缓动
		cc.TweenSystem.instance.ActionManager.resumeTargets(pause_data.tween_target_as);

		// 恢复物理系统
		{
			if (pause_data.physics_2d_b) {
				cc.PhysicsSystem2D.instance.enable = pause_data.physics_2d_b;
			}
			if (pause_data.physics_3d_b) {
				cc.PhysicsSystem.instance.enable = pause_data.physics_3d_b;
			}
		}
		pause_data.state_b = false;
	}

	/** 
	 * 暂停节点
	 * 物理系统需手动启用/禁用
	 */
	export function pause_node(node_: cc.Node): void;
	export function pause_node(node_as_: cc.Node[]): void;
	export function pause_node(args1_: cc.Node | cc.Node[]): void {
		let node_as: cc.Node[];
		if (Array.isArray(args1_)) {
			node_as = args1_;
		}
		else {
			node_as = [args1_];
		}

		node_as.forEach(v1 => {
			// 暂停定时器
			cc.director.getScheduler().pauseTarget(v1);
			// 暂停动画
			v1.getComponent(cc.Animation)?.pause();
			// 暂停龙骨
			if (v1.getComponent(cc.dragonBones.ArmatureDisplay)) {
				v1.getComponent(cc.dragonBones.ArmatureDisplay).timeScale = 0;
			}
			// 暂停缓动
			cc.TweenSystem.instance.ActionManager.pauseTarget(v1);
		});
	}

	/** 恢复节点 */
	export function resume_node(node_: cc.Node): void;
	export function resume_node(node_as_: cc.Node[]): void;
	export function resume_node(args1_: cc.Node | cc.Node[]): void {
		let node_as: cc.Node[];
		if (Array.isArray(args1_)) {
			node_as = args1_;
		}
		else {
			node_as = [args1_];
		}
		node_as.forEach(v1 => {
			// 恢复定时器
			cc.director.getScheduler().resumeTarget(v1);
			// 恢复动画
			v1.getComponent(cc.Animation)?.resume();
			// 恢复龙骨
			if (v1.getComponent(cc.dragonBones.ArmatureDisplay)) {
				v1.getComponent(cc.dragonBones.ArmatureDisplay).timeScale = 1;
			}
			// 恢复缓动
			cc.TweenSystem.instance.ActionManager.resumeTarget(v1);
		});
	}
}

export default CommonAnim;
