/**
 * Created by kuyu2 on 2017/6/3.
 */
require('../lib/css/weui.min.css')
require('../lib/css/jquery-weui.min.css')
require('../lib/js/jquery-weui.min.js')
require('../css/wxMobile.css')
var urlPrl = 'http://' + window.location.host;
var logo_img = '';
if (urlPrl == 'http://localhost:8081'||urlPrl == 'http://localhost:8080') {
    urlPrl = 'http://wx.szcoolfish.com'
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return "";
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
//
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
var zhexianTu = function (data, lib,sort) {
    var lib1 = [], lib2 = [];
    lib = lib || {};
    for (var i in data) {
        a = lib[i] || i;
        if(sort==true){
            lib1.push(a);
            lib2.push(data[i])
        }else{
            lib1.unshift(a);
            lib2.unshift(data[i])
        }
    }
    return [lib1, lib2]
};
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function initMenu() {
    var path = location.pathname.split(".html")[0].split('/')
    var modName = path[path.length - 1];
    console.log(modName)
}


function initialize() {
    initMenu();
}
$(function() {
    initialize();
})
module.exports = {
    contains: contains,
    getCookie: getCookie,
    setCookie: setCookie,
    twoNum: twoNum,
    unique3: unique3,
    $post: $post,
    $postAsync: $postAsync,
    getUrlParam: getUrlParam,
    $getAsync: $getAsync,
    $get: $get,
    unique3: unique3,
    accDiv: accDiv,
    accMul: accMul,
    accAdd: accAdd,
    accSub: accSub,
    urlPrl: urlPrl,
    zhexianTu:zhexianTu
}