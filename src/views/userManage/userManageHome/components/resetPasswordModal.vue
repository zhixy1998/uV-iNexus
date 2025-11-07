<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="model"
    title="重置用户密码"
    @handleOk="handleConfirmReset"
    @handleCancel="handleCancel"
    :maskClosable="false"
    width="500px"
  >
    <template #content>
      <div class="reset-pwd-content">
        <!-- 提示信息 -->
        <div class="text-gray-600 mb-6">
          <p>
            确认将用户
            <span class="text-amber-600 font-medium">{{ userName }}</span> 的密码重置为默认值？
          </p>
          <p class="mt-2 text-amber-500 flex items-center">
            <span class="inline-block w-4 h-4 bg-amber-500 rounded-full mr-2 flex-shrink-0"></span>
            默认密码：<span class="font-mono ml-1">123456</span>
          </p>
        </div>

        <!-- 加载状态 -->
        <div v-if="isLoading" class="flex justify-center items-center py-4">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mr-2"></div>
          <span class="text-gray-600">正在执行重置操作...</span>
        </div>
      </div>
    </template>
  </uvModal>
</template>

<script setup lang="ts">
import { resetUserPassword } from '@/api/userManageHome' // 接口函数
import { message } from 'ant-design-vue'
import { computed, ref } from 'vue'

// 接收父组件参数
const props = defineProps<{
  modelValue: boolean // 弹窗显示状态（v-model绑定）
  userId: string // 用户ID
  userName?: string // 用户名
}>()

// 向父组件传递弹窗状态（v-model双向绑定）
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'reset-success'): void // 重置成功事件
}>()

// 弹窗状态（适配v-model）
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// 加载状态
const isLoading = ref(false)

// 取消操作
const handleCancel = () => {
  model.value = false
}

// 确认重置（调用接口）
const handleConfirmReset = async () => {
  if (!props.userId) {
    message.warning('用户ID不能为空')
    return
  }

  // 显示加载状态
  isLoading.value = true
  try {
    // 调用后端重置密码接口（仅传递userId）
    const response = await resetUserPassword({ userId: props.userId })

    // 处理接口响应（根据后端返回格式调整）
    if (response.code === 200) {
      message.success('密码重置成功！默认密码：123456')
      emit('reset-success') // 向父组件发送成功事件
      model.value = false // 关闭弹窗
    } else {
      message.error(`重置失败：${response.message || '操作异常'}`)
    }
  } catch (error: any) {
    // message.error(`网络异常：${error.message || '请稍后重试'}`);
    console.error('重置密码接口调用失败：', error)
  } finally {
    // 关闭加载状态
    isLoading.value = false
  }
}
</script>

<style scoped>
.reset-pwd-content {
  padding: 8px 0;
}
/* 适配uvModal样式 */
::v-deep .uv-modal-body {
  padding: 20px 24px !important;
}
::v-deep .uv-modal-footer {
  margin-top: 8px !important;
}
</style>
