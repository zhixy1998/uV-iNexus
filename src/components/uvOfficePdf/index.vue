<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="pdf-container">
    <div class="pdf-content-wrapper">
      <VuePdfEmbed :source="fileSrc" class="!w-[99%]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VuePdfEmbed from 'vue-pdf-embed'

const props = defineProps({
  fileSrc: {
    type: String,
    required: true,
  },
})
</script>

<style scoped lang="less">
.pdf-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.pdf-content-wrapper {
  width: 60%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  :deep(.vue-pdf-embed) {
    // 为每一页添加间距
    :deep(.page) {
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
}
</style>
