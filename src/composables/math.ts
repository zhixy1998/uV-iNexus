/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// 工具函数：从字符串中提取包含定界符的LaTeX公式
export const extractFormulaWithDelimiters = (htmlString: string): string | null => {
  if (!htmlString) return null

  // 匹配 $$...$$ 格式的块级公式（包含定界符）
  const blockPattern = /\$\$[^$]+\$\$/
  const blockMatch = htmlString.match(blockPattern)
  if (blockMatch) {
    return blockMatch[0]
  }

  // 匹配 $...$ 格式的行内公式（包含定界符）
  const inlinePattern = /\$[^$]+\$/
  const inlineMatch = htmlString.match(inlinePattern)
  if (inlineMatch) {
    return inlineMatch[0]
  }

  return null
}

// 生成唯一随机标识方法
export const generateUniqueId = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  // 取当前时间戳后4位（10进制）
  const timePart = Date.now().toString().slice(-4)
  // 再随机生成3位字符
  let randomPart = ''
  for (let i = 0; i < 3; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)]
  }
  // 组合成7位字符串
  return timePart + randomPart
}
import { isEqualWith } from 'lodash-es'
export const compareFormState = (formData: any, oldFormData: any) => {
  const customizer = (newValue: any, originalValue: any) => {
    // 对于数字字符串和数字的比较，转换为相同类型再比较
    if (
      newValue !== originalValue &&
      !isNaN(Number(newValue)) &&
      !isNaN(Number(originalValue)) &&
      Number(newValue) === Number(originalValue)
    ) {
      return true // 认为相等
    }
  }
  console.log(formData, oldFormData, isEqualWith(formData, oldFormData, customizer))
  return isEqualWith(formData, oldFormData, customizer)
}
