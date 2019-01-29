cc.Class({
    extends: cc.Component,
 
    properties:()=>({
        uiMgr:{
            type:require("UIMgr"),
            default:null,
        },
        gameMgr:{
            type:require("GameMgr"),
            default:null,
        },
        cameraVibrate:{ 
            type:require("CameraVibrate"),
            default:null, 
        },
        player:{
            type:require("Player"), 
            default:null,
        },
        getWXOpenData:{
            type:require("GetWXOpenData"), 
            default:null,
        },
    }),
});
