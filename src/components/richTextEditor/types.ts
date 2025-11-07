/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import type { IDomEditor } from '@wangeditor/editor'

export interface EditorProps {
  modelValue?: string
  placeholder?: string
  height?: string
  mode?: 'default' | 'simple'
  showToolbar?: boolean
  showWordCount?: boolean
  toolbarKeys?: string[]
  disabled?: boolean
}

export interface EditorEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'created', editor: IDomEditor): void
  (e: 'destroyed', editor: IDomEditor): void
  (e: 'focus', editor: IDomEditor): void
  (e: 'blur', editor: IDomEditor): void
  (e: 'formulaInserted', formulaElem: any): void
  (e: 'formulaUpdated', formulaElem: any): void
}

export interface EditorInstance {
  getEditor: () => IDomEditor | null
  getHtml: () => string
  getText: () => string
  getWordCount: () => number
  insertFormula: (formula: string) => void
  clear: () => void
  setHtml: (html: string) => void
  focus: () => void
}
