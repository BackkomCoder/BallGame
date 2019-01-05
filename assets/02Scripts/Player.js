var GameMgr = require("GameMgr");
cc.Class({
    extends: cc.Component,  

    properties: {
        //移动速度
        moveSpeed: 10,
        //子弹伤害
        sheetDemage: 1,
        //gameMgr.js
        gameMgr:{
            default:null, 
            type:GameMgr
        },
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
        //节点初始位置,每次触摸结束更新
        this.nodePos = this.node.getPosition();
        this.OnTouchEvent();
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
        var minX = this.gameMgr.leftBorder.x; //最小X坐标；
        var maxX = this.gameMgr.rightBorder.x;
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
    // start() {
    //     this.gameMgrNode.on(cc.Node.EventType.TOUCH_MOVE,function(event){
    //         this.moveDir=event.getDelta().x;
    //     }.bind(this),this);
    //     this.gameMgrNode.on(cc.Node.EventType.TOUCH_START,function(event){
    //         this.bTouch=true;
    //     }.bind(this),this);
    //     this.gameMgrNode.on(cc.Node.EventType.TOUCH_END,function(event){
    //         this.bTouch=false;
    //         this.moveDir=0;
    //     }.bind(this),this);
    //     this.gameMgrNode.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
    //         this.bTouch=false;
    //         this.moveDir=0;
    //     }.bind(this),this);
    // },
    
    update (dt) {
        this.SpawnBullet(dt);
        // this.PlayerMove(dt);
    },

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.groupIndex===1){
            this.gameMgr.GameOver();
        }
    },
    //角色移动
    PlayerMove(dt){
        if(this.moveDir<0&&this.node.x>this.gameMgr.leftBorder.x){
            this.node.x-=dt*this.moveSpeed;
        }else if(this.moveDir>0&&this.node.x<this.gameMgr.rightBorder.x){
            this.node.x+=dt*this.moveSpeed;
        }
    },
    //生成子弹
    SpawnBullet(dt){
        this.bulletShootIntervalTimer+=dt;
        if(this.bTouch&&this.bulletShootIntervalTimer>this.bulletShootInterval){
            var bullet=cc.instantiate(this.bulletPrefab);
            var worldPos=this.node.convertToWorldSpaceAR(cc.v2(this.bulletShootPos.x,this.bulletShootPos.y));
            var localPos = this.bulletParent.convertToNodeSpaceAR(worldPos);
            bullet.x=localPos.x;
            bullet.y=localPos.y;
            bullet.parent=this.bulletParent;
            this.bulletShootIntervalTimer=0;
        }
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
