var PERSISTROOTNODE = cc.Class({
    extends: cc.Component,

    statics:{
        instance:null
    },
    properties: {
        selectedBgSpriteFrameName:"bkg_1",
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    start () {
    },

    // update (dt) {},
});
PERSISTROOTNODE.instance=new PERSISTROOTNODE();
module.extends=PERSISTROOTNODE;
