<template>
  <div ref="chartRef" class="dynamic-line-chart" style="width: 100%; height: 400px"></div>
</template>

<script setup lang="ts">
import type { ECharts, EChartsOption, SeriesOption } from 'echarts'
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Props 定义
interface Props {
  initialData?: number[] // 初始数据
}
const props = withDefaults(defineProps<Props>(), {
  initialData: () => [],
})

const chartRef = ref<HTMLDivElement>()
let chart: ECharts | null = null
const data: number[] = [...props.initialData]
const annotations: { x: number; y: number; text: string }[] = [] // 批注存储

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)

  const option: EChartsOption = {
    grid: { top: 20, right: 40, bottom: 30, left: 40 },
    xAxis: { type: 'value', splitLine: { show: false } },
    yAxis: { type: 'value', splitLine: { show: false } },
    series: [
      {
        type: 'line',
        data: data,
        symbol: 'none', // 不显示点标记
        lineStyle: { color: '#c23531', width: 2 },
        animation: true,
        animationEasing: 'linear',
        animationDuration: 1000,
      },
    ],
  }
  chart.setOption(option)

  // 窗口 resize 自适应
  window.addEventListener('resize', handleResize)
}

// 销毁图表
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    window.removeEventListener('resize', handleResize)
  }
})

// 响应式调整
const handleResize = () => {
  chart?.resize()
}

// 初始化
onMounted(() => {
  initChart()
})
</script>

<style scoped>
.dynamic-line-chart {
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
