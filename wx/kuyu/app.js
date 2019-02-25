'use strict';
const wechat = require('./utils/wechat.js');
const coolfish = require('./utils/coolfish.js');
App({
    data: {},
    wechat: wechat,
    coolfish: coolfish,

    onLaunch: function onLaunch() {
        const _this = this;
        console.log(111)
        // wechat.getLocation().then(function(res){
        //     const latitude =res.latitude,
        //         longitude = res.longitude;
        // })
    }
})