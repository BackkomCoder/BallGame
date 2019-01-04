
cc.Class({
    extends: cc.Component,

    properties: {
        //子弹速度
        bulletSpeed: 100,
        //子弹销毁时间
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
    },
    onEndContact(contact, selfCollider, otherCollider) {
        // cc.log("onEndContact");
    }
});
