/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

import type { IGetReportList, IPreviewReport } from './types'

/**
 * @description 获取报告模板统计
 */
export const getReportIndustry = () => {
  return request({
    url: '/template/get_template_industry',
    method: 'get',
  })
}

/**
 * @description 获取报告模板列表
 */
export const getReportList = (params: IGetReportList) => {
  return request({
    url: '/template/get_report_template',
    method: 'get',
    params,
  })
}

/**
 * @description 编辑报告模板列表
 */
export const editReportList = (data: { id: number; name: string }) => {
  return request({
    url: '/template/update_template',
    method: 'post',
    data,
  })
}

/**
 * @description 删除报告模板列表
 */
export const delReportList = (data: { id: number }) => {
  return request({
    url: '/template/del_template',
    method: 'post',
    data,
  })
}

/**
 * @description 删除报告模板内容（导出
 */
export const getReportContent = (params: { template_id: number }) => {
  return request({
    url: '/template/get_template_content',
    method: 'get',
    params,
  })
}

/**
 * @description 根据模板获取书签
 */
export const getReportBookmark = (params: { template_id: number; type?: number | null }) => {
  return request({
    url: '/template/get_bookmark',
    method: 'get',
    params,
  })
}

/**
 * @description 获取额外书签 标题、页眉、页脚
 */
export const getReportBookmarkTitle = (params: { template_id: number }) => {
  return request({
    url: '/template/get_template_extra_info',
    method: 'get',
    params,
  })
}

/**
 * @description 获取字体 字号 下拉
 */
export const getFontOptions = () => {
  return request({
    url: '/template/get_bookmark_setting',
    method: 'get',
  })
}

/**
 * @description 预览
 */
export const previewReport = (data: IPreviewReport) => {
  return request({
    url: '/template/update_bookmark',
    method: 'post',
    data,
  })
}

/**
 * @description 获取校准模板列表
 */
export const getCalibrationList = (params: IGetReportList) => {
  return request({
    url: '/template/get_calibration_template',
    method: 'get',
    params,
  })
}

/**
 * @description 获取安装模板列表
 */
export const getInstallationList = (params: IGetReportList) => {
  return request({
    url: '/template/get_installation_acceptance_template',
    method: 'get',
    params,
  })
}

/**
 * @description 获取编辑模板列表
 */
export const getAllReportList = (params: IGetReportList) => {
  return request({
    url: '/template/get_total_template',
    method: 'get',
    params,
  })
}
