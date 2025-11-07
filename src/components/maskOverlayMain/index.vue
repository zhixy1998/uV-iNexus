<template>
  <div class="mask-overlay" v-if="visible">
    <div class="mask-content">
      <div class="loading-container">
        <div class="moving-bars">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
        </div>
      </div>
      <p class="loading-text">测量中</p>
      <a-button type="primary" @click="handleStop"> 停止 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emits {
  (e: 'stop'): void
}

const props = defineProps({
  visible: {
    type: Boolean,
    required: false,
  },
  showStopButton: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits<Emits>()

const handleStop = () => {
  emit('stop')
}
</script>

<style scoped>
.mask-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.mask-content {
  text-align: center;
  color: white;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
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
  font-size: 18px;
  margin-bottom: 10px;
  color: #666;
}
</style>
