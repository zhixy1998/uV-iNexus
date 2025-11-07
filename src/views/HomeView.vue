<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="home">
    <!-- 动态控制 -->
    <uvLight :size="dynamicSize" :brightness="dynamicBrightness" />
    <input type="range" v-model.number="dynamicSize" min="16" max="100" />
    <input type="range" v-model.number="dynamicBrightness" min="0" max="1" step="0.1" />
    <MathJax :formula="formula" />
    <lineChart ref="lineChartRef" />
    <math-field v-model="formula" style="width: 375px" @input="mathFieldChange"
      >x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}</math-field
    >
    <p id="math" style="height: 50px"></p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import lineChart from '@/components/lineChart/index.vue'
import MathJax from '@/components/MathJax/index.vue'
import uvLight from '@/components/uvLight/index.vue'
const formula = ref('$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$')
import axios from 'axios'
// const formula = ref('$$ x=\frac{-bpmsqrt{b^2-4ac}}{2a} $$')
// 使用ref确保响应性
const dynamicSize = ref(40)
const dynamicBrightness = ref(0.5)
const lineChartRef = ref<InstanceType<typeof lineChart> | null>(null)
const mathFieldChange = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value
  const escapedValue = inputValue.replace(/\\/g, '\\\\')
  console.log(escapedValue)
  // 包裹公式分隔符
  formula.value = inputValue
  // '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
}
const ip = ref('')

const fetchIP = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json')
    ip.value = response.data.ip
  } catch (error) {
    console.error('获取IP失败:', error)
    ip.value = '获取失败'
  }
}
onMounted(() => {
  fetchIP()
})
</script>

<style scoped lang="less">
@primary-color: #3498db;

.home {
  > h1 {
    color: @primary-color;
  }
}
</style>
