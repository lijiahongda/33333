import { asyncRouterMap, constantRouterMap } from '@/router'

import { getListPagePowers } from '@/api/login'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  console.log('filterAsyncRouter', routes, roles)
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    pageAuthority: [],
    routers_a: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERS_A: (state, routers_a) => {
      state.routers_a = routers_a
      // state.routers = constantRouterMap.concat(routers)
      // console.log(state.routers)
    },
    SET_PAGEAUTHORITY: (state, pageAuthority) => {
      state.pageAuthority = pageAuthority
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else if (roles.includes('huangzhen')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(otherRouterMap, roles)
        }
        window._flag = true
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    // 获取page权限
    getPagePower({ commit, dispatch }, data) {
      // console.log(data, '获取page权限')
      // return new Promise(resolve => {
      //   getListPagePowers({ powerRouteName: data.path }, { Authorization: data.Authorization }).then(response => {
      //     commit('SET_PAGEAUTHORITY', response.data.data)
      //     resolve()
      //   })
      // })
    }
  }
}

export default permission
