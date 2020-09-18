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

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} // 请求头 header Authorization

// const headers = {
//   'Authorization': authorization()
// }

export function getBrands(data) {
  return request({
    url: '/admin/admin/getBrands',
    method: 'post',
    params: data,
    headers
  })
}
export function getBrand(data) {
  return request({
    url: '/admin/admin/getBrand',
    method: 'post',
    params: data,
    headers
  })
}
export function addBrand(data) {
  return request({
    url: '/admin/admin/addBrand',
    method: 'post',
    params: data,
    headers
  })
}
export function upBrand(data) {
  return request({
    url: '/admin/admin/upBrand',
    method: 'post',
    params: data,
    headers
  })
}

export function getMallChannels(data) {
  return request({
    url: '/admin/admin/getMallChannels',
    method: 'post',
    params: data,
    headers
  })
}

export function getCategorys(data) {
  return request({
    url: '/admin/admin/getCategorys',
    method: 'post',
    params: data,
    headers
  })
}

export function addCategory(data) {
  return request({
    url: '/admin/admin/addCategory',
    method: 'post',
    params: data,
    headers
  })
}

export function upSupplierIsCheck(data) {
  return request({
    url: '/admin/admin/upSupplierIsCheck',
    method: 'post',
    params: data,
    headers
  })
}

export function updateIsCheck(data) {
  return request({
    url: '/admin/admin/updateIsCheck',
    method: 'post',
    params: data,
    headers
  })
}

export function upCategory(data) {
  return request({
    url: '/admin/admin/upCategory',
    method: 'post',
    params: data,
    headers
  })
}

export function getCategory(data) {
  return request({
    url: '/admin/admin/getCategory',
    method: 'post',
    params: data,
    headers
  })
}

export function getCategoryTree(data) {
  return request({
    url: '/admin/admin/getCategoryTree',
    method: 'post',
    params: data,
    headers
  })
}


export function getSuppliers(data) {
  return request({
    url: '/admin/admin/getSuppliers',
    method: 'post',
    params: data,
    headers
  })
}

export function getSupplier(data) {
  return request({
    url: '/admin/admin/getSupplier',
    method: 'post',
    params: data,
    headers
  })
}

export function getSupplierInfo(data,headers) {
  return request({
    url: '/admin/admin/getSupplier',
    method: 'post',
    params: data,
    headers
  })
}

export function addSupplier(data) {
  return request({
    url: '/admin/admin/addSupplier',
    method: 'post',
    params: data,
    headers
  })
}

export function upSupplier(data) {
  return request({
    url: '/admin/admin/upSupplier',
    method: 'post',
    params: data,
    headers
  })
}

export function getLabels(data) {
  return request({
    url: '/admin/admin/getLabels',
    method: 'post',
    params: data,
    headers
  })
}

export function getProducts(data) {
  return request({
    url: '/admin/admin/getProducts',
    method: 'post',
    params: data,
    headers
  })
}

export function createSupplierNumber(data) {
  return request({
    url: '/admin/admin/createSupplierNumber',
    method: 'post',
    params: data,
    headers
  })
}

export function getLabes(data) {
  return request({
    url: '/admin/admin/getLabes',
    method: 'post',
    params: data,
    headers
  })
}

export function getGood(data) {
  return request({
    url: '/admin/admin/getProduct',
    method: 'post',
    params: data,
    headers
  })
}

export function updateGood(data) {
  return request({
    url: '/admin/admin/upProduct',
    method: 'post',
    params: data,
    headers
  })
}

export function addGoods(data) {
  return request({
    url: '/admin/admin/addProduct',
    method: 'post',
    params: data,
    headers
  })
}

export function updateGoodSku(data) {
  // data.sku = qs.stringify(data.sku,{arrayFormat:"repeat"})
  return request({
    url: '/admin/admin/updateGoodSku',
    method: 'post',
    params: data, //qs.stringify(data),
    headers
  })
}

export function addGoodSku(data) {
  return request({
    url: '/admin/admin/addGoodSku',
    method: 'post',
    params: data,
    headers
  })
}

export function updateIsOnline(data) {
  return request({
    url: '/admin/admin/updateIsOnline',
    method: 'post',
    params: data,
    headers
  })
}
/***
 * ypt  邻居团
 */

 export function getSelectProductLibraryList(data) {
  return request({
    url: '/admin/admin/getSelectProductLibraryList',
    method: 'post',
    data,
    headers
  })
}
export function syncLjtProduct(data){
  return request({
    url: '/admin/admin/syncLjtProduct',
    method: 'post',
    data,
    headers
  })
}
export function delProductLibrary(data){
  return request({
    url: '/admin/admin/delProductLibrary',
    method: 'post',
    data,
    headers
  })
}
export function updProductLibrary(data){
  return request({
    url: '/admin/admin/updProductLibrary',
    method: 'post',
    data,
    headers
  })
}
export function getSelectType(data){
  return request({
    url: '/admin/admin/getSelectType',
    method: 'post',
    data,
    headers
  })
}
export function selectProductLibrary(data){
  return request({
    url: '/admin/admin/selectProductLibrary',
    method: 'post',
    data,
    headers
  })
}
export function getProductSelect(data){
  return request({
    url: '/admin/admin/getProductSelect',
    method: 'post',
    data,
    headers
  })
}
export function getSelectProductLibrary(data){
  //获取单个选品的接口
  return request({
    url: '/admin/admin/getSelectProductLibrary',
    method: 'post',
    data,
    headers
  })
}


