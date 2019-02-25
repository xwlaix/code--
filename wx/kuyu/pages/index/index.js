//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
    data: {
        card_no: '',
        cards: '',
        focus: false
    },
    getCard: function(e) {
        if (e.detail.value) {
            this.setData({
                card_no: util.trim(e.detail.value),
                focus: false
            })
        }
    },
    getHistory: function(e) {
        this.setData({
            card_no: e.currentTarget.dataset.value,
            focus: false
        })
    },
    showlist: function(e) {
        this.setData({
            focus: true
        })
    },
    search: function(e) {
        if (e.detail.value) {
            this.loadCache(util.trim(e.detail.value));
            app.coolfish.post('?r=wms/personal/card-bind', {
                card: util.trim(e.detail.value),
                uid: 50
            }).then(function(res) {
                wx.hideLoading();
                if (res.code == 1) {}
            })
        }
    },
    bindCard: function(e) {
        var _this = this
        if (this.data.card_no) {
            wx.showLoading({
                title: '查询中'
            });
            this.loadCache(this.data.card_no);
            app.coolfish.post('?r=wms/personal/card-bind', {
                card: this.data.card_no,
                uid: 50
            }).then(function(res) {
                wx.hideLoading();
                if (res.code == 1) {
                    _this.setCData(res);
                }
            })
        }
    },
    setCData: function(res) {
        var card_status
        if (res.data.card_status == 1) {
            card_status = '待激活'
        }
        if (res.data.card_status == 2) {
            card_status = '正常'
        }
        if (res.data.card_status == 3) {
            card_status = '单向停机'
        }
        if (res.data.card_status == 4) {
            card_status = '停机'
        }
        if (res.data.card_status == 5) {
            card_status = '预销号'
        }
        if (res.data.card_status == 6) {
            card_status = '销号'
        }
        if (res.data.card_status == 7) {
            card_status = '过户'
        }
        if (res.data.card_status == 8) {
            card_status = '休眠'
        }
        if (res.data.card_status == 9) {
            card_status = '未知状态'
        }
        if (res.data.card_status == 0) {
            card_status = '未知状态'
        }
        sessionStorage.setItem("fid", res.data.fid);
        sessionStorage.setItem("sid", res.data.sid);
        sessionStorage.setItem("tid", res.data.tid);
        sessionStorage.setItem("cardid", res.data.id);
        sessionStorage.setItem("type", res.data.type);
        sessionStorage.setItem("iccid", res.data.iccid);
        sessionStorage.setItem("amount", res.data.amount);
        sessionStorage.setItem("card_status", card_status);
        sessionStorage.setItem("card_type", res.data.card_type);
        sessionStorage.setItem("operatorid", res.data.operatorid);
        sessionStorage.setItem("operator_type", res.data.operator_type);
        sessionStorage.setItem("status", res.data.real_status);
        if (res.data.amount) {
            if (!res.data.password) {
                if (res.data.real_status == 2) {
                    //有余额没密码已经实名
                    wx.showModal({
                        content: '你查询的卡还没修改余额密码，请先去修改余额密码',
                        success: function(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../personal?type=1'
                                })
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: '../personal'
                                })
                            }
                        }
                    })
                    return
                }
            }
        }
        app.coolfish.get('?r=wms/personal/get-celebrity').then(function(res) {
            if (res.code == 1) {
                if (res.data.status == 3) {
                    sessionStorage.setItem("real_status", '认证失败');
                    wx.showModal({
                        content: '你查询的卡认证失败，请去实名认证',
                        success: function(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../register/register'
                                })
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: '../personal/personal'
                                })
                            }
                        }
                    })
                }
                if (res.data.status == 2) {
                    sessionStorage.setItem("real_status", '已认证');
                    wx.redirectTo({
                        url: '../personal/personal'
                    })
                }
                if (res.data.status == 1) {
                    sessionStorage.setItem("real_status", '认证中');
                    wx.redirectTo({
                        url: '../personal/personal'
                    })
                }
            } else if (res.code == 0) {
                if (sessionStorage.getItem('status') == 2) {
                    sessionStorage.setItem("real_status", '已认证');
                    wx.redirectTo({
                        url: '../personal/personal'
                    })
                } else {
                    sessionStorage.setItem("real_status", '未认证');
                    wx.showModal({
                        content: '你查询的卡还未实名认证，请去实名认证',
                        success: function(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../register/register'
                                })
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: '../personal/personal'
                                })
                            }
                        }
                    })
                }
            }
        });
    },
    loadCache: function(cardNo) {
        var arr = [],
            cookArr = [];
        if (wx.getStorageSync('cardNo')) {
            cookArr = wx.getStorageSync('cardNo');
        }
        arr.push(cardNo);
        var c = arr.concat(cookArr);
        if (util.unique(c).length >= 5) {
            c.pop()
        }
        wx.setStorageSync('cardNo', util.unique(c))
        wx.setStorageSync('kahao', this.data.card_no)
    },
    onLoad: function() {
        if (wx.getStorageSync('cardNo')) {
            var list = wx.getStorageSync('cardNo');
            var obj = [];
            for (var i in list) {
                if (i < list.length) {
                    obj.push({
                        card: list[i]
                    });
                }
            }
            this.setData({
                cards: obj
            })
        }
    }
})