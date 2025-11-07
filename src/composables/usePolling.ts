/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { onUnmounted, type Ref, ref } from 'vue'

export function usePolling(
  fetchFn: () => Promise<any>,
  interval = 3000, // 间隔多久轮询一次
  maxDuration = 30 * 60 * 1000, // 默认30分钟
) {
  const data: Ref<any> = ref(null) // 轮询接口返回的数据
  const error: Ref<any> = ref(null) // 轮询接口返回的错误信息
  const isPolling: Ref<boolean> = ref(false) // 是否正在轮询
  let timer: number | null = null // 定时器
  let startTime = 0 // 记录轮询开始时间

  const poll = async () => {
    const now = Date.now()
    // 检查是否超时
    if (now - startTime >= maxDuration) {
      stop()
      return
    }
    try {
      const res = await fetchFn()
      data.value = res.data
    } catch (err) {
      error.value = err
    }
    // 继续下一次轮询
    if (isPolling.value) {
      timer = window.setTimeout(poll, interval)
    }
  }

  const start = () => {
    if (isPolling.value) return
    isPolling.value = true
    startTime = Date.now() // 记录开始时间
    timer = window.setTimeout(poll, interval) // 第一次延迟执行
  }

  const stop = () => {
    isPolling.value = false
    if (timer) clearTimeout(timer)
    timer = null
  }

  onUnmounted(() => {
    stop()
  })

  return {
    data,
    error,
    isPolling,
    start,
    stop,
  }
}
