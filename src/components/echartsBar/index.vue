<template>
  <div class="chart-box" id="echartsBar"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

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
const chartInstance = ref<echarts.ECharts | null>(null)
const initChart = () => {
  const chartBox = document.getElementById('echartsBar') as HTMLElement
  if (!chartBox) return
  chartInstance.value = echarts.init(chartBox)
  if (option) chartInstance.value?.setOption(option)
}

const resizeHandler = () => {
  if (chartInstance.value?.isDisposed?.() === false) {
    chartInstance.value.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  if (chartInstance.value) {
    chartInstance.value?.dispose()
  }
})
</script>

<style lang="less" scoped>
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
