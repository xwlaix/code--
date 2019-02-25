/**
 * Created by kuyu2 on 2017/6/3.
 */
require('../css/index.css')
require('../css/jquery-weui.min.css')
require('../css/weui.min.css')


require('./jquery-weui.min.js')
require('weixin-js-sdk')
var urlPrl = 'http://' + window.location.host;
var logo_img = '';
if (urlPrl == 'http://localhost:8080') {
    urlPrl = 'http://tw.kuyichong.com'
}
function $post(url, data, reback, error) {
    $.ajax({
        url: urlPrl + url,
        data: data,
        type: 'post',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}

function $postAsync(url, data, reback, error) {
    $.ajax({
        url: urlPrl + url,
        type: 'POST',
        data: data,
        async: false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}

function getUrlParam(module) {
    var reg = new RegExp("(^|&)" + module + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return (r[2]);
    return ''; //返回参数值
}

function $getAsync(url, reback, error) {
    $.ajax({
        url: urlPrl + url,
        type: 'get',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}

function $get(url, reback, error) {
    $.ajax({
        url: urlPrl + url,
        type: 'get',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}
function unique3(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}

function psw() {
    if (amount <= 0.00) {
        return false
    }
    if (sessionStorage.getItem(iccid) != "true") {
        $.prompt({
            title: '密码认证',
            text: '为保障用户余额安全，余额订购套餐需输入卡片密码',
            autoClose: false,
            onOK: function(input) {
                if (!input) {
                    $.toptip("请输入密码", 2000, 'error');
                    return false
                }
                $post('?r=wms/personal/validate-password', {
                    password: input
                }, function(res) {
                    if (res.code == 0) {
                        $.toptip("密码错误", 2000, 'error');
                        psw()
                    } else {
                        sessionStorage.setItem(iccid, "true");
                        $.toptip(res.msg, 2000, 'success');
                    }
                })
            },
            onCancel: function() {
                window.location.href = 'password.html'
            }
        });
        $("#weui-prompt-input").attr('placeholder', '请输入密码');
        $(".weui-dialog__btn.default").text("忘记密码");
        $(".weui-dialog__btn.primary").on('click', function() {
            if (!$("#weui-prompt-input").val()) {
                $.toptip("请输入密码", 2000, 'error');
                return false
            } else {
                $.showLoading();
                setTimeout(function() {
                    $.hideLoading();
                }, 1000)
            }
        })
    }
}
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
//减法函数
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
}

function twoNum(num) {
    num = Math.round(num * 100) / 100;
    var str = num.toString();
    var rs = str.indexOf('.');
    if (rs < 0) {
        rs = str.length;
        str += '.';
    }
    while (str.length <= rs + 2) {
        str += '0';
    }
}

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
var pageDatas = {
    params: {}, // params
    defaultRoute: 'home' // default Route
};

function initMenu() {
    /// <summary>
    /// init menu
    /// </summary>
    var path = location.pathname.split(".html")[0].split('/')
    var modName = path[path.length - 1];
    modName = modName || pageDatas.defaultRoute;
    loadJs(modName);
}

function loadJs(jsPath) {
    /// <summary>
    /// load js mod
    /// </summary>
    /// <param name="jsPath" type="type">js path</param>
    var currentMod;
    if (jsPath === './hrm') {
        require.ensure([], function(require) {
            currentMod = require('./hrm');
            currentMod.init(pageDatas.params);
        }, 'hrm');
    } else if (jsPath === 'bindCard') {
        require.ensure([], function(require) {
            currentMod = require('./bindCard');
            currentMod.init(pageDatas.params);
        }, 'bindCard');
    } else if (jsPath === './menu1') {
        require.ensure([], function(require) {
            currentMod = require('./menu1');
            currentMod.init(pageDatas.params);
        }, 'menu1');
    } else if (jsPath === './menu2') {
        require.ensure([], function(require) {
            currentMod = require('./menu2');
            currentMod.init(pageDatas.params);
        }, 'menu2');
    } else if (jsPath === './menu3') {
        require.ensure([], function(require) {
            currentMod = require('./menu3');
            currentMod.init(pageDatas.params);
        }, 'menu3');
    } else if (jsPath === './menu5') {
        require.ensure([], function(require) {
            currentMod = require('./menu5');
            currentMod.init(pageDatas.params);
        }, 'menu5');
    } else if (jsPath === './menu6') {
        require.ensure([], function(require) {
            currentMod = require('./menu6');
            currentMod.init(pageDatas.params);
        }, 'menu6');
    } else {
        if (__DEV__) {
            console.log('no request mod');
        }
    }
}

function initialize() {
    initMenu();
}
$(function() {
    initialize();
})

module.exports = {
    contains:contains,
    unique3:unique3,
    $post:$post,
    getUrlParam:getUrlParam
}