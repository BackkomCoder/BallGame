var UIMgr = cc.Class({
    extends: cc.Component,

    properties: {
        //分数Label  
        labScore:cc.Label,
        //再来一局button
        btnAgain:cc.Button, 
    },
    onLoad(){
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
    },
    //设置按钮状态
    SetButtonState(state){
        this.btnAgain.node.active=state;
    },
    //设置得分
    SetScore(score){
        this.labScore.string="Score:"+score.toString();
    },

    //返回entry
    BackEntryScene(){
        this.allClassQuote.gameMgr.BackEntryScene();
    }
});
