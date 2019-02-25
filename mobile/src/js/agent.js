// <link rel="stylesheet" href="../../static/css/common.css">
// <link rel="stylesheet" href="../../common/css/accordion.css">
require("../css/accordion.css");
require("../css/common.css");
require('../../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('../../node_modules/bootstrap-table/dist/bootstrap-table.css')
var c = require('./index')
require('bootstrap')
require('bootstrap-table')
require('../../node_modules/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js')

function ajaxRequest(params) {
    c.$get("?r=sms/agent/get-all", function(res) {
        params.success({
            data: res.data
        });
    }, function() {
        params.success({
            data: []
        })
    })
}
window.operateEvents = {
    //充值
    'click #btn_recharge': function(e, value, row, index) {
        var id = row.id,
            Data = {
                aid: id,
                type: 1,
                amount: ''
            };
        $.prompt({
            title: '充值',
            empty: false, // 是否允许为空
            onOK: function(input) {
                Data.amount = +input;
                c.$post("?r=sms/agent/account/add", Data, function(res) {
                    if (res.code == 1) {
                        $("#tb_dept").bootstrapTable("refresh")
                        $.toptip(res.msg, 'success');
                    } else {
                        $.toptip(res.msg, 'error');
                    }
                })
            }
        });
    }
};
$("#tb_dept").bootstrapTable({
    search: true,
    searchAlign: 'center',
    ajax: ajaxRequest,
    sortable: true,
    sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
    pagination: true, //是否显示分页（*）
    pageNumber: 1, //初始化加载第一页，默认第一页
    pageSize: 10, //每页的记录行数（*）
    pageList: [10, 25, 50, 100],
    columns: [{
        field: 'name',
        title: '代理商名称',
        sortable: true
    }, {
        field: 'amount',
        title: '剩余佣金(元)',
        sortable: true
    }, {
        field: 'money',
        title: '账户余额(元)',
        sortable: true
    }, {
        field: 'operate',
        title: '操作',
        align: 'center',
        events: operateEvents,
        formatter: function operateFormatter(value, row, index) {
            return ['<button id="btn_recharge" type="button" class="btn btn-sm btn-success">' + '<span class=" " aria-hidden="true"></span>充值' + '</button>'].join('');
        }
    }]
});