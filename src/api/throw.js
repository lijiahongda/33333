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

export function getThrowList(data) {
  return request({
    url: '/mall/v1/mall/getSalesLeads',
    method: 'post',
    headers,
    data
  })
}

export function addRemark(data) {
  return request({
    url: '/mall/v1/mall/addSalesLeadRemark',
    method: 'post',
    headers,
    data
  })
}
export function getPutInChannels(data) {
  return request({
    url: '/mall/v1/mall/getPutInChannels',
    method: 'post',
    headers,
    data
  })
}
export function addExtensionSupplier(data) {
  return request({
    url: '/mall/v1/mall/addExtensionSupplier',
    method: 'post',
    headers,
    data
  })
}
export function upExtensionSupplier(data) {
  return request({
    url: '/mall/v1/mall/upExtensionSupplier',
    method: 'post',
    headers,
    data
  })
}
export function getExtensionSupplier(data) {
  return request({
    url: '/mall/v1/mall/getExtensionSupplier',
    method: 'post',
    headers,
    data
  })
}
export function addPutInChannel(data) {
  return request({
    url: '/mall/v1/mall/addPutInChannel',
    method: 'post',
    headers,
    data
  })
}
export function upPutInChannel(data) {
  return request({
    url: '/mall/v1/mall/upPutInChannel',
    method: 'post',
    headers,
    data
  })
}
export function getPutInChannel(data) {
  return request({
    url: '/mall/v1/mall/getPutInChannel',
    method: 'post',
    headers,
    data
  })
}
export function getSuppliers(data) {
  return request({
    url: '/mall/v1/mall/getSuppliers',
    method: 'post',
    headers,
    data
  })
}

export function getPutInBUserList(data) {
  return request({
    url: '/mall/v1/mall/getPutInBUserList',
    method: 'post',
    headers,
    data
  })
}


