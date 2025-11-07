<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div ref="chartRef" class="line-chart-3d"></div>
</template>

<script setup lang="ts">
import 'echarts-gl'

import * as echarts from 'echarts'

import type { Series3DLineData } from '@/types/common'

interface Props {
  series: Series3DLineData[]
  backgroundColor?: string
  gridColor?: string
  axisColor?: string
  width?: number | string
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#f1f1f1',
  gridColor: '#153471',
  axisColor: '#153471',
  width: '100%',
  height: '500px',
})

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  // 初始化图表
  chartInstance = echarts.init(chartRef.value)

  // 准备系列数据
  const series = props.series.map((item) => ({
    type: 'line3D',
    name: item.name,
    data: item.data.map((point) => [point.x, point.y, point.z]),
    lineStyle: {
      width: item.lineWidth || 4,
      color: item.color || '#000',
    },
  }))

  // 配置项
  const option = {
    grid3D: {
      show: true,
      boxWidth: 200,
      boxHeight: 100,
      boxDepth: 100,
      axisLine: {
        lineStyle: {
          color: props.axisColor,
          opacity: 1,
        },
      },
      axisPointer: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: props.gridColor,
          width: 1,
        },
      },
      environment: props.backgroundColor,
      viewControl: {
        distance: 250,
        alpha: 10,
        beta: 30,
        animation: true,
      },
    },
    xAxis3D: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: props.axisColor,
        },
      },
      axisLabel: {
        color: props.axisColor,
      },
    },
    yAxis3D: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: props.axisColor,
        },
      },
      axisLabel: {
        color: props.axisColor,
      },
    },
    zAxis3D: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: props.axisColor,
        },
      },
      axisLabel: {
        color: props.axisColor,
      },
    },
    series,
  }

  chartInstance.setOption(option)
}

const getRandomColor = () => {
  const colors = [
    '#4fd2dd',
    '#4db8ff',
    '#7382ff',
    '#a35bff',
    '#ff6b81',
    '#ffa2ae',
    '#ffcb63',
    '#ffee55',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const resizeChart = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})

watch(
  () => props.series,
  () => {
    initChart()
  },
  { deep: true },
)

watch(
  () => [props.backgroundColor, props.gridColor, props.axisColor],
  () => {
    initChart()
  },
)
</script>

<style scoped>
.line-chart-3d {
  width: 100%;
  height: 100%;
}
</style>
