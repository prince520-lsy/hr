<template>
  <el-dialog title="新增角色" :visible="showDialog" @close="closeFn">
    <!--  @close事件 点击弹窗右上角按钮时触发 -->
    <!--
        1、给form组件添加model属性
        2、给form组件绑定rules
        3、给form-item绑定prop属性
        4、v-model双向绑定表单
       -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="formData.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="closeFn">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    // vue规定props中声明的属性是只读的（单向数据流）
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '', // 角色名称
        description: '' // 角色描述
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空！', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭
    closeFn() {
      // 强行修改父组件传入的值，会造成父子组件数据不一致，导致后面打不开弹窗组件
      // this.showDialog = false
      // 子传父 通知父组件关闭弹窗
      // vue 提供了一个修饰符，能够让我们直接在子组件中修改
      // 父组件传入的数据，这个修饰符就是.sync
      /**
         * sync修饰符的使用步骤：
         * 1、父组件中为组件属性上添加sync修饰符
         * 2、子组件中通过固定语法来直接修改父组件传入的值
         *   this.$emit('update:要修改的props中的属性名', 要设置的值)
         * */

      // this.$emit('closeEvent', false)
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
  <style scoped>
  </style>
