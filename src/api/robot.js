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

// 登录
export function loginByUsername(data) {
	return request({
		url: '/user/login',
		method: 'post',
		headers,
		data
	})
}
// 登出
export function logout(data) {
	return request({
		url: '/user/loginOut',
		method: 'post',
		headers,
		data
	})
}
// 发送验证码
export function sendMessage(data) {
	return request({
		url: '/user/sendMessage',
		method: 'post',
		headers,
		data
	})
}
// 注册
export function register(data) {
	return request({
		url: '/user/register',
		method: 'post',
		headers,
		data
	})
}
// 素材列表
export function materialList(data) {
	return request({
		url: '/robot/source/getList',
		method: 'post',
		headers,
		data
	})
}
// 素材详情
export function materialInfo(data) {
	return request({
		url: '/robot/source/getInfo',
		method: 'post',
		headers,
		data
	})
}
// 可以发消息的群
export function getRoomList(data) {
	return request({
		url: '/robot/source/getRoomList',
		method: 'post',
		headers,
		data
	})
}
// 添加新的素材
export function addMaterial(data) {
	return request({
		url: '/robot/source/addInfo',
		method: 'post',
		headers,
		data
	})
}
/**
 * qudao
 * */
export function channelTag(data) {
	return request({
		url: '/robot/source/getChannel',
		method: 'post',
		headers,
		data
	})
}
/**
 * 素材类型
 * */
export function typeMaterial(data) {
	return request({
		url: '/robot/source/fodderTypeList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 链接素材类型
 * */
export function typeLinkMaterial(data) {
	return request({
		url: '/robot/source/linkTypeList',
		method: 'post',
		headers,
		data
	})
}
// 添加新的素材
export function upMaterial(data) {
	return request({
		url: '/robot/source/upInfo',
		method: 'post',
		headers,
		data
	})
}
// 删除素材
export function delMaterial(data) {
	return request({
		url: '/robot/source/delInfo',
		method: 'post',
		headers,
		data
	})
}
// 商品列表
export function skuList(data) {
	return request({
		url: '/robot/product/getProductList',
		method: 'post',
		headers,
		data
	})
}
// 数据统计
export function dataStatistics(data) {
	return request({
		url: '/robot/info/dataStatistics',
		method: 'post',
		headers,
		data
	})
}
// 进来未支付弹出
export function userIndex(data) {
	return request({
		url: '/robot/service/userIndex',
		method: 'post',
		headers,
		data
	})
}

// 攻略文章列表获取
export function getArticleList(data) {
	return request({
		url: '/robot/strategy/getArticleList',
		method: 'post',
		headers,
		data
	})
}
// 获取群成员列表
export function groupMemberList(data) {
	return request({
		url: '/robot/info/groupMemberList',
		method: 'post',
		headers,
		data
	})
}
// 新增攻略文章详情
export function getArticle(data) {
	return request({
		url: '/robot/strategy/getArticle',
		method: 'post',
		headers,
		data
	})
}
// 攻略文章删除
export function deleteArticle(data) {
	return request({
		url: '/robot/strategy/deleteArticle',
		method: 'post',
		headers,
		data
	})
}
// 新增攻略文章列表
export function addArticle(data) {
	return request({
		url: '/robot/strategy/addArticle',
		method: 'post',
		headers,
		data
	})
}
// 新增攻略文章列表
export function updateArticle(data) {
	return request({
		url: '/robot/strategy/updateArticle',
		method: 'post',
		headers,
		data
	})
}
// 攻略分类修改
export function updateCategory(data) {
	return request({
		url: '/robot/strategy/updateCategory',
		method: 'post',
		headers,
		data
	})
}
// 攻略分类列表获取
export function getCategoryList(data) {
	return request({
		url: '/robot/strategy/getCategoryList',
		method: 'post',
		headers,
		data
	})
}
// 社群攻略分类添加
export function addCategory(data) {
	return request({
		url: '/robot/strategy/addCategory',
		method: 'post',
		headers,
		data
	})
}
// 攻略分类删除
export function deleteCategory(data) {
	return request({
		url: '/robot/strategy/deleteCategory',
		method: 'post',
		headers,
		data
	})
}
// 攻略文章移除
export function removeArticle(data) {
	return request({
		url: '/robot/strategy/removeArticle',
		method: 'post',
		headers,
		data
	})
}
// 攻略文章移动
export function moveArticle(data) {
	return request({
		url: '/robot/strategy/moveArticle',
		method: 'post',
		headers,
		data
	})
}
// 搜索
export function searchGroupMember(data) {
	return request({
		url: '/robot/info/searchGroupMember',
		method: 'post',
		headers,
		data
	})
}

// 机器人申请记录展示
export function applicationList(data) {
	return request({
		url: '/robot/exclusive/applicationList',
		method: 'post',
		headers,
		data
	})
}
export function ajaxCategoryList(data) {
	return request({
		url: '/robot/strategy/getCategoryList',
		method: 'post',
		headers,
		data
	})
}
// 机器人申请记录添加
export function addApplication(data) {
	return request({
		url: '/robot/exclusive/addApplication',
		method: 'post',
		headers,
		data
	})
}

// 标签列表
export function getTagData(data) {
	return request({
		url: '/robot/service/getTagData',
		method: 'post',
		headers,
		data
	})
}

// 标签修改
export function changeGroupTag(data) {
	return request({
		url: '/robot/service/changeGroupTag',
		method: 'post',
		headers,
		data
	})
}

// 群统计状态修改
export function changeGroupRobotStatus(data) {
	return request({
		url: '/robot/info/changeGroupRobotStatus',
		method: 'post',
		headers,
		data
	})
}

// 关键词列表
export function keyWordsList(data) {
	return request({
		url: '/robot/reply/keyWordsList',
		method: 'post',
		headers,
		data
	})
}

// 关键词列表新增
export function addKeyWords(data) {
	return request({
		url: '/robot/reply/addKeyWords',
		method: 'post',
		headers,
		data
	})
}

// 关键词列表修改
export function updateKeyWords(data) {
	return request({
		url: '/robot/reply/updateKeyWords',
		method: 'post',
		headers,
		data
	})
}

// 记录关键词列表
export function keyWordsListk(data) {
	return request({
		url: '/robot/keyWord/keyWordsList',
		method: 'post',
		headers,
		data
	})
}

// 记录关键词添加
export function addKeyWordsk(data) {
	return request({
		url: '/robot/keyWord/addKeyWords',
		method: 'post',
		headers,
		data
	})
}

// 记录关键词删除
export function deleteKeyWordsk(data) {
	return request({
		url: '/robot/keyWord/deleteKeyWords',
		method: 'post',
		headers,
		data
	})
}

// 关键词列表详情
export function keyWordsDetail(data) {
	return request({
		url: '/robot/keyWord/keyWordsDetail',
		method: 'post',
		headers,
		data
	})
}

// 内容列表
export function keyWordsReplyList(data) {
	return request({
		url: '/robot/reply/keyWordsReplyList',
		method: 'post',
		headers,
		data
	})
}

// 内容列表新增
export function addKeyWordsReply(data) {
	return request({
		url: '/robot/reply/addKeyWordsReply',
		method: 'post',
		headers,
		data
	})
}

// 内容列表编辑
export function updateKeyWordsReply(data) {
	return request({
		url: '/robot/reply/updateKeyWordsReply',
		method: 'post',
		headers,
		data
	})
}

// 内容列表删除
export function deleteKeyWordsReply(data) {
	return request({
		url: '/robot/reply/deleteKeyWordsReply',
		method: 'post',
		headers,
		data
	})
}

// 标签列表
export function canUseTag(data) {
	return request({
		url: '/robot/source/canMyUseTag',
		method: 'post',
		headers,
		data
	})
}

// 获取群主统计
export function groupAdminStatistics(data) {
	return request({
		url: '/robot/info/groupAdminStatistics',
		method: 'post',
		headers,
		data
	})
}

// 获取标签列表
export function getGroupTagList(data) {
	return request({
		url: '/robot/tag/getGroupTagList',
		method: 'post',
		headers,
		data
	})
}
// 获取点击商品标签--拼多多
export function goodsPostList(data) {
	return request({
		url: '/robot/product/getClassList',
		method: 'post',
		headers,
		data
	})
}
// 获取点击商品标签--自营
export function getZyList(data) {
	return request({
		url: '/robot/product/getCategoryList',
		method: 'post',
		headers,
		data
	})
}
// 获取短链
export function getShortLinkUrl(data) {
	return request({
		url: '/robot/product/getShortLinkUrl',
		method: 'post',
		headers,
		data
	})
}

// 添加标签
export function addTag(data) {
	return request({
		url: '/robot/tag/addTag',
		method: 'post',
		headers,
		data
	})
}

// 修改标签
export function updateGroupTag(data) {
	return request({
		url: '/robot/tag/updateGroupTag',
		method: 'post',
		headers,
		data
	})
}

// 删除标签
export function delGroupTag(data) {
	return request({
		url: '/robot/tag/delGroupTag',
		method: 'post',
		headers,
		data
	})
}


// 回复列表
export function intoGroupReplyStyleList(data) {
	return request({
		url: '/robot/reply/intoGroupReplyStyleList',
		method: 'post',
		headers,
		data
	})
}

// 新人回复列表
export function intoGroupReplyList(data) {
	return request({
		url: '/robot/reply/intoGroupReplyList',
		method: 'post',
		headers,
		data
	})
}

// 新人回复列表增加
export function addIntoGroupReply(data) {
	return request({
		url: '/robot/reply/addIntoGroupReply',
		method: 'post',
		headers,
		data
	})
}

// 新人回复 类型列表
export function intoGroupReplyTypeList(data) {
	return request({
		url: '/robot/reply/intoGroupReplyTypeList',
		method: 'post',
		headers,
		data
	})
}

// 新人回复 标签应用到群
export function updateIntoGroupReplyTag(data) {
	return request({
		url: '/robot/reply/updateIntoGroupReplyTag',
		method: 'post',
		headers,
		data
	})
}

// 新人回复 删除列表
export function deleteIntoGroupReply(data) {
	return request({
		url: '/robot/reply/deleteIntoGroupReply',
		method: 'post',
		headers,
		data
	})
}


// 新人回复 修改列表
export function updateIntoGroupReply(data) {
	return request({
		url: '/robot/reply/updateIntoGroupReply',
		method: 'post',
		headers,
		data
	})
}

// 新人回复 问候语修改
export function addIntoGroupGreetingInfo(data) {
	return request({
		url: '/robot/reply/addIntoGroupGreetingInfo',
		method: 'post',
		headers,
		data
	})
}

// 新人回复 问候语获取
export function getIntoGroupGreetingInfo(data) {
	return request({
		url: '/robot/reply/getIntoGroupGreetingInfo',
		method: 'post',
		headers,
		data
	})
}

// 解放皮蛋和肖饶的方法
export function groupMaster(data) {
	return request({
		url: '/robot/info/groupMaster',
		method: 'post',
		headers,
		data
	})
}

// 解放皮蛋和肖饶的方法  根据手机号检索
export function getMemInfoByMobile(data) {
	return request({
		url: '/robot/info/getMemInfoByMobile',
		method: 'post',
		headers,
		data
	})
}

// 解放皮蛋和肖饶的方法  更新
export function bindGroupMid(data) {
	return request({
		url: '/robot/info/bindGroupMid',
		method: 'post',
		headers,
		data
	})
}

// 解放皮蛋和肖饶的方法  更新
export function getUserAdminList(data) {
	return request({
		url: '/robot/info/getUserAdminList',
		method: 'post',
		headers,
		data
	})
}
// 解放皮蛋和肖饶的方法  更新
export function getUserLiveList(data) {
	return request({
		url: '/robot/group/getLiveList',
		method: 'post',
		headers,
		data
	})
}

//商品统计
export function getProductStatistics(data) {
	return request({
		url: '/robot/info/getProductStatistics',
		method: 'post',
		headers,
		data
	})
}


//订单列表
export function getOrderList(data) {
	return request({
		url: '/robot/orderGoods/getOrderList',
		method: 'post',
		headers,
		data
	})
}
//群列表
export function getGroupList(data) {
	return request({
		url: '/robot/group/toCreateGroupList',
		method: 'post',
		headers,
		data
	})
}
//群标签
export function bqList(data) {
	return request({
		url: '/robot/tag/getGroupTagList',
		method: 'post',
		headers,
		data
	})
}
//所属机器人
export function robot(data) {
	return request({
		url: '/robot/group/getRobotList',
		method: 'post',
		headers,
		data
	})
}
//创建群
export function cleartQun(data) {
	return request({
		url: '/robot/group/autoCreateGroup',
		method: 'post',
		headers,
		data
	})
}
//下级好友群
export function lowerLevel(data) {
	return request({
		url: '/robot/group/getLowerMemberList',
		method: 'post',
		headers,
		data
	})
}
//邀请好友
export function InviteFriends(data) {
	return request({
		url: '/robot/group/planFriendsIntoGroup',
		method: 'post',
		headers,
		data
	})
}

//优惠券统计
export function getCouponListStatistics(data) {
	return request({
		url: '/robot/service/getCouponListStatistics',
		method: 'post',
		headers,
		data
	})
}

// 好友机器人列表
export function getFriendRobotList(data) {
	return request({
		url: '/member/friend/getFriendRobotList',
		method: 'post',
		headers,
		data
	})
}

// 识别

export function getTextUrlSeparate(data) {
	return request({
		url: '/robot/source/getTextUrlSeparate',
		method: 'post',
		headers,
		data
	})
}
//商品类型
export function getSelectType(data) {
	return request({
		url: '/robot/source/getSelectType',
		method: 'post',
		headers,
		data
	})
}

//获取 分佣统计
export function getGroupCommission(data){
	return request({
		url: '/robot/info/getGroupAdminCommission',
		method: 'post',
		headers,
		data
	})
}
//获取 分佣统计 everyDay
export function getGroupCommissionEveryDay(data){
	return request({
		url: '/robot/info/getGroupAdminCommissionEveryDay',
		method: 'post',
		headers,
		data
	})
}
