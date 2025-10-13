<template>
  <div class="docx-container">
    <vue-office-docx :src="docxUrl" @rendered="onRendered" @error="onError" style="width:100;height: auto;" />
  </div>
</template>

<script lang="ts">
import '@vue-office/docx/lib/v3/index.css'

import VueOfficeDocx from '@vue-office/docx/lib/v3/vue-office-docx.mjs'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VueOfficeDocxViewer',
  components: {
    VueOfficeDocx,
  },
  props: {
    fileUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const docxUrl = ref<ArrayBuffer | 'string'>(props.fileUrl)
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
.docx-container {
  /* height: 80vh;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: auto; */
  width: 66%;
  margin: 0 auto;
  transform:scale(.5);
  transform-origin: 0 0;
  width: fit-content;
  
}
.docx-wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.docx-container {
  transform: scale(0.7);
  transform-origin: 0 0;
  width: fit-content;
}
</style>
