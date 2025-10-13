<template>
  <uvModal v-model="model" title="新建项目">
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
    type: 'input',
    label: '项目名称',
    props: 'name',
  },
  {
    type: 'input',
    label: '备注',
    props: 'name1',
  },
])
</script>
