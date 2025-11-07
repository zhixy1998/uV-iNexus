/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { getBackendRoutes } from '@/api/userManage/index' // 导入接口
import { USE_BACKEND_ROUTES } from '@/setting'
import { useUserStore } from '@/stores/modules/user'
import { createRouter, createWebHistory } from 'vue-router'
import { menuConfig } from '../utils/menuConfig'
import { basicRoutes } from './basic-route'

// 路由模式开关：true=后端接口，false=前端menuConfig
// export const USE_BACKEND_ROUTES = USE_BACKEND_ROUTES

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
})

// 缓存后端返回的权限列表（避免重复请求）
let backendAllowedPaths: string[] = []

router.beforeEach(async (to, from, next) => {
  if (to.meta.noAuth) {
    next()
    return
  }

  const { systemIdentityId } = useUserStore()
  if (!systemIdentityId) {
    next('/login')
    return
  }

  // 获取权限列表（区分模式）
  let allowedMenus: string[] = []
  if (USE_BACKEND_ROUTES) {
    console.log('→ 后端模式，检查缓存:', backendAllowedPaths.length > 0 ? '有缓存' : '无缓存')
    // 后端模式：调用接口获取权限
    if (backendAllowedPaths.length === 0) {
      // 首次请求接口并缓存结果
      const res = await getBackendRoutes(systemIdentityId)
      backendAllowedPaths = res.code === 200 && Array.isArray(res.data) ? res.data : []
    }
    allowedMenus = backendAllowedPaths
    console.log('allowedMenus:', allowedMenus, typeof allowedMenus)
  } else {
    // 前端模式：沿用menuConfig
    allowedMenus = menuConfig[systemIdentityId as '1' | '2' | '3' | '4'] || []
    console.log('allowedMenus1111111:', allowedMenus, typeof allowedMenus)
  }

  // 权限判断（注意：后端返回的是path，这里需要和路由的path匹配）
  if (allowedMenus.includes(to.name as string)) {
    next() // 有权限
  } else {
    next('/403') // 无权限
  }
})

export default router
