var c = require('./index.js');
var template = require('../lib/js/artTemplate.js');
var page = 1,
    flag = 0;
var loading = false;

function loadStatus(res) {
    if (res.data.rows[i].card_status == 1) res.data.rows[i].card_status = '待激活';
    if (res.data.rows[i].card_status == 2) res.data.rows[i].card_status = '正常';
    if (res.data.rows[i].card_status == 3) res.data.rows[i].card_status = '单向停机';
    if (res.data.rows[i].card_status == 4) res.data.rows[i].card_status = '停机';
    if (res.data.rows[i].card_status == 5) res.data.rows[i].card_status = '预销号';
    if (res.data.rows[i].card_status == 6) res.data.rows[i].card_status = '销号';
    if (res.data.rows[i].card_status == 7) res.data.rows[i].card_status = '过户';
    if (res.data.rows[i].card_status == 8) res.data.rows[i].card_status = '休眠';
    if (res.data.rows[i].card_status == 9) res.data.rows[i].card_status = '未知状态';
}
$(document.body).infinite(100);
$(document.body).infinite().on("infinite", function() {
    if (flag == 1) {
        $(document.body).destroyInfinite();
        return false
    }
    if (loading) return;
    loading = true;
    page += 1;
    c.$post("?r=wms/agent/get-count-card", {
        pageSize: 10,
        pageNumber: 1 * page
    }, function(res) {
        loading = false;
        if (res.code == 1) {
            for (i = 0; i < res.data.rows.length; i++) {
                loadStatus(res);
                res.data.rows[i].startusetime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.rows[i].startusetime)[0];
            }
            $("#rows").append($(template('normal', res.data)));
            if (res.data.total <= 10 * page) {
                flag = 1;
                $(".content").addClass('hidden');
                $(".weui-loadmore").addClass('hidden');
            }
        }
    }, function() {
        $(document.body).destroyInfinite()
    })
});
$(document.body).pullToRefresh().on("pull-to-refresh", function() {
    if (flag == 1) {
        $(document.body).pullToRefreshDone();
        return false
    }
    page += 1;
    c.$post("?r=wms/agent/get-count-card", {
        pageSize: 10,
        pageNumber: 1 * page
    }, function(res) {
        $(document.body).pullToRefreshDone();
        if (res.code == 1) {
            for (i = 0; i < res.data.rows.length; i++) {
                res.data.rows[i].startusetime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.rows[i].startusetime)[0];
                loadStatus(res)
            }
            $("#rows").append($(template('normal', res.data.rows)));
            if (res.data.total <= 10 * page) {
                flag = 1;
                $(".content").addClass('hidden');
                $(".weui-loadmore").addClass('hidden');
            }
        }
    }, function() {
        $(document.body).pullToRefreshDone();
    })
});
c.$post("?r=wms/agent/get-count-card", {
    pageSize: 10,
    pageNumber: 1
}, function(res) {
    $(".weui-loadmore").addClass('hidden');
    $(".content").removeClass('hidden');
    if (res.code == 0) {
        return false
    }
    $(".card_active").text(res.data.count);
    $(".sum").text(res.data.total);
    for (i = 0; i < res.data.rows.length; i++) {
        res.data.rows[i].startusetime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.rows[i].startusetime)[0];
        loadStatus(res)
    }
    $("#rows").append($(template('normal', res.data)));
    if (res.data.total > 10) {
        $('.status').text("加载更多");
    } else {
        flag = 1;
        $(".content").addClass('hidden');
    }
}, function() {
    $.toptip('操作失败', 'error');
})