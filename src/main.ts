/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import './assets/main.css'
import './assets/ant.less'
import './assets/self.less'
import 'ant-design-vue/dist/reset.css'
// VxeUI 是 Vxe 库通用全局实例（也可以使用旧别名 VXETable）
// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'
import 'mathlive'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { type App, createApp } from 'vue'
import {
  VxeLoading,
  VxePager,
  VxeTooltip,
  VxeSwitch,
  VxeSelect,
  VxeInput,
  VxeNumberInput,
  VxeCheckbox,
} from 'vxe-pc-ui'
import { VxeColgroup, VxeColumn, VxeGrid, VxeTable, VxeToolbar, VxeUI } from 'vxe-table'
// 导入默认的语言
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import 'amfe-flexible'
import '@/utils/flexible'

import { IconFont } from '@/utils/iconfont'
import { install } from '@/utils/vue-i8n'

import AppField from './App.vue'
import router from './router'
VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')
// 可选组件
function lazyVxeTable(app: App<Element>) {
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeToolbar)
}

function lazyVxeUI(app: App<Element>) {
  app.use(VxeTooltip)
  app.use(VxeLoading)
  app.use(VxePager)
  app.use(VxeSwitch)
  app.use(VxeSelect)
  app.use(VxeInput)
  app.use(VxeNumberInput)
  app.use(VxeCheckbox)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(AppField)
app.component('IconFont', IconFont)
install(app)
// app.use(VueFullscreen as any)
app.use(pinia)
app.use(router)

app.use(Antd)
app.use(lazyVxeUI)
app.use(lazyVxeTable)
app.mount('#app')
