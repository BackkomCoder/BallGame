cc.Class({
    extends: cc.Component,

    properties: {
        //子弹速度
        bulletSpeed: 100,
    },


    onLoad () {
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
    },
    start() {
    },

    update(dt) {
        if (cc.isValid(this.node)) {
            this.node.y += this.bulletSpeed * dt;
        }
    },
    // onPreSolve(contact, selfCollider, otherCollider) {
    // },
    // onPostSolve(contact, selfCollider, otherCollider) {
    // },
    onBeginContact(contact, selfCollider, otherCollider) {
        if(otherCollider.node.groupIndex === 2){
           this.allClassQuote.player.bulletPool.put(this.node);
        }
    },
    // onEndContact(contact, selfCollider, otherCollider) {
    // }
});
