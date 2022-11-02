<template>
  <div class="import-box">
    <!--
      UploadExcel组件的作用：帮我们把上传的Excel文件中的数据
      提取处理，并通过onSuccess属性绑定的函数传回给我们使用
     -->
    <UploadExcel :on-success="successFn" />
  </div>
</template>
<script>

import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async successFn(data) {
      // data： 就是组件帮我们提取出来的Excel表格中的数据
      console.log(10, data)
      // 查看导入的数据，发现数据的属性名是都是中文，但是查看接口文档发现
      // 我调用导入接口的时候，传入的数据属性名必须是英文。
      // 所以接下来我们需要把导入的数据的中属性名改为对应的英文属性名
      // 这里我们可以借助数组的map方法来改造数据
      // map方法的作用：改造数据，return什么内容 得到的新数组元素就是什么内容
      const result = data.results.map(item => {
        return this.zhToEn(item)
      })
      // 调用接口实现批量导入
      // console.log(24, result)
      await importEmployee(result)
      // 成功 返回员工列表
      this.$router.back() // back 表示返回上一个路由地址
    },
    // 中文属性名转换为英文属性名
    zhToEn(item) {
      const obj = {} // 转换好的数据保存到obj中
      // 。。。转换过程
      // 定义一个中英文对照表
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '姓名': 'username',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '转正日期': 'correctionTime'
      }
      for (const key in item) {
        // key 值是item对象中属性名（中文名）
        // 我们发现key还是userRelations对象中的属性名
        // console.log(key, userRelations[key], item[key])
        const enAttr = userRelations[key] // 中文属性名对应的英文名
        if (enAttr === 'timeOfEntry' || enAttr === 'correctionTime') {
          // 因为Excel表格中得到的时间是从1900/1/1开始计算的天数，因此我
          // 需要把这个日期转换为年月日格式，再传递给后端
          obj[enAttr] = this.formatExcelDate(item[key])
        } else {
          obj[enAttr] = item[key] // 为obj对象添加enAttr属性 并赋值为原来item中的key属性对应的值
        }
      }
      return obj // 返回转换好的数据对象
    },
    /**
 * 格式化Excel表中存储的年月日日期
 * @param {number} num - excel存储的数字
 * @param {string} [format = '-'] - 年月日的间隔符，默认为'-'
 * @returns {string} 格式化后的日期
 */
    formatExcelDate(num, format = '-') {
      if (!/^\d+$/.test(num)) return
      num = parseInt(num)
      let millisecond = 0 // 转化后的毫秒数
      if (num > 60) { // 对大于60的日期进行减1处理
        millisecond = (num - 25568 - 1) * 3600 * 24 * 1000
      } else {
        millisecond = (num - 25568) * 3600 * 24 * 1000
      }
      const date = new Date(millisecond) // 根据转化后的毫秒数获取对应的时间
      const yy = date.getFullYear()
      const m = date.getMonth() + 1
      const mm = m >= 10 ? m : '0' + m
      const d = date.getDate()
      const dd = d >= 10 ? d : '0' + d
      return yy + format + mm + format + dd // 返回格式化后的日期
    }

  }
}
</script>
<style scoped>
.import-box{
    margin-top: 50px;
}
</style>
