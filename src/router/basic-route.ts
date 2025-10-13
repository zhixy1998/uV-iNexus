import HomeView from '@/views/HomeView.vue'
import PageLayoutView from '@/views/PageLayoutView.vue'
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
    component: PageLayoutView,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
        meta: {
          title: '首页',
        },
      },
      // 仪器管理
      {
        path: 'instrument',
        meta: {
          title: '仪器管理',
        },
        children: [
          // 开机自检
          {
            path: 'instrumentHome',
            name: 'instrumentHome',
            component: () => import('@/views/instrument/instrumentHome.vue'),
            meta: {
              title: '仪器',
            },
          },
          {
            path: 'selfInspection',
            name: 'selfInspection',
            component: () => import('@/views/instrument/selfInspection/index.vue'),
            meta: {
              title: '开机自检',
            },
          },
          {
            path: 'instrumentConfig',
            name: 'instrumentConfig',
            component: () => import('@/views/instrument/instrumentConfig/index.vue'),
            meta: {
              title: '仪器配置',
            },
          },
          {
            path: 'autolabConfig',
            name: 'autolabConfig',
            component: () => import('@/views/instrument/autolabConfig/index.vue'),
            meta: {
              title: '自动进样器配置',
            },
            children: [
              {
                path: 'paramDiskConfig',
                name: 'paramDiskConfig',
                component: () => import('@/views/instrument/autolabConfig/paramDiskConfig.vue'),
                meta: {
                  title: '进样器参数盘配置',
                },
              },
            ],
          },
          {
            path: 'instrumentCalibration',
            name: 'instrumentCalibration',
            component: () => import('@/views/instrument/instrumentCalibration/index.vue'),
            meta: {
              title: '仪器校准',
            },
          },
          {
            path: 'historicalTask',
            name: 'historicalTask',
            component: () => import('@/views/instrument/historicalTask/index.vue'),
            meta: {
              title: '历史检测任务',
            },
          },
          {
            path: 'usageStatisticsDetail',
            name: 'usageStatisticsDetail',
            component: () => import('@/views/instrument/usageStatisticsDetail.vue'),
            meta: {
              title: '仪器使用统计',
              hidden: true,
            },
          },
        ],
      },
      // 实验测试
      {
        path: 'experiment',
        meta: {
          title: '实验测试',
        },
        redirect: '/experiment/experimentTest',
        children: [
          // 实验测试
          {
            path: 'experimentTest',
            name: 'experimentTest',
            component: () => import('@/views/experiment/experimentTest/index.vue'),
            meta: {
              title: '首页',
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
