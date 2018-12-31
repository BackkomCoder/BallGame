cc.Class({
    extends: cc.Component,

    properties: {
        leftBorder: {
            default: null,
            type: cc.Node
        },
        rightBorder: {
            default: null,
            type: cc.Node
        },
        is_debug: false,
        bGameOver: false,
        uiGameOverPanel: {
            default: null,
            type: cc.Node
        },
        //敌人预设
        emenyBall: {
            default: null,
            type: cc.Prefab
        },
        //生成敌人速率
        spwanEmenyTime: 3,
        //生成敌人计数器
        spawnEmenyTimer: 0,
        //生成敌人位置
        spwanEmenyPosList: {
            default: [],
            type: [cc.Node],
        },
        //敌人父物体
        spwanEmenyParent: {
            default: null,
            type: cc.Node,
        },
        //敌人预设
        spwanEmenyPrefabList: {
            default: [],
            type: [cc.Prefab],
        }
    },


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        if (this.is_debug) {
            var Bits = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_joint | Bits.e_shapeBit;
        } else {
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        cc.director.getPhysicsManager().gravity = cc.v2(0, -320);
    },

    start() {

    },
    update(dt) {
        if (this.bGameOver === true) {
            return;
        }
        this.spawnEmenyTimer += dt;
        if (this.spawnEmenyTimer > this.spwanEmenyTime) {
            var targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);
            var emeny = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);

            var targetPosIndex = Math.floor(Math.random() * this.spwanEmenyPosList.length);
            var targetPos = this.spwanEmenyPosList[targetPosIndex];
            var worldPos = this.spwanEmenyPosList[0].parent.convertToWorldSpaceAR(cc.v2(targetPos.x, targetPos.y));

            var localPos = this.spwanEmenyParent.convertToNodeSpaceAR(worldPos);
            emeny.x = localPos.x;
            emeny.y = localPos.y;
            emeny.parent = this.spwanEmenyParent;

            cc.log(targetPosIndex);
           // if (this.targetPosIndex === 0) {
                emeny.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.random() * 300 + 200, 0);
           // } else if (this.targetPosIndex === 1) {
           //     emeny.getComponent(cc.RigidBody).linearVelocity = -cc.v2(Math.random() * 300 + 200, 0);
           // }
            this.spawnEmenyTimer = 0;
        }
    },
    GameOver() {
        this.uiGameOverPanel.active = true;
        this.bGameOver = true;
    },
    GetLeftBorder() {
        return this.leftBorder;
    },
    GetRightBorder() {
        return this.rightBorder;
    },
    LoadScene(){
        cc.director.loadScene("Start");
    }
});
