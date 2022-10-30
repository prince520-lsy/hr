<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <!-- 通过父组件传入的showBefore决定左边容器的显示与隐藏 -->
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <span>
            <!-- 内容的插入 通过插槽实现 -->
            <slot name="before" />
          </span>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: true
    }
  }
}
</script>
  <style lang="scss" scoped>
  .page-tools{
      .before{
          display: inline-block;
          padding: 10px;
          border: 1px solid #409eff;
          border-radius: 5px;
          background-color: #e6f7ff;
          i{
              margin-right: 5px;
              color: #409eff;
          }
      }
  }
  </style>
