/**
 * Created by kuyu2 on 2017/6/3.
 */
var urlPrl = 'http://' + window.location.host;
var logo_img = '';
if(urlPrl=='http://localhost:8081'){
    urlPrl='http://wx.szcoolfish.com'
    // urlPrl='http://mini.35.net'
    // urlPrl='http://tw.kuyichong.com'
    // urlPrl='http://wf.kuyichong.com/'
    // urlPrl='http://tw.szcoolfish.com'

}
if(urlPrl == 'http://wx.m2m-10086.cn'){
    console.log(1)
}
var getUrl = function (module, args) {
    return "?r=" + module;
};
$(".TotalContentBox").siblings().hide();
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
function $postAsync(url, data, reback,error) {
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
    return null; //返回参数值
}
function GetUrlParam(url,paraName) {
    var urlDecode = decodeURIComponent(url).toString();
    var arrObj = urlDecode.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
    }
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
Array.prototype.unique3 = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//删除
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//删除cookie中所有定变量函数
    function clearCookies() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
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
$(function () {
    FastClick.attach(document.body);
});
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// $(function () {
//     var isPageHide = false;
//     window.addEventListener('pageshow', function () {
//         if (isPageHide) {
//             window.location.reload();
//         }
//     });
//     window.addEventListener('pagehide', function () {
//         isPageHide = true;
//     });
// });
function psw() {
    if(amount<=0.00){return false}
    if(sessionStorage.getItem(iccid)!="true"){
        $.prompt({
            title: '密码认证',
            text: '为保障用户余额安全，余额订购套餐需输入卡片密码',
            autoClose:false,
            onOK: function (input) {
                if(!input){$.toptip("请输入密码", 2000, 'error');return false}
                $post('?r=wms/personal/validate-password', {password:input},function (res) {
                    if(res.code==0){
                        $.toptip("密码错误", 2000, 'error');
                        psw()
                    }else {
                        sessionStorage.setItem(iccid, "true");
                        $.toptip(res.msg, 2000, 'success');
                    }
                })
            },
            onCancel: function () {
                window.location.href = 'password.html'
            }
        });
        $("#weui-prompt-input").attr('placeholder','请输入密码');
        $(".weui-dialog__btn.default").text("忘记密码");
        $(".weui-dialog__btn.primary").on('click',function(){
            if(!$("#weui-prompt-input").val()){
                $.toptip("请输入密码", 2000, 'error');
                return false
            }else {
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
function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg){
    return accDiv(this, arg);
};
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
//给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg){
    return accMul(arg, this);
};
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg){
    return accAdd(arg,this);
}
//减法函数
function accSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg2*m-arg1*m)/m).toFixed(n);
}
///给number类增加一个sub方法，调用起来更加方便
Number.prototype.sub = function (arg){
    return twoNum(accSub(arg,this));
};
function twoNum(num){
    num = Math.round(num*100)/100;
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
//
// $post("http://tw.kuyichong.com/?r=home/setting/get-jsapi-conf",
//     {uid: 36,url: document.location.href},
//     function (res) {
//         wx.config({
//             debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//             appId: res.data.appId, // 必填，公众号的唯一标识
//             timestamp: res.data.timestamp, // 必填，生成签名的时间戳
//             nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
//             signature: res.data.signature,// 必填，签名，见附录1
//             jsApiList: [
//                 'hideAllNonBaseMenuItem'
//             ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//         });
//     }
// );

// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
// var useragent = navigator.userAgent;
// if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
//     // 这里警告框会阻塞当前页面继续加载
//     alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
//     // 以下代码是用javascript强行关闭当前页面
//     var opened = window.open('about:blank', '_self');
//     opened.opener = null;
//     opened.close();
// }
