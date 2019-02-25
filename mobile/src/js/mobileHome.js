var c = require('./index.js');
var myDate = new Date(),
    month = myDate.getMonth();
var number = sessionStorage.getItem('number'),
    curMonth = sessionStorage.getItem('curMonth'),
    lastMonth = sessionStorage.getItem('lastMonth'),
    cardNumber = sessionStorage.getItem('cardNumber'),
    allAmount = sessionStorage.getItem('allAmount'),
    residue = sessionStorage.getItem('residue');

//佣金记录
if (number) {
    $(".number").text(number);
    $(".curMonth").text(curMonth);
    $(".lastMonth").text(lastMonth)
} else {
    c.$post("?r=ems/data/get-agent-commission", {
        type: 'month'
    }, function(res) {
        var num = 0;
        for (var i in res.data) {
            num += +res.data[i]
        }
        num = num.toFixed(2)
        sessionStorage.setItem('number', num);
        sessionStorage.setItem('curMonth', res.data[month + 1 + '月']);
        sessionStorage.setItem('lastMonth', (month == 0 ? res.data['12月'] : res.data[month + '月']));
        $(".number").text(num);
        $(".curMonth").text(res.data[month + 1 + '月']);
        $(".lastMonth").text(month == 0 ? res.data['12月'] : res.data[month + '月'])
    });
}
// 充值总数
if (allAmount) {
    $(".allAmount").text(allAmount)
} else {
    c.$post('?r=ems/data/get-card-account-count', {
        value: "money",
        data: "month"
    }, function(data) {
        var num = 0;
        for (var i in data.data) {
            var amount = +data.data[i]
            num = c.accAdd(num,amount)
        }
        sessionStorage.setItem('allAmount', num);
        $(".allAmount").text(num)
    });
}

// 卡片总数
if (cardNumber) {
    $(".cardNumber").text(cardNumber)
} else {
    c.$post('?r=ems/data/get-card-count', {
        type: "card_status"
    }, function(data) {
        var num = 0;
        for (var i in data.data) {
            num += data.data[i]
        }
        sessionStorage.setItem('cardNumber', num);
        $(".cardNumber").text(num)
    });
}
//剩余佣金
if (residue) {
    $(".residue").text(residue)
} else {
    c.$get("?r=ems/agent/get-info", function(res) {
        sessionStorage.setItem('residue', res.data.amount || '0.00');
        $(".residue").text(res.data.amount || '0.00')
    });
}