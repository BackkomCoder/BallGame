var UIMgr = cc.Class({
    // statics:{
    //     instance:null
    // },
    extends: cc.Component,

    properties: {
        //分数Label  
        labScore:cc.Label,
        //再来一局button
        btnAgain:cc.Button, 
    },

    //设置按钮状态
    SetButtonState(state){
        this.btnAgain.node.active=state;
    },
    //设置得分
    SetScore(score){
        this.labScore.string="Score:"+score.toString();
    },
    onLoad () {
    },

    start () {

    },

    // update (dt) {},
});
// UIMgr.instance=new UIMgr();
// module.extends=UIMgr;
