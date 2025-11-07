/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { ipcRenderer,contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
// 引入 createRequire 方法
// import { createRequire } from 'module';
//
// // 创建 require 函数
// const require = createRequire(import.meta.url);
// 安全地暴露 API 给渲染进程
// const { ipcRenderer,contextBridge} = require("electron");
// const { electronAPI } = require('@electron-toolkit/preload')
// Custom APIs for renderer
const api = {
  embedCSharpWindow: (options) => ipcRenderer.invoke('embed-csharp-window', options)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Failed to expose APIs:', error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
