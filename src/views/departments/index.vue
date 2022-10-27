<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 渲染公司名称 -->
        <treeTool :is-company="true" :tree-node="company" @addEvent="addFn" />
        <!-- 树形控件 -- 渲染部门列表 -->
        <el-tree :props="{label:'name'}" :data="treeData" default-expand-all>
          <template v-slot="{data}">
            <!--
              注意：标签属性是没有大写字母的，
              因此我添加标签属性的时候，驼峰命名的
              属性名需要转成串烧命名
              比如：treeNode 等价于 tree-node
             -->
            <treeTool :is-company="false" :tree-node="data" @addEvent="addFn" />
          </template>
        </el-tree>
      </el-card>
      <!-- 新增部门 弹窗 -->
      <el-dialog title="新增部门" :visible="showDialog" @close="cancelFn">
        <!--
          1、给form组件绑定model属性 值就是表单的数据对象
          2、给form组件绑定rules属性
          3、给form-item绑定prop属性
          4、v-model双向绑定表单
         -->
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="1-50个字符" />
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input v-model="formData.code" placeholder="1-50个字符" />
          </el-form-item>
          <el-form-item label="部门负责人" prop="manager">
            <!-- <el-input v-model="formData.manager" placeholder="请选择负责人" /> -->
            <el-select v-model="formData.manager">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.username"
                :value="item.username"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部门介绍" prop="introduce">
            <el-input v-model="formData.introduce" type="textarea" placeholder="1-300个字符" />
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-row type="flex" justify="center">
            <el-button size="small" @click="cancelFn">取消</el-button>
            <el-button size="small" type="primary" @click="submit">确定</el-button>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import treeTool from './components/treeTool.vue'
import { getDepartment, addDepartment } from '@/api/departments'
import { listToTree } from '@/utils'
import { getEmployees } from '@/api/employees'
export default {
  components: { treeTool },
  data() {
    const checkName = (rule, value, callback) => {
      console.log(rule, value, callback)
      callback(666)
    }
    return {
      company: {
        name: '传智教育',
        manager: '负责人',
        id: '' // 一级部门的pid（父级id）
      },
      treeData: [],
      showDialog: false,
      formData: {
        code: '', // 部门编码
        name: '', // 部门名称
        manager: '', // 部门负责人
        introduce: '', // 介绍
        pid: '' // 父级部门id
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空！', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度1到50个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '部门名称不能为空！', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度1到50个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空！', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空！', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度1到300个字符', trigger: 'blur' }
        ]
      },
      userList: []
    }
  },
  async created() {
    this.getDepartmentList()
    this.userList = await getEmployees()
  },
  methods: {
    async submit() {
      // 表单验证
      await this.$refs.form.validate()
      // 调用接口
      await addDepartment(this.formData)
      // 刷新页面
      this.getDepartmentList()
      // 关闭弹窗
      this.cancelFn()
    },
    addFn(id) {
      // console.log('当前部门id', id)
      // 控制弹窗显示
      this.formData.pid = id// 保存当前点击的pid
      this.showDialog = true
    },
    // 关闭弹窗
    cancelFn() {
      this.showDialog = false
      this.formData = {
        pid: ''
      }
      this.$refs.form.resetFields()
    },
    // 获取部门列表数据
    async getDepartmentList() {
      const res = await getDepartment()
      // console.log(63, res)
      // 保存公司名称
      this.company.name = res.companyName
      // 保存部门列表
      // this.treeData = res.depts
      this.treeData = listToTree(res.depts, '')
    }
    // 列表转树形结构 数据

  }
}
</script>

<style lang="scss" scoped>
.el-card{
  padding: 30px 40px;
  font-size: 14px;
  .el-tree{
    margin-top: 10px;
  }
}
</style>
