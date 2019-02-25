require('../css/wxLogin.css')
var c = require('./index.js');
sessionStorage.setItem('id', c.getUrlParam('id'))
/** 有跳转性质的，写在页面加载之前 **/
if (window.location.search.indexOf("code") == -1) {
    // 转授权链接
    c.$post('?r=home/setting/change-url', {
        url: document.location.href,
        id: c.getUrlParam('id')
    }, function (res) {
        if (res.code == 0) {
            return
        }
        window.location.href = res.data.url
    });
}
$("#username").val(c.getCookie("dls_name"));
$("#password").val(c.getCookie("dls_psw"));
$('#conf').click(function () {
    var username = $("#username").val(),
        password = $("#password").val();
    if (!username) {
        $.toptip('请输入账号', 'error');
        return false
    }
    if (!password) {
        $.toptip('请输入密码', 'error');
        return false
    }
    c.$post("?r=wms/agent/login", {
            username: username,
            password: password,
            code: c.getUrlParam('code'),
            uid: c.getUrlParam('id')
        },
        function (res) {
            if (res.code == 1) {
                $.toptip(res.msg, 2000, 'success');
                location.href = "mobileHome.html";
                $("#conf").text('登陆');
                c.setCookie('dls_name', username);
                c.setCookie('dls_psw', password);
            } else {
                if (res.msg) {
                    $.toptip(res.msg, 2000, 'error');
                } else if (res.msg.password[0]) {
                    $.toptip(res.msg.password[0], 2000, 'error');
                } else if (res.msg.username[0]) {
                    $.toptip(res.msg.username[0], 2000, 'error');
                }
                $("#conf").text('登陆');
            }
        });
})