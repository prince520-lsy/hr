
import request from '@/utils/request'

export function getEmployeeSimple(params) {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}

export function employeesList(params) {
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}
