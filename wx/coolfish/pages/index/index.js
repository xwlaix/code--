//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
    data: {
        focus: false,
        inputValue: ''
    },
    search: function(e) {
      console.log(e.detail.value)
    },
    onLoad: function() {
        // app.coolfish.post('?r=wms/personal/card-bind', {
        //     card: 1064705534608,
        //     uid: 50
        // }).then(function(d) {
        //     console.log(d)
        // })
        // this.setData({
        //   logs: (wx.getStorageSync('logs') || []).map(log => {
        //     return util.formatTime(new Date(log))
        //   })
        // })
    }
})