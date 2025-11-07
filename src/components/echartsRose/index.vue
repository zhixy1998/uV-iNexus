<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="chart-box" :id="id"></div>
</template>

<script lang="ts" setup>
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import type { ZRColor } from 'echarts/types/dist/shared'
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'echartsRose',
  },
  seriesData: {
    type: Array,
    default: () => {
      return []
    },
  },
  colorList: {
    type: Array,
    default: () => {
      return [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(51,192,205,0.01)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(51,192,205,0.57)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(115,172,255,0.02)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(115,172,255,0.67)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(158,135,255,0.02)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(158,135,255,0.57)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(252,75,75,0.01)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(252,75,75,0.57)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(253,138,106,0.01)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#FDB36ac2', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(254,206,67,0.12)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#FECE4391', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(75, 192, 192, 0.01)',
            },
            {
              offset: 1,
              color: 'rgba(75, 192, 192, 0.57)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(153, 102, 255, 0.02)',
            },
            {
              offset: 1,
              color: 'rgba(153, 102, 255, 0.67)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(255, 159, 64, 0.02)',
            },
            {
              offset: 1,
              color: 'rgba(255, 159, 64, 0.57)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(54, 162, 235, 0.01)',
            },
            {
              offset: 1,
              color: 'rgba(54, 162, 235, 0.57)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(255, 99, 132, 0.01)',
            },
            {
              offset: 1,
              color: 'rgba(255, 99, 132, 0.57)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(255, 205, 86, 0.12)',
            },
            {
              offset: 1,
              color: 'rgba(255, 205, 86, 0.57)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(201, 203, 207, 0.01)',
            },
            {
              offset: 1,
              color: 'rgba(201, 203, 207, 0.57)',
            },
          ],
          globalCoord: false,
        },
      ]
    },
  },
})
const colorLine = [
  '#33C0CD',
  '#73ACFF',
  '#9E87FF',
  '#FE6969',
  '#FDB36A',
  '#FECE43',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#36A2EB',
  '#FF6384',
  '#FFCD56',
  '#C9CBCF',
]

const newSeriesData = ref<{ name: string; value: number }[]>([])

function getRich() {
  const result = {} as any
  colorLine.forEach((v, i) => {
    result[`hr${i}`] = {
      backgroundColor: colorLine[i],
      borderRadius: 3,
      width: 3,
      height: 3,
      padding: [3, 3, 0, -12],
    }
    result[`a${i}`] = {
      padding: [-11, 6, -20, 6],
      color: colorLine[i],
      backgroundColor: 'transparent',
      fontSize: 12,
    }
  })
  return result
}

const option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '10',
    itemHeight: 10,
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      clockwise: true,
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: 'outside',
        formatter: function (params: any) {
          const name = params.name
          const value = params.value
          // const percent = params.percent + '%'
          const index = params.dataIndex
          // return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
          return [`{a${index}|${name}：${value}}`, `{hr${index}|}`].join('\n')
        },
        rich: getRich(),
      },
      itemStyle: {
        normal: {
          color: function (params: any) {
            return props.colorList[params.dataIndex]
          },
        },
      },
      data: newSeriesData.value,
      roseType: 'radius',
    },
  ],
}

let chartInstance: ECharts | null = null

const initChart = () => {
  const chartBox = document.getElementById(props.id) as HTMLElement
  if (!chartBox) return
  chartInstance = echarts.init(chartBox)
  if (option) chartInstance?.setOption(option)
  // 窗口 resize 自适应
  window.addEventListener('resize', handleResize)
}

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
    window.removeEventListener('resize', handleResize)
  }
})

watch(
  () => props.seriesData,
  (newVal) => {
    newSeriesData.value = props.seriesData.map((v: any, i: number) => ({
      ...v,
      labelLine: {
        lineStyle: {
          width: 1,
          color: colorLine[i],
        },
      },
    }))
    // if (props.colorList.length < newSeriesData.value.length) {
    // props.colorList增加newSeriesData.value.length / props.colorList的倍数
    // for (let i = props.colorList.length; i < newSeriesData.value.length; i++) {
    //   props.colorList.push(colorLine[i % colorLine.length])
    // }
    // console.log(props.colorList)
    // props.colorList = newSeriesData.value.length / props.colorList
    // }
    option.series[0].data = newSeriesData.value
    initChart()
  },
  { immediate: true },
)

// 响应式调整
const handleResize = () => {
  chartInstance?.resize()
}

// 初始化
onMounted(() => {
  initChart()
})
</script>

<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
