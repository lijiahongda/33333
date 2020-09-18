import request from '@/utils/request'
// import {
//   authorizationVue
// } from '@/utils/authorization'

// const headers = {
//   'Authorization': authorizationVue(2)
// } // 请求头 header Authorization

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} 

/**
 * 列表接口
 * */
export function adminUserLogin(data) {
  return request({
    url: '/admin/userLogin',
    method: 'post',
    headers,
    data
  })
}

