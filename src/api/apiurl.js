'use strict'
// 测试地址
// const baseurl = 'http://dev.kylin.api.yuelvhui.com/'
// 正式地址
const baseurl = 'http://kylin.api.yuelvhui.com/'
module.exports = {
  arealisturl: baseurl + 'common/area/getSubAreas/', // 获取国家省列表{areaId}
  destinationaddurl: baseurl + 'dict/lineDestination/create', // 添加目的地
  destinationupdurl: baseurl + 'dict/lineDestination/update', // 更新目的地
  destinationdelurl: baseurl + 'dict/lineDestination/delete', // 删除目的地
  destinationlisturl: baseurl + 'dict/lineDestination/getList/', // 获取目的地列表{countryId}/{provinceId}/{areaName}/{pageSize?}/{pageIndex?}

  departureaddurl: baseurl + 'dict/lineOrigin/create', // 添加出发地
  departureupdurl: baseurl + 'dict/lineOrigin/update', // 更新出发地
  departuredelurl: baseurl + 'dict/lineOrigin/delete', // 删除出发地
  departurelisturl: baseurl + 'dict/lineOrigin/getList/', // 获取出发地列表{areaName}/{pageSize?}/{pageIndex?}

  configlisturl: baseurl + 'dict/lineConfig/getAll/', // 获取线路配置列表{configType}/{pageSize?}/{pageIndex?}1旅行方式， 2交通方式， 3推广活动，4酒+x
  configaddurl: baseurl + 'dict/lineConfig/create', // 添加线路配置
  configupdurl: baseurl + 'dict/lineConfig/update', // 更新线路配置
  configdelurl: baseurl + 'dict/lineConfig/delete', // 删除线路配置

  /**
     * 新版-线路管理（2018-09-07）
     */

  getCategoryTopList: baseurl + 'tour/getCategoryTopList', // 线路分类-获取顶级分类
  getCategoryGroup: baseurl + 'tour/getCategoryGroup', // 线路分类-获取分类组
  categoryAdd: baseurl + 'tour/categoryAdd', // 线路分类-保存

  labelconfigaddurl: baseurl + 'label/add', // label配置添加
  labelconfigurl: baseurl + 'label/list', // 获取label标签配置列表
  labelconfigdelurl: baseurl + 'label/delete', // 删除label标签配置列表
  labelconfigupurl: baseurl + 'label/update', // 更新label标签配置列表

  hoteltypeurl: baseurl + 'hotel/backend/typeList', // 更新酒店类型
  hoteltypeadurl: baseurl + 'hotel/backend/storeType', // 添加酒店类型
  hoteltypeedurl: baseurl + 'hotel/backend/updateType', // 修改酒店类型
  hoteltypedelurl: baseurl + 'hotel/backend/deleteType', // 删除酒店类型

  hotellist: baseurl + 'hotel/backend/hotelList', // 更新酒店列表
  hoteladurl: baseurl + 'hotel/backend/create', // 新增酒店
  hotelupurl: baseurl + 'hotel/backend/update', // 修改酒店
  hoteldelurl: baseurl + 'hotel/backend/delete', // 删除酒店
  hoteldeturl: baseurl + 'hotel/backend/hotelDetail', // 酒店详情

  themelisturl: baseurl + 'dict/lineTheme/getList/', // 获取主题列表{themeName?}/{pageSize?}/{pageIndex?}
  themeaddurl: baseurl + 'dict/lineTheme/create', // 添加主题
  themeinfourl: baseurl + 'dict/lineTheme/getDetail/', // 获取主题
  themeupdurl: baseurl + 'dict/lineTheme/update', // 更新主题
  themedelurl: baseurl + 'dict/lineTheme/delete', // 删除主题

  linesupplierlisturl: baseurl + 'dict/lineSupplier/getList/', // 获取供应商列表
  linesupplieraddurl: baseurl + 'dict/lineSupplier/create', // 添加供应商
  linesupplierinfourl: baseurl + 'dict/lineSupplier/getDetail/', // 获取供应商
  linesupplierupdurl: baseurl + 'dict/lineSupplier/update', // 更新供应商
  linesupplierdelurl: baseurl + 'dict/lineSupplier/delete', // 删除供应商

  linedistributionlisturl: baseurl + 'dict/lineTrade/getList/', // 获取供应商列表
  linedistributionaddurl: baseurl + 'dict/lineTrade/create', // 添加供应商
  linedistributionupdurl: baseurl + 'dict/lineTrade/update', // 更新供应商
  linedistributiondelurl: baseurl + 'dict/lineTrade/delete', // 删除供应商
  linefeaturedlisturl: baseurl + 'dict/lineFeatured/getList/', // 获取供应商列表{tradeId?}
  linefeaturedaddurl: baseurl + 'dict/lineFeatured/create', // 添加供应商
  linefeaturedupdurl: baseurl + 'dict/lineFeatured/update', // 更新供应商
  linefeatureddelurl: baseurl + 'dict/lineFeatured/delete', // 删除供应商
  linesuitaddurl: baseurl + 'newline/suit/create', // 添加线路报价
  linesuitbyaddurl: baseurl + 'newline/suit/addBuyLimit', // 添加抢购套餐
  linesuitbyupurl: baseurl + 'newline/suit/listBuyLimit', // 获取抢购套餐
  linesuitbyediturl: baseurl + 'newline/suit/updateBuyLimit', // 修改抢购套餐
  linesuitinfourl: baseurl + 'newline/suit/getDetail/', // 获取线路报价
  linesuitupdurl: baseurl + 'newline/suit/update', // 更新线路报价
  linesuitdelurl: baseurl + 'newline/suit/delete', // 删除线路报价
  linetrademapinfourl: baseurl + 'newline/tradeMap/get/', // 获取线路报价/{lineId}/{tradeId}
  linetrademapupdurl: baseurl + 'newline/tradeMap/update', // 更新线路报价
  linesuitlisturl: baseurl + 'newline/suit/getListByTrade/', // 添加线路报价 newline/suit/getListByTrade/{lineInternational}/{endPlaceName}/{travelStyleId}/{themeId}/{supplierId}/{tradeId}/{trafficStyleId}/{pageSize?}/{pageIndex?}

  linelisturl: baseurl + 'newline/getList/', // 获取线路列表{startPlace}/{endPlace}/{travelStyleId}/{themeId}/{supplierId}/{tradeId}/{trafficStyleId}/{pageSize?}/{pageIndex?}
  lineaddurl: baseurl + 'newline/create', // 添加线路基本信息
  lineinfourl: baseurl + 'newline/getDetail/', // 更新线路基本信息
  lineupdurl: baseurl + 'newline/update', // 更新线路基本信息
  linedelurl: baseurl + 'newline/delete', // 删除线路
  linemakeonline: baseurl + 'newline/online', // 线路上架/下架
  lineimgupdurl: baseurl + 'newline/image/update', // 修改图片信息
  linedescupdurl: baseurl + 'newline/desc/update', // 修改介绍信息
  linetempupdurl: baseurl + 'newline/templateContent/update', // 修改模板内容信息

  adminloginurl: baseurl + 'admin/login', // 图片上传
  adminlisturl: baseurl + 'admin/getList', // 图片上传/{pageSize}/{pageIndex}
  adminaddurl: baseurl + 'admin/create', // 图片上传
  adminupdurl: baseurl + 'admin/update', // 图片上传
  imguploadurl: baseurl + 'common/upload', // 图片上传

  // 大人
  leaderlisturl: baseurl + 'leader/getList/', // 获取达人列表
  ladlist: baseurl + 'leader/lists', // 大人列表
  ladgeturl: baseurl + 'leader/get', // 大人详情
  ladgettagurl: baseurl + 'leader/tag', // 大人标签
  ladpostsaveurl: baseurl + 'leader/save', // 大人更新 / 添加
  laddelurl: baseurl + 'leader/del', // 大人删除

  // 定制游
  custlisturl: baseurl + 'cust/lists', // 定制游列表
  custgeturl: baseurl + 'cust/get', // 定制游详情
  custposturl: baseurl + 'cust/post', // 定制游详情
  custcaseposturl: baseurl + 'customizedProduct/', // 定制游案例详情保存
  custcasemodifyposturl: baseurl + 'customizedProduct/update', // 定制游案例详情修改
  custcaseseegeturl: baseurl + 'customizedProduct/getDetail/', // 定制游案例查看详情
  custcaselisturl: baseurl + 'customizedProduct/getList/', // 定制游列表

  // 悦商城管理
  mallgoodsadminurl: baseurl + 'mall/mall/getGoodsInfo', // 商城管理查看商品
  malldeletegoodsadminurl: baseurl + 'mall/mall/deleteGoods', // 商城管理删除商品
  mallupGoodsOrdergoodsadminurl: baseurl + 'mall/mall/upGoodsOrder', // 商城商品权重修改
  malladdgoodsurl: baseurl + 'mall/mall/addGoods', // 新增商品
  mallupdategoodsurl: baseurl + 'mall/mall/updateGoods', // 编辑商品
  malldoUpdateGoodsurl: baseurl + 'mall/mall/doUpdateGoods', // 执行编辑

  mallgoodstypeurl: baseurl + 'mall/mall/getGoodsType', // 商城管理商品类型
  malldeletegoodstypeurl: baseurl + 'mall/mall/deleteGoodsType', // 商城管理删除商品类型
  mallupdategoodstypeurl: baseurl + 'mall/mall/updateGoodsType', // 编辑商品类型
  malladdgoodstypeurl: baseurl + 'mall/mall/addGoodsType', // 商城管理添加商品类型

  mallgetgoodsLabelurl: baseurl + 'mall/mall/getGoodsLabel', // 商城管理查看商品标签
  malladdGoodsLabelurl: baseurl + 'mall/mall/addGoodsLabel', // 商城管理添加商品标签
  mallupdategoodsLabelurl: baseurl + 'mall/mall/updateGoodsLabel', // 商城管理修改商品标签
  malldeletegoodsLabelurl: baseurl + 'mall/mall/deleteGoodsLabel', // 商城管理删除商品标签
  mallgroupgoodsLabelurl: baseurl + 'mall/mall/upGoodsTypeOrder', // 商城管理商品标签排序

  mallgetSupplierurl: baseurl + 'mall/mall/getSupplier', // 商城管理查看商品供应商
  malldeleteSupplierurl: baseurl + 'mall/mall/deleteSupplier', // 商城管理删除商品供应商
  malladdSupplierurl: baseurl + 'mall/mall/addSupplier', // 商城管理添加商品供应商
  mallupdateSupplierurl: baseurl + 'mall/mall/updateSupplier', // 商城管理编辑商品供应商
  malldoUpdateSupplierurl: baseurl + 'mall/mall/doUpdateSupplier', // 商城管理执行编辑商品供应商

  couponNewlyIncreased: baseurl + 'mall/coupon/addCoupon', // 优惠劵新增
  couponDetails: baseurl + 'mall/mall/getCouponInfo', // 优惠详情
  couponList: baseurl + 'mall/coupon/selectCoupon', // 优惠列表信息
  sendCoupon: baseurl + 'mall/coupon/sendCoupon', // 发送券
  switchCoupon: baseurl + '/mall/coupon/switchCoupon', // 关闭券

  couponDetail: baseurl + 'mall/coupon/couponDetail', // 优惠券编辑回显
  updateCoupon: baseurl + 'mall/coupon/updateCoupon', // 优惠券编辑

  getorderinfourl: baseurl + 'mall/mall/getOrderInfo', // 商城管理获取订单信息
  updateOrderInfourl: baseurl + 'mall/mall/updateOrderInfo', // 商城管理编辑订单信息
  doUploadOrderInfourl: baseurl + 'mall/mall/doUploadOrderInfo', // 商城管理执行编辑订单信息

  // 新悦商城
  getGoodBaseData: baseurl + 'mall/v1/mall/getGoodBaseData', // 获取分销活动，标签，活动
  addGoods: baseurl + 'mall/v1/mall/addGoods', // 商品添加
  getGoods: baseurl + 'mall/v1/mall/getGoods', // 商品列表
  updateGood: baseurl + 'mall/v1/mall/updateGood', // 指定修改商品
  getGood: baseurl + 'mall/v1/mall/getGood', // 指定商品数据回显

  addDistribution: baseurl + 'mall/v1/mall/addDistribution', // 分销规则添加
  getDistributions: baseurl + 'mall/v1/mall/getDistributions', // 分销规则列表
  deleteDistribution: baseurl + 'mall/v1/mall/deleteDistribution', // 分销规则删除
  updateDistribution: baseurl + 'mall/v1/mall/updateDistribution', // 分销规则删除

  addActivity: baseurl + 'mall/v1/mall/addActivity', // 添加活动名称
  getActivitys: baseurl + 'mall/v1/mall/getActivitys', // 活动列表
  updateActivity: baseurl + 'mall/v1/mall/updateActivity', // 活动列表编辑
  deleteActivity: baseurl + 'mall/v1/mall/deleteActivity', // 活动列表删除
  
  addGoodSku:baseurl+ 'mall/v1/mall/addGoodSku',//商品添加sku
  updateGoodSku:baseurl+ 'mall/v1/mall/updateGoodSku',//指定商品数据sku回显

  addLabely: baseurl + 'mall/v1/mall/addLabel', // 商品标签添加
  updateLabel: baseurl + 'mall/v1/mall/updateLabel', // 商品标签编辑
  getLabels: baseurl + 'mall/v1/mall/getLabels', // 商品标签列表
  deleteLabel: baseurl + 'mall/v1/mall/deleteLabel', // 商品标签删除

  // 商户管理
  MerchantList: baseurl + 'mall/shop/supplierList', // 商户管理列表
  MerchantListAdd: baseurl + 'mall/shop/createSupplier', // 商户管理添加信息
  MerchantListEdit: baseurl + 'mall/shop/updateSupplier', // 商户管理编辑信息
  MerchantListDel: baseurl + 'mall/shop/deleteSupplier', // 商户管理删除信息

  // 文章管理
  ArticleManagement: baseurl + 'api/article/type/manage', // 文章管理树
  AddarticleTitle: baseurl + 'api/article/type/create', // 新增管理树
  AddImage: baseurl + 'api/article/type/manageIcon', // 添加图片
  ModifyArticle: baseurl + 'api/article/type/modify', // 修改标题
  DeleteArticle: baseurl + 'api/article/type/delete', // 删除标题

  // 汇店管理 拼团信息
  HDgetTabGoods: baseurl + 'mall/v1/mall/getTabGoods', // 添加商品-选择商品
  HDaddCombination: baseurl + 'mall/v1/mall/addCombination', // 添加拼团
  HDgetCombination: baseurl + 'mall/v1/mall/getCombination', // 回显拼团活动
  HDgetCombinations: baseurl + 'mall/v1/mall/getCombinations', // 拼团活动列表
  HDupdateCombination: baseurl + 'mall/v1/mall/updateCombination', // 拼团活动编辑
  HDgetTeam: baseurl + 'mall/v1/mall/getTeam', // 活动记录列表

  // 汇店管理  文章类型
  HDcreate: baseurl + 'api/article/type/create', // 添加文章类型
  HDmodify: baseurl + 'api/article/type/modify', // 修改文章类型
  HDgetTypeList: baseurl + 'api/article/type/getTypeList', // 列表文章类型
  HDdelete: baseurl + 'api/article/type/delete', // 删除文章类型

  // 汇店管理  文章
  HDaddArticle: baseurl + 'api/article/huidian/addArticle', // 添加文章
  HDupdateArticle: baseurl + 'api/article/huidian/updateArticle', // 修改文章
  HDgetArticles: baseurl + 'api/article/huidian/getArticles', // 列表文章
  HDgetArticle: baseurl + 'api/article/huidian/getArticle', // 文章回显
  HDdeleteArticle: baseurl + 'api/article/huidian/deleteArticle', // 删除文章
  HDupdateState: baseurl + 'api/article/huidian/updateState', // 文章上下架

  HDgetCheckList: baseurl + 'api/article/huidian/getCheckList', // 审核文章列表
  HDgetCheckDetail: baseurl + 'api/article/huidian/getCheckDetail', // 审核文章内容
  HDupdateCheckResult: baseurl + 'api/article/huidian/updateCheckResult'// 审核文章

}

