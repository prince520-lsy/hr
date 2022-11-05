<template>
  <el-dialog title="分配角色" :visible="showDialog">
    <!--
          v-model绑定一个数组类型的变量
          所有选中的选项值都会自动添加到该数组中
          取消选中的时候选项的值会自动从该数组中移除
          注意：选项的值指的是组件中label属性的值

          当checkbox组件中没有插入内容的时候，label的值也充当复选框按钮后面的内容
       -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in allRole"
        :key="item.id"
        :label="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="closeFn">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { roleList } from '@/api/setting'
import { getUserInfoById } from '@/api/user'
import { assigRoles } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      allRole: [],
      curUserId: '' // 当前分配角色的员工id
    }
  },
  async created() {
    // 获取所有的角色列表数据
    const res = await roleList({
      page: 1,
      pagesize: 1000 // 为了保证获取到所有角色列表数据 可以将这个值设置大一些
    })
    // 保存所有角色列表
    this.allRole = res.rows
  },
  methods: {
    async submit() {
      await assigRoles({
        id: this.curUserId, // 点击的那个员工的id
        roleIds: this.checkList
      })
      //   关闭弹窗
      this.closeFn()
    },
    closeFn() {
      this.$emit('update:showDialog', false)
    },
    // 获取员工默认角色id
    async getRoleIds(id) {
      this.curUserId = id // 当前员工ID
      const res = await getUserInfoById(id)
      // 保存角色 进行回显
      this.checkList = res.roleIds
    }
  }
}
</script>
  <style scoped>
  </style>
