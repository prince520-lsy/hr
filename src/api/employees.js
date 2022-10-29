
import request from '@/utils/request'

export function getEmployeeSimple(params) {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
