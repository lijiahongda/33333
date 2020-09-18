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
 * @param {combinationsList}  // 汇店管理 => 拼团列表
 * @param {combinationsLists} //获取拼团详情
 * @param {updateCombination} //拼团活动编辑
 * @param {addCombination} //添加拼团
 * @param {bargainsList} //砍价列表
 * @param {teamList} //活动记录
 * @param {getTypeList} //文章类型
 * @param {articlList} //文章列表
 * @param {articlLists} //获取文章详情
 * @param {checkList} //文章审核
 * @param {getGoods} //选择商品列表
 * @param {checkDetail} //查看文章内容
 * @param {getBargain} //查看砍价详情
 * @param {deleteArticl} //删除文章
 * @param {updateArticl} //文章上下架
 * @param {addArticlType} //添加文章类型
 * @param {updateArticlType} //修改文章类型
 * @param {deleteArticlType} //删除文章类型
 * @param {checkArticl} //文章审核
 * @param {updateBargain} //修改砍价
 * @param {addBargain} //添加砍价
 * @param {updateBargainSort} //砍价列表顺序
 * @param {updateCombinationSort} //拼团列表顺序
 * @param {getCombinationsCal} //拼团统计
 */

export function creatOrder(data) {
  return request({
    url: '/robot/order/getOrder',
    method: 'post',
    headers,
    data
  })
}

export function buyNow(data) {
  return request({
    url: '/robot/service/getRobotServiceList',
    method: 'post',
    headers,
    data
  })
}

export function combinationsList(data) {
  return request({
    url: '/mall/v1/mall/getCombinations',
    method: 'post',
    headers,
    data
  })
}

export function combinationsLists(data) {
  return request({
    url: '/mall/v1/mall/getCombination',
    method: 'get',
    headers,
    params: data
  })
}

export function getBargain(data) {
  return request({
    url: '/mall/v1/mall/getBargain',
    method: 'get',
    headers,
    params: data
  })
}

export function bargainsList(data) {
  return request({
    url: '/mall/v1/mall/getBargains',
    method: 'post',
    headers,
    data
  })
}

export function checkDetail(data) {
  return request({
    url: '/api/article/huidian/getCheckDetail',
    method: 'get',
    headers,
    params: data
  })
}

export function teamList(data) {
  return request({
    url: '/mall/v1/mall/getTeam',
    method: 'post',
    headers,
    data
  })
}

export function getTypeList(data) {
  return request({
    url: '/api/article/type/getTypeList',
    method: 'post',
    headers,
    data
  })
}

export function articlList(data) {
  return request({
    url: '/api/article/huidian/getArticles',
    method: 'post',
    headers,
    data
  })
}

export function articlLists(data) {
  return request({
    url: '/api/article/huidian/getArticle',
    method: 'get',
    headers,
    params: data
  })
}

export function checkList(data) {
  return request({
    url: '/api/article/huidian/getCheckList',
    method: 'post',
    headers,
    data
  })
}

export function tabGoods(data) {
  return request({
    url: '/mall/v1/mall/getTabGoods',
    method: 'post',
    headers,
    data
  })
}

export function updateCombination(data) {
  return request({
    url: '/mall/v1/mall/updateCombination',
    method: 'post',
    headers,
    data
  })
}

export function addCombination(data) {
  return request({
    url: '/mall/v1/mall/addCombination',
    method: 'post',
    headers,
    data
  })
}

export function deleteArticl(data) {
  return request({
    url: '/api/article/huidian/deleteArticle',
    method: 'post',
    headers,
    data
  })
}

export function updateState(data) {
  return request({
    url: '/api/article/huidian/updateState',
    method: 'post',
    headers,
    data
  })
}

export function updateArticl(data) {
  return request({
    url: '/api/article/huidian/updateArticle',
    method: 'post',
    headers,
    data
  })
}

export function addArticl(data) {
  return request({
    url: '/api/article/huidian/addArticle',
    method: 'post',
    headers,
    data
  })
}

export function updateArticlType(data) {
  return request({
    url: '/api/article/type/modify',
    method: 'post',
    headers,
    data
  })
}

export function addArticlType(data) {
  return request({
    url: '/api/article/type/create',
    method: 'post',
    headers,
    data
  })
}

export function deleteArticlType(data) {
  return request({
    url: '/api/article/type/delete',
    method: 'post',
    headers,
    data
  })
}

export function checkArticl(data) {
  return request({
    url: '/api/article/huidian/updateCheckResult',
    method: 'post',
    headers,
    data
  })
}

export function updateBargain(data) {
  return request({
    url: '/mall/v1/mall/updateBargain',
    method: 'post',
    headers,
    data
  })
}

export function addBargain(data) {
  return request({
    url: '/mall/v1/mall/addBargain',
    method: 'post',
    headers,
    data
  })
}

export function updateBargainSort(data) {
  return request({
    url: '/mall/v1/mall/updateBargainSort',
    method: 'post',
    headers,
    data
  })
}

export function updateCombinationSort(data) {
  return request({
    url: '/mall/v1/mall/updateCombinationSort',
    method: 'post',
    headers,
    data
  })
}
export function getCombinationsCal(data) {
  return request({
    url: '/mall/v1/mall/getCombinationsCal',
    method: 'post',
    headers,
    data
  })
}

export function groupgroupList(data) {
  return request({
    url: '/robot/group/groupList',
    method: 'post',
    headers,
    data
  })
}

// 去支付
export function ordergetPay(data) {
  return request({
    url: '/robot/order/getPay',
    method: 'post',
    headers,
    data
  })
}

// 检测支付是否成功
export function getPayInfo(data) {
  return request({
    url: '/robot/order/getPayInfo',
    method: 'post',
    headers,
    data
  })
}

// 支付成功后创建群
export function createGroup(data) {
  return request({
    url: '/robot/group/createGroup',
    method: 'post',
    headers,
    data
  })
}