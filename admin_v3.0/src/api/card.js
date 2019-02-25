import request from '@/utils/request'
import request1 from '@/utils/request.1'
// 获取卡片列表
export function getCard(data) {
  return request({
    url: '?r=sms/card/get-all',
    method: 'post',
    data
  })
}
// 获取卡片
export function getBindCard(data) {
  return request({
    url: '?r=wms/personal/card-bind',
    method: 'post',
    data
  })
}
// 回收卡片
export function deleteCard(data) {
  return request({
    url: '?r=sms/card/delete',
    method: 'post',
    data
  })
}
// 分卡传值处理
export function assignCard(data) {
  return request({
    url: '?r=sms/card/assign',
    method: 'post',
    data
  })
}
//  JAVA分卡
export function divideCardJava(data) {
  return request1({
    url: 'http://112.74.198.2:8091/excel/card/divide',
    method: 'post',
    data
  })
}
// 分卡Excel模版
export function downAssign() {
  return '?r=sms/card/down-assign'
}

// 分卡excel处理
export function uploadAssign(id, data) {
  return request({
    fileElementId: id,
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '?r=sms/card/upload-assign',
    method: 'post',
    data
  })
}
// 卡片导出
export function downLoadCard(data) {
  return request({
    url: '?r=sms/card/down-all',
    method: 'post',
    data
  })
}
// 卡片修改备注
export function updateRemarks(data) {
  return request({
    url: '?r=sms/card/update-remarks',
    method: 'post',
    data
  })
}
// 卡片修改密码
export function changePassword(data) {
  return request({
    url: '?r=sms/card/change-password',
    method: 'post',
    data
  })
}
// 操作记录
export function getWork(data) {
  return request({
    url: '?r=sms/work/get-all',
    method: 'post',
    data
  })
}

// 部分行业卡流量池
export function getPool(data) {
  return request({
    url: '?r=sms/data/get-flow-info',
    method: 'post',
    data
  })
}

