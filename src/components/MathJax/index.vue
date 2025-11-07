<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <span v-if="loaded">
    <span ref="mathjaxElement" v-html="formula"></span>
  </span>
  <div v-else>Loading math renderer...</div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
  formula: {
    type: String,
    default: '',
  },
})

watch(
  () => props.formula,
  (newVal) => {
    nextTick(() => {
      window.MathJax.typesetPromise([mathjaxElement.value]).then(() => {
        loaded.value = true
      })
    })
  },
)
const loaded = ref(false)
const mathjaxElement = ref(null)

onMounted(() => {
  if (window.MathJax) {
    loaded.value = true
    nextTick().then(() => {
      window.MathJax.typesetPromise([mathjaxElement.value])
    })
    return
  }
})
</script>
<style scoped lang="less">
:deep(.MathJax) {
  display: inline-block !important;
  font-size: 14px !important;
  margin: 0 !important;
}
</style>
