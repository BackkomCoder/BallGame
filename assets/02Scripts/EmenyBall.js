var gameMgr = require("GameMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        //敌人生命Label
        lifeLabel: cc.Label,
        //gameMgr.js
        gameMgr: gameMgr,
        //physicsCircleCollider
        physicsCircleCollider: {
            type: cc.PhysicsCircleCollider,
            default: null,
        },
    },


    onLoad() {
        this.gameMgr = cc.find("/GameMgr").getComponent("GameMgr");
    },

    start() {
        this.physicsCircleCollider = this.node.getComponent(cc.PhysicsCircleCollider);
    },

    // update (dt) {},
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex === 4) {
            otherCollider.node.destroy();
            if (this.currentLifeCount <= 1) {
                this.gameMgr.AddPlayerScore(this.lifeCount);
                this.node.destroy();
                if (this.lifeCount >= 2) {
                    this.gameMgr.GenerateEmeny(this.node.position, parseInt(this.lifeCount / 2));
                }
            }
            this.currentLifeCount--;
            this.lifeLabel.string = this.currentLifeCount;
        }
        if (otherCollider.node.groupIndex === 2) {
            if (contact.colliderA.tag === 0) {
                this.gameMgr.cameraVibrate.SetVirbateCount(20);
            }
        }
    },
    initEmeny(lifeCount) {

        this.currentLifeCount = lifeCount;
        this.lifeLabel.string = this.currentLifeCount;
        this.lifeCount = this.currentLifeCount;
    }
});