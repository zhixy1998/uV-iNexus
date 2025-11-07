/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

/**
 * @description 查找方法按钮

 */
export const searchMethodButton = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/searchMethodButton',
    method: 'get',
    params: data,
  })
}

/**
 * @description 创建草稿按钮

 */
export const createDraftButton = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/createDraftButton',
    method: 'get',
    params: data,
  })
}

/**
 * @description 方法应用接口

 */
export const applyMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/applyMethod',
    method: 'post',
    data,
  })
}

/**
 * @description 查询最近方法数据

 */
export const queryNearestMethodData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/queryNearestMethodData',
    method: 'get',
    params: data,
  })
}

/**
 * @description 是否保存数据接口

 */
export const whetherSaveData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/whetherSaveData',
    method: 'get',
    params: data,
  })
}

/**
 * @description 四则运算源1

 */
export const queryMeasurementParametersSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/queryArithmeticSourceData',
    method: 'get',
    params: data,
  })
}
/**
 * @description 四则运算点击确认

 */
export const fourOperationsPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/fourOperationsPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 高级运算点击确认

 */
export const advancedOperationsPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/advancedOperationsPort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 平滑接口

 */
export const smoothnessPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/smoothnessPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 微分接口

 */
export const differentialPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/differentialPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 光度模式转换

 */
export const luminanceModeConversionPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/luminanceModeConversionPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取变换接口列表

 */
export const changeTheListPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/changeTheListPort',
    method: 'get',
    params: data,
  })
}
/**
 * @description 获取样品接口列表

 */
export const sampleListPortListSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/sampleListPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 添加标记点
 */
export const addGaugePointSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/addGaugePoint',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取方法参数列表

 */
export const methodParameterSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/methodParameter',
    method: 'get',
    params: data,
  })
}

/**
 * @description 添加删除样品
 */

export const addOrDeleteSamplePortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/addOrDeleteSamplePort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 删除样品列表
 */

export const deleteSampleListPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/deleteSampleListPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 撤销样品变换列表
 */

export const restoreDeletedListDataSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/restoreDeletedListData',
    method: 'get',
    params: data,
  })
}

/**
 * @description 删除变换列表
 */

export const deleteChangeListPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/deleteChangeListPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 寻峰寻谷接口
 */

export const seekingPeaksAndValleysPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/seekingPeaksAndValleysPort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 获取峰谷数据
 */

export const queryPeakAndValleysPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/queryPeakAndValleysPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取标记点数据
 */

export const queryGaugePointPortSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/queryGaugePoint',
    method: 'get',
    params: data,
  })
}

/**
 * @description 添加标记点备注接口
 */

export const addGaugePointRemarksSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/addGaugePointRemarks',
    method: 'post',
    data: data,
  })
}

/**
 * @description 添加峰谷备注接口
 */

export const addPeakValleyRemarksSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/addPeakValleyRemarks',
    method: 'post',
    data: data,
  })
}

/**
 * @description 更改颜色接口
 */

export const updateDataColorSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/updateDataColor',
    method: 'post',
    data: data,
  })
}

/**
 * @description 样品查询动态表头
 */

export const querySpectrumSampleHeadsSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/querySampleHeads',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取样品列表，点击样品图标

 */

export const querySampleListSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/querySampleList',
    method: 'get',
    params: data,
  })
}

/**
 * @description 图片上传
 */

export const uploadImageSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/uploadImage',
    method: 'post',
    data: data,
  })
}
