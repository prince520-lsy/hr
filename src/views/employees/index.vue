<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏组件 -->
      <PageTools>
        <template v-slot:before>
          共22条记录
        </template>
        <template #after>
          <el-button size="small" type="primary" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportFn">导出</el-button>
          <el-button size="small" type="success" @click="addFn">新增员工</el-button>
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
            <template v-slot="{row}">
              <el-button type="text" @click="toDetail(row.id)">查看</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text" @click="delFn(row.id)">删除</el-button>
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
      <AddEmployee
        :show-dialog.sync="showDialog"
        @updateEvent="getEmployeesList"
      />
    </div>
  </div>
</template>

<script>
import { employeesList, delEmployee } from '@/api/employees'
import employees from '@/api/constant/employees'
import AddEmployee from './components/addEmployee.vue'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import { formatDate } from '@/filters/index'
export default {
  components: { AddEmployee },
  data() {
    return {
      employeeList: [], // 员工列表数据
      total: 0, // 员工总数量
      page: 1, // 页码
      size: 5, // 每页请求的数量
      hireType: employees.hireType,
      showDialog: false // 控制新增弹窗组件的显示隐藏
    }
  },
  created() {
    // 获取员工列表
    this.getEmployeesList()
  },
  methods: {
    toDetail(id) {
      this.$router.push('./employees/detail/' + id)
    },
    // 导出
    async exportFn() {
      // 获取员工列表数据
      const res = await employeesList({
        page: 1,
        size: this.total
      })
      // console.log(129, res)
      // 把请求回来的数据转换为二维数据
      const result = res.rows.map(item => {
        return this.objToArr(item)
      })
      console.log(result)
      // 导出表格函数的使用
      const header = ['手机号', '姓名', '入职日期', '转正日期', '工号']
      // const data = [
      //   [1523454657, '小敏', '2022-05-01', '2022-08-01', '12345'],
      //   [1523454652, '小方', '2022-05-01', '2022-08-01', '12345']
      // ]
      export_json_to_excel({
        header, // 表头 数组
        data: result // 内容，是一个二维数组
      })
    },
    objToArr(item) {
      const list = []
      // 处理。。。把对象中需要用到的属性值保存到list数组中
      const userRelations = {
        'mobile': '手机号',
        'username': '姓名',
        'timeOfEntry': '入职日期',
        'correctionTime': '转正日期',
        'workNumber': '工号'
      }
      for (const key in userRelations) {
        let value = item[key]
        // 获取到需要用到的属性名对应的值
        if (key === 'timeOfEntry' || key === 'correctionTime') {
          value = formatDate(value, 'yyyy/MM/dd')
        }

        list.push(value)
      }
      return list
    },
    // 删除
    delFn(id) {
      this.$confirm('是否确定删除？', '提示', {
        type: 'warning'
      }).then(async() => {
        // 调用接口
        await delEmployee(id)
        // 删除到最后一页的最后一条数据后会出现 页面没有数据的情况
        // 因此需要判断当删除最有一页的最后一条数据的时候，把页码减一
        // 再调用接口刷新列表
        if (this.employeeList.length === 1 && this.page !== 1) {
          this.page--
        }
        // 更新列表
        this.getEmployeesList()
      }).catch(err => {
        console.log('取消：', err)
      })
    },
    // 新增员工
    addFn() {
      this.showDialog = true
    },
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
