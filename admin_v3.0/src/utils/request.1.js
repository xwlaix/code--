import axios from 'axios'
import qs from 'qs'
// import { Message } from 'element-ui'
import { Message } from 'element-ui'
// import store from '@/store'
// import { PHPSESSID } from '@/utils/auth'

// create an axios instance
axios.defaults.withCredentials = true
const service = axios.create({
  crossDomain: true,
  withCredentials: true,
  baseURL: process.env.JAVA_API, // api的base_url
  // timeout: 5000, // request timeout
  headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept': '*/*' }
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (config.data) {
    config.data = qs.stringify(config.data)
  }
  // console.log(PHPSESSID)
  // config.headers['Cookie'] = PHPSESSID() // 让每个请求携带Cookie
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  // config.url = document.location.host === 'localhost:8080' ? `http://tw.szcoolfish.com${config.url}` : `${document.location.protocol}//${window.location.host}${config.url}`
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (+res.status !== 0) {
      Message({
        message: res.message,
        type: 'error'
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // 请自行在引入 MessageBox
      //   // import { Message, MessageBox } from 'element-ui'
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '请求超时',
      type: 'error'
    })
    return Promise.reject(error)
  })

export default service
