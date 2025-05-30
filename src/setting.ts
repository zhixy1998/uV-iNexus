export const defaultPrimaryColor = '#316C72'
export const naiveThemeOverrides = {
  token: {
    colorPrimary: '#0038a8',
  },
}
export const realMenus = [
  {
    label: '首页',
    key: '/home',
  },
  {
    label: '仪器管理',
    key: '/instrument',
    children: [
      { label: '开机自检', key: '/instrument/powercheck' },
      // { label: '仪器配置', key: '/instrument/instrumentconfig' },
      {
        label: '自动进样器配置',
        key: '/instrument/autolabconfig',
        name: 'injectpanelconfig',
        children: [
          { label: '进样器参数盘配置', key: '/instrument/autolabconfig/injectpanelconfig' },
        ],
      },
    ],
  },
  {
    label: '实验管理',
    key: '/experiment',
    children: [
      { label: '实验测试', key: '/experiment/experimentTest' },
      { label: '光度测量', key: '/experiment/lumneScence' },
      { label: '定量测定', key: '/experiment/quantityDetermind' },
      { label: '光谱扫描', key: '/experiment/spectralScan' },
      { label: '时间扫描', key: '/experiment/timeScan' },
      { label: '双分组测量', key: '/experiment/twoComponentMeasure' },
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
