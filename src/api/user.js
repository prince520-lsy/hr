import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserAvatarById(id) {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}

// 获取用户头像 等等
export function getUserInfoById(id) {
  return request({
    url: '/sys/user/' + id
  })
}
