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
 *
 * @param {getTypeList}  // 文章管理 => 消息类型select
 * @param {getLlist} //文章列表
 * @param {detailOption} //获取文章详情
 * @param {deleteArticl} //删除文件管理
 * @param {updateArticl} //更新文件
 * @param {createdArticl} //创建文件
 */
export function getTypeList(data) {
  return request({
    url: '/api/university/record/getTypeList',
    method: 'get',
    params: '',
    headers
  })
}

export function getLlist(data) {
  return request({
    url: '/api/university/record/list/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function detailOption(data) {
  return request({
    url: '/api/university/record/detail/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function deleteArticl(data) {
  return request({
    url: '/api/university/record/delete/',
    method: 'post',
    headers,
    data
  })
}

export function updateArticl(data) {
  return request({
    url: '/api/university/record/modify/',
    method: 'post',
    headers,
    data
  })
}

export function createdArticl(data) {
  return request({
    url: '/api/university/record/create/',
    method: 'post',
    headers,
    data
  })
}
export function columnManagement(data) {
  return request({
    url: '/api/university/type/list/' +data,
    method: 'get',
    headers,
  })
}
export function AddColum(data) {
  return request({
    url: '/api/university/type/create/',
    method: 'post',
    headers,
    data
  })
}
export function modifyColumn(data) {
  return request({
    url: '/api/university/type/modify',
    method: 'post',
    headers,
    data
  })
}
export function DeleteColumn(data) {
  return request({
    url: '/api/university/type/delete',
    method: 'post',
    headers,
    data
  })
}
export function DetailsColumn(data) {
  return request({
    url: '/api/university/type/detail/'+data,
    method: 'get',
    headers,
  })
}

export function modifyDisplayOrder(data) {
  return request({
    url: '/api/university/type/modifyDisplayOrder',
    method: 'post',
    headers,
		data
  })
}
export function modifyIndexShow(data) {
  return request({
    url: '/api/university/type/modifyIndexShow/',
    method: 'post',
    headers,
		data
  })
}
export function setTypeBannerAid(data) {
  return request({
    url: '/api/university/record/setTypeBannerAid/',
    method: 'post',
    headers,
		data
  })
}
export function getLevelList(data) {
  return request({
    url: '/api/university/type/getLevelList/' +data,
    method: 'get',
    headers,
  })
}

export function setArticleIsOnline(data) {
  return request({
    url: '/api/university/record/setArticleIsOnline/',
    method: 'post',
    headers,
    data
  })
}

export function setArticleLikeNum(data) {
  return request({
    url: '/api/university/record/setArticleLikeNum/',
    method: 'post',
    headers,
    data
  })
}

export function setArticleDownNum(data) {
  return request({
    url: '/api/university/record/setArticleDownNum/',
    method: 'post',
    headers,
    data
  })
}


