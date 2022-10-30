// 封装角色相关的接口函数
import request from '@/utils/request'
// 获取所有角色列表
export function roleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

// 根据id删除角色
export function delRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

// 根据id获取角色详情
export function roleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}
// 根据id更新角色
export function editRole(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

// 根据id查询企业
export function getCompanyById(id) {
  return request({
    url: '/company/' + id
  })
}
