/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import type { LoginForm } from '@/api/user/types'
import { request } from '@/utils/request'

/**
 * @description 登录
 */
export const login = (data: LoginForm) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/system/login',
    method: 'post',
    data,
  })
}

/**
 * @description 退出登录
 */
export const logout = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/system/logout',
    method: 'post',
  })
}

/**
 * @description 一级菜单权限
 */
export const getRolePath = (params: { userId: string }) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/permission/role-path',
    method: 'get',
    params,
  })
}
