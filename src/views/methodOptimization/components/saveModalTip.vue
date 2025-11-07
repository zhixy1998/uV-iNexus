<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" size="smail" title="提示" @handle-ok="saveOperation" :closable="false">
    <template #content>
      <div class="!mb-1">当前有未保存的结果数据，您希望</div>
      <a-radio-group name="radioGroup" v-model:value="operate">
        <a-radio :style="radioStyle" value="1"
          ><span class="text-[14px]">先保存已有数据再应用方法生成新数据</span>
        </a-radio>
        <a-radio :style="radioStyle" value="0"
          ><span class="text-[14px]">放弃数据后应用方法生成新数据</span></a-radio
        >
      </a-radio-group>
      <br />
    </template>
  </uvModal>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})
const radioStyle = reactive({
  display: 'flex',
  fontSize: '16px',
  marginTop: '16px',
})
const emit = defineEmits(['update:modelValue', 'confirm'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const operate = ref('1')
const saveOperation = async () => {
  emit('confirm', operate.value)
  model.value = false
}
</script>
