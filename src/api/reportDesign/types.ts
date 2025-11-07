/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

export interface IGetReportList {
  name: string | null
  desc?: number | null
  sort_field?: number | null
  page: number
  page_size: number
  type?: number
}

export interface IPreviewReport {
  template_id: number
  bookmark_list: {
    bm_id: number
    font: string
    font_size: number
  }[]
  title_list?: {
    bm_id: string
    value: string
    font: string
    font_size: number
  }[]
  header?: {
    value: string
    font: string | null
    font_size: number | null
  } | null
  footer?: {
    value: string
    font: string | null
    font_size: number | null
  } | null
  note?: {
    value: string
    font: string | null
    font_size: number | null
  } | null
  operation_type: 0 | 1 | 2
  name?: string
}
