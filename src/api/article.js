import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from "@/store"
// var localstrage = JSON.parse(localStorage.getItem('userInfo'))?localstrage =JSON.parse(localStorage.getItem('userInfo')).adminUserId :localstrage='';
// const tokenAuth = 'Admin ' +localstrage +'.'+localStorage.getItem('token')
// const headers = {
//   'Authorization': tokenAuth
// } // 请求头 header Authorization
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} 

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    headers,
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    headers,
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    headers,
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    headers,
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    headers,
    data
  })
}

// 精英卡列表
export function getJYKList(data) {
  return request({
    url: '/card/order/list.json',
    method: 'post',
    headers,
    data
  })
}

// 用户中心
export function userList(data) {
  return request({
    url: '/member/info/list.json',
    method: 'post',
    headers,
    data
  })
}
