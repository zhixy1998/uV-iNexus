export const defaultPrimaryColor = '#316C72'
export const naiveThemeOverrides = {
  token: {
    colorPrimary: '#0038a8',
  },
}
const breadcrumbs = [
  {
    label: '仪器管理',
    key: '/instrument',
  },
  {
    label: '自动进样器配置',
    key: '/instrument/autolabConfig',
  },
  {
    label: '进样器参数盘配置',
    key: '/instrument/autolabConfig/paramDiskConfig',
  },
]
const menusYuan = [
  {
    label: '仪器管理',
    key: '/instrument',
    icon: 'user',
    children: [
      {
        label: '自动进样器配置',
        key: '/instrument/autolabConfig',
        children: [
          {
            label: '进样器参数盘配置',
            key: '/instrument/autolabConfig/paramDiskConfig',
            icon: 'file',
          },
        ],
      },
    ],
  },
]
export const realMenus = [
  {
    label: '首页',
    key: '/home',
    icon: 'dashboard',
  },
  {
    label: '仪器管理',
    key: '/instrument',
    icon: 'user',
    children: [
      { label: '仪器', key: '/instrument/instrumentHome', icon: 'file' },
      { label: '开机自检', key: '/instrument/selfInspection', icon: 'file' },
      { label: '仪器配置', key: '/instrument/instrumentConfig', icon: 'file' },
      {
        label: '自动进样器配置',
        key: '/instrument/autolabConfig',
        children: [
          {
            label: '进样器参数盘配置',
            key: '/instrument/autolabConfig/paramDiskConfig',
            icon: 'file',
          },
        ],
      },
      {
        label: '仪器校准',
        key: '/instrument/instrumentCalibration',
        icon: 'file',
      },
      {
        label: '历史检测任务',
        key: '/instrument/historicalTask',
        icon: 'file',
      },
    ],
  },
  {
    label: '实验测试',
    key: '/experiment/experimentTest',
    icon: 'team',
    children: [
      { label: '光度测量', key: '/experiment/lumneScence', icon: 'file' },
      { label: '定量测定', key: '/experiment/quantityDetermind', icon: 'file' },
      { label: '光谱扫描', key: '/experiment/spectralScan', icon: 'file' },
      { label: '时间扫描', key: '/experiment/timeScan', icon: 'file' },
      { label: '双分组测量', key: '/experiment/twoComponentMeasure', icon: 'file' },
    ],
  },
]
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
