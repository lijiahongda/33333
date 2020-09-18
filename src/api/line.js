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
/**
 * 列表接口
 * */
export function lineClass(page, num) {
  return request({
    url: '/tours/classify/list/' + page + '/' + num,
    method: 'get',
    headers,
    params: ''
  })
}
/**
 * 添加删除接口
 * */
export function editClass(data) {
  return request({
    url: '/tours/classify/save',
    method: 'post',
    headers,
    data
  })
}
/**
 *
 * */
export function classification(data) {
  return request({
    url: '/tours/group/classify/list?level=' + data,
    method: 'get',
    headers
  })
}
// 线路列表
export function lineList(data) {
  return request({
    url: '/line/order/list.json',
    method: 'post',
    headers,
    data
  })
}
// 线路详情
export function lineDetails(data) {
  return request({
    url: '/line/order/detail.json',
    method: 'post',
    data
  })
}
// 供应商列表
export function supplierList(data) {
  return request({
    url: '/line/order/supplier.json',
    method: 'get',
    data
  })
}
