import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { useLoadingStore } from '@/stores'
const loadingStore = useLoadingStore()
// 添加请求拦截器
export const setupInterceptors = (axios: AxiosInstance) => {
  const reqResolve = (config: InternalAxiosRequestConfig) => {
    // TODO: 在请求之间添加token
    loadingStore.startLoading()
    return config
  }
  const reqReject = (error: AxiosError) => {
    return Promise.reject(error)
  }
  const resResolve = (response: AxiosResponse) => {
    loadingStore.finishLoading()
    return response
  }
  const resReject = (error: AxiosError) => {
    console.error('Response error:', error)
    loadingStore.finishLoading()
  }
  // 请求拦截器
  axios.interceptors.request.use(reqResolve, reqReject)

  // 添加响应拦截器
  axios.interceptors.response.use(resResolve, resReject)
}
