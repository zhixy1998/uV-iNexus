/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

/**
 * 表单配置项类型
 */
interface selectOption {
  label: string
  value: string
}
export type formOptionsType = {
  type:
    | 'text'
    | 'input'
    | 'select'
    | 'button'
    | 'radio'
    | 'password'
    | 'upload'
    | 'formula'
    | 'formulaShow' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
  prop?: {
    maxCount?: number
    acceptTypes?: string
    maxSize?: number
    [key: string]: unknown
  }
  [key: string]: unknown
}
/**
 * 可点击标签显示表单的类型
 */
export interface TagItem {
  label: string
  props: string
  params: Record<string, any>
  [key: string]: unknown
}

/**
 * 3D折线图类型
 */
interface Point3D {
  x: number
  y: number
  z: number
}

export interface Series3DLineData {
  name: string
  data: Point3D[]
  color?: string
  lineWidth?: number
}
