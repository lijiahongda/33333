import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import * as filters from './filters' // global filters
import clipboard from 'clipboard'
const apiurl = require('./api/apiurl')
Vue.prototype.clipboard = clipboard
Vue.prototype.apiurl = apiurl
Vue.prototype.axios = axios
Vue.use(Element, {
	size: Cookies.get('size') || 'medium', // set element-ui default size
	i18n: (key, value) => i18n.t(key, value)
})

import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css' // register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
router.onError((error) => {
	const pattern = /Loading chunk (\d)+ failed/g;
	const isChunkLoadFailed = error.message.match(pattern);
	const targetPath = router.history.pending.fullPath;
	if (isChunkLoadFailed) {
		router.replace(targetPath);
	}
})
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})
Vue.prototype.powerPage = function (val) {
	return store.getters.pagePowerList.includes(val)
}
