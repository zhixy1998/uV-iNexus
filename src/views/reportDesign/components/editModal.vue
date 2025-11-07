<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvModal
      v-model="modelValue"
      :title="title"
      width="40%"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    >
      <template #content>
        <uvForm ref="uvFormRef" :formState="ruleForm" :rules="rules" :formOptions="formOptions" />
      </template>
    </uvModal>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'

const props = defineProps<{
  title: string
  formState: any
  formOptions: any[]
  rules: any
}>()

let ruleForm = reactive<any>({})
watch(
  () => props.formState,
  (newValue) => {
    ruleForm = { ...newValue }
  },
  { deep: true },
)

// 对话框
const modelValue = ref(false)
const showModal = (formState?: any) => {
  if (formState) {
    for (const key in formState) {
      ruleForm[key] = formState[key]
    }
  }
  modelValue.value = true
}
const emit = defineEmits(['update:modelValue'])
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    modelValue.value = false
    emit('update:modelValue', ruleForm)
  }
}
const handleCancel = () => {
  uvFormRef.value?.resetForm()
}

// 表单数据
const uvFormRef = ref()

defineExpose({
  showModal,
  uvFormRef,
})
</script>

<style scoped lang="less"></style>
