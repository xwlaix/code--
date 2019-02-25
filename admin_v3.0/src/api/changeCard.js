import request from '@/utils/request'
// 获取换卡记录
export function changeCard(data) {
  return request({
    url: '?r=sms/card-replace/get-all',
    method: 'post',
    data
  })
}

// 删除换卡记录
export function delchangeCard(data) {
  return request({
    url: '?r=sms/card-replace/delinfo',
    method: 'post',
    data
  })
}
