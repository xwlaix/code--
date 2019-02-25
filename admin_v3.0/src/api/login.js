import request from '@/utils/request'

export function loginByUsername(username, password, captcha) {
  const data = {
    username,
    password,
    captcha
  }
  return request({
    url: '?r=sms/login',
    method: 'post',
    data
  })
}

export function getCaptcha() {
  return request({
    url: '?r=sms/get-captcha',
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
    url: '?r=sms/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '?r=sms/user/get-data',
    method: 'get'
  })
}
export function other(data) {
  return request({
    url: '?r=sms/tao-test&id=' + data,
    method: 'get'
  })
}

