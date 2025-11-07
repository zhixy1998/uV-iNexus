/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import { spawn, exec } from 'child_process'
import { app, BrowserWindow, ipcMain } from 'electron'
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
let mainWindow
let csharpProcess
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
  mainWindow.loadURL('http://localhost:5173')
  mainWindow.webContents.openDevTools()
  // 加载 Vue 应用
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('Running in development mode')
  //   mainWindow.loadURL('http://localhost:5173')
  //   mainWindow.webContents.openDevTools()
  // } else {
  //   mainWindow.loadFile('dist/index.html')
  // }


}

// 处理窗口嵌入请求
ipcMain.handle('embed-csharp-window', async (event) => {
  try {
    // 启动C#程序
    console.log('启动C#程序')
    const csharpPath = path.join(__dirname, '../public/Debug/UserControlTestContainerValidation.exe')
    csharpProcess =  spawn(csharpPath, ['--embedded'], {
      detached: true,
      // windowsHide: true,
      stdio: 'ignore'
    })
    csharpProcess.on('error', (error) => {
      console.error('启动 C# 程序失败:', error)
    })
    csharpProcess.on('spawn', () => {
      console.log('C1# 程序启动成功')
      // 嵌入 C# 窗口到指定容器

    })
    //   spawn(csharpPath, ['--embedded'],{
    //   detached: true,
    //   windowsHide: true
    // })
    // const parentHandle = mainWindow.getNativeWindowHandle(); // 获取Electron窗口句柄
    // const buffer = parentHandle.readUInt32LE(0);
    //
    // // 嵌入窗口
    // // embedWindow('YourCSharpAppTitle', buffer, 10, 10, 800, 600);
    //
    // return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
// ipcMain.handle('embed-csharp-window', async (event, { parentId }) => {
//   console.log('监听到这个事件')
//   return new Promise((resolve) => {
//     try {
//       // 使用 Windows API 或第三方工具嵌入窗口
//       // // 这里使用 winctl 工具作为示例
//       // const child = exec(`window-embedder.exe ${parentId}`, (error, stdout, stderr) => {
//       //   if (error) {
//       //     resolve({ success: false, error: error.message })
//       //     return
//       //   }
//       //   resolve({ success: true, result: stdout })
//       // })
//       resolve({ success: true, result: stdout })
//     } catch (error) {
//       resolve({ success: false, error: error.message })
//     }
//   })
// })

app.whenReady().then(createWindow)

// 退出时清理
app.on('window-all-closed', () => {
  if (csharpProcess) csharpProcess.kill()
  app.quit()
})
