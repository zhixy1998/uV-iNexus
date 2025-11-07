/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { notification } from 'ant-design-vue'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { useLoadingStore, useUserStore } from '@/stores'

import router from '../router'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
    message: string
    data: T
  }
}

// 响应数据根据不同状态码进行不同处理
const handleData = async (response: AxiosResponse) => {
  const userStore = useUserStore()
  const { data, status } = response
  const contentType = response.headers['content-type']
  if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return response
  } else {
    const code = data?.code ?? status
    const message = data?.message ?? ''
    switch (code) {
      case 200:
        return response.data
      case 201:
        notification.error({
          message: '错误！',
          description: message || '失败',
        })
        return Promise.reject(new Error(message || '失败'))
      case 401:
        userStore.resetAll()
        router.replace(`/login`)
        notification.error({
          message: '错误！',
          description: message || '验证失败，请重新登录',
        })
        return Promise.reject(new Error(message || '失败'))
      default:
        notification.error({
          message: '未知错误',
          description: `状态码：${code}`,
        })
        return Promise.reject(new Error(`未知错误，状态码：${code}`))
    }
  }
}

// 添加请求拦截器
export const setupInterceptors = (axios: AxiosInstance) => {
  // 请求拦截器
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const userStore = useUserStore()
      const loadingStore = useLoadingStore()
      if (!(config as any).noLoading) {
        loadingStore.startLoading()
      }
      config.responseType = config.data?.responseType || config.responseType || 'json'
      if (config.url?.startsWith('/template') || config.url?.startsWith('/classic_template')) {
        // config.baseURL = 'http://192.168.51.38:8003/'
        if (config.url?.startsWith('/template') || config.url?.startsWith('/classic_template')) {
          config.baseURL = import.meta.env.VITE_AXIOS_TEMPLATE_URL
        }
      }
      if (userStore.token) {
        config.headers = config.headers || {}
        config.headers.token = `${userStore.token}`
        if (config.method === 'post') {
          // 初始化 data 对象，防止其为 undefined
          if (!config.data) {
            config.data = {}
          }
          if (!config.data?.noToken) {
            config.data.updateBy = `${userStore.userName}`
            config.data.deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''
          } else if (config.data?.data) {
            config.data = config.data.data
          } else if (config.data.noToken) {
            delete config.data.noToken
          }
        } else if (config.method === 'get') {
          // 初始化 params 对象，防止其为 undefined
          if (!config.params) {
            config.params = {}
          }
          // console.log(config, 'config')
          if (!config.data?.noToken) {
            config.params.updateBy = `${userStore.userName}`
            config.params.deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''
          }
        }
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )

  // 响应拦截器
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const loadingStore = useLoadingStore()
      if (!(response.config as any).noLoading) {
        loadingStore.finishLoading()
      }
      return handleData(response)
    },
    (error: AxiosError) => {
      if (error.code === 'ERR_NETWORK') {
        notification.error({
          message: '网络错误',
          description: '无法连接到服务器，请检查网络连接',
        })
      } else {
        notification.error({
          message: error.code,
          description: error.message,
        })
      }

      const loadingStore = useLoadingStore()
      loadingStore.finishLoading()
      console.error('Response error:', error)
      return Promise.reject(error)
    },
  )
}
