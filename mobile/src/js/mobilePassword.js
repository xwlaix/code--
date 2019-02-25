var c = require('./index.js');
var $change = $("#change");
$change.click(function() {
    var oldpsw = $("#oldpsw").val(),
        newpsw1 = $("#newpsw1").val(),
        newpsw2 = $("#newpsw2").val();
    if (!oldpsw) {
        $.toptip('请输入的旧密码', 2000, 'error');
        return
    }
    if (newpsw1 == newpsw2) {
        c.$post("?r=wms/agent/update-agent-data", {
            password: newpsw2,
            opassword: oldpsw
        }, function(res) {
            if (res.code == 1) {
                $.toast("操作成功");
            } else {
                $.toptip(res.msg, 'error');
            }
        }, function() {
            $.hideLoading();
            $.toptip('操作失败', 'error');
        })
    } else {
        $.toptip('两次输入的密码不一致', 2000, 'error');
    }
})