import request from '@/utils/request'

export function getOperatorName() {
  return request({
    url: '?r=sms/business/operator/get-all-name',
    method: 'get'
  })
}
export function getOperatorZid() {
  return request({
    url: '?r=sms/business/operator/get-account',
    method: 'get'
  })
}

