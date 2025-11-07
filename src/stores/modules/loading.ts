/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

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
