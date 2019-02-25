import request from '@/utils/request'
// 获取佣金记录
export function getCommission(data) {
  return request({
    url: '?r=sms/finance/agent-commission/get-all',
    method: 'post',
    data
  })
}

// 获取某个代理商总佣金
export function agentCommission(data) {
  return request({
    url: '?r=sms/finance/agent-commission/get-data',
    method: 'post',
    data
  })
}
// 导出佣金记录
export function downloadCommission(data) {
  return request({
    url: '?r=sms/finance/agent-commission/down-all',
    method: 'post',
    data
  })
}
