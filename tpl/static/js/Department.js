var urlPrefix = 'http://' + window.location.host;
var urlOperator = 'http://tw.kuyichong.com';
if (urlPrefix == 'http://localhost:8081') {
    urlPrefix = 'http://wx.szcoolfish.com'
    // urlPrefix='http://mini.35.net'

    // urlPrefix='http://tw.szcoolfish.com'
    // urlPrefix='http://tw.kuyichong.com'
    // urlPrefix='http://wf.kuyichong.com'
}

function ToSize(a,b) {
    if(b=='M'){
        var d = [" MB", " GB", " TB", " PB"];
        var e = 1024;
        for(var b = 0; b < d.length; b++) {
            if(Math.abs(a) < e) {
                return(b == 0 ? a : a.toFixed(2)) + d[b]
            }
            a /= e
        }
    }else{
        var d = [" KB", " MB", " GB", " TB", " PB"];
        var e = 1024;
        for(var b = 0; b < d.length; b++) {
            if(Math.abs(a) < e) {
                return(b == 0 ? a : a.toFixed(2)) + d[b]
            }
            a /= e
        }
    }
}
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}//获取pathname
function getPathNmae(name, path) {
    var params = {};
    path = (path || location.pathname)
        .split(".html")[0] // 获取 .html 之前的部分
        .split("/"); // 分隔目录
    while (path.length) { // 从后遍历数组
        var val = path.pop(); // 得到值
        var key = path.pop(); // 得到键

        if (key) {
            params[key] = decodeURIComponent(val); // 解码存储
        }
    }

    return name ? params[name] : params; // 输出name的值或整个参数对象
}
//定义get请求和post请求
function $get(url, reback,error) {
    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: function () {
            layer.msg("请求失败", {time: 2000})
        },
        complete: function (res) {
            if (res.responseJSON.msg == '请先登陆') {
                alert("登陆超时");
                if (getPathNmae("tpl") == "main") {
                    if (getPathNmae("account") == "accLogin") {
                        window.location.href = "../../main/account/accLogin.html";
                        return false;
                    } else {
                        window.location.href = urlPrefix;
                        window.parent.location.href = urlPrefix;
                        window.parent.parent.location.href = urlPrefix;
                        return false;
                    }
                } else if (getPathNmae("tpl") == "agent") {
                    window.location.href = urlPrefix+'/go';
                    window.parent.location.href = urlPrefix+'/go';
                    window.parent.parent.location.href = urlPrefix+'/go';
                    return false;
                } else {
                    window.location.href = urlPrefix;
                    window.parent.location.href = urlPrefix;
                    window.parent.parent.location.href = urlPrefix;
                    return false;
                }
            }
        }
    })
}
function $postAsync(url, data, reback,error){
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        async : false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: function () {
            layer.msg("请求失败", {time: 2000})
        },
        complete: function (res) {
            if (res.responseJSON.msg == '请先登陆') {
                alert("登陆超时");
                if (getPathNmae("tpl") == "main") {
                    if (getPathNmae("account") == "accLogin") {
                        window.location.href = "../../main/account/accLogin.html";
                        return false;
                    } else {
                        window.location.href = urlPrefix;
                        window.parent.location.href = urlPrefix;
                        window.parent.parent.location.href = urlPrefix;
                        return false;
                    }
                } else if (getPathNmae("tpl") == "agent")  {
                    window.location.href = urlPrefix+'/go';
                    window.parent.location.href = urlPrefix+'/go';
                    window.parent.parent.location.href = urlPrefix+'/go';
                    return false;
                } else {
                    window.location.href = urlPrefix;
                    window.parent.location.href = urlPrefix;
                    window.parent.parent.location.href = urlPrefix;
                    return false;
                }
            }
        }
    })
}

function $post(url, data, reback, error) {
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: function () {
            layer.msg("请求失败", {time: 2000})
        },
        complete: function (res) {
            if (res.responseJSON.msg == '请先登陆') {
                alert("登陆超时");
                if (getPathNmae("tpl") == "main") {
                    if (getPathNmae("account") == "accLogin") {
                        window.location.href = "../../main/account/accLogin.html";
                        return false;
                    } else {
                        window.location.href = urlPrefix;
                        window.parent.location.href = urlPrefix;
                        window.parent.parent.location.href = urlPrefix;
                        return false;
                    }
                } else if (getPathNmae("tpl") == "agent")  {
                    window.location.href = urlPrefix+'/go';
                    window.parent.location.href = urlPrefix+'/go';
                    window.parent.parent.location.href = urlPrefix+'/go';
                    return false;
                } else {
                    window.location.href = urlPrefix;
                    window.parent.location.href = urlPrefix;
                    window.parent.parent.location.href = urlPrefix;
                    return false;
                }
            }
        }
    })
}
//折线图
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
//饼图
var binTu = function(data, lib,flag){
    re = [];
    lib = lib || {};
    for( i in data ){
        a = lib[i] || i;
        if(flag){
            if(lib[i]){
                re.push( {name: a, value: data[i] } )
            }
        }else{
            re.push( {name: a, value: data[i] } )
        }
    }
    return re;
};


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

//弹框
function layer_open(title, content, cancel) {
    layer.open({
        type: 2,
        title: title,
        shadeClose: true,
        anim: 2,
        shade: [0.5, 'rgb(0,0,0)'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        cancel: cancel,
        content: content,
        zIndex: layer.zIndex, //重点1
        success: function (layero) {
            layer.setTop(layero); //重点2
        }
    });
}


$(document).keydown(function (e) {
    if (e.keyCode === 13) {
        $(".keydownBtn").click()
    }
});

function getUrlParam(module) {
    var reg = new RegExp("(^|&)" + module + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return ''; //返回参数值
}
function param(param){
    var params = getUrlParam(param);
    return $("#"+param).val(params);
}
// decodeURIComponent

function options(url, temp) {
    $.ajax({
        type: "get",
        url: urlPrefix + url,
        dataType: "json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            $.each(res.data, function (i, data) {
                var parent;
                parent = $(template('parent', data));
                parent.appendTo(temp);
            })
        }
    });
}

function option(url, reback, error) {
    $.ajax({
        type: "get",
        url: urlPrefix + url,
        dataType: "json",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    });
}


function ajaxFileUpload(url, id, reback, error) {
    $.ajaxFileUpload
    (
        {
            fileElementId: id, //文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'JSON', //返回值类型 一般设置为json
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            url: urlPrefix + url,
            secureuri: false,
            success: reback,
            error: error
        }
    );
    return false;
}


/**
 * Replacement for toggle
 */
jQuery.fn.toggle = function (fn, fn2) {
    // Don't mess with animation or css toggles
    if (!jQuery.isFunction(fn) || !jQuery.isFunction(fn2)) {
        return oldToggle.apply(this, arguments);
    }
    // Save reference to arguments for access in closure
    var args = arguments,
        guid = fn.guid || jQuery.guid++,
        i = 0,
        toggler = function (event) {
            // Figure out which function to execute
            var lastToggle = ( jQuery._data(this, "lastToggle" + fn.guid) || 0 ) % i;
            jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
            // Make sure that clicks stop
            event.preventDefault();
            // and execute the function
            return args[lastToggle].apply(this, arguments) || false;
        };
    // link all the functions, so any of them can unbind this click handler
    toggler.guid = guid;
    while (i < args.length) {
        args[i++].guid = guid;
    }
    return this.click(toggler);
};
function userDate(uData){
    var myDate = new Date(uData*1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    return year + '-' + month + '-' + day;
}
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
}

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
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
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
