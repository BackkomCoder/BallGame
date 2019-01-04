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
        }
    }, 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            this.moveDir=event.getDelta().x;
        }.bind(this),this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_START,function(event){
            this.bTouch=true;
        }.bind(this),this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_END,function(event){
            this.bTouch=false;
            this.moveDir=0;
        }.bind(this),this);
        this.gameMgrNode.on(cc.Node.EventType.TOUCH_CANCEL,function(event){
            this.bTouch=false;
            this.moveDir=0;
        }.bind(this),this);
    },
    
    update (dt) {
        this.SpawnBullet(dt);
        this.PlayerMove(dt);
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
    }
});
