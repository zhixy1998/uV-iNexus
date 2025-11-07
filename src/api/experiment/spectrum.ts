/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'
/**
 * @description 四则运算源1

 */
export const queryMeasurementParameters = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryMeasurementParameters',
    method: 'get',
    params: data,
  })
}
/**
 * @description 四则运算点击确认

 */
export const fourOperationsPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/fourOperationsPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 高级运算点击确认

 */
export const advancedOperationsPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/advancedOperationsPort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 平滑接口

 */
export const smoothnessPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/smoothnessPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 微分接口

 */
export const differentialPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/differentialPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取变换接口列表

 */
export const changeTheListPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/changeTheListPort',
    method: 'get',
    params: data,
  })
}
/**
 * @description 获取样品接口列表

 */
export const sampleListPortList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/sampleListPort',
    method: 'get',
    params: data,
  })
}
/**
 * @description 光度模式转换

 */
export const luminanceModeConversionPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/luminanceModeConversionPort',
    method: 'post',
    data: data,
  })
}
/**
 * @description 添加标记点
 */
export const addGaugePoint = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/addGaugePoint',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取方法参数列表

 */
export const methodParameter = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/methodParameter',
    method: 'get',
    params: data,
  })
}

/**
 * @description 添加删除样品
 */

export const addOrDeleteSamplePort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/addOrDeleteSamplePort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 下载文档接口

 */
export const spectrumExportWord = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/exportWord',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 删除样品列表
 */

export const deleteSampleListPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/deleteSampleListPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 撤销样品变换列表
 */

export const restoreDeletedListData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/restoreDeletedListData',
    method: 'get',
    params: data,
  })
}

/**
 * @description 删除变换列表
 */

export const deleteChangeListPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/deleteChangeListPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 寻峰寻谷接口
 */

export const seekingPeaksAndValleysPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/seekingPeaksAndValleysPort',
    method: 'post',
    data: data,
  })
}

/**
 * @description 获取峰谷数据
 */

export const queryPeakAndValleysPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryPeakAndValleysPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取标记点数据
 */

export const queryGaugePointPort = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/queryGaugePointPort',
    method: 'get',
    params: data,
  })
}

/**
 * @description 添加标记点备注接口
 */

export const addGaugePointRemarks = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/addGaugePointRemarks',
    method: 'post',
    data: data,
  })
}

/**
 * @description 添加峰谷备注接口
 */

export const addPeakValleyRemarks = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/addPeakValleyRemarks',
    method: 'post',
    data: data,
  })
}

/**
 * @description 更改颜色接口
 */

export const updateDataColor = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/updateDataColor',
    method: 'post',
    data: data,
  })
}

/**
 * @description 样品查询动态表头
 */

export const querySpectrumSampleHeads = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/querySampleHeads',
    method: 'get',
    params: data,
  })
}
