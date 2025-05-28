import { defineAsyncComponent } from 'vue'
// export const basicRoutes = [
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: '登录页',
//     },
//     component: defineAsyncComponent(() => import('@/views/LoginView.vue')),
//   },
//   {
//     path: '/',
//     name: 'home',
//     meta: {
//       title: '首页',
//     },
//     redirect: '/home',
//     component: defineAsyncComponent(() => import('@/views/PageLayoutView.vue')),
//     children: [
//       {
//         path: 'home',
//         component: defineAsyncComponent(() => import('@/views/HomeView.vue')),
//       },
//       {
//         path: 'powercheck',
//         name: 'powercheck',
//         component: defineAsyncComponent(() => import('@/views/instrument/PowerCheck.vue')),
//         meta: {
//           title: '开机自检',
//         },
//       },
//     ],
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'notFound',
//     redirect: '/404',
//   },
//   {
//     path: '/404',
//     name: '404',
//     component: () => import('@/views/error-page/404.vue'),
//   },
// ]
export const basicRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
    },
    component: defineAsyncComponent(() => import('@/views/LoginView.vue')),
  },
  {
    path: '/',
    redirect: '/home',
    component: defineAsyncComponent(() => import('@/views/PageLayoutView.vue')),
    children: [
      {
        path: 'home',
        name: 'home',
        component: defineAsyncComponent(() => import('@/views/HomeView.vue')),
        meta: {
          title: '首页',
        },
      },
      // 仪器管理路由组
      {
        path: 'instrument',
        meta: {
          title: '仪器管理',
        },
        children: [
          // 开机自检
          {
            path: 'powercheck',
            name: 'powercheck',
            component: defineAsyncComponent(() => import('@/views/instrument/Powercheck.vue')),
            meta: {
              title: '开机自检',
            },
          },
          // 自动进样器配置及其子路由
          {
            path: 'autolabconfig',
            name: 'autolabconfig',
            component: defineAsyncComponent(() => import('@/views/instrument/Autolabconfig.vue')),
            meta: {
              title: '自动进样器配置',
            },
            children: [
              {
                path: 'injectpanelconfig',
                name: 'injectpanelconfig',
                component: defineAsyncComponent(
                  () => import('@/views/instrument/Injectpanelconfig.vue'),
                ),
                meta: {
                  title: '进样器参数盘配置',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 404路由
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
  },
]
