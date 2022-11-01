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
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" />
          <el-table-column label="工号" prop="workNumber" />
          <!-- 格式表格内容方式一：插槽 -->
          <!-- <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              {{ formatFormOfEmployment(row.formOfEmployment) }}
            </template>
          </el-table-column> -->
          <!-- 格式表格内容方式二：formatter属性
            这个属性绑定一个函数名，这个函数默认接收到的第一个参数row
            就表示当前行的数据对象，和作用域插槽中的row是同一个对象
          -->
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            :formatter="formatFormOfEmployment"
          />
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="{row}">
              <!-- {{ formatDate(row.timeOfEntry) }} -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <!-- 状态：值为1 表示 当前账号是可用状态
                    值为0 表示 当前账号是不可用状态
           -->
          <el-table-column label="状态" prop="enableState">
            <template v-slot="{row}">
              <!--
                value设置当前表单的值，默认绑定布尔值
                active-color：设置选中状态的背景颜色
                inactive-color：设置未选中状态的背景颜色
                active-value：设置选中状态的值  --- 可以是数字 字符串 布尔值
                inactive-value：设置未选中状态的值  --- 可以是数字 字符串 布尔值
               -->
              <el-switch
                :value="row.enableState"
                active-color="green"
                inactive-color="#dcdfe6"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
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
import employees from '@/api/constant/employees'
export default {
  data() {
    return {
      employeeList: [], // 员工列表数据
      total: 0, // 员工总数量
      page: 1, // 页码
      size: 5, // 每页请求的数量
      hireType: employees.hireType
    }
  },
  created() {
    // 获取员工列表
    this.getEmployeesList()
  },
  methods: {
    // 格式日期
    formatDate(time) {
      if (time) { // 时间存在的时候才进行处理
        const arr = time.split('T')
        return arr[0]
      } else {
        // 时间不存在 不处理
        return time
      }
    },
    // 格式化聘用形式
    formatFormOfEmployment(val) {
      // console.log(val)
      // find: 查找符合条件的数组元素并返回这个数组元素
      // 如果找不到符合条件的数据，则返回undefined
      const id = val.formOfEmployment || val
      const obj = this.hireType.find(item => item.id === id)
      return obj && obj.value || '未知'
    },
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
