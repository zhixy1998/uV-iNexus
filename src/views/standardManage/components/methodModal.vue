<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <a-modal
      v-model:visible="modelValue"
      title="检测方法详情"
      width="60%"
      :bodyStyle="{
        padding: '20px 10% 20px 9%',
      }"
      :footer="null"
    >
      <div v-for="item in detailList" :key="item.key" class="flex !leading-12 text-[15px]">
        <div class="w-[120px] shrink-0">{{ item.label }}：</div>
        <div>{{ detail && detail[item.key] ? detail[item.key] : '-' }}</div>
      </div>
    </a-modal>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { getStandardParametersDetail } from '@/api'

// 对话框
const modelValue = ref(false)
const showModal = async (id: string) => {
  modelValue.value = true
  await getDetail(id)
}
const detail = ref<any>()
const getDetail = async (id: string) => {
  const { code, data } = await getStandardParametersDetail(id)
  if (code === 200) {
    detail.value = data
  }
}

const detailList = [
  {
    label: '测量参数',
    key: 'detectionParameters',
  },
  {
    label: '前处理方式',
    key: 'preTreatmentDesc',
  },
  {
    label: '结果',
    key: 'resultExpression',
  },
  {
    label: '质控类型',
    key: 'qcType',
  },
]

defineExpose({
  showModal,
})
</script>

<style scoped lang="less"></style>
