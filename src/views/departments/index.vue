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
            <treeTool
              :is-company="false"
              :tree-node="data"
              @addEvent="addFn"
              @delEvent="delFn"
              @editEvent="editFn"
            />
          </template>
        </el-tree>
      </el-card>
      <!-- 新增/编辑部门 弹窗 -->
      <el-dialog :title="formData.id?'编辑部门':'新增部门'" :visible="showDialog" @close="cancelFn">
        <!--
          1、给form组件绑定model属性 值就是表单的数据对象
          2、给form组件绑定rules属性
          3、给form-item绑定prop属性
          4、v-model双向绑定表单
         -->
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model.trim="formData.name" placeholder="1-50个字符" />
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input v-model.trim="formData.code" placeholder="1-50个字符" />
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
            <el-input v-model.trim="formData.introduce" type="textarea" placeholder="1-300个字符" />
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
import { getDepartment, addDepartment, delDepartment, departmentDetail, editDepartment } from '@/api/departments'
import { listToTree } from '@/utils'
import { getEmployeeSimple } from '@/api/employees'
export default {
  components: { treeTool },
  data() {
    // 校验部门名称
    const checkName = (rule, val, callback) => {
      // rule: 当前的校验规则
      // val: 当前输入的内容
      // callback：函数，当我们直接调用这个函数的时候表示 校验通过，
      // 当我们调用这个函数并传入一些参数的时候，表示校验不通过。
      // （只要传入了数据就表示校验不通过，无论传入的是什么都如此）
      /**
       * 需求：新增的部门名称不能和原来已经存在的同级部门名称重复
       * 1、获取到用户输入的新的部门名称 --- val
       * 2、获取所有同级部门列表 --- 不能直接获取到
       *   2-1、获取到所有的部门数据 ---- originDepts
       *   2-2、怎么判断部门列表中的某一个部门是和val同级部门 ？
       *      答：当他们的pid值一样的时候，说明他们是同级部门
       * */
      // console.log(80, val)
      // 找同级部门
      // 当编辑部门的到时候，编辑的那个部门是本身已经存在在this.originDepts列表数组中的
      // 因此我们在做编辑部门的时候，筛选同级部门还是把自身排除在外
      let agreeDept
      if (this.formData.id) {
        // 编辑
        agreeDept = this.originDepts.filter(item => {
          // 如何排除自身，当两个部门的id相同的时候表示，这两个部门是同一个部门
          // 因为后端设计数据的时候，给每一个部门的id都是唯一。
          return item.id !== this.formData.id && item.pid === this.formData.pid
        })
      } else {
        // 新增
        agreeDept = this.originDepts.filter(item => item.pid === this.formData.pid)
      }

      console.log(86, agreeDept)
      // let isRepeat = false // true表示重名了，否则没有重名
      // agreeDept.forEach(item => {
      //   if (item.name === val) {
      //     isRepeat = true
      //   }
      // })
      // true表示没有重名，false表示重名了
      // every是数组的方法
      // 该方法表示，只需要判断到回调函数中的条件不成立，立刻终止循环并返回false
      // 否则返回true
      const isRepeat = agreeDept.every(item => item.name !== val)
      if (!isRepeat) {
        callback(`${val} - 部门名称已经存在`)
      } else {
        callback()
      }
    }
    // 校验部门编码
    const checkCode = (rule, val, callback) => {
      // 需求：新增的部门编码不能和已存在的其他部门编码重名 --- 需要和所有其他部门进行比较
      // isRepeat值为true表示没有重复的code 否则有
      // 因为在编辑部门的时候 当前编辑的部门是已经存在在this.originDepts列表中的
      // 因此比较的时候发生自身进行比较的问题，所以编辑的时候应该要排除自己进行比较
      let isRepeat
      if (this.formData.id) {
        // 编辑
        isRepeat = this.originDepts.filter(item => item.id !== this.formData.id)
          .every(item => item.code !== val)
      } else {
        // 新增
        isRepeat = this.originDepts.every(item => item.code !== val)
      }

      if (isRepeat) {
        callback()
      } else {
        callback(`部门编码：${val}重复了`)
      }
    }
    return {
      company: {

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
        pid: '' // 父级部门id -- 新增的时候传递给后端，告诉后端要为id为this.form.pid的部门添加子部门
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空！', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度1到50个字符', trigger: 'blur' },
          // 需求：新增的部门编码不能和已存在的其他部门编码重名 --- 需要和所有其他部门进行比较
          { validator: checkCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '部门名称不能为空！', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度1到50个字符', trigger: 'blur' },
          // 需求：判断新增的部门名称不能和已存在的同级部门名称相同
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
      userList: [], // 部门负责人列表
      originDepts: [] // 部门列表 --- 未转换树形结构的数据
    }
  },
  async created() {
    this.getDepartmentList()
    // 获取部门负责人
    this.userList = await getEmployeeSimple()
  },
  methods: {
    // 编辑部门
    async editFn(id) {
      this.showDialog = true
      const res = await departmentDetail(id)
      // console.log(173, res)
      // 回显
      this.formData = res
    },
    // 删除部门
    delFn(id) {
      this.$confirm('您是否确定要删除该部门吗？', '提示', {
        type: 'warning'
      }).then(async() => {
        // 调用接口 实现删除
        await delDepartment(id)
        // 更新页面渲染的部门列表
        this.getDepartmentList()
      }).catch((err) => {
        // catch函数不仅仅可以捕获用户点击的取消按钮，也可以捕获then中发生的错误信息
        console.log('用户点击了取消按钮:', err)
      })
    },
    // 确定新增
    async submit() {
      // 表单验证
      await this.$refs.form.validate()
      if (this.formData.id) { // 有id说明是编辑
      // 调用编辑接口
        await editDepartment(this.formData)
      } else {
      // 调用新增接口
        await addDepartment(this.formData)
      }
      // 刷新页面
      this.getDepartmentList()
      // 关闭弹窗
      this.cancelFn()
    },
    addFn(id) {
      console.log('当前点击的部门id', id)
      this.formData.pid = id // 保存pid
      // 控制弹窗显示
      this.showDialog = true
    },
    // 关闭弹窗
    cancelFn() {
      this.showDialog = false
      // 清空数据
      this.formData = {
        code: '', // 部门编码
        name: '', // 部门名称
        manager: '', // 部门负责人
        introduce: '', // 介绍
        pid: '' // 父级部门id -- 新增的时候传递给后端，告诉后端要为id为this.form.pid的部门添加子部门
      }
      // 移除校验结果 --- 这个方法也可以清空数据（但是只能清空表单绑定的数据）
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
      this.originDepts = res.depts
    }
    // 列表转树形结构 数据
    // 为了使我们封装的listToTree方法能够更加通用
    // 因此我们可以把要改造的数据以及一级部门的pid用参数的
    // 形式传入给函数。
    /**
     *  递归函数：
     *  像listToTree函数一样，有自己调用自己函数的形式的函数我们称它为递归函数
     *    注意：递归函数一定要有一个结束条件
     * */
    // listToTree(list, id) {
    //   const arr = []
    //   list.forEach(item => {
    //     // 找一级部门 -- 当部门的pid值为空字符串说明该部门为一级部门
    //     if (item.pid === id) {
    //       arr.push(item)
    //       // 根据一级部门的id找二级部门
    //       // 只需要判断一级部门id等于另一个部门的pid即可，当两个值相等的时候，
    //       // 说明另一个部门就是该部门的子部门
    //       // 方法一：
    //       // item.children = [] // 表示给item对象添加children属性，并赋值为空数组
    //       // list.forEach(val => {
    //       //   if (val.pid === item.id) {
    //       //     item.children.push(val)
    //       //   }
    //       // })
    //       // 方法二：
    //       item.children = this.listToTree(list, item.id)
    //     }
    //   })
    //   return arr
    // }
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
