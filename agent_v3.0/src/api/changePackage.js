import request from '@/utils/request'
// 获取异卡换套餐记录
export function getchangeList(data) {
  return request({
    url: '?r=ems/card-replace/get-all-card-change',
    method: 'post',
    data
  })
}

// 异卡换套餐动作
export function cardChange(data) {
  return request({
    url: 'http://112.74.198.2:8090/card/v1/cardChange',
    method: 'post',
    data
  })
}
