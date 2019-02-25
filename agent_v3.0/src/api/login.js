import request from '@/utils/request'

export function loginByUsername(username, password, captcha) {
  const data = {
    username,
    password,
    captcha
  }
  return request({
    url: '?r=ems/login',
    method: 'post',
    data
  })
}

export function getCaptcha() {
  return request({
    url: '?r=ems/get-captcha',
    method: 'get'
  })
}

export function getCaptchaRefresh(url) {
  return request({
    url: url,
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '?r=ems/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '?r=ems/agent/get-info',
    method: 'get'
  })
}
export function other(data) {
  return request({
    url: '?r=ems/tao-test&id=' + data,
    method: 'get'
  })
}

