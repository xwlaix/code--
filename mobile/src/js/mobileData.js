var c = require('./index.js');
var echarts = require('echarts');
var accountMoney;
c.$post('?r=ems/data/get-card-account-count', {
    value: "money",
    data: "month"
}, function(data) {
    accountMoney = c.zhexianTu(data.data);
    var recharge = echarts.init(document.getElementById('recharge'));
    recharge.setOption(bar);
    recharge.setOption({
        title: {
            text: '充值金额',
            textStyle: {
                color: '#3cc51f'
            },
            top: '3%',
            right: '40%'
        },
        xAxis: {
            data: accountMoney[0]
        },
        series: [{
            name: "充值总额",
            // 根据名字对应到相应的系列
            data: accountMoney[1]
        }]
    });
    setTimeout(function() {
        window.onresize = function() {
            recharge.resize();
        }
    }, 1500);
});
//    柱状图
var bar = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: '{b0}: {c0}' + "元"
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: [],
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value'
    }],
    series: [{
        type: 'bar',
        barWidth: '60%',
        data: []
    }]
};
c.$post("?r=ems/data/get-agent-commission", {
    type: 'month'
}, function(res) {
    commissionMoney = c.zhexianTu(res.data, '', true);
    var commission = echarts.init(document.getElementById('commission'));
    // 基于准备好的dom，初始化echarts实例
    commission.setOption(bar);
    commission.setOption({
        title: {
            text: '佣金金额',
            textStyle: {
                color: '#3cc51f'
            },
            top: '3%',
            right: '40%'
        },
        xAxis: {
            data: commissionMoney[0]
        },
        series: [{
            name: "佣金总额",
            // 根据名字对应到相应的系列
            data: commissionMoney[1]
        }]
    });
    setTimeout(function() {
        window.onresize = function() {
            commission.resize();
        }
    }, 1500);
});