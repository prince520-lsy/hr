<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="false">
        <template #after>
          <el-row type="flex" justify="end">
            <el-button type="primary" size="small" @click="addPerm('0',1)">添加权限</el-button>
          </el-row>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table border :data="perList" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <template v-slot="{row}">
            <!--
                因为系统只有2级权限，分别是：
                页面访问权限（一级权限）
                按钮操作权限（二级权限）
                因此是没有第三级权限的，没有第三级权限也就意味着渲染二级权限的时候“添加”按钮不需要渲染
                如何判断渲染的是多少级权限呢？答：可以通过pid判断
                当pid的值为"0"的时候，表示渲染的是一级权限，否则不是
               -->
            <el-button v-if="row.pid === '0'" type="text" @click="addPerm(row.id,2)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="delFn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增权限 -->
      <AddPerm
        ref="addPerm"
        :show-dialog.sync="visibleDialog"
        @updateEvent="getPermissionList"
      />
    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { listToTree } from '@/utils/index'
import AddPerm from './components/add-perm.vue'
export default {
  components: { AddPerm },
  data() {
    return {
      perList: [], // 权限列表
      visibleDialog: false // 控制新增权限弹窗显示隐藏
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    // 删除权限
    delFn(id) {
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).then(async() => {
        // console.log('点击了确定按钮')
        // 调用接口 实现删除
        await delPermission(id)
        // 刷新权限列表
        this.getPermissionList()
      }).catch(err => {
        console.log('点击了取消按钮 或者 then中的代码报错了：', err)
      })
    },
    // 获取权限列表
    async getPermissionList() {
      const res = await getPermissionList()
      // 列表转树形结构
      this.perList = listToTree(res, '0')
    },
    // 添加权限
    addPerm(pid, type) {
      this.visibleDialog = true
      // 怎么把pid和type赋值给子组件的formData.pid和formData.type 呢 ？
      // 答：通过ref实现
      this.$refs.addPerm.formData.pid = pid
      this.$refs.addPerm.formData.type = type
    }
  }
}
</script>

  <style lang="scss" scoped>
  .el-table{
    margin-top: 20px;
  }
  </style>
