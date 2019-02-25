var c = require('./index.js');
require('transparency');
var sec = $("#sec"),
    detail = $(".detail");
sec.click(function() {
    var phone = $("#phone").val();
    var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!reg.test($.trim(phone))) {
        $.toptip('手机号码格式不对!', 1000, 'error');
        return false;
    }
    if (phone) {
        c.$post("?r=wms/agent/get-all-agent", {
            phone: phone
        }, function(res) {
            if (res.code == 1) {
                if (res.data.length) {
                    $.toast("操作成功");
                    $(".rows").render(res.data, {
                        detail: {
                            "data-value": function() {
                                return this.id
                            }
                        },
                        name: {
                            "data-value": function() {
                                return this.id
                            }
                        },
                        phone: {
                            "data-value": function() {
                                return this.id
                            }
                        },
                    });
                    $("#detail").removeClass("hidden")
                } else {
                    $.toptip('操作失败!', 1000, 'error');
                }
            } else {
                $.toptip('操作失败', 1000, 'error');
            }
        }, function() {
            $.hideLoading();
            $.toptip('操作失败', 'error');
        })
    } else {
        $.toptip('请输入的手机号码', 2000, 'error');
    }
});
$('.rows').on("click", detail, function(e) {
    var id = $(e.target).data("value");
    location.href = 'mobileUpdateDetail.html?id=' + id;
})