<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="chart-box" :class="className" id="echartsLine"></div>
</template>

<script lang="ts" setup>
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  legendData: {
    type: Array,
    default: () => {
      return []
    },
  },
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
  seriesOptions: {
    type: Array,
    default: () => {
      return []
    },
  },
  className: {
    type: String,
    default: 'h-[350px]',
  },
  colorList: {
    type: Array,
    default: () => {
      return [
        '#5e81ec',
        '#ffc855',
        '#98e79b',
        '#00d695',
        '#00b29a',
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
      ]
    },
  },
})

const option = {
  // color: props.colorList,
  tooltip: {
    show: true,
    trigger: 'axis',
  },
  backgroundColor: '#FFF',
  grid: {
    top: 20,
    bottom: 80,
    left: '10%',
    // right: 20,
  },
  legend: {
    bottom: '10',
    itemHeight: 10,
    data: props.legendData,
  },
  xAxis: [
    {
      type: 'category',
      name: props.xAxisOptions.name,
      nameLocation: 'center',
      nameGap: 30,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#CCC',
        },
      },
      axisLabel: {
        textStyle: {
          fontSize: 14,
        },
      },
      data: props.xAxisOptions.data,
    },
  ],
  yAxis: [
    {
      name: props.yAxisOptions.name,
      nameLocation: 'center',
      nameGap: 40,
      nameTextStyle: {
        color: '#000',
      },
      min: props.yAxisOptions.min,
      max: props.yAxisOptions.max,
      scale: true,
      interval: 100,
      axisLine: {
        lineStyle: {
          color: '#CCC',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#CCC',
        },
      },
      axisLabel: {
        color: '#000',
      },
    },
  ],
  series: props.seriesOptions,
}

let chartInstance: ECharts | null = null
const initChart = () => {
  const chartBox = document.getElementById('echartsLine') as HTMLElement
  if (!chartBox) return
  chartInstance = echarts.init(chartBox)
  // if (!props.xAxisOptions.data[0]) {
  //   option = {
  //     xAxis: { show: false }, // 隐藏 x 轴
  //     yAxis: { show: false }, // 隐藏 y 轴
  //     grid: { show: false }, // 隐藏网格
  //     graphic: {
  //       elements: [
  //         {
  //           type: 'text',
  //           left: 'center',
  //           top: 'center',
  //           style: {
  //             text: '暂无数据',
  //             fontSize: 20,
  //             fontWeight: 'bold',
  //             fill: '#999',
  //           },
  //         },
  //       ],
  //     },
  //     series: [
  //       {
  //         type: 'line',
  //         data: [],
  //         showSymbol: false,
  //       },
  //     ],
  //   }
  // }
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

watch(
  () => [props.xAxisOptions, props.seriesOptions],
  ([newXAxisOptions, newSeriesOptions]: any) => {
    if (chartInstance) {
      chartInstance.setOption(
        {
          ...option,
          xAxis: {
            ...option,
            data: newXAxisOptions.data,
          },
        },
        true,
      ) // 第二个参数为 true 表示合并而非完全替换
    }
  },
  { deep: true, immediate: true },
)

// 初始化
onMounted(() => {
  initChart()
})
</script>

<style lang="less" scoped>
.chart-box {
  width: 90%;
}
</style>
