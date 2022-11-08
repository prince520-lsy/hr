// mixin全局引入按钮操作权限设置
export default {
  methods: {
    checkPermBtn(code) {
      const roles = this.$store.state.user.userInfo.roles
      return roles && roles.points.includes(code)
    }
  }
}
