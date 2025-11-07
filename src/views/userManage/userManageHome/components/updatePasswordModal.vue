<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="model"
    title="重置密码"
    @handleOk="handleResetPasswordSubmit"
    @handleCancel="resetModalForm"
    :maskClosable="false"
    width="600px"
  >
    <template #content>
      <uvForm
        :key="formRenderKey"
        ref="uvFormRef"
        :labelCol="{ style: { width: '100px' } }"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
        @change="handleFormChange"
      />
    </template>
  </uvModal>
</template>

<script lang="ts" setup>
import { updateUserPassword } from '@/api/userManageHome'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType } from '@/types/common'
import { message } from 'ant-design-vue'
import { computed, reactive, ref, watch } from 'vue'

// 类型定义
interface ResetPasswordFormState {
  userId: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

// Props & Emit
const props = defineProps<{
  modelValue: boolean
  userId?: string // 从父组件传入的用户ID
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'reset-success'): void
}>()

// 响应式状态
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const uvFormRef = ref<InstanceType<typeof uvForm> | null>(null)
const formState = reactive<ResetPasswordFormState>({
  userId: props.userId || '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

// 表单相关状态
const formRenderKey = ref<number>(0)

// 表单配置
const formOptions = computed<formOptionsType[]>(() => [
  {
    type: 'password',
    label: '旧密码',
    props: 'oldPassword',
    required: true,
    placeholder: '请输入当前密码',
    maxLength: 20,
  },
  {
    type: 'password',
    label: '新密码',
    props: 'newPassword',
    required: true,
    placeholder: '6-16位数字或字母组合',
    maxLength: 16,
  },
  {
    type: 'password',
    label: '确认新密码',
    props: 'confirmNewPassword',
    required: true,
    placeholder: '请再次输入新密码',
    maxLength: 16,
  },
])

// 表单校验规则
const formRules = reactive({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度需在6-16位之间', trigger: 'blur' },
    {
      // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
      message: '新密码格式为数字或字母组合',
      trigger: 'blur',
    },
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string) => {
        if (value !== formState.newPassword) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
})

// 表单值变化处理
const handleFormChange = (key: string, value: any) => {
  // 可以根据需要处理表单值变化
  // console.log(`表单字段${key}变化，新值:`, value)
}

// 重置表单
const resetModalForm = () => {
  formState.oldPassword = ''
  formState.newPassword = ''
  formState.confirmNewPassword = ''
  formRenderKey.value += 1

  if (uvFormRef.value) {
    try {
      ;(uvFormRef.value as any).resetFields?.()
    } catch (e) {
      console.log('表单重置错误:', e)
    }
  }
}

// 提交重置密码
const handleResetPasswordSubmit = async () => {
  if (!uvFormRef.value) return

  const validateSuccess = await uvFormRef.value.onSubmit()
  if (!validateSuccess) {
    message.warning('表单填写不完整，请检查后提交')
    return
  }

  const submitData = {
    userId: formState.userId,
    oldPassword: formState.oldPassword.trim(),
    newPassword: formState.newPassword.trim(),
    confirmNewPassword: formState.confirmNewPassword.trim(),
  }

  const { code, message: responseMessage } = await updateUserPassword(submitData)

  if (code === 200) {
    message.success('密码重置成功！请使用新密码登录')
    emit('reset-success')
    model.value = false
    resetModalForm()
  } else {
    // 处理其他成功状态码（如果有的话）
    message.error(`重置失败：${responseMessage || `操作异常（状态码${code}）`}`)
  }
}

// 监听弹窗状态和用户ID变化
watch(
  () => [model.value, props.userId],
  ([isVisible, userId]) => {
    if (isVisible && userId) {
      // 确保赋值给formState.userId的是字符串类型
      formState.userId = typeof userId === 'string' ? userId : ''
    } else if (!isVisible) {
      resetModalForm()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
/* 可根据需要添加组件特定样式 */
::v-deep .uv-form-item {
  margin-bottom: 16px;
}

::v-deep .uv-form-item-label {
  font-weight: 500;
}
</style>
