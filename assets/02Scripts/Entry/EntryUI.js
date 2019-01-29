cc.Class({
    extends: cc.Component,

    properties: {
        wxContent:cc.Node,
        loadProgressBar:cc.Node,
        loadProgressBarSprite:cc.Sprite,
        selectedScenePanel:cc.Node,
    },

    // onLoad () {},

    start () {
        wx.showShareMenu({
            withShareTicket: true
          })
    }, 

    // update (dt) {
    //     this.loadProgressBarSprite.fillRange+=dt;
    // },
    ShareGame(){
        wx.shareAppMessage({
            title: '快来和我一起打游戏吧！！！',
            imageUrl: canvas.toTempFilePathSync({
              destWidth: 500,
              destHeight: 400
            })
          });
    },
    StartGame(){
        let _self=this;
        _self.loadProgressBar.active=true;
        cc.director.preloadScene("Game",
        (completedCount,totalCount,item)=>{
            _self.loadProgressBarSprite.fillRange=completedCount/totalCount;
            //console.log(_self.loadProgressBar.progress);
        },(error)=>{
            if(error==null){
                setTimeout(() => {
                    cc.director.loadScene("Game");
                }, 0.5);
            }else{
                console.log("error:"+error);
            }
        })
    },
    SetRankPanelState(){
        if(this.wxContent.active==false){
            this.wxContent.active=true;
            this.OpenDataContext("ShowRankPanel");
        }else{
            this.wxContent.active=false;
            this.OpenDataContext("HideRankPanel");
        }
    },
    SetScenePanelState(){
        if(this.selectedScenePanel.active==false){
            this.selectedScenePanel.active=true;
        }else{
            this.selectedScenePanel.active=false;
        }
    },
    OpenDataContext(message){
        console.log("OpenDataContext:"+message);
        var openDataContext=wx.getOpenDataContext();
        openDataContext.postMessage({
            text:message,
        });
    }
});
