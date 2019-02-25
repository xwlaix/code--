import request from '@/utils/request'
// 获取订单列表
export function getAllOrder(data) {
  return request({
    url: '?r=ems/finance/order/get-all',
    method: 'post',
    data
  })
}
// 导出订单
export function downOrder(data) {
  return request({
    url: '?r=ems/finance/order/down-all',
    method: 'post',
    data
  })
}
// 佣金数据
export function getAgentCommission(data) {
  return request({
    url: '?r=ems/data/get-agent-commission',
    method: 'post',
    data
  })
}
// 订单数据
export function getOrderData(data) {
  return request({
    url: '?r=ems/finance/order/get-data',
    method: 'post',
    data
  })
}

