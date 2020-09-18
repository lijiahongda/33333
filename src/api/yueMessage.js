import request from '@/utils/request'

// import {
//   authorizationVue
// } from '@/utils/authorization'

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} // 请求头 header Authorization
/**
 *
 * @param {getTypeList}  // 悦消息 => 消息类型select
 * @param {getLlist} //文章列表
 * @param {detailOption} //获取文章详情
 *
 * @param {msgNewType} //新品上线 => 消息类型select
 * @param {msgNewList} //消息列表
 *
 * @param {msgCreated} //创建悦消息
 * @param {msgUpdated} //修改悦消息
 * @param {msgDeleted} //删除悦消息
 * @param {msgAdd} //添加新品上新
 * @param {msgNewDelete} //删除新品上新
 * @param {msgNewUpdate} //获取新品上线详情
 */
export function getTypeList(data) {
  return request({
    url: '/api/article/type/list',
    method: 'get',
    params: '',
    headers
  })
}

export function getLlist(data) {
  return request({
    url: '/api/article/record/list/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function detailOption(data) {
  return request({
    url: '/api/article/record/detail/' + data,
    method: 'get',
    params: '',
    headers
  })
}

export function msgNewType() {
  return request({
    url: '/msg/article/backType',
    method: 'get',
    params: '',
    headers
  })
}

export function msgNewList(data) {
  return request({
    url: '/msg/article/messageList',
    method: 'get',
    params: data,
    headers
  })
}

export function msgCreated(data) {
  return request({
    url: '/api/article/record/create',
    method: 'post',
    headers,
    data
  })
}

export function msgUpdated(data) {
  return request({
    url: '/api/article/record/modify',
    method: 'post',
    headers,
    data
  })
}

export function msgDeleted(data) {
  return request({
    url: '/api/article/record/delete',
    method: 'post',
    headers,
    data
  })
}

export function msgAdd(data) {
  return request({
    url: '/msg/article/messageAdd',
    method: 'post',
    headers,
    data
  })
}

export function msgNewDelete(data) {
  return request({
    url: '/msg/article/messageDel',
    method: 'get',
    headers,
    params: { aid: data }
  })
}

export function msgNewUpdate(data) {
  return request({
    url: '/msg/article/messageDataBack',
    method: 'get',
    headers,
    params: { aid: data }
  })
}
