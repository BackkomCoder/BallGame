var uiMgr = require("UIMgr");
var cameraVibrate = require("CameraVibrate");
cc.Class({
    extends: cc.Component,

    properties: {
        //左边界
        leftBorder: {
            default: null,
            type: cc.Node
        },
        //右边界
        rightBorder: {
            default: null,
            type: cc.Node
        },
        //是否开启物理调试
        is_debug: false,
        //游戏是否结束
        bGameOver: false,
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
        },
        //UIMgr
        uiMgr: uiMgr,
        //玩家得分
        playerScore: 0,

        cameraVibrate: {
            default: null,
            type: cameraVibrate,
        },
        //敌人最大生命值
        maxLifeCount: 10,
        //玩家
        player: cc.Node,
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

    start() {},
    update(dt) {
        if (this.bGameOver === true) {
            return;
        }
        this.SpawnEmeny(dt);
    },
    //生成敌人
    SpawnEmeny(dt) {
        this.spawnEmenyTimer += dt;
        if (this.spawnEmenyTimer > this.spwanEmenyTime) {
            var targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);

            var emeny = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);

            emeny.getComponent("EmenyBall").initEmeny(Math.ceil(Math.random() * this.maxLifeCount));

            var targetPosIndex = Math.floor(Math.random() * this.spwanEmenyPosList.length);
            var targetPos = this.spwanEmenyPosList[targetPosIndex];
            var worldPos = this.spwanEmenyPosList[0].parent.convertToWorldSpaceAR(cc.v2(targetPos.x, targetPos.y));

            var localPos = this.spwanEmenyParent.convertToNodeSpaceAR(worldPos);
            emeny.x = localPos.x;
            emeny.y = localPos.y;
            emeny.parent = this.spwanEmenyParent;

            emeny.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.random() * 300 + 200, 0);

            this.spawnEmenyTimer = 0;
        }
    },
    GenerateEmeny(emenyPos, lifeCount) {
        var targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);
        var emeny1 = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
        emeny1.getComponent("EmenyBall").initEmeny(lifeCount);

        emeny1.x = emenyPos.x;
        emeny1.y = emenyPos.y;
        emeny1.parent = this.spwanEmenyParent;
        emeny1.getComponent(cc.PhysicsCircleCollider).restitution = 1.2;


        //设置小球初始速度，暂定为固定值
        // emeny1.getComponent(cc.RigidBody).linearVelocity = cc.v2(-(Math.random() * 300 + 200), 0);
        emeny1.getComponent(cc.RigidBody).linearVelocity = cc.v2(-230, 240);

        var emeny2 = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
        emeny2.getComponent("EmenyBall").initEmeny(lifeCount);

        emeny2.x = emenyPos.x;
        emeny2.y = emenyPos.y;
        emeny2.parent = this.spwanEmenyParent;
        emeny2.getComponent(cc.PhysicsCircleCollider).restitution = 1.2;

        // emeny2.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.random() * 300 + 200, 0);
        emeny2.getComponent(cc.RigidBody).linearVelocity = cc.v2(230, 240);
    },
    //游戏结束
    GameOver() {
        this.uiMgr.SetButtonState(true);
        this.bGameOver = true;
        cc.director.pause();
    },
    //重新加载场景
    LoadScene() {
        cc.director.resume();
        cc.director.loadScene("Start");
    },
    //玩家得分
    AddPlayerScore(addScore) {
        this.playerScore += addScore;
        this.uiMgr.SetScore(this.playerScore);
    },
});