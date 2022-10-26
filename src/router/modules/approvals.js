import Layout from '@/layout'
export default {

  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals/index.vue'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
