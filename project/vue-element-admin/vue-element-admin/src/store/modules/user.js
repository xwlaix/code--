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
          const oneArr = []; const oneNoArr = []; const twoNoArr = []; const twoArr = []; const thrArr = []; const noArr = []
          if (data.id === data.uid) {
            data.roles = ['admin']
          } else {
            let nodes = JSON.parse(data.text)
            for (var b in nodes) {
              if (!nodes[b]['checked']) {
                oneNoArr.push(nodes[b]['id'])
                for (var a in nodes[b]['children']) {
                  if (!nodes[b]['children'][a]['checked']) {
                    twoNoArr.push(nodes[b]['children'][a]['id'])
                    for (var c in nodes[b]['children'][a]['children']) {
                      if (!nodes[b]['children'][a]['children'][c]['checked']) {
                        noArr.push(nodes[b]['children'][a]['children'][c]['id'])
                      }
                    }
                  }
                }
              } else {
                oneArr.push(nodes[b]['id'])
                for (var e in nodes[b]['children']) {
                  if (!nodes[b]['children'][e]['checked']) {
                    twoNoArr.push(nodes[b]['children'][e]['id'])
                    for (var f in nodes[b]['children'][e]['children']) {
                      if (!nodes[b]['children'][e]['children'][f]['checked']) {
                        noArr.push(nodes[b]['children'][e]['children'][f]['id'])
                      }
                    }
                  } else {
                    twoArr.push(nodes[b]['children'][e]['id'])
                    for (var g in nodes[b]['children'][e]['children']) {
                      if (!nodes[b]['children'][e]['children'][g]['checked']) {
                        noArr.push(nodes[b]['children'][e]['children'][g]['id'])
                      } else {
                        thrArr.push(nodes[b]['children'][e]['children'][g]['id'])
                      }
                    }
                  }
                }
              }
            }
            nodes = { has: oneArr.concat(twoArr), no: noArr }
            data.roles = nodes.has
            commit('SET_ROLES', data.roles)
            commit('SET_BTN', data.no)
          }
          commit('SET_NAME', data.uname)
          commit('SET_AVATAR', data.headimg || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_INTRODUCTION', data.introduction)
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
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
