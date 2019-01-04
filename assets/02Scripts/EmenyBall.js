var gameMgr = require("GameMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        //敌人生命值
        lifeCount:0,
        //敌人最大生命值
        maxLifeCount:10,
        //敌人生命Label
        lifeLabel:cc.Label,
        //gameMgr.js
        gameMgr:gameMgr,
    },


    onLoad () {
        this.gameMgr=cc.find("/GameMgr").getComponent("GameMgr");
    },

    start () {
        this.currentLifeCount=Math.ceil(Math.random()*this.maxLifeCount);
        this.lifeLabel.string=this.currentLifeCount;
        this.lifeCount = this.currentLifeCount;
    },

    // update (dt) {},
     onBeginContact(contact,selfCollider,otherCollider){
         if(otherCollider.node.groupIndex===4){
            otherCollider.node.destroy();
             if(this.currentLifeCount<=1){
                this.gameMgr.AddPlayerScore(this.lifeCount);
                this.node.destroy();
             }
             this.currentLifeCount--;
             this.lifeLabel.string=this.currentLifeCount;
         }
     },
});
