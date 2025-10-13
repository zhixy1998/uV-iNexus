<template>
  <uvModal v-model="model" title="新建任务">
    <template #content>
      <uvForm :formOptions="formOptions" />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
interface selectOption {
  label: string
  value: string
}

type formOptionsType = {
  type: 'text' | 'input' | 'select' | 'button' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
}
const model = defineModel()
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '项目名称',
    props: 'name',
  },
  {
    type: 'input',
    label: '任务名称',
    props: 'region',
  },
  {
    type: 'select',
    label: '选择方法',
    props: 'region1',
    options: [
      { label: '方法一', value: '方法一' },
      { label: '方法二', value: '方法二' },
    ],
  },
  {
    type: 'button',
    label: '样品信息',
    props: 'button',
    content: '设置样品',
  },
])
</script>
