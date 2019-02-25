import request from '@/utils/request'
// 获取机卡解绑记录
export function getAllUnbind(data) {
  return request({
    url: '?r=sms/card/ctcc-untie/get-all',
    method: 'post',
    data
  })
}

// 机卡解绑动作
export function changeUnbind(data) {
  return request({
    url: '?r=sms/card/ctcc-untie/add',
    method: 'post',
    data
  })
}
