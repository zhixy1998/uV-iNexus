<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="flex items-center flex-wrap gap-y-2">
    <span class="w-25 text-[15px]" v-if="title">{{ title }}</span>
    <template v-for="(tag, index) in tags" :key="`tag${index}`">
      <a-tooltip :title="tag">
        <a-tag :closable="!disabled" @close="handleClose(tag, index)" class="!text-[15px]">
          {{ typeof tag === 'string' && tag.length > 50 ? `${tag.slice(0, 50)}...` : tag }}
        </a-tag>
      </a-tooltip>
    </template>
    <a-input
      v-if="inputMarkVisible"
      ref="inputRef"
      type="text"
      size="small"
      class="w-[78px]"
      v-model:value="inputValue"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <plus-outlined @click="showInput" class="!ml-1" v-if="!disabled" />
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { nextTick, ref } from 'vue'

const props = defineProps({
  tags: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: '快捷标记点',
  },
  customize: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可重复
  isCanRepeat: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:tags', 'customizeEvent'])
const handleClose = (removedTag: any, index: number) => {
  const tagsReset = props.tags.filter((tag, tabIndex) => tabIndex !== index)
  emit('update:tags', tagsReset)
}
const inputMarkVisible = ref()
const inputRef = ref<HTMLInputElement>()
const inputValue = ref<string>()
const showInput = () => {
  if (props.customize) {
    emit('customizeEvent')
  } else {
    inputMarkVisible.value = true
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

const handleInputConfirm = () => {
  const isCanRepeat = props.isCanRepeat
  let tags = props.tags || []
  if (!isCanRepeat && inputValue.value && tags.indexOf(inputValue.value) === -1) {
    tags = [...tags, inputValue.value]
  } else if (isCanRepeat && inputValue.value) {
    tags = [...tags, inputValue.value]
  }
  emit('update:tags', tags)
  inputValue.value = ''
  inputMarkVisible.value = false
}
</script>
