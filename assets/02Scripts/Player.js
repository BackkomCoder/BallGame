var GameMgr = require("GameMgr");
cc.Class({
    extends: cc.Component,  

    properties: {
        moveSpeed: 10,
        sheetDemage: 1,
        gameMgr:{
            default:null, 
            type:GameMgr
        },
        gameMgrNode:{
            default:null, 
            type:cc.Node
        },
        bulletPrefab:{
            default:null,
            type:cc.Prefab
        },
        bulletParent:{
            default:null,
            type:cc.Node
        },
        bulletShootPos:{
            default:null,
            type:cc.Node
        },
        bulletShootInterval:1,
        bulletShootIntervalTimer:{
            default:0,
            visible:false
        },
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
        if(this.moveDir<0&&this.node.x>this.gameMgr.GetLeftBorder().x){
            this.node.x-=dt*this.moveSpeed;
        }else if(this.moveDir>0&&this.node.x<this.gameMgr.GetRightBorder().x){
            this.node.x+=dt*this.moveSpeed;
        }
    },

    onBeginContact(contact,selfCollider,otherCollider){
        if(otherCollider.node.groupIndex===1){
            this.gameMgr.GameOver();
        }
    },
});
