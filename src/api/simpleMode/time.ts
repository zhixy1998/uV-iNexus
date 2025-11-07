/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'
/**
 * @description 查询最近方法数据

 */
export const queryNearestMethodDataTime = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/queryNearestMethodData',
    method: 'get',
    params: data,
  })
}
/**
 * @description 创建草稿按钮

 */
export const createDraftButtonTime = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/createDraftButton',
    method: 'get',
    params: data,
  })
}

/**
 * @description 方法应用接口

 */
export const applyMethodTime = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/applyMethod',
    method: 'post',
    data,
  })
}
/**
 * @description 获取样品树形列表
 */
export const getTimeSampleListPortSimple = (params: {
  taskId: string
  type?: any
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/sampleListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 删除样品树形列表
 */
export const delTimeSampleListPortSimple = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/deleteSampleListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 获取样品列表（样品按钮
 */
export const getTimeSampleListSimple = (params: { taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/querySampleList',
    method: 'get',
    params,
  })
}

/**
 * @description 获取样品表头
 */
export const getTimeSampleHeadersSimple = (params: { taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/querySampleHeads',
    method: 'get',
    params,
  })
}

/**
 * @description 添加删除样品
 */
export const addOrDeleteTimeSamplePortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/addOrDeleteSamplePort',
    method: 'post',
    data,
  })
}

/**
 * @description 获取变化树形列表
 */
export const getTimeChangeTheListPortSimple = (params: {
  taskId: string
  type?: any
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/changeTheListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 删除变化树形列表
 */
export const delTimeChangeTheListPortSimple = (params: { analysisId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/deleteChangeListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 撤销删除树形列表
 */
export const restoreTimeDeletedListDataSimple = (params: {
  taskId: string
  paramId: string
  type?: any
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/restoreDeletedListData',
    method: 'get',
    params,
  })
}

/**
 * @description 上传图片
 */
export const timeUploadImageSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/uploadImage',
    method: 'post',
    data,
  })
}

/**
 * @description 添加标记点
 */
export const addTimeGaugePointSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/addGaugePoint',
    method: 'post',
    data,
  })
}

/**
 * @description 标记点列表
 */
export const getTimeGaugePointDataListSimple = (params: {
  dataId: string
  type?: string
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/queryGaugePointDataList',
    method: 'get',
    params,
  })
}

/**
 * @description 寻峰寻谷修改后列表
 */
export const seekingTimePeaksAndValleysPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/seekingPeaksAndValleysPort',
    method: 'post',
    data,
  })
}

/**
 * @description 寻峰寻谷初始列表
 */
export const getTimePeakValleyDataListSimple = (params: {
  dataId: string
  type?: string
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/queryPeakValleyDataList',
    method: 'get',
    params,
  })
}

/**
 * @description 四则运算

 */
export const timeFourOperationsPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/fourOperationsPort',
    method: 'post',
    data,
  })
}

/**
 * @description 源1

 */
export const getTimeArithmeticSourceDataSimple = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/queryArithmeticSourceData',
    method: 'get',
    params,
  })
}

/**
 * @description 高级运算

 */
export const timeAdvancedOperationsPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/advancedOperationsPort',
    method: 'post',
    data,
  })
}

/**
 * @description 谱图平滑

 */
export const timeSmoothnessPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/smoothnessPort',
    method: 'post',
    data,
  })
}

/**
 * @description 谱图微分

 */
export const timeDifferentialPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/differentialPort',
    method: 'post',
    data,
  })
}

/**
 * @description 光度模式转换

 */
export const timeLuminanceModeConversionPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/luminanceModeConversionPort',
    method: 'post',
    data,
  })
}

/**
 * @description 数据变换-保存

 */
export const timeSaveDataSimple = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/saveData',
    method: 'get',
    params,
  })
}

/**
 * @description 数据变换-导出word

 */
export const timeExportWordSimple = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/exportWord',
    method: 'get',
    params,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 使用该方法
 */

export const useTimeMethodToTestSimple = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/useMethodToTest',
    method: 'get',
    params,
  })
}

/**
 * @description 寻峰添加备注

 */
export const addTimePeakValleyRemarksSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/addPeakValleyRemarks',
    method: 'post',
    data,
  })
}

/**
 * @description 标记添加备注

 */
export const addTimeGaugePointRemarksSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/addGaugePointRemarks',
    method: 'post',
    data,
  })
}

/**
 * @description 样品树形列表修改颜色

 */
export const updateTimeDataColorSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/updateDataColor',
    method: 'post',
    data,
  })
}
