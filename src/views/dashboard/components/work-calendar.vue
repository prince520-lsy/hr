<template>
  <div>
    <!-- 下拉框 -->
    <el-row type="flex" justify="end">
      <!-- 年 -->
      <el-select v-model="year" size="small">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- 月 -->
      <el-select v-model="month" size="small">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="curDate" />
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
  data() {
    return {
      curDate: new Date(), // 当前日期
      month: curDate.getMonth() + 1, // 月份
      year: curDate.getFullYear(),
      yearList
    }
  }
}
</script>
  <style lang="scss" scoped>
  // ::v-deep 这个是scss的样式穿透 语法
   ::v-deep .el-calendar-day {
    height:  auto;
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
  </style>
