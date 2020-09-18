/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/views/layout/Layout'

if (localStorage.getItem('userRole') == 1) {
	var routerName = '/main/index'
} else {
	var routerName = '/main/index'
}
// var routerName = '/home/index'
// var routerName = '/admin/list'
const nestedRouter = [ // 用户管理
	{
		path: '/',
		component: Layout,
		redirect: routerName
	}, {
		path: '/admin/index',
		component: Layout,
		name: '欢迎页',
		meta: {
			title: '欢迎页',
			icon: 'lock'
		},
		children: [{
			path: 'list',
			component: () => import('@/views/newData/admin/index'),
			name: '欢迎页',
			meta: {
				title: '欢迎页'
			}
		}]
	},

	// login
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true
	},

	{
		path: '/cidms',
		component: () => import('@/views/cidms/cidms'),
		name: '登录',
		meta: {
			title: '登录',
			icon: 'lock'
		}
	},

	// 首页
	{
		path: '/main/main',
		component: () => import('@/views/zpages/main/index')
	},
	{
		path: '/main',
		component: Layout,
		name: '首页',
		redirect: '/main/index',
		meta: {
			title: '首页',
			icon: 'dashboard',
			roles: ['admin']
		},
		children: [{
			path: '/main/index',
			name: '首页',
			component: () => import('@/views/zpages/main/index'),
			meta: {
				title: '实时统计',
				roles: ['admin']
			}
		}, {
			path: '/main/password',
			name: '修改密码',
			component: () => import('@/views/zpages/main/password/index'),
			meta: {
				title: '修改密码',
				roles: ['admin']
			}
		}, {
			path: '/main/dataCollect',
			name: '群主统计',
			component: () => import('@/views/zpages/main/dataCollect'),
			meta: {
				title: '群统计',
				roles: ['admin']
			}
		},
			{
				path: '/main/groupManager',
				name: '群主统计',
				component: () => import('@/views/zpages/main/groupManager'),
				meta: {
					title: '群主统计',
					roles: ['admin']
				}
			},
			// {
			//   path: '/main/demo',
			//   name: '群主统计',
			//   component: () => import('@/views/zpages/main/demo'),
			//   meta: {
			//     title: '群主统计',
			//     roles: ['admin']
			//   }
			// },
			{
				path: '/main/dataCollect/info',
				name: '群主统计详情',
				component: () => import('@/views/zpages/main/info/index'),
				meta: {
					title: '群统计详情',
					roles: ['admin']
				}
			}, {
				path: '/main/adminList',
				name: '管理员统计',
				component: () => import('@/views/zpages/main/adminList'),
				meta: {
					title: '管理员统计',
					roles: ['admin']
				}
			}, {
				path: '/main/wxMemberList',
				name: '群成员',
				component: () => import('@/views/zpages/main/wxMemberList'),
				meta: {
					title: '群成员',
					roles: ['admin']
				}
			}, {
				path: '/main/ownerlist',
				name: '群主统计',
				component: () => import('@/views/zpages/main/ownerlist'),
				meta: {
					title: '群主统计',
					roles: ['admin']
				}
			}, {
				path: '/main/comStatisics',
				name: '商品统计',
				component: () => import('@/views/zpages/main/comStatisics'),
				meta: {
					title: '商品统计',
					roles: ['admin']
				}
			}, {
				path: '/main/couponStatisics',
				name: '优惠券统计',
				component: () => import('@/views/zpages/main/couponStatisics'),
				meta: {
					title: '优惠券统计',
					roles: ['admin']
				}
			}, {
				path: '/main/active',
				name: '活跃度统计',
				component: () => import('@/views/zpages/main/active'),
				meta: {
					title: '实时统计',
					roles: ['admin']
				}
			},
			{
				path: '/main/groupactive',
				name: '分组统计',
				component: () => import('@/views/zpages/main/groupactive'),
				meta: {
					title: '分组统计',
					roles: ['admin']
				}
			},
			{
				path: '/main/live',
				name: '直播社群统计',
				component: () => import('@/views/zpages/main/live'),
				meta: {
					title: '直播社群统计',
					roles: ['admin']
				}
			},
			{
				path: '/main/commission',
				name: '佣金统计',
				component: () => import('@/views/zpages/main/commissionDay'),
				meta: {
					title: '分佣统计',
					roles: ['admin']
				}
			}
		]
	},
	// 购买
	{
		path: '/buy',
		component: Layout,
		name: '购买',
		redirect: '/buy/buy',
		meta: {
			title: '购买',
			icon: 'lock'
		},
		children: [{
			path: '/buy/buy',
			component: () => import('@/views/buy/buy'),
			name: '购买套餐',
			meta: {
				title: '购买套餐'
			}
		},
			{
				path: '/buy/examine',
				component: () => import('@/views/buy/examine'),
				name: '人工审核',
				meta: {
					title: '人工审核'
				}
			}
		]
	},
	// 审核
	{
		path: '/examine',
		redirect: '/examine/index',
		component: Layout,
		name: '审核管理',
		meta: {
			title: '审核管理',
			icon: 'lock'
		},
		children: [{
			path: '/examine/index',
			component: () => import('@/views/zpages/examine/index'),
			name: '审核列表',
			meta: {
				title: '审核列表'
			}
		}, {
			path: '/examine/manager',
			component: () => import('@/views/zpages/examine/manager'),
			name: '店长升级列表',
			meta: {
				title: '店长升级列表'
			}
		}]
	},
	// 我的机器人
	{
		path: '/robotInfo',
		redirect: '/robotInfo/index',
		component: Layout,
		name: '我的机器人',
		meta: {
			title: '我的机器人',
			icon: 'lock'
		},
		children: [{
			path: '/robotInfo/index',
			component: () => import('@/views/zpages/robotInfo/index'),
			name: '我的机器人列表',
			meta: {
				title: '机器人列表'
			}
		}, {
			path: '/robotInfo/info',
			component: () => import('@/views/zpages/robotInfo/info/index'),
			name: '我的机器人详情',
			meta: {
				title: '机器人详情'
			}
		}, {
			path: '/robotInfo/applyLogs',
			component: () => import('@/views/robotManage/applyLogs'),
			name: '我的机器人申请记录',
			meta: {
				title: '机器人申请记录'
			}
		}]
	},
	// 优惠券
	{
		path: '/coupons',
		component: Layout,
		name: '优惠券',
		meta: {
			title: '优惠券',
			icon: 'lock'
		},
		children: [{
			path: '/coupons/List',
			component: () => import('@/views/coupons/couponsList'),
			name: '优惠券列表',
			meta: {
				title: '优惠券列表'
			}
		}, {
			path: '/coupons/managementList',
			component: () => import('@/views/coupons/management/list'),
			name: '优惠券列表',
			meta: {
				title: '优惠券列表'
			}
		}]
	},
	// 建群
	{
		path: '/group',
		component: Layout,
		name: '建群',
		meta: {
			title: '建群',
			icon: 'lock'
		},
		children: [{
			path: '/group/newPeople',
			component: () => import('@/views/group/newPeople'),
			name: '新人上手',
			meta: {
				title: '新人上手'
			}
		}, {
			path: '/group/upgrade',
			component: () => import('@/views/group/upgrade'),
			name: '群升级',
			meta: {
				title: '群升级'
			}
		}, {
			path: '/group/list',
			component: () => import('@/views/group/list'),
			name: '群列表',
			meta: {
				title: '群列表'
			}
		}]
	},
	{
		path: '/material',
		component: Layout,
		redirect: '/material/list',
		name: '群发素材',
		meta: {
			title: '群发素材',
			icon: 'dashboard',
			roles: ['admin']
		},
		children: [{
			path: '/material/list',
			name: '群发素材',
			component: () => import('@/views/material/list'),
			meta: {
				title: '素材列表',
				roles: ['admin']
			}
		}, {
			path: '/material/edit',
			name: '素材编辑',
			component: () => import('@/views/material/edit'),
			meta: {
				title: '素材编辑',
				roles: ['admin']
			}
		}, {
			path: '/material/tags',
			name: '标签管理',
			component: () => import('@/views/material/tags'),
			meta: {
				title: '标签管理',
				roles: ['admin']
			}
		}, {
			path: '/material/guides/index',
			name: '教程列表',
			component: () => import('@/views/material/guides/index'),
			meta: {
				title: '教程列表',
				roles: ['admin']
			}
		}, {
			path: '/material/guides/edit',
			name: '教程编辑',
			component: () => import('@/views/material/guides/edit'),
			meta: {
				title: '教程编辑',
				roles: ['admin']
			}
		}, {
			path: '/material/guides/categoryList',
			name: '攻略分类管理',
			component: () => import('@/views/material/guides/categoryList'),
			meta: {
				title: '教程分类管理',
				roles: ['admin']
			}
		}]
	}, ,
	{
		path: '/course',
		component: Layout,
		redirect: '/course/guides/index',
		name: '教程',
		meta: {
			title: '教程',
			icon: 'dashboard',
			roles: ['admin']
		},
		children: [{
			path: '/course/guides/index',
			name: '教程列表',
			component: () => import('@/views/material/guides/index'),
			meta: {
				title: '教程列表',
				roles: ['admin']
			}
		}, {
			path: '/course/guides/edit',
			name: '教程编辑',
			component: () => import('@/views/material/guides/edit'),
			meta: {
				title: '教程编辑',
				roles: ['admin']
			}
		}, {
			path: '/course/guides/categoryList',
			name: '攻略分类管理',
			component: () => import('@/views/material/guides/categoryList'),
			meta: {
				title: '教程分类管理',
				roles: ['admin']
			}
		}]
	},
	{
		path: '/accountManagement',
		component: Layout,
		name: '账号管理',
		meta: {
			title: '账号管理',
			icon: 'dashboard',
			roles: ['admin']
		},
		children: [{
			path: '/accountManagement/accountList',
			name: '账号列表',
			component: () => import('@/views/accountManagement/accountList'),
			meta: {
				title: '账号列表',
				roles: ['admin']
			}
		},

			{
				path: '/accountManagement/openAccount',
				name: '开通账号',
				component: () => import('@/views/accountManagement/openAccount'),
				meta: {
					title: '开通账号',
					roles: ['admin']
				}
			}
		]
	}, {
		path: '/robot',
		component: Layout,
		name: '机器人群',
		meta: {
			title: '机器人群',
			icon: 'dashboard',
			roles: ['admin']
		},
		children: [{
			path: '/robot/List',
			name: '机器人群列表',
			component: () => import('@/views/robot/list'),
			meta: {
				title: '机器人群列表',
				roles: ['admin']
			}
		}]
	},
	{
		path: '/power',
		component: Layout,
		name: '权限管理',
		redirect: '/power/log',
		meta: {
			title: '权限管理',
			icon: 'dashboard'
		},
		children: [{
			path: '/power/log',
			name: '操作日志',
			component: () => import('@/views/zpages/power/log'),
			meta: {
				title: '操作日志'
			}
		},
			{
				path: '/power/userRole',
				name: '角色管理',
				component: () => import('@/views/zpages/power/userRole'),
				meta: {
					title: '角色管理'
				}
			},
			{
				path: '/power/userRoleAdd',
				name: '角色设置',
				component: () => import('@/views/zpages/power/userRoleAdd'),
				meta: {
					title: '角色设置'
				}
			},
			{
				path: '/power/adminUser',
				name: '用户管理',
				component: () => import('@/views/zpages/power/adminUser'),
				meta: {
					title: '用户管理'
				}
			}
		]
	},
	{
		path: '/friends',
		component: Layout,
		name: '好友管理',
		redirect: '/friends/list',
		meta: {
			title: '好友管理',
			icon: 'lock'
		},
		children: [{
			path: '/friends/list',
			component: () => import('@/views/friends/list'),
			name: '好友列表',
			meta: {
				title: '好友列表'
			}
		}]
	},
	{
		path: '/newOrder',
		component: Layout,
		name: '订单列表',
		redirect: '/newOrder/list',
		meta: {
			title: '订单列表',
			icon: 'lock'
		},
		children: [{
			path: '/newOrder/list',
			component: () => import('@/views/newOrder/list'),
			name: '订单列表',
			meta: {
				title: '订单列表'
			}
		}]
	},
	{
		path: '/Reply',
		component: Layout,
		name: '自动回复',
		redirect: '/Reply/keyword',
		meta: {
			title: '自动回复',
			icon: 'lock'
		},
		children: [{
			path: '/Reply/keyword',
			component: () => import('@/views/zpages/Reply/keyword'),
			name: '关键词列表',
			meta: {
				title: '关键词列表'
			}
		}, {
			path: '/Reply/contentList',
			component: () => import('@/views/zpages/Reply/contentList'),
			name: '内容列表',
			meta: {
				title: '内容列表'
			}
		}, {
			path: '/Reply/new',
			component: () => import('@/views/zpages/Reply/new'),
			name: '新人进群自动回复',
			meta: {
				title: '新人进群自动回复'
			}
		},{
			path: '/Reply/keywordstatis',
			component: () => import('@/views/zpages/Reply/Keywordstatis'),
			name: '关键词统计',
			meta: {
				title: '关键词统计'
			}
		},
		{
			path: '/Reply/keywordstatisDetail',
			component: () => import('@/views/zpages/Reply/KeywordstatisDetail'),
			name: '关键词详情',
			meta: {
				title: '关键词详情'
			}
		}]
	},
	{
		path: '/getExclusiveRobotInfo',
		component: Layout,
		name: '专属机器人',
		redirect: '/getExclusiveRobotInfo/index',
		meta: {
			title: '专属机器人',
			icon: 'lock'
		},
		children: [{
			path: '/getExclusiveRobotInfo/index',
			component: () => import('@/views/getExclusiveRobotInfo/index'),
			name: '专属机器人列表',
			meta: {
				title: '专属机器人列表'
			}
		}, {
			path: '/getExclusiveRobotInfo/info',
			component: () => import('@/views/getExclusiveRobotInfo/info/index'),
			name: '我的机器人详情',
			meta: {
				title: '机器人详情'
			}
		}, {
			path: '/getExclusiveRobotInfo/applyLogs',
			component: () => import('@/views/getExclusiveRobotInfo/applyLogs'),
			name: '我的机器人申请记录',
			meta: {
				title: '机器人申请记录'
			}
		}, {
			path: '/getExclusiveRobotInfo/ownerlist',
			component: () => import('@/views/getExclusiveRobotInfo/ownerlist'),
			name: '专属机器人群主列表',
			meta: {
				title: '专属机器人群主列表'
			}
		}, {
			path: '/getExclusiveRobotInfo/grouplist',
			component: () => import('@/views/getExclusiveRobotInfo/grouplist'),
			name: '专属机器人群列表',
			meta: {
				title: '专属机器人群列表'
			}
		}]
	}
]

export default nestedRouter
