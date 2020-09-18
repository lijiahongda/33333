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
/**  // 定制游
 *
 * @param {custListUrl}  // 定制游管理 => 定制游列表
 * @param {custPosturl} //定制游管理 => 查看更新
 * @param {custGetUrl} //定制游管理 => 查看更新 =>获取信息
 * @param {customizedProductAdd} /查看更新定制游案例 => 定制游案例详情新增保存
 * @param {customizedProductUpload} /查看更新定制游案例 => 定制游案例详情修改
 *
 * @param {getGoods} //新悦商城 => 商品列表
 * @param {getGoodBaseData} //新悦商城 => 商品列表 =>获取分销活动，标签，活动 数据
 * @param {addActivity} //新悦商城 => 添加活动名称
 * @param {updateActivity} //新悦商城 => 更新活动名称
 * @param {deleteActivity} //新悦商城 => 删除活动名称
 * @param {updateGood} //新悦商城 => 新增商品=>更新指定商品
 * @param {addGoods} //新悦商城 => 新增商品=>更新指定商品
 * @param {addGoodSku} //新悦商城 => 新增商品=>商品添加sku
 * @param {updateGoodSku} //新悦商城 => 新增商品=>指定商品数据sku回显
 *
 * @param {getLabels} //新悦商城 => 商品标签列表
 * @param {addLabel} //新悦商城 => 商品标签添加
 * @param {updateLabel} //新悦商城 => 商品标签编辑
 * @param {deleteLabel} //新悦商城 => 商品标签删除
 * @param {addDistribution} //新悦商城 => 分销规则添加
 * @param {getDistributions} //新悦商城 => 分销规则列表
 * @param {deleteDistribution} //新悦商城 => 分销规则删除
 * @param {updateDistribution} //新悦商城 => 分销规则更新
 * @param {addDistribution} //新悦商城 => 分销规则添加
 * 
 * 
 * @param {getSupplier} //新悦商城 => 供应商管理=>获取列表
 * @param {deleteSupplier} //新悦商城 => 供应商管理=>删除某供应商
 * @param {addSupplier} //新悦商城 => 供应商管理=>添加某供应商
 * @param {updateSupplier} //新悦商城 => 供应商管理=>编辑某供应商
 * @param {doUpdateSupplier} //新悦商城 => 供应商管理=>保存编辑供应商
 * @param {getGood} //新悦商城 => 活动规则
 * @param {imgUploadUrl} //图片上传
 * 
 *
 *
/**
 * 列表接口
 * */
export function custListUrl(data) {
  return request({
    url: '/cust/lists' + data,
    method: 'get',
    headers
  })
}

export function custPosturl(data) {
  return request({
    url: '/cust/post',
    method: 'post',
    headers,
    data
  })
}

export function custGetUrl(data) {
  return request({
    url: '/cust/get' + data,
    method: 'get',
    headers
  })
}

export function getSupplier(data) {
  return request({
    url: '/mall/mall/getSupplier',
    method: 'post',
    headers,
		data
  })
}
export function deleteSupplier(data) {
  return request({
    url: '/mall/mall/deleteSupplier',
    method: 'post',
    headers,
		data
  })
}
export function addSupplier(data) {
  return request({
    url: '/mall/mall/addSupplier',
    method: 'post',
    headers,
		data
  })
}
export function updateSupplier(data) {
  return request({
    url: '/mall/mall/updateSupplier',
    method: 'post',
    headers,
		data
  })
}
export function doUpdateSupplier(data) {
  return request({
    url: '/mall/mall/doUpdateSupplier',
    method: 'post',
    headers,
		data
  })
}
export function getGoods(data) {
  return request({
    url: '/mall/v1/mall/getGoods',
    method: 'post',
    headers,
		data
  })
}
export function getGoodBaseData(data) {
  return request({
    url: 'mall/v1/mall/getGoodBaseData',
    method: 'get',
    headers,
    data
  })
}
export function updateGood(data) {
  return request({
    url: '/mall/v1/mall/updateGood',
    method: 'post',
    headers,
    data
  })
}
export function addGoodSku(data) {
  return request({
    url: '/mall/v1/mall/addGoodSku',
    method: 'post',
    headers,
    data
  })
}
export function updateGoodSku(data) {
  return request({
    url: '/mall/v1/mall/updateGoodSku',
    method: 'post',
    headers,
    data
  })
}
export function addGoods(data) {
  return request({
    url: 'mall/v1/mall/addGoods',
    method: 'post',
    headers,
    data
  })
}
export function getActivitys(data) {
  return request({
    url: '/mall/v1/mall/getActivitys',
    method: 'post',
    headers,
    data
  })
}
export function addActivity(data) {
  return request({
    url: '/mall/v1/mall/addActivity',
    method: 'post',
    headers,
    data
  })
}
export function updateActivity(data) {
  return request({
    url: '/mall/v1/mall/updateActivity',
    method: 'post',
    headers,
    data
  })
}
export function deleteActivity(data) {
  return request({
    url: '/mall/v1/mall/deleteActivity',
    method: 'post',
    headers,
    data
  })
}

export function addLabel(data) {
  return request({
    url: '/mall/v1/mall/addLabel',
    method: 'post',
    headers,
    data
  })
}
export function updateLabel(data) {
  return request({
    url: '/mall/v1/mall/updateLabel',
    method: 'post',
    headers,
    data
  })
}
export function getLabels(data) {
  return request({
    url: '/mall/v1/mall/getLabels',
    method: 'post',
    headers,
    data
  })
}
export function deleteLabel(data) {
  return request({
    url: '/mall/v1/mall/deleteLabel',
    method: 'post',
    headers,
    data
  })
}
export function addDistribution(data) {
  return request({
    url: '/mall/v1/mall/addDistribution',
    method: 'post',
    headers,
    data
  })
}
export function getDistributions(data) {
  return request({
    url: '/mall/v1/mall/getDistributions',
    method: 'post',
    headers,
    data
  })
}
export function deleteDistribution(data) {
  return request({
    url: '/mall/v1/mall/deleteDistribution',
    method: 'post',
    headers,
    data
  })
}
export function updateDistribution(data) {
  return request({
    url: '/mall/v1/mall/updateDistribution',
    method: 'post',
    headers,
    data
  })
}
export function getGood(data) {
  return request({
    url: '/mall/v1/mall/getGood'+data,
    method: 'get',
    headers
  })
}
export function imgUploadUrl(data) {
  return request({
    url: '/common/upload',
    method: 'post',
    headers,
		data
  })
}
export function customizedProductUpload(data) {
  return request({
    url: '/customizedProduct/update',
    method: 'post',
    headers,
		data
  })
}
export function customizedProductAdd(data) {
  return request({
    url: '/customizedProduct',
    method: 'post',
    headers,
		data
  })
}

export function customizedProductGetDetails(data) {
  return request({
    url: '/customizedProduct/getDetail' + data,
    method: 'get',
    headers
  })
}
export function customizedProductGetList(data) {
  return request({
    url: '/customizedProduct/getList' + data,
    method: 'get',
    headers
  })
}
