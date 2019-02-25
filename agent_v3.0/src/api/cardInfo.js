import request from '@/utils/request'
// 获取流量详情
export function getInfo(data) {
  return request({
    url: '?r=ems/business/main/get-info',
    method: 'post',
    data
  })
}
