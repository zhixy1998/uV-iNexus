<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-select
    :value="modelValue"
    mode="mode"
    style="width: 100%"
    :placeholder="placeholder"
    :options="[...Array(25)].map((_, i) => ({ options: (i + 10).toString(36) + (i + 1) }))"
    @change="handleChange"
  ></a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  mode: {
    type: String,
    default: 'multiple',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  modelValue: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`)
  emit('update:modelValue', value)
}
const options = ref(['a1', 'b2'])
</script>
