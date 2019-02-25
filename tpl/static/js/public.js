
var ky = {
	kyAlert: function(string){
		var obj = $("<div class='kyAlert'>"+ string +"</div>");
		this.showPop(obj)		
	},
	kyError: function(string){
		var obj = $("<div class='kyError'>"+ string +"</div>");
		this.showPop(obj)		
	},
	kySuccess: function(string){
		var obj = $("<div class='kySuccess'>"+ string +"</div>");
		this.showPop(obj)		
	},
	showPop: function(obj){
		lockScreen();
		$("body").append(obj);
		$(obj).animate({
			"top": "120px"
		},500,function(){
			setTimeout(function(){
				$(obj).fadeOut(500,function(){
					$(this).remove();
					unlockScreen();
				});
			},2000)
		});	
	}
}

function lockScreen(){
	var htmlStr = "<div class='shadowLayer'></div>"
	$("body").append(htmlStr);
}
function unlockScreen(){
	$(".shadowLayer").remove();
}


function indexFormatter(value, row, index){
	return index + 1;
}
//处理td数据
function operateType(value, row, index) {
    var type = row.trade_type;
    if(type == 1){
        return ['<span class="text-success" >微信支付</span>'].join('');
    }
}
function initFinanceTable(options){
	var defaults = {
		cache: false,
		pagination: true,
		pageSize: 10,
		pageNumber: 1,
		pageList: [10, 25, 50],
		sidePagination: "server",
		queryParamsType: "undefined",
		method: "post",
		contentType: "application/x-www-form-urlencoded",
		ajaxOptions: {
		    xhrFields: {        //跨域
		        withCredentials: true
		    },
		    crossDomain: true
		},	
		responseHandler: function (res) {
		    return res.data;
		}
	}
    var url = urlPrefix
	if(!options.url.match(url)){
		options.url = urlPrefix + options.url;
	}
	var options = $.extend(defaults, options);
	
	var arr = ["#incomeDetailTb", "#orderManageId", "#exchangeRequestTb", "#exchangeApprovalTb"];
	for(var i=0; i<4; i++){
		if($(arr[i]).length !=0 && $(arr[i]).parents(".J_iframe").css("display") != "none"){	
			$(arr[i]).bootstrapTable("destroy");
			$(arr[i]).bootstrapTable(options);
			break;
		}
	}
}

function changeApprovalStatusTxt(value){
	var str = "";
	if(value == 1){
		str = "未通过";
	}else if(value == 2){
		str = "同意";
	}else if(value  == 3){
		str = "拒绝";
	}
	return str;
}
