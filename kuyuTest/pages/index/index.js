//index.js
//获取应用实例
const app = getApp()
Page({
    //事件处理函数
    order: function(e) {
        wx.showLoading({
            title: '数据加载中',
            mask: true
        });
        wx.navigateTo({
            url: '../shopCard/shopCard?type=' + e.currentTarget.dataset.value + "&name=" + e.currentTarget.dataset.name,
            success: function() {
                wx.hideLoading();
            }
        })
    }
})