<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="excel-container">
    <a-spin :spinning="loading">
      <vue-office-excel :src="docxUrl" @rendered="onRendered" @error="onError" class="!h-150" />
    </a-spin>
  </div>
</template>

<script lang="ts">
import '@vue-office/excel/lib/v3/index.css'

import VueOfficeExcel from '@vue-office/excel/lib/v3/vue-office-excel.mjs'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueOfficeExcelViewer',
  components: {
    VueOfficeExcel,
  },
  props: {
    fileUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const docxUrl = ref<string>(props.fileUrl)
    const loading = ref(true)

    const onRendered = () => {
      loading.value = false
      console.log('DOCX 渲染完成')
    }

    const onError = (err: Error) => {
      console.error('渲染失败:', err)
      loading.value = false
    }
    // const loadFile = async () => {
    //   try {
    //     if (props.fileUrl?.startsWith('http')) {
    //       // 处理网络URL
    //       const res = await fetch(props.fileUrl)
    //       docxUrl.value = await res.arrayBuffer()
    //     } else {
    //       // 处理本地路径
    //       const res = await fetch(new URL(props.fileUrl!, import.meta.url).href)
    //       docxUrl.value = await res.arrayBuffer()
    //     }
    //   } catch (err) {
    //     console.error('文件加载失败:', err)
    //   }
    // }

    return {
      docxUrl,
      loading,
      onRendered,
      onError,
      //   loadFile,
    }
  },
})
</script>

<style scoped>
/* .excel-container /deep/ .vue-office-excel-main {
} */
.excel-container {
  width: 60%;
  height: 60%;
  margin: 0 auto;
}
</style>
