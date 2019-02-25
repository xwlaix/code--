import request from '@/utils/request'

export function getOperatorName() {
  return request({
    url: '?r=ems/business/operator/get-all',
    method: 'get'
  })
}

