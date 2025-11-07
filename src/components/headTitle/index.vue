<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="flex items-center justify-between py-3 headTitle">
    <div class="text-lg flex">
      <span class="!font-bold">{{ title }}</span>
      <slot name="leftExtra"></slot>
    </div>
    <div class="mx-auto">
      <slot name="center"></slot>
    </div>

    <slot name="btn"> </slot>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="less">
.headTitle {
  border-bottom: 1px solid #f0f0f0;
}
</style>
