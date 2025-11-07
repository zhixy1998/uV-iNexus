<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-button
    class="!w-auto !flex !items-center"
    :ghost="isGost"
    @click="buttonClick"
    :loading="loading"
  >
    <template #icon>
      <slot name="icon"></slot>
    </template>
    {{ content }}
  </a-button>
</template>
<script lang="ts" setup>
import { type PropType, ref } from 'vue'
const isGost = ref(true)
const props = defineProps({
  content: String,
  loading: {
    type: Boolean,
    default: false,
  },
  // className: {
  //   type: Array as PropType<string[]>,
  //   default: () => ['!w-[85px]'],
  // },
})
const emits = defineEmits(['click'])
const buttonClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>
<style scoped lang="less">
.ant-btn {
  // background: #153471;
  text-align: center;
  background: @button-bg-color;
  color: @button-color;
  // &:hover {
  //   transform: scale(1.05);
  // }
}
</style>
