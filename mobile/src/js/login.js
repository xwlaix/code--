var c = require("./index.js")
require('../css/wxLogin.css')
$("#account").val(c.getCookie("kuyuname"));
$("#pwd").val(c.getCookie("kuyupsw"));
function $get(url, reback, error) {
    $.ajax({
        url: url,
        type: 'get',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}
//加载验证码
$get(c.urlPrl +'?r=sms/get-captcha', function(res) {
    if (res.code == 1) {
        $('.login_yzm').append(res.data.img);
        var url = c.urlPrl + $("#w0-image").attr('src');
        $("#w0-image").attr('src', url)
    } else {
        $.toptip(res.msg, 'error');
    }
});
//点击刷新验证码
$('.login_yzm').on('click', 'img', function() {
    url = $("#w0-image").attr('src') + '&refresh';
    $get(url, function(res) {
        $("#w0-image").attr('src', c.urlPrl + res.url);
    })
});
$(document).ready(function() {
    //点击登陆判断
    $("#conf").on('click', function() {
        var name = $.trim($("#account").val()),
            password = $.trim($("#pwd").val()),
            captcha = $.trim($("#yzm").val()),
            urls = "?r=sms/login",
            res = {
                username: name,
                password: password,
                captcha: captcha
            };
        if (!name) {
            $.toptip('请输入账号', 'error');
            return false
        }
        if (!password) {
            $.toptip('请输入密码', 'error');
            return false
        }
        if (!captcha) {
            $.toptip('请输入验证码', 'error');
            return false
        }
        c.$post(urls, res, function(res) {
            if (res.code == 1) {
                //登录成功
                $.toptip(res.msg,2000, 'success');
                c.setCookie('kuyuname', name);
                c.setCookie('kuyupsw', password);
                window.location.href = 'agent.html';
            } else {
                $("#yzm").val("");
                url = $("#w0-image").attr('src') + '&refresh';
                $get(url, function(res) {
                    $("#w0-image").attr('src', c.urlPrl + res.url);
                });
                if (!res.msg.password) {
                    $.toptip(res.msg.captcha, 'error');
                    return false
                } else if (res.msg.password) {
                    $.toptip(res.msg.password, 'error');
                } else {
                    $.toptip("登录失败", 'error');
                }
            }
        }, function() {
            $.toptip("登录失败", 'error');
            url = $("#w0-image").attr('src') + '&refresh';
            $get(url, function(res) {
                $("#w0-image").attr('src', c.urlPrl + res.url);
            });
            $("#yzm").val('');
        });
    });
    //      回车键登录
    $(document).keydown(function(e) {
        if (e.keyCode === 13) {
            $("#conf").click()
        }
    })
})