/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

export interface IAddInstrumentConfig {
  annexSetting: number
  bandWidth: number | string
  createBy?: string
  created?: string
  deviceSerialNumber: string
  id?: string
  isTimeStartUp: number
  messagePort: number
  startUpTime: string
  updateBy?: string
  updated?: string
}

export interface ICalibrationInstrument {
  calibrationName: string
  calibrationType: number
  data: {
    key: string
    value: string
  }[]
}

export interface ISetInjectorTray {
  deviceSerialNumber: string
  panel: string
  isSelected: number
  plateRail: number
  numInfo: string
}

export interface ISetInjectorConf {
  messagePort: any
  connectStatus: number
  isStartInit: number
  enterSpeed: number | null
  enterTime: string
  washSpeed: number | null
  washTime: string
  waitingTime: string
  isWashBeforeEnter: number
  paramList?: ISetInjectorTray[]
}
