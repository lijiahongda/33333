import request from '@/utils/requestKylins'
import { authorizationVue } from '@/utils/authorization'
const headers = { 'Authorization': authorizationVue(0) } // 请求头 header Authorization
// var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
// const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

// const headers = {
//   'Authorization': tokenAuth
// }
// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   const headers = { 'Authorization': authorizationVue(0) }
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     headers,
//     data
//   })
// }
//
export function loginByUsername(data) {
  return request({
    url: '/admin/userLogin',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}



export function getListPagePowers(data, header) {
  return request({
    url: '/admin/admin/getListPagePowers',
    method: 'post',
    params: data,
    headers: header
  })
}

// cid登录
export function cidmsLogin(data) {
	return request({
		//?token=7.280e9ab74b70b5a01703639e9c9e4cac
		// url: '/user/loginForMiddle',
		url:'/user/loginForMiddle',
		method: 'post',
		data
	})
}
