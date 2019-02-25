import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_BTN: (state, btn) => {
      state.btn = btn
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      const captcha = userInfo.captcha.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, password, captcha).then(response => {
          const data = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          let roles = []
          const oneArr = []
          const nodes = response.data.Jurisdiction ? JSON.parse(response.data.Jurisdiction) : []
          for (var b in nodes) {
            if (nodes[b]['checked']) {
              oneArr.push(nodes[b]['id'])
            }
          }
          // 异卡换套餐
          const exchangeArr = [109, 125, 505, 2613, 4423, 1303, 666, 102, 1205, 2538, 3204, 1152, 546, 3627, 109, 1333, 1544]
          if (+data.type === 1) {
            roles = roles.concat(['agent', 'orderPackage', 'agentAmount', 'unbind', 'stopReset'])
          }
          if (+data.type === 2) {
            roles = roles.concat(['agent'])
          }
          if (exchangeArr.includes(+data.id) || oneArr.find((n) => +n === 1)) {
            roles = roles.concat(['exchange'])
          }
          roles = roles.concat(['common'])
          sessionStorage.setItem('aid', data.id)
          commit('SET_ROLES', roles)
          commit('SET_BTN', data.no)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.headimg || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }

    // // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       let roles = []
    //       // 停复机权限
    //       // const stopArr = [99, 613, 102, 1765, 505, 109, 398, 396, 546, 575, 164, 1556, 1305, 1465, 1494, 2168, 125, 1766, 1537, 1544, 1466, 117, 585, 1033, 1204, 1640, 1727, 3627, 1052, 2538, 666, 1152, 1303, 156]
    //       // 异卡换套餐
    //       const exchangeArr = [117, 125, 505, 2613, 4423, 1303, 666, 102, 1205, 2538, 3204, 1152]
    //       if (+data.type === 1) {
    //         roles = roles.concat(['agent', 'orderPackage', 'agentAmount', 'unbind', 'stopReset'])
    //       }
    //       // if (stopArr.includes(+data.id)) {
    //       //   roles = roles.concat([])
    //       // }
    //       if (exchangeArr.includes(+data.id)) {
    //         roles = roles.concat(['exchange'])
    //       }
    //       if (+data.type === 2) {
    //         roles = roles.concat(['agent'])
    //       }
    //       roles = roles.concat(['common'])
    //       sessionStorage.setItem('aid', data.id)
    //       commit('SET_ROLES', roles)
    //       commit('SET_BTN', data.no)
    //       commit('SET_NAME', data.uname)
    //       commit('SET_AVATAR', data.headimg || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve(response)
    //     })
    //   })
    // }
  }
}

export default user
