import axios from 'axios'
import { Message } from 'element-ui'
import {  removeToken } from '@/utils/auth'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
// console.log(process.env.BASE_API)
// Message({
//   message: process.env.BASE_API,
//   type: 'error',
//   duration: 5 * 1000
// })
const service = axios.create({
  baseURL: process.env.BASE_NEW, // api 的 base_url
  timeout: 5000, // request timeout
  headers: {
    'Content-type': 'application/json'
  }
})

// request interceptor
// service.interceptors.request.use(config => {
//   config.headers['Authorization'] =  '2001.1542343496000.e5d425d95351665047a50bc62e62eac6'
//   // 发起请求时，取消掉当前正在进行的相同请求
//   if (promiseArr[config.url]) {
//     promiseArr[config.url]('操作取消')
//     promiseArr[config.url] = cancel
//   } else {
//     promiseArr[config.url] = cancel
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

service.interceptors.response.use(response => {
  return response
}, err => {
	console.log(err.response,'error')
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        break
      case 403:
				if(err.response.data.code == "32008002"){
					localStorage.clear();
					removeToken()
				}else{
					err.message = '拒绝访问'
				}
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.resolve(err.response)
})

// 设置默认请求头
service.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json;charset=UTF-8'
}
// response interceptor
// service.interceptors.response.use(
//   response => response,
//   /**
//    * 下面的注释为通过在response里，自定义code来标示请求状态
//    * 当code返回如下情况则说明权限有问题，登出并返回到登录页
//    * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
//    * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
//    */
//   response => {
//     const res = response
//     console.log(res)
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
