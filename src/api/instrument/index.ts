/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

import type {
  IAddInstrumentConfig,
  ICalibrationInstrument,
  ISetInjectorConf,
  ISetInjectorTray,
} from './types'

/******************************************* 仪器管理 ****************************************/

/**
 * @description 仪器序列号查询
 */
export const getSerialNumber = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/findDevice',
    method: 'get',
  })
}

/**
 * @description 仪器初始化
 */
export const initInstrument = (data: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/init',
    method: 'post',
    data,
  })
}

/**
 * @description 仪器管理查询
 */
export const getInstrumentInfo = (params: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/query',
    method: 'get',
    params,
    noLoading: true,
  } as any)
}

/**
 * @description 启动仪器
 */
export const startInstrument = (data: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/start',
    method: 'post',
    data,
  })
}

/**
 * @description 仪器关机
 */
export const closeInstrument = (data: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/softClose',
    method: 'post',
    data,
  })
}

/******************************************* 仪器配置 ****************************************/

/**
 * @description 仪器配置详情
 */
export const getInstrumentConfig = (params: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/getDeviceConfig',
    method: 'get',
    params,
  })
}

/**
 * @description 光谱带宽查询
 */
export const getBandwidthOptions = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/getBandWidth',
    method: 'get',
  })
}

/**
 * @description 仪器配置
 */
export const addInstrumentConfig = (data: IAddInstrumentConfig) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/deviceConfig',
    method: 'post',
    data,
  })
}

/******************************************* 仪器校正 ****************************************/

/**
 * @description 获取仪器校正信息项
 */
export const getCalibrationInstrumentDetail = (params: { deviceSerialNumber: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/getCalibrationInfo',
    method: 'get',
    params,
  })
}

/**
 * @description 仪器校正
 */
export const calibrationInstrument = (data: ICalibrationInstrument) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/calibration',
    method: 'post',
    data,
  })
}

/******************************************* 自动进样器配置 ****************************************/

/**
 * @description 获取详情
 */
export const getInjectorConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/getInjectorConf',
    method: 'get',
  })
}

/**
 * @description 联机
 */
export const checkConnect = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/checkConnect',
    method: 'get',
  })
}

/**
 * @description 设置进样器参数
 */
export const setInjectorConf = (data: ISetInjectorConf) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/setInjectorConf',
    method: 'post',
    data,
  })
}

/**
 * @description 设置进样盘参数
 */
export const setInjectorTray = (data: ISetInjectorTray[]) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/setInjectorTray',
    method: 'post',
    data,
  })
}

/**
 * @description 仪器命名
 */
export const reNameInstrument = (params: { deviceName: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/changeDeviceName',
    method: 'get',
    params,
  })
}

/**
 * @description 仪器初始化停止
 */
export const stopInitInstrument = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/dev/ins/stopInit',
    method: 'get',
  })
}
