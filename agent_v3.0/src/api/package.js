import request from '@/utils/request'
// 获取卡片列表
export function getCardPackage(data) {
  return request({
    url: '?r=ems/business/main/get-all-package',
    method: 'post',
    data
  })
}
// 导出自己套餐列表
export function getPackage(data) {
  return request({
    url: '?r=ems/business/package/get-all',
    method: 'post',
    data
  })
}
// 获取分配套餐
export function getAgentPackage(data) {
  return request({
    url: '?r=ems/agent/package-price/get-all',
    method: 'post',
    data
  })
}
// 修改分配套餐
export function updatePackage(data) {
  return request({
    url: '?r=ems/agent/package-price/update',
    method: 'post',
    data
  })
}

