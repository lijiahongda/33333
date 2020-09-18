module.exports = {
	proxy: {
		'/api': {
			// target: 'http://robot.yueshang.teststore', // 机器人 测试
			target: 'http://robot.yueshang.store', // 机器人 正式
			// target: 'http://10.168.1.246:84', // 屁战正式
			// target: 'http://7kjr3w.natappfree.cc', // 常肖尧
			// target: 'http://yh6xve.natappfree.cc/', // 刘帅
			// target: 'http://ylh-robot-api.192.168.2.111.xip.io', // 机器人
			// target: 'http://xg4h2s.natappfree.cc/api', // 机器人
			changeOrigin: true, //是否跨域xian
			pathRewrite: {
				'^/api': '' //需要rewrite的,
			}
		},
		'/api': {
			// target: 'http://robot.yueshang.teststore', // 机器人 测试
			target: 'http://robot.yueshang.store', // 机器人 正式
			// target: 'http://10.168.1.246:84', // 屁战正式
			// target: 'http://7kjr3w.natappfree.cc', // 常肖尧
			// target: 'http://yh6xve.natappfree.cc/', // 刘帅
			// target: 'http://ylh-robot-api.192.168.2.111.xip.io', // 机器人
			// target: 'http://xg4h2s.natappfree.cc', // 机器人
			changeOrigin: true, //是否跨域
			pathRewrite: {
				'^/admin': '' //需要rewrite的,
			}
		},
	}
}
