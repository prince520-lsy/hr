import Layout from '@/layout'
export default {

  path: '/employees',
  component: Layout,
  code: 'employees',
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index.vue'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true

    }
  ]
}
