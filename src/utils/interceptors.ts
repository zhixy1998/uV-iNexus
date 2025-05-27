import { useLoadingStore } from '@/stores'
import type { AxiosInstance } from 'axios'
const loadingStore = useLoadingStore()
// 添加请求拦截器
export const setupInterceptors = (axios: AxiosInstance) => {
  const reqResolve = (config) => {
    // TODO: 在请求之间添加token
    loadingStore.startLoading()
    return config
  }
  const reqReject = (error) => {
    return Promise.reject(error)
  }
  const resResolve = (response) => {
    loadingStore.finishLoading()
    return response
  }
  const resReject = (error) => {
    loadingStore.finishLoading()
  }
  // 请求拦截器
  axios.interceptors.request.use(reqResolve, reqReject)

  // 添加响应拦截器
  axios.interceptors.response.use(resResolve, resReject)
}
