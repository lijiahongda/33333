import request from '@/utils/requestKylins'
import {
  authorizationVue
} from '@/utils/authorization'
import store from "@/store"
// var localstrage = JSON.parse(localStorage.getItem('userInfo'))?localstrage =JSON.parse(localStorage.getItem('userInfo')).adminUserId :localstrage='';
// const tokenAuth = 'Admin ' +localstrage +'.'+localStorage.getItem('token')
// const headers = {
//   'Authorization': tokenAuth
// } // 请求头 header Authorization

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} 

// const headers = {
//   'Authorization': authorizationVue(0)
// } // 请求头 header Authorization
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
 * @param {getTabChannels} //获取推广渠道
 * @param {addSeckill} //新增秒杀
 * @param {getSeckill} //获取秒杀详情
 * @param {getSeckills} //获取秒杀列表
 * @param {getCommentList} //获取评论列表
 * @param {dealComment} //审核评论
 * @param {deleteComment} //删除评论
 */
export function updateBargainIsOnline(data) {
  return request({
    url: '/mall/v1/mall/updateBargainIsOnline',
    method: 'POST',
    headers,
		data
  })
}
export function getTabChannels(data) {
  return request({
    url: '/mall/v1/mall/getTabChannels',
    method: 'get',
    headers
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
export function updateDownCombination(data) {
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
export function getSeckill(data) {
  return request({
    url: '/mall/v1/mall/getSeckill' + data,
    method: 'get',
    headers,
  })
}
export function getSeckills(data) {
  return request({
    url: '/mall/v1/mall/getSeckills',
    method: 'post',
    headers,
		data
  })
}
export function updateSeckill(data) {
  return request({
    url: '/mall/v1/mall/updateSeckill',
    method: 'post',
    headers,
		data
  })
}
export function addSeckill(data) {
  return request({
    url: '/mall/v1/mall/addSeckill',
    method: 'post',
    headers,
		data
  })
}
export function updateSeckillIsOnline(data) {
  return request({
    url: '/mall/v1/mall/updateSeckillIsOnline',
    method: 'post',
    headers,
		data
  })
}
export function deleteSeckillIGood(data) {
  return request({
    url: '/mall/v1/mall/deleteSeckillIGood',
    method: 'post',
    headers,
		data
  })
}
export function addActivitie(data) {
  return request({
    url: '/mall/v1/mall/addActivitie',
    method: 'post',
    headers,
		data
  })
}
export function updateActivitie(data) {
  return request({
    url: '/mall/v1/mall/updateActivitie',
    method: 'post',
    headers,
		data
  })
} 
export function getActivitie(data) {
  return request({
    url: '/mall/v1/mall/getActivitie' +data,
    method: 'get',
    headers,
  })
}
export function getActivities(data) {
  return request({
    url: '/mall/v1/mall/getActivities',
    method: 'post',
    headers,
		data
  })
}
export function deleteActivitieGood(data) {
  return request({
    url: '/mall/v1/mall/deleteActivitieGood',
    method: 'post',
    headers,
		data
  })
}
export function deleteActivities(data) {
  return request({
    url: '/mall/v1/mall/deleteActivities',
    method: 'post',
    headers,
		data
  })
}
export function addIntegralStore(data) {
  return request({
    url: '/mall/v1/mall/addIntegralStore',
    method: 'post',
    headers,
		data
  })
}
export function updateIntegralStore(data) {
  return request({
    url: '/mall/v1/mall/updateIntegralStore',
    method: 'post',
    headers,
		data
  })
} 
export function getIntegralStore(data) {
  return request({
    url: '/mall/v1/mall/getIntegralStore'+data,
    method: 'get',
    headers,
  })
}
export function getIntegralStores(data) {
  return request({
    url: '/mall/v1/mall/getIntegralStores',
    method: 'post',
    headers,
		data
  })
}
export function updateIntegralStoreIsOnline(data) {
  return request({
    url: '/mall/v1/mall/updateIntegralStoreIsOnline',
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
export function updateDistribution(data) {
  return request({
    url: '/mall/v1/mall/updateDistribution',
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
export function getGoodsDistribution(data) {
  return request({
    url: '/mall/v1/mall/getGoodsDistribution',
    method: 'post',
    headers,
		data
  })
}

// 商城
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
export function getGood(data) {
  return request({
    url: '/mall/v1/mall/getGood'+data,
    method: 'get',
    headers
  })
}
export function updateIsOnline(data) {
  return request({
    url: '/mall/v1/mall/updateIsOnline',
    method: 'post',
    headers,
		data
  })
}
export function getChannelCategoryList(data) {
  return request({
    url: '/mall/v1/mall/getChannelCategoryList',
    method: 'post',
    headers,
		data
  })
}

// 供应商
export function getSupplier(data) {
  return request({
    url: '/mall/v1/mall/getSupplier',
    method: 'post',
    headers,
		data
  })
}
export function deleteSupplier(data) {
  return request({
    url: '/mall/v1/mall/deleteSupplier',
    method: 'post',
    headers,
		data
  })
}
export function addSupplier(data) {
  return request({
    url: '/mall/v1/mall/addSupplier',
    method: 'post',
    headers,
		data
  })
}
export function updateSupplier(data) {
  return request({
    url: '/mall/v1/mall/updateSupplier',
    method: 'post',
    headers,
		data
  })
}
export function doUpdateSupplier(data) {
  return request({
    url: '/mall/v1/mall/doUpdateSupplier',
    method: 'post',
    headers,
		data
  })
}
export function getSupplierChannelList(data) {
  return request({
    url: '/mall/v1/mall/getSupplierChannelList',
    method: 'post',
    headers,
		data
  })
}
export function getSupplierByChannel(data) {
  return request({
    url: '/mall/v1/mall/getSupplierByChannel',
    method: 'post',
    headers,
		data
  })
}

export function upSupplierPwd(data) {
  return request({
    url: '/mall/v1/mall/upSupplierPwd',
    method: 'post',
    headers,
		data
  })
}

export function addQrCode(data) {
  return request({
    url: '/mall/v1/mall/addQrCode',
    method: 'post',
    headers,
		data
  })
}
export function upQrCode(data) {
  return request({
    url: '/mall/v1/mall/upQrCode',
    method: 'post',
    headers,
		data
  })
}
export function getQrCodes(data) {
  return request({
    url: '/mall/v1/mall/getQrCodes',
    method: 'post',
    headers,
		data
  })
}
export function getCategorys(data) {
  return request({
    url: '/mall/v1/mall/getCategorys',
    method: 'post',
    headers,
		data
  })
}
export function getCategory(data) {
  return request({
    url: '/mall/v1/mall/getCategory',
    method: 'post',
    headers,
		data
  })
}
export function addCategory(data) {
  return request({
    url: '/mall/v1/mall/addCategory',
    method: 'post',
    headers,
		data
  })
}
export function updateCategory(data) {
  return request({
    url: '/mall/v1/mall/updateCategory',
    method: 'post',
    headers,
		data
  })
}
export function deletItemeGoods(data) {
  return request({
    url: '/mall/v1/mall/deletItemeGoods',
    method: 'post',
    headers,
		data
  })
}

export function getSpecialGoods(data) {
  return request({
    url: '/mall/v1/mall/getSpecialGoods',
    method: 'post',
    headers,
		data
  })
}
export function getSpecialGoodsDetail(data) {
  return request({
    url: '/mall/v1/mall/getSpecialGoodsDetail',
    method: 'post',
    headers,
		data
  })
}
export function addSpecialGoods(data) {
  return request({
    url: '/mall/v1/mall/addSpecialGoods',
    method: 'post',
    headers,
		data
  })
}
export function updateSpecial(data) {
  return request({
    url: '/mall/v1/mall/updateSpecial',
    method: 'post',
    headers,
		data
  })
}
export function deleteSpecialGoods(data) {
  return request({
    url: '/mall/v1/mall/deleteSpecialGoods',
    method: 'post',
    headers,
		data
  })
}

export function addKeywordCate(data) {
  return request({
    url: '/mall/v1/mall/addKeywordCate',
    method: 'post',
    headers,
    data
  })
}
export function getKeywordCates(data) {
  return request({
    url: '/mall/v1/mall/getKeywordCates',
    method: 'post',
    headers,
    data
  })
}
export function getKeywordCate(data) {
  return request({
    url: '/mall/v1/mall/getKeywordCate',
    method: 'post',
    headers,
    data
  })
}
export function updateKeywordCate(data) {
  return request({
    url: '/mall/v1/mall/updateKeywordCate',
    method: 'post',
    headers,
    data
  })
}
export function deleteKeywordCate(data) {
  return request({
    url: '/mall/v1/mall/deleteKeywordCate',
    method: 'post',
    headers,
    data
  })
}
export function addKeyword(data) {
  return request({
    url: '/mall/v1/mall/addKeyword',
    method: 'post',
    headers,
    data
  })
}
export function getKeywords(data) {
  return request({
    url: '/mall/v1/mall/getKeywords',
    method: 'post',
    headers,
    data
  })
}
export function getKeyword(data) {
  return request({
    url: '/mall/v1/mall/getKeyword',
    method: 'post',
    headers,
    data
  })
}
export function updateKeyword(data) {
  return request({
    url: '/mall/v1/mall/updateKeyword',
    method: 'post',
    headers,
    data
  })
}
export function deleteKeyword(data) {
  return request({
    url: '/mall/v1/mall/deleteKeyword',
    method: 'post',
    headers,
    data
  })
}

export function addMaterialCircle(data) {
  return request({
    url: '/admin/admin/addMaterialCircle',
    method: 'post',
    headers,
    data
  })
}

export function getMaterialCircles(data) {
  return request({
    url: '/admin/admin/getMaterialCircles',
    method: 'post',
    headers,
    data
  })
}

export function delMaterialCircle(data) {
  return request({
    url: '/admin/admin/delMaterialCircle',
    method: 'post',
    headers,
    data
  })
}

export function getMaterialCircle(data) {
  return request({
    url: '/admin/admin/getMaterialCircle',
    method: 'post',
    headers,
    data
  })
}

export function upMaterialCircle(data) {
  return request({
    url: '/admin/admin/upMaterialCircle',
    method: 'post',
    headers,
    data
  })
}

export function getActivitiesCoupons(data) {
  return request({
    url: '/mall/v1/mall/getActivitiesCoupons',
    method: 'post',
    headers,
		data
  })
}

export function getActivitiesCoupon(data) {
  return request({
    url: '/mall/v1/mall/getActivitiesCoupon' +data,
    method: 'get',
    headers,
  })
}

export function getCoupons(data) {
  return request({
    url: '/mall/v1/mall/getCoupons',
    method: 'post',
    headers,
		data
  })
}

export function updateActivitiesCoupon(data) {
  return request({
    url: '/mall/v1/mall/updateActivitiesCoupon',
    method: 'post',
    headers,
		data
  })
}


export function addActivitiesCoupon(data) {
  return request({
    url: '/mall/v1/mall/addActivitiesCoupon',
    method: 'post',
    headers,
		data
  })
}

export function deleteCoupons(data) {
  return request({
    url: '/mall/v1/mall/deleteCoupons',
    method: 'post',
    headers,
		data
  })
}

export function addActivityAll(data) {
  return request({
    url: '/mall/v1/mall/addActivityAll',
    method: 'post',
    headers,
		data
  })
}

export function getActivityAlls(data) {
  return request({
    url: '/mall/v1/mall/getActivityAlls',
    method: 'post',
    headers,
		data
  })
}

export function ActiveupdateIsOnline(data) {
  return request({
    url: '/mall/v1/mall/updateActivityIsOnline',
    method: 'post',
    headers,
		data
  })
}

export function updateIsCheck(data) {
  return request({
    url: '/mall/v1/mall/updateIsCheck',
    method: 'post',
    headers,
		data
  })
}
export function getSeckillTime(data) {
  return request({
    url: '/mall/v1/mall/getSeckillTime',
    method: 'post',
    data:data,
    headers
  })
}

export function getSeckillsLater(data) {
  return request({
    url: '/mall/v1/mall/getSeckillsLater',
    method: 'post',
    data:data,
    headers
  })
}

export function getActivityAllList(data) {
  return request({
    url: '/mall/v1/mall/getActivityAllList',
    method: 'post',
    data:data,
    headers
  })
}

export function upBaseInfo(data) {
  return request({
    url: '/mall/v1/mall/upBaseInfo',
    method: 'post',
    data:data,
    headers
  })
}

export function deleteTemelate(data) {
  return request({
    url: '/mall/v1/mall/deleteTemelate',
    method: 'post',
    data:data,
    headers
  })
}

export function updateTem1(data) {
  return request({
    url: '/mall/v1/mall/updateTem1',
    method: 'post',
    data:data,
    headers
  })
}
export function updateTem2(data) {
  return request({
    url: '/mall/v1/mall/updateTem2',
    method: 'post',
    data:data,
    headers
  })
}

export function updateTem3(data) {
  return request({
    url: '/mall/v1/mall/updateTem3',
    method: 'post',
    data:data,
    headers
  })
}

export function updateTem4(data) {
  return request({
    url: '/mall/v1/mall/updateTem4',
    method: 'post',
    data:data,
    headers
  })
}

export function getChannelList(data) {
  return request({
    url: '/mall/v1/mall/getChannelList',
    method: 'post',
    data:data,
    headers
  })
}


export function getCommentList(data) {
  return request({
    url: '/mall/v1/mall/getCommentList',
    method: 'post',
    headers,
		data
  })
}

export function dealComment(data) {
  return request({
    url: '/mall/v1/mall/dealComment',
    method: 'post',
    headers,
		data
  })
}

export function deleteComment(data) {
  return request({
    url: '/mall/v1/mall/deleteComment',
    method: 'post',
    headers,
		data
  })
}

export function getTemplete1Info(data) {
  return request({
    url: '/mall/v1/mall/getTemplete1Info',
    method: 'post',
    headers,
		data
  })
}

export function getTemplete3Info(data) {
  return request({
    url: '/mall/v1/mall/getTemplete3Info',
    method: 'post',
    headers,
		data
  })
}

export function getTemplete4Info(data) {
  return request({
    url: '/mall/v1/mall/getTemplete4Info',
    method: 'post',
    headers,
		data
  })
}

export function addTem5(data) {
  return request({
    url: '/mall/v1/mall/addTem5',
    method: 'post',
    headers,
		data
  })
}

export function upTem5(data) {
  return request({
    url: '/mall/v1/mall/upTem5',
    method: 'post',
    headers,
		data
  })
}

export function getTemplete5Info(data) {
  return request({
    url: '/mall/v1/mall/getTemplete5Info',
    method: 'post',
    headers,
		data
  })
}

export function addTem1(data) {
  return request({
    url: '/mall/v1/mall/addTem1',
    method: 'post',
    headers,
		data
  })
}

export function addTem2(data) {
  return request({
    url: '/mall/v1/mall/addTem2',
    method: 'post',
    headers,
		data
  })
}

export function addTem3(data) {
  return request({
    url: '/mall/v1/mall/addTem3',
    method: 'post',
    headers,
		data
  })
}

export function addTem4(data) {
  return request({
    url: '/mall/v1/mall/addTem4',
    method: 'post',
    headers,
		data
  })
}

export function addTem6(data) {
  return request({
    url: '/mall/v1/mall/addTem6',
    method: 'post',
    headers,
		data
  })
}

export function getTemplete6Info(data) {
  return request({
    url: '/mall/v1/mall/getTemplete6Info',
    method: 'post',
    headers,
		data
  })
}

export function updateTem6(data) {
  return request({
    url: '/mall/v1/mall/updateTem6',
    method: 'post',
    headers,
		data
  })
}

export function getMemberIdentifys(data) {
  return request({
    url: 'member/getMemberIdentifys',
    method: 'post',
    headers,
		data
  })
}
export function getMemberIdentify(data) {
  return request({
    url: 'member/getMemberIdentify',
    method: 'post',
    headers,
		data
  })
}

export function upMemberIdentify(data) {
  return request({
    url: 'member/upMemberIdentify',
    method: 'post',
    headers,
		data
  })
}

export function getBrandList(data) {
  return request({
    url: 'mall/v1/mall/getBrandList',
    method: 'post',
    headers,
		data
  })
}
















// 商城end