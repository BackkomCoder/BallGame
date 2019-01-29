cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        this.allClassQuote=cc.find("/GameMgr/AllClassQuote").getComponent("AllClassQuote");
    },

    PostDataToWX(){
        let _self=this;
        var kvDateList=new Array();
        kvDateList.push({
            key:"score",
            value:String(_self.allClassQuote.gameMgr.GetPlayerScore()),
        });
        wx.setUserCloudStorage({
            KVDataList:kvDateList,
            success(){
                console.log("wx.setUserCloudstorage success:"+kvDateList[0].value);
                _self.OpenDataContext("ShowRankPanel");
            },
            fail(){
                console.log("wx.setUserCloudstorage fail:")
            }
        });
    },
    OpenDataContext(message){
        console.log("OpenDataContext:"+message);
        var openDataContext=wx.getOpenDataContext();
        openDataContext.postMessage({
            text:message,
        });
    }
    // update (dt) {},
});
