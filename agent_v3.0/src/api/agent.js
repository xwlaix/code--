import request from '@/utils/request'
// 获取代理商列表
export function getAllAgent(data) {
  return request({
    url: '?r=ems/agent/get-all',
    method: 'get'
  })
}
// 搜索代理商
export function getAgent(data) {
  return request({
    url: '?r=ems/agent/get',
    method: 'post',
    data
  })
}
// 新增
export function addAgent(data) {
  return request({
    url: '?r=ems/agent/add',
    method: 'post',
    data
  })
}
// 删除
export function deleteAgent(data) {
  return request({
    url: '?r=ems/agent/delete',
    method: 'post',
    data
  })
}
// 更新
export function updateAgent(data) {
  return request({
    url: '?r=ems/agent/update',
    method: 'post',
    data
  })
}
// 修改密码
export function changePassword(data) {
  return request({
    url: '?r=ems/agent/change-password',
    method: 'post',
    data
  })
}
// 获取某个代理商
export function getOne(data) {
  return request({
    url: '?r=ems/agent/get-one',
    method: 'post',
    data
  })
}
// 获取当前代理商信息
export function getInfo(data) {
  return request({
    url: '?r=ems/agent/get-info',
    method: 'get'
  })
}
// 获取当前代理商KEY值
export function getKey(data) {
  return request({
    url: '?r=ems/agent/get-key',
    method: 'get'
  })
}

// 获取当前代理商返点比例
export function getPer() {
  return request({
    url: '?r=ems/business/operator/get-per',
    method: 'get'
  })
}
