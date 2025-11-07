<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="新建项目" @handleOk="createProject">
    <template #content>
      <uvForm
        ref="uvFormRef"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { computed, reactive, ref } from 'vue'

import { experimentNewProject } from '@/api'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
interface selectOption {
  label: string
  value: string
}
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'projectCreateSuccess'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
type formOptionsType = {
  type: 'text' | 'input' | 'select' | 'button' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
}
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '项目名称',
    props: 'projectName',
  },
  {
    type: 'input',
    label: '备注',
    props: 'remark',
  },
])
const formRules = reactive({
  projectName: [
    {
      required: true,
      message: '请输入项目名称',
      trigger: 'blur',
    },
  ],
})
const uvFormRef = ref<InstanceType<typeof uvForm>>()
const formState = reactive<{
  projectName: string
  remark: string
}>({
  projectName: '',
  remark: '',
})
const createProject = async () => {
  if (!(await uvFormRef.value?.onSubmit())) return
  const { code, data } = await experimentNewProject(formState)
  if (code === 200) {
    message.success('项目创建成功')
    model.value = false
    emit('projectCreateSuccess')
  }
}
</script>

<style lang="less" scoped>
:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 100px !important;
}
</style>
