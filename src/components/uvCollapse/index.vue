<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <a-collapse
      v-model:activeKey="activeKey"
      expandIconPosition="end"
      :bordered="false"
      class="!bg-white"
      @change="changeCollapse"
    >
      <template #expandIcon="{ isActive }">
        <up-circle-filled class="!text-[25px]" v-if="isActive" />
        <down-circle-filled class="!text-[25px]" v-else />
      </template>
      <a-collapse-panel key="1" :style="styleName">
        <template #header>
          <div class="title" :style="{ color: primaryColor }">{{ title }}</div>
          <div v-if="$slots['slot-header']" class="padding-header-box">
            <slot name="slot-header"></slot>
          </div>
        </template>
        <div class="padding-box">
          <slot name="slot-content"></slot>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </section>
</template>

<script lang="ts" setup>
import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons-vue'
import { type PropType, ref, watch } from 'vue'

import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

const props = defineProps({
  parentActiveKey: {
    type: [String, Array, Number] as PropType<string | string[] | number>,
    default: '1',
  },
  title: {
    type: String,
    default: '仪器开关机',
  },
  styleName: {
    type: String,
    default: 'background: #fff; box-shadow: 8px 8px 27px 2px #c5c5c5 !important;',
  },
})
const activeKey = ref<string | string[] | number>('')
watch(
  () => props.parentActiveKey,
  (newValue) => {
    activeKey.value = newValue
  },
  { immediate: true },
)
// 触发事件
const emit = defineEmits(['changeCollapse'])
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value
  emit('changeCollapse', value)
}
</script>

<style scoped lang="less">
.padding-box {
  padding: 15px 15px 5px 15px;
}

.title {
  margin: 0px 15px;
  font-size: 18px;
  font-weight: bold;
  color: #153471;
}
</style>
