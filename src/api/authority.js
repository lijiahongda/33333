import request from '@/utils/requestKylins'
import { authorization } from '@/utils/auth'

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
// const headers = { 'Authorization': authorization() }

export function getPowers(data) {
  return request({
    url: '/admin/admin/getPowers',
    method: 'post',
    params: data,
    headers
  })
}

export function getPower(data) {
  return request({
    url: '/admin/admin/getPower',
    method: 'post',
    params: data,
    headers
  })
}

export function addPower(data) {
  return request({
    url: '/admin/admin/addPower',
    method: 'post',
    params: data,
    headers
  })
}

export function updatePower(data) {
  return request({
    url: '/admin/admin/upPower',
    method: 'post',
    params: data,
    headers
  })
}

export function getLevelPowers(data) {
  return request({
    url: '/admin/admin/getLevelPowers',
    method: 'post',
    params: data,
    headers
  })
}
