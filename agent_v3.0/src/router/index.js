import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/other',
    component: () => import('@/views/login/other'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home' }
      },
      {
        path: '/noticeList',
        component: () => import('@/views/dashboard/noticeList'),
        name: 'NoticeList',
        meta: { title: 'noticeList' },
        hidden: true
      },
      {
        path: '/notice',
        component: () => import('@/views/dashboard/notice'),
        name: 'Notice',
        meta: { title: 'notice' },
        hidden: true
      },
      {
        path: '/nouns',
        component: () => import('@/views/guide/nouns'),
        name: 'Nouns',
        meta: { title: 'nouns' },
        hidden: true
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'agent',
    meta: { roles: ['agent'] },
    children: [
      {
        path: 'agent',
        component: () => import('@/views/agent/index'),
        name: 'Agent',
        meta: { title: 'agent', icon: 'sitemap', roles: ['agent'] }
      },
      {
        path: 'per',
        component: () => import('@/views/agent/per'),
        meta: { title: 'per' },
        name: 'Per',
        hidden: true
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'card',
    meta: { title: 'cardManage', icon: 'card' },
    children: [
      {
        path: 'card',
        component: () => import('@/views/card/index'),
        name: 'Card',
        meta: { title: 'card', roles: ['common'] }
      },
      {
        path: '/excelCard',
        component: () => import('@/views/card/excelCard'),
        meta: { title: 'excelCard' },
        name: 'ExcelCard'
      },
      {
        path: '/operateList',
        component: () => import('@/views/card/operateList'),
        meta: { title: 'operateList' },
        name: 'OperateList'
      },
      {
        path: '/getInfo',
        component: () => import('@/views/card/getInfo'),
        meta: { title: 'getInfo' },
        name: 'GetInfo'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'package',
    children: [
      {
        path: 'package',
        component: () => import('@/views/package/package'),
        name: 'Package',
        meta: { title: 'package', icon: 'bank', roles: ['common'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { roles: ['orderPackage'] },
    children: [
      {
        path: 'orderPackage',
        component: () => import('@/views/orderPackage/index'),
        name: 'OrderPackage',
        meta: {
          title: 'orderPackage',
          icon: 'suitcase',
          roles: ['orderPackage']
        }
      },
      {
        path: '/orderMore',
        component: () => import('@/views/orderPackage/orderMore'),
        meta: { title: 'orderMore', roles: ['orderPackage'] },
        name: 'OrderMore',
        hidden: true
      }
    ]
  },

  {
    path: '',
    component: Layout,
    meta: { roles: ['exchange'] },
    children: [
      {
        path: 'changePackage',
        component: () => import('@/views/exchange/index'),
        name: 'ChangePackage',
        meta: { title: 'changePackage', icon: 'exchange', roles: ['exchange'] }
      },
      {
        path: 'changeAction',
        component: () => import('@/views/exchange/changePackageAction'),
        meta: { title: 'changePackageAction', roles: ['exchange'] },
        name: 'ChangePackageAction',
        hidden: true
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: 'stopReset', icon: 'refresh', roles: ['stopReset'] },
    children: [
      {
        path: 'stopReset',
        component: () => import('@/views/stopReset/index'),
        name: 'StopReset',
        meta: { title: 'stopReset', icon: 'refresh', roles: ['stopReset'] }
      }
    ]
  },

  {
    path: '',
    component: Layout,
    meta: { roles: ['unbind'] },
    children: [
      {
        path: 'unbind',
        component: () => import('@/views/unbind/index'),
        name: 'Unbind',
        meta: { title: 'unbind', icon: 'window-restore', roles: ['unbind'] }
      },
      {
        path: '/unbindAction',
        component: () => import('@/views/unbind/unbindAction'),
        meta: { title: 'unbindAction' },
        name: 'UnbindAction',
        hidden: true
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'finance',
    meta: {
      title: 'finance',
      icon: 'balance-scale'
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/finance/order'),
        name: 'Order',
        meta: { title: 'order', roles: ['common'] }
      },
      {
        path: 'withdraw',
        component: () => import('@/views/finance/withdraw'),
        name: 'Withdraw',
        meta: { title: 'withdraw', roles: ['common'] }
      },
      {
        path: 'commission',
        component: () => import('@/views/finance/commission'),
        name: 'Commission',
        meta: { title: 'commission', roles: ['common'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    meta: { roles: ['agentAmount'] },
    children: [
      {
        path: 'agentAmount',
        component: () => import('@/views/agentAmount/index'),
        name: 'AgentAmount',
        meta: {
          title: 'agentAmount',
          icon: 'Starting_amount',
          roles: ['agentAmount']
        }
      },
      {
        path: '/recharge',
        component: () => import('@/views/agentAmount/recharge'),
        meta: { title: 'recharge' },
        name: 'Recharge',
        hidden: true
      }
    ]
  },

  {
    path: '',
    component: Layout,
    redirect: 'setting',
    children: [
      {
        path: 'setting',
        component: () => import('@/views/setting/index'),
        name: 'Setting',
        meta: { title: 'setting', icon: 'cogs', roles: ['common'] }
      }
    ]
  },

  {
    path: '',
    component: Layout,
    redirect: 'guide',
    children: [
      {
        path: 'guide',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'question', roles: ['common'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
