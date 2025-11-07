/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { notification } from 'ant-design-vue'
type WebSocketCallbacks = {
  onOpen?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
  onMessage?: (event: MessageEvent) => void
}
class WebSocketService {
  private socket: WebSocket | null = null
  private reconnectAttempts: number = 0 // 重连尝试次数
  private maxReconnectAttempts: number = 5 // 最大重连次数
  private reconnectInterval: number = 3000 // 重连间隔
  private enableReconnect: boolean = false //添加重连开关
  private callbacks: WebSocketCallbacks = {}
  private url: string = ''
  private currentParams: Record<string, any> = {}
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null
  private lastMessageTime: number = 0
  private heartbeatInterval: number = 300000 // 30秒心跳间隔

  constructor(baseUrl?: string) {
    this.url = baseUrl
      ? import.meta.env.VITE_AXIOS_BASE_URL + baseUrl
      : import.meta.env.VITE_AXIOS_BASE_URL +
        'com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/ws-data'
  }
  /**
   * 更新基础URL
   */
  setBaseUrl(url: string): void {
    this.url = import.meta.env.VITE_AXIOS_BASE_URL + url
  }

  /**
   * 更新请求参数
   */
  setParams(params: Record<string, any>): void {
    this.currentParams = params
  }
  // 添加设置重连开关的方法
  setReconnectEnabled(enabled: boolean): void {
    this.enableReconnect = enabled
  }
  // 在连接成功后启动心跳检测
  private startHeartbeat() {
    this.lastMessageTime = Date.now()

    this.heartbeatTimer = setInterval(() => {
      const now = Date.now()
      const timeSinceLastMessage = now - this.lastMessageTime

      // 如果超过60秒没有收到消息，认为连接可能有问题
      if (timeSinceLastMessage > 60000) {
        // 可以在这里触发重连或其他处理
        notification.error({
          message: '错误！',
          description: '长时间未收到WebSocke消息，连接异常',
        })
        this.close()
      }
    }, this.heartbeatInterval)
  }
  // 停止心跳检测
  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  connect(params: Record<string, any> = {}, enableReconnect: boolean = false): void {
    // this.url = this.url + url
    this.enableReconnect = enableReconnect
    const queryString = new URLSearchParams({ ...this.currentParams, ...params }).toString()
    const fullUrl = queryString ? `${this.url}?${queryString}` : this.url
    this.socket = new WebSocket(fullUrl)

    this.socket.onopen = (event) => {
      this.reconnectAttempts = 0
      // 添加心跳检测机制
      this.startHeartbeat()
      if (this.callbacks.onOpen) {
        this.callbacks.onOpen(event)
      }
    }

    this.socket.onclose = (event) => {
      // 停止心跳检测
      this.stopHeartbeat()
      if (this.callbacks.onClose) {
        this.callbacks.onClose(event)
      }
      // 启动重连机制
      this.handleReconnect()
    }

    this.socket.onerror = (event) => {
      console.log(event, 'onError')
      if (this.callbacks.onError) {
        this.callbacks.onError(event)
      }
    }

    this.socket.onmessage = (event) => {
      this.lastMessageTime = Date.now() // 更新最后消息时间
      if (this.callbacks.onMessage) {
        this.callbacks.onMessage(event)
      }
    }
  }

  private handleReconnect(): void {
    if (this.enableReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`尝试重新连接... 第 ${this.reconnectAttempts} 次`)
        this.connect()
      }, this.reconnectInterval)
    }
  }

  setCallbacks(callbacks: WebSocketCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  send(data: string | ArrayBuffer | Blob | ArrayBufferView): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data)
    } else {
      console.error('WebSocket 连接未就绪')
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  getReadyState(): number | null {
    return this.socket ? this.socket.readyState : null
  }
}
const webSocketService = new WebSocketService()
export default webSocketService
