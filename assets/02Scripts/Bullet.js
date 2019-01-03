
cc.Class({
    extends: cc.Component,

    properties: {
        bulletSpeed: 100,
        destroyTime: 1000
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start() {
        setTimeout(function () {
            if (cc.isValid(this.node)) {
                this.node.destroy();
            }
        }.bind(this), this.destroyTime);
    },

    update(dt) {
        if (cc.isValid(this.node)) {
            this.node.y += this.bulletSpeed * dt;
        }
    },
    onPreSolve(contact, selfCollider, otherCollider) {
        // cc.log("onPreSolve");
    },
    onPostSolve(contact, selfCollider, otherCollider) {
        // cc.log("onPostSolve");
    },
    onBeginContact(contact, selfCollider, otherCollider) {
        // cc.log("onBeginContact");
        cc.log("tag: " + otherCollider.tag);
        cc.log(typeof (otherCollider.tag));
        if(otherCollider.tag === 0){
            selfCollider.node.destroy();
        }
    },
    onEndContact(contact, selfCollider, otherCollider) {
        // cc.log("onEndContact");
    }
});
