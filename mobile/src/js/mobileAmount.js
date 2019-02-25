var c = require('./index.js');
require('transparency');
var card = $("#sstmobile"),
    cardval;
$(document.body).pullToRefresh().on("pull-to-refresh", function() {
    cardval = card.val() ? card.val() : 0;
    c.$post("?r=wms/agent/get-card-money", {
        card: cardval
    }, function(res) {
        $(document.body).pullToRefreshDone();
        if (res.code == 1) {
            $.toptip(res.msg, 'success');
            $(".amount").text("余额");
            if (res.data != []) {
                $('#template').render(res).removeClass('hidden');
            }
        } else {
            $.toptip(res.msg, 'error');
        }
    }, function() {
        $(document.body).pullToRefreshDone();
        $.toptip('操作失败', 'error');
    })
});
$("#sec").click(function() {
    cardval = card.val() ? card.val() : 0;
    $.showLoading();
    c.$post("?r=wms/agent/get-card-money", {
        card: cardval
    }, function(res) {
        if (res.code == 1) {
            $.toptip(res.msg, 'success');
            $(".amount").text("余额");
            $('#template').render(res).removeClass('hidden');
            c.$post("?r=wms/agent/get-card-account", {
                card: cardval
            }, function(res) {
                if (res.code == 1) {
                    $.hideLoading();
                    $('#list').render(res.data);
                    if (!res.data.length) {
                        $('#list').hide()
                    }
                } else {
                    $.hideLoading();
                    $('#list').hide()
                }
            }, function() {
                $.hideLoading();
                $.toptip('操作失败', 'error');
            })
        } else {
            $.hideLoading();
            $.toptip(res.msg, 'error');
        }
    }, function() {
        $.hideLoading();
        $.toptip("操作失败", 'error');
    })
});