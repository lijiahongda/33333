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
 *  // 商户管理
 * @param {supplierList}  // 营销活动 => 商户管理列表
 * @param {createSupplier}  // 营销活动 => 商户管理添加信息
 * @param {updateSupplier}  // 营销活动 => 商户管理编辑信息
 * @param {deleteSupplier}  // 营销活动 => 商户管理删除信息
 * 
 * 
 * @param {couponNewlyIncreased}  // 营销活动 => 新增优惠劵
 * @param {updateCoupon}  // 营销活动 => 编辑优惠劵
 * @param {couponDetail}  // 营销活动 => 回显优惠劵
 * 
 * 
 * @param {selectCoupon}  // 营销活动 => 优惠列表信息
 * @param {switchCoupon}  // 营销活动 =>  关闭券
 * @param {sendCoupon}  // 营销活动 => 发送券
 * @param {custPosturl} //定制游管理 => 查看更新
 * @param {custGetUrl} //定制游管理 => 查看更新 =>获取信息
 * 
 */
/**
 * 列表接口
 * */
export function supplierList(data) {
  return request({
    url: 'mall/shop/supplierList',
    method: 'post',
    headers
  })
}
export function createSupplier(data) {
  return request({
    url: 'mall/shop/createSupplier',
    method: 'post',
    headers,
		data
  })
}
export function updateSupplier(data) {
  return request({
    url: 'mall/shop/updateSupplier',
    method: 'post',
    headers,
		data
  })
}
export function deleteSupplier(data) {
  return request({
    url: 'mall/shop/deleteSupplier',
    method: 'post',
    headers,
		data
  })
}
export function couponNewlyIncreased(data) {
  return request({
    url: 'mall/coupon/addCoupon',
    method: 'post',
    headers,
		data
  })
}
export function updateCoupon(data) {
  return request({
    url: 'mall/coupon/updateCoupon',
    method: 'post',
    headers,
		data
  })
}
export function couponDetail(data) {
  return request({
    url: 'mall/coupon/couponDetail'+data,
    method: 'get',
    headers
  })
}
export function selectCoupon(data) {
  return request({
    url: 'mall/coupon/selectCoupon',
    method: 'post',
    headers,
		data
  })
}
export function switchCoupon(data) {
  return request({
    url: 'mall/coupon/switchCoupon',
    method: 'post',
    headers,
		data
  })
}
export function sendCoupon(data) {
  return request({
    url: 'mall/coupon/sendCoupon',
    method: 'post',
    headers,
		data
  })
}

