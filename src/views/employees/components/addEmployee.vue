<template>
  <el-dialog title="新增员工" :visible="showDialog">
    <!--
          1、给form组件添加model属性
          2、给form组件绑定rules
          3、给form-item绑定prop属性
          4、v-model双向绑定表单
       -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item class="depts-box" label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          placeholder="请选择部门"
          @focus="isShow = true"
        />
        <el-tree
          v-show="isShow"
          class="depts-tree"
          :data="departList"
          :props="{label: 'name'}"
          default-expand-all
          @node-click="selectDepartment"
        />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker
          v-model="formData.correctionTime"
          type="date"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import employees from '@/api/constant/employees'
import { getDepartment } from '@/api/departments'
import { listToTree } from '@/utils/index'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: employees.hireType, // 聘用形式
      formData: {
        username: '', // 姓名
        mobile: '', // 手机号码
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 组织名称
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { min: 1, max: 4, message: '用户名长度1到4位字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空！', trigger: 'blur' },
          { pattern: /^1[2-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空！', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空！', trigger: 'blur' },
          { min: 6, max: 10, message: '工号长度6到10位字符', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门名称不能为空！', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空！', trigger: 'blur' }
        ]
      },
      departList: [], // 部门列表
      isShow: false //  控制部门列表显示隐藏
    }
  },
  async created() {
    // 获取部门列表数据
    const res = await getDepartment()
    this.departList = listToTree(res.depts, '')
  },
  methods: {
    // 选中部门
    selectDepartment(data) {
      // data: 当前点击的部门对象
      this.formData.departmentName = data.name
      //   隐藏部门列表
      this.isShow = false
    }
  }
}
</script>
  <style lang="scss" scoped>
  .depts-box{
      .depts-tree{
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 150px;
          overflow: auto;
      }
  }
  </style>
