import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { basicRoutes } from './basic-route'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
})

import { realMenus } from '@/setting'
import { usePermissionStore } from '@/stores/modules/permission'
// router.beforeEach(async (to, from, next) => {
//   //获取菜单并添加路由配置
//   const permissionStore = usePermissionStore()
//   if (!permissionStore.permissionMenus.length) {
//     permissionStore.setPermissionMenus(realMenus)
//     const accessRoute = permissionStore.accessRoutes
//     console.log(accessRoute,'accessRoute')
//     const addRoutesObj = {
//       path: '/',
//       redirect: '/home',
//       component: () => import('@/views/PageLayoutView.vue'),
//       children: accessRoute,
//     }
//     router.addRoute(addRoutesObj)
//     router.addRoute({
//       path: '/:pathMatch(.*)*',
//       name: 'notFound',
//       redirect: '/404',
//     })
//     return next({ ...to, replace: true })
//   }
//   next()
// })

export default router
