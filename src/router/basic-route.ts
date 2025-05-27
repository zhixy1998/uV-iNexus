import { defineAsyncComponent } from 'vue'
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
    name: 'home',
    meta: {
      title: '首页',
    },
    redirect: '/home',
    component: defineAsyncComponent(() => import('@/views/PageLayoutView.vue')),
    children: [
      {
        path: 'home',
        component: defineAsyncComponent(() => import('@/views/HomeView.vue')),
      },
      {
        path: 'powercheck',
        name: 'powercheck',
        component: defineAsyncComponent(() => import('@/views/instrument/PowerCheck.vue')),
        meta: {
          title: '开机自检',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404.vue'),
  },
]
