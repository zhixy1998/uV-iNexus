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
export const queryMethodParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/queryMethodParam',
    method: 'get',
    params: data,
  })
}
/**
 * @description 添加或删除样本接口

 */
export const addOrDeleteLumneSample = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/addOrDeleteSample',
    method: 'post',
    data: data,
  })
}

/**
 * @description 撤销删除接口

 */
export const revokeLumneDel = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/revokeDel',
    method: 'get',
    params: data,
  })
}

/**
 * @description 删除单个样本接口

 */
export const deleteLumneOneSample = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/deleteOneSample',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取表头信息接口

 */
export const getLumneTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/getTableHead',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取数据信息接口

 */
export const queryLumneDataInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/queryDataInfo',
    method: 'post',
    data: data,
  })
}
/**
 * @description 获取当前信息接口

 */
export const getLumneCurrentInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/getCurrentInfo',
    method: 'get',
    params: data,
  })
}
/**
 * @description 获取样本列表接口

 */
export const getLumneSampleList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/getSampleList',
    method: 'get',
    params: data,
  })
}

/**
 * @description 保存任务接口

 */
export const saveLumneTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/saveTask',
    method: 'get',
    params: data,
  })
}

/**
 * @description 获取样本输入表头接口

 */
export const queryLumneSampleHeads = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/querySampleHeads',
    method: 'get',
    params: data,
  })
}

/**
 * @description 修改方法参数接口

 */
export const updateMethodParameter = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/updateMethodParameter',
    method: 'post',
    data: data,
  })
}

/**
 * @description 下载文档接口：光度

 */
export const downloadDocLumne = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 下载文档接口：定量

 */
export const downloadDocQuantityDetermind = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 下载文档接口：光谱

 */
export const downloadDocSpectrumScanning = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/downloadDoc',
    method: 'get',
    params: data,
    data: {
      responseType: 'blob',
    },
  })
}

/**
 * @description 下载文档接口：时间

 */
export const downloadDocTimeSweep = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/downloadDoc',
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
export const saveLumneDataInfoRemark = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/saveDataInfo',
    method: 'post',
    data: data,
  })
}

/**
 * @description 保存样品模板

 */
export const saveSampleTemplate = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/saveSampleTemplate',
    method: 'post',
    data: data,
  })
}

/**
 * @description 查询样品模板

 */
export const querySampleTemplate = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/querySampleTemplate',
    method: 'get',
    params: data,
  })
}

/**
 * @description 删除样品模板

 */
export const deleteSampleTemplate = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/deleteSampleTemplate',
    method: 'get',
    params: data,
  })
}

/**
 * @description 查询可绑定的方法参数

 */
export const queryInputParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/queryInputParam',
    method: 'get',
    params: data,
  })
}

/**
 * @description 保存映射关系及表头信息

 */
export const saveInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/saveInputParamMapTableHead',
    method: 'post',
    data: data,
  })
}

/**
 * @description 查询已绑定的映射信息

 */

export const queryInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/queryInputParamMapTableHead',
    method: 'get',
    params: data,
  })
}

/*************************************** 简洁模式 ****************************************/

/**
 * @description 方法参数详情
 */
export const conciseLumneQueryMethodParam = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryMethodParam',
    method: 'get',
    params,
  })
}
/**
 * @description 获取样品列表
 */
export const conciseLumneGetSampleList = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getSampleList',
    method: 'get',
    params,
  })
}
/**
 * @description 获取样品表头
 */
export const conciseLumneQuerySampleHeads = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/querySampleHeads',
    method: 'get',
    params,
  })
}
/**
 * @description 获取当前信息
 */
export const conciseLumneGetCurrentInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getCurrentInfo',
    method: 'get',
    params,
  })
}
/**
 * @description 添加或删除样本
 */
export const conciseLumneAddOrDeleteSample = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/addOrDeleteSample',
    method: 'post',
    data,
  })
}
/**
 * @description 删除单个样本
 */
export const conciseLumneDeleteOneSample = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/deleteOneSample',
    method: 'get',
    params,
  })
}
/**
 * @description 撤销删除
 */
export const conciseLumneRevokeDel = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/revokeDel',
    method: 'get',
    params,
  })
}
/**
 * @description 获取表头信息
 */
export const conciseLumneGetTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/getTableHead',
    method: 'get',
    params,
  })
}
/**
 * @description 获取数据信息
 */
export const conciseLumneQueryDataInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryDataInfo',
    method: 'post',
    data,
  })
}
/**
 * @description 校零
 */
export const conciseLumneZero = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/zero',
    method: 'get',
    params,
  })
}
/**
 * @description 保存任务
 */
export const conciseLumneSaveTask = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveTask',
    method: 'get',
    params,
  })
}
/**
 * @description 下载文档
 */
export const conciseLumneDownloadDoc = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/downloadDoc',
    method: 'get',
    params,
  })
}
/**
 * @description 查询新方法任务信息
 */
export const conciseLumneQueryNewMethodTaskInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryNewMethodTaskInfo',
    method: 'get',
    params,
  })
}
/**
 * @description 查询可绑定的方法参数
 */
export const conciseLumneQueryInputParam = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryInputParam',
    method: 'get',
    params,
  })
}
/**
 * @description 保存映射关系及表头信息
 */
export const conciseLumneSaveInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveInputParamMapTableHead',
    method: 'post',
    data,
  })
}
/**
 * @description 查询可绑定的方法参数
 */
export const conciseLumneQueryInputParamMapTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/queryInputParamMapTableHead',
    method: 'get',
    params,
  })
}
/**
 * @description 保存数据接口,备注等
 */
export const conciseLumneSaveDataInfo = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/saveDataInfo',
    method: 'post',
    data,
  })
}
/**
 * @description 检查方法参数
 */
export const conciseLumneCheckParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/checkParam',
    method: 'post',
    data,
  })
}
/**
 * @description 应用方法参数
 */
export const conciseLumneApplyMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/applyMethod',
    method: 'post',
    data,
  })
}
/**
 * @description 查找方法
 */
export const lumneSearchMethodButton = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/searchMethods',
    method: 'post',
    data,
  })
}
/**
 * @description 光谱查找
 */
export const searchMethodSpectrum = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/spectrumScanning/concise/searchMethodButton',
    method: 'get',
    params: data,
  })
}
/**
 * @description 时间查找
 */
export const searchMethodButtonTime = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/timeSweep/concise/searchMethodButton',
    method: 'get',
    params: data,
  })
}
/**
 * @description 新建草稿
 */
export const conciseLumneAddDraft = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/newDraft',
    method: 'post',
    data,
  })
}
/**
 * @description 重新分析
 */
export const conciseLumneReAnalyze = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/reAnalyze',
    method: 'get',
    params,
  })
}
/**
 * @description 创建样本接口
 */
export const conciseLumneCreateSample = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/photometricMeasurement/concise/createSample',
    method: 'get',
    params,
    noLoading: true,
  } as any)
}
