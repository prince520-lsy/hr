<template>
  <div id="main" class="radar">雷达图</div>
</template>
<script>
// 按需引入echarts
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer])
export default {
  mounted() {
    // 初始化雷达图 需要用到mounted函数
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: '基础雷达图'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '考勤', max: 6500 },
          { name: '助人', max: 16000 },
          { name: 'bug', max: 30000 },
          { name: '分享', max: 38000 },
          { name: '管理', max: 52000 },
          { name: '技术', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 45000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    }

    option && myChart.setOption(option)
  }
}
</script>
  <style scss scoped>
  .radar{
      height: 300px;
  }
  </style>
