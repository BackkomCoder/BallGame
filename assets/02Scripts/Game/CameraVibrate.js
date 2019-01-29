cc.Class({
    extends: cc.Component,

    properties: {
        //抖动的物体
        vibrateNode:cc.Node,
        //抖动时间
        vibrateTime:0.002,
        //抖动计时器
        vibrateTimer:{
            visible:false,
            default:0,
        },
        //抖动前的位置
        currentPos:{
            default:null,
            type:cc.v2,
            visible:false,
        },
        //抖动的次数
        vibrateCount:{
            default:0,
            visible:false,
        },
    },


    // onLoad () {},

    start () {
        if(this.vibrateNode!=null){
            this.currentPos=this.vibrateNode.position;
        }
    },

    update (dt) {
        this.vibrateTimer+=dt;
        if(this.vibrateTimer>this.vibrateTime&&this.vibrateCount>0){
            this.vibrateCount--;
            var vibrateDelta=Math.random()*10-5;
            if(this.vibrateCount===1){
                vibrateDelta=0;
                this.vibrateTimer=0;
            }
            this.vibrateNode.setPosition(cc.v2(vibrateDelta+this.currentPos.x,vibrateDelta+this.currentPos.y));
            
        }
    },
    //设置震动次数
    SetVirbateCount(count){
        this.vibrateCount=count;
    }
});
