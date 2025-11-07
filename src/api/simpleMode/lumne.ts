/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'
/**
 * @description 查询方法参数接口

 */
export const queryMethodParamSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryMethodParam',
    method: 'get',
    params: data,
  })
}
/**
 * @description 添加或删除样本接口

 */
export const addOrDeleteSampleSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/addOrDeleteSample',
    method: 'post',
    data: data,
  })
}

/**
 * @description 撤销删除接口

 */
export const revokeDelSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/revokeDel',
    method: 'get',
    params: data,
  })
}

/**
 * @description 删除单个样本接口

 */
export const deleteOneSampleSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/deleteOneSample',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取表头信息接口

 */
export const getTableHeadSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getTableHead',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取数据信息接口

 */
export const queryDataInfoSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryDataInfo',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取当前信息接口

 */
export const getCurrentInfoSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getCurrentInfo',
    method: 'get',
    params: data,
  })
}
/**
 * @description 获取样本列表接口

 */
export const getSampleListSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getSampleList',
    method: 'get',
    params: data,
  })
}

/**
 * @description 保存任务接口

 */
export const saveLumneTaskSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveTask',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取样本输入表头接口

 */
export const querySampleHeadsSampleSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/querySampleHeads',
    method: 'get',
    params: data,
  })
}

/**
 * @description 修改方法参数接口

 */
export const updateMethodParameterSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/updateMethodParameter',
    method: 'post',
    data: data,
  })
}

/**
 * @description 下载文档接口

 */
export const downloadDocConciseLumneSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 保存数据接口,备注等

 */
export const saveDataInfoRemarkSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveDataInfo',
    method: 'post',
    data: data,
  })
}

/**
 * @description 查询可绑定的方法参数

 */
export const queryInputParamSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryInputParam',
    method: 'get',
    params: data,
  })
}

/**
 * @description 保存映射关系及表头信息

 */
export const saveInputParamMapTableHeadSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveInputParamMapTableHead',
    method: 'post',
    data: data,
  })
}

/**
 * @description 查询已绑定的映射信息

 */

export const queryInputParamMapTableHeadSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryInputParamMapTableHead',
    method: 'get',
    params: data,
  })
}

/**
 * @description 根据任务id获取到项目和方法
 */

export const queryNewMethodTaskInfoSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryNewMethodTaskInfo',
    method: 'get',
    params: data,
  })
}

export const downloadDocConciseQuantitativeMeasurement = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

export const downloadDocConciseSpectrumScanning = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

export const downloadDocConciseTimeSweep = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}
