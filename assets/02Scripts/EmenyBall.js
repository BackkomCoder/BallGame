cc.Class({
    extends: cc.Component,

    properties: {
        //敌人生命Label
        lifeLabel: cc.Label,
        //physicsCircleCollider
        physicsCircleCollider: {
            type: cc.PhysicsCircleCollider, 
            default: null,
        },
    },


    onLoad() {
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
    },

    start() {
        this.physicsCircleCollider = this.node.getComponent(cc.PhysicsCircleCollider);
    },

    // update (dt) {},
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex === 4) {
            this.allClassQuote.player.bulletPool.put(otherCollider.node);
            if (this.currentLifeCount <= 1) {
                this.allClassQuote.gameMgr.AddPlayerScore(this.lifeCount);
               // this.node.destroy();
                this.allClassQuote.gameMgr.emenyPool.put(this.node);

                if (this.lifeCount >= 2) {
                    this.allClassQuote.gameMgr.GenerateEmeny(this.node.position, parseInt(this.lifeCount / 2));
                }
            }
            this.currentLifeCount--;
            this.lifeLabel.string = this.currentLifeCount;
        }
        if (otherCollider.node.groupIndex === 2) {
            if (contact.colliderA.tag === 0) {
                this.allClassQuote.cameraVibrate.SetVirbateCount(20);
            }
        }
    },
    initEmeny(lifeCount) {
        this.currentLifeCount = lifeCount;
        this.lifeLabel.string = this.currentLifeCount;
        this.lifeCount = this.currentLifeCount;
    }
});