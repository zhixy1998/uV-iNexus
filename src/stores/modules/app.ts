import { defineStore } from 'pinia'

import { defaultPrimaryColor, naiveThemeOverrides } from '@/setting'
export const useAppStore = defineStore('app', {
  state: () => ({
    collapsed: false, // 侧边栏是否收起
    primaryColor: defaultPrimaryColor,
    naiveThemeOverrides,
  }),
  actions: {
    setPrimaryColor(color: string) {
      this.primaryColor = color
    },
  },
})
