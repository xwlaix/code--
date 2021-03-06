//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
    data: {
        type: '',
        number: 1,
        sname: '',
        sphone: '',
        money: 10,
        province: '',
        city: '',
        area: '',
        address: '',
        uid: 50,
        code: '',
        region: '',
        chooseFlag: false,
        MAX: 99,
        MIN: 1,
        name:''
    },
    onLoad: function(e) {
        this.setData({
            type: e.type,
            name: e.name
        })
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },
    chooseAddress: function(e) {
        var _this = this
        if (_this.data.chooseFlag != true) {
            wx.chooseAddress({
                success: function(res) {
                    _this.setData({
                        chooseFlag: true,
                        sname: res.userName,
                        sphone: res.telNumber,
                        province: res.provinceName,
                        city: res.cityName,
                        area: res.countyName,
                        address: res.detailInfo,
                        region: [res.provinceName, res.cityName, res.countyName],
                    })
                }
            })
        }
    },
    //事件处理函数
    getType: function(e) {
        if (e.detail.value) {
            this.setData({
                type: util.trim(e.detail.value)
            })
        }
    },
    getSname: function(e) {
        if (e.detail.value) {
            this.setData({
                sname: util.trim(e.detail.value)
            })
        }
    },
    getSphone: function(e) {
        if (e.detail.value) {
            this.setData({
                sphone: util.trim(e.detail.value)
            })
        }
    },
    getProvince: function(e) {
        if (e.detail.value) {
            this.setData({
                province: util.trim(e.detail.value)
            })
        }
    },
    getCity: function(e) {
        if (e.detail.value) {
            this.setData({
                city: util.trim(e.detail.value)
            })
        }
    },
    getAddress: function(e) {
        if (e.detail.value) {
            this.setData({
                address: util.trim(e.detail.value)
            })
        }
    },
    openToastPannel: function(data) {
        var self = this;
        this.setData({
            '_toast_.isHide': true,
            '_toast_.content': data
        });
        setTimeout(function() {
            self.setData({
                '_toast_.isHide': false
            })
        }, 1500)
    },
    decrease: function() {
        var number = parseInt(this.data.number || "0") - 1;
        if (number < this.data.MIN) number = this.data.MIN;
        this.setData({
            number: number,
            money: (number - 1) * 5 + 10
        })
    },
    increase: function() {
        var number = parseInt(this.data.number || "0") + 1;
        if (number > this.data.MAX) number = this.data.MAX;
        this.setData({
            number: number,
            money: (number - 1) * 5 + 10
        })
    },
    changeNumber: function(e) {
        var number = parseInt(e.detail.value || "0");
        if (number < this.data.MIN) number = this.data.MIN;
        if (number > this.data.MAX) number = this.data.MAX;
        this.setData({
            number: number,
            money: (number - 1) * 5 + 10
        })
    },
    addCard: function(e) {
        var _this = this
        if (!this.data.type) {
            this.openToastPannel('请选择卡片类型')
            return
        }
        if (!this.data.sname) {
            this.openToastPannel('请输入收货人姓名', 2000, 'error');
            return
        }
        if (!this.data.sphone) {
            this.openToastPannel('请输入收货人手机', 2000, 'error');
            return
        }
        var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if (!reg.test(this.data.sphone)) {
            this.openToastPannel('手机号码格式不对!', 2000, 'error');
            return false;
        }
        if (!this.data.region) {
            this.openToastPannel('请选择省市区', 2000, 'error');
            return
        }
        if (!this.data.address) {
            this.openToastPannel('请输入详细地址', 2000, 'error');
            return
        }
        if (this.data.addFlag == 1) {
            this.openToastPannel('请不要重复提交订单', 2000, 'error');
            return false
        }
        wx.showLoading({
            title: '提交中'
        });
        app.coolfish.post('?r=wms/extension/add-card', {
            data: this.data
        }).then(function(res) {
            wx.hideLoading();
            if (res.code == 1) {
                console.log(res)
            }
        })
    },
})