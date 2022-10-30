<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏组件 -->
      <PageTools>
        <template v-slot:before>
          共22条记录
        </template>
        <template #after>
          <el-button size="small" type="primary">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="success">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-card>
        <el-table :data="employeeList">
          <el-table-column label="序号" width="100px">
            <template v-slot="{$index}">
              {{ $index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" />
          <el-table-column label="头像" />
          <el-table-column label="手机号" />
          <el-table-column label="工号" />
          <el-table-column label="聘用形式" />
          <el-table-column label="部门" />
          <el-table-column label="入职时间" />
          <el-table-column label="状态" />
          <el-table-column label="操作" width="200px">
            <template>
              <el-button type="text">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-row type="flex" justify="center">
          <el-pagination
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000"
          />
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeList: [] // 员工列表数据
    }
  }
}
</script>

<style>

</style>
