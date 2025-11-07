/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

// 检查两个对象是否不同 注意:null undefined ''是一样的
// 检查两个对象是否不同 注意:null undefined ''是一样的
export function useCheckDifferent(newForm: any, originForm: any) {
  const compareObjects = (obj1: any, obj2: any): boolean => {
    // 处理基本类型和null/undefined
    if (obj1 === obj2) return true

    // 处理null/undefined与空字符串的情况
    if (
      (obj1 === null || obj1 === undefined || obj1 === '') &&
      (obj2 === null || obj2 === undefined || obj2 === '')
    ) {
      return true
    }

    if (obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined) {
      return obj1 == obj2
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      return obj1 == obj2
    }

    // 处理数组
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false

      // 创建副本以避免修改原数组
      const arr1 = [...obj1]
      const arr2 = [...obj2]

      // 对数组进行排序后再逐一比较
      // 这里采用一种更灵活的方法：尝试匹配每个元素
      const unmatched2 = [...arr2]

      for (let i = 0; i < arr1.length; i++) {
        const item1 = arr1[i]
        let foundMatch = false
        for (let j = 0; j < unmatched2.length; j++) {
          if (compareObjects(item1, unmatched2[j])) {
            unmatched2.splice(j, 1)
            foundMatch = true
            break
          }
        }
        if (!foundMatch) return false
      }

      // 如果所有元素都能匹配，则数组相同
      return unmatched2.length === 0
    }

    // 确保两者类型一致（一个是数组一个不是）
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false

    // 处理普通对象
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    // 过滤掉Vue的响应式属性
    const filterKeys = (keys: string[]) =>
      keys.filter((key) => !key.startsWith('__v_') && key !== '_isVue')

    const filteredKeys1 = filterKeys(keys1)
    const filteredKeys2 = filterKeys(keys2)

    if (filteredKeys1.length !== filteredKeys2.length) return false

    for (const key of filteredKeys1) {
      if (!filteredKeys2.includes(key)) return false
      if (!compareObjects(obj1[key], obj2[key])) return false
    }
    return true
  }

  // 深度克隆并去除响应式包装后再比较
  const cleanClone = (obj: any): any => {
    if (obj === null || obj === undefined) return obj
    if (typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime())
    if (Array.isArray(obj)) return obj.map(cleanClone)

    // 处理Vue响应式对象
    if (obj.__v_isRef) return cleanClone(obj.value)
    if (obj._isVue || obj.__v_skip !== undefined) {
      const plainObj: any = {}
      for (const key in obj) {
        if (
          Object.prototype.hasOwnProperty.call(obj, key) &&
          !key.startsWith('__v_') &&
          key !== '_isVue'
        ) {
          plainObj[key] = cleanClone(obj[key])
        }
      }
      return plainObj
    }

    const plainObj: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        plainObj[key] = cleanClone(obj[key])
      }
    }
    return plainObj
  }

  const cleanNewForm = cleanClone(newForm)
  const cleanOriginForm = cleanClone(originForm)

  return !compareObjects(cleanNewForm, cleanOriginForm)
}
