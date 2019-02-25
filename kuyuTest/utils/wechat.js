"use strict";

function login() {
    return new Promise(function (resolve, reject) {
        wx.login({success: resolve, fail: reject});
    });
}

function getUserInfo() {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({success: resolve, fail: reject});
    });
}

function chooseImage() {
    return new Promise(function (resolve, reject) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: resolve,
            fail: reject
        })
    })
}

function setStorage(key, value) {
    return new Promise(function (resolve, reject) {
        wx.setStorage({key: key, data: value, success: resolve, fail: reject});
    });
}

function getStorage(key) {
    return new Promise(function (resolve, reject) {
        wx.getStorage({key: key, success: resolve, fail: reject});
    });
}

function getLocation(type) {
    return new Promise(function (resolve, reject) {
        wx.getLocation({type: type, success: resolve, fail: reject});
    });
}

module.exports = {
    login: login,
    getUserInfo: getUserInfo,
    setStorage: setStorage,
    getStorage: getStorage,
    getLocation: getLocation,
    chooseImage: chooseImage,
    original: wx
};
//# sourceMappingURL=wechat.js.map
