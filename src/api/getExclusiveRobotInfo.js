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
 * 用户查询
 * */
export function getRobotInfo(data) {
	return request({
		url: '/robot/service/getExclusiveRobotInfo',
		method: 'post',
		headers,
		data
	})
}
// 数据统计
export function dataStatistics(data) {
	return request({
		url: '/robot/info/dataExclusiveStatistics',
		method: 'post',
		headers,
		data
	})
}
//群列表
export function groupAdminStatistics(data) {
	return request({
		url: '/robot/info/groupExclusiveAdminStatistics',
		method: 'post',
		headers,
		data
	})
}
