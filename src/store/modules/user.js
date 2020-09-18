import { getUserInfo } from '@/api/login'
import { loginByUsername, logout } from '@/api/robot'
import { adminUserLogin } from '@/api/loginAdmin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { set, get } from '@/utils/validate'
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = localstrage + '.' + localStorage.getItem('token')
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: tokenAuth || '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    userRole: localStorage.getItem('userRole') || '',
    setRouter: []
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
    SET_USERROLE: (state, userRole) => {
      state.userRole = userRole
    },
    SET_ROUTER: (state, setRouter) => {
      state.setRouter = setRouter
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(res => {
          if (res.data.code === 200) {
            res.data.code = { 'code': 200, 'msg': '\u767b\u5f55\u6210\u529f', 'token': '23a464e42bcbcec2c9427508a55f21b3', 'data': { 'id': 3, 'mobile': '18513785726', 'groupId': 0 }}
            var data = res.data.data.data
            commit('SET_TOKEN', data.mobile)
            setToken(data.mobile)
            localStorage.setItem('userInfo', JSON.stringify(data))
            localStorage.setItem('token', res.data.data.token)
            console.log('------------', 'Admin ' + JSON.parse(localStorage.getItem('userInfo')).id + '.' + localStorage.getItem('token'))
            commit('SET_NAME', res.data.data.id + '.' + res.data.token)
            set('time', false)
            // res.data.data.userRole.map(item=>{
            // 	if(item == 1){
            // 		commit('SET_USERROLE', 1)
            // 		localStorage.setItem("userRole",1)
            // 	}
            // })
            resolve(res)
          } else {
            reject(res)
          }
        })
      })
    },
    // 动态设置路由列表
    setRouterList({ commit }, router) {
      commit('SET_ROUTER', router)
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log(12122)
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
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
          // commit('SET_ROLES', [])
          removeToken()
          localStorage.clear()
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
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        console.log(role, 'rolerolerolerole')
        commit('SET_TOKEN', role)
        setToken(role)
        // getUserInfo(role).then(response => {
        //   const data = response.data
        //   commit('SET_ROLES', data.roles)
        //   commit('SET_NAME', data.name)
        //   // commit('SET_AVATAR', data.avatar)
        //   // commit('SET_INTRODUCTION', data.introduction)
        //   dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
        //   resolve()
        // })
      })
    }
  }
}

export default user
