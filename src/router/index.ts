import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './basic-route'
import { usePermissionStore } from '@/stores'
import { realMenus } from '@/setting'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
})
// export function addDynamicRoutes() {
//   const permissionStore = usePermissionStore()
//   permissionStore.setPermissionMenus(realMenus)
//   const accessedRoutes = permissionStore.accessRoutes
//   console.log('accessedRoutes', accessedRoutes)
//   accessedRoutes.forEach((route) => {
//     if (!router.hasRoute(route.name)) {
//       router.addRoute(route)
//     }
//   })
//   router.addRoute({
//     path: '/:pathMatch(.*)*',
//     name: 'notFound',
//     redirect: '/404',
//   })
// }
// router.beforeEach(async (to, from, next) => {
//   console.log('beforeEach', to, to.fullPath)
//   if (to.fullPath === '/') {
//     addDynamicRoutes()
//     next({ ...to, replace: true })
//   }
//   next()
// })
// let dynamicRoutesAdded = false // 添加标志位防止重复添加

// export async function addDynamicRoutes() {
//   if (dynamicRoutesAdded) return

//   const permissionStore = usePermissionStore()
//   permissionStore.setPermissionMenus(realMenus)
//   const accessedRoutes = permissionStore.accessRoutes

//   accessedRoutes.forEach((route) => {
//     if (!router.hasRoute(route.name)) {
//       router.addRoute(route)
//     }
//   })

//   // 最后添加404路由
//   router.addRoute({
//     path: '/:pathMatch(.*)*',
//     name: 'notFound',
//     redirect: '/404',
//   })

//   dynamicRoutesAdded = true
// }

// router.beforeEach(async (to, from, next) => {
//   if (!dynamicRoutesAdded) {
//     await addDynamicRoutes()
//     // 动态路由添加完成后，重定向到原始目标路径
//     next(to.fullPath === '/' ? { path: to.fullPath, replace: true } : { ...to, replace: true })
//     return
//   }
//   next()
// })
export default router
