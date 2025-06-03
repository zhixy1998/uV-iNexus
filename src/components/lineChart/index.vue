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
  addPointInterval?: number // 添加点的间隔（毫秒）
}
const props = withDefaults(defineProps<Props>(), {
  initialData: () => [],
  addPointInterval: 1000,
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

// 动态添加数据点
const addDataPoint = (value: number, annotation?: string) => {
  data.push(value)
  if (annotation) {
    annotations.push({ x: data.length - 1, y: value, text: annotation })
  }
  console.log('调用了这里', value)
  if (chart) {
    const option: EChartsOption = {
      series: [{ data }],
      graphic: annotations.map((ann, idx) => ({
        type: 'text',
        left: ann.x,
        top: ann.y - 20,
        style: {
          text: ann.text,
          fill: '#333',
          fontSize: 12,
        },
      })),
    }
    chart.setOption(option)
  }
}

// 模拟心电图数据生成
const generateECGData = (): number => {
  // 模拟心电图数据（实际项目可替换为真实数据）
  const base = Math.sin(Date.now() / 1000) * 5
  const noise = Math.random() * 0.5
  return base + noise
}

// 定时添加数据点（演示用）
let timer: number
const startSimulation = () => {
  timer = window.setInterval(() => {
    const value = generateECGData()
    // 每隔 5 个点加一个批注
    if (data.length % 5 === 0) {
      addDataPoint(value, `Peak ${data.length}`)
    } else {
      addDataPoint(value)
    }
  }, props.addPointInterval)
}

// 销毁图表
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
    window.removeEventListener('resize', handleResize)
  }
  if (timer) clearInterval(timer)
})

// 响应式调整
const handleResize = () => {
  chart?.resize()
}

// 初始化
onMounted(() => {
  initChart()
  startSimulation()
})
// 暴露方法
defineExpose({
  addDataPoint,
})
</script>

<style scoped>
.dynamic-line-chart {
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
