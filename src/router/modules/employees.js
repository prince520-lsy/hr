import Layout from '@/layout'
export default {

  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index.vue'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    }
  ]
}
