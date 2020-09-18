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
export function hotelList(data) {
  return request({
    url: '/hotel/order/list.json',
    method: 'post',
    headers,
    data
  })
}

/**
 * 一小时未确认列表接口
 * */
export function hotelOneList(data) {
  return request({
    url: '/hotel/order/hotelOneList',
    method: 'post',
    headers,
    data
  })
}

/**
 * 列表接口
 * */
export function hotelDetail(par) {
  return request({
    url: '/hotel/order/list.json',
    method: 'get',
    headers
  })
}

// 酒店订单详情
export function getDetailInfo(data) {
  return request({
    url: '/hotel/order/detail.json',
    method: 'post',
    headers,
    data
  })
}

// 商城订单列表
export function mallOrderList(data) {
  return request({
    url: '/mall/order/list.json',
    method: 'post',
    headers,
    data
  })
}
// 商城订单详情
export function mallOrderInfo(data) {
  return request({
    url: '/mall/order/detail.json',
    method: 'post',
    headers,
    data
  })
}

// 商城订单列表页
export function mallList(data) {
  return request({
    url: '/mall/order/statistics.json',
    method: 'post',
    headers,
    data
  })
}
// 商城商品维度列表页
export function mallDimensionList(data) {
  return request({
    url: '/mall/order/orderGoodsList.json',
    method: 'post',
    headers,
    data
  })
}

// 商城渠道维度列表页
export function mallchannelList(data) {
  return request({
    url: '/mall/order/channel.json',
    method: 'post',
    headers,
    data
  })
}

// 商城商品维度详情页
export function mallDimensionInfo(data) {
  return request({
    url: '/mall/order/orderGoodsDetail.json ',
    method: 'post',
    headers,
    data
  })
}

// 商城渠道维度详情页
export function mallchannelInfo(data) {
  return request({
    url: '/mall/order/channelDetail.json',
    method: 'post',
    headers,
    data
  })
}
export function hotelDoSureOrder(data) {
  return request({
    url: '/hotel/order/hotelDoSureOrder.json',
    method: 'post',
    headers,
    data
  })
}
export function hotelIntoRoom(data) {
  return request({
    url: '/hotel/order/hotelIntoRoom.json',
    method: 'post',
    headers,
    data
  })
}
export function hotelNoCancel(data) {
  return request({
    url: '/hotel/order/hotelNoCancel.json',
    method: 'post',
    headers,
    data
  })
}
