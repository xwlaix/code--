import request from '@/utils/request'
// 获取停复机记录
export function getAllStatus(data) {
  return request({
    url: '?r=sms/business/main/get-all-status',
    method: 'post',
    data
  })
}
// 停复机动作
export function changeStatus(data) {
  return request({
    url: '?r=sms/business/main/update-status',
    method: 'post',
    data
  })
}
