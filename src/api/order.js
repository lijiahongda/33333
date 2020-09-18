import request from '@/utils/requestKylins'
import {
	authorizationVue
} from '@/utils/authorization'
import store from '@/store'

// var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).id : localstrage = ''
// const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')
// const headers = {
// 	'Authorization': tokenAuth
// } // 请求头 header Authorization

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
	'Authorization': tokenAuth
}

/**
 * 入库单列表接口
 * */
export function getInventoryLists(data) {
	return request({
		url: '/admin/admin/getInventoryLists',
		method: 'post',
		headers,
		data
	})
}

/**
 * 新建入库单选取商品接口
 * */
export function getProductSelect(data) {
	return request({
		url: '/admin/admin/getProductSelect',
		method: 'post',
		headers,
		data
	})
}
/**
 * 商品规格接口
 * */
export function getProductSku(data) {
	return request({
		url: '/admin/admin/getProductSku',
		method: 'post',
		headers,
		data
	})
}
/**
 * 确定入库接口
 * */
export function addInventoryList(data) {
	return request({
		url: '/admin/admin/addInventoryList',
		method: 'post',
		headers,
		data
	})
}
/**
 * 入库详情
 * */
export function getInventoryInfo(data) {
	return request({
		url: '/admin/admin/getInventoryInfo',
		method: 'post',
		headers,
		data
	})
}
/**
 * 列表接口
 * */
export function getMallOrderInfo(data) {
	return request({
		url: '/mall/v1/mall/getMallOrderInfo',
		method: 'post',
		headers,
		data
	})
}

export function updateReceiver(data) {
	return request({
		url: '/mall/v1/mall/updateReceiver',
		method: 'post',
		headers,
		data
	})
}

/**
 * 列表接口
 * */
export function getMallOrders(data) {
	return request({
		url: '/mall/v1/mall/getMallOrders',
		method: 'post',
		headers,
		data
	})
}

export function getIntegralOrders(data) {
	return request({
		url: '/mall/v1/mall/getIntegralOrders',
		method: 'post',
		headers,
		data
	})
}

export function addLogistice(data) {
	return request({
		url: '/mall/v1/mall/addLogistice',
		method: 'post',
		headers,
		data
	})
}

export function getLogistices(data) {
	return request({
		url: '/mall/v1/mall/getLogistices',
		method: 'post',
		headers,
		data
	})
}

export function confirmSend(data) {
	return request({
		url: '/admin/admin/confirmSend',
		method: 'post',
		headers,
		data
	})
}

export function operateInfo(data) {
	return request({
		url: '/mall/order/operateInfo.json',
		method: 'post',
		headers,
		data
	})
}

export function updateOrderGoodsHotelCode(data) {
	return request({
		url: '/mall/v1/mall/updateOrderGoodsHotelCode',
		method: 'post',
		headers,
		data
	})
}

/**
 * 列表接口
 * */
// 火车票订单列表
export function getTrainOrders(data) {
	return request({
		url: '/admin/admin/getTrainTicketOrders',
		method: 'post',
		headers,
		data
	})
}

export function getTrainOrderInfo(data) {
	return request({
		url: '/mall/v1/mall/getTrainOrderInfo',
		method: 'post',
		headers,
		data
	})
}

// 手机充值订单列表
export function getPhoneOrders(data) {
	return request({
		url: '/admin/admin/getPhoneOrders',
		method: 'post',
		headers,
		data
	})
}

// 加油订单列表
export function getGasOrders(data) {
	return request({
		url: '/admin/admin/getGasOrders',
		method: 'post',
		headers,
		data
	})
}

// 加油订单列表详情
export function getGasOrdersInfo(data) {
	return request({
		url: '/admin/admin/getGasOrdersInfo',
		method: 'post',
		headers,
		data
	})
}

// 加油订单列表详情
export function indexSummary(data) {
	return request({
		url: '/admin/admin/indexSummary',
		method: 'post',
		headers,
		data
	})
}

// 推送失败订单列表
export function getNoPushOrderList(data) {
	return request({
		url: '/admin/admin/getNoPushOrderList',
		method: 'post',
		headers,
		data
	})
}

// 推送失败订单列表详情
export function getOrder(data) {
	return request({
		url: '/admin/admin/getOrder',
		method: 'post',
		data,
		headers
	})
}

export function getExpressCodes(data) {
	return request({
		url: '/admin/admin/getExpressCodes',
		method: 'post',
		data,
		headers
	})
}

// 商品订单列表
export function getOrderList(data) {
	return request({
		url: '/admin/admin/getOrderList',
		method: 'post',
		data,
		headers
	})
}

// 渠道
export function getChannels(data) {
	return request({
		url: '/admin/admin/getChannels',
		method: 'post',
		data,
		headers
	})
}

export function getChannel(data) {
	return request({
		url: '/admin/admin/getChannel',
		method: 'post',
		data,
		headers
	})
}

export function addChannel(data) {
	return request({
		url: '/admin/admin/addChannel',
		method: 'post',
		data,
		headers
	})
}

// 库存
export function getBrands(data) {
	return request({
		url: '/admin/admin/getBrands',
		method: 'post',
		data,
		headers
	})
}

export function getBrand(data) {
	return request({
		url: '/admin/admin/getBrand',
		method: 'post',
		data,
		headers
	})
}

export function addBrand(data) {
	return request({
		url: '/admin/admin/addBrand',
		method: 'post',
		data,
		headers
	})
}

export function upBrand(data) {
	return request({
		url: '/admin/admin/upBrand',
		method: 'post',
		data,
		headers
	})
}

export function getMallChannels(data) {
	return request({
		url: '/admin/admin/getMallChannels',
		method: 'post',
		data,
		headers
	})
}

export function getCategorys(data) {
	return request({
		url: '/admin/admin/getCategorys',
		method: 'post',
		data,
		headers
	})
}

export function addCategory(data) {
	return request({
		url: '/admin/admin/addCategory',
		method: 'post',
		data,
		headers
	})
}

export function upSupplierIsCheck(data) {
	return request({
		url: '/admin/admin/upNewSupplierIsCheck',
		method: 'post',
		data,
		headers
	})
}

export function updateIsCheck(data) {
	return request({
		url: '/admin/admin/updateIsCheck',
		method: 'post',
		data,
		headers
	})
}

export function upCategory(data) {
	return request({
		url: '/admin/admin/upCategory',
		method: 'post',
		data,
		headers
	})
}

export function getCategory(data) {
	return request({
		url: '/admin/admin/getCategory',
		method: 'post',
		data,
		headers
	})
}

export function getCategoryTree(data) {
	return request({
		url: '/admin/admin/getCategoryTree',
		method: 'post',
		data,
		headers
	})
}

// 供应商列表
export function getSuppliers(data) {
	return request({
		url: '/admin/admin/getNewSuppliers',
		method: 'post',
		data,
		headers
	})
}
export function getNewestSuppliers(data) {
	return request({
		url: '/admin/admin/getNewestSuppliers',
		method: 'post',
		data,
		headers
	})
}
// 供应链查看自己供应商
export function getFzSuppliers(data) {
	return request({
		url: '/admin/admin/getFzSuppliers',
		method: 'post',
		data,
		headers
	})
}
export function getNewestSupplier(data) {
	return request({
		url: '/admin/admin/getNewestSupplier',
		method: 'post',
		data,
		headers
	})
}
export function addNewestSupplier(data) {
	return request({
		url: '/admin/admin/addNewestSupplier',
		method: 'post',
		data,
		headers
	})
}

// 供应商列表--驳回、通过
export function upNewSupplierIsCheck(data) {
	return request({
		url: '/admin/admin/upNewSupplierIsCheck',
		method: 'post',
		data,
		headers
	})
}
// 供应商列表--启用、停用
export function upNewSupplierState(data) {
	return request({
		url: '/admin/admin/upNewSupplierState',
		method: 'post',
		data,
		headers
	})
}

// 供应商列表模糊查询
export function getSplList(data) {
	return request({
		url: '/admin/admin/getSplList',
		method: 'post',
		data,
		headers
	})
}

// 导出明细
export function downDc(data) {
	return request({
		url: `/admin/getDownOrderGoods`,
		method: 'get',
		params: data,
		headers
	})
}

// 详情
export function getSupplier(data) {
	return request({
		url: '/admin/admin/getNewSupplier',
		method: 'post',
		data,
		headers
	})
}

export function getSupplierInfo(data, headers) {
	return request({
		url: '/admin/admin/getSupplier',
		method: 'post',
		data,
		headers
	})
}

export function addSupplier(data) {
	return request({
		url: '/admin/admin/addNewSupplier',
		method: 'post',
		data,
		headers
	})
}

export function upSupplier(data) {
	return request({
		url: '/admin/admin/upNewSupplier',
		method: 'post',
		data,
		headers
	})
}
export function upNewestSupplier(data) {
	return request({
		url: '/admin/admin/upNewestSupplier',
		method: 'post',
		data,
		headers
	})
}
export function getPrincipalPeople(data) {
	return request({
		url: '/admin/admin/getPrincipalPeople',
		method: 'post',
		data,
		headers
	})
}

export function getLabels(data) {
	return request({
		url: '/admin/admin/getLabels',
		method: 'post',
		data,
		headers
	})
}
// 商品列表
export function getProducts(data) {
	return request({
		url: '/admin/admin/getProducts',
		method: 'post',
		data,
		headers
	})
}
// 批量审核
export function updateIsCheckMore(data) {
	return request({
		url: '/admin/admin/updateIsCheckMore',
		method: 'post',
		data,
		headers
	})
}
// 批量下架、入库
export function updateIsOnlineMore(data) {
	return request({
		url: '/admin/admin/updateIsOnlineMore',
		method: 'post',
		data,
		headers
	})
}

export function createSupplierNumber(data) {
	return request({
		url: '/admin/admin/createSupplierNumber',
		method: 'post',
		data,
		headers
	})
}

export function getLabes(data) {
	return request({
		url: '/admin/admin/getLabes',
		method: 'post',
		data,
		headers
	})
}

export function getGood(data) {
	return request({
		url: '/admin/admin/getProduct',
		method: 'post',
		data,
		headers
	})
}

export function upProduct(data) {
	return request({
		url: '/admin/admin/upProduct',
		method: 'post',
		data,
		headers
	})
}

export function addGoods(data) {
	return request({
		url: '/admin/admin/addProduct',
		method: 'post',
		data,
		headers
	})
}

export function newAddGoods(data) {
	return request({
		url: '/admin/admin/newAddGood',
		method: 'post',
		data,
		headers
	})
}

export function updateGoodSku(data) {
	// data.sku = qs.stringify(data.sku,{arrayFormat:"repeat"})
	return request({
		url: '/admin/admin/updateGoodSku',
		method: 'post',
		data, // qs.stringify(data),
		headers
	})
}

export function addGoodSku(data) {
	return request({
		url: '/admin/admin/addGoodSku',
		method: 'post',
		data,
		headers
	})
}

export function getListPagePowers(data, header) {
	return request({
		url: '/admin/admin/getListPagePowers',
		method: 'post',
		params: data,
		headers: header
	})
}

export function updateIsOnline(data) {
	return request({
		url: '/admin/admin/updateIsOnline',
		method: 'post',
		data,
		headers
	})
}

export function handlePushStatus(data) {
	return request({
		url: '/admin/admin/handlePushStatus',
		method: 'post',
		params: data,
		headers
	})
}

export function insertExpress(data) {
	return request({
		url: '/admin/admin/insertExpress',
		method: 'post',
		params: data,
		headers
	})
}

export function selectExpress(data) {
	return request({
		url: '/admin/admin/selectExpress',
		method: 'post',
		params: data,
		headers
	})
}

export function getSplOrderList(data) {
	return request({
		url: '/admin/admin/getSplOrderList',
		method: 'post',
		params: data,
		headers
	})
}

export function getSplOrder(data) {
	return request({
		url: '/admin/admin/getSplOrder',
		method: 'post',
		params: data,
		headers
	})
}

export function downSplOrderList(data) {
	return request({
		url: '/admin/admin/downSplOrderList',
		method: 'post',
		params: data,
		headers
	})
}

// 省市区
export function getCity(data) {
	return request({
		url: '/admin/admin/getCity',
		method: 'post',
		params: data,
		headers
	})
}

// 操作日志
export function getSupplierLogList(data) {
	return request({
		url: '/admin/admin/getSupplierLogList',
		method: 'post',
		params: data,
		headers
	})
}

// 合作品类
export function getTopCategory(data) {
	return request({
		url: '/admin/admin/getTopCategory',
		method: 'post',
		params: data,
		headers
	})
}

export function addOrderContent(data) {
	return request({
		url: '/admin/admin/addOrderContent',
		method: 'post',
		params: data,
		headers
	})
}

export function getOrderContent(data) {
	return request({
		url: '/admin/admin/getOrderContent',
		method: 'post',
		params: data,
		headers
	})
}

export function getSupplierOrderCountList(data) {
	return request({
		url: '/admin/admin/getSupplierOrderCountList',
		method: 'post',
		params: data,
		headers
	})
}

export function getNoSendSplOrderList(data) {
	return request({
		url: '/admin/admin/getNoSendSplOrderList',
		method: 'post',
		params: data,
		headers
	})
}

export function getOrderContents(data) {
	return request({
		url: '/admin/admin/getOrderContents',
		method: 'post',
		params: data,
		headers
	})
}

export function updateOrderProduct(data) {
	return request({
		url: '/admin/admin/updateOrderProduct',
		method: 'post',
		params: data,
		headers
	})
}

/**
 *
 * -----------------------积分商城模块-------------------------------
 *
 */
// 商品列表
export function getIntegralProductList(data) {
	return request({
		url: '/admin/admin/getIntegralProductList',
		method: 'post',
		data,
		headers
	})
}

// 添加积分商品
export function addIntegralProduct(data) {
	return request({
		url: '/admin/admin/addIntegralProduct',
		method: 'post',
		data,
		headers
	})
}

// 编辑积分商品
export function upIntegralProduct(data) {
	return request({
		url: '/admin/admin/upIntegralProduct',
		method: 'post',
		data,
		headers
	})
}

// 编辑积分商品sku
export function upIntegralProductSku(data) {
	return request({
		url: '/admin/admin/upIntegralProductSku',
		method: 'post',
		data,
		headers
	})
}

// 积分商品详情
export function getIntegralProduct(data) {
	return request({
		url: '/admin/admin/getIntegralProduct',
		method: 'post',
		data,
		headers
	})
}

// 订单详情
export function getIntegralProductOrder(data) {
	return request({
		url: '/admin/admin/getIntegralProductOrder',
		method: 'post',
		data,
		headers
	})
}

// 积分商城订单列表
export function getIntegralProductOrderList(data) {
	return request({
		url: '/admin/admin/getIntegralProductOrderList',
		method: 'post',
		data,
		headers
	})
}

// 积分商城订单列表--上下架
export function updateIntegralIsOnline(data) {
	return request({
		url: '/admin/admin/updateIntegralIsOnline',
		method: 'post',
		data,
		headers
	})
}

// 积分商城积分卡券配置列表
export function getIntegralCardConfigList(data) {
	return request({
		url: '/admin/admin/getIntegralCardConfigList',
		method: 'post',
		data,
		headers
	})
}

// 积分商城积分卡券列表
export function getIntegralCardList(data) {
	return request({
		url: '/admin/admin/getIntegralCardList',
		method: 'post',
		data,
		headers
	})
}

// 新增商城积分卡券
export function addIntegralCardConfig(data) {
	return request({
		url: '/admin/admin/addIntegralCardConfig',
		method: 'post',
		data,
		headers
	})
}

// 编辑积分商城积分卡券
export function upIntegralCardConfig(data) {
	return request({
		url: '/admin/admin/upIntegralCardConfig',
		method: 'post',
		data,
		headers
	})
}

// 积分商城积分卡券详情
export function getIntegralCardConfig(data) {
	return request({
		url: '/admin/admin/getIntegralCardConfig',
		method: 'post',
		data,
		headers
	})
}

export function delOrderContent(data) {
	return request({
		url: '/admin/admin/delOrderContent',
		method: 'post',
		data,
		headers
	})
}

// 结算单列表
export function getSplSettlementList(data) {
	return request({
		url: '/admin/admin/getSplSettlementList',
		method: 'post',
		data,
		headers
	})
}
// 结算单列表
export function getSplSetOrderList(data) {
	return request({
		url: '/admin/admin/getSplSetOrderList',
		method: 'post',
		data,
		headers
	})
}
// 结算单列表
export function getSplSettlement(data) {
	return request({
		url: '/admin/admin/getSplSettlement',
		method: 'post',
		data,
		headers
	})
}
// 付款方信息
export function getSelectInfo(data) {
	return request({
		url: '/admin/getSelectInfo',
		method: 'post',
		data,
		headers
	})
}
// 新建供应商结算单
export function createSplSettlement(data) {
	return request({
		url: '/admin/admin/createSplSettlement',
		method: 'post',
		data,
		headers
	})
}

// 审核/驳回供应商结算单
export function upSplSettlement(data) {
	return request({
		url: '/admin/admin/upSplSettlement',
		method: 'post',
		data,
		headers
	})
}
// 作废供应商结算单
export function delSplSettlement(data) {
	return request({
		url: '/admin/admin/delSplSettlement  ',
		method: 'post',
		data,
		headers
	})
}
// 制单人列表
export function getSelectAdminUsers(data) {
	return request({
		url: '/admin/admin/getSelectAdminUsers  ',
		method: 'post',
		data,
		headers
	})
}
// 结算单日志
export function getSplFinancialLogList(data) {
	return request({
		url: '/admin/admin/getSplFinancialLogList  ',
		method: 'post',
		data,
		headers
	})
}
// 付款单列表
export function getSplPamentList(data) {
	return request({
		url: '/admin/admin/getSplPamentList  ',
		method: 'post',
		data,
		headers
	})
}
// 付款单详情
export function getSplPayment(data) {
	return request({
		url: '/admin/admin/getSplPayment  ',
		method: 'post',
		data,
		headers
	})
}
// 确认/驳回付款付款单
export function upSplPayment(data) {
	return request({
		url: '/admin/admin/upSplPayment  ',
		method: 'post',
		data,
		headers
	})
}
// 对账单列表
export function getSplReconciliationList(data) {
	return request({
		url: '/admin/admin/getSplReconciliationList  ',
		method: 'post',
		data,
		headers
	})
}
// 对账单详情
export function getSplReconciliation(data) {
	return request({
		url: '/admin/admin/getSplReconciliation  ',
		method: 'post',
		data,
		headers
	})
}
// 对账确认
export function confirmReconciliation(data) {
	return request({
		url: '/admin/admin/confirmReconciliation  ',
		method: 'post',
		data,
		headers
	})
}

// 成本调价列表
export function getCostAdjustmentList(data) {
	return request({
		url: '/admin/admin/getCostAdjustmentList  ',
		method: 'post',
		data,
		headers
	})
}
// 入库单下拉列表
export function getInventorySelect(data) {
	return request({
		url: '/admin/admin/getInventorySelect  ',
		method: 'post',
		data,
		headers
	})
}
// 确定入库
export function getCostInventoryInfo(data) {
	return request({
		url: '/admin/admin/getCostInventoryInfo  ',
		method: 'post',
		data,
		headers
	})
}
// 新增调价
export function addCostAdjustment(data) {
	return request({
		url: '/admin/admin/addCostAdjustment  ',
		method: 'post',
		data,
		headers
	})
}
// 制单人
export function getAdminUser(data) {
	return request({
		url: '/admin/admin/getAdminUser  ',
		method: 'post',
		data,
		headers
	})
}

// 调价详情
export function getCostAdjustmentInfo(data) {
	return request({
		url: '/admin/admin/getCostAdjustmentInfo  ',
		method: 'post',
		data,
		headers
	})
}
// 调价日志
export function getCostAdjustmentLog(data) {
	return request({
		url: '/admin/admin/getCostAdjustmentLog  ',
		method: 'post',
		data,
		headers
	})
}

/** **************批量改价*/
// 列表
export function getProductChangePriceList(data) {
	return request({
		url: '/admin/admin/getProductChangePriceList  ',
		method: 'post',
		data,
		headers
	})
}
// 详情
export function getProductChangePrice(data) {
	return request({
		url: '/admin/admin/getProductChangePrice  ',
		method: 'post',
		data,
		headers
	})
}
// 移除单条明细
export function delProductChangePriceDetail(data) {
	return request({
		url: '/admin/admin/delProductChangePriceDetail  ',
		method: 'post',
		data,
		headers
	})
}
// 移除多条明细
export function delProductChangePriceDetailMore(data) {
	return request({
		url: '/admin/admin/delProductChangePriceDetailMore  ',
		method: 'post',
		data,
		headers
	})
}
// 确认改价
export function updateProductChangePriceDetail(data) {
	return request({
		url: '/admin/admin/updateProductChangePriceDetail  ',
		method: 'post',
		data,
		headers
	})
}
// 确认改价
export function exportChangePriceSample(data) {
	return request({
		url: '/admin/exportChangePriceSample  ',
		method: 'get',
		data,
		headers
	})
}

// 运费模板下拉列表
export function getSplFreightTemplate(data) {
	return request({
		url: '/admin/admin/getSplFreightTemplate',
		method: 'post',
		headers,
		data
	})
}
//获取订单渠道接口
export function getOrderWhere(data) {
	return request({
		url: '/admin/admin/getOrderSourceSelect',
		method: 'post',
		headers,
		data
	})
}
