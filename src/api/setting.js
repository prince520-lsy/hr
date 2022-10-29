// 封装角色相关的接口函数
import request from '@/utils/request'
// 获取所有角色列表
export function roleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
