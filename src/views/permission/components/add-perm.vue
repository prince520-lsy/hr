<template>
  <el-dialog title="新增权限" :visible="showDialog" @close="closeFn">
    <!--
          表单验证
          1、给form组件添加model
          2、给form组件绑定rules
          3、给form-item绑定prop属性
          4、v-model双向绑定表单
       -->
    <el-form ref="form" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item label="开启">
        <!-- "1" 表示开启 "0"表示关闭 -->
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button size="small" type="primary" @click="submit">确定</el-button>
        <el-button size="small" @click="closeFn">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { addPermission } from '@/api/permission'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '1', // 开启 "1" 表示开启 "0"表示关闭
        pid: '0', // 父级权限的id "0"表示添加一级权限，其他值表示添加二级权限
        type: 1 // 权限的类型，1表示添加一级权限 2表示添加二级权限
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空！', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定
    async submit() {
      // 表单校验
      await this.$refs.form.validate()
      // 调用接口
      await addPermission(this.formData)
      // 关闭弹窗
      this.closeFn()
      // 更新列表
      this.$emit('updateEvent')
    },
    // 关闭弹窗
    closeFn() {
      this.$emit('update:showDialog', false)
      //   清空数据
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '1', // 开启 "1" 表示开启 "0"表示关闭
        pid: '0', // 父级权限的id "0"表示添加一级权限，其他值表示添加二级权限
        type: 1 // 权限的类型，1表示添加一级权限 2表示添加二级权限
      }
      // 清空校验规则
      this.$refs.form.resetFields()
    }
  }
}
</script>
  <style scoped>
  </style>
