/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// websocket-client.ts
import { Client, type StompSubscription, type IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

interface WebSocketConfig {
  url: string
  reconnectDelay?: number
  heartbeatIncoming?: number
  heartbeatOutgoing?: number
  debug?: boolean
}

class WebSocketClient {
  private client: Client | null = null
  private subscriptions: Map<string, StompSubscription> = new Map()
  private config: WebSocketConfig
  private isConnected: boolean = false

  constructor(config?: WebSocketConfig) {
    this.config = {
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: false,
      url: import.meta.env.VITE_AXIOS_BASE_URL + 'ws',
      ...config,
    }
  }

  /**
   * 建立连接
   */
  connect(headers?: Record<string, string>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve()
        return
      }

      // 使用SockJS作为传输层
      this.client = new Client({
        webSocketFactory: () => new SockJS(this.config.url),
        connectHeaders: headers || {},
        debug: this.config.debug ? (str) => console.log(new Date(), str) : () => {},
        reconnectDelay: this.config.reconnectDelay,
        heartbeatIncoming: this.config.heartbeatIncoming,
        heartbeatOutgoing: this.config.heartbeatOutgoing,

        onConnect: () => {
          this.isConnected = true
          console.log('WebSocket连接成功')
          resolve()
        },

        onDisconnect: () => {
          this.isConnected = false
          console.log('WebSocket断开连接')
        },

        onStompError: (frame) => {
          console.error('STOMP错误:', frame)
          reject(new Error(`STOMP错误: ${frame.headers.message}`))
        },

        onWebSocketError: (event) => {
          console.error('WebSocket错误:', event)
          reject(new Error('WebSocket连接错误'))
        },
      })

      this.client.activate()
    })
  }

  /**
   * 断开连接
   */
  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.client) {
        // 取消所有订阅
        this.subscriptions.forEach((subscription) => {
          subscription.unsubscribe()
        })
        this.subscriptions.clear()

        this.client.deactivate()
        this.isConnected = false
      }
      resolve()
    })
  }

  /**
   * 订阅主题
   */
  subscribe(
    destination: string,
    callback: (message: IMessage) => void,
    headers?: Record<string, string>,
  ): string {
    if (!this.client || !this.isConnected) {
      throw new Error('WebSocket未连接')
    }

    const subscription = this.client.subscribe(
      destination,
      (message) => {
        console.log(`收到消息: ${message.body}`)
        callback(message)
      },
      headers || {},
    )
    const subscriptionId = subscription.id
    this.subscriptions.set(subscriptionId, subscription)

    return subscriptionId
  }

  /**
   * 取消订阅
   */
  unsubscribe(subscriptionId: string): boolean {
    const subscription = this.subscriptions.get(subscriptionId)
    if (subscription) {
      subscription.unsubscribe()
      this.subscriptions.delete(subscriptionId)
      return true
    }
    return false
  }

  /**
   * 发送消息
   */
  send(destination: string, body: string, headers?: Record<string, string>): void {
    if (!this.client || !this.isConnected) {
      throw new Error('WebSocket未连接')
    }

    this.client.publish({
      destination,
      body,
      headers,
    })
  }

  /**
   * 发送JSON对象
   */
  sendJson(destination: string, body: any, headers?: Record<string, string>): void {
    this.send(destination, JSON.stringify(body), {
      'content-type': 'application/json',
      ...headers,
    })
  }

  /**
   * 获取连接状态
   */
  get connected(): boolean {
    return this.isConnected
  }
}

export default WebSocketClient
