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
]
