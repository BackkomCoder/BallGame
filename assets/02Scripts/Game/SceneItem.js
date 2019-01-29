var PersistRootNode=require("PersistRootNode");
cc.Class({
    extends: cc.Component,

    properties: {
        selectedMarkNode:cc.Node,
        selectedSprite:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    SelectedBackgroundSprite(){
       // this.selectedMarkNode.active=!this.selectedMarkNode.active;
        PersistRootNode.instance.selectedBgSpriteFrameName=this.selectedSprite.spriteFrame.name;
        console.log(PersistRootNode.instance.selectedBgSpriteFrameName);
    }
});
