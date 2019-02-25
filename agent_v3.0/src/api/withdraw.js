import request from '@/utils/request'
import request1 from '@/utils/request.1'
// 获取自己申请列表
export function getWithdrawals(data) {
  return request({
    url: '?r=ems/finance/withdrawals/get',
    method: 'post',
    data
  })
}
// 获取下级申请列表
export function getWithdrawalsAgent(data) {
  return request({
    url: '?r=ems/finance/withdrawals/get-all',
    method: 'post',
    data
  })
}
// 获取当前可提现金额

export function getWithdrawalsData(data) {
  return request1({
    url: '/commission/v1/getComm',
    method: 'post',
    data
  })
}
// 申请提现
export function addWithdrawals(data) {
  return request1({
    url: '/commission/v1/apply',
    method: 'post',
    data
  })
}
// 提现审核
export function updateWithdrawals(data) {
  return request1({
    url: '/commission/v1/approval',
    method: 'post',
    data
  })
}

