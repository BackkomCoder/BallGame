var weee = require("PersistRootNode");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log(weee.instance.aaaa);
    },

    // update (dt) {},
    Test(){
        console.log("Test");
    }
});
