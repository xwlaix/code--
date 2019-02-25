//logs.js
const util = require('../../utils/util.js')
const wechat = require('../../utils/wechat.js')
let app = getApp();
Page({
    data: {
        logs: [],
        pic1: '',
        pic2: '',
        pic3: '',
        kahao: '',
        username: '',
        phone: '',
        password: '',
        upload_flag_1: true,
        upload_flag_2: true,
        upload_flag_3: true,
        content:''
    },
    getkahao:function(e){
        if (!util.trim(e.detail.value)) {
            this.openToastPannel('请输入卡号')
            return
        }
        this.setData({
            kahao: util.trim(e.detail.value)
        })
    },
    getusername:function(e){
        if (!util.trim(e.detail.value)) {
            this.openToastPannel('请输入姓名')
            return
        }
        this.setData({
            username: util.trim(e.detail.value)
        })
    },
    getphone:function(e){
        var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/,_this=this;
        if (!util.trim(e.detail.value)) {
            _this.openToastPannel('请输入手机号码')
            return
        }
        this.setData({
            phone: util.trim(e.detail.value)
        })
        // if (!reg.test(util.trim(e.detail.value))) {
        //     _this.openToastPannel('请输入正确的手机号码')
        // }
        
    },
    getpassword:function(e){
        if (!util.trim(e.detail.value)) {
            this.openToastPannel('请输入姓名')
            return
        }
        this.setData({
            password: util.trim(e.detail.value)
        })
    },
    getID:function(e){
        if (!util.trim(e.detail.value)) {
            this.openToastPannel('请输入身份证号')
            return
        }
        // if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(ID))) {
        //     this.openToastPannel('请输入正确的身份证')
        //     return
        // }
        this.setData({
            ID: util.trim(e.detail.value)
        })
    },
    wx_upload_1: function () {
        var _this = this
        wechat.chooseImage().then(function(res){
            _this.setData({
                pic1:res.tempFilePaths,
                upload_flag_1:false
            })
        })
    },
    wx_upload_2: function () {
        var _this = this
        wechat.chooseImage().then(function(res){
            _this.setData({
                pic2:res.tempFilePaths,
                upload_flag_2:false
            })
        })
    },
    wx_upload_3: function () {
        var _this = this
        wechat.chooseImage().then(function(res){
            _this.setData({
                pic3:res.tempFilePaths,
                upload_flag_3:false
            })
        })
    },
    openToastPannel: function(data){
        var self = this;
        this.setData({ '_toast_.isHide': true, '_toast_.content': data});
        setTimeout(function(){
            self.setData({ '_toast_.isHide': false})
        },1500)
    },
    confirm:function(){
        var kahao = this.data.kahao;
        var username = this.data.username;
        var phone = this.data.phone;
        var ID = this.data.ID;
        var pic1 = this.data.pic1;
        var pic2 = this.data.pic2;
        var pic3 = this.data.pic3;
        // if (!kahao) {
        //     this.openToastPannel('请输入您的卡号')
        //     return (false)
        // }
        // //验证名字不为空&小于8位 通过
        // if (!username) {
        //     this.openToastPannel('请输入您的名字')
        //     return (false)
        // }
        // //验证手机号
        // if (!phone) {
        //     this.openToastPannel('请输入手机号码')
        //     return (false)
        // }
        // var reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        // if (!reg.test(phone)) {
        //     this.openToastPannel('手机号码格式不对')
        //     return false;
        // }
        // //验证身份证
        // if (!ID) {
        //     this.openToastPannel('请输入您身份证')
        //     return false;
        // }
        // if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(ID))) {
        //     this.openToastPannel('请输入正确的身份证')
        //     return false;
        // }
        // if (!pic1 || !pic2 || !pic3) {
        //     this.openToastPannel('请上传图片')
        // }
        app.coolfish.post('?r=wms/personal/update-celebrity', {
            name: username, phone: phone, card: kahao, cardNo: ID, pic1: pic1, pic2: pic2, pic3: pic3
        }).then(function(res) {
            if (res.code == 1) {}
        })
    },
    onLoad: function () {
             console.log(this)
        this.setData({})
    }
})
