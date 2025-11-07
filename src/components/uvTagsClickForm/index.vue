<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="flex items-center flex-wrap gap-y-2">
    <span class="w-22" v-if="title">{{ title }}</span>
    <VueDraggable
      :disabled="dragDisabled"
      :modelValue="tags"
      @update:modelValue="emit('update:tags', $event)"
    >
      <template v-for="(tag, index) in tags" :key="`tag${tag}`">
        <a-tooltip :title="tag.label" v-if="!isHaveFormula(tag.label)">
          <a-tag
            :class="{
              'cursor-pointer': !/^[A-Za-z]$/.test(tag.params.resultIdentity),
              'cursor-not-allowed': /^[A-Za-z]$/.test(tag.params.resultIdentity),
              '!mb-[5px]': index !== tags.length - 1,
            }"
            :closable="!/^[A-Za-z]$/.test(tag.params.resultIdentity) && !disabled"
            @close="handleClose(index)"
            @click="
              !/^[A-Za-z]$/.test(tag.params.resultIdentity) &&
              !disabled &&
              handleTagClick(tag, index)
            "
          >
            <MathJax v-if="isHaveFormula(tag.label)" :formula="tag.label" />
            <span v-else class="break-all text-wrap">{{
              tag.label.length > 50 ? `${tag.label.slice(0, 50)}...` : tag.label
            }}</span>
          </a-tag>
        </a-tooltip>
        <a-tag
          v-else
          class="cursor-auto"
          :closable="!disabled"
          @close="handleClose(index)"
          @click="!disabled && handleTagClick(tag, index)"
        >
          <MathJax v-if="isHaveFormula(tag.label)" :formula="tag.label" />
        </a-tag>
      </template>
    </VueDraggable>
    <plus-outlined @click="addTags" v-if="!disabled" class="!ml-1" />
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import { extractFormulaWithDelimiters } from '@/composables'
import type { TagItem } from '@/types/common'

const props = defineProps({
  tags: {
    type: Array as PropType<TagItem[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: '快捷标记点',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  dragDisabled: {
    type: Boolean,
    default: true,
  },
})
const isHaveFormula = (tag: string) => {
  return extractFormulaWithDelimiters(tag)
}
const emit = defineEmits<{
  (e: 'update:tags', tags: TagItem[]): void
  (e: 'addTags'): void
  (e: 'tagClick', tags: TagItem, index: number): void
}>()
const handleClose = (index: number) => {
  // 创建新数组，排除要删除的元素
  const newTags = [...props.tags]
  newTags.splice(index, 1)
  emit('update:tags', newTags)
}
const addTags = () => {
  emit('addTags')
}
const handleTagClick = (tag: TagItem, index: number) => {
  emit('tagClick', tag, index)
}
</script>
