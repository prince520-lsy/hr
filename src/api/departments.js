// 封装组织架构相关接口的函数
import request from '@/utils/request'

// 查询企业的部门列表
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 删除部门
export function delDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}

// 根据id查询部门部门
export function departmentDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}

// 根据id修改部门详情
export function editDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
