/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { defineStore } from 'pinia'
interface MenuItem {
  key: string
  label: string
  children?: MenuItem[]
}

interface RouteItem {
  path: string
  name: string
  component: unknown
  meta: { title: string }
  children: RouteItem[]
}
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    // 菜单权限
    permissionMenus: [] as MenuItem[],
    // 可访问的路由
    accessRoutes: [] as RouteItem[],
  }),
  actions: {
    setPermissionMenus(menus: MenuItem[]) {
      this.permissionMenus = menus
      this.accessRoutes = this.generateRoutes(menus)
    },
    generateRoutes(menus: MenuItem[]) {
      return menus.reduce((routes: RouteItem[], menu) => {
        const route: RouteItem = {
          path: menu.key,
          name: menu.label.replace(/\s+/g, ''), // 移除空格作为name
          component: this.getComponentByPath(menu.key),
          meta: {
            title: menu.label,
          },
          children: [],
        }
        // 处理子菜单
        if (menu.children?.length) {
          route.children = this.generateRoutes(menu.children)
        }
        routes.push(route)
        return routes
      }, [])
    },

    /**
     * 根据路径动态导入组件
     */
    getComponentByPath(path: string) {
      if (!path) return null
      const componentPath = this.routePathToComponentPath(path)
      if (!componentPath) return null
      console.log('componentPath', path, componentPath)
      // 返回实际的动态导入函数
      return () => import(/* @vite-ignore */ `${componentPath}`).catch((err) => console.error(err)) // 添加错误处理
    },

    /**
     * 转换路由路径为组件路径
     */
    routePathToComponentPath(routePath: string) {
      if (!routePath) return null
      // 标准化路径
      const normalizedPath = routePath.replace(/^\/|\/$/g, '')
      const parts = normalizedPath.split('/')
      // 特殊路由处理
      if (normalizedPath === 'home') {
        return '/src/views/HomeView.vue'
      }
      // 通用转换逻辑
      const lastPart = parts[parts.length - 1]
      const componentName = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)
      if (parts.length === 1) {
        return null
      }
      return `/src/views/${parts[0]}/${componentName}.vue`
    },
  },
})
