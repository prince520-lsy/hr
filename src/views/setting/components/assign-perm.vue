<template>
  <el-dialog title="分配权限" :visible="showDialog">
    <!--
          show-checkbox: 设置列表可选（显示复选框）
          show-checkbox: 默认展开所有节点
          check-strictly	在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
       -->
    <el-tree
      ref="tree"
      node-key="id"
      check-strictly
      show-checkbox
      default-expand-all
      :data="permList"
      :props="{label: 'name'}"
    />
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { getPermissionList } from '@/api/permission'
import { listToTree } from '@/utils/index'
import { roleDetail } from '@/api/setting'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permList: [], // 权限列表
      permIds: [] // 选中的权限数据id集合
    }
  },
  async created() {
    const res = await getPermissionList()
    // 列表转树形结构
    this.permList = listToTree(res, '0')
  },
  methods: {
    // 获取角色默认权限数据
    async getRolePermIds(id) {
      const res = await roleDetail(id)
      //   保存权限数据
      this.permIds = res.permIds
      // 实现回显
      this.$refs.tree.setCheckedKeys(this.permIds)
    }
  }
}
</script>
  <style scoped>
  </style>
