import request from '@/utils/request'
// 获取logo，名称
export function getLogo() {
  return request({
    url: '?r=ems/get',
    method: 'get'
  })
}
// 获取公告记录
export function getNotice(data) {
  return request({
    url: '?r=ems/notice/get-all',
    method: 'post',
    data
  })
}

// 获取某个公告
export function getOneNotice(data) {
  return request({
    url: '?r=ems/notice/get-info',
    method: 'post',
    data
  })
}

// 获取充值数据
export function getRecharge(data) {
  return request({
    url: '?r=ems/data/get-card-account-count',
    method: 'post',
    data
  })
}

// 加载卡片总数
export function getCardNum(data) {
  return request({
    url: '?r=ems/data/get-card-count',
    method: 'post',
    data
  })
}
