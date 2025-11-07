/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// src/hooks/useZeroCalibration.ts
import { message, Modal, Radio, RadioGroup } from 'ant-design-vue'

import {
  applyMethod,
  applyMethodTime,
  conciseQueryDefaultParameters,
  createDraftButtonTime,
  createDraftButton,
  querySaveState,
  whetherSaveData,
  parameterValidation,
  reportDocsDownlodad,
  isHasNotMeasureSample,
  queryDeviceStatus,
  conciseQueryDeviceTypeInfo,
} from '@/api'
import { saveDraftButton } from '@/api/simpleMode'
import { useDownloadFile } from '@/composables/useDownloadFile.ts'

interface UseZeroCalibrationOptions {
  methodId: string
}

export const useSaveDraftButton = async (taskId: string, isSaveAuto: boolean = false) => {
  if (!taskId) return
  const { data, code } = await saveDraftButton({
    taskId,
  })
  if (code === 200) {
    if (!isSaveAuto) {
      message.success('保存成功！')
      await useQuerySaveState(taskId)
    }
  }
}
const nameObj = ref({
  methodName: '',
  taskName: '',
  saveStatus: false,
})
const quickModeStore = useQuickModeStore()
export const useQuerySaveState = async (taskId: string) => {
  if (!taskId) return
  const { code, data } = await querySaveState({
    taskId: taskId,
  })
  if (code === 200) {
    if (data) {
      nameObj.value.saveStatus = data.saveState
      nameObj.value.taskName = data.taskName
      nameObj.value.methodName = data.methodName
    } else {
      nameObj.value.saveStatus = false
      nameObj.value.taskName = ''
      nameObj.value.methodName = ''
    }
    quickModeStore.setQuickModeObj(nameObj.value)
  }
}

const methodIdQuickMode = ref('')
const methodIdHistoryId = ref('') //历史的方法Id
const taskIdQuickMode = ref('')
const methodParams = ref<Record<string, any>>({})
const dateBaseType = ref('')
const measureValue = ref('')
type MethodsOrTask = 'methods' | 'task'
const showCustomModal = (methodsOrTask: MethodsOrTask): Promise<void> => {
  return new Promise((resolve) => {
    const operate = ref('1')
    Modal.confirm({
      title: '提示',
      content: () =>
        h('div', [
          h('div', { class: '!mb-2 !text-[14px]' }, '当前有未保存的结果数据，您希望'),
          h(
            RadioGroup,
            {
              value: operate.value,
              onChange: (e: any) => {
                operate.value = e.target.value
              },
            },
            [
              h(Radio, { value: '1', class: '!text-[14px]' }, '先保存已有数据再应用方法生成新数据'),
              h(Radio, { value: '0', class: '!text-[14px]' }, '放弃数据后应用方法生成新数据'),
            ],
          ),
        ]),
      onOk: async () => {
        // 处理确认逻辑
        // handleConfirm(operate.value)
        await saveModalConfirm(operate.value, methodsOrTask)
        resolve()
      },
      onCancel: async () => {
        // debugger
        // // 处理取消逻辑
        // if (methodsOrTask === 'methods') {
        //   await useApplyMethods()
        // } else {
        //   await useCreateDraftButton()
        // }
        resolve()
      },
      okText: '确定', // 自定义确定按钮文字
      cancelText: '取消',
    })
  })
}
const saveModalConfirm = async (type: string, methodsOrTask: MethodsOrTask) => {
  const { code, data } = await whetherSaveData({
    taskId: taskIdQuickMode.value,
    isSave: type === '1',
  })
  if (code === 200) {
    if (methodsOrTask === 'methods') {
      await useApplyMethods()
    } else {
      await useCreateDraftButton()
    }
  }
}
const appStore = useAppStore()
export const useApplyMethods = async ({
  methodId,
  methodId2,
  measureType,
  params,
  taskId,
  type,
}: {
  methodId?: string
  measureType?: string
  params?: any
  taskId?: string
  type?: string
  methodId2?: string
} = {}) => {
  let apiFun: any
  switch (measureType || measureValue.value) {
    case '光谱扫描':
      apiFun = applyMethod
      break
    case '时间扫描':
      apiFun = applyMethodTime
      break
    default:
      break
  }
  const paramsObject: Record<string, any> = {
    methodId: methodId || methodIdQuickMode.value,
    measureType: measureType || measureValue.value,
    type: type || dateBaseType.value,
    parameter: params || methodParams.value,
  }
  if (methodIdHistoryId.value || methodId2) {
    paramsObject.methodId2 = methodIdHistoryId.value || methodId2
    await useQuerySaveState(taskIdQuickMode.value)
  }
  const { code, data } = await apiFun(paramsObject)
  if (code === 200) {
    message.success('应用成功')
    const luminosity = params ? params.luminosity : methodParams.value.luminosity
    appStore.setLuminosity(
      {
        '1': 'Abs',
        '2': 'T%',
        '3': 'Es',
        '4': 'Er',
      }[luminosity as string] as string,
    )
    taskIdQuickMode.value = data.taskId
    methodIdQuickMode.value = data.method.id
  }
}
export const useApplyMethodsFun = async ({
  methodId,
  methodId2,
  taskId,
  measureType,
  params,
  type,
}: {
  methodId: string
  methodId2?: string
  taskId: string
  measureType: string
  params: any
  type: string
}) => {
  methodIdQuickMode.value = methodId || ''
  methodIdHistoryId.value = methodId2 || ''
  taskIdQuickMode.value = taskId || ''
  methodParams.value = params
  dateBaseType.value = type
  measureValue.value = measureType
  if (measureType === '光谱扫描') {
    if (!quickModeStore.quickModeObj.saveStatus) {
      await showCustomModal('methods')
    } else {
      await useApplyMethods()
    }
  } else {
    if (!quickModeStore.quickModeObj.saveStatus) {
      await showCustomModal('methods')
    } else {
      await useApplyMethods()
    }
  }
  return { taskId: taskIdQuickMode.value, methodId: methodIdQuickMode.value }
}
export const useCreateDraftButtonFun = async ({
  methodId,
  taskId,
  measureType,
}: {
  methodId: string
  taskId: string
  measureType: string
}) => {
  methodIdQuickMode.value = methodId
  taskIdQuickMode.value = taskId
  measureValue.value = measureType
  if (measureType === '光谱扫描') {
    if (!quickModeStore.quickModeObj.saveStatus) {
      await showCustomModal('task')
    } else {
      await useCreateDraftButton()
    }
  } else {
    if (!quickModeStore.quickModeObj.saveStatus) {
      await showCustomModal('task')
    } else {
      await useCreateDraftButton()
    }
  }
  return taskIdQuickMode.value
}
export const useCreateDraftButton = async (methodId?: string) => {
  let apiFun: any
  if (measureValue.value === '光谱扫描') {
    apiFun = createDraftButton
  } else {
    apiFun = createDraftButtonTime
  }
  const { code, data } = await apiFun({
    methodId: methodId || methodIdQuickMode.value,
  })
  if (code === 200) {
    taskIdQuickMode.value = data
    await useQuerySaveState(data as string)
    return data
  } else {
    taskIdQuickMode.value = ''
    return ''
  }
}

// 默认参数
export const getDefaultParams = async (measureType: string) => {
  const methodsParams = ref({})
  const { code, data } = await conciseQueryDefaultParameters({ measureType })
  if (code === 200) Object.assign(methodsParams.value, JSON.parse(data.measurementParamInfo))
  // switch (measureType) {
  //   case '光度测量':
  //     Object.assign(methodsParams.value, {
  //       luminosity: '1',
  //       waveLength: ['660.5'],
  //       repetitionPattern: '不重复',
  //       repetitionTime: '2',
  //       timeInterval: '0',
  //       spectralBandwidth: '2',
  //       responseTime: '0.5',
  //       changeLampWaveLength: '361',
  //       energyLamp: '1',
  //       gain: '3',
  //       scanSpeed: '1',
  //     })
  //     break
  //   case '定量测定':
  //     Object.assign(methodsParams.value, {
  //       luminosity: '1',
  //       waveLength: ['660.5'],
  //       repeatMode: '不重复',
  //       repetitionTime: '2',
  //       timeInterval: '0',
  //       spectralBandwidth: '2',
  //       responseTime: '0.5',
  //       changeLampWaveLength: '361',
  //       energyLamp: '1',
  //       gain: '3',
  //       scanSpeed: '1',
  //     })
  //     break
  //   case '光谱扫描':
  //     Object.assign(methodsParams.value, {
  //       gain: '0',
  //       luminosity: '1',
  //       startWaveLength: '900',
  //       endWaveLength: '190',
  //       repetitionPattern: '不重复',
  //       repetitionTime: '2',
  //       timeInterval: '0',
  //       spectralBandwidth: '2',
  //       changeLampWaveLength: '361',
  //       energyLamp: '1',
  //       scanSpeed: '1',
  //     })
  //     break
  //   case '时间扫描':
  //     Object.assign(methodsParams.value, {
  //       luminosity: '1',
  //       waveLength: '660',
  //       referenceStandardName: '',
  //       preProcessParameters: [],
  //       scanTime: '60',
  //       scanUnit: '0',
  //       intervalTime: '1',
  //       totalNumber: '3600',
  //       multiPoolMode: '1',
  //       spectralBandwidth: '2',
  //       responseTime: '0.5',
  //       changeLampWaveLength: '361',
  //       energyLamp: '1',
  //       gain: '3',
  //       scanSpeed: '1',
  //     })
  //     break
  //   default:
  //     break
  // }
  return methodsParams.value
}

/**
 * 报告
 */
export const useReportDocsDownlodadFun = async (
  { taskId, sampleIds }: { taskId: string; sampleIds?: string[] },
  fileName: string,
  needSample = false,
) => {
  if (sampleIds && Array.isArray(sampleIds) && sampleIds.length > 1) {
    message.error('只能选择一个样本数据')
    return
  }
  if (needSample && sampleIds && sampleIds.length === 0) {
    message.error('请选择一个样本数据')
    return
  }
  const res = await reportDocsDownlodad({
    task_id: taskId,
    sample_id: sampleIds ? sampleIds[0] : '',
  })
  useDownloadFile(res.data, fileName)
}

export const useIsHasNotMeasureSampleFun = (taskId: string) => {
  return new Promise((resolve, reject) => {
    isHasNotMeasureSample({ taskId })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 查询设备状态
 *
 */
export const useQueryDeviceStatus = async () => {
  if (!localStorage.getItem('deviceSerialNumber')) return
  const { code, data } = await queryDeviceStatus({
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
  })
  if (code === 200) {
    appStore.setDeviceMeasureMode(data)
  }
}

/**
 * 判断方法参数是否被修改
 */
const useMethodUnApplyModal = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: h(
        'span',
        {
          class: 'text-[16px] !font-bold',
        },
        '提示',
      ),
      content: h(
        'span',
        {
          class: 'text-[14px]',
        },
        '该方法参数已被修改但未应用，将使用原方法参数，请确认是否继续？',
      ),
      onOk: async () => {
        resolve(true)
      },
      onCancel: async () => {
        resolve(false)
      },
      okText: '确定', // 自定义确定按钮文字
      cancelText: '取消',
    })
  })
}

export const useIsMethodApply = async () => {
  const appStore = useAppStore()
  const isDataChange = appStore.isDataChanged
  if (isDataChange) {
    return await useMethodUnApplyModal()
  } else {
    return true
  }
}
