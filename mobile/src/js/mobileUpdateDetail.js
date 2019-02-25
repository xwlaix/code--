var c = require('./index.js');
var id = c.getUrlParam("id");
c.$post("?r=wms/agent/get-all-agent", {
    id: id
}, function(res) {
    $(".rows").render(res.data[0]);
});
var $change = $("#change");
$change.click(function() {
    var phone = $("#phone").val(),
        name = $("#name").val(),
        password = $("#psw").val();
    if (!phone) {
        $.toptip('请输入手机号码', 2000, 'error');
        return
    }
    if (!name) {
        $.toptip('请输入代理商姓名', 2000, 'error');
        return
    }
    if (!password) {
        $.toptip('请输入密码', 2000, 'error');
        return
    }
    var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!reg.test($.trim(phone))) {
        $.toptip('手机号码格式不对!', 1000, 'error');
        return false;
    }
    c.$post("?r=wms/agent/update-agent-data", {
        aid: id,
        phone: phone,
        name: name,
        password: password
    }, function(res) {
        if (res.code == 1) {
            $.toast("操作成功");
        }
    }, function() {
        $.hideLoading();
        $.toptip('操作失败', 'error');
    })
})