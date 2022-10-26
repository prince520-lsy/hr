<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="space-between">
          <div>传智教育</div>
          <div class="manager">
            <span>负责人</span>
            <el-dropdown>
              <span>操作
                <i class="el-icon-arrow-down" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>添加子部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

  <style scoped lang="scss">
.el-card{
  padding: 30px 40px;
  font-size: 14px;
  .manager{
    span{
      margin-right: 15px;
    }
  }
}
  </style>

