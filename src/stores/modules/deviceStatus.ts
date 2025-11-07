/**
 * 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
 * 本软件受商业机密法和版权法保护。
 * 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
 * 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStatusStore = defineStore(
  'deviceStatus',
  () => {
    // 仪器名称
    const deviceName = ref('')
    function setDeviceName(name: string) {
      deviceName.value = name
    }
    // 仪器型号
    const deviceModel = ref('')
    function setDeviceModel(model: string) {
      deviceModel.value = model
    }
    // 仪器序列号
    const deviceSerialNumber = ref(localStorage.getItem('deviceSerialNumber') || '')
    function setDeviceSerialNumber(number: string) {
      deviceSerialNumber.value = number
      localStorage.setItem('deviceSerialNumber', number)
    }

    // 仪器初始化状态 0：未完成；1：成功； 2：失败； 3：进行中  4：已停止
    const isInited = ref<any>(localStorage.getItem('isInited') || 0)
    function setIsInited(value: any) {
      isInited.value = value
      localStorage.setItem('isInited', value)
    }

    // 仪器灯
    const lightList = ref([])
    function setLightList(value: any) {
      lightList.value = value
    }

    // 附件类型
    const attachmentType = ref({
      totalPoolNum: 0, // 数量：1固定池 8八联池 5五联池 4流动池 5积分球
      attachmentKind: 0, // 类型：1固定池 2八联池 3五联池 4流动池 5积分球
      attachmentName: '', // 未识别...
    })
    function setAttachmentType(value: {
      totalPoolNum: number
      attachmentName: string
      attachmentKind: number
    }) {
      attachmentType.value = value
    }

    // 电源状态
    const isDevOpened = ref(0) // 0:未开机 1:已开机 3:软关机
    function setIsDevOpened(value: any) {
      isDevOpened.value = value
    }

    // 激活状态
    const isActivated = ref(0) // 0:未激活 1:已激活
    function setIsActivated(value: any) {
      isActivated.value = value
    }

    // 方法参数范围
    const methodsParamsRange = ref<any>({})
    function setMethodsParamsRange(value: any) {
      methodsParamsRange.value = value
    }

    function resetAll() {
      setDeviceSerialNumber('')
      setIsInited('')
      setLightList([])
      setAttachmentType({ totalPoolNum: 0, attachmentName: '', attachmentKind: 0 })
      setIsDevOpened('')
      setMethodsParamsRange({})
      localStorage.clear()
    }

    return {
      deviceName,
      setDeviceName,
      deviceModel,
      setDeviceModel,
      deviceSerialNumber,
      setDeviceSerialNumber,
      isInited,
      setIsInited,
      lightList,
      setLightList,
      attachmentType,
      setAttachmentType,
      isDevOpened,
      setIsDevOpened,
      isActivated,
      setIsActivated,
      methodsParamsRange,
      setMethodsParamsRange,
      resetAll,
    }
  },
  {
    persist: true,
  },
)
