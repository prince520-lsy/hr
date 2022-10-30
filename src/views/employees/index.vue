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
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="头像" prop="staffPhoto" width="140px">
            <template v-slot="{row}">
              <img
                v-imgErr="require('@/assets/common/bigUserHeader.png')"
                style="width: 120px"
                :src="row.staffPhoto"
                alt=""
              >
              <!-- {{ row }} -->
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment" />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="状态" prop="enableState" />
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
            :page-size="size"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { employeesList } from '@/api/employees'
export default {
  data() {
    return {
      employeeList: [], // 员工列表数据
      total: 0, // 员工总数量
      page: 1, // 页码
      size: 5 // 每页请求的数量
    }
  },
  created() {
    // 获取员工列表
    this.getEmployeesList()
  },
  methods: {
    // 分页 页码发生改变时触发
    currentChange(page) {
      // console.log(page)
      this.page = page
      this.getEmployeesList()
    },
    // 获取员工列表
    async getEmployeesList() {
      const res = await employeesList({
        page: this.page, // 页码
        size: this.size // 每页请求的数量
      })
      // 保存员工列表
      this.employeeList = res.rows
      // 保存员工总数量
      this.total = res.total
    }
  }
}
</script>

<style>

</style>
