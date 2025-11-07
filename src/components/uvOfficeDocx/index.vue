<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="docx-container">
    <a-spin :spinning="loading">
      <vue-office-docx
        :src="fileUrl"
        style="background: white"
        @rendered="onRendered"
        @error="onError"
      />
    </a-spin>
  </div>
</template>

<script lang="ts">
import '@vue-office/docx/lib/v3/index.css'

import VueOfficeDocx from '@vue-office/docx/lib/v3/vue-office-docx.mjs'
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'VueOfficeDocxViewer',
  components: {
    VueOfficeDocx,
  },
  props: {
    fileUrl: {
      type: [String, Object] as PropType<string | ArrayBuffer>,
      required: true,
    },
  },
  setup(props) {
    // const docxUrl = ref<string>(props.fileUrl)
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
      // docxUrl,
      loading,
      onRendered,
      onError,
      //   loadFile,
    }
  },
})
</script>

<style scoped lang="less">
.docx-container /deep/ .vue-office-docx-main {
  zoom: 0.6; /* 缩小到 80% */
}
// .docx-container {
//   width: 50%;
//   height: 50%;
//   margin: 0 auto;
// }

/* 强制覆盖默认背景色 */
:deep(.docx-wrapper) {
  background: #fff;
}
</style>
