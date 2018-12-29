var GameMgr = require("GameMgr");
cc.Class({
    extends: cc.Component,  

    properties: {
        moveSpeed: 10,
        sheetDemage: 1,
        gameMgr:{
            default:null, 
            type:GameMgr
        }
    }, 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.leftMove = true;
                case cc.macro.KEY.d:
                    this.rightMove = true;
            }
        }, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.macro.KEY.a:
                    this.leftMove = false;
                case cc.macro.KEY.d:
                    this.rightMove = false;
            }
        }, this);
    },

    update (dt) {
        if(this.leftMove&&this.node.x>this.gameMgr.properties.leftBorad.x){
            this.node.x-=dt*this.moveSpeed;
        }else if(this.rightMove&&this.node.x<tthis.gameMgr.rightBorad.x){
            this.node.x+=dt*this.moveSpeed;
        }
    },
});
