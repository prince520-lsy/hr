
import request from '@/utils/request'

// 获取所有权限点
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

// 添加权限点
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 根据id删除权限
export function delPermission(id) {
  return request({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}
