import Layout from '@/layout'
export default {

  path: '/attendances',
  component: Layout,
  code: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances/index.vue'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
