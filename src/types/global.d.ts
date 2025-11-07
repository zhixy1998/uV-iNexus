/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { ElectronAPI } from '@electron-toolkit/preload'

// 使用 declare global 包装
declare global {
  interface Window {
    MathJax: {
      typesetPromise: any
      // 其他可能用到的 MathJax 方法
    }
    MathQuill: {
      getInterface: any
    }
    mathVirtualKeyboard: {
      show: () => void
      hide: () => void
      layouts: {
        layers: Array<{
          rows: string[][]
        }>
      }
      [key: string]: unknown
    }
    electron: ElectronAPI
    api: {
      [key: string]: (...args: any[]) => Promise<any>
    }
  }
}

// 确保这个文件被视为模块
export {}
