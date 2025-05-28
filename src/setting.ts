export const defaultPrimaryColor = '#316C72'
export const naiveThemeOverrides = {
  common: {
    primaryColor: '#316C72FF',
    primaryColorHover: '#316C72E3',
    primaryColorPressed: '#2B4C59FF',
    primaryColorSuppl: '#316C72E3',
  },
}
export const defaultMenus = [
  {
    label: '基础功能',
    key: 'Base',
    path: '',
    order: 0,
    children: [
      { label: '图标 Icon', key: 'Icon', path: '/base/icon', order: 0 },
      { label: '基础组件', key: 'BaseComponents', path: '/base/components', order: 1 },
      { label: 'Unocss', key: 'Unocss', path: '/base/unocss', order: 2 },
      { label: 'KeepAlive', key: 'KeepAlive', path: '/base/keep-alive', order: 3 },
      { label: 'MeModal', key: 'TestModal', path: '/testModal', order: 5 },
    ],
  },
  {
    label: '业务示例',
    key: 'Demo',
    path: null,
    order: 1,
    children: [{ label: '图片上传', key: 'ImgUpload', path: '/demo/upload', order: 2 }],
  },
  {
    label: '系统管理',
    key: 'SysMgt',
    path: null,
    order: 2,
    children: [
      { label: '资源管理', key: 'Resource_Mgt', path: '/pms/resource', order: 1 },
      { label: '角色管理', key: 'RoleMgt', path: '/pms/role', order: 2 },
      { label: '用户管理', key: 'UserMgt', path: '/pms/user', order: 3 },
    ],
  },
  {
    label: '外链(可内嵌打开)',
    key: 'ExternalLink',
    order: 98,
    children: [
      {
        label: '项目文档',
        key: 'ShowDocs',
        path: '/iframe/show-docs',
        originPath: 'https://isme.top',
        order: 1,
      },
      {
        label: '接口文档',
        key: 'ApiFoxDocs',
        path: '/iframe/api-fox-docs',
        originPath: 'https://apifox.com/apidoc/shared-ff4a4d32-c0d1-4caf-b0ee-6abc130f734a',
        order: 2,
      },
      {
        label: 'Naive UI',
        key: 'NaiveUI',
        path: '/iframe/naive-u-i',
        originPath: 'https://www.naiveui.com/zh-CN/os-theme',
        order: 3,
      },
      {
        label: '博客-掘金',
        key: 'MyBlog',
        path: '/iframe/my-blog',
        originPath: 'https://juejin.cn/user/1961184475483255/posts',
        order: 4,
      },
    ],
  },
]
// import {
//   BookOutline as BookIcon,
//   MenuOutline as MenuIcon,
//   NotificationsOutline as BellIcon,
//   PersonOutline as UserIcon,
//   SettingsOutline as SettingsIcon,
// } from '@vicons/ionicons5'
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
]
