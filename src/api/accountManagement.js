import request from '@/utils/requestKylins'
import { authorization } from '@/utils/auth'

// var localstrage = JSON.parse(localStorage.getItem('userInfo'))?localstrage =JSON.parse(localStorage.getItem('userInfo')).id :localstrage='';
// const tokenAuth = 'Admin ' +localstrage +'.'+localStorage.getItem('token')
// const headers = {
//   'Authorization': tokenAuth
// } // 请求头 header Authorization
// var id    = JSON.parse(localStorage.getItem('userInfo')).id;
// var token = localStorage.getItem('token');
// const tokenAuth = 'Admin ' + id +'.'+token
// const headers = {
//   'Authorization': tokenAuth
// } // 请求头 header Authorization
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} 
// console.log(JSON.parse(localStorage.getItem('userInfo')),'+++++');
// console.log(localStorage.getItem('token'),'-----');

export function getAdminUsers(data) {
  return request({
    url: '/admin/admin/getAdminUsers',
    method: 'post',
    params: data,
    headers
  })
}

export function delAdminUser(data) {
  return request({
    url: '/admin/admin/delAdminUser',
    method: 'post',
    params: data,
    headers
  })
}

export function getAdminUser(data) {
  return request({
    url: '/admin/admin/getAdminUser',
    method: 'post',
    params: data,
    headers
  })
}

export function addAdminUser(data) {
  return request({
    url: '/admin/admin/addAdminUser',
    method: 'post',
    params: data,
    headers
  })
}

export function upAdminUser(data) {
  return request({
    url: '/admin/admin/upAdminUser',
    method: 'post',
    data,
    headers
  })
}

export function getTreePowers(data) {
  return request({
    url: '/admin/admin/getTreePowers',
    method: 'post',
    params: data,
    headers
  })
}

export function getUserPowersByLevel(data) {
  return request({
    url: '/admin/admin/getUserPowersByLevel',
    method: 'post',
    params: data,
    headers
  })
}

export function upAdminUserPower(data) {
  return request({
    url: '/admin/admin/upAdminUserPower',
    method: 'post',
    params: data,
    headers
  })
}

export function getGroupChannes(data) {
  return request({
    url: '/admin/admin/getGroupChannes',
    method: 'post',
    params: data,
    headers
  })
}

