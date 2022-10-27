
import request from '@/utils/request'

export function getDepartment(params) {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
