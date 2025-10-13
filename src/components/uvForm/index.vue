<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item
      :label="item.label"
      :name="item.props"
      v-for="(item, index) in formOptions"
      :key="`${index}form`"
    >
      <template v-if="item.type === 'input'">
        <a-input v-model:value="formState[item.props]" placeholder="请输入" />
      </template>
      <template v-if="item.type === 'select'">
        <a-select v-model:value="formState[item.props]" placeholder="请选择">
          <a-select-option
            v-for="(option, index) in item.options"
            :key="`option_${index}`"
            :value="option.value"
            >{{ option.label }}</a-select-option
          >
        </a-select>
      </template>
      <template v-if="item.type === 'button'">
        <uvHasIconButton :content="item.content" />
      </template>
      <template v-if="item.type === 'text'">
        <div>{{ formState[item.props] }}</div>
      </template>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, toRaw } from 'vue'

import uvHasIconButton from '@/components/uvHasIconBtn/index.vue'

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
interface FormState {
  name: string
  region: string
  date1: string | undefined
  delivery: boolean
  type: unknown[]
  resource: string
  desc: string
  [key: string]: unknown
}

const props = defineProps({
  formOptions: {
    type: Array as () => formOptionsType[],
    default: () => [
      {
        type: 'text',
        label: 'label',
        props: 'name',
      },
      {
        type: 'input',
        label: 'label',
        props: 'region',
      },
      {
        type: 'select',
        label: 'label',
        props: 'region1',
        options: [
          { label: '北京', value: '北京' },
          { label: '北京', value: '上海' },
        ],
      },
      {
        type: 'button',
        label: 'label',
        props: 'button',
        content: '设置样品',
      },
    ],
  },
})
const labelCol = ref({
  style: { width: '90px' },
  //   span: 5,
})
const wrapperCol = reactive({
  //   span: 17,
})
const formRef = ref()
const formState: FormState = {
  name: '',
  region: '',
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
}
const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
  date1: [{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
}
const onSubmit = () => {
  formRef.value.validate().then(() => {
    console.log('values', formState, toRaw(formState))
  })
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>
