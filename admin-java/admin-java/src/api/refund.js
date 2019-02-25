import request from '@/utils/request'
// 获取退款申请列表接口
export function searchRefundApplications(data, showLoading) {
  return request({
    url: '/plat/finance/v4/searchRefundApplications',
    method: 'post',
    data,
    showLoading
  })
}
// 退款审核接口
export function approvalRefund(data, showLoading) {
  return request({
    url: '/plat/finance/v4/approvalRefund',
    method: 'post',
    data,
    showLoading
  })
}
