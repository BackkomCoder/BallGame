
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
            this.node.destroy();
        }.bind(this), this.destroyTime);
    },

    update(dt) {
        if (cc.isValid(this.node)) {
            this.node.y += this.bulletSpeed * dt;
        }
    },
});
