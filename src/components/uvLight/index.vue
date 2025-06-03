<template>
  <div class="light-bulb-container" :style="containerStyle">
    <!-- 灯泡 -->
    <div class="light-bulb" :style="bulbStyle"></div>

    <!-- 灯泡底座 -->
    <div class="bulb-base" :style="baseStyle"></div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 24,
    validator: (value: number) => value > 0,
  },
  brightness: {
    type: Number,
    default: 0.7,
    validator: (value: number) => value >= 0 && value <= 1,
  },
  color: {
    type: String,
    default: '#ffeb3b',
  },
  baseColor: {
    type: String,
    default: '#616161',
  },
})

// 确保所有计算属性都深度依赖props
const containerStyle = computed<CSSProperties>(() => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${props.size}px`,
    height: `${props.size * 1.3}px`,
    position: 'relative',
  }
})

const bulbStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    borderRadius: '50%',
    background: `radial-gradient(circle at 30% 30%, #fff, ${props.color} ${props.brightness * 100}%)`,
    boxShadow: `0 0 ${props.size * 0.3}px ${props.size * 0.1}px rgba(${hexToRgb(props.color)}, ${props.brightness})`,
    transition: 'all 0.2s ease-out',
  }
})

const baseStyle = computed<CSSProperties>(() => {
  return {
    width: `${props.size * 0.6}px`,
    height: `${props.size * 0.2}px`,
    backgroundColor: props.baseColor,
    borderRadius: '0 0 3px 3px',
    position: 'absolute',
    bottom: '0',
  }
})

// 辅助函数：将十六进制颜色转为RGB格式
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}
</script>

<style scoped>
.light-bulb-container {
  line-height: 1;
}
</style>
