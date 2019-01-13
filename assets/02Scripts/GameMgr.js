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
        //玩家得分
        playerScore: 0,

        //敌人最大生命值
        maxLifeCount: 10,
        //玩家
        player: cc.Node,
    },


    onLoad() {
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
        

        this.emenyPool=new cc.NodePool();
        let initCount=30;
        for(let i=0;i<initCount;++i){
            let targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);
            let emeny = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
            this.emenyPool.put(emeny);
        }
    },

    start() {
    },
    update(dt) {
        if (this.bGameOver === true) {
            return;
        }
        this.SpawnEmeny(dt);
        console.log(this.emenyPool.size());
    },
    SpawnEmenyByPool(){
        let emeny=null;


        if(this.emenyPool.size()>0){
            emeny=this.emenyPool.get();
        }else{

            let targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);
            console.log("生成敌人");
            emeny = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
        }
        return emeny;
    },
    //生成敌人
    SpawnEmeny(dt) {
        this.spawnEmenyTimer += dt;
        if (this.spawnEmenyTimer > this.spwanEmenyTime) {
        //    var targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);

        //    var emeny = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
            let emeny = this.SpawnEmenyByPool();
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
        let targetEmenyIndex = Math.floor(Math.random() * this.spwanEmenyPrefabList.length);
         // let emeny1 = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
        let emeny1 = this.SpawnEmenyByPool();
        emeny1.getComponent("EmenyBall").initEmeny(lifeCount);

        emeny1.x = emenyPos.x;
        emeny1.y = emenyPos.y;
        emeny1.parent = this.spwanEmenyParent;
        emeny1.getComponent(cc.PhysicsCircleCollider).restitution = 1.2;
        //设置小球初始速度，暂定为固定值
        emeny1.getComponent(cc.RigidBody).linearVelocity = cc.v2(-230, 240);




        // let emeny2 = cc.instantiate(this.spwanEmenyPrefabList[targetEmenyIndex]);
        let emeny2 = this.SpawnEmenyByPool();
        emeny2.getComponent("EmenyBall").initEmeny(lifeCount);

        emeny2.x = emenyPos.x;
        emeny2.y = emenyPos.y;
        emeny2.parent = this.spwanEmenyParent;
        emeny2.getComponent(cc.PhysicsCircleCollider).restitution = 1.2;
        emeny2.getComponent(cc.RigidBody).linearVelocity = cc.v2(230, 240);
    },
    //游戏结束
    GameOver() {
        this.allClassQuote.uiMgr.SetButtonState(true);
        this.bGameOver = true;
        cc.director.pause();
        this.player.getComponent("Player").OffTouchEvent();
    },
    //重新加载场景
    LoadScene() {
        cc.director.resume();
        cc.director.loadScene("Start");
    },
    //玩家得分
    AddPlayerScore(addScore) {
        this.playerScore += addScore;
        this.allClassQuote.uiMgr.SetScore(this.playerScore);
    },
});