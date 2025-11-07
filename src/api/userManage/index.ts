/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// @/api/userManage.ts
import { request } from '@/utils/request'

/**
 * @description 获取用户信息（树形结构：角色-组-用户）
 */
// 原有接口（注释保留）
export const getUserInfo = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/userManage/getUserInfo',
    method: 'get',
  })
}
// 新接口：适配后端角色-组-用户树形接口
export const getUserInfoNew = (userId: string) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/userTree/role-group-user-tree',
    method: 'get',
    params: {
      userId: userId, // 拼接到URL查询参数
    },
  })
}

/**
 * @description 获取用户组信息
 */
export const getGroupInfo = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/userManage/getGroupInfo',
    method: 'get',
  })
}

/**
 * @description 新增用户（适配后端 UserController.addUser）
 */
// 原有接口（注释保留）
// export const createNewUser = (data: any) => {
//   return request({
//     url: '/com/persee/workstation/uv-inexus/userManage/createNewUser',
//     method: 'post',
//     data,
//   })
// }
// 新接口：对齐后端 /user/addUser（POST）
export const createNewUser = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/user/addUser',
    method: 'post',
    data,
  })
}

/**
 * @description 修改用户（适配后端 UserController.updateUser）
 */
// 原有接口（注释保留）
// export const updateSystemUser = (data: any) => {
//   return request({
//     url: '/com/persee/workstation/uv-inexus/userManage/updateSystemUser',
//     method: 'post',
//     data,
//   })
// }
// 新接口：对齐后端 /user/updateUser（PUT）
export const updateSystemUser = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/user/updateUser',
    method: 'put',
    data,
  })
}

/**
 * @description 删除用户（适配后端 UserController.deleteById）
 */
// 原有接口（注释保留）
export const deleteSystemUser = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/userManage/deleteSystemUser',
    method: 'get',
    params: data,
  })
}
// 新接口：对齐后端 /user/{id}（DELETE）
export const deleteSystemUserNew = (id: string | number) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/user/${id}`,
    method: 'delete',
  })
}

/**
 * @description 批量删除用户（适配后端 UserController.deleteBatch）
 */
// 新增：对齐后端 /user/deleteBatch（POST）
export const deleteBatchUser = (data: string[]) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/user/deleteBatch',
    method: 'post',
    data,
  })
}

/**
 * @description 新增：获取后端路由接口（原有接口保留）
 */
export const getBackendRoutes = (userId: string | number) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/route-permission/user',
    method: 'get',
    params: { userId },
  })
}

/**
 * @description 获取所有角色列表（原有接口保留）
 */
export const getRoleList = () => {
  return request({
    url: '/com/persee/workstation/uv-inexus/role/',
    method: 'get',
  })
}

/**
 * @description 根据角色ID获取组列表（原有接口保留）
 */
export const getGroupByRoleId = (roleId: string | number) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/role/groups`,
    method: 'get',
    params: { id: roleId },
  })
}

// 新增：调用新接口（根据角色ID获取小组）
export const getGroupsByRoleId = async (roleId: string | number) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/role/groups',
    method: 'get',
    params: { id: roleId }, // 新接口参数是id=角色ID
  })
}
// 新增小组
export const createNewGroup = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/group/addGroup',
    method: 'post',
    data,
  })
}
// 修改小组
export const updateGroup = (data: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/group/updateGroup',
    method: 'put',
    data,
  })
}
// 删除小组
export const deleteGroup = (id: string | number) => {
  return request({
    url: `/com/persee/workstation/uv-inexus/group/${id}`,
    method: 'delete',
  })
}
// 完整权限树结构及操作权限
export const getPermissionTreeData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/permission/tree',
    method: 'get',
    params,
  })
}

// 更新小组权限
export const updateGroupPerm = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/permission/update-group-perm',
    method: 'post',
    params,
  })
}

// 审计追踪
export const getauditTrailData = (params: any) => {
  return request({
    url: '/com/persee/workstation/uv-inexus/log/',
    method: 'get',
    params,
  })
}
