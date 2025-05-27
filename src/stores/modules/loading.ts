import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const requestCount = ref(0)

  const startLoading = () => {
    requestCount.value++
    isLoading.value = true
  }

  const finishLoading = () => {
    requestCount.value--
    if (requestCount.value <= 0) {
      isLoading.value = false
      requestCount.value = 0
    }
  }

  return { isLoading, requestCount, startLoading, finishLoading }
})
