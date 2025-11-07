<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div ref="chartRef" class="dynamic-line-chart" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import type { PropType } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { ChartDataItem } from '@/types/experimentTypes'

// 定义线的配置类型
interface ChartLinesData {
  name: string
  color?: string
  data?: ChartDataItem[]
}

interface MarkPointItem {
  name: string
  coord: [number, number]
  symbol?: string
  symbolSize?: number
  itemStyle?: {
    color: string
  }
  label?: {
    show: boolean
    formatter?: string
    rich?: {
      [key: string]: any
    }
    [key: string]: any
  }

  [key: string]: any
}

interface xAxisType {
  min: number | string
  max: number | string
}

const props = defineProps({
  // 多条线的数据配置
  lines: {
    type: Array as PropType<ChartLinesData[]>,
    required: true,
    default: () => [],
  },
  xAxisOptions: {
    type: Object as PropType<xAxisType>,
    default: () => ({
      min: 0,
      max: 800,
    }),
  },
  yAxisOptions: {
    type: Object,
    default: () => ({
      min: '',
      max: '',
    }),
  },
  markSelect: {
    type: Array,
    default: () => [],
  },
  // 全局标记点显示控制
  showMark: {
    type: Boolean,
    default: true,
  },
  yAxisName: {
    type: String,
    default: '',
  },
  xAxisName: {
    type: String,
    default: '',
  },
})

const chartRef = ref<HTMLDivElement>()
let chart: ECharts | null = null
const unit = computed(() => {
  const matchResult = props.xAxisName.match(/\((.*?)\)/)
  return matchResult ? matchResult[1] : ''
})
// 生成标记点数据
const generateMarkPoints = (lineData: ChartDataItem[], lineIndex: number, lineName: string) => {
  const points: MarkPointItem[] = []

  lineData.forEach((item) => {
    if (props.markSelect.includes('标记点') && Number(item.marked)) {
      points.push({
        name: `${lineName}-标记`,
        coord: [Number(item.x), Number(item.y)],
        symbolSize: 20,
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'bottom', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
      })
    }

    if (props.markSelect.includes('波峰') && Number(item.feng)) {
      points.push({
        name: `${lineName}-波峰`,
        coord: [Number(item.x), Number(item.y)],
        symbol:
          'path://M489.90890884 1017.28884579l0-662.73273745L551.27305136 354.55610835 551.27305135 1017.28884579l-61.3641425-2e-8z M306.28092891 358.28692148L515.86227332 1.43220042l215.24570478 356.85472106-424.82704919 0z',
        symbolSize: 20,
        symbolKeepAspect: true,
        symbolOffset: [0, -9],
        itemStyle: {
          color: '#d8001b',
        },
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'top', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
      })
    }

    if (props.markSelect.includes('波谷') && Number(item.gu)) {
      points.push({
        name: `${lineName}-波谷`,
        coord: [Number(item.x), Number(item.y)],
        symbol:
          'path://M533.74591785 3.77295909l0 652.37753843L473.34059007 656.15049752 473.34059007 3.77295909l60.40532778 1e-8z M714.5047106 663.14464499L508.1980747 1014.42351103l-211.88249064-351.27886604 418.18912654 0z', // 替换为你的 SVG Path
        symbolSize: 20,
        symbolKeepAspect: true,
        symbolOffset: [0, 9],
        itemStyle: {
          color: '#70b503',
        },
        label: {
          show: true,
          formatter: `${Number(item.x)}${unit.value}, ${Number(item.astrictY)}`, // 显示坐标值
          position: 'bottom', // 标签位置
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // 背景色
          padding: [1, 2],
          borderRadius: 2,
          color: '#333',
          fontSize: 11,
        },
      })
    }
  })

  return points
}

// 更新图表
const updateChart = () => {
  if (!chart) return

  // const series = props.lines.map((line, index) => ({
  //   name: line.name,
  //   type: 'line',
  //   symbolSize: 6,
  //   symbol: 'none',
  //   itemStyle: {
  //     color: line.color || getDefaultColor(index),
  //   },
  //   markPoint: {
  //     data: props.showMark
  //       ? generateMarkPoints(line.data as ChartDataItem[], index, line.name)
  //       : [],
  //   },
  //   data: line.data?.map((item) => [item.x, item.y]),
  // }))
  chart.setOption(
    {
      title: {
        text: props.yAxisName,
      },
      legend: {
        data: props.lines.map((line) => line.name),
      },
      series: props.lines.map((line, index) => ({
        name: line.name,
        type: 'line',
        symbolSize: 6,
        symbol: 'none',
        itemStyle: {
          color: line.color || '#000',
        },
        markPoint: {
          data: props.showMark
            ? generateMarkPoints(line.data as ChartDataItem[], index, line.name)
            : [],
        },
        data: line.data?.map((item) => [item.x, item.y]),
        animation: false,
      })),
    },
    {
      replaceMerge: ['series'],
    },
  )
}

// 默认颜色序列
const getDefaultColor = (index: number) => {
  const colors = [
    '#0038a8',
    '#ef949f',
    '#c5f18c',
    '#FFA500',
    '#9932CC',
    '#00CED1',
    '#FF6347',
    '#4682B4',
    '#32CD32',
    '#BA55D3',
  ]
  return colors[index % colors.length]
}
let resizeObserver: ResizeObserver | null = null
// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)

  const option: EChartsOption = {
    title: {
      text: props.yAxisName,
      textStyle: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#556677',
      },
      left: 'left', // 或者使用 '0' 或具体像素值
      top: 'top', // 或者使用 '0' 或具体像素值
      padding: [15, 10], // [上, 右, 下, 左] 内边距
    },
    backgroundColor: '#fff',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: props.lines.map((line) => line.name),
      bottom: '5%',
      textStyle: {
        color: '#90979c',
      },
      type: 'scroll',
    },
    grid: {
      top: 'middle',
      left: '3%',
      // right: '4%',
      bottom: '5%',
      height: '80%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: 'rgba(204,187,225,0.5)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}',
        showMinLabel: true,
        showMaxLabel: true,
      },
      min: props.xAxisOptions.min,
      max: props.xAxisOptions.max,
      name: props.xAxisName,
      nameTextStyle: {
        color: '#556677',
      },
    },
    yAxis: {
      type: 'value',
      // min: props.yAxisOptions.min,
      // max: props.yAxisOptions.max,
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#556677',
        formatter: '{value}',
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#DCE2E8',
        },
      },
    },
    dataZoom: [
      {
        show: true,
        height: 20, // 减小高度
        xAxisIndex: [0],
        bottom: 2, // 调整位置
        start: 200,
        end: 800,
        handleIcon:
          'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '80%', // 减小手柄大小
        handleStyle: {},
        textStyle: {
          fontSize: 10, // 减小字体大小
        },
      },
      {
        type: 'inside',
        show: true,
        start: 1,
        end: 35,
        zoomLock: true, // 可选，锁定缩放比例
      },
    ],
    series: props.lines.map((line, index) => ({
      name: line.name,
      type: 'line',
      symbolSize: 6,
      symbol: 'none',
      markPoint: {
        data: props.showMark
          ? generateMarkPoints(line.data as ChartDataItem[], index, line.name)
          : [],
      },
      itemStyle: {
        color: line.color || '#000',
      },
      data: line.data?.map((item) => [item.x, item.y]),
    })),
  }

  chart.setOption(option)

  window.addEventListener('resize', handleResize)
  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(chartRef.value)
}

// 截图功能
const captureChart = () => {
  return new Promise((resolve) => {
    const imgData = chart?.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff',
    })
    resolve(imgData)
  })
}

// 响应式调整
const handleResize = () => {
  chart?.resize()
}

// 监听props变化
watch(() => props.lines, updateChart, { deep: true })
watch(() => props.markSelect, updateChart, { deep: true })
watch(() => props.showMark, updateChart)
watch(
  () => props.yAxisOptions,
  (newVal) => {
    chart?.setOption({ yAxis: newVal })
  },
  { deep: true },
)
watch(
  () => props.xAxisOptions,
  (newValue) => {
    chart?.setOption({
      xAxis: {
        min: newValue.min,
        max: newValue.max,
      },
      // 同时确保数据范围也更新
      // dataZoom: [
      //   {
      //     start: newValue.min || 0,
      //     end: newValue.max || 800,
      //   },
      // ],
    })
  },
  { deep: true },
)
// 生命周期
onMounted(initChart)
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    window.removeEventListener('resize', handleResize)
  }
})

defineExpose({ captureChart })
</script>

<style scoped>
.dynamic-line-chart {
  background: #dce2e8;
  border-radius: 4px;
}
</style>
