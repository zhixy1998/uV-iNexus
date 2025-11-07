<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<!-- <math-field v-model="equation" style="width: 375px" @input="mathFieldChange"></math-field> -->

<!-- <script setup lang="ts">
import uv3DLineChart from '@/components/uv3DLineChart/index.vue'

const l1 = 2
const l2 = 5
const l3 = 8

const seriesData = ref([
  {
    name: 'Line 1',
    data: [
      { x: 0, y: l1, z: 2 },
      { x: 1, y: l1, z: 1 },
      { x: 2, y: l1, z: 3 },
      { x: 3, y: l1, z: 4 },
      { x: 4, y: l1, z: 2 },
      { x: 5, y: l1, z: 4 },
      { x: 6, y: l1, z: 1 },
      { x: 7, y: l1, z: 3 },
      { x: 8, y: l1, z: 4 },
      { x: 9, y: l1, z: 1 },
      { x: 10, y: l1, z: 2 },
    ],
    color: '#4fd2dd',
    lineWidth: 4,
  },
  {
    name: 'Line 2',
    data: [
      { x: 0, y: l2, z: 2 },
      { x: 1, y: l2, z: 3 },
      { x: 2, y: l2, z: 5 },
      { x: 3, y: l2, z: 3 },
      { x: 4, y: l2, z: 5 },
      { x: 5, y: l2, z: 3 },
      { x: 6, y: l2, z: 3 },
      { x: 7, y: l2, z: 5 },
      { x: 8, y: l2, z: 6 },
      { x: 9, y: l2, z: 2 },
      { x: 10, y: l2, z: 1 },
    ],
    color: '#7382ff',
    lineWidth: 4,
  },
  {
    name: 'Line 3',
    data: [
      { x: 0, y: l3, z: 4 },
      { x: 1, y: l3, z: 6 },
      { x: 2, y: l3, z: 5 },
      { x: 3, y: l3, z: 7 },
      { x: 4, y: l3, z: 4 },
      { x: 5, y: l3, z: 8 },
      { x: 6, y: l3, z: 6 },
      { x: 7, y: l3, z: 8 },
      { x: 8, y: l3, z: 6 },
      { x: 9, y: l3, z: 5 },
      { x: 10, y: l3, z: 1 },
    ],
    color: '#a35bff',
    lineWidth: 4,
  },
])

const changeBackground = () => {
  // 可以动态改变背景色
  seriesData.value[0].color = '#ff6b81'
}
</script>

<template>
  <div class="chart-container">
    <button @click="changeBackground">改变线条颜色</button>
    <uv3DLineChart :series="seriesData" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #3a7bd5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> -->
<template>
  <div class="math-input-demo">
    <h2>Math Input Component</h2>

    <div class="preview">
      <h3>Current Equation:</h3>
      <MathJax :formula="`$$${equation}$$`" />
    </div>
    <uvMathAliveField v-model:latex="equation"></uvMathAliveField>
    <uvOffice :file-url="'/preview.docx'" />
    <div style="height: 400px">
      <uv3DPieChart :data="chartData" />
    </div>
    <uvLinesChart
      :lines="chartLines"
      :mark-select="['波峰', '波谷', '标记点']"
      :show-mark="true"
      style="height: 400px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import MathJax from '@/components/MathJax/index.vue'
export default defineComponent({
  name: 'App',
  components: {
    MathJax,
  },
  setup() {
    const equation = ref('E=mc^2')
    const mathInputRef = ref<any>(null)

    const handleSubmit = () => {
      console.log('Submitted equation:', equation.value)
      alert(`Submitted equation: ${equation.value}`)
    }

    const mathFieldChange = (event: Event) => {
      const inputValue = (event.target as HTMLInputElement).value
      // 包裹公式分隔符
      equation.value = inputValue
      // '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
    }
    const chartData = [
      {
        name: '项目1',
        value: 31,
        proportion: '5.12',
        itemStyle: { color: '#5470c6' },
      },
      {
        name: '项目2',
        value: 70,
        proportion: '11.12',
        itemStyle: { color: '#91cc75' },
      },
      {
        name: '项目3',
        value: 13,
        proportion: '2.15',
        itemStyle: { color: '#fac858' },
      },
      {
        name: '项目4',
        value: 48,
        proportion: '79.50',
        itemStyle: { color: '#ee6666' },
      },
      {
        name: '项目5',
        value: 3,
        proportion: '0.12',
        itemStyle: { color: '#73c0de' },
      },
    ]
    const chartLines = ref([
      {
        name: '线1',
        color: '#0038a8',
        data: [
          { x: 1, y: 100, marked: 1, feng: 0, gu: 0 },
          { x: 2, y: 200, marked: 0, feng: 1, gu: 0 },
          { x: 3, y: 150, marked: 0, feng: 0, gu: 1 },
        ],
      },
      {
        name: '线2',
        color: '#FF0000',
        data: [
          { x: 1, y: 50, marked: 0, feng: 1, gu: 0 },
          { x: 2, y: 80, marked: 1, feng: 0, gu: 0 },
          { x: 3, y: 30, marked: 0, feng: 0, gu: 1 },
        ],
      },
    ])
    return {
      equation,
      mathInputRef,
      handleSubmit,
      mathFieldChange,
      chartData,
      chartLines,
    }
  },
})
</script>

<style>
.math-input {
  font-size: 16px;
  margin-bottom: 16px;
}

.controls {
  margin-top: 16px;
}

.controls button {
  margin-right: 8px;
}

.preview {
  margin-top: 24px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
