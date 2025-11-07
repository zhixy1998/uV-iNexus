/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'
/**
 * @description 获取当前项目、任务信息
 */
export const getTimeEssentialInformation = (params: { measureType: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/queryEssentialInformation',
    method: 'get',
    params,
  })
}

/**
 * @description 获取参数详情
 */
export const getTimeMethodParameter = (params: { methodId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/queryMethodParameter',
    method: 'get',
    params,
  })
}

/**
 * @description 修改参数
 */
export const updateTimeMethodParameter = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/updateMethodParameter',
    method: 'post',
    data,
  })
}

/**
 * @description 校零
 */
export const zeroTime = (params: { serialNumber: string; methodId: any; taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/zero',
    method: 'get',
    params,
  })
}

/**
 * @description 获取样品树形列表
 */
export const getTimeSampleListPort = (params: { taskId: string; type?: any; digit?: number }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/sampleListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 删除样品树形列表
 */
export const delTimeSampleListPort = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/deleteSampleListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 获取样品列表（样品按钮
 */
export const getTimeSampleList = (params: { taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/querySampleList',
    method: 'get',
    params,
  })
}

/**
 * @description 获取样品表头
 */
export const getTimeSampleHeaders = (params: { taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/querySampleHeads',
    method: 'get',
    params,
  })
}

/**
 * @description 添加删除样品
 */
export const addOrDeleteTimeSamplePort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/addOrDeleteSamplePort',
    method: 'post',
    data,
  })
}

/**
 * @description 获取变化树形列表
 */
export const getTimeChangeTheListPort = (params: {
  taskId: string
  type?: any
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/changeTheListPort',
    method: 'get',
    params,
  })
}

/**
 * @description 删除变化树形列表
 */
export const delTimeChangeTheListPort = (data: { analysisId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/deleteChangeListPort',
    method: 'delete',
    data,
  })
}

/**
 * @description 撤销删除树形列表
 */
export const restoreTimeDeletedListData = (params: {
  taskId: string
  paramId: string
  type?: any
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/restoreDeletedListData',
    method: 'get',
    params,
  })
}

/**
 * @description 上传图片
 */
export const timeUploadImage = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/uploadImage',
    method: 'post',
    data,
  })
}

/**
 * @description 添加标记点
 */
export const addTimeGaugePoint = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/addGaugePoint',
    method: 'post',
    data,
  })
}

/**
 * @description 标记点列表
 */
export const getTimeGaugePointDataList = (params: {
  dataId: string
  type?: string
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/queryGaugePointDataList',
    method: 'get',
    params,
  })
}

/**
 * @description 寻峰寻谷修改后列表
 */
export const seekingTimePeaksAndValleysPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/seekingPeaksAndValleysPort',
    method: 'post',
    data,
  })
}

/**
 * @description 寻峰寻谷初始列表
 */
export const getTimePeakValleyDataList = (params: {
  dataId: string
  type?: string
  digit?: number
}) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/queryPeakValleyDataList',
    method: 'get',
    params,
  })
}

/**
 * @description 四则运算

 */
export const timeFourOperationsPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/fourOperationsPort',
    method: 'post',
    data,
  })
}

/**
 * @description 源1

 */
export const getTimeArithmeticSourceData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/queryArithmeticSourceData',
    method: 'get',
    params,
  })
}

/**
 * @description 高级运算

 */
export const timeAdvancedOperationsPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/advancedOperationsPort',
    method: 'post',
    data,
  })
}

/**
 * @description 谱图平滑

 */
export const timeSmoothnessPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/smoothnessPort',
    method: 'post',
    data,
  })
}

/**
 * @description 谱图微分

 */
export const timeDifferentialPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/differentialPort',
    method: 'post',
    data,
  })
}

/**
 * @description 光度模式转换

 */
export const timeLuminanceModeConversionPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/luminanceModeConversionPort',
    method: 'post',
    data,
  })
}

/**
 * @description 数据变换-保存

 */
export const timeSaveData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/saveData',
    method: 'get',
    params,
  })
}

/**
 * @description 数据变换-导出word

 */
export const timeExportWord = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/exportWord',
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

export const useTimeMethodToTest = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/useMethodToTest',
    method: 'get',
    params,
  })
}

/**
 * @description 寻峰添加备注

 */
export const addTimePeakValleyRemarks = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/addPeakValleyRemarks',
    method: 'post',
    data,
  })
}

/**
 * @description 标记添加备注

 */
export const addTimeGaugePointRemarks = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/addGaugePointRemarks',
    method: 'post',
    data,
  })
}

/**
 * @description 样品树形列表修改颜色

 */
export const updateTimeDataColor = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/updateDataColor',
    method: 'post',
    data,
  })
}
