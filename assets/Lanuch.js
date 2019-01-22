cc.Class({
    extends: cc.Component,

    properties: {
        userBlock: cc.Node
    },

    // onLoad () {},

    start () {
    }
});
        // let systemInfo =  wx.getSystemInfoSync();
        // let width = systemInfo.windowWidth;
        // let height = systemInfo.windowHeight;
        // let button = wx.createUserInfoButton({
        //     type: 'text',
        //     text: '获取用户信息',
        //     style: {
        //         left: width * 0.33,
        //         top: height * 0.81,
        //         width: width * 0.13,
        //         height: height * 0.1,
        //         lineHeight: 40,
        //         backgroundColor: '#eeeeee',
        //         color: '#000000',
        //         textAlign: 'center',
        //         fontSize: 10,
        //         borderRadius: 3
        //     }
        // });

        // let userInfo = null;
        // let _self = this;
        // button.onTap((res) => {
        //     if (userInfo) return;
        //     switch(res.errMsg) {
        //         case 'getUserInfo:ok': 
        //             userInfo = res.userInfo;
        //             let nickName = userInfo.nickName;
        //             let avatarUrl = userInfo.avatarUrl;
        //             _self.setUserConfig(nickName, avatarUrl);

        //             wx.getOpenDataContext().postMessage({
        //                 message: "User info get success."    
        //             });
        //         default:
        //            // this.setTips(res.errMsg);
        //             break;
        //     }
        // });
    //},
    // setUserConfig (nickName, avatarUrl) {
    //     let userAvatarSprite = this.userBlock.getChildByName('New Sprite').getComponent(cc.Sprite);
    //     let nickNameLabel = this.userBlock.getChildByName('New Label').getComponent(cc.Label);

    //     nickNameLabel.string = nickName;
    //     cc.loader.load({
    //         url: avatarUrl,
    //         type: 'png'
    //     }, (err, texture) => {
    //         if (err) console.error(err);
    //         userAvatarSprite.spriteFrame = new cc.SpriteFrame(texture);
    //     });
    // },
