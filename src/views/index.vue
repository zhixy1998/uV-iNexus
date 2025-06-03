<template>
  <div>
    <DynamicLineChart
      :initial-data="[0, 1, 2, 1, 0]"
      :add-point-interval="500"
    />
    <button @click="addManualPoint">手动添加点</button>
  </div>
</template>

<script setup lang="ts">
import DynamicLineChart from './DynamicLineChart.vue';
import { ref } from 'vue';

const addManualPoint = () => {
  // 实际项目中可通过 ref 调用子组件方法
  chartRef.value?.addDataPoint(Math.random(), '手动添加');
  // 例如：chartRef.value?.addDataPoint(Math.random(), '手动添加');
};
</script>
