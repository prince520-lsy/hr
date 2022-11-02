<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form label-width="120px">
              <el-form-item label="姓名">
                <el-input v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formData.password" type="password" />
              </el-form-item>
            </el-form>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="updateFn">更新</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserInfoById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: { UserInfo, JobInfo },
  data() {
    return {
      formData: {}
    }
  },
  async created() {
    // 获取用户详情数据
    // 获取动态路由参数语法：$route.params.变量名
    console.log(31, this.$route.params.id)
    this.formData = await getUserInfoById(this.$route.params.id)
    // 后的返回的密码是加密后, 这里我们直接把密码清空即可
    this.formData.password = ''
    console.log(41, this.formData.username)
  },
  methods: {
    async updateFn() {
      await saveUserDetailById(this.formData)
    }
  }
}
</script>
  <style scoped>
  </style>
