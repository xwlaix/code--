/**
 * Created by kuyu2 on 2017/4/17.
 */
//添加ko自定义绑定
ko.bindingHandlers.myBootstrapTable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        //这里的oParam就是绑定的viewmodel
        var oViewModel = valueAccessor();
        var $ele = $(element).bootstrapTable(oViewModel.params);
        //给viewmodel添加bootstrapTable方法
        oViewModel.bootstrapTable = function () {
            return $ele.bootstrapTable.apply($ele, arguments);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {}
};

//初始化
(function ($) {
    //向ko里面新增一个bootstrapTableViewModel方法
    ko.bootstrapTableViewModel = function (options) {
        var that = this;

        this.default = {
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            cache:false,
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            uniqueId:'id',
            exportDataType: "basic" ,             //basic', 'all', 'selected'.
            pagination: true,                   //是否显示分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            undefinedText: '',
            contentType: "application/x-www-form-urlencoded",
            ajaxOptions: {
                xhrFields: {        //跨域
                    withCredentials: true
                },
                crossDomain: true
            },
            queryParamsType: "undefined",
            responseHandler: function (res) {
                if (res.data) {
                    return res.data;
                } else {
                    return []
                }
            },
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            toolbar: '#toolbar'                //工具按钮用哪个容器
        };
        // if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ this.default.cardView=true  }

        this.params = $.extend({}, this.default, options || {});

        //得到选中的记录
        this.getSelections = function () {
            var arrRes = that.bootstrapTable("getSelections")
            return arrRes;
        };

        //刷新
        this.refresh = function (params) {
            that.bootstrapTable("",params);
        };
        //load
        this.load =function (data) {
            that.bootstrapTable("load",data);
        };

        //更新一行数据
        this.update = function(index,data){
            that.bootstrapTable("updateRow",{index:index,row:data})
        };
        //更新一个数据
        this.updateCell = function(index,field,value){
            that.bootstrapTable("updateCell",{index:index,field:field,value:value})
        };
        //删除一行数据
        // $("#tb_dept").bootstrapTable('', row.id)
        this.remove = function(data){
            that.bootstrapTable("removeByUniqueId",data)
        };
        // field: 'id',
        //     values: ids
        //插入一行数据
        this.insert = function(index,data){
            that.bootstrapTable("insertRow",{index:index,row:data})
        }
        // this.onExpandRow = function (index, row, $detail) {
        //     that.bootstrapTable()
        // }
    };
})(jQuery);