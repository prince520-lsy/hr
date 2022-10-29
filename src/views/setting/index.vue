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
                  <el-button type="primary" size="small">编辑</el-button>
                  <el-button type="danger" size="small">删除</el-button>
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
            公司信息 --- 内容
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 新增角色 -->
      <addRole
        :show-dialog.sync="showDialog"
        @closeEvent="showDialog=false"
      />
    </div>
  </div>
</template>

<script>
import { roleList } from '@/api/setting'
import addRole from './components/addRole.vue'
export default {
  components: { addRole },
  data() {
    return {
      roleList: [], // 角色列表
      total: 0, // 角色的总数量
      page: 1, // 页码
      pagesize: 2, // 每页的条数
      showDialog: false // 控制弹窗组件的显示隐藏
    }
  },
  created() {
    // 获取角色列表
    this.getRoleList()
  },
  methods: {
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
