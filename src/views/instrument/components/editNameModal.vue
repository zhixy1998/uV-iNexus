<!--
- 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
- 本软件受商业机密法和版权法保护。
- 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
- 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
-->
<template>
  <section>
    <uvModal
      v-model="modelValue"
      title="仪器命名"
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
import { reNameInstrument } from '@/api'
import type { formOptionsType } from '@/types/common'
import { message } from 'ant-design-vue'
import { ref } from 'vue'

const deviceStatusStore = useDeviceStatusStore()
const ruleForm = ref<any>({
  deviceName: '',
})
const rules = ref({
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '仪器名称',
    props: 'deviceName',
  },
])

// 对话框
const emit = defineEmits(['update:name'])
const modelValue = ref(false)
const showModal = () => {
  ruleForm.value.deviceName = deviceStatusStore.deviceName || ''
  modelValue.value = true
}
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    const { code } = await reNameInstrument({
      deviceName: ruleForm.value.deviceName,
    })
    if (code === 200) {
      emit('update:name', ruleForm.value.deviceName)
      modelValue.value = false
      message.success('仪器命名成功')
    }
  }
}
const handleCancel = () => {
  uvFormRef.value?.clearValidate()
}

// 表单数据
const uvFormRef = ref()

defineExpose({
  showModal,
})
</script>

<style scoped lang="less">
:deep(.ant-form-item-label) {
  width: 90px !important;
}
</style>
