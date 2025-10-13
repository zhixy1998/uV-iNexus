<template>
  <div class="chart-box" id="echartsLine"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

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

const chartInstance = ref<echarts.ECharts | null>(null)
const initChart = () => {
  const chartBox = document.getElementById('echartsLine') as HTMLElement
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
