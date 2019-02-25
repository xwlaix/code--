import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/other', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/login') {
    next()
    NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  } else {
    if (getToken()) { // determine if there has token
      /* has token*/
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          sessionStorage.setItem('name', res.data.name)
          sessionStorage.setItem('uid', res.data.uid)
          sessionStorage.setItem('type', res.data.type)
          sessionStorage.setItem('accountType', res.data.accountType)
          let roles = []
          const oneArr = []
          const nodes = res.data.Jurisdiction ? JSON.parse(res.data.Jurisdiction) : []
          for (var b in nodes) {
            if (nodes[b]['checked']) {
              oneArr.push(nodes[b]['id'])
            }
          }
          // 异卡换套餐
          const exchangeArr = [109, 125, 505, 2613, 4423, 1303, 666, 102, 1205, 2538, 3204, 1152, 546, 3627, 109, 1333, 1544]
          if (+res.data.type === 1) {
            roles = roles.concat(['agent', 'orderPackage', 'agentAmount', 'unbind', 'stopReset'])
          }

          if (+res.data.type === 2) {
            roles = roles.concat(['agent'])
          }
          if (exchangeArr.includes(+res.data.id) || oneArr.find((n) => +n === 1)) {
            roles = roles.concat(['exchange'])
          }
          roles = roles.concat(['common'])
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
