import request from '@/utils/request'
import {
	authorizationVue
} from '@/utils/authorization'
import store from '@/store'

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
const headers = {
	'Authorization': tokenAuth
} // 请求头 header Authorization

/**
 * 获取首页头部数据（总数）
 * */
export function adminIndexTotal(data) {
	return request({
		url: '/robot/info/adminIndexTotal',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取首页头部数据
 * */
export function adminIndex(data) {
	return request({
		url: '/robot/info/adminIndex',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取首页列表数据
 * */
export function admindataStatistics(data) {
	return request({
		url: '/robot/info/dataStatistics',
		method: 'post',
		headers,
		data
	})
}

/**
 * 获取首页表格数据
 * */
export function adminIndexGraph(data) {
	return request({
		url: '/robot/info/adminIndexGraph',
		method: 'post',
		headers,
		data
	})
}
export function getGroupActivity(data) {
	return request({
		url: '/robot/info/getGroupActivity',
		method: 'post',
		headers,
		data
	})
}

/**
 * 获取审核管理列表
 * */
export function getCommunityInvitationGroupList(data) {
	return request({
		url: '/robot/service/verifyList',
		method: 'post',
		headers,
		data
	})
}

/**
 * 审核接口
 * */
export function checkCommunityInvitationGroup(data) {
	return request({
		url: '/robot/service/toExamineGroup',
		method: 'post',
		headers,
		data
	})
}

/**
 * 审核详情
 * */
export function getCommunityInvitationGroupInfo(data) {
	return request({
		url: '/robot/service/verifyGroupInfo',
		method: 'post',
		headers,
		data
	})
}

/**
 * 获取店长审核管理列表
 * */
export function getTwiceCommunityInvitationGroupList(data) {
	return request({
		url: '/robot/service/twiceVerifyList',
		method: 'post',
		headers,
		data
	})
}

/**
 * 店长审核接口
 * */
export function checkTwiceCommunityInvitationGroup(data) {
	return request({
		url: '/robot/service/toTwiceExamineGroup',
		method: 'post',
		headers,
		data
	})
}

/**
 * 店长审核详情
 * */
export function getTwiceCommunityInvitationGroupInfo(data) {
	return request({
		url: '/robot/service/verifyGroupInfo',
		method: 'post',
		headers,
		data
	})
}

/**
 * 机器人列表
 * */
export function getRobotInfo(data) {
	return request({
		url: '/robot/service/getRobotInfo',
		method: 'post',
		headers,
		data
	})
}

/**
 * 机器人列表详情
 * */
export function getRobotStatistics(data) {
	return request({
		url: '/robot/service/getRobotStatistics',
		method: 'post',
		headers,
		data
	})
}

/**
 * 发送验证码
 * */
export function sendMessage(data) {
	return request({
		url: '/user/sendMessage',
		method: 'post',
		headers,
		data
	})
}

/**
 * 修改密码
 * */
export function updatePassword(data) {
	return request({
		url: '/user/updatePassword',
		method: 'post',
		headers,
		data
	})
}

/**
 * 获取品牌名
 * */
export function getBrandData(data) {
	return request({
		url: '/robot/exclusive/getBrandData',
		method: 'post',
		headers,
		data
	})
}
/**
 * 删除申请记录
 * */
export function delapplicationByid(data) {
	return request({
		url: '/robot/exclusive/delapplicationByid',
		method: 'post',
		headers,
		data
	})
}
/**
 * 操作日志
 * */
export function userOperationList(data) {
	return request({
		url: '/robot/info/userOperationList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 角色管理
 * */
export function getUserRoleList(data) {
	return request({
		url: '/robot/user/getUserRoleList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 角色管理删除
 * */
export function delFrontRole(data) {
	return request({
		url: '/robot/user/delFrontRole',
		method: 'post',
		headers,
		data
	})
}
/**
 * 新增角色
 * */
export function addFrontRole(data) {
	return request({
		url: '/robot/user/addFrontRole',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取角色权限
 * */
export function getUserPowersList(data) {
	return request({
		url: '/robot/user/getUserPowersList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取角色信息
 * */
export function getFrontRole(data) {
	return request({
		url: '/robot/user/getFrontRole',
		method: 'post',
		headers,
		data
	})
}
/**
 * 修改角色信息
 * */
export function upFrontRole(data) {
	return request({
		url: '/robot/user/upFrontRole',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取用户列表
 * */
export function getUserLists(data) {
	return request({
		url: '/robot/user/getUserList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取用户分组集合
 * */
export function getGroupAllList(data) {
	return request({
		url: '/robot/user/getGroupAllList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 活用户微信号id
 * */
export function robotWxAlias(data) {
	return request({
		url: '/robot/user/robotWxAlias',
		method: 'post',
		headers,
		data
	})
}
/**
 * 用户新增用户
 * */
export function createFrontUser(data) {
	return request({
		url: '/robot/user/createFrontUser',
		method: 'post',
		headers,
		data
	})
}
/**
 * 获取用户详情
 * */
export function getUserInfo(data) {
	return request({
		url: '/robot/user/getUserInfo',
		method: 'post',
		headers,
		data
	})
}
/**
 * 用户删除
 * */
export function delFrontUser(data) {
	return request({
		url: '/robot/user/delFrontUser',
		method: 'post',
		headers,
		data
	})
}

/**
 * 用户查询
 * */
export function getUserListByName(data) {
	return request({
		url: '/robot/info/getUserListByName',
		method: 'post',
		headers,
		data
	})
}

/**
 * 用户编辑
 * */
export function upFrontUser(data) {
	return request({
		url: '/robot/user/upFrontUser',
		method: 'post',
		headers,
		data
	})
}

/**
 * 获取群成员
 * */
export function getNotBindMemberData(data) {
	return request({
		url: '/robot/group/getNotBindMemberData',
		method: 'post',
		headers,
		data
	})
}
/**
 * 新建群组
 * */
export function addGroupList(data) {
	return request({
		url: '/robot/group/addGroupList',
		method: 'post',
		headers,
		data
	})
}

/**
 * 群组详情
 * */
export function getGroupInfo(data) {
	return request({
		url: '/robot/group/getGroupInfo',
		method: 'post',
		headers,
		data
	})
}

/**
 * 群组更新
 * */
export function upGroupInfo(data) {
	return request({
		url: '/robot/group/upGroupInfo',
		method: 'post',
		headers,
		data
	})
}

/**
 * 删除群组
 * */
export function disbandGroup(data) {
	return request({
		url: '/robot/group/disbandGroup',
		method: 'post',
		headers,
		data
	})
}

/**
 * 群组列表
 * */
export function getGroupList(data) {
	return request({
		url: '/robot/group/getGroupList',
		method: 'post',
		headers,
		data
	})
}