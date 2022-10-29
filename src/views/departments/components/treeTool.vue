<template>
  <el-row class="tree-tool" style="width:100%" type="flex" justify="space-between">
    <!-- 根据组件的使用场景，定义标题的样式
      渲染成“公司名称”的时候 标题加粗
     -->
    <div :style="{'font-weight': isCompany?'bold':''}">{{ treeNode.name }}</div>
    <div class="manager">
      <span>{{ treeNode.manager }}</span>
      <!-- <el-dropdown @command="test"> -->
      <el-dropdown>
        <span>操作
          <i class="el-icon-arrow-down" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <!--
           自定义组件不能直接绑定原生js事件的，但是vue提供了一个修饰符
           可以让我们实现在自定义组件上绑定原生js事件，这个修饰符就是.native
           -->
          <el-dropdown-item command="add" @click.native="addFn">添加子部门</el-dropdown-item>
          <el-dropdown-item v-if="isCompany==false" command="edit" @click.native="editFn">编辑部门</el-dropdown-item>
          <el-dropdown-item v-if="isCompany==false" command="del" @click.native="delFn">删除部门</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-row>
</template>
<script>
export default {
  props: {
    treeNode: {
      type: Object, // 表示传入的数据必须是对象类型
      required: true // 表示必传
    },
    isCompany: {
      // 值true表示 此刻组件用于渲染公司名称
      type: Boolean,
      default: true
    }
  },
  methods: {
    // test(val) {
    //   console.log('点击了菜单项', val)
    // },
    addFn() {
      // console.log('点击了添加按钮')
      // 子传父 通知父组件 控制新增部门的弹窗显示
      // 并把当前点击的部门id传递给父组件
      this.$emit('addEvent', this.treeNode.id)
    },
    // 删除
    delFn() {
      // 子传父
      this.$emit('delEvent', this.treeNode.id)
    },
    editFn() {
      this.$emit('editEvent', this.treeNode.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-tool{
    line-height: 30px;
  .manager{
    span{
      margin-right: 15px;
    }
  }
}
</style>
