<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="uv-container-gap">
    <uvCollapseRightSlot :parentActiveKey="activeKey" title="基本信息">
      <template #slot-header>
        <div class="flex">
          <uvHasIconBtn content="创建任务" class="!mr-[30px]"> </uvHasIconBtn>
          <uvHasIconBtn content="查看任务"></uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <a-row>
          <a-col :span="8" class="flex">
            <span class="text-[16px] text-[#113371]">当前模板</span>
            <a-input
              v-model:value="formState.projectName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
          <a-col :span="8" class="flex">
            <span class="text-[16px] text-[#113371]">当前任务</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
          <a-col :span="8" class="flex">
            <span class="text-[16px] text-[#113371]">检测仪器</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <verificationResult />
    <verificationReport />
  </div>
</template>

<script lang="ts" setup>
import verificationResult from './components/verificationResult.vue'
import verificationReport from './components/verificationReport.vue'
const activeKey = ref<string[]>([])
const formState = ref<Record<string, any>>({})
</script>

<style lang="less" scoped></style>
