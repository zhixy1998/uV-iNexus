/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

/**
 * 光谱扫描参数类型
 */
const defaultFormState = {
  measureType: 'spectralScan',
  luminosity: '',
  startWaveLength: '',
  endWaveLength: '',
  waveLengthInterval: '',
  repetitionPattern: '',
  repetitionTime: '',
  timeInterval: '',
  spectralBandwidth: '',
  responseTime: '',
  changeLampWaveLength: '',
  energyLamp: '钨灯',
  gain: '0',
  referenceStandardName: '',
  preProcessParameters: [],
}
export type SpectrumFormState = Partial<typeof defaultFormState> & { [key: string]: any }
interface selectOption {
  label: string
  value: string
}
/**
 * 光度测量参数类型
 */
export type formOptionsType = {
  type: 'text' | 'input' | 'select' | 'button' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
}
/**
 * 折线图数据类型
 */
export interface ChartDataItem {
  x: number | string
  y: number | string
  marked: number
  feng: number
  gu: number
  [key: string]: any
}
/**
 * 表单配置项类型
 */
