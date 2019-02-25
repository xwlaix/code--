import request from '@/utils/request'

export function getOperatorName(data) {
  return request({
    url: '?r=sms/business/operator/get-all',
    method: 'post',
    data
  })
}

