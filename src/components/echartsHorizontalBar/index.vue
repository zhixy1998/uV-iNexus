<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="chart-box" id="echartsHorizontalBar"></div>
</template>

<script lang="ts" setup>
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  yAxisOptions: {
    type: Object,
    default: () => ({
      data: [],
    }),
  },
  seriesData: {
    type: Array,
    default: () => {
      return []
    },
  },
})
watch(
  () => [props.yAxisOptions, props.seriesData],
  () => {
    console.log('props.yAxisOptions走了这里的监听', props.yAxisOptions)
    initChart()
  },
)
const option = computed(() => ({
  barWidth: 15,
  xAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      //  改变x轴颜色
      show: false,
    },
    axisLabel: {
      //  改变x轴字体颜色和大小
      textStyle: {
        fontSize: 14,
      },
    },
  },
  yAxis: {
    type: 'category',
    data: props.yAxisOptions.data,
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,0.2)',
        type: 'dashed',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      //  改变y轴颜色
      show: false,
    },
    axisLabel: {
      //  改变y轴字体颜色和大小
      //formatter: '{value} m³ ', //  给y轴添加单位
      textStyle: {
        fontSize: 14,
      },
    },
  },
  series: [
    {
      type: 'bar',
      name: '',
      barWidth: 25,
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示
            position: 'insideRight', //在上方显示
            textStyle: {
              //数值样式
              color: '#FFFFFF',
              fontSize: 14,
            },
          },
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 0,
              color: 'rgba(47,248,255,.8)',
            },
            {
              offset: 1,
              color: 'rgba(47,248,255,0)',
            },
          ]),
          barBorderRadius: 2,
        },
      },
      data: props.seriesData,
    },
  ],
}))

let chartInstance: ECharts | null = null
const initChart = () => {
  const chartBox = document.getElementById('echartsHorizontalBar') as HTMLElement
  if (!chartBox) return
  chartInstance = echarts.init(chartBox)
  console.log('option', option)
  if (option) chartInstance?.setOption(option.value)
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
