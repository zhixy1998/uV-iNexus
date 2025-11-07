<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div ref="chartRef" class="bar-chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted, type PropType, ref, watch } from 'vue'

// 定义类型
interface ColorStop {
  offset: number
  color: string
}

interface LinearGradient {
  type: 'linear'
  x: number
  y: number
  x2: number
  y2: number
  colorStops: ColorStop[]
}

interface ChartColors {
  dataColor: string[]
  axisColor: string[]
  colorArr1: string[]
  colorArr2: string[]
}

// 定义 props
const props = defineProps({
  data1: {
    type: Array as PropType<number[] | string[]>,
    default: () => [4, 2, 2, 3, 4, 2, 6, 1, 3, 6, 1, 9],
  },
  data2: {
    type: Array as PropType<number[] | string[]>,
    default: () => [9, 0, 1, 2, 9, 3, 9, 6, 1, 6, 2, 0],
  },
  nameArr: {
    type: Array as PropType<string[]>,
    default: () => [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  },
  legendName: {
    type: Array as PropType<string[]>,
    default: () => ['数据1', '数据2'],
  },
  barWidth: {
    type: Number,
    default: 18,
  },
  colors: {
    type: Object as PropType<ChartColors>,
    default: () => ({
      dataColor: ['#4EB2FE', '#f19051', '#F47505', '#20d450'],
      axisColor: ['#dde1e8', '#222222'],
      colorArr1: ['#009cff', '#7ce1ff', '#5fc9ff'],
      colorArr2: ['#fc9a00', '#f9c68c', '#fab452'],
    }),
  },
})

watch(
  () => [props.data1, props.data2, props.nameArr, props.legendName],
  ([newData1, newData2, newNameArr, newLegendName]) => {
    // let selectMarkArr: (MarkPointItem | null)[] = []
    chartInstance?.setOption({
      legend: [
        {
          data: newLegendName,
        },
      ],
      xAxis: {
        data: newNameArr,
      },
      series: [
        {
          name: newLegendName[0],
          data: newData1,
        },
        {},
        {
          name: newLegendName[1],
          data: newData2,
        },
      ],
    })
  },
  {
    deep: true,
  },
)
const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 生成线性渐变颜色
const createLinearGradient = (colors: string[]): LinearGradient => ({
  type: 'linear',
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    { offset: 0, color: colors[0] },
    { offset: 0.5, color: colors[0] },
    { offset: 0.5, color: colors[1] },
    { offset: 1, color: colors[1] },
  ],
})

// 获取图表配置
const getChartOption = () => {
  const color1 = createLinearGradient(props.colors.colorArr1)
  const color2 = createLinearGradient(props.colors.colorArr2)

  return {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: '100%',
      },
    },
    legend: [
      {
        top: '10%',
        left: '20%',
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
      },
    ],
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: props.colors.axisColor[1],
          width: 2,
        },
      },
      axisLabel: {
        interval: 0,
        fontSize: 8,
        rotate: 15,
        color: props.colors.axisColor[1],
      },
      data: props.nameArr,
    },
    yAxis: [
      {
        type: 'value',
        nameTextStyle: {
          fontFamily: 'ShiShangZhongHeiJianTi',
          fontSize: 20,
          color: '#ffd200',
          align: 'center',
          padding: [0, 0, 10, 0],
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: props.colors.axisColor[0],
            width: 2,
          },
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255, 0.5)',
          },
        },
        axisLabel: {
          fontFamily: 'Dinpro',
          fontSize: 14,
          color: props.colors.axisColor[1],
        },
      },
      {
        type: 'value',
        nameTextStyle: {
          fontFamily: 'ShiShangZhongHeiJianTi',
          fontSize: 20,
          color: '#ffd200',
          align: 'center',
          padding: [0, 50, 10, 0],
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: props.colors.axisColor[0],
            width: 2,
          },
        },
        axisLabel: {
          color: props.colors.axisColor[1],
          fontFamily: 'Dinpro',
          fontSize: 10,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255, 0.2)',
          },
        },
      },
    ],
    series: [
      {
        z: 1,
        type: 'bar',
        barWidth: props.barWidth,
        barGap: '0%',
        data: props.data1,
        itemStyle: {
          color: color1,
        },
      },
      {
        z: 3,
        name: '蓝色',
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: props.data1,
        symbol: 'diamond',
        symbolOffset: ['-56%', '-64%'],
        symbolSize: [18, 8],
        itemStyle: {
          borderWidth: 2,
          color: props.colors.colorArr1[2],
        },
        tooltip: {
          show: false,
        },
      },
      {
        z: 1,
        type: 'bar',
        barWidth: props.barWidth,
        barGap: '10%',
        data: props.data2,
        itemStyle: {
          color: color2,
        },
      },
      {
        z: 3,
        name: '橙色',
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: props.data2,
        symbol: 'diamond',
        symbolOffset: ['50%', '-60%'],
        symbolSize: [18, 8],
        itemStyle: {
          borderWidth: 2,
          color: props.colors.colorArr2[2],
        },
        tooltip: {
          show: false,
        },
      },
    ],
    grid: {
      top: '20%',
      left: '10%',
      right: '8%',
      bottom: '15%',
    },
  }
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

// 更新图表
const updateChart = () => {
  if (!chartInstance) return
  chartInstance.setOption(getChartOption())
}

// 响应式调整图表大小
const resizeChart = () => {
  chartInstance?.resize()
}

// 监听数据变化
watch(
  () => [props.data1, props.data2, props.nameArr],
  () => {
    updateChart()
  },
  { deep: true },
)
const emit = defineEmits(['click'])
// 生命周期钩子
onMounted(() => {
  initChart()
  chartInstance?.on('click', (params) => {
    emit('click', params)
  })
  window.addEventListener('resize', resizeChart)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})
</script>

<style scoped>
.bar-chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
