<template>
  <div class="chart-box" id="echartsRose"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
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
  tooltip: {
    trigger: 'item',
    // formatter: '{b} : {c} ({d}%)',
  },
  color: props.colorList,
  calculable: true,
  legend: {
    bottom: '10',
    itemHeight: 10,
  },
  series: [
    {
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      label: {
        show: true,
        color: 'inherit',
        position: 'outside',
        fontSize: 14,
        formatter: '{b} {d}%',
      },
      labelLine: {
        length: 1,
        length2: 20,
        smooth: true,
      },
      data: props.seriesData,
    },
  ],
}

const chartInstance = ref<echarts.ECharts | null>(null)
const initChart = () => {
  const chartBox = document.getElementById('echartsRose') as HTMLElement
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
