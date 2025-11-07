/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import axios, { type AxiosInstance } from 'axios'

import { setupInterceptors } from './interceptors'

export function createAxios(options = {}): AxiosInstance {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    timeout: 120000,
    // 新增：配置需要视为成功的状态码（包含200和201）
    validateStatus: (status: number) => {
      // 保持原有逻辑的同时，添加对201状态码的支持
      return status === 200 || status === 201
    },
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  setupInterceptors(service)
  return service
}

export const request = createAxios()
