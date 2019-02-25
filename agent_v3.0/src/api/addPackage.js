import request from '@/utils/request'
import request1 from '@/utils/request.1'
// 获取订购套餐列表
export function getAddPackage(data) {
  return request({
    url: '?r=ems/business/main/get-all-addpackage',
    method: 'post',
    data
  })
}
// 订购套餐
export function orderPackage(data) {
  return request({
    url: '?r=ems/business/main/order',
    method: 'post',
    data
  })
}

// 微信扫码订购
export function orderByWechat(data) {
  return request({
    url: '?r=ems/business/main/order-by-wechat',
    method: 'post',
    data
  })
}
// JAVA订购套餐
export function orderPackageJava(data) {
  return request1({
    url: '/order/v1/agentBalanceOrder',
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
