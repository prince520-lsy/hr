import Layout from '@/layout'
export default {

  path: '/permission',
  component: Layout,
  code: 'permissions',
  children: [
    {
      path: '',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
