/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

import type { IStandardList } from './types'

/**
 * @description 列表
 */
export const getStandardList = (params: IStandardList) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/detection/',
    method: 'get',
    params,
    // data: {
    //   noToken: true,
    // },
  })
}

/**
 * @description 批量删除
 */
export const delBatchStandard = (data: string[]) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/batch`,
    method: 'delete',
    data,
  })
}

/**
 * @description 单个删除
 */
export const delStandard = (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/${id}`,
    method: 'delete',
  })
}

/**
 * @description 导出
 */
export const exportStandard = (data?: any) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/parseReport/export`,
    method: 'post',
    data: {
      ...data,
      responseType: 'blob',
    },
  })
}

/**
 * @description 解析文件
 */
export const parseVersionStandard = (data: FormData) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/crypto/parseVersion`,
    method: 'post',
    data,
  })
}

/**
 * @description 升级
 */
export const upgradeStandard = (data: FormData) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/crypto/upgrade`,
    method: 'post',
    data,
  })
}

/**
 * @description 列表详情
 */
export const getStandardDetail = (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/detail/${id}`,
    method: 'get',
  })
}

/**
 * @description 检测方法详情
 */
export const getStandardParametersDetail = (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/detection/detail/parameters/${id}`,
    method: 'get',
  })
}

/**
 * @description 类型饼图
 */
export const getStandardType = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/detection/industryType',
    method: 'get',
  })
}

/**
 * @description 行业饼图
 */
export const getStandardIndustry = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/detection/industry',
    method: 'get',
    data: {
      noToken: true,
    },
  })
}
