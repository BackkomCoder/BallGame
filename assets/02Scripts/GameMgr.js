var uiMgr=require("UIMgr");
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
        uiMgr:uiMgr,
        //玩家得分
        playerScore:0,
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
        this.SpawnEmeny(dt);
    },
    //生成敌人
    SpawnEmeny(dt){
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

            emeny.getComponent(cc.RigidBody).linearVelocity = cc.v2(Math.random() * 300 + 200, 0);
          
            this.spawnEmenyTimer = 0;
        }
    },
    //游戏结束
    GameOver() {
        this.uiMgr.SetButtonState(true);
        this.bGameOver = true;
        cc.director.pause();
    },
    //重新加载场景
    LoadScene(){
        cc.director.resume();
        cc.director.loadScene("Start");
    },
    //玩家得分
    AddPlayerScore(addScore){
        this.playerScore+=addScore;
        this.uiMgr.SetScore(this.playerScore);
    },
});
