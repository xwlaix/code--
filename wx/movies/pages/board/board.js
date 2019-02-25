Page({
    data: {
        imgUrls: []
    },
    onLoad() {
        const _this = this
        wx.request({
            url: 'http://api.douban.com/v2/movie/in_theaters?count=3', //仅为示例，并非真实的接口地址
            data: {},
            header: {
                "Content-Type": "json"
            },
            success: function(res) {
            	_this.setData({
            		imgUrls:res.data.subjects
            	})
            }
        })
    }
})