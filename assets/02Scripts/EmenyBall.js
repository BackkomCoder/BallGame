// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lifeCount:0,
        maxLifeCount:10,
        labelCount:{
            type:cc.Label,
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:s

    // onLoad () {},

    start () {
        this.currentLifeCount=Math.ceil(Math.random()*this.maxLifeCount);
        this.labelCount.string=this.currentLifeCount;
        this.lifeCount = this.currentLifeCount;
        this.scoreLabel = cc.find("/Canvas/UI/ScoreLabel");
    },

    // update (dt) {},
     onBeginContact(contact,selfCollider,otherCollider){
         if(otherCollider.node.groupIndex===4){
             if(this.currentLifeCount<=1){
                otherCollider.node.destroy();
                this.node.destroy();
                this.scoreLabel.getComponent(cc.Label).string = "Score:" + (this.lifeCount + parseInt(this.scoreLabel.getComponent(cc.Label).string.slice(6)));
             }
             this.currentLifeCount--;
             this.labelCount.string=this.currentLifeCount;
         }
     },
});
