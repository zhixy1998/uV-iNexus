/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

/**
 * @description 获取当前项目、任务、方法
 */

export const getQuantityCurrentInfo = (params: { measureType: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getCurrentInfo',
    method: 'get',
    params,
  })
}

/**
 * @description 获取方法参数
 */

export const getQuantityMethodParam = (params: { methodId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/queryMethodParam',
    method: 'get',
    params,
  })
}

/**
 * @description 修改方法参数
 */

export const editQuantityMethodParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/updateMethodParameter',
    method: 'post',
    data,
  })
}

/**
 * @description 样品列表
 */

export const getQuantitySampleList = (params: { sampleKind: string; taskId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getSampleList',
    method: 'get',
    params,
  })
}

/**
 * @description 添加删除样品列表
 */

export const addQuantitySampleList = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/addOrDeleteSample',
    method: 'post',
    data,
  })
}

/**
 * @description 获取标准样品表头
 */

export const getQuantityStandTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getStandTableHead',
    method: 'get',
    params,
  })
}

/**
 * @description 获取未知样品表头
 */

export const getQuantityStandUnknowTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getUnknowTableHead',
    method: 'get',
    params,
  })
}

/**
 * @description 撤销删除
 */

export const revokeDelQuantity = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/revokeDel',
    method: 'get',
    params,
  })
}

/**
 * @description 查询标准未知添加样品表头接口
 */

export const queryQuantitySampleHeads = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/querySampleHeads',
    method: 'get',
    params,
  })
}

/**
 * @description 获取标准样品数据接口
 */

export const getStandSampleData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getStandSampleData',
    method: 'get',
    params,
  })
}
/**
 * @description 查询样品数据接口
 */

export const queryQuantitySampleData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/querySampleData',
    method: 'post',
    data,
  })
}

/**
 * @description 获取未知样品数据接口
 */

export const getQuantityUnknowSampleData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getUnknowSampleData',
    method: 'get',
    params,
  })
}

/**
 * @description 获取曲线信息接口
 */

export const getQuantityCurveInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/getCurveInfo',
    method: 'get',
    params,
  })
}
/**
 * @description 定量校零接口
 */
export const quantitiyMeasurementZero = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/zero',
    method: 'get',
    params,
  })
}
/**
 * @description 保存映射关系及表头信息

 */
export const saveQuantityInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/saveInputParamMapTableHead',
    method: 'post',
    data: data,
  })
}

/**
 * @description 查询已绑定的映射信息

 */

export const queryQuantityInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/queryInputParamMapTableHead',
    method: 'get',
    params: data,
  })
}

/**************************************** 简洁模式 **********************************/
/**
 * @description 获取当前信息
 */
export const conciseQuantityGetCurrentInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/getCurrentInfo',
    method: 'get',
    params,
  })
}
/**
 * @description 查询方法参数
 */
export const conciseQuantityQueryMethodParam = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/queryMethodParam',
    method: 'get',
    params,
  })
}
/**
 * @description 获取样本列表
 */
export const conciseQuantityGetSampleList = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/getSampleList',
    method: 'get',
    params,
  })
}
/**
 * @description 添加或删除样本接口
 */
export const conciseQuantityAddOrDeleteSample = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/addOrDeleteSample',
    method: 'post',
    data,
  })
}
/**
 * @description 查询样品表头
 */
export const conciseQuantityQuerySampleHeads = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/querySampleHeads',
    method: 'get',
    params,
  })
}
/**
 * @description 删除单个样本
 */
export const conciseQuantityDeleteOneSample = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/deleteOneSample',
    method: 'get',
    params,
  })
}
/**
 * @description 撤销删除
 */
export const conciseQuantityRevokeDel = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/revokeDel',
    method: 'get',
    params,
  })
}
/**
 * @description 获取标准样品表头信息
 */
export const conciseQuantityGetStandTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/getStandTableHead',
    method: 'get',
    params,
  })
}
/**
 * @description 获取未知样品表头信息
 */
export const conciseQuantityGetUnknowTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/getUnknowTableHead',
    method: 'get',
    params,
  })
}
/**
 * @description 查询样品数据(标准、未知)
 */
export const conciseQuantityQuerySampleData = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/querySampleData',
    method: 'post',
    data,
  })
}
/**
 * @description 获取曲线信息
 */
export const conciseQuantityGetCurveInfo = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/getCurveInfo',
    method: 'get',
    params,
  })
}
/**
 * @description 校零
 */
export const conciseQuantityZero = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/zero',
    method: 'get',
    params,
  })
}
/**
 * @description 校零2
 */
export const conciseQuantityZero2 = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/zero2',
    method: 'get',
    params,
  })
}
/**
 * @description 查询可绑定的方法参数
 */
export const conciseQuantityQueryInputParam = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/queryInputParam',
    method: 'get',
    params,
  })
}
/**
 * @description 保存映射关系及表头信息
 */
export const conciseQuantitySaveInputParamMapTableHead = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/saveInputParamMapTableHead',
    method: 'post',
    data,
  })
}
/**
 * @description 查询可绑定的方法参数
 */
export const conciseQuantityQueryInputParamMapTableHead = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/queryInputParamMapTableHead',
    method: 'get',
    params,
  })
}
/**
 * @description 检查参数
 */
export const conciseQuantityCheckParam = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/checkParam',
    method: 'post',
    data,
  })
}
/**
 * @description 应用方法
 */
export const conciseQuantityApplyMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/applyMethod',
    method: 'post',
    data,
  })
}
/**
 * @description 新建草稿
 */
export const conciseQuantityNewDraft = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/newDraft',
    method: 'post',
    data,
  })
}
/**
 * @description 保存任务
 */
export const conciseQuantitySaveTask = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/saveTask',
    method: 'get',
    params,
  })
}
/**
 * @description 创建样本接口
 */
export const conciseQuantityCreateSample = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/createSample',
    method: 'get',
    params,
  })
}
/**
 * @description 检查样品是否都测量了
 */
export const conciseQuantityCheckAllSampleTestStatus = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/quantitativeMeasurement/concise/checkAllSampleTestStatus',
    method: 'get',
    params,
    noLoading: true,
  } as any)
}
