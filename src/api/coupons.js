import request from '@/utils/requestKylins'
import {
	authorization
} from '@/utils/auth'

// var id    = JSON.parse(localStorage.getItem('userInfo')).id;
// var token = localStorage.getItem('token');
// const tokenAuth = 'Admin ' + id +'.'+token
// const headers = {
//   'Authorization': tokenAuth
// } // 请求头 header Authorization
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
	'Authorization': tokenAuth
}
// const headers = { 'Authorization': authorization() }

export function getCouponsList(data) {
	return request({
		url: '/robot/coupon/getCouponList',
		method: 'post',
		data,
		headers
	})
}
