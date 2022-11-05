<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="false">
        <template #after>
          <el-row type="flex" justify="end">
            <el-button type="primary" size="small">添加权限</el-button>
          </el-row>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table border :data="perList">
        <el-table-column label="名称" />
        <el-table-column label="标识" />
        <el-table-column label="描述" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perList: [] // 权限列表
    }
  }
}
</script>

  <style lang="scss" scoped>
  .el-table{
    margin-top: 20px;
  }
  </style>
