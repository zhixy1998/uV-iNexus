/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// composables/useWebSocket.ts
import { ref, onMounted, onUnmounted } from 'vue'
import WebSocketClient from '@/utils/websocket-client'

const useWebSocket = (config: any = {}) => {
  const isConnected = ref(false)
  const messages = ref<any[]>([])
  const wsClient = new WebSocketClient(config)

  // 添加心跳检测相关变量
  let heartbeatTimer: number | null = null // 检测消息超时的定时器
  let reconnectTimer: number | null = null // 控制重连时机的定时器
  const heartbeatInterval = 6000 // 6s无消息则重连

  const connect = async (headers?: Record<string, string>) => {
    try {
      await wsClient.connect(headers)
      isConnected.value = true
      // 连接成功后重置心跳定时器
      resetHeartbeat()
    } catch (error) {
      console.error('连接失败:', error)
    }
  }

  const disconnect = async () => {
    clearTimers()
    await wsClient.disconnect()
    isConnected.value = false
  }

  const sendMessage = (destination: string, message: any) => {
    if (wsClient.connected) {
      wsClient.sendJson(destination, message)
      // 发送消息后重置心跳
      resetHeartbeat()
    }
  }

  // 重置心跳定时器
  const resetHeartbeat = () => {
    if (heartbeatTimer) {
      clearTimeout(heartbeatTimer)
    }

    heartbeatTimer = window.setTimeout(() => {
      console.warn('6s内未收到消息，准备重连...')
      handleReconnect()
    }, heartbeatInterval)
  }

  //  处理重连逻辑
  const handleReconnect = async () => {
    try {
      await disconnect()
      // 延迟一段时间后再重连，避免过于频繁的重连尝试
      if (reconnectTimer) clearTimeout(reconnectTimer)
      reconnectTimer = window.setTimeout(async () => {
        await connect()
      }, 1000)
    } catch (error) {
      console.error('重连失败:', error)
    }
  }

  // 清除所有定时器
  const clearTimers = () => {
    if (heartbeatTimer) {
      clearTimeout(heartbeatTimer)
      heartbeatTimer = null
    }
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  }

  const subscribe = (
    destination: string,
    callback: (message: any) => void,
    headers?: Record<string, string>,
  ) => {
    console.log('订阅主题:', destination)
    return wsClient.subscribe(
      destination,
      (message) => {
        try {
          // 收到消息后重置心跳定时器
          resetHeartbeat()
          const data = !message.body.includes('开始测量') ? JSON.parse(message.body) : ''
          callback(data)
        } catch (error) {
          console.error('解析消息失败:', error)
        }
      },
      headers || {},
    )
  }

  // 存储订阅信息
  const subscriptions: { destination: string; callback: (message: any) => void }[] = []
  // 添加订阅的方法
  const addSubscription = (destination: string, callback: (message: any) => void) => {
    // 保存订阅信息以便重连后重新订阅
    subscriptions.push({ destination, callback })
    // 如果已经连接，则立即订阅
    if (isConnected.value) {
      return subscribe(destination, callback)
    }
  }

  // 在连接状态变化时处理订阅
  watch(isConnected, (newVal) => {
    if (newVal) {
      // 连接恢复后重新订阅所有主题
      subscriptions.forEach(({ destination, callback }) => {
        subscribe(destination, callback)
      })
    }
  })

  // 组件卸载时自动断开连接
  onUnmounted(() => {
    clearTimers()
    // console.log('组件卸载时自动断开连接')
    // disconnect()
  })

  return {
    isConnected,
    messages,
    connect,
    disconnect,
    sendMessage,
    subscribe,
    handleReconnect,
    addSubscription,
  }
}

export default useWebSocket
