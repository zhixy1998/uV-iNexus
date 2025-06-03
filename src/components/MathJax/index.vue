<template>
  <div v-if="loaded">
    <div ref="mathjaxElement" v-html="formula"></div>
  </div>
  <div v-else>Loading math renderer...</div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const props = defineProps({
  formula: {
    type: String,
    default: '',
  },
})

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

  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
  script.onload = () => {
    loaded.value = true
    window.MathJax.typesetPromise([mathjaxElement.value])
  }
  document.head.appendChild(script)
})
</script>
