import Layout from '@/layout'
export default {

  path: '/approvals',
  component: Layout,
  code: 'approvals',
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
