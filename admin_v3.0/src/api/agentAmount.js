import request from '@/utils/request'
// 获取账户余额变动列表
export function getAmount(data) {
  return request({
    url: '?r=sms/agent/account/get-all',
    method: 'post',
    data
  })
}
// 充值余额
export function recharge(data) {
  return request({
    url: '?r=sms/agent/account/recharge',
    method: 'post',
    data
  })
}

