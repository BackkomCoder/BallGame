
cc.Class({
    extends: cc.Component,

    properties: {
        //是否开启物理调试
        bDebugPhysics: false,
        //是否开启碰撞调试
        bDebugCollision: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //碰撞模块
        // let manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // if(this.bDebugCollision){
        //     // 显示 碰撞组件 的 碰撞检测范围
        //     manager.enabledDebugDraw = true;
        //     //显示碰撞组件的包围盒
        //     manager.enabledDrawBoundingBox = true;
        // }

        //物理模块
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        if (this.bDebugPhysics) {
            let Bits = cc.PhysicsManager.DrawBits;
            physicsManager.debugDrawFlags = Bits.e_joint | Bits.e_shapeBit;
        } else {
            physicsManager.debugDrawFlags = 0;
        }
    },

    start () {

    },

    // update (dt) {},
});
