import request from '@/utils/request'

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
} 
// 统计供应商维度信息
// export function supplier() {
//   return request({
//     url: '/line/order/supplierCount.json',
//     method: 'get',
//     params: ''
//   })
// }
/**
 *
 * @param {advertList}  // 广告列表
 * @param {getCategory}  // 获取业务模块 + 广告类型
 * @param {detailPersonal} //获取广告详情
 * @param {deleteAdvert} //删除广告
 * @param {createdAdvert} //创建广告
 * @param {updatedAdvert} //修改广告
 */
export function advertList(data) {
  return request({
    url: '/ad/manage/list',
    method: 'post',
    data
  })
}

export function categoryList(data) {
  return request({
    url: '/ad/manage/getCategory',
    method: 'post',
    data
  })
}

export function detailPersonal(data) {
  return request({
    url: '/ad/manage/detail',
    method: 'post',
    data
  })
}

export function deleteAdvert(data) {
  return request({
    url: '/ad/manage/delete',
    method: 'post',
    data
  })
}

export function createdAdvert(data) {
  return request({
    url: '/ad/manage/save',
    method: 'post',
    data
  })
}

export function updatedAdvert(data) {
  return request({
    url: '/ad/manage/edit',
    method: 'post',
    data
  })
}
