<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="custom-mask-wrapper" :class="{ 'mask-active': spinning }">
    <slot></slot>
    <div v-if="spinning" class="custom-mask-overlay">
      <div class="mask-content">
        <div class="loading-container">
          <div class="moving-bars">
            <div class="bar bar-1"></div>
            <div class="bar bar-2"></div>
            <div class="bar bar-3"></div>
            <div class="bar bar-4"></div>
          </div>
        </div>
        <p class="loading-text">{{ tip || '加载中' }}</p>
        <a-button
          v-if="showStopButton"
          type="primary"
          class="!mt-2 !z-99999"
          @click="handleStop"
          style="pointer-events: auto"
        >
          停止
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  spinning: boolean
  tip?: string
  showStopButton?: boolean
}

interface Emits {
  (e: 'stop'): void
}

const props = withDefaults(defineProps<Props>(), {
  spinning: false,
  tip: '加载中',
  showStopButton: false,
})
const emit = defineEmits<Emits>()
const handleStop = () => {
  emit('stop')
}
</script>

<style scoped>
.custom-mask-wrapper {
  position: relative;
}

.mask-active {
  pointer-events: none;
}

.custom-mask-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-radius: 4px;
}

.mask-content {
  text-align: center;
  color: #333;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.moving-bars {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 40px;
}

.bar {
  width: 8px;
  height: 30px;
  border-radius: 4px;
  animation: walkAnimation 1.2s infinite ease-in-out;
}

.bar-1 {
  background-color: #ff6b6b;
  animation-delay: 0s;
}

.bar-2 {
  background-color: #4ecdc4;
  animation-delay: 0.1s;
}

.bar-3 {
  background-color: #45b7d1;
  animation-delay: 0.2s;
}

.bar-4 {
  background-color: #f9ca24;
  animation-delay: 0.3s;
}

@keyframes walkAnimation {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}

.loading-text {
  font-size: 14px;
  margin: 0;
  color: #666;
}
</style>
