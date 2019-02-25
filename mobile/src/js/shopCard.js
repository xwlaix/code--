var c = require('./index.js');
require('../lib/js/city-picker.min.js')
var wx = require('weixin-js-sdk')
if(sessionStorage.getItem('need')=='true'){
    sessionStorage.setItem('need','false')
    window.location.href = document.location.href
}
c.$post(
    "/?r=home/setting/get-jsapi-conf", {
        uid: sessionStorage.getItem("id"),
        url: document.location.href
    },
    function (data) {
        wx.config({
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature, // 必填，签名，见附录1
            jsApiList: ["chooseImage", "uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
);
var city = '';
$("#city-picker").cityPicker({
    title: "请选择收货地址",
    onChange: function (picker, values, displayValues) {
        city = displayValues
    }
});

$('#price').blur(function () {
    var price = $("#price").val();
    var number = $("#number").val();
    if (price && number) {
        $('#amount').val(+price * +number)
    } else {
        $('#amount').val('')
    }
})
$('#number').blur(function () {
    var price = $("#price").val();
    var number = $("#number").val();
    if (price && number) {
        $('#amount').val(+price * +number)
    } else {
        $('#amount').val('')
    }
})
$("#upload").click(function () {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.uploadImage({
                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    c.$post(
                        "?r=wms/personal/upload-img", {
                            uid: sessionStorage.getItem("id"),
                            mediaid: [res.serverId]
                        },
                        function (data) {
                            if (data.code == 0) {
                                $.toptip(data.msg, 2000, "error");
                                return
                            }
                            $('#pic').attr('src', c.urlPrl + data.data[0])
                            $("#upload").css('opacity', 1)
                        },
                        function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("提交失败" + textStatus);
                        }
                    );
                }
            });
        }
    });
});
$('.send').hide()
$('input[name="sendType"]').change(function () {
    if ($(this).data('bind') == 1) {
        $('.send').hide()
    } else {
        $('.send').show()
    }
});
$('input[name="payType"]').change(function () {
    if ($(this).data('bind') == 1) {
        $('.under').show();
    } else {
        $('.under').hide();
    }
});
$("#addOrder").click(function () {
    var operator_type = $('input[name="operatorType"]:checked').data('bind');
    var price = $("#price").val();
    var number = $("#number").val();
    var amount = $('#amount').val();
    var sender = $('#sender').val();
    var sender_phone = $('#sender_phone').val();
    var remarks = $("#remarks").val();
    var sendType = $('input[name="sendType"]:checked').data('bind');
    var consignee = $("#consignee").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    var img = $('#pic').attr('src');
    var payType = $('input[name="payType"]:checked').data('bind');

    if (!operator_type) {
        $.toptip('请选择运营商类型', 'error')
        return false
    }
    if (!price) {
        $.toptip('请填写协商好的单价', 'error')
        return false
    }
    if (!number || number <= 0) {
        $.toptip('请填写正确购买的数量', 'error')
        return false
    }
    if (!Number.isInteger(+number)) {
        $.toptip('请填写正确购买的数量，不能是小数', 'error')
        return false
    }
    if (!amount || amount < 0) {
        $.toptip('提交总价有问题，请重新填写', 'error')
        return false
    }

    if (!sendType) {
        $.toptip('请选择发货方式', 'error')
        return false
    }
    if (!consignee) {
        $.toptip('请填写收货人', 'error')
        return false
    }
    if (!phone) {
        $.toptip('请填写收货人手机号码', 'error')
        return false
    }
    if (!city) {
        $.toptip('请选择省市区', 2000, 'error');
        return
    }
    if (!address) {
        $.toptip('请选择收货详细地址', 'error')
        return false
    }
    if (!payType) {
        $.toptip('请选择付款方式', 'error')
        return false
    }
    //支付方式：微信支付，余额支付，线下支付
    var data = {
        operator_type: operator_type,
        price: price,
        number: number,
        amount: amount,
        remarks: remarks,
        sendType: sendType,
        sender: sender,
        sender_phone: sender_phone,
        province: city[0],
        city: city[1],
        area: city[2],
        phone: phone,
        name: consignee,
        address: address,
        payType: payType
    };
    if (payType == 1) {
        if (!img) {
            $.toptip('请上传支付凭证', 'error')
            return false
        }
        data.img = img
    }
    c.$post("?r=ems/card/agent-batch/add",
        data,
        function (res) {
            if (payType == 4) {
                window.location.href = c.urlPrl+'/coolfish/pay/mobileOrder.html?orderID='+res.data+'&money='+amount
            } else {
                if(res.code==1){
                    $.alert(res.msg,"注意",function(){
                        window.location.href =c.urlPrl + "/coolfish/tpl/agent/dist/mobileHome.html"
                    })
                }else{
                    $.toptip(res.msg,'error');
                }
            }
        })

});