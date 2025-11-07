<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="modelValue"
    title="另存为"
    width="40%"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <template #content>
      <uvForm ref="uvFormRef" :formState="ruleForm" :rules="rules" :formOptions="formOptions" />
    </template>
  </uvModal>
</template>

<script lang="ts" setup>
import type { formOptionsType } from '@/types/common'

const ruleForm = reactive<any>({
  taskName: '',
})
const modelValue = ref(false)
const uvFormRef = ref()
const rules = ref({
  taskName: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '任务名称',
    props: 'taskName',
  },
])
const showModal = (row: any) => {
  ruleForm.taskName = row.taskName
  modelValue.value = true
}
const emit = defineEmits(['update:modelValue'])
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    emit('update:modelValue', ruleForm)
  }
}
const handleCancel = () => {
  uvFormRef.value?.resetForm()
}

const closeModal = () => {
  modelValue.value = false
}

defineExpose({
  showModal,
  closeModal,
})
</script>
