/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

declare module '@vue-office/docx/lib/v3/vue-office-docx.mjs' {
  import { DefineComponent } from 'vue'
  const VueOfficeDocx: DefineComponent<{
    src: string | ArrayBuffer
    options?: Record<string, any>
  }>
  export default VueOfficeDocx
}

declare module '@vue-office/excel/lib/v3/vue-office-excel.mjs' {
  import { DefineComponent } from 'vue'
  const VueOfficeExcel: DefineComponent<{
    src: string | ArrayBuffer
    options?: Record<string, any>
  }>
  export default VueOfficeExcel
}

declare module '@vue-office/pdf/lib/v3/vue-office-pdf.mjs' {
  import { DefineComponent } from 'vue'
  const VueOfficePdf: DefineComponent<{
    src: string | ArrayBuffer
    options?: Record<string, any>
  }>
  export default VueOfficePdf
}
