/**
 * 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
 * 本软件受商业机密法和版权法保护。
 * 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
 * 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
 */

import { conciseQueryDeviceTypeInfo } from '@/api'

export async function useMethodsParamsRange() {
  const deviceStatusStore = useDeviceStatusStore()
  const { code, data } = await conciseQueryDeviceTypeInfo()
  if (code === 200) {
    deviceStatusStore.setMethodsParamsRange({
      ...data,
      bandWidth:
        data.bandWidth && data.bandWidth.length
          ? data.bandWidth.map((item: any) => ({
              paramName: item,
              paramValue: item,
            }))
          : [],
      responseTime:
        data.responseTime && data.responseTime.length
          ? data.responseTime.map((item: any) => ({
              paramName: item,
              paramValue: item,
            }))
          : [],
      gain:
        data.gain && data.gain.length
          ? data.gain.map((item: any) => ({
              paramName: item,
              paramValue: item,
            }))
          : [],
      scanInterval:
        data.scanInterval && data.scanInterval.length
          ? data.scanInterval.map((item: any) => ({
              paramName: item,
              paramValue: item,
            }))
          : [],
    })
  }
}
