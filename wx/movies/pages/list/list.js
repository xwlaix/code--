Page({
    data: {
        list: [],
        title: '',
    },
    onLoad(params) {
    	console.log(params.type)
        const apiUrl = 'http://api.douban.com/v2/movie/' + params.type
        wx.request({
            url: apiUrl, //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'content-type': 'json' // 默认值
            },
            success: function(res) {
            	console.log(res)
                // this.setData({
                //     title: params.name
                // })
            }
        })
    }
})