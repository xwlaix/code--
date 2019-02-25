var c = require('./index.js');
require('transparency');

$(document.body).pullToRefresh().on("pull-to-refresh", function() {
    setTimeout(function() {
        $("#time").text(new Date);
        $(document.body).pullToRefreshDone();
    }, 2000);
});
$(".lists").addClass('hidden');
$("#sec").click(function() {
    var name = $("#sstmobile").val();
    if (!name) {
        $.toptip('请输入代理商名称', 'warning');
        return
    }
    $.showLoading();
    c.$post("?r=wms/agent/get-agent-commission", {
        name: name
    }, function(res) {
        $.hideLoading();
        if (res.code == 1) {
            $('#sum').render(res.data);
            $(".sum").text('总佣金');
            $(".rest").text('剩余佣金');
            $('#rest').render(res.data);
            $('#list').render(res.data.data);
            $(".lists").removeClass('hidden');
        } else {
            $.toptip(res.msg, 'error')
        }
    }, function() {
        $.hideLoading();
        $.toptip('操作失败', 'error');
    })
});