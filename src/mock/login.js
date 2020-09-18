import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Admin'
  },
	huangzhen: {
	  roles: ['huangzhen'],
	  token: 'huangzhen',
	  introduction: '我是管理员',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'huangzhen'
	},
	kefu: {
	  roles: ['kefu'],
	  token: 'kefu',
	  introduction: '我是编辑',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'kefu'
	},
	yangjian: {
	  roles: ['yangjian'],
	  token: 'yangjian',
	  introduction: '我是编辑',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'yangjian'
	},
	tianfeng: {
	  roles: ['tianfeng'],
	  token: 'tianfeng',
	  introduction: '我是编辑',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'tianfeng'
	},
  liguanchao: {
    roles: ['liguanchao'],
    token: 'liguanchao',
    introduction: '我是销售',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'liguanchao'
  },
	jiangtingting: {
	  roles: ['jiangtingting'],
	  token: 'jiangtingting',
	  introduction: '我是编辑',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'jiangtingting'
	},
	xupanpan: {
	  roles: ['xupanpan'],
	  token: 'xupanpan',
	  introduction: '我是编辑',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'xupanpan'
	},
	caiwu: {
	  roles: ['caiwu'],
	  token: 'caiwu',
	  introduction: '我是财务',
	  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
	  name: 'caiwu'
	}
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
