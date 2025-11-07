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
      title="标准升级"
      width="60%"
      :okTitle="'升级'"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    >
      <template #content>
        <uvForm
          ref="uvFormRef"
          :formState="formState"
          :rules="rules"
          :formOptions="formOptions"
          :labelAlign="'left'"
          @changeUploadFile="changeUploadFile"
        />
      </template>
    </uvModal>
  </section>
</template>

<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { reactive, ref } from 'vue'

import { parseVersionStandard, upgradeStandard } from '@/api'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType } from '@/types/common'

// 对话框
const modelValue = ref(false)
const showModal = () => {
  modelValue.value = true
}
const emit = defineEmits(['fetchData'])
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    const formData = new FormData()
    formData.append('file', formState.package[0].originFileObj)
    const { code, message } = await upgradeStandard(formData)
    if (code === 200) {
      notification.success({
        message: '成功',
        description: message,
        duration: 3,
      })
      uvFormRef.value?.resetForm()
      modelValue.value = false
      emit('fetchData')
    }
  }
}
const handleCancel = () => {
  uvFormRef.value?.resetForm()
}
defineExpose({
  showModal,
})

// 表单数据
const uvFormRef = ref()
const formState = reactive<{
  package: any[]
  name: string
  version: string
  currentVersion: string
  content: string
}>({
  package: [],
  name: '',
  version: '',
  currentVersion: '',
  content: '',
})
const rules = ref({
  package: [{ required: true, message: '请选择文件', trigger: ['blur', 'change'] }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'upload',
    label: '选择标准升级包',
    props: 'package',
    prop: {
      maxCount: 1,
      acceptTypes: '.enc',
    },
  },
  {
    type: 'text',
    label: '文件名称',
    props: 'name',
  },
  {
    type: 'text',
    label: '升级包版本',
    props: 'version',
  },
  {
    type: 'text',
    label: '当前系统的标准版本',
    props: 'currentVersion',
  },
  {
    type: 'text',
    label: '更新包升级内容',
    props: 'content',
  },
])

// 上传文件
const changeUploadFile = async (value: any, item: formOptionsType) => {
  const file = value && value.length ? value[0].originFileObj : null
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    const { code, data } = await parseVersionStandard(formData)
    if (code === 200) {
      formState.name = data.fileName
      formState.version = data.parsedVersion
      formState.currentVersion = data.currentVersion
      formState.content = data.updateDescription
    }
  }
}
</script>

<style scoped lang="less">
:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 150px !important;
}
</style>
