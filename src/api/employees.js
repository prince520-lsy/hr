
import request from '@/utils/request'

export function getEmployees(params) {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
