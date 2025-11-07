/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import HomeView from '@/views/HomeView.vue'
import PageLayoutView from '@/views/PageLayoutView.vue'
export const basicRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录页',
      noAuth: true,
    },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/',
    redirect: '/instrument/instrumentHome',
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
        redirect: '/instrument/instrumentHome',
        children: [
          // 开机初始化
          {
            path: 'instrumentHome',
            name: 'instrumentHome',
            component: () => import('@/views/instrument/instrumentHome.vue'),
            meta: {
              title: '首页',
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
          },
          {
            path: 'instrumentCalibration',
            name: 'instrumentCalibration',
            component: () => import('@/views/instrument/instrumentCalibration/index.vue'),
            meta: {
              title: '仪器校正',
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
            },
          },
          {
            path: 'historicalTaskDetail',
            name: 'historicalTaskDetail',
            component: () => import('@/views/instrument/historicalTask/historyDetail.vue'),
            meta: {
              title: '检测任务详细信息',
              hidden: true,
            },
          },
          {
            path: 'softwareActivation',
            name: 'softwareActivation',
            component: () => import('@/views/instrument/softwareActivation/index.vue'),
            meta: {
              title: '软件激活',
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
        // redirect: '/experiment/experimentTest',
        redirect: '/experiment/methodOptimizationHome',
        children: [
          // // 实验测试 - 首页
          // {
          //   path: 'experimentTest',
          //   name: 'experimentTest',
          //   component: () => import('@/views/experiment/experimentTest/newIndex.vue'),
          //   meta: {
          //     title: '首页',
          //   },
          // },
          // // 实验测试 - 经典模式
          // {
          //   path: 'simpleMode',
          //   name: 'simpleMode',
          //   component: () => import('@/views/experiment/simpleMode/index.vue'), // 需按实际路径创建组件文件
          //   meta: {
          //     title: '经典模式',
          //   },
          // },
          {
            path: 'methodOptimizationHome',
            name: 'methodOptimizationHome',
            component: () => import('@/views/methodOptimization/index.vue'),
            meta: {
              title: '经典模式',
            },
          },
          // // 实验测试 - 向导模式（含子菜单）
          // {
          //   path: 'wizardMode',
          //   name: 'wizardMode',
          //   meta: {
          //     title: '向导模式',
          //   },
          //   // redirect: '/experiment/wizardMode',
          //   redirect: '/experiment/quantityDetermind',
          //   children: [
          //     // {
          //     //   path: 'wizardModeHome',
          //     //   name: 'wizardModeHome',
          //     //   component: () => import('@/views/experiment/wizardModeHome/index.vue'),
          //     //   meta: {
          //     //     title: '首页',
          //     //   },
          //     // },
          //     {
          //       path: 'lumneScence',
          //       name: 'lumneScence',
          //       component: () => import('@/views/experiment/lumneScence/index.vue'),
          //       meta: {
          //         title: '光度测量',
          //       },
          //     },
          //     {
          //       path: 'quantityDetermind',
          //       name: 'quantityDetermind',
          //       component: () => import('@/views/experiment/quantityDetermind/index.vue'), // 需按实际路径创建组件文件
          //       meta: {
          //         title: '定量测定',
          //       },
          //     },
          //     {
          //       path: 'timeScan',
          //       name: 'timeScan',
          //       component: () => import('@/views/experiment/timeScan/index.vue'),
          //       meta: {
          //         title: '时间扫描',
          //       },
          //     },
          //     {
          //       path: 'spectralScan',
          //       name: 'spectralScan',
          //       component: () => import('@/views/experiment/spectralScan/index.vue'),
          //       meta: {
          //         title: '光谱扫描',
          //       },
          //     },
          //     {
          //       path: 'twoComponentMeasure',
          //       name: 'twoComponentMeasure',
          //       component: () => import('@/views/experiment/twoComponentMeasure/index.vue'), // 需按实际路径创建组件文件
          //       meta: {
          //         title: '双组份定量分析',
          //       },
          //     },
          //   ],
          // },
          // // 实验测试 - 数据管理（含子菜单）
          // {
          //   path: 'dataManagement',
          //   name: 'dataManagement',
          //   meta: {
          //     title: '数据管理',
          //   },
          //   // redirect: '/experiment/dataManagement/dataManagementHome',
          //   redirect: '/experiment/methodManagement',
          //   children: [
          //     // {
          //     //   path: 'dataManagementHome',
          //     //   name: 'dataManagementHome',
          //     //   component: () => import('@/views/experiment/dataManagementHome/index.vue'),
          //     //   meta: {
          //     //     title: '首页',
          //     //   },
          //     // },
          //     {
          //       path: 'methodManagement',
          //       name: 'methodManagement',
          //       component: () => import('@/views/experiment/methodManagement/index.vue'), // 需按实际路径创建组件文件
          //       meta: {
          //         title: '方法管理',
          //       },
          //     },
          //     {
          //       path: 'taskManagement',
          //       name: 'taskManagement',
          //       component: () => import('@/views/experiment/taskManagement/index.vue'), // 需按实际路径创建组件文件
          //       meta: {
          //         title: '任务管理',
          //       },
          //     },
          //     {
          //       path: 'projectManagement',
          //       name: 'projectManagement',
          //       component: () => import('@/views/experiment/projectManagement/index.vue'), // 需按实际路径创建组件文件
          //       meta: {
          //         title: '项目管理',
          //       },
          //     },
          //     {
          //       path: 'viewHistoryUVWi',
          //       name: 'viewHistoryUVWi',
          //       component: () => import('@/views/experiment/viewHistoryUVWin/index.vue'), // 需按实际路径创建组件文件，名称可按需调整
          //       meta: {
          //         title: '查看历史UVWin查看工具',
          //       },
          //     },
          //   ],
          // },
        ],
      },
      {
        path: 'debugTool',
        meta: {
          title: '调试工具',
        },
        redirect: '/debugTool/debugToolHome',
        children: [
          {
            path: 'debugToolHome',
            name: 'debugToolHome',
            component: () => import('@/views/debugTool/debugToolHome/index.vue'),
            meta: {
              title: '首页',
            },
          },
          {
            path: 'devDebugTool',
            name: 'devDebugTool',
            component: () => import('@/views/debugTool/devDebugTool/index.vue'),
            meta: {
              title: '开发调试工具',
            },
          },
          {
            path: 'prodLineTool',
            name: 'prodLineTool',
            component: () => import('@/views/debugTool/prodLineTool/index.vue'), // 组件路径按需改
            meta: {
              title: '产线生产工具',
            },
          },
        ],
      },
      {
        path: 'factoryInspection',
        meta: {
          title: '出厂检验',
        },
        redirect: '/factoryInspection/factoryInspectionHome',
        children: [
          {
            path: 'factoryInspectionHome',
            name: 'factoryInspectionHome',
            component: () => import('@/views/factoryInspection/factoryInspectionHome/index.vue'), // 组件路径按需调整
            meta: {
              title: '首页',
            },
          },
          {
            path: 'factoryInspectionTemplateManage',
            name: 'factoryInspectionTemplateManage',
            component: () =>
              import('@/views/factoryInspection/factoryInspectionTemplateManage/index.vue'), // 组件路径按需改
            meta: {
              title: '出厂检验模板管理',
            },
          },
        ],
      },
      {
        path: 'unboxingInspection',
        meta: {
          title: '开箱检验',
        },
        redirect: '/unboxingInspection/unboxingInspectionHome',
        children: [
          {
            path: 'unboxingInspectionHome',
            name: 'unboxingInspectionHome',
            component: () => import('@/views/unboxingInspection/index.vue'),
            meta: {
              title: '首页',
            },
          },
        ],
      },
      {
        path: 'convenientRepair',
        meta: {
          title: '便捷维修',
        },
        redirect: '/convenientRepair/convenientRepairHome',
        children: [
          {
            path: 'convenientRepairHome',
            name: 'convenientRepairHome',
            component: () => import('@/views/convenientRepair/convenientRepairHome/index.vue'), // 组件路径按需调整
            meta: {
              title: '首页',
            },
          },
          {
            path: 'instrumentMonitor',
            name: 'instrumentMonitor',
            component: () => import('@/views/convenientRepair/instrumentMonitor/index.vue'), // 组件路径按需改
            meta: {
              title: '仪器状态监测',
            },
          },
          {
            path: 'customerGuide',
            name: 'customerGuide',
            component: () => import('@/views/convenientRepair/customerGuide/index.vue'), // 组件路径按需改
            meta: {
              title: '客户向导',
            },
          },
          {
            path: 'repairPersonGuide',
            name: 'repairPersonGuide',
            component: () => import('@/views/convenientRepair/repairPersonGuide/index.vue'), // 组件路径按需改
            meta: {
              title: '维修人员向导',
            },
          },
        ],
      },
      {
        path: 'verificationCalibration',
        meta: {
          title: '检定校准',
        },
        redirect: '/verificationCalibration/verificationCalibrationHome',
        children: [
          {
            path: 'verificationCalibrationHome',
            name: 'verificationCalibrationHome',
            component: () =>
              import('@/views/verificationCalibration/verificationCalibrationHome/index.vue'), // 组件路径按需调整
            meta: {
              title: '首页',
            },
          },
          {
            path: 'verification',
            name: 'verification',
            component: () => import('@/views/verificationCalibration/verification/index.vue'), // 组件路径按需改
            meta: {
              title: '检定',
            },
          },
          {
            path: 'calibration',
            name: 'calibration',
            component: () => import('@/views/verificationCalibration/calibration/index.vue'), // 组件路径按需改
            meta: {
              title: '校准',
            },
          },
          {
            path: 'periodicCheck',
            name: 'periodicCheck',
            component: () => import('@/views/verificationCalibration/periodicCheck/index.vue'), // 组件路径按需改
            meta: {
              title: '期间核查',
            },
          },
        ],
      },
      // 方法调优
      // {
      //   path: 'methodOptimization',
      //   meta: {
      //     title: '方法调优',
      //   },
      //   redirect: '/methodOptimization/methodOptimizationHome',
      //   children: [
      //     {
      //       path: 'methodOptimizationHome',
      //       name: 'methodOptimizationHome',
      //       component: () => import('@/views/methodOptimization/index.vue'),
      //       meta: {
      //         title: '首页',
      //       },
      //     },
      //   ],
      // },
      {
        path: 'reportDesign',
        meta: {
          title: '报告设计',
        },
        redirect: '/reportDesign/reportDesignHome',
        children: [
          {
            path: 'reportDesignHome',
            name: 'reportDesignHome',
            component: () => import('@/views/reportDesign/reportDesignHome.vue'),
            meta: {
              title: '首页',
            },
          },
          {
            path: 'reportTemplateDesign',
            name: 'reportTemplateDesign',
            component: () => import('@/views/reportDesign/reportTemplateDesign/index.vue'),
            meta: {
              title: '报告模板设计',
            },
          },
          {
            path: 'standardTemplateDesign',
            name: 'standardTemplateDesign',
            component: () => import('@/views/reportDesign/standardTemplateDesign/index.vue'),
            meta: {
              title: '校准模板设计',
            },
          },
          {
            path: 'installTemplateDesign',
            name: 'installTemplateDesign',
            component: () => import('@/views/reportDesign/installTemplateDesign/index.vue'),
            meta: {
              title: '安装验收模板设计',
            },
          },
          {
            path: 'templateEdit',
            name: 'templateEdit',
            component: () => import('@/views/reportDesign/templateEdit/index.vue'),
            meta: {
              title: '模板编辑',
            },
          },
        ],
      },
      {
        path: 'noticeManage',
        meta: {
          title: '通知管理',
        },
        redirect: '/noticeManage/noticeManageHome',
        children: [
          {
            path: 'noticeManageHome',
            name: 'noticeManageHome',
            component: () => import('@/views/noticeManage/index.vue'),
            meta: {
              title: '首页',
            },
          },
        ],
      },
      {
        path: 'systemManage',
        meta: {
          title: '系统管理',
        },
        redirect: '/systemManage/systemManageHome',
        children: [
          {
            path: 'systemManageHome',
            name: 'systemManageHome',
            component: () => import('@/views/systemManage/systemManageHome.vue'),
            meta: {
              title: '首页',
            },
          },
          {
            path: 'panelConfig',
            name: 'panelConfig',
            component: () => import('@/views/systemManage/panelConfig/index.vue'),
            meta: {
              title: '系统面板配置',
            },
          },
          {
            path: 'manageConfig',
            name: 'manageConfig',
            component: () => import('@/views/systemManage/manageConfig/index.vue'),
            meta: {
              title: '系统管理配置',
            },
          },
          {
            path: 'databaseConfig',
            name: 'databaseConfig',
            component: () => import('@/views/systemManage/databaseConfig/index.vue'),
            meta: {
              title: '数据库配置',
            },
          },
          {
            path: 'logManage',
            name: 'logManage',
            component: () => import('@/views/systemManage/logManage/index.vue'),
            meta: {
              title: '系统日志管理',
            },
          },
          {
            path: 'stepDelete',
            name: 'stepDelete',
            component: () => import('@/views/systemManage/stepDelete/index.vue'),
            meta: {
              title: '算法配置',
            },
          },
          {
            path: 'serviceParameters',
            name: 'serviceParameters',
            component: () => import('@/views/systemManage/serviceParameters/index.vue'),
            meta: {
              title: '业务参数配置',
            },
          },
        ],
      },
      {
        path: 'standardManage',
        meta: {
          title: '标准管理',
        },
        redirect: '/standardManage/standardManageHome',
        children: [
          {
            path: 'standardManageHome',
            name: 'standardManageHome',
            component: () => import('@/views/standardManage/standardManageHome.vue'),
            meta: {
              title: '首页',
            },
          },
        ],
      },
      {
        path: 'userManage',
        meta: {
          title: '用户管理',
        },
        redirect: '/userManage/userManageHome',
        children: [
          {
            path: 'userManageHome',
            name: 'userManageHome',
            component: () => import('@/views/userManage/userManageHome/index.vue'),
            meta: {
              title: '首页',
            },
          },
          // {
          //   path: 'systemUserManage',
          //   name: 'systemUserManage',
          //   component: () => import('@/views/userManage/catEditUser/index.vue'),
          //   meta: {
          //     title: '系统用户管理',
          //   },
          // },
          // {
          //   path: 'productLineManage',
          //   name: 'productLineManage',
          //   component: () => import('@/views/userManage/catEditUser/index.vue'),
          //   meta: {
          //     title: '产线用户管理',
          //   },
          // },
          {
            path: 'catEditUser',
            name: 'catEditUser',
            meta: {
              title: '用户管理',
            },
            component: () => import('@/views/userManage/catEditUser/index.vue'),

            // redirect: '/userManage/userManage/catEditUser',
            // children: [
            //   {
            //     path: 'rightManageHome',
            //     name: 'rightManageHome',
            //     component: () => import('@/views/userManage/catEditUser/index.vue'),
            //     meta: {
            //       title: '用户权限管理',
            //     },
            //   },
            //   {
            //     path: 'catEditUser',
            //     name: 'catEditUser',
            //     component: () => import('@/views/userManage/catEditUser/index.vue'),
            //     meta: {
            //       title: '查看编辑用户',
            //     },
            //   },
            // ],
          },
        ],
      },
      {
        path: 'designPattern',
        meta: {
          title: '设计模式',
        },
        redirect: '/designPattern/designPatternHome',
        children: [
          {
            path: 'designPatternHome',
            name: 'designPatternHome',
            component: () => import('@/views/designPattern/designPatternHome/index.vue'), // 组件路径按需调整
            meta: {
              title: '首页',
            },
          },
          {
            path: 'partDesign',
            name: 'partDesign',
            meta: {
              title: '部件设计',
            },
            redirect: '/designPattern/partDesign/createPart',
            children: [
              {
                path: 'createPart',
                name: 'createPart',
                component: () => import('@/views/designPattern/partDesign/createPart/index.vue'), // 组件路径按需调整
                meta: {
                  title: '创建部件',
                },
              },
              {
                path: 'modifyPart',
                name: 'modifyPart',
                component: () => import('@/views/designPattern/partDesign/modifyPart/index.vue'), // 组件路径按需调整
                meta: {
                  title: '修改部件',
                },
              },
            ],
          },
          {
            path: 'processDesign',
            name: 'processDesign',
            meta: {
              title: '流程设计',
            },
            redirect: '/designPattern/processDesign/createProcess',
            children: [
              {
                path: 'createProcess',
                name: 'createProcess',
                component: () =>
                  import('@/views/designPattern/processDesign/createProcess/index.vue'), // 组件路径按需调整
                meta: {
                  title: '创建流程',
                },
              },
              {
                path: 'modifyProcess',
                name: 'modifyProcess',
                component: () =>
                  import('@/views/designPattern/processDesign/modifyProcess/index.vue'), // 组件路径按需调整
                meta: {
                  title: '修改流程',
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
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error-page/403.vue'),
  },
  {
    path: '/welcome',
    name: 'welcome',
    meta: {
      title: '欢迎页',
      noAuth: true,
    },
    component: () => import('@/views/welcome/index.vue'),
  },
]
