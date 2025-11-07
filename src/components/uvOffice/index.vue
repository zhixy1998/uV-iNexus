<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <uvOfficeDocx :file-url="fileUrl" />
    <!-- <uvOfficeExcel v-else-if="fileType === 'xlsx'" :file-url="fileUrl" /> -->
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

import uvOfficeDocx from '@/components/uvOfficeDocx/index.vue'
import uvOfficeExcel from '@/components/uvOfficeExcel/index.vue'
const props = defineProps({
  fileUrl: {
    type: [String, Object] as PropType<string | ArrayBuffer>,
    required: true,
  },
})
// const fileType = computed(() => {
//   const fileUrl = props.fileUrl
//   const extension = fileUrl?.split('/').pop()?.split('.').pop()?.toLocaleLowerCase()
//   return extension
// })
</script>
