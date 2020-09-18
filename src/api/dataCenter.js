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
// 统计供应商维度信息
export function supplier() {
  return request({
    url: '/line/order/supplierCount.json',
    method: 'get',
    headers,
    params: ''
  })
}

// 统计时间维度信息
export function supplierTime(id) {
  return request({
    url: '/line/order/supplierDateCount.json',
    method: 'get',
    headers,
    params: id
  })
}
// 用户统计
export function analysisList(data) {
  return request({
    url: '/member/info/analysis/list.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店数据统计
export function statistics(data) {
  return request({
    url: '/hotel/order/statistics.json',
    method: 'post',
    headers,
    data
  })
}
// 酒店维度统计-城市维度
export function hotelCityStatistics(data) {
  return request({
    url: '/hotel/order/hotelCityStatistics.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店维度统计-酒店维度
export function hotelStatistics(data) {
  return request({
    url: '/hotel/order/hotelStatistics.json',
    method: 'post',
    headers,
    data
  })
}

// 酒店维度统计-渠道维度
export function hotelSourceStatistic(data) {
  return request({
    url: '/hotel/order/hotelSourceStatistic.json',
    method: 'post',
    headers,
    data
  })
}

// 奖金明细
export function bonusList(data) {
  return request({
    url: '/member/info/bonus/list.json',
    method: 'post',
    headers,
    data
  })
}

// 奖金明细
export function cashList(data) {
  return request({
    url: '/member/info/cash/list.json',
    method: 'post',
    headers,
    data
  })
}
