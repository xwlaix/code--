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
    redirect: 'dashboard',
    meta: { title: 'dashboard', icon: 'home', roles: ['common'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', roles: ['common'] }
      },
      {
        path: '/noticeList',
        component: () => import('@/views/dashboard/noticeList'),
        name: 'NoticeList',
        meta: { title: 'noticeList', roles: ['common'] },
        hidden: true
      },
      {
        path: '/notice',
        component: () => import('@/views/dashboard/notice'),
        name: 'Notice',
        meta: { title: 'notice', roles: ['common'] },
        hidden: true
      },
      {
        path: '/nouns',
        component: () => import('@/views/guide/nouns'),
        name: 'Nouns',
        meta: { title: 'nouns', roles: ['common'] },
        hidden: true
      }
    ], roles: ['common']
  }, {
    path: '/',
    component: Layout,
    redirect: 'mobile',
    meta: { title: 'mobile', icon: 'mobile', roles: ['mobile'] },
    children: [
      {
        path: 'query',
        component: () => import('@/views/mobile/query'),
        name: 'mobile',
        meta: { title: 'mobile' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'agent',
    meta: {
      title: 'agent',
      icon: 'sitemap', roles: ['common']
    },
    children: [
      {
        path: 'agentManage',
        component: () => import('@/views/agent/index'),
        name: 'agentManage',
        meta: { title: 'agentManage', roles: ['common'] }
      },
      {
        path: 'agentAmount',
        component: () => import('@/views/agent/recharge'),
        name: 'agentAmount',
        meta: { title: 'agentAmount', roles: ['common'] }
      },
      {
        path: 'agentPackage',
        component: () => import('@/views/agent/index'),
        name: 'agentPackage',
        meta: { title: 'agentPackage', roles: ['common'] }
      },
      {
        path: 'per',
        component: () => import('@/views/agent/per'),
        meta: { title: 'per', roles: ['common'] },
        name: 'Per',
        hidden: true
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'card',
    meta: { title: 'cardManage', icon: 'card', roles: ['common'] },
    children: [
      {
        path: 'card',
        component: () => import('@/views/card/index'),
        name: 'Card',
        meta: { title: 'card', roles: ['common'] }
      },
      {
        path: 'autonymCard',
        component: () => import('@/views/card/index'),
        name: 'autonymCard',
        meta: { title: 'autonymCard', roles: ['common'] }
      },
      {
        path: 'flowDetail',
        component: () => import('@/views/card/index'),
        name: 'flowDetail',
        meta: { title: 'flowDetail', roles: ['common'] }
      },
      {
        path: 'excelCard',
        component: () => import('@/views/card/excelCard'),
        meta: { title: 'excelCard', roles: ['common'] },
        name: 'ExcelCard',
        hidden: true
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'business',
    meta: { title: 'business', icon: 'bank', roles: ['common'] },
    children: [
      {
        path: 'operator',
        component: () => import('@/views/finance/withdraw'),
        name: 'operator',
        meta: { title: 'operator', roles: ['common'] }
      },
      {
        path: 'package',
        component: () => import('@/views/package/package'),
        name: 'Package',
        meta: { title: 'package', roles: ['common'] }
      },
      {
        path: 'getInfo',
        component: () => import('@/views/card/getInfo'),
        name: 'GetInfo',
        meta: { title: 'getInfo', roles: ['common'] }
      },
      {
        path: 'orderPackage',
        component: () => import('@/views/orderPackage/index'),
        name: 'OrderPackage',
        meta: {
          title: 'orderPackage',
          roles: ['orderPackage']
        }
      },
      {
        path: 'stopReset',
        component: () => import('@/views/stopReset/index'),
        name: 'StopReset',
        meta: { title: 'stopReset', roles: ['stopReset'] }
      },
      {
        path: 'changeCardList',
        component: () => import('@/views/finance/commission'),
        name: 'changeCardList',
        meta: { title: 'changeCardList', roles: ['common'] }
      },
      {
        path: 'unbind',
        component: () => import('@/views/unbind/index'),
        name: 'Unbind',
        meta: { title: 'unbind', roles: ['unbind'] }
      },
      {
        path: 'operateList',
        component: () => import('@/views/card/operateList'),
        meta: { title: 'operateList', roles: ['common'] },
        name: 'OperateList'
      },
      {
        path: 'hunanList',
        component: () => import('@/views/card/operateList'),
        meta: { title: 'hunanList', roles: ['common'] },
        name: 'hunanList'
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'finance',
    meta: {
      title: 'finance',
      icon: 'balance-scale', roles: ['common']
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/finance/order'),
        name: 'Order',
        meta: { title: 'order', roles: ['common'] }
      },
      {
        path: 'rechargeOrder',
        component: () => import('@/views/finance/order'),
        name: 'rechargeOrder',
        meta: { title: 'rechargeOrder', roles: ['common'] }
      },
      {
        path: 'commission',
        component: () => import('@/views/finance/commission'),
        name: 'Commission',
        meta: { title: 'commission', roles: ['common'] }
      },
      {
        path: 'withdraw',
        component: () => import('@/views/finance/withdraw'),
        name: 'Withdraw',
        meta: { title: 'withdraw', roles: ['common'] }
      },
      {
        path: 'payList',
        component: () => import('@/views/finance/withdraw'),
        name: 'payList',
        meta: { title: 'payList', roles: ['common'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'wx',
    meta: { title: 'wx', icon: 'wechat', roles: ['common'] },
    children: [
      {
        path: 'wxSetting',
        component: () => import('@/views/finance/withdraw'),
        name: 'wxSetting',
        meta: { title: 'wxSetting', roles: ['common'] }
      },
      {
        path: 'wxMenu',
        component: () => import('@/views/package/package'),
        name: 'wxMenu',
        meta: { title: 'wxMenu', roles: ['common'] }
      },
      {
        path: 'wxKeywords',
        component: () => import('@/views/card/getInfo'),
        name: 'wxKeywords',
        meta: { title: 'wxKeywords', roles: ['common'] }
      },
      {
        path: 'wxResponse',
        component: () => import('@/views/orderPackage/index'),
        name: 'wxResponse',
        meta: {
          title: 'wxResponse',
          roles: ['orderPackage']
        }
      },
      {
        path: 'wxFans',
        component: () => import('@/views/stopReset/index'),
        name: 'wxFans',
        meta: { title: 'wxFans', roles: ['stopReset'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'sms',
    meta: { title: 'sms', icon: 'email', roles: ['common'] },
    children: [
      {
        path: 'codeModule',
        component: () => import('@/views/finance/withdraw'),
        name: 'codeModule',
        meta: { title: 'codeModule', roles: ['common'] }
      },
      {
        path: 'smsSending',
        component: () => import('@/views/package/package'),
        name: 'smsSending',
        meta: { title: 'smsSending', roles: ['common'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'hardware',
    meta: { title: 'hardware', icon: 'hardware', roles: ['common'] },
    children: [
      {
        path: 'MIFI',
        component: () => import('@/views/finance/withdraw'),
        name: 'MIFI',
        meta: { title: 'MIFI', roles: ['common'] }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: 'other',
    meta: { title: 'other', icon: 'cogs', roles: ['common'] },
    children: [
      {
        path: 'apiDownload',
        component: () => import('@/views/finance/withdraw'),
        name: 'apiDownload',
        meta: { title: 'apiDownload', roles: ['common'] }
      },
      {
        path: 'sendWxMsg',
        component: () => import('@/views/package/package'),
        name: 'sendWxMsg',
        meta: { title: 'sendWxMsg', roles: ['common'] }
      },
      {
        path: 'upstream',
        component: () => import('@/views/card/getInfo'),
        name: 'upstream',
        meta: { title: 'upstream', roles: ['common'] }
      },
      {
        path: 'generalize',
        component: () => import('@/views/orderPackage/index'),
        name: 'generalize',
        meta: {
          title: 'generalize',
          roles: ['orderPackage']
        }
      },
      {
        path: 'announce',
        component: () => import('@/views/stopReset/index'),
        name: 'announce',
        meta: { title: 'announce', roles: ['stopReset'] }
      },
      {
        path: 'XJYexport',
        component: () => import('@/views/stopReset/index'),
        name: 'XJYexport',
        meta: { title: 'XJYexport', roles: ['stopReset'] }
      },
      {
        path: 'role',
        component: () => import('@/views/stopReset/index'),
        name: 'role',
        meta: { title: 'role', roles: ['stopReset'] }
      },
      {
        path: 'diyBatch',
        component: () => import('@/views/stopReset/index'),
        name: 'diyBatch',
        meta: { title: 'diyBatch', roles: ['stopReset'] }
      },
      {
        path: 'testAccess',
        component: () => import('@/views/stopReset/index'),
        name: 'testAccess',
        meta: { title: 'testAccess', roles: ['stopReset'] }
      }
    ]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   meta: { roles: ['exchange'] },
  //   children: [
  //     {
  //       path: 'changePackage',
  //       component: () => import('@/views/exchange/index'),
  //       name: 'ChangePackage',
  //       meta: { title: 'changePackage', icon: 'exchange', roles: ['exchange'] }
  //     },
  //     {
  //       path: 'changeAction',
  //       component: () => import('@/views/exchange/changePackageAction'),
  //       meta: { title: 'changePackageAction', roles: ['exchange'] },
  //       name: 'ChangePackageAction',
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '',
  //   component: Layout,
  //   meta: { roles: ['unbind'] },
  //   children: [
  //     {
  //       path: '/unbindAction',
  //       component: () => import('@/views/unbind/unbindAction'),
  //       meta: { title: 'unbindAction' },
  //       name: 'UnbindAction',
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '',
  //   component: Layout,
  //   meta: { roles: ['agentAmount'] },
  //   children: [
  //     {
  //       path: 'agentAmount',
  //       component: () => import('@/views/agentAmount/index'),
  //       name: 'AgentAmount',
  //       meta: {
  //         title: 'agentAmount',
  //         icon: 'Starting_amount',
  //         roles: ['agentAmount']
  //       }
  //     },
  //     {
  //       path: '/recharge',
  //       component: () => import('@/views/agentAmount/recharge'),
  //       meta: { title: 'recharge' },
  //       name: 'Recharge',
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'setting',
  //   children: [
  //     {
  //       path: 'setting',
  //       component: () => import('@/views/setting/index'),
  //       name: 'Setting',
  //       meta: { title: 'setting', icon: 'cogs', roles: ['common'] }
  //     }
  //   ]
  // },

  {
    path: '',
    component: Layout,
    redirect: 'guide',
    meta: { title: 'guide', icon: 'question', roles: ['common'] },
    children: [
      {
        path: 'guide',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', roles: ['common'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
