/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

import html2canvas from 'html2canvas'
export const captureScreenshot = async (
  element: HTMLElement,
  type: 'blob' | 'base64' = 'blob',
): Promise<Blob | Base64URLString | null> => {
  const canvas = await html2canvas(element)
  return new Promise((resolve) => {
    if (type === 'blob') {
      canvas.toBlob((blob) => {
        resolve(blob)
      })
    } else {
      resolve(canvas.toDataURL('image/png'))
    }
  })
}
