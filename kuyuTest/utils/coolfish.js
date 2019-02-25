'use strict';
const URI = 'https://wx.szcoolfish.com';
const fetch = require('./fetch');

/**
 * qpi请求
 * @param type  类型方法大写POST,GET（默认）
 * @param path  请求路径
 * @param params 传值
 * @returns {Promise}      包含抓取任务的Promise
 */
function fetchApi(type,path,params){
    return fetch(type,URI,path,params);
}

/**
 *  POST请求
 * @param path    请求路径
 * @param params    传值
 * @returns {Promise.<TResult>}
 */
function post(path,params) {
    return fetchApi('POST',path,params ).then(function (res) {
        return res.data;
    });
}
/**
 *  get请求
 * @param path     请求路径
 * @param params     传值
 * @returns {Promise.<TResult>}
 */
function get(path,params) {
    return fetchApi('GET',path,params).then(function (res) {
        return res.data;
    });
}

module.exports = {post:post,get:get};
