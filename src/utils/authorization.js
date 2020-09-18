import hexMD5 from 'js-md5'
import store from '@/store'
console.log(store.getters.name, '9876544332')
var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
const tokenAuth = 'Admin ' + (store.getters.name || localstrage + '.' + localStorage.getItem('token'))
/**
 * 接口加密
 * 参数 type==1用户级加密 type==0 系统级加密
 * type==0 : token = 固定值
 * type==1 : token = 用户token 存储于localStorage字段=userToken id=用户id字段=userId
 */

export function authorizationVue(type) {
  // const id = localStorage.getItem('userId')
  const id = 7129
  const timestamp = Date.parse(new Date()).toString()
  let token = ''
  let authorizationStr = ''
  var localstrage
  JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).adminUserId : localstrage = ''
  switch (type) {
    case 0:
      authorizationStr = 'Sys 2001.'
      token = 'token1'
      break
    case 1:
      authorizationStr = 'Bearer ' + id + '.'
      // token = localStorage.getItem('userToken')
      token = '1c9280ca54e231d78dbdd591717cb8fe'
      break
    case 2:
      // token = 'Admin 38.1560751751.712574dac49401c3a09ec70fc7946ff2'
      token = 'Admin 38.1563864919.d4cb0667a0a9517cdd8166fe761cdff3'
      break
    case 3:
		  // authorizationStr = 'Admin ' + localstrage + '.'
		  // token = localStorage.getItem('userToken')
		  token = tokenAuth
  }
  // type == 2 固定格式header头部请求，判断不需要加密，直接请求
  let encryptStr = (type === 2 || type === 3 ? token : encryptStr = authorizationStr + timestamp + '.' + md5(type, token, timestamp))
  return encryptStr
}
function md5(type, token, timestamp) {
  let str = ''
  const num = '2001'
  switch (type) {
    case 0:
      str = hexMD5(num + '.' + timestamp + '.' + token)
      break
    case 1:
      str = token
      break
  }
  return str
}
