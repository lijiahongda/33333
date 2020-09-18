import router from './router'
import store from './store'
import {
  getUserPowersList
} from '@/api/admin'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  removeToken
} from '@/utils/auth' // getToken from cookie
import {
  set,
  get
} from './utils/validate'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/group/newPeople', '/group/upgrade', '/cidms'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken() && localStorage.getItem('userInfo')) { // determine if there has token
    /* has token*/
    // console.log(to, 'toto')
    var timeDate = get('time', 1000 * 60 * 60 * 24)
    if (timeDate == true) {
      removeToken()
      localStorage.clear()
      location.reload()
    } else {
      set('time', false)
    }
    if (to.path === '/login') {
      next()
      router.push('/')
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // const arr = [
		  // {
			//   createdAt: '2019-11-12 17:53:12',
			//   icon: 'el-icon-s-home',
			//   level: '1',
			//   pid: '1',
			//   powerId: 1,
			//   powerName: '首页',
			//   powerRouteName: '/main/index',
			//   status: '有效',
			//   updatedAt: '2019-11-13 00:19:24',
			//   children: [{
			// 	  powerId: 101,
			// 	  powerName: '首页',
			// 	  level: '2',
			// 	  pid: '99',
			// 	  icon: '',
			// 	  powerRouteName: '/main/index',
			// 	  status: '有效'
			//   }, {
			// 	  powerId: 102,
			// 	  powerName: '群主统计',
			// 	  level: '2',
			// 	  pid: '99',
			// 	  icon: '',
			// 	  powerRouteName: '/main/dataCollect',
			// 	  status: '有效'
			//   }]
		  // }, {
      //     createdAt: '2019-11-12 17:53:12',
      //     icon: 'el-icon-s-tools',
      //     level: '1',
      //     pid: '2',
      //     powerId: 2,
      //     powerName: '群发素材',
      //     powerRouteName: '/material/list',
      //     status: '有效',
      //     updatedAt: '2019-11-13 00:19:24',
      //     children: [{
      //       powerId: 1,
      //       powerName: '素材列表',
      //       level: '2',
      //       pid: '1',
      //       icon: '',
      //       powerRouteName: '/material/list',
      //       status: '有效'
      //     }, {
			//   powerId: 202,
			//   powerName: '攻略列表',
			//   level: '2',
			//   pid: '2',
			//   icon: '',
			//   powerRouteName: '/material/guides/index',
			//   status: '有效'
		  // }, {
			//   powerId: 203,
			//   powerName: '攻略分类管理',
			//   level: '2',
			//   pid: '3',
			//   icon: '',
			//   powerRouteName: '/material/guides/categoryList',
			//   status: '有效'
		  // }]
      //   },
      //   {
      //     createdAt: '2019-11-12 17:53:12',
      //     icon: 'el-icon-s-check',
      //     level: '1',
      //     pid: '4',
      //     powerId: 4,
      //     powerName: '审核管理',
      //     powerRouteName: '/examine/index',
      //     status: '有效',
      //     updatedAt: '2019-11-13 00:19:24',
      //     children: [{
      //       powerId: 301,
      //       powerName: '审核列表',
      //       level: '2',
      //       pid: '1',
      //       icon: '',
      //       powerRouteName: '/examine/index',
      //       status: '有效'
      //     }]
      //   }, {
      //     createdAt: '2019-11-12 17:53:12',
      //     icon: 'el-icon-user',
      //     level: '1',
      //     pid: '5',
      //     powerId: 5,
      //     powerName: '我的机器人',
      //     powerRouteName: '/robotInfo/index',
      //     status: '有效',
      //     updatedAt: '2019-11-13 00:19:24',
      //     children: [{
      //       powerId: 501,
      //       powerName: '机器人列表',
      //       level: '2',
      //       pid: '1',
      //       icon: '',
      //       powerRouteName: '/robotInfo/index',
      //       status: '有效'
      //     }]
      //   },
      //   {
      //     createdAt: '2019-11-12 17:53:12',
      //     icon: 'el-icon-s-goods',
      //     level: '1',
      //     pid: '3',
      //     powerId: 3,
      //     powerName: '购买',
      //     powerRouteName: '/buy/buy',
      //     status: '有效',
      //     updatedAt: '2019-11-13 00:19:24',
      //     children: [{
      //       powerId: 301,
      //       powerName: '购买套餐',
      //       level: '2',
      //       pid: '99',
      //       icon: '',
      //       powerRouteName: '/buy/buy',
      //       status: '有效'
      //     }, {
      //       powerId: 301,
      //       powerName: '人工审核',
      //       level: '2',
      //       pid: '99',
      //       icon: '',
      //       powerRouteName: '/buy/examine',
      //       status: '有效'
      //     }]
      //   }
      // ]
      // store.dispatch('setRouterList', arr).then(res => {
      //   store.dispatch('getPagePower', {
      //     path: to.path,
      //     Authorization: 'Admin ' + (JSON.parse(localStorage.getItem('userInfo')).id + '.' + localStorage.getItem('token'))
      //   })
      //   next()
      // })
      getUserPowersList({}).then((res)=>{
        console.log(res)
        store.dispatch('setRouterList', res.data.data).then(res => {
          store.dispatch('getPagePower', {
          path: to.path,
          Authorization: 'Admin ' + (JSON.parse(localStorage.getItem('userInfo')).id + '.' + localStorage.getItem('token'))
          })
          next()
        })
      })
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next() // 否则全部重定向到登录页
      router.push(`/login`)
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
