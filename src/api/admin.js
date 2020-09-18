import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from '@/store'

// var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).id : localstrage = ''
// const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
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
export function getAdminUsers(data) {
  return request({
    url: '/admin/admin/getAdminUsers',
    method: 'post',
    headers,
    data
  })
}
export function addAdminUser(data) {
  return request({
    url: '/admin/admin/addAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function upAdminUser(data) {
  return request({
    url: '/admin/admin/upAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function delAdminUser(data) {
  return request({
    url: '/admin/admin/delAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function getAdminUser(data) {
  return request({
    url: '/admin/admin/getAdminUser',
    method: 'post',
    headers,
    data
  })
}
export function getPowers(data) {
  return request({
    url: '/admin/admin/getPowers',
    method: 'post',
    headers,
    data
  })
}
export function getPower(data) {
  return request({
    url: '/admin/admin/getPower',
    method: 'post',
    headers,
    data
  })
}
export function addPower(data) {
  return request({
    url: '/admin/admin/addPower',
    method: 'post',
    headers,
    data
  })
}
export function upPower(data) {
  return request({
    url: '/admin/admin/upPower',
    method: 'post',
    headers,
    data
  })
}
export function delPower(data) {
  return request({
    url: '/admin/admin/delPower',
    method: 'post',
    headers,
    data
  })
}
export function getTreePowers(data) {
  return request({
    url: '/admin/admin/getTreePowers',
    method: 'post',
    headers,
    data
  })
}
export function getRoles(data) {
  return request({
    url: '/admin/admin/getRoles',
    method: 'post',
    headers,
    data
  })
}
export function getRole(data) {
  return request({
    url: '/admin/admin/getRole',
    method: 'post',
    headers,
    data
  })
}
export function addRole(data) {
  return request({
    url: '/admin/admin/addRole',
    method: 'post',
    headers,
    data
  })
}
export function upRole(data) {
  return request({
    url: '/admin/admin/upRole',
    method: 'post',
    headers,
    data
  })
}
export function delRole(data) {
  return request({
    url: '/admin/admin/delRole',
    method: 'post',
    headers,
    data
  })
}
export function getUserPowers(data, header) {
  return request({
    url: '/admin/admin/getLeftUserPowers',
    method: 'post',
    headers: header,
    data
  })
}
export function getDepartments(data) {
  return request({
    url: '/admin/admin/getDepartments',
    method: 'post',
    headers,
    data
  })
}
export function getDepartment(data) {
  return request({
    url: '/admin/admin/getDepartment',
    method: 'post',
    headers,
    data
  })
}
export function addDepartment(data) {
  return request({
    url: '/admin/admin/addDepartment',
    method: 'post',
    headers,
    data
  })
}
export function upDepartment(data) {
  return request({
    url: '/admin/admin/upDepartment',
    method: 'post',
    headers,
    data
  })
}
export function departmentId(data) {
  return request({
    url: '/admin/admin/departmentId',
    method: 'post',
    headers,
    data
  })
}
export function delDepartment(data) {
  return request({
    url: '/admin/admin/delDepartment',
    method: 'post',
    headers,
    data
  })
}
export function getPositions(data) {
  return request({
    url: '/admin/admin/getPositions',
    method: 'post',
    headers,
    data
  })
}
export function getPosition(data) {
  return request({
    url: '/admin/admin/getPosition',
    method: 'post',
    headers,
    data
  })
}
export function addPosition(data) {
  return request({
    url: '/admin/admin/addPosition',
    method: 'post',
    headers,
    data
  })
}
export function upPosition(data) {
  return request({
    url: '/admin/admin/upPosition',
    method: 'post',
    headers,
    data
  })
}
export function delPosition(data) {
  return request({
    url: '/admin/admin/delPosition',
    method: 'post',
    headers,
    data
  })
}
// 新建供应商-部门
export function getDepartmentsMenu(data) {
  return request({
    url: '/admin/admin/getDepartmentsMenu',
    method: 'post',
    headers,
    data
  })
}
// 新建供应商-部门
export function getSplDepartmentsMenu(data) {
  return request({
    url: '/admin/admin/getSplDepartmentsMenu',
    method: 'post',
    headers,
    data
  })
}

export function getPositionsMenu(data) {
  return request({
    url: '/admin/admin/getPositionsMenu',
    method: 'post',
    headers,
    data
  })
}
export function getLevelPowers(data) {
  return request({
    url: '/admin/admin/getLevelPowers',
    method: 'post',
    headers,
    data
  })
}
export function getPushs(data) {
  return request({
    url: '/admin/admin/getPushs',
    method: 'post',
    headers,
    data
  })
}
export function getPush(data) {
  return request({
    url: '/admin/admin/getPush',
    method: 'post',
    headers,
    data
  })
}
export function addPush(data) {
  return request({
    url: '/admin/admin/addPush',
    method: 'post',
    headers,
    data
  })
}
export function upPush(data) {
  return request({
    url: '/admin/admin/upPush',
    method: 'post',
    headers,
    data
  })
}
export function delPush(data) {
  return request({
    url: '/admin/admin/delPush',
    method: 'post',
    headers,
    data
  })
}
export function pushMessage(data) {
  return request({
    url: '/admin/admin/pushMessage',
    method: 'post',
    headers,
    data
  })
}
export function pushMessageType(data) {
  return request({
    url: '/admin/admin/pushMessageType',
    method: 'post',
    headers,
    data
  })
}

export function getMembers(data) {
  return request({
    url: '/member/info/list.json',
    method: 'post',
    headers,
    data
  })
}

export function addPushGroupUser(data) {
  return request({
    url: '/admin/admin/addPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function getPushGroupUsers(data) {
  return request({
    url: '/admin/admin/getPushGroupUsers',
    method: 'post',
    headers,
    data
  })
}

export function getPushGroupUser(data) {
  return request({
    url: '/admin/admin/getPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function upPushGroupUser(data) {
  return request({
    url: '/admin/admin/upPushGroupUser',
    method: 'post',
    headers,
    data
  })
}

export function getShortMessages(data) {
  return request({
    url: '/admin/admin/getShortMessages',
    method: 'post',
    headers,
    data
  })
}

export function getShortMessage(data) {
  return request({
    url: '/admin/admin/getShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function upShortMessage(data) {
  return request({
    url: '/admin/admin/upShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function addShortMessage(data) {
  return request({
    url: '/admin/admin/addShortMessage',
    method: 'post',
    headers,
    data
  })
}

export function pushShortMessageType(data) {
  return request({
    url: '/admin/admin/pushShortMessageType',
    method: 'post',
    headers,
    data
  })
}

export function getShortUrl(data) {
  return request({
    url: '/admin/admin/getShortUrl',
    method: 'post',
    headers,
    data
  })
}

export function getUserPowersList(data) {
  return request({
    url: '/robot/user/getUserPowersList',
    method: 'post',
    headers,
    data
  })
}