<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 标签页 组件
         label: 设置标签的标题
         -->
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
            <!-- 表格 -->
            <el-table :data="roleList">
              <el-table-column label="序号" width="100">
                <template v-slot="{$index}">
                  {{ $index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="角色" prop="name" width="300" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作" width="250">
                <template v-slot="{row}">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primary" size="small" @click="editFn(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delFn(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页器
            page-size: 表示每页展示的数量，默认10
             -->
            <el-row type="flex" justify="center">
              <el-pagination
                layout="prev, pager, next"
                :page-size="pagesize"
                :total="total"
                @current-change="currentChange"
              />
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-form disabled label-width="120px">
              <el-form-item label="公司名称">
                <el-input v-model="company.name" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="company.companyAddress" />
              </el-form-item>
              <el-form-item label="公司邮箱">
                <el-input v-model="company.mailbox" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="company.remarks" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增角色 -->
      <!-- <addRole
        :show-dialog="showDialog"
        @closeEvent="showDialog=false"
        @updateEvent="getRoleList"
      /> -->
      <addRole
        ref="addRole"
        :show-dialog.sync="showDialog"
        @updateEvent="getRoleList"
      />
    </div>
  </div>
</template>

<script>
import { roleList, delRole, getCompanyById } from '@/api/setting'
import addRole from './components/addRole.vue'
export default {
  components: { addRole },
  data() {
    return {
      roleList: [], // 角色列表
      total: 0, // 角色的总数量
      page: 1, // 页码
      pagesize: 2, // 每页的条数
      showDialog: false, // 控制弹窗组件的显示隐藏
      company: {} // 公司信息
    }
  },
  async created() {
    // 获取角色列表
    this.getRoleList()
    // 获取公司信息
    const id = this.$store.state.user.userInfo.companyId // 公司id
    this.company = await getCompanyById(id)
  },
  methods: {
    // 编辑
    editFn(id) {
      this.showDialog = true
      // 调用接口获取角色详情
      // 获取角色详情的代码在子组件的函数中
      // 如何调用子组件的函数呢 ？答：通过ref
      console.log(this.$refs.addRole)
      this.$refs.addRole.getRoleDetail(id)
    },
    // 删除角色
    delFn(id) {
      // console.log(77, id)
      this.$confirm('是否确定删除？', '提示', {
        type: 'warning'
      }).then(async() => {
        // 调用接口
        await delRole(id)
        /**
         * 判断到删除的是最后一条数据，我们更新列表的时候
         * 应该请求上一页的数据才对，注意：需要判断当前页面是否为第一页
         * 如果是第一页则不需要请求上一页的数据。
         * 如何判断此刻是在删除最后一条数据？
         * 答：roleList.length === 1说明是最后一条数据了
         * */
        if (this.roleList.length === 1 && this.page !== 1) {
          this.page--
        }
        // 更新列表
        this.getRoleList()
      }).catch((err) => {
        // 点击了取消按钮会触发这里，或者then里面的代码报错也会触发这里
        // 并且错误信息会被参数err接收到
        console.log('点击了取消按钮：', err)
      })
    },
    // 新增角色
    addRole() {
      // 控制弹窗显示
      this.showDialog = true
    },
    // 分页功能
    currentChange(page) {
      this.page = page
      this.getRoleList()
    },
    // 获取角色列表
    async getRoleList() {
      const res = await roleList({
        page: this.page,
        pagesize: this.pagesize
      })
      this.roleList = res.rows
      this.total = res.total
      // console.log(60, res)
    }
  }
}
</script>

<style>

</style>
