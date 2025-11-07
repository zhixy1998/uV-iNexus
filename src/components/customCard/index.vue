<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div v-if="visible" class="custom-card-index">
    <div class="flex justify-between items-center" @click="hiddleOrShowContent">
      <div class="card-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="m-x-auto">
        <slot name="center"></slot>
      </div>
      <div class="p-2 cursor-pointer flex gap-2" @click="handleClose">
        <slot name="extra"></slot>
        <CloseOutlined />
      </div>
    </div>
    <transition name="slide-fade" mode="out-in" appear>
      <div class="p-2 border-t-1 border-[#153471]" v-if="contentVisible">
        <span class="text-[15px] text-[#5E5E6C]" v-html="description"></span>

        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane v-for="tab in dynamicTabs" :key="tab.title" :tab="tab.title">
            <!-- 动态插槽内容 -->
            <slot :name="tab.slotName" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // 添加一个控制初始显示状态的属性
  modelValue: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: '',
  },
  dynamicTabs: {
    type: Array as PropType<Record<string, any>>,
    default: () => [
      [
        {
          title: '静态 Tab',
          slotName: 'table',
        },
        {
          title: '组件 Tab',
          slotName: 'chart',
        },
      ],
    ],
  },
})

// 定义 visible 状态
const visible = ref(props.modelValue)
watch(
  () => props.dynamicTabs,
  (newValue) => {
    activeKey.value = newValue[0].title
  },
  {
    deep: true,
  },
)

const activeKey = ref(props.dynamicTabs[0].title)
// 定义关闭事件
const emit = defineEmits(['close', 'update:modelValue'])

// 处理关闭逻辑
const handleClose = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}
const contentVisible = ref(true)
const hiddleOrShowContent = () => {
  contentVisible.value = !contentVisible.value
}
</script>

<style lang="less" scoped>
.custom-card-index {
  background: #f4f8fe;
  border-radius: 4px;
}

.cursor-pointer {
  cursor: pointer;
}

.card-title {
  padding: 8px;
  font-weight: bold;
  color: #153471;
  font-size: 16px;
}
/* 纯高度变化动画 */
.slide-fade-enter-active {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.slide-fade-leave-active {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.slide-fade-enter-from {
  max-height: 0;
}

.slide-fade-enter-to {
  max-height: 500px; /* 需要根据实际内容高度调整 */
}

.slide-fade-leave-from {
  max-height: 500px; /* 需要根据实际内容高度调整 */
}

.slide-fade-leave-to {
  max-height: 0;
}
</style>
