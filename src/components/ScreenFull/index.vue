<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标   @click="changeScreen"-->
    <svg-icon
      icon-class="fullscreen"
      style="color:#fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  methods: {
    changeScreen() {
      if (!screenfull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      screenfull.toggle()
    }
  }
}
</script>
  <style scoped>
  </style>
