export const basicRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
    },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/PageLayoutView.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
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
            component: () => import('@/views/instrument/Powercheck.vue'),
            meta: {
              title: '开机自检',
            },
          },
          // 自动进样器配置及其子路由
          {
            path: 'autolabconfig',
            name: 'autolabconfig',
            component: () => import('@/views/instrument/Autolabconfig.vue'),
            meta: {
              title: '自动进样器配置',
            },
            children: [
              {
                path: 'injectpanelconfig',
                name: 'injectpanelconfig',
                component: () => import('@/views/instrument/Injectpanelconfig.vue'),
                meta: {
                  title: '进样器参数盘配置',
                },
              },
            ],
          },
        ],
      },
      // 实验测试
      {
        path: 'experiment',
        meta: {
          title: '实验管理',
        },
        children: [
          // 实验测试
          {
            path: 'experimentTest',
            name: 'experimentTest',
            component: () => import('@/views/experiment/experimentTest/index.vue'),
            meta: {
              title: '实验测试',
            },
          },
          {
            path: 'lumneScence',
            name: 'lumneScence',
            component: () => import('@/views/experiment/lumneScence/index.vue'),
            meta: {
              title: '光度测量',
            },
          },
          {
            path: 'quantityDetermind',
            name: 'quantityDetermind',
            component: () => import('@/views/experiment/quantityDetermind/index.vue'),
            meta: {
              title: '定量测定',
            },
          },
          {
            path: 'spectralScan',
            name: 'spectralScan',
            component: () => import('@/views/experiment/spectralScan/index.vue'),
            meta: {
              title: '光谱扫描',
            },
          },
          {
            path: 'timeScan',
            name: 'timeScan',
            component: () => import('@/views/experiment/timeScan/index.vue'),
            meta: {
              title: '时间扫描',
            },
          },
          {
            path: 'twoComponentMeasure',
            name: 'twoComponentMeasure',
            component: () => import('@/views/experiment/twoComponentMeasure/index.vue'),
            meta: {
              title: '双分组测量',
            },
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
