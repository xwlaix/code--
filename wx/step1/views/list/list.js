Page({
    data: {
        message: 'Hello 小程序',
        list:[]
    },
    onLoad() {
        // 加载数据并呈现到页面上
        // this.data.message = xxx 不可以，因为小程序平台捕获不到
        // this.setData({
        // 	message: Date.now()
        // })
        //获取一个api中的数据，不要使用ajax api因为ajax的api时bom
        //使用微信官方api
        const _this = this
        wx.request({
            url: 'http://wx.szcoolfish.com/?r=wms/personal/card-bind', //仅为示例，并非真实的接口地址
            data:  {"card": "1064705534608"  , "uid": "50"},
            method:'POST',
            header: {"Content-Type": "application/x-www-form-urlencoded"},
            success: function(res) {
            	_this.setData({
            		list:res.data.subjects
            	})
                console.log(res.data)
            }
        })
    }
})