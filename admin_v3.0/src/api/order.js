import request from '@/utils/request'
import request1 from '@/utils/request.1'
// 获取订单列表
export function getAllOrder(data) {
  return request({
    url: '?r=sms/finance/order/get-all',
    method: 'post',
    data
  })
}
// 搜索订单列表
export function getOrder(data) {
  return request({
    url: '?r=sms/finance/order/get',
    method: 'post',
    data
  })
}
// 修改订单状态
export function updteOrder(data) {
  return request({
    url: '?r=sms/finance/order/update',
    method: 'post',
    data
  })
}
// 补订套餐
export function supplement(data) {
  console.log(data)
  return request1({
    url: 'http://wx.szcoolfish.com/plat/order/v1/supplement',
    method: 'post',
    data
  })
}
// 导出订单
export function downOrder(data) {
  return request({
    url: '?r=sms/finance/order/down-all',
    method: 'post',
    data
  })
}
// 佣金数据
export function getAgentCommission(data) {
  return request({
    url: '?r=sms/data/get-agent-commission',
    method: 'post',
    data
  })
}
// 订单数据
export function getOrderData(data) {
  return request({
    url: '?r=sms/finance/order/get-data',
    method: 'post',
    data
  })
}

