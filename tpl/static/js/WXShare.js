//图片上传类名.wx_pic
var img = 'http://' + window.location.host+'/coolfish/tpl/static/img/logo.jpg'
// var url= "http://tw.kuyichong.com/?r=home/setting/get-jsapi-conf";
// $.ajax({
//     url: url,
//     type: 'POST',
//     data: {
//         uid: 36,
//         url: document.location.href
//     },
//     crossDomain: true,
//     xhrFields: {
//         withCredentials: true
//     },
//     success: function (res) {
//         wx.config({
//             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//             appId: res.data.appId, // 必填，公众号的唯一标识
//             timestamp: res.data.timestamp, // 必填，生成签名的时间戳
//             nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
//             signature: res.data.signature,// 必填，签名，见附录1
//             jsApiList: [
//                 'showAllNonBaseMenuItem',//显示所有被隐藏的非基本菜单项
//                 'hideAllNonBaseMenuItem',//隐藏所有非基本菜单项
//                 'showMenuItems',         //批量显示菜单项
//                 'hideMenuItems',         //批量隐藏菜单项
//                 'showOptionMenu',        //显示右上角菜单
//                 'hideOptionMenu',        //隐藏右上角菜单
//                 'onMenuShareQZone',      //分享到QZone
//                 'onMenuShareWeibo',      //分享到微博
//                 'onMenuShareQQ',         //分享到QQ
//                 'onMenuShareAppMessage', //分享到朋友
//                 'onMenuShareTimeline'    //分享给朋友圈
//             ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//         });
//     }
// });

wx.error(function (res) {
    alert(res.errMsg);
});
wx.ready(function () {
    // 2. 分享接口
    // 2.1 监听“分享给朋友圈”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
        title: document.title, // 分享标题
        link: document.location.href, // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    // 2.2 监听“分享到朋友”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: document.location.href, // 分享链接
        imgUrl: img, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: document.location.href, // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: document.location.href, // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
    wx.onMenuShareQZone({
        title: document.title, // 分享标题
        desc: document.title, // 分享描述
        link: document.location.href, // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

//
// // 8 界面操作接口
//     // 8.1 隐藏右上角菜单
//     wx.hideOptionMenu();
// // 8.2 显示右上角菜单
//     wx.showOptionMenu();
// // 8.3 批量隐藏菜单项
//     wx.hideMenuItems({
//         menuList: [
//             'menuItem:readMode', // 阅读模式
//             'menuItem:share:timeline', // 分享到朋友圈
//             'menuItem:copyUrl' // 复制链接
//         ],
//         success: function (res) {
//
//         },
//         fail: function (res) {
//
//         }
//     });
//
//     // 8.4 批量显示菜单项
//     wx.showMenuItems({
//         menuList: [
//             'menuItem:readMode', // 阅读模式
//             'menuItem:share:timeline', // 分享到朋友圈
//             'menuItem:copyUrl' // 复制链接
//         ],
//         success: function (res) {
//         },
//         fail: function (res) {
//         }
//     });
// // 8.5 隐藏所有非基本菜单项
//     wx.hideAllNonBaseMenuItem({
//         success: function () {
//         }
//     });
// // 8.6 显示所有被隐藏的非基本菜单项
//     wx.showAllNonBaseMenuItem({
//         success: function () {
//         }
//     });
})