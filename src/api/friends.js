import request from '@/utils/request'

var localstrage = JSON.parse(localStorage.getItem('userInfo')) ? localstrage = JSON.parse(localStorage.getItem('userInfo')).mid : localstrage = ''
const tokenAuth = 'Admin ' + localstrage + '.' + localStorage.getItem('token')

const headers = {
  'Authorization': tokenAuth
}

export function ajaxFriendsList(data) {
  // 获取好友列表
  return request({
    url: '/member/friend/list',
    method: 'post',
    headers,
    data
  })
}


// 好友机器人列表
export function getFriendRobotList(data) {
  return request({
    url: '/member/friend/getFriendRobotList',
    method: 'post',
    headers,
    data
  })
}
