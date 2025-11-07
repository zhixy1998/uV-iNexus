/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

export function useDownloadFile(responseData: any, fileName: string, mimeType = 'text/plain') {
  let blob: any
  if (isBase64(responseData)) {
    // 处理可能包含前缀的Base64字符串（如"data:image/png;base64,..."）
    const cleanedBase64 = responseData.includes('base64,')
      ? responseData.split(',')[1]
      : responseData
    blob = base64ToBlob(cleanedBase64, mimeType)
  } else if (responseData.type === 'application/json') {
    // 待定
  } else {
    console.log(responseData, '非Base64数据')
    // 二进制流
    blob = new Blob([responseData])
  }
  const navigator = window.navigator as any
  if (typeof navigator.msSaveBlob !== 'undefined') {
    return navigator.msSaveBlob(blob, decodeURI(fileName))
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob)
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(fileName))
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
}

// 判断是否是Base64字符串
function isBase64(str: string): boolean {
  if (typeof str !== 'string') {
    return false
  }
  // 标准Base64正则
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/
  // 检查长度是否为4的倍数
  if (str.length && str.length % 4 !== 0) {
    return false
  }
  // 检查是否匹配正则
  return base64Regex.test(str)
}

// base64转换为Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}
