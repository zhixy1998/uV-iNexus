/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

import type {
  IChangeSystemLogSwitch,
  ISaveAlgorithmConf,
  ISaveBusinessParam,
  ISavePanelConf,
} from './types'

/*********************************************** 系统管理 **********************************************/
/**
 * @description 获取
 */
export const getSystemManage = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/getSystemManage',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const saveSystemManage = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/saveSystemManage',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetSystemManage = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetSystemManage',
    method: 'get',
  })
}

/*********************************************** 系统面板配置 **********************************************/
/**
 * @description 获取
 */
export const getPanelConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryPanelConf',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const savePanelConf = (data: ISavePanelConf) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/savePanelConf',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetPanelConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetPanelConf',
    method: 'get',
  })
}

/*********************************************** 系统管理配置 **********************************************/
/**
 * @description 获取
 */
export const querySysManageUserConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/querySysManageUserConf',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const saveUserDatabaseConf = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/saveUserDatabaseConf',
    method: 'post',
    data,
  })
}

/*********************************************** 数据库配置 **********************************************/
/**
 * @description 获取
 */
export const getDatabaseConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryDatabaseConf',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const saveDatabaseConf = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/saveDatabaseConf',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetDatabaseConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetDatabaseConf',
    method: 'get',
  })
}

/*********************************************** 系统日志管理 **********************************************/
/**
 * @description 获取
 */
export const getSystemLogSwitch = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/querySystemLogSwitch',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const changeSystemLogSwitch = (data: IChangeSystemLogSwitch) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/changeSystemLogSwitch',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetLogSwitch = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetLogSwitch',
    method: 'get',
  })
}

/*********************************************** 算法配置 **********************************************/
/**
 * @description 获取
 */
export const getAlgorithmConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryAlgorithmConf',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const saveAlgorithmConf = (data: ISaveAlgorithmConf) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/saveAlgorithmConf',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetAlgorithmConf = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetAlgorithmConf',
    method: 'get',
  })
}

/*********************************************** 业务参数配置 **********************************************/
/**
 * @description 获取
 */
export const getBusinessParam = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryBusinessParam',
    method: 'get',
  })
}

/**
 * @description 保存
 */
export const saveBusinessParam = (data: ISaveBusinessParam) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/saveBusinessParam',
    method: 'post',
    data,
  })
}

/**
 * @description 恢复出厂设置
 */
export const resetBusinessParam = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/resetBusinessParam',
    method: 'get',
  })
}

/*********************************************** 登录页面开关 **********************************************/

/**
 * @description 获取系统语言
 */
export const queryLanguage = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryLanguage',
    method: 'get',
  })
}

/**
 * @description 获取系统语言
 */
export const queryLoginSwitch = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryLoginSwitch',
    method: 'get',
  })
}

/**
 * @description 登录成功后--查询默认进入经典模式开关
 */
export const queryDefaultMeasureSwitch = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/queryDefaultMeasureSwitch',
    method: 'get',
  })
}

/**
 * @description 登录成功后--配置登录页面开关
 */
export const manageLoginSwitch = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/systemManage/manageLoginSwitch',
    method: 'post',
    data,
  })
}
