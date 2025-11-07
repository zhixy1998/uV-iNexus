/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

export interface ISavePanelConf {
  methodListSwitch: boolean
  projectStatisticsSwitch: boolean
}

export interface IChangeSystemLogSwitch {
  statUsageTotalSwitch: boolean
  statUsageEnabled: boolean
  statUserEnabled: boolean
  statTypeEnabled: boolean
  statItemEnabled: boolean
  statDetailEnabled: boolean
  statUsageRecordEnabled: boolean
}

export interface ISaveAlgorithmConf {
  transmittance: string
  integratingSphere: string
  abs: string
  peakInterval: string
  peakValleyDiff: string
}

export interface ISaveBusinessParam {
  standardCurveConf: string
  showDeleted: boolean
  showMeasureTime: boolean
  autoSaveSwitch: boolean
  autoSaveTime: string
  autoLeaveSwitch: boolean
  autoLeaveTime: string
  // filePath: string
}
