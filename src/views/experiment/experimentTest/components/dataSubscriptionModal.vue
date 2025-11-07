<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-modal v-model:open="opneModal" title="数据订阅" @ok="handleOk" class="!w-[30%]">
    <div class="text-[16px] leading-[34px]">
      <span>选择要查看的数据文件路径</span>
    </div>
    <div class="text-[16px] leading-[34px]">文件名称：D:\download\总氮17378 2.qud</div>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { ref } from 'vue'

const { primaryColor } = useAppStore()

// 对话框
const opneModal = ref<boolean>(false)
const showModal = () => {
  opneModal.value = true
}
const handleCancel = () => {
  opneModal.value = false
}
const handleOk = async () => {}

const emit = defineEmits([])
defineExpose({
  showModal,
})
</script>

<style lang="less" scoped></style>
