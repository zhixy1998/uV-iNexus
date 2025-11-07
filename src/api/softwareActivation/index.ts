/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

/**
 * @description 列表
 */
export const getSoftwareActivationList = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/softwareActivation/',
    method: 'get',
    params,
  })
}

// 新增设备查询接口（调用后端/addDevice接口）
export const queryDevices = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/softwareActivation/addDevice',
    method: 'get',
    params,
  })
}

/**
 * @description 新增
 */
export const PostSoftwareActivation = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/softwareActivation',
    method: 'post',
    data,
  })
}

/**
 * @description 激活
 */
export const PostActivate = (data: { id: any; activationCode: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/softwareActivation/activate',
    method: 'post',
    params: data, // 这里改用 params 传递，会自动处理为表单格式
  })
}

/**
 * @description 批量删除
 */
export const delBatchSoftwareActivation = (data: string[]) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/softwareActivation/batch`,
    method: 'delete',
    data,
  })
}

/**
 * @description 更新
 */
export const updateSoftwareActivation = (data: string[]) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/softwareActivation`,
    method: 'put',
    data,
  })
}

/**
 * @description 单个删除
 */
export const delSoftwareActivation = (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/softwareActivation/${id}`,
    method: 'delete',
  })
}

/**
 * @description 列表详情
 */
export const getSoftwareActivationDetail = (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/softwareActivation/${id}`,
    method: 'get',
  })
}

/**
 * @description 列表
 */
export const resetAllDeviceAddStatus = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/softwareActivation/resetAllAddStatus/',
    method: 'post',
  })
}
