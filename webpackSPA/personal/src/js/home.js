  var seeId,cardNo,card_type,operatorid,real_status,amount;
    var nextType = [105,123,125,137,140,143,145,147,152,153];
    if(sessionStorage.getItem("id")==51){
          $(".apn").remove();
          $(".question").remove()
    }
    //获取微信头像昵称
    if(sessionStorage.getItem("needFresh")=='true'){
        $('.nickname').text(sessionStorage.getItem("nickname"));
        $('.headimgurl').attr('src',sessionStorage.getItem("headimgurl"));
    }else{
        $get('?r=wms/personal/get-wx-info',function(res){
            if(res.code==0){return}
            sessionStorage.setItem("needFresh", 'true');
            sessionStorage.setItem("nickname", res.data.nickname);
            sessionStorage.setItem("headimgurl", res.data.headimgurl);
            $('.nickname').text(res.data.nickname);
            $('.headimgurl').attr('src',res.data.headimgurl)
        });
    }
    if(sessionStorage.getItem("pay")=='true'||sessionStorage.getItem("active")=='true'){
        $get('?r=wms/personal/get-card', function (res) {
            sessionStorage.setItem("pay", false);
            sessionStorage.setItem("active", false);
            if (res.data.card_status == 1) {card_status = '待激活'}
            if (res.data.card_status == 2) {card_status = '正常'}
            if (res.data.card_status == 3) {card_status = '单向停机'}
            if (res.data.card_status == 4) {card_status = '停机'}
            if (res.data.card_status == 5) {card_status = '预销号'}
            if (res.data.card_status == 6) {card_status = '销号'}
            if (res.data.card_status == 7) {card_status = '过户'}
            if (res.data.card_status == 8) {card_status = '休眠'}
            if (res.data.card_status == 9) {card_status = '未知状态'}
            if (res.data.card_status == 0) {card_status = '未知状态'}
            sessionStorage.setItem("fid", res.data.fid);
            sessionStorage.setItem("sid", res.data.sid);
            sessionStorage.setItem("tid", res.data.tid);
            sessionStorage.setItem("cardid", res.data.id);
            sessionStorage.setItem("type", res.data.type);
            sessionStorage.setItem("iccid", res.data.iccid);
            sessionStorage.setItem("amount", res.data.amount);
            sessionStorage.setItem("card_status", card_status);
            sessionStorage.setItem("packageid", res.data.packageid);
            sessionStorage.setItem("card_type", res.data.card_type);
            sessionStorage.setItem("operatorid", res.data.operatorid);
            sessionStorage.setItem("operator_type", res.data.operator_type);
            $get('?r=wms/personal/get-celebrity', function (res) {
                if(res.code==1){
                    if(res.data.status==3){
                        sessionStorage.setItem("real_status", '认证失败');
                    }
                    if(res.data.status==2){
                        sessionStorage.setItem("real_status", '已认证');
                    }
                    if(res.data.status==1){
                        sessionStorage.setItem("real_status", '认证中');
                    }
                }else if(res.code==0){
                    if(sessionStorage.getItem('status')==2){
                        sessionStorage.setItem("real_status", '已认证');
                    }else{
                        sessionStorage.setItem("real_status", '未认证');
                    }
                }
            });
            load()
        });
    }else{
        load()
    }

    //加载数据
    function load() {
        seeId=sessionStorage.getItem("id");
        type=sessionStorage.getItem("type");
        cardNo=sessionStorage.getItem("cardNo");
        card_type=sessionStorage.getItem("card_type");
        operatorid=sessionStorage.getItem("operatorid");
        real_status=sessionStorage.getItem("real_status");
        amount=parseFloat(sessionStorage.getItem("amount")).toFixed(2);

        $(".tel").text(cardNo);
        $(".amount").text(amount);
        $(".real_status").text(real_status).click(function(){
            clickStatus()
        });
        if(operatorid==123||operatorid==125){
            $(".cardActive").removeClass('hidden')
        }
        //判断是否为空卡
        if(type==4){
            $.alert("空卡套餐，请订购套餐后使用。", "注意", function() {
                location.href = 'package.html?v2.1'
            });
        }
    }

    //套餐订购
    $(".order").click(function(){
        if (contains(nextType,+operatorid)) {
            location.href = "package.html?v2.1";
            return false
        }
        if(!sessionStorage.getItem("type")){return}
        if (sessionStorage.getItem("type") == 1){
            location.href = "packageMonth.html?v2.1";
            return false
        }else{
            location.href = "package.html?v2.1";
            return false
        }
    });
    //流量详情
    $(".detail").click(function(){
        location.href = 'index.html?v2.2'
    });
    //余额充值
    $(".recharge").click(function(){
        if(!amount&&amount!=0){return}
        location.href = 'rechargeMoney.html'
    });
    //充值记录查询
    $(".record").click(function(){
        if(!amount&&amount!=0){return}
        location.href = 'record.html?'
    });
    //跳转查询
    $(".qiehaun").click(function () {
        if (!seeId) {
            return
        }
        if(sessionStorage.getItem('atype')=='jdy'){
            location.href = 'jdy.html?id=' + seeId;
        }else{
            location.href = 'bindCard.html?id=' + seeId;
        }
    });
    //实名认证跳转
    function clickStatus() {
        if (!real_status) {
            return
        }
        if (real_status == '已认证') {
            $.alert("你已经实名，无需再次实名。", "注意", function () {
            });
        } else if (real_status == '认证中') {
            $.alert("实名认证中，请耐心等待。", "注意", function () {
            });
        }else{
            location.href = 'register.html'
        }
    }

    $(".register").click(function(){
        clickStatus()
    });
    //关键词跳转
    function keyJump(num1,num2){
        if(!seeId){return}
        if(seeId==50){
            location.href = '../wechat/view.html?id='+num1;
        }else if(seeId==52){
            location.href = '../wechat/view.html?id='+num2;
        }
    }
    $(".question").click(function(){
        keyJump(50,52)
    });

    $(".apn").click(function(){
        keyJump(47,54)
    });