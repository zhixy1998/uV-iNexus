<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="chart-box" id="echartsBar"></div>
</template>

<script lang="ts" setup>
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  xAxisOptions: {
    type: Object,
    default: () => ({
      name: '',
      data: [],
    }),
  },
  yAxisOptions: {
    type: Object,
    default: () => ({
      name: '',
      min: 0,
      max: 100,
    }),
  },
  seriesData: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const option = {
  // backgroundColor: '#000a3f',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    // backgroundColor: 'rgba(9, 24, 48, 0.5)',
    borderColor: 'rgba(75, 253, 238, 0.4)',
    textStyle: {
      color: '#CFE3FC',
    },
    borderWidth: 1,
  },
  grid: {
    top: '15%',
    right: '5%',
    left: '5%',
    bottom: '12%',
  },
  xAxis: [
    {
      name: props.xAxisOptions.name,
      type: 'category',
      data: props.xAxisOptions.data,
      axisLine: {
        lineStyle: {
          color: '#FFFFFF',
        },
      },
      axisLabel: {
        margin: 10,
        color: '#666',
        textStyle: {
          fontSize: 14,
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      name: props.yAxisOptions.name,
      axisLabel: {
        formatter: '{value}',
        // color: '#e2e9ff',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          // color: '#FFFFFF',
        },
      },
      splitLine: {
        lineStyle: {
          // color: 'rgba(255,255,255,0.12)',
        },
      },
    },
  ],
  series: [
    {
      type: 'bar',
      data: props.seriesData,
      barWidth: '30%',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0,244,255,1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0,77,167,1)', // 100% 处的颜色
              },
            ],
            false,
          ),
          shadowColor: 'rgba(0,160,221,1)',
          shadowBlur: 4,
        },
      },
      label: {
        normal: {
          show: true,
          lineHeight: 10,
          formatter: '{c}',
          position: 'top',
          textStyle: {
            color: '#00D6F9',
            fontSize: 12,
          },
        },
      },
    },
  ],
}

let chartInstance: ECharts | null = null
const initChart = () => {
  const chartBox = document.getElementById('echartsBar') as HTMLElement
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
