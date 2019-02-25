var c = require('./index');
require('transparency');
require('./jquery.cookie');
// import '../css/fonticon.css';
require ('../css/fonticon.css');
var logo_simple = require('../img/logo_simple.png')
var Xlogo = require('../img/Xlogo.png')
var baixun = require('../img/logo_baixun.png')
// var jquery_weui = require('./jquery-weui.min.js')
var id = c.getUrlParam('id')
if (window.location.search.indexOf("code") == -1) {
    // 转授权链接
    c.$post('?r=home/setting/change-url', {
        url: document.location.href,
        id: id
    }, function(res) {
        if (res.code == 0) {
            return
        }
        // window.location.href = res.data.url
    });
}
var id = c.getUrlParam('id'),
    aid = c.getUrlParam('aid'),
    cardNo, kahao = c.getUrlParam("kahao"),
    card_status, flag = 0;
sessionStorage.setItem("id", id);
sessionStorage.setItem("aid", aid);
sessionStorage.setItem("atype", null);
//解析cookie，渲染到历史
function listLoad() {
    if ($.cookie('kahao')) {
        list = $.cookie('kahao').split(",");
        obj = [];
        for (i in list) {
            if (i < list.length) {
                obj.push({
                    card: list[i]
                });
            }
        }
        $('.list').render(obj);
    }
}

function load(res) {
    if (aid) {
        if (res.data.fid != aid) {
            $.toptip('该卡不在系统内', 2000, 'error');
            $.hideLoading();
            return false
        }
    } else {
        if (res.data.fid == 125 && res.data.operatorid == 147) {
            $.toptip('该卡不在系统内', 2000, 'error');
            $.hideLoading();
            return false
        }
    }
    if (res.data.card_status == 1) {
        card_status = '待激活'
    }
    if (res.data.card_status == 2) {
        card_status = '正常'
    }
    if (res.data.card_status == 3) {
        card_status = '单向停机'
    }
    if (res.data.card_status == 4) {
        card_status = '停机'
    }
    if (res.data.card_status == 5) {
        card_status = '预销号'
    }
    if (res.data.card_status == 6) {
        card_status = '销号'
    }
    if (res.data.card_status == 7) {
        card_status = '过户'
    }
    if (res.data.card_status == 8) {
        card_status = '休眠'
    }
    if (res.data.card_status == 9) {
        card_status = '未知状态'
    }
    if (res.data.card_status == 0) {
        card_status = '未知状态'
    }
    sessionStorage.setItem("fid", res.data.fid);
    sessionStorage.setItem("sid", res.data.sid);
    sessionStorage.setItem("tid", res.data.tid);
    sessionStorage.setItem("cardid", res.data.id);
    sessionStorage.setItem("type", res.data.type);
    sessionStorage.setItem("iccid", res.data.iccid);
    sessionStorage.setItem("packageid", res.data.packageid);
    sessionStorage.setItem("amount", res.data.amount);
    sessionStorage.setItem("card_status", card_status);
    sessionStorage.setItem("card_type", res.data.card_type);
    sessionStorage.setItem("operatorid", res.data.operatorid);
    sessionStorage.setItem("operator_type", res.data.operator_type);
    sessionStorage.setItem("status", res.data.real_status);
    if (res.data.amount) {
        if (!res.data.password) {
            if (res.data.real_status == 2) {
                //有余额没密码已经实名
                $.confirm("你查询的卡还没修改余额密码，请先去修改余额密码", function() {
                    location.href = 'password.html?';
                }, function() {
                    location.href = 'home.html?v2.1';
                });
                $.hideLoading();
                return
            }
        }
    }
    c.$get('?r=wms/personal/get-celebrity', function(res) {
        $.hideLoading();
        if (res.code == 1) {
            if (res.data.status == 3) {
                sessionStorage.setItem("real_status", '认证失败');
                $.confirm("你查询的卡认证失败，请去实名认证", function() {
                    location.href = 'register.html?';
                }, function() {
                    location.href = 'home.html?v2.1';
                });
            }
            if (res.data.status == 2) {
                sessionStorage.setItem("real_status", '已认证');
                location.href = 'home.html?v2.1';
            }
            if (res.data.status == 1) {
                sessionStorage.setItem("real_status", '认证中');
                location.href = 'home.html?v2.1';
            }
        } else if (res.code == 0) {
            if (sessionStorage.getItem('status') == 2) {
                sessionStorage.setItem("real_status", '已认证');
                location.href = 'home.html?v2.1';
            } else {
                sessionStorage.setItem("real_status", '未认证');
                $.confirm("你查询的卡还未实名认证，请去实名认证", function() {
                    location.href = 'register.html?';
                }, function() {
                    location.href = 'home.html?v2.1';
                });
            }
        }
    });
}
listLoad();
//渲染不同id的logo
if (aid) {
    if (aid == 125) {
        $("#bindCardPage").addClass("lyz").removeClass('kuyu');
        $("#bindCard").addClass("lyz")
    }
    $("#logo_img").attr("src", logo_simple).addClass('otherImg')
} else {
    if (id == 50) {
        $("#logo_img").attr("src", Xlogo).addClass('Xlogo')
    } else if (id == 51) {
        $("#logo_img").attr("src", baixun).addClass('baixun')
    } else if (id == 52) {
        $("#logo_img").remove();
        $(".logo").prepend('<div class="icon-qiehuan llgt"></div><div class="llgt_title">流量沟通100</div> ')
    } else {
        $("#logo_img").attr("src", Xlogo).addClass('Xlogo')
    }
}
/** 加载过程中事件 **/
//配置jssdk
c.$post('?r=home/setting/get-jsapi-conf', {
    uid: id,
    url: document.location.href
}, function(res) {
    if (res.code == 0) {
        return
    }
    wx.config({
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名，见附录1
        jsApiList: ["scanQRCode", 'onMenuShareQZone', //分享到QZone
            'onMenuShareWeibo', //分享到微博
            'onMenuShareQQ', //分享到QQ
            'onMenuShareAppMessage', //分享到朋友
            'onMenuShareTimeline'
        ] //分享给朋友圈]           // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
});
//监视手机do按键
$("#card_no").keydown(function(event) {
    if (event.which === 13) {
        $("#bindCard").click();
        document.activeElement.blur();
        $(".FuzzySearch").hide();
    }
    if (event.which !== null) {
        $(".FuzzySearch").hide();
    }
});
/** 加载后事件 **/
$(function() {
    $('#card_no').on({
        click: function() {
            if ($.cookie('kahao')) {
                $(".FuzzySearch").show();
            }
        }
    });
    $('ul').on("click", "li", function() {
        var liValue = $(this).text();
        $("#card_no").val(liValue);
        $(".FuzzySearch").hide();
    });
    // 查询按钮点击
    $("#bindCard").click(function() {
        cardNo = $.trim($("#card_no").val());
        if (!cardNo) {
            $.toptip('请输入流量卡号', 2000, 'error');
            return false;
        } else {
            if (flag == 1) {
                $.toptip('查询中...', 2000, 'success');
                return
            }
            $.showLoading();
            $(".weui-toast_content").text("查询中...");
            flag = 1;
            $("#bindCard").val('查询中...');
            var arr = [],
                cookArr = [];
            if ($.cookie('kahao')) {
                cookArr = $.cookie('kahao').split(",");
            }
            arr.push(cardNo);
            var b = arr.concat(cookArr);
            if (c.unique3(b).length > 5) {
                b.pop()
            }
            $.cookie('kahao', c.unique3(b));
            sessionStorage.setItem("cardNo", cardNo);
            c.$post('?r=wms/personal/card-bind', {
                card: cardNo,
                uid: id,
                code: c.getUrlParam("code")
            }, function(res) {
                if (res.code == 1) {
                    if (id == res.data.uid) {
                        load(res)
                    } else {
                        c.$get('?r=wms/personal/get-card', function(res) {
                            if (res.code == 0) {
                                $.hideLoading();
                                $.toptip(res.msg, 2000, 'error');
                            } else {
                                load(res)
                            }
                        });
                    }
                    flag = 0;
                } else {
                    flag = 0;
                    window.location.href = "http://wx.kuyichong.com/index.php?g=Wap&m=WeChat&a=seacher&token=745115f2653a9bf8ea4e6ee251a0ee60&cardNo=" + cardNo;
                    // window.open("http://wx.kuyichong.com/index.php?g=Wap&m=WeChat&a=seacher&token=745115f2653a9bf8ea4e6ee251a0ee60&cardNo=" + cardNo,'_self')
                }
                $("#bindCard").val('查询');
            });
        }
    });
    // 扫描按钮点击
    $("#scanQRCode").click(function() {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                result = result.substring(result.indexOf(',') + 1);
                $('#card_no').val(result);
                $("#bindCard").click()
            }
        });
    })
});

function initialize(params) {
    if (__DEV__) {
        // console.log(params);
    }
}
module.exports = {
    init: initialize
}