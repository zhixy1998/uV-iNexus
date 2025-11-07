/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'
/**
 * @description 查询设备状态

 */
export const queryDeviceStatus = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryDeviceStatus',
    method: 'get',
    params: data,
    noLoading: true,
  } as any)
}
/**
 * @description 查询保存状态

 */
export const querySaveState = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/querySaveState',
    method: 'get',
    params: data,
    noLoading: true,
  } as any)
}

/**
 * @description 历史方法删除

 */
export const simpleModeDelMethod = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/delMethod',
    method: 'get',
    params: data,
  })
}
/**
 * @description 历史文件删除

 */
export const simpleModeDelTask = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/delTask',
    method: 'get',
    params: data,
  })
}

/**
 * @description 保存草稿按钮接口
 */
export const saveDraftButton = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/saveDraftButton',
    method: 'get',
    params: data,
    noLoading: true,
  } as any)
}
/**
 * @description 报告
 */
export const reportDocsDownlodad = (data: any) => {
  return request({
    url: '/classic_template/classic_export_original_report_docx',
    method: 'post',
    data: {
      ...data,
      noToken: true,
    },
    responseType: 'blob',
  })
}
/**
 * @description 获取方法参数
 */

export const queryMethodParameterSimple = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/queryMethodParameter',
    method: 'get',
    params: data,
  })
}
/**
 * @description 经典模式模板所有模版
 */

export const getTotalTemplateSimple = (data: any) => {
  return request({
    url: '/classic_template/get_total_template',
    method: 'get',
    params: data,
  })
}
/**
 * @description 预览经典模式模板
 */
export const previewTemplateSimple = (data: any) => {
  return request({
    url: '/classic_template/preview_template',
    method: 'post',
    data,
  })
}

/**
 * @description 是否有没测量完成的样品
 */
export const isHasNotMeasureSample = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/experimenttest/sys/concise/isAddSample',
    method: 'get',
    params: data,
  })
}
