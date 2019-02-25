import request from '@/utils/request'
import request1 from '@/utils/request.1'
// 获取订购套餐列表
export function getAddPackage(data) {
  return request({
    url: '?r=sms/business/main/get-all-package',
    method: 'post',
    data
  })
}
// 订购套餐
export function orderPackage(data) {
  return request({
    url: '?r=sms/business/main/order',
    method: 'post',
    data
  })
}
// 微信扫码订购
export function orderByWechat(data) {
  return request({
    url: '?r=sms/business/main/order-by-wechat',
    method: 'post',
    data
  })
}
// JAVA订购套餐
export function orderPackageJava(data) {
  return request1({
    url: 'order/v1/platformOrder',
    method: 'post',
    data
  })
}
// JAVA退订套餐
export function unsubscribePackage(data) {
  return request1({
    url: 'order/v1/unsubscribePackage',
    method: 'post',
    data
  })
}
// JAVA转套餐
export function cardChange(data) {
  return request1({
    url: 'card/v1/cardChange',
    method: 'post',
    data
  })
}
//  JAVA微信扫码订购
export function orderByWechatJava(data) {
  return request1({
    url: '/wxpay/pay/v1/agentWxOrder',
    method: 'post',
    data
  })
}
//  JAVA行业用户微信扫码订购
export function industryWechatJava(data) {
  return request1({
    url: 'http://120.79.150.124:8090/biz/v1/bizWxOrderPackage',
    method: 'post',
    data
  })
}
