/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { request } from '@/utils/request'

// 个人详情
export const getUserDetailById = async (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/user/${id}`,
    method: 'get',
  })
}
// 个人权限
export const getUserPermissionById = async (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/permission/user?userId=${id}`,
    method: 'get',
  })
}
// 组-人员列表
export const getUserGroupById = async (id: string) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/group/user?userId=${id}`,
    method: 'get',
  })
}

// 修改密码
export const updateUserPassword = async (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/user/updatePassword',
    method: 'post',
    data,
  })
}

// 重置密码
export const resetUserPassword = async (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/user/resetPassword',
    method: 'post',
    params,
  })
}
