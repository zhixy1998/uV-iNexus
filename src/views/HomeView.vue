<template>
  <div class="home">
    <!-- 动态控制 -->
    <uvLight :size="dynamicSize" :brightness="dynamicBrightness" />
    <input type="range" v-model.number="dynamicSize" min="16" max="100" />
    <input type="range" v-model.number="dynamicBrightness" min="0" max="1" step="0.1" />
    <MathJax :formula="formula" />
    <lineChart :initial-data="[0, 1, 2, 1, 0]" :add-point-interval="10000" ref="lineChartRef" />
    <button @click="addManualPoint">手动添加点</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import lineChart from '@/components/lineChart'
import MathJax from '@/components/MathJax'
import uvLight from '@/components/uvLight'
const formula = ref('$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$')
// 使用ref确保响应性
const dynamicSize = ref(40)
const dynamicBrightness = ref(0.5)
const lineChartRef = ref<InstanceType<typeof lineChart> | null>(null)
const addManualPoint = () => {
  // 实际项目中可通过 ref 调用子组件方法
  // 例如：chartRef.value?.addDataPoint(Math.random(), '手动添加');
  lineChartRef.value?.addDataPoint(3, '手动添加')
}
</script>

<style scoped lang="less">
@primary-color: #3498db;

.home {
  > h1 {
    color: @primary-color;
  }
}
</style>
