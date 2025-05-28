import { defineStore } from 'pinia'
import { defineAsyncComponent } from 'vue'

// interface MenuItem {
//   label: string
//   key: string
//   name?: string
//   children?: MenuItem[]
//   meta?: Record<string, any>
// }
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    // 菜单权限
    permissionMenus: [],
    // 可访问的路由
    accessRoutes: [],
  }),
  actions: {
    setPermissionMenus(menus) {
      this.permissionMenus = menus
      this.accessRoutes = this.generateRoutes(menus)
    },
    generateRoutes(menus) {
      return menus.reduce((routes, menu) => {
        const route = {
          path: menu.key, // 取最后一段作为子路径
          name: menu.label,
          component: this.getComponentByPath(menu.key),
          meta: {
            title: menu.label,
          },
          children: [],
        }
        // 处理子菜单
        if (menu.children && menu.children.length > 0) {
          route.children = this.generateRoutes(menu.children)
          // 如果父路由没有指定组件，使用布局组件
          if (!route.component) {
            route.component = defineAsyncComponent(() => import('@/views/PageLayoutView.vue'))
          }
        }
        routes.push(route)
        return routes
      }, [])
    },
    /**
     * 根据路径动态导入组件
     * @param path 路由路径
     */
    getComponentByPath(path: string) {
      // 移除开头的斜杠并转换路径格式
      const componentPath = this.routePathToComponentPath(path)
      try {
        return defineAsyncComponent(() => import(componentPath))
      } catch (e) {
        console.warn(`组件未找到: @/views/${componentPath}.vue`)
        return null
      }
    },
    routePathToComponentPath(routePath: string) {
      const parts = routePath.replace(/^\/|\/$/g, '').split('/')
      if (parts.length > 1) {
        const componentName =
          parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1)
        const directory = parts[0]
        return `@/views/${directory}/${componentName}.vue`
      } else if (parts[0] === '/home') {
        return '@/views/HomeView.vue'
      }
    },
  },
})
