cc.Class({
    extends: cc.Component,

    properties: {
        pressedScale: 1.3,
        transDuration: 0.3
    },
    start(){
    },
    // use this for initialization
    onLoad: function () {
        var self = this;
        // var audioMng = cc.find('Menu/AudioMng') || cc.find('Game/AudioMng')
        // if (audioMng) {
        //     audioMng = audioMng.getComponent('AudioMng');
        // }
        self.initScale = this.node.scale;
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        self.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.5),self.scaleDownAction,self.scaleUpAction)));
        // function onTouchDown (event) {
        //     this.stopAllActions();
        //     //if (audioMng) audioMng.playButton();
        //     this.runAction(self.scaleDownAction);
        // }
        // function onTouchUp (event) {
        //     this.stopAllActions();
        //     this.runAction(self.scaleUpAction);
        // }
        // this.node.on('touchstart', onTouchDown, this.node);
        // this.node.on('touchend', onTouchUp, this.node);
        // this.node.on('touchcancel', onTouchUp, this.node);
    }
});
