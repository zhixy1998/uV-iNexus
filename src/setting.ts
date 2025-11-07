/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// export const defaultPrimaryColor = '#0038a8'
export const defaultPrimaryColor = '#153471'
export const USE_BACKEND_ROUTES = true // 是否使用后端路由: true-使用后端路由，false-使用前端路由

export const naiveThemeOverrides = {
  token: {
    // 主色
    colorPrimary: defaultPrimaryColor,
    colorInfo: defaultPrimaryColor,
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',

    // 文字
    colorText: 'rgba(0, 0, 0, 0.88)', // 提高对比度
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',

    // 边框
    colorBorder: 'rgba(0, 0, 0, 0.12)', // 半透明边框
    colorBorderSecondary: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 8, // 更大的圆角
    borderRadiusSM: 6,
    borderRadiusLG: 12,

    // 背景
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBgElevated: '#ffffff',

    // 字体
    fontFamily: `'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    fontSize: 14,

    // 阴影
    boxShadow:
      '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  },
}
export const realMenus = [
  {
    label: 'menu.instrumentManage', // 国际化键
    key: '/instrument/instrumentHome',
    name: 'instrumentHome', //判断权限加上名称
    icon: 'icon-instrumentManage',
    defaultIcon: 'icon-instrumentManage',
    selectedIcon: 'icon-instrumentManage-selected',
    children: [
      {
        label: 'menu.instrumentConfig', // 国际化键
        key: '/instrument/instrumentConfig',
        name: 'instrumentConfig',
        icon: 'icon-instrumentConfig',
      },
      {
        label: 'menu.autolabConfig', // 国际化键
        key: '/instrument/autolabConfig',
        name: 'autolabConfig',
        icon: 'icon-sampleInjectorConfig',
      },
      {
        label: 'menu.instrumentCalibration', // 国际化键
        key: '/instrument/instrumentCalibration',
        name: 'instrumentCalibration',
        icon: 'icon-instrumentCalibration',
      },
      {
        label: 'menu.historicalTask', // 国际化键
        key: '/instrument/historicalTask',
        name: 'historicalTask',
        icon: 'icon-historyTask',
      },
      {
        label: 'menu.usageStatisticsDetail', // 国际化键
        key: '/instrument/usageStatisticsDetail',
        name: 'usageStatisticsDetail',
        icon: 'icon-useStatistics',
      },
      {
        label: 'menu.historicalTaskDetail', // 国际化键
        key: '/instrument/historicalTaskDetail',
        name: 'historicalTaskDetail',
        icon: 'file',
        hidden: true,
      },
      {
        label: 'menu.softwareActivation', // 国际化键
        key: '/instrument/softwareActivation',
        name: 'softwareActivation',
        icon: 'icon-useStatistics',
        // hidden: true,
      },
    ],
  },
  {
    // label: 'menu.experimentTest', // 国际化键
    // key: '/experiment/experimentTest',
    // name: 'experimentTest',
    label: 'menu.methodOptimizationHome', // 国际化键
    key: '/experiment/methodOptimizationHome',
    name: 'methodOptimizationHome',
    icon: 'icon-kasong',
    defaultIcon: 'icon-kasong',
    selectedIcon: 'icon-kasong-selected',
    // children: [
    //   {
    //     label: 'menu.methodOptimizationHome', // 国际化键
    //     key: '/experiment/methodOptimizationHome',
    //     name: 'methodOptimizationHome',
    //     icon: 'icon-databaseConfig',
    //   },
    //   {
    //     label: 'menu.wizardModeHome', // 国际化键
    //     // key: '/experiment/wizardMode/wizardModeHome',
    //     // name: 'wizardModeHome',
    //     key: '/experiment/wizardMode/quantityDetermind',
    //     name: 'quantityDetermind',
    //     icon: 'icon-logManage',
    //     children: [
    //       {
    //         label: 'menu.lumneScence',
    //         key: '/experiment/wizardMode/lumneScence',
    //         name: 'lumneScence',
    //         icon: 'icon-ziwaifenguangguangduji',
    //       },
    //       {
    //         label: 'menu.quantityDetermind',
    //         key: '/experiment/wizardMode/quantityDetermind',
    //         name: 'quantityDetermind',
    //         icon: 'icon-jiliangguan',
    //       },
    //       {
    //         label: 'menu.spectralScan',
    //         key: '/experiment/wizardMode/spectralScan',
    //         name: 'spectralScan',
    //         icon: 'icon-yongdianbofeng',
    //       },
    //       {
    //         label: 'menu.timeScan',
    //         key: '/experiment/wizardMode/timeScan',
    //         name: 'timeScan',
    //         icon: 'icon-border-importing-in',
    //       },
    //       {
    //         label: 'menu.twoComponentMeasure', // 国际化键
    //         key: '/experiment/wizardMode/twoComponentMeasure',
    //         name: 'twoComponentMeasure',
    //         icon: 'icon-fayuanrenyuantongji',
    //       },
    //     ],
    //   },
    //   {
    //     label: 'menu.dataManagementHome', // 国际化键
    //     // key: '/experiment/dataManagement/dataManagementHome',
    //     // name: 'dataManagementHome',
    //     key: '/experiment/dataManagement/methodManagement',
    //     name: 'methodManagement',
    //     icon: 'icon-databaseConfig',
    //     children: [
    //       {
    //         label: 'menu.methodManagement',
    //         key: '/experiment/dataManagement/methodManagement',
    //         name: 'methodManagement',
    //         icon: 'icon-databaseConfig',
    //       },
    //       {
    //         label: 'menu.taskManagement',
    //         key: '/experiment/dataManagement/taskManagement',
    //         name: 'taskManagement',
    //         icon: 'icon-jiliangguan',
    //       },
    //       {
    //         label: 'menu.projectManagement',
    //         key: '/experiment/dataManagement/projectManagement',
    //         name: 'projectManagement',
    //         icon: 'icon-yongdianbofeng',
    //       },
    //       {
    //         label: 'menu.viewHistoryUVWinTool',
    //         key: '/experiment/dataManagement/viewHistoryUVWi',
    //         name: 'viewHistoryUVWi',
    //         icon: 'icon-border-importing-in',
    //       },
    //     ],
    //   },
    // ],
  },
  // 调试工具
  {
    label: 'menu.debugTool', // 国际化键
    key: '/debugTool/debugToolHome',
    name: 'debugToolHome',
    icon: 'icon-tiaoshigongju',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.devDebugTool', // 国际化键
        key: '/debugTool/devDebugTool',
        name: 'devDebugTool',
        icon: 'icon-kaifatiaoshigongju',
      },
      {
        label: 'menu.prodLineTool', // 国际化键
        key: '/debugTool/prodLineTool',
        name: 'prodLineTool',
        icon: 'icon-chanxianshengchangongju',
      },
    ],
  },
  // 出厂检验
  {
    label: 'menu.factoryInspection', // 国际化键
    key: '/factoryInspection/factoryInspectionHome',
    name: 'factoryInspectionHome',
    icon: 'icon-chuchangjianyan',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.factoryInspectionTemplateManage', // 国际化键
        key: '/factoryInspection/factoryInspectionTemplateManage',
        name: 'factoryInspectionTemplateManage',
        icon: 'icon-chuchangjianyanmoban',
      },
    ],
  },
  // 开箱检验
  {
    label: 'menu.unboxingInspection', // 国际化键
    key: '/unboxingInspection/unboxingInspectionHome',
    name: 'unboxingInspectionHome',
    icon: 'icon-kaixiangjianyan',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
  },
  // 便捷维修
  {
    label: 'menu.convenientRepair', // 国际化键
    key: '/convenientRepair/convenientRepairHome',
    name: 'convenientRepairHome',
    icon: 'icon-bianjieweixiu',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.instrumentMonitor', // 国际化键
        key: '/convenientRepair/instrumentMonitor',
        name: 'instrumentMonitor',
        icon: 'icon-yiqizhuangtaijiance',
      },
      {
        label: 'menu.customerGuide', // 国际化键
        key: '/convenientRepair/customerGuide',
        name: 'customerGuide',
        icon: 'icon-kehuxiangdao',
      },
      {
        label: 'menu.repairPersonGuide', // 国际化键
        key: '/convenientRepair/repairPersonGuide',
        name: 'repairPersonGuide',
        icon: 'icon-weixiurenyuanxiangdao',
      },
    ],
  },
  // 检定校准
  {
    label: 'menu.verificationCalibration', // 国际化键
    key: '/verificationCalibration/verificationCalibrationHome',
    name: 'verificationCalibrationHome',
    icon: 'icon-jiandingxiaozhun',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.verification', // 国际化键
        key: '/verificationCalibration/verification',
        name: 'verification',
        icon: 'icon-jianding',
      },
      {
        label: 'menu.calibration', // 国际化键
        key: '/verificationCalibration/calibration',
        name: 'calibration',
        icon: 'icon-xiaozhun',
      },
      {
        label: 'menu.periodicCheck', // 国际化键
        key: '/verificationCalibration/periodicCheck',
        name: 'periodicCheck',
        icon: 'icon-qijianhecha',
      },
    ],
  },
  // {
  //   label: 'menu.methodOptimization', // 方法调优
  //   key: '/methodOptimization/methodOptimizationHome',
  //   name: 'methodOptimizationHome',
  //   defaultIcon: 'icon-standardManage',
  //   selectedIcon: 'icon-standardManage-selected',
  // },
  {
    label: 'menu.reportDesign', // 国际化键
    key: '/reportDesign/reportDesignHome',
    name: 'reportDesignHome',
    icon: 'icon-reportDesign',
    defaultIcon: 'icon-reportDesign',
    selectedIcon: 'icon-reportDesign-selected',
    children: [
      {
        label: 'menu.reportTemplateDesign', // 国际化键
        key: '/reportDesign/reportTemplateDesign',
        name: 'reportTemplateDesign',
        icon: 'icon-reportTemplateDesign',
      },
      {
        label: 'menu.templateEdit', // 国际化键
        key: '/reportDesign/templateEdit',
        name: 'templateEdit',
        icon: 'icon-templateEdit',
      },
      {
        label: 'menu.standardTemplateDesign', // 国际化键
        key: '/reportDesign/standardTemplateDesign',
        name: 'standardTemplateDesign',
        icon: 'icon-standardTemplateDesign',
      },
      {
        label: 'menu.installTemplateDesign', // 国际化键
        key: '/reportDesign/installTemplateDesign',
        name: 'installTemplateDesign',
        icon: 'icon-installTemplateDesign',
      },
      {
        label: 'menu.templateEdit', // 国际化键
        key: '/reportDesign/templateEdit',
        icon: 'icon-templateEdit',
      },
    ],
  },
  // 通知管理
  {
    label: 'menu.noticeManage', // 国际化键
    key: '/noticeManage/noticeManageHome',
    name: 'noticeManageHome',
    icon: 'icon-tongzhiguanli',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
  },
  {
    label: 'menu.systemManage', // 国际化键
    key: '/systemManage/systemManageHome',
    name: 'systemManageHome',
    icon: 'icon-xitongguanli',
    defaultIcon: 'icon-systemManage',
    selectedIcon: 'icon-systemManage-selected',
    children: [
      {
        label: 'menu.panelConfig', // 国际化键
        key: '/systemManage/panelConfig',
        name: 'panelConfig',
        icon: 'icon-panelConfig',
      },
      {
        label: 'menu.manageConfig', // 国际化键
        key: '/systemManage/manageConfig',
        name: 'manageConfig',
        icon: 'icon-manageConfig',
      },
      {
        label: 'menu.databaseConfig', // 国际化键
        key: '/systemManage/databaseConfig',
        name: 'databaseConfig',
        icon: 'icon-databaseConfig',
      },
      {
        label: 'menu.logManage', // 国际化键
        key: '/systemManage/logManage',
        name: 'logManage',
        icon: 'icon-logManage',
      },
      {
        label: 'menu.stepDelete', // 国际化键
        key: '/systemManage/stepDelete',
        name: 'stepDelete',
        icon: 'icon-stepDelete',
      },
      {
        label: 'menu.serviceParameters', // 国际化键
        key: '/systemManage/serviceParameters',
        name: 'serviceParameters',
        icon: 'icon-serviceParameters',
      },
    ],
  },
  {
    label: 'menu.standardManage', // 国际化键
    key: '/standardManage/standardManageHome',
    name: 'standardManageHome',
    icon: 'icon-standardManage',
    defaultIcon: 'icon-standardManage',
    selectedIcon: 'icon-standardManage-selected',
  },
  {
    label: 'menu.userManage', // 国际化键
    key: '/userManage/userManageHome',
    name: 'userManageHome',
    icon: 'icon-yonghuguanli',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.userPermissionManage', // 国际化键
        key: '/userManage/catEditUser',
        name: 'catEditUser',
        icon: 'icon-xitongyonghuguanli',
      },
      // {
      //   label: 'menu.productionLineUserManage', // 国际化键
      //   key: '/userManage/catEditUser',
      //   name: 'productLineManage',
      //   icon: 'icon-databaseConfig',
      // },
      // {
      //   label: 'menu.userPermissionManage', // 国际化键
      //   key: '/userManage/catEditUser',
      //   name: 'catEditUser',
      //   icon: 'icon-logManage',
      //   // children: [
      //   //   {
      //   //     label: 'menu.userViewAndEdit', // 国际化键
      //   //     key: '/userManage/userRightManage/catEditUser',
      //   //     name: 'catEditUser',
      //   //     icon: 'icon-logManage',
      //   //   },
      //   // ],
      // },
    ],
  },
  // 设计模式
  {
    label: 'menu.designPattern', // 国际化键
    key: '/designPattern/designPatternHome',
    name: 'designPatternHome',
    icon: 'icon-shejimoshi',
    defaultIcon: 'icon-userManageHome',
    selectedIcon: 'icon-userManageHome-selected',
    children: [
      {
        label: 'menu.partDesign', // 国际化键
        key: '/designPattern/partDesign/createPart',
        name: 'partDesign',
        icon: 'icon-bujiansheji',
        children: [
          {
            label: 'menu.createPart', // 国际化键
            key: '/designPattern/partDesign/createPart',
            name: 'createPart',
            icon: 'icon-manageConfig',
          },
          {
            label: 'menu.modifyPart', // 国际化键
            key: '/designPattern/partDesign/modifyPart',
            name: 'modifyPart',
            icon: 'icon-manageConfig',
          },
        ],
      },
      {
        label: 'menu.processDesign', // 国际化键
        key: '/designPattern/processDesign/createProcess',
        name: 'processDesign',
        icon: 'icon-liuchengsheji',
        children: [
          {
            label: 'menu.createProcess', // 国际化键
            key: '/designPattern/processDesign/createProcess',
            name: 'createProcess',
            icon: 'icon-manageConfig',
          },
          {
            label: 'menu.modifyProcess', // 国际化键
            key: '/designPattern/processDesign/modifyProcess',
            name: 'modifyProcess',
            icon: 'icon-manageConfig',
          },
        ],
      },
    ],
  },
]

// export const realMenus = [
//   // {
//   //   label: '首页',
//   //   key: '/home',
//   //   icon: 'dashboard',
//   // },
//   {
//     label: '仪器管理',
//     key: '/instrument/instrumentHome',
//     icon: 'icon-instrumentManage',
//     children: [
//       {
//         label: '仪器配置',
//         key: '/instrument/instrumentConfig',
//         icon: 'icon-instrumentConfig',
//       },
//       {
//         label: '自动进样器配置',
//         key: '/instrument/autolabConfig',
//         icon: 'icon-sampleInjectorConfig',
//       },
//       {
//         label: '仪器校正',
//         key: '/instrument/instrumentCalibration',
//         icon: 'icon-instrumentCalibration',
//       },
//       {
//         label: '历史检测任务',
//         key: '/instrument/historicalTask',
//         icon: 'icon-historyTask',
//       },
//       {
//         label: '仪器使用统计',
//         key: '/instrument/usageStatisticsDetail',
//         icon: 'icon-useStatistics',
//       },
//       {
//         label: '检测任务详细信息',
//         key: '/instrument/historicalTaskDetail',
//         icon: 'file',
//         hidden: true,
//       },
//     ],
//   },
//   {
//     label: '实验测试',
//     key: '/experiment/experimentTest',
//     icon: 'icon-kasong',
//     children: [
//       { label: '光度测量', key: '/experiment/lumneScence', icon: 'icon-ziwaifenguangguangduji' },
//       { label: '定量测定', key: '/experiment/quantityDetermind', icon: 'icon-jiliangguan' },
//       { label: '光谱扫描', key: '/experiment/spectralScan', icon: 'icon-yongdianbofeng' },
//       { label: '时间扫描', key: '/experiment/timeScan', icon: 'icon-border-importing-in' },
//       {
//         label: '双分组测量',
//         key: '/experiment/twoComponentMeasure',
//         icon: 'icon-fayuanrenyuantongji',
//       },
//     ],
//   },
//   {
//     label: '报告设计',
//     key: '/reportDesign/reportDesignHome',
//     icon: 'icon-reportDesign',
//     children: [
//       {
//         label: '报告模板设计',
//         key: '/reportDesign/reportTemplateDesign',
//         icon: 'icon-reportTemplateDesign',
//       },
//       {
//         label: '模板编辑',
//         key: '/reportDesign/templateEdit',
//         icon: 'icon-templateEdit',
//       },
//       {
//         label: '校准模板设计',
//         key: '/reportDesign/standardTemplateDesign',
//         icon: 'icon-standardTemplateDesign',
//       },
//       {
//         label: '安装验收模板设计',
//         key: '/reportDesign/installTemplateDesign',
//         icon: 'icon-installTemplateDesign',
//       },
//     ],
//   },
//   {
//     label: '标准管理',
//     key: '/standardManage/standardManageHome',
//     icon: 'icon-standardManage',
//   },
// ]
// 角色表
const roles = [
  {
    id: 1,
    name: 'admin',
    description: '系统管理员',
    status: 1, // 1-启用 0-禁用
  },
]

// 权限表
const permissions = [
  {
    id: 1,
    code: 'system:user:add',
    name: '新增用户',
    type: 'button', // menu/button/api
    status: 1,
  },
]

// 菜单表
const menus = [
  {
    id: 1,
    parentId: 0, // 0表示一级菜单
    name: '系统管理',
    path: '/system',
    icon: 'Setting',
    sort: 1,
    visible: 1, // 1-显示 0-隐藏
  },
]

// 角色-权限关联表
const rolePermissions = [{ roleId: 1, permissionId: 1 }]

// 角色-菜单关联表
const roleMenus = [{ roleId: 1, menuId: 1 }]

// 菜单-权限关联表（可选）
const menuPermissions = [{ menuId: 1, permissionId: 1 }]
