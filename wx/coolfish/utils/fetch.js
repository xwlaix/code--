'use strict';
/**
 * qpi请求
 * @param type  类型方法大写POST,GET（默认）
 * @param api   api根地址
 * @param path  请求路径
 * @param params 传值
 * @returns {Promise}      包含抓取任务的Promise
 */
module.exports = function (type,api,path,params) {
   return new Promise(function(resolve,reject){
        wx.request({
            method:type,
            url:api+path,
            data:Object.assign({},params),
            header: {"Content-Type": "json"},
            success:resolve,
            fail:reject
        })
   })
}