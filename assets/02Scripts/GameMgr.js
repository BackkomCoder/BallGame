cc.Class({
    extends: cc.Component,

    properties: {
        leftBorder:{
            default:null,
            type:cc.Node
        },
        rightBorder:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    GetLeftBorder(){
        return this.leftBorder;
    },
    GetRightBorder(){
        return this.rightBorder;
    }
    // update (dt) {},
});
