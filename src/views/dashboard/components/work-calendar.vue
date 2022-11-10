<template>
  <div>
    <!-- 下拉框 -->
    <el-row type="flex" justify="end">
      <!-- 年 -->
      <el-select v-model="year" size="small" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- 月 -->
      <el-select v-model="month" size="small" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-if="isShow" v-model="curDate">
      <template v-slot:dateCell="{date, data}">
        {{ data.day | getDay }}
        <span v-if="isWeek(date)" class="week">休</span>
      </template>
    </el-calendar>
  </div>
</template>
<script>
/**
 * 需求：年份渲染当前年份的前后5年即可
 * */
const curDate = new Date() // 当前日期对象
const curYear = curDate.getFullYear()
const yearList = []
for (let i = 0; i < 11; i++) {
  const year = curYear - 5 + i // 获取前后5年的年份
  yearList.push(year)
}

export default {
  /** *
   * 局部过滤器语法：
   * filters:{
   *  自定义过滤器名字(val){}
   * }
   *
   * */
  filters: {
    // 局部过滤器
    getDay(val) {
      // console.log(val)
      const arr = val.split('-')
      return Number(arr[2])
    }
  },
  data() {
    return {
      curDate: new Date(), // 当前日期
      month: curDate.getMonth() + 1, // 月份
      year: curDate.getFullYear(),
      yearList,
      isShow: true
    }
  },
  watch: {
    // 日历联动下拉框
    // 监听日历日期的变化，然后获取到年月赋值给下拉框绑定的变量
    curDate(val) {
      this.year = val.getFullYear()
      this.month = val.getMonth() + 1
    },
    // 实现日历组件的多语言实时切换
    // 表示侦听对象中的某一个属性
    '$i18n.locale'(val) {
      // 销毁日历组件
      this.isShow = false
      // 因为DOM更新是异步，所以需要等待组件销毁完成后再创建才有效果
      // 销毁后重新创建日历组件
      this.$nextTick(() => {
        // 这里是在DOM更新完成后触发的
        this.isShow = true
      })
    }
  },
  methods: {
    // 判断当前日期是否为周末,判断是周末则返回true否则返回false
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 下拉框联动日历控件
    dateChange() {
      this.curDate = new Date(this.year + '-' + this.month)
    }
  }
}
</script>
<style lang="scss" scoped>
// ::v-deep 这个是scss的样式穿透 语法
 ::v-deep .el-calendar-day {
  height:  auto;
  position: relative;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
 .week{
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #fa7c4d;
  color: #fff;
  text-align: center;
  font-size: 14px;
  position: absolute;
  left: 30px;
 }
</style>
