cc.Class({
    extends: cc.Component,  

    properties: {
        //移动速度
        moveSpeed: 10,
        //子弹伤害
        sheetDemage: 1,
        //gameMgr.js结点
        gameMgrNode:{
            default:null, 
            type:cc.Node
        },
        //子弹预设
        bulletPrefab:{
            default:null,
            type:cc.Prefab
        },
        //子弹父物体
        bulletParent:{
            default:null,
            type:cc.Node
        },
        //子弹发射位置
        bulletShootPos:{
            default:null,
            type:cc.Node
        },
        //子弹发射间隔
        bulletShootInterval:1,
        //子弹发射计时器
        bulletShootIntervalTimer:{
            default:0,
            visible:false
        },
        //移动方向
        moveDir:{
            default:0,
            visible:false
        },
    }, 

    // this.node 是需要移动的节点
    onLoad () {
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
        //节点初始位置,每次触摸结束更新
        this.nodePos = this.node.getPosition();
        this.OnTouchEvent();


        this.bulletPool=new cc.NodePool();
        let initCount=50;
        for(let i=0;i<initCount;++i){
            let bullet =cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    },
    update (dt) {
        this.SpawnBullet(dt);
    },
    onDestroy(){
        this.OffTouchEvent();
    },
    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.groupIndex===1){
            this.allClassQuote.gameMgr.GameOver();
        }
    },
    //角色移动
    PlayerMove(dt){
        if(this.moveDir<0&&this.node.x>this.allClassQuote.gameMgr.leftBorder.x){
            this.node.x-=dt*this.moveSpeed;
        }else if(this.moveDir>0&&this.node.x<this.allClassQuote.gameMgr.rightBorder.x){
            this.node.x+=dt*this.moveSpeed;
        }
    },
    //生成子弹
    SpawnBullet(dt){
        this.bulletShootIntervalTimer+=dt;
        if(this.bTouch&&this.bulletShootIntervalTimer>this.bulletShootInterval){
            //var bullet=cc.instantiate(this.bulletPrefab);
            for(var i=-2;i<3;i++){
                let bullet=null;
                if(this.bulletPool.size()>0){
                    bullet=this.bulletPool.get();
                }else{
                    bullet=cc.instantiate(this.bulletPrefab);
                }
                var worldPos=this.node.convertToWorldSpaceAR(cc.v2(this.bulletShootPos.x,this.bulletShootPos.y));
                var localPos = this.bulletParent.convertToNodeSpaceAR(worldPos);
                bullet.setPosition(cc.v2(localPos.x+(i*30),localPos.y));
                bullet.parent=this.bulletParent;
            }
            this.bulletShootIntervalTimer=0;
        }
    },
    //触摸移动；
    onTouchMove (event) {
        //触摸刚开始的位置
        var oldPos = this.gameMgrNode.convertToNodeSpaceAR(event.getStartLocation());
        //触摸时不断变更的位置
        var nePos = this.gameMgrNode.convertToNodeSpaceAR(event.getLocation());

        var subPos = oldPos.sub(nePos);
        this.node.x = this.nodePos.x - subPos.x;

        // 控制节点移不出屏幕;
        var minX = this.allClassQuote.gameMgr.leftBorder.x; //最小X坐标；
        var maxX = this.allClassQuote.gameMgr.rightBorder.x;
        var nPos = this.node.getPosition(); //节点实时坐标；
        if (nPos.x < minX) {
            nPos.x = minX;
        };
        if (nPos.x > maxX) {
            nPos.x = maxX;
        };
        this.node.setPosition(nPos.x,this.node.y);
    },
    onTouchEnd () {
        this.bTouch=false;
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；
    },
    onTouchCancel: function () {
        this.bTouch=false;
        this.nodePos = this.node.getPosition(); //获取触摸结束之后的node坐标；
    },
    onTouchStart(){
        this.bTouch=true;
    },
    //开始监听触摸事件
    OnTouchEvent(){
        console.log("游戏开始");
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
    //停止监听触摸事件
    OffTouchEvent(){
        console.log("游戏结束");
        this.gameMgrNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.gameMgrNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.gameMgrNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.gameMgrNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },
});
