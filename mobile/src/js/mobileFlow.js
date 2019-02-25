var c = require('./index.js');
require('transparency');
var $starttime = $("#starttime"),
    $endtime = $("#endtime");
$starttime.datetimePicker();
$endtime.datetimePicker();
$('#sec').on('click', function() {
    var cardid = $('#sstmobile').val(),
        starttime = $starttime.val(),
        endtime = $endtime.val();
    var startTimes = starttime.substring(0, 10).split('-');
    var endTimes = endtime.substring(0, 10).split('-');
    startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + starttime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endtime.substring(10, 19);
    var thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
    if (thisResult <= 0) {
        $.toptip('结束日期要比开始日期大', 2000, 'warning');
        return
    }
    $.showLoading();
    c.$post("?r=wms/agent/get-card-flow", {
        card: cardid,
        starttime: starttime,
        endtime: endtime
    }, function(res) {
        $.hideLoading();
        if (res.code == 1) {
            $.toptip(res.msg, "success");
            $('#template').render(res.data.flowlist);
            $(".detail").removeClass("hidden")
        } else {
            $.toptip(res.msg);
        }
    }, function() {
        $.hideLoading();
        $.toptip('操作失败', 'error');
    })
});