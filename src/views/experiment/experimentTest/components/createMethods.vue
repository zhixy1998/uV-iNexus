<template>
  <uvModal v-model="model" title="新建方法">
    <template #content>
      <uvForm :formOptions="formOptions" />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
const model = defineModel()
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
const formOptions = ref<formOptionsType[]>([
  {
    type: 'text',
    label: '项目名称',
    props: 'name1',
  },
  {
    type: 'input',
    label: '方法名称',
    props: 'name',
  },
  {
    type: 'select',
    label: '测量类型',
    props: 'name2',
    options: [
      { label: '光度测量', value: '光度测量' },
      { label: '双组分定量分析', value: '双组分定量分析' },
    ],
  },
])
</script>
