<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="保存为新方法" size="small" @handle-ok="handleSaveMethods">
    <template #content>
      <div class="flex items-center">
        <span class="!w-25 flex-shrink-0">请输入新方法名</span>
        <a-input v-model:value="formState.methodName" />
      </div>
      <br />
      <div class="flex items-center">
        <span class="w-22 flex-shrink-0">存储位置</span>
        <a-radio-group v-model:value="formState.timeInterval" :options="formOptions.cunchuweizhi" />
      </div>
      <br />
      <div>
        <div class="mb-2">检测到新方法修改了采集参数，当前任务数据不再适应于该方法，</div>
        <a-radio-group v-model:value="formState.timeInterval" :options="formOptions.jiazaifangfa" />
      </div>
      <br />
      <div>
        <div class="mb-2">检测到新方法修改了分析参数，</div>
        <a-radio-group v-model:value="formState.timeInterval" :options="formOptions.fenxicanshu" />
      </div>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

import uvModal from '@/components/uvModal/index.vue'
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'handleOk'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const formState = ref<Record<string, any>>({})
const formOptions = {
  cunchuweizhi: [
    {
      label: '项目内',
      value: '项目内',
    },
    {
      label: '公共区',
      value: '公共去',
    },
  ],
  jiazaifangfa: [
    {
      label: '在新页面下加载新方法',
      value: '0',
    },
    {
      label: '不加载新方法',
      value: '1',
    },
  ],
  fenxicanshu: [
    {
      label: '重新分析当前任务数据并刷新结果',
      value: '0',
    },
    {
      label: '在新页面下加载新方法',
      value: '1',
    },
    {
      label: '不加载新方法',
      value: '2',
    },
  ],
}
const handleSaveMethods = () => {
  model.value = false
  emit('handleOk')
}
</script>
