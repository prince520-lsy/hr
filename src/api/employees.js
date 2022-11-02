// 员工管理 接口
import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工列表
export function employeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 删除员工接口
 * ****/
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

// 批量都员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
export function saveUserDetailById(data) {
  return request({
    url: '/sys/user/' + data.id,
    method: 'put',
    data
  })
}
