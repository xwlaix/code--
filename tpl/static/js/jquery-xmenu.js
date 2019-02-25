/**
 * Created by kuyu2 on 2017/5/18.
 */
/*
 * X-Menu 下拉框多选组件
 * 依赖jquery.powerFloat.js
 * 整合powerFloat
 * 浏览器支持 FF Chrome Opera IE9 IE8一下不兼容
 * @author yelingfeng
 * @email  yelingfeng521@gmail.com
 */

(function($) {

    var defaults  = {
        width : 800, //可选参数：inherit，数值(px)
        eventType: "click", //事件类型，其他可选参数有：click, focus
        dropmenu:".xmenu",//弹出层div
        hiddenID : "selectposhidden",//隐藏域ID
        emptytext: "请选择"
    };

    $.fn.xMenu = function(options) {
        var $Hd = $("#selectcmcc");
        return $(this).each(function() {
            var owl = $.extend({}, defaults, options || {});
            //触发按钮
            var $this = $(this);
            //span
            var $span = $this.find("span");
            //浮动层主div
            var $dropmenu= $(owl.dropmenu);
            //主li
            var $mli = $("dl li",$dropmenu);
            var $button = $(".topnav a",$dropmenu);
            //li父级
            var $mliPar = $(".choose ul", $dropmenu);
            var $mliSet = $(".choose ul li",$dropmenu);
            //已选在职位div
            var $selectinfo = $(".select-info",$dropmenu);
            //已选在职位ul
            var $selectUl = $("ul",$selectinfo);
            //确认按钮
            var $okbtn = $("a[name='menu-confirm']",$selectinfo);
            var $confirmBtn = $(".btn-package-confirm",$selectinfo);

            //取消按钮
            var $cancel = $("a[name='menu-cancel']",$selectinfo);
            var $cancelBtn = $(".btn-package-cancel",$selectinfo);

            //伸缩事件绑定
            $("dl dt",$dropmenu).toggle(function(){
                var $this = $(this);
                if($this.hasClass('open')){
                    $this.removeClass('open').next().slideUp('fast');
                }else{
                    $this.addClass('open').next().slideDown('fast');
                }
            } , function(){
                $(this).removeClass('open').next().slideUp('fast');
            });






            //绑定保存
            $okbtn.on('click',$confirmBtn,function(){
                if(aid){
                    var $li =$selectUl.find("li");
                    var id = "";
                    $li.each(function(){
                        _this = $(this);
                        id +=  _this.attr("rel")+",";
                    });
                    id = id.substring(0,id.length-1);
                    id = id.split(',');
                    $Hd.val(id);
                    var index = layer.load(2, {
                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                    });
                    $post(urlPrefix + "?r=sms/agent/package-price/add",
                        {aid:aid,pid:id},
                        function (res) {
                            if (res.code==1) {
                                layer.msg('保存成功',
                                    {time: 2000});
                                getPack(aid);
                                $("#myselect").modal("hide")
                            } else {
                                layer.msg('新增失败',
                                    {time: 1000})
                            }
                            layer.closeAll();
                        })
                }else{
                    layer.msg("请先搜索代理商",{time:1000})
                }




            });
            //绑定取消
            $cancel.on('click',$cancelBtn,function(val){
                if(val&&val!=""){
                    $mliPar.children('li').removeClass("current");
                    $selectUl.empty();

                }
            });


            //绑定每一个职位
            $mliPar.on('click','li',function(){
                var $li = $(this);
                var val  =$li.text();
                var id  = $li.attr("rel");

                if($li.hasClass("current")){
                    $selectUl.find("li[rel='"+id+"']").remove();
                    $li.removeClass("current");
                }else{
                    $("<li rel='"+id+"' class='current'>"+val+"</li>").appendTo($selectUl);
                    $li.addClass("current");
                }

            });

            //绑定已选区li事件
            $("li",$selectUl).on('click',function(){
                var $li = $(this);
                var id  = $li.attr("rel");
                $mli.filter("li[rel='"+id+"']").removeClass("current");
                $li.remove();
            });




            //绑定power浮动层
            $this.powerFloat({
                eventType: owl.eventType,
                edgeAdjust: false,
                target: $dropmenu,
                showCall: function(){
                    //标注已选职位
                    setCurrentItem($Hd.val());
                    $this.addClass("menu-open");
                },
                hideCall:function(){
                    $this.removeClass("menu-open");
                }
            });
            //选中已选的职位
            var setCurrentItem = function (val) {
                var id='';
                $(".choose ul li",$dropmenu).removeClass("current");
                var array = val.split(",");
                var $selectLi = $("ul li",$selectinfo);
                for(i=0;i<array.length;i++){
                    $selectLi.filter(function(item) {
                        item = $selectLi[item];
                        id = $(item).attr("rel");
                        $(".choose ul li",$dropmenu)
                            .filter("li[rel='"+id+"']").remove();
                    });
                }
                $selectLi.remove();
            }
        });
    };


})(jQuery);

