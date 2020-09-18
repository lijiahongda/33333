// /** When your routing table is too long, you can split it into small modules**/


// /** When your routing table is too long, you can split it into small modules**/

// import Layout from '@/views/layout/Layout'

// const otherRouter = [ // 用户管理
// 	{
//     path: '/',
//     component: Layout,
//     redirect:'/admin/list'},
// 		{
// 		  path: '/home',
// 		  component: Layout,
// 		  meta: {
// 		    icon: 'eye', roles: ['admin']
// 		  },
// 		  children: [
// 		    {
// 		      path: 'index',
// 		      component: () => import('@/views/newData/home/index'),
// 		      name: '运营日报',
// 		      meta: { title: '运营日报' }
// 		    }
// 		  ]
// 		},
//   {
//     path: '/admin',
//     component: Layout,
//     name: '欢迎页',
//     meta: {
//       title: '欢迎页',
//       icon: 'lock', roles: ['yangjian','kefu','tianfeng']
//     },
//     children: [
//       {
//         path: 'list',
//         component: () => import('@/views/newData/admin/index'),
//         name: '欢迎页',
//         meta: { title: '欢迎页' }
//       }
//     ]
//   },
//   // 用户管理
//   {
//     path: '/financialStatementData',
//     component: Layout,
//     name: '财务数据报表',
//     meta: {
//       title: '财务数据报表',
// 			 icon: 'link', 
// 			 roles:['admin','2']
//     },
//     children: [
//       {
//         path: 'createTableList',
//         component: () => import('@/views/financialStatementData/createTable/createTableList'),
//         name: '创建数据报表',
//         meta: { title: '创建数据报表' }
//       },
//       {
//         path: 'createTable_add',
//         component: () => import('@/views/financialStatementData/createTable/createTable_add'),
//         name: '数据报表创建',
//         hidden: true,
//         meta: { title: '数据报表创建' }
//       },
//       {
//         path: 'createTable_add_key',
//         component: () => import('@/views/financialStatementData/createTable/createTable_add_key'),
//         name: '添加字段',
//         hidden: true,
//         meta: { title: '添加字段' }
//       },
//       {
//         path: 'createTable_add_data',
//         component: () => import('@/views/financialStatementData/createTable/createTable_add_data'),
//         name: '添加数据',
//         hidden: true,
//         meta: { title: '添加数据' }
//       },
//       {
//         path: 'keysTableList',
//         component: () => import('@/views/financialStatementData/keysTable/keysTableList'),
//         name: '字段管理',
//         meta: { title: '字段管理' }
//       },
//       {
//         path: 'keysTable_add',
//         component: () => import('@/views/financialStatementData/keysTable/keysTable_add'),
//         name: '添加字段',
//         hidden: true,
//         meta: { title: '添加字段' }
//       },
//       {
//         path: 'dataReportList',
//         component: () => import('@/views/financialStatementData/dataReport/dataReportList'),
//         name: '数据报表',
//         meta: { title: '数据报表' }
//       },
//       {
//         path: 'dataReportOptions',
//         component: () => import('@/views/financialStatementData/dataReport/dataReportOptions'),
//         name: '数据报表-详情',
//         hidden: true,
//         meta: { title: '数据报表-详情' }
//       }
//     ]
//   },
//   {// 定制游管理
//     path: '/cust',
//     component: Layout,
//     name: '定制游管理',
//     meta: {
//       title: '定制游管理',
//       icon: 'tab', roles: ['admin']
//     },
//     children: [
//       {
//         path: 'list',
//         component: () => import('@/views/newData/cust/list'),
//         name: '定制游列表',
//         meta: { title: '定制游列表' }
//       },
//       {
//         path: 'show',
//         component: () => import('@/views/newData/cust/show'),
//         name: '查看/更新',
//         hidden:true,
//         meta: { title: '查看/更新' }
//       },
//       {
//         path: 'caseList',
//         component: () => import('@/views/newData/cust/caseList'),
//         name: '定制游案例列表',
//         meta: { title: '定制游案例列表' }
//       },
//       {
//         path: 'caseShow',
//         component: () => import('@/views/newData/cust/caseShow'),
//         name: '查看/更新案例',
//         meta: { title: '查看/更新案例' }
//       }]
//   }, {// 新悦商城管理
//     path: '/newmall',
//     component: Layout,
//     name: '新悦商城管理',
//     meta: {
//       title: '新悦商城管理',
//       icon: 'shopping',roles:['yangjian'] 
//     },
//     children: [
//       {
//         path: 'shopSku',
//         component: () => import('@/views/newData/newmall/shopSku'),
//         name: '新增Sku',
// 				hidden:true,
//         meta: { title: '新增Sku' }
//       },
// 			{
// 			  path: 'shopAdd',
// 			  component: () => import('@/views/newData/newmall/shopAdd'),
// 			  name: '新增商品',
// 			  meta: { title: '新增商品' }
// 			},
//       {
//         path: 'shopList',
//         component: () => import('@/views/newData/newmall/shopList'),
//         name: '商品列表',
//         meta: { title: '商品列表' }
//       },
//       {
//         path: 'shoplabel',
//         component: () => import('@/views/newData/newmall/shoplabel'),
//         name: '商品标签',
//         meta: { title: '商品标签'}
//       }, {
//         path: 'distribution',
//         component: () => import('@/views/newData/newmall/distribution'),
//         name: '分销规则管理',
//         meta: { title: '分销规则管理' }
//       }, {
//         path: 'distributionAdd',
//         component: () => import('@/views/newData/newmall/distributionAdd'),
//         name: '添加分销规则管理',
//         hidden: true,
//         meta: { title: '添加分销规则管理' }
//       }, {
//         path: 'supplier',
//         component: () => import('@/views/newData/newmall/supplier'),
//         name: '供应商管理',
//         meta: { title: '供应商管理'  }
//       }]
//   },
//   {// 营销活动
//     path: '/mall',
//     component: Layout,
//     name: '营销活动',
//     meta: {
//       title: '营销活动',
//       icon: 'nested', roles: ['admin','yangjian']
//     },
//     children: [
//       {
//         path: 'coupon',
//         component: () => import('@/views/newData/mall/coupon'),
//         name: '优惠券管理',
//         meta: { title: '优惠券管理' }
//       }, {
//         path: 'addCoupon',
//         component: () => import('@/views/newData/mall/addCoupon'),
//         name: '新增优惠券',
//         meta: { title: '新增优惠券' }
//       }, {
//         path: 'MerchantList',
//         component: () => import('@/views/newData/mall/MerchantList'),
//         name: '商户优惠券管理',
//         meta: { title: '商户优惠券管理' }
//       }]
//   },
//   {// 悦消息管理
//     path: '/yueMsg',
//     component: Layout,
//     name: '悦消息管理',
//     meta: {
//       title: '悦消息管理',
//       icon: 'message', roles: ['admin','yangjian']
//     },
//     children: [
//       {
//         path: 'msgList',
//         component: () => import('@/views/newData/yueMsg/msgList'),
//         name: '悦消息列表',
//         meta: { title: '悦消息列表' }
//       }, {
//         path: 'msgNew',
//         component: () => import('@/views/newData/yueMsg/msgNew'),
//         name: '新品上新列表',
//         meta: { title: '新品上新列表' }
//       }, {
//         path: 'msgActivity',
//         component: () => import('@/views/newData/yueMsg/msgActivity'),
//         name: '最新活动列表',
//         meta: { title: '最新活动列表' }
//       }, {
//         path: 'msgOptions',
//         component: () => import('@/views/newData/yueMsg/msgOptions'),
//         name: '悦消息详情',
//         hidden: true,
//         meta: { title: '悦消息详情' }
//       }, {
//         path: 'msgActivityOptions',
//         component: () => import('@/views/newData/yueMsg/msgActivityOptions'),
//         name: '最新活动详情',
//         hidden: true,
//         meta: { title: '最新活动详情' }
//       }, {
//         path: 'msgNewOptions',
//         component: () => import('@/views/newData/yueMsg/msgNewOptions'),
//         name: '新品详情',
//         hidden: true,
//         meta: { title: '新品详情' }
//       }]
//   },
//   {// 悦旅大学
//     path: '/school',
//     component: Layout,
//     name: 'school',
//     meta: {
//       title: '悦旅大学',
//       icon: 'tree', roles: ['admin']
//     },
//     children: [
//       {
// 			  name: 'column',
// 			  path: 'column',
//         component: () => import('@/views/newData/school/ArticleManagement'),
// 			  meta: { title: '栏目管理' }
//       },
//       {
//         path: 'article',
//         component: () => import('@/views/newData/school/article'),
//         name: 'article',
//         meta: { title: '文章管理' }
//       }, {
//         path: 'material',
//         component: () => import('@/views/newData/school/material'),
//         name: 'material',
//         hidden: true,
//         meta: { title: '文章管理详情' }
//       }, {
//         path: 'article_sucai',
//         component: () => import('@/views/newData/school/article_sucai'),
//         name: 'article_sucai',
//         hidden:true,
//         meta: { title: '素材管理' }
//       }, {
//         path: 'material_sucai',
//         component: () => import('@/views/newData/school/material_sucai'),
//         name: 'material_sucai',
//         hidden: true,
//         meta: { title: '素材管理详情' }
//       }]
//   },
//   //投放管理
//   {
//     path: '/throw',
//     component: Layout,
//     name: '投放管理', 
//     meta: { title: '投放管理',icon:"money", roles: ['admin','editor']}, 
//     children: [
//       {
//         path: 'throwList',
//         component: () => import('@/views/newData/throw/throw'),
//         name: '销售线索',
//         // hidden: true,
//         meta: { title: '销售线索' },
				
//       },{
//         path: 'channel',
//         component: () => import('@/views/newData/throw/channel'),
//         name: '投放渠道',
//         // hidden: true,
//         meta: { title: '投放渠道'},
//       },
//     ]
//   },
// 	{// 运营管理
// 	  path: '/operate',
// 	  component: Layout,
// 	  name: 'operate',
// 	  meta: {
// 	    title: '运营管理',
// 	    icon: 'theme',
// 			roles:['admin','yangjian']
// 	  },
// 	  children: [
// 	   {
// 	     path: 'bargainAdd',
// 	     component: () => import('@/views/newData/operate/bargainAdd'),
// 	     name: 'bargainAdd',
// 			 hidden:true,
// 	     meta: { title: '砍价新增' }
// 	   }, {
// 	     path: 'bargainList',
// 	     component: () => import('@/views/newData/operate/bargainList'),
// 	     name: 'bargainList',
// 	     meta: { title: '砍价管理' }
// 	   }, {
// 	     path: 'gropAdd',
// 	     component: () => import('@/views/newData/operate/gropAdd'),
// 	     name: 'gropAdd',
// 			 hidden:true,
// 	     meta: { title: '新增拼团' }
// 	   }, {
// 	     path: 'gropList',
// 	     component: () => import('@/views/newData/operate/gropList'),
// 	     name: 'gropList',
// 	     meta: { title: '拼团管理' }
// 	   }, {
// 	     path: 'gropDistribution',
// 	     component: () => import('@/views/newData/operate/gropDistribution'),
// 	     name: 'gropDistribution',
// 	     meta: { title: '拼团分销管理' }
// 	   }, {
// 	     path: 'gropDistributionAdd',
// 	     component: () => import('@/views/newData/operate/gropDistributionAdd'),
// 	     name: 'gropDistributionAdd',
// 			 hidden:true,
// 	     meta: { title: '新增拼团分销管理规则' }
// 	   },{
// 	     path: 'spikeAdd',
// 	     component: () => import('@/views/newData/operate/spikeAdd'),
// 	     name: 'spikeAdd',
// 			 hidden:true,
// 	     meta: { title: '新增秒杀' }
// 	   }, {
// 	     path: 'spikeList',
// 	     component: () => import('@/views/newData/operate/spikeList'),
// 	     name: 'spikeList',
// 	     meta: { title: '秒杀管理' }
// 	   },{
//         path: 'activity',
//         component: () => import('@/views/newData/operate/activity'),
//         name: '活动管理',
//         meta: { title: '活动管理' }
//       },{
//         path: 'activityAll',
//         component: () => import('@/views/newData/operate/activityAll'),
//         name: 'coupon',
//         meta: { title: '综合活动管理' }
//       },{
//         path: 'activityAllAdd',
//         component: () => import('@/views/newData/operate/activityAllAdd'),
// 				hidden:true,
//         name: '新增综合活动管理',
//         meta: { title: '新增综合活动管理' }
//       },{
//         path: 'coupon',
//         component: () => import('@/views/newData/operate/coupon'),
//         name: 'coupon',
//         meta: { title: '优惠券专题管理' }
//       },{
//         path: 'couponAdd',
//         component: () => import('@/views/newData/operate/couponAdd'),
// 				hidden:true,
//         name: '新增优惠券专题管理',
//         meta: { title: '新增优惠券专题管理' }
//       },{
//         path: 'activityAdd',
//         component: () => import('@/views/newData/operate/activityAdd'),
// 				hidden:true,
//         name: '添加活动',
//         meta: { title: '添加活动' }
//       },{
//         path: 'integralMall',
//         component: () => import('@/views/newData/operate/integralMall'),
//         name: '积分商城',
//         meta: { title: '积分商城' }
//       },{
//         path: 'integralAdd',
//         component: () => import('@/views/newData/operate/integralAdd'),
// 				hidden:true,
//         name: '新增积分商城商品',
//         meta: { title: '新增积分商城商品' }
//       },
// 			 {
// 			  path: 'list',
// 			  component: () => import('@/views/newData/advert/list'),
// 			  name: 'list',
// 			  meta: { title: '广告管理' }
// 			},
// 			{
// 			  path: 'update',
// 			  component: () => import('@/views/newData/advert/update'),
// 			  name: 'update',
// 			  hidden: true,
// 			  meta: { title: '广告编辑' }
// 			},
// 			{
// 			  path: 'qrCode',
// 			  component: () => import('@/views/newData/operate/qrCode'),
// 			  name: 'qrCode',
// 				hidden:true,
// 			  meta: { title: '二维码管理' }
// 			},
// 	  ]
// 	},
//   {// 汇店管理
//     path: '/shop',
//     component: Layout,
//     name: 'shop',
//     meta: {
//       title: '汇店管理',
//       icon: 'example', roles: ['admin']
//     },
//     children: [
//       {
//         path: 'textAdd',
//         component: () => import('@/views/newData/shop/textAdd'),
//         name: 'textAdd',
//         meta: { title: '文章添加' }
//       }, {
//         path: 'textList',
//         component: () => import('@/views/newData/shop/textList'),
//         name: 'textList',
//         meta: { title: '文章列表' }
//       }, {
//         path: 'textType',
//         component: () => import('@/views/newData/shop/textType'),
//         name: 'textType',
//         meta: { title: '文章类型管理' }
//       }, {
//         path: 'textTo',
//         component: () => import('@/views/newData/shop/textTo'),
//         name: 'textTo',
//         meta: { title: '文章审核' }
//       }]
//   }, {
//     path: '',
//     component: Layout,
//     name: '订单管理',
//     meta: {
//       title: '订单管理',
//       icon: 'documentation', 
// 			roles:['kefu','tianfeng']
//     },
//     children: [
//       {
//         path: 'hotel-order',
//         component: () => import('@/views/OrderManage/hotelOrder/hotelOrder'),
//         name: '酒店订单',
//         meta: { title: '酒店订单' }
//       },
//       {
//         path: 'hotel-detail',
//         component: () => import('@/views/OrderManage/hotelOrder/hotelDetail'),
//         name: '酒店订单详情',
//         hidden: true,
//         meta: { title: '酒店订单详情' }
//       },
//       {
//         path: 'EliteCard-order',
//         component: () => import('@/views/OrderManage/EliteCardOrder'),
//         name: '精英卡订单',
//         meta: { title: '精英卡订单' }
//       },
//       {
//         path: 'shopMall-order',
//         component: () => import('@/views/OrderManage/shopMallOrder/shopMallOrder'),
//         name: '商城订单',
//         meta: { title: '商城订单' }
//       },
//       {
//         path: 'shopMall-detail',
//         component: () => import('@/views/OrderManage/shopMallOrder/shopMallDetail'),
//         name: '商城订单详情',
//         hidden: true,
//         meta: { title: '商城订单详情' }
//       },

//       {
//         path: 'line-order',
//         component: () => import('@/views/OrderManage/lineOrder/lineOrder'),
//         name: '线路订单',
//         meta: { title: '线路订单' }
//       },
//       {
//         path: 'line-detail',
//         component: () => import('@/views/OrderManage/lineOrder/lineDetail'),
//         name: '线路订单详情',
//         hidden: true,
//         meta: { title: '线路订单详情' }
//       },
//       {
//         path: 'Adult-order',
//         component: () => import('@/views/OrderManage/AdultOrder'),
//         name: '大人订单',
//         meta: { title: '大人订单' }
//       }
//     ]
//   },
//   // 用户管理
//   {
//     path: '/userManage',
//     component: Layout,
//     name: '用户管理',
//     meta: {
//       title: '用户管理',
//       icon: 'peoples', roles: ['kefu','tianfeng']
//     },
//     children: [
//       {
//         path: 'user-order',
//         component: () => import('@/views/UserManage/platformUser/platformUser'),
//         name: '平台用户',
//         meta: { title: '平台用户' }
//       },
//       {
//         path: 'user-info',
//         component: () => import('@/views/UserManage/platformUser/userInfo'),
//         name: '平台用户详情',
//         hidden: true,
//         meta: { title: '平台用户详情' }
//       }
//     //   {
//     //     path: 'CompanyAccount-order',
//     //     component: () => import('@/views/UserManage/CompanyAccount/CompanyAccount'),
//     //     name: '公司账号',
//     //     meta: { title: '公司账号' }
//     //   }
//     ]
//   }, {
//     path: '/user-center',
//     component: Layout,
//     name: '数据中心',
//     redirect: '/user-center/user-data-list',
//     meta: { title: '数据中心', icon: 'drag', roles: ['admin'] },
//     children: [
//       {
//         path: 'user-data-purchase',
//         component: () => import('@/views/dataCenter/userData/userDatePurchase'), // 复购
//         name: '用户数据(复购)',
//         hidden: true,
//         meta: { title: '用户数据(复购)' }
//       },
//       {
//         path: 'user-data-ranking',
//         component: () => import('@/views/dataCenter/userData/userDateRanking'), // 排行
//         name: '用户数据(排行)',
//         hidden: true,
//         meta: { title: '用户数据(排行)' }
//       },
//       {
//         path: 'user-data-add',
//         component: () => import('@/views/dataCenter/userData/addUserData'), // 新增用户
//         name: '新增用户',
//         hidden: true,
//         meta: { title: '新增用户' }
//       },
//       {
//         path: 'user-mamber-add',
//         component: () => import('@/views/dataCenter/userData/addMember'), // 新增会员
//         name: '新增会员',
//         hidden: true,
//         meta: { title: '新增会员' }
//       },
//       {
//         path: 'user-hotel-usage',
//         component: () => import('@/views/dataCenter/userData/hotelVoucherUsage'), // 酒店券使用量
//         name: '新人酒店券使用量',
//         hidden: true,
//         meta: { title: '新人酒店券使用量' }
//       },
//       {
//         path: 'user-mall-usage',
//         component: () => import('@/views/dataCenter/userData/ShoppingCouponUsage'), // 商城券使用量
//         name: '新人商城券使用量',
//         hidden: true,
//         meta: { title: '新人商城券使用量' }
//       },
//       {
//         path: 'adult-order-statistics',
//         component: () => import('@/views/dataCenter/AdultStatistics/index'), // 大人
//         name: '大人数据统计',
//         hidden: true,
//         meta: { title: '大人数据统计' }
//       },
//       {
//         path: '/user-data-list',
//         component: () => import('@/views/dataCenter/userData/index'),
//         name: '用户数据统计', meta: { title: '用户数据统计' },
//         children: [
//           {
//             path: 'user-data-statistics',
//             component: () => import('@/views/dataCenter/userData/userDataList/statistics'), //
//             name: '用户数据统计',
//             meta: { title: '用户数据统计' }
//           },
//           {
//             path: 'user-data-bonus',
//             component: () => import('@/views/dataCenter/userData/userDataList/bonus'), // 奖金明细
//             name: '用户奖金明细',
//             meta: { title: '用户奖金明细' }
//           },
//           {
//             path: 'user-data-withdrawal',
//             component: () => import('@/views/dataCenter/userData/userDataList/indexs'), //
//             name: '用户提现明细',
//             meta: { title: '用户提现明细' }
//           }
//         ]
//       },
//       {
//         path: '/hotel-lists',
//         component: () => import('@/views/dataCenter/hotelOrderStatistics/index'), // 酒店统计列表
//         name: '酒店统计',
//         redirect: '/user-center/hotel-lists//hotel-order-city-dimension',
//         // hidden: true,
//         meta: { title: '酒店统计' },
//         children: [
//           {
//             path: 'hotel-order-statistics',
//             component: () => import('@/views/dataCenter/hotelOrderStatistics/hotelOrderStatistics'), // 酒店下单量
//             name: '酒店下单统计',
//             // hidden: true,
//             meta: { title: '酒店下单统计' }
//           },
//           {
//             path: 'hotel-order-city-dimension',
//             component: () => import('@/views/dataCenter/hotelOrderStatistics/cityDimension/index'), // 酒店下单量
//             name: '城市维度统计',
//             // hidden: true,
//             meta: { title: '城市维度统计' }
//           },
//           {
//             path: 'hotel-order-hotel-dimension',
//             component: () => import('@/views/dataCenter/hotelOrderStatistics/hotelDimension/index'), // 酒店下单量
//             name: '酒店维度统计',
//             // hidden: true,
//             meta: { title: '酒店维度统计' }
//           },
//           {
//             path: 'hotel-order-channel-dimension',
//             component: () => import('@/views/dataCenter/hotelOrderStatistics/channelDimension/index'), // 酒店下单量
//             name: '渠道维度统计',
//             // hidden: true,
//             meta: { title: '渠道维度统计' }
//           }
//         ]
//       },
//       {
//         path: '/mall-lists',
//         component: () => import('@/views/dataCenter/mallOrderStatistics/index'), // 商城下单量
//         name: '商城统计', meta: { title: '商城统计' }, children: [
//           {
//             path: 'mall-order-list',
//             component: () => import('@/views/dataCenter/mallOrderStatistics/listDimension/index'),
//             name: '商城下单统计',
//             // hidden: true,
//             meta: { title: '商城下单统计' }
//           },
//           {
//             path: 'mall-order-goods-list',
//             component: () => import('@/views/dataCenter/mallOrderStatistics/mallDimension/index'),
//             name: '商品维度统计',
//             // hidden: true,
//             meta: { title: '商品维度统计' }
//           },
//           {
//             path: 'mall-order-goods-info',
//             component: () => import('@/views/dataCenter/mallOrderStatistics/mallDimension/info'),
//             name: '商品维度详情',
//             hidden: true,
//             meta: { title: '商品维度详情' }
//           },
//           {
//             path: 'mall-order-channel-list',
//             component: () => import('@/views/dataCenter/mallOrderStatistics/channelDimension/index'),
//             name: '渠道维度统计',
//             // hidden: true,
//             meta: { title: '渠道维度统计' }
//           },
//           {
//             path: 'mall-order-channel-info',
//             component: () => import('@/views/dataCenter/mallOrderStatistics/channelDimension/info'), // 酒店下单量
//             name: '渠道维度详情',
//             hidden: true,
//             meta: { title: '渠道维度详情' }
//           }
//         ]
//       },
//       {
//         path: 'line-order-statistics',
//         component: () => import('@/views/dataCenter/lineOrderStatistics/index'), // 线路下单量
//         name: '线路下单统计',
//         // hidden: true,
//         meta: { title: '线路下单统计' }
//       },
//       {
//         path: 'line-supplier-info',
//         component: () => import('@/views/dataCenter/lineOrderStatistics/lineInfo'), // 线路下单量
//         name: '线路供应商时间维度统计',
//         hidden: true,
//         meta: { title: '线路供应商时间维度统计' }
//       },
// 			{
// 			  path: 'statistics',
// 			  component: () => import('@/views/dataCenter/statistics'),
// 			  name: 'statistics',
// 			  meta: { title: '拼团统计' }
// 			}
//     ]
//   }]

// export default otherRouter
