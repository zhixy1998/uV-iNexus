<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="props.formRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :label-align="labelAlign"
  >
    <a-row :gutter="gutter">
      <a-col v-for="(item, index) in formOptions" :key="index" :span="24 / columnCount">
        <a-form-item :label="item.label" :name="item.props" :key="`${index}form`">
          <template v-if="item.type === 'password'">
            <a-input-password
              v-model:value="formState[item.props]"
              placeholder="请输入"
              :disabled="item.disabled"
            />
          </template>
          <template v-if="item.type === 'input'">
            <a-input
              v-model:value="formState[item.props]"
              placeholder="请输入"
              :disabled="item.disabled"
              :maxlength="item.maxlength"
              :minlength="item.minlength"
              :show-count="item.maxlength ? true : false"
            />
            {{ item.maxLength }}
          </template>
          <template v-if="item.type === 'select'">
            <a-select
              v-model:value="formState[item.props]"
              placeholder="请选择"
              :disabled="item.disabled"
              @change="changeSelect($event, item)"
            >
              <a-select-option
                v-for="(option, index) in item.options"
                :key="`option_${index}`"
                :value="option.value"
                >{{ option.label }}</a-select-option
              >
            </a-select>
          </template>
          <template v-if="item.type === 'button'">
            <uvHasIconButton :content="item.content" @click="clickFormItem($event, item)" />
          </template>
          <template v-if="item.type === 'text'">
            <div>{{ formState[item.props] || '-' }}</div>
          </template>
          <template v-if="item.type === 'upload'">
            <uploadFile
              :file-list="formState[item.props]"
              :maxCount="item.prop?.maxCount ?? 1"
              :acceptTypes="item.prop?.acceptTypes ?? '*'"
              :maxSize="item.prop?.maxSize ?? 0"
              @upload-success="changeUploadFile($event, item)"
            />
          </template>
          <template v-if="item.type === 'radio'">
            <a-radio-group v-model:value="formState[item.props]">
              <a-radio
                :value="option.value"
                v-for="(option, index) in item.options"
                :key="`radio${index}`"
                >{{ option.label }}</a-radio
              >
            </a-radio-group>
          </template>
          <template v-if="item.type === 'formula'">
            <uvMathAliveField v-model:latex="formState[item.props]"></uvMathAliveField>
          </template>
          <template v-if="item.type === 'formulaShow'">
            <MathJax :formula="`$$${formState[item.props]}$$`" />
          </template>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, toRaw } from 'vue'

import uvHasIconButton from '@/components/uvHasIconBtn/index.vue'
import type { formOptionsType } from '@/types/common'
import { max } from 'lodash-es'
import { min } from 'lodash-es'
interface selectOption {
  label: string
  value: string
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
      {
        type: 'upload',
        label: 'label',
        props: 'fileList',
        prop: {
          maxCount: 1,
        },
      },
    ],
  },
  formState: {
    type: Object as () => Record<string, any>,
    default: () => {},
  },
  formRules: {
    type: Object as () => Record<string, any>,
    defaullt: () => {},
  },
  labelCol: {
    type: Object as any,
    default: () => ({
      style: { width: '90px' },
    }),
  },
  labelAlign: {
    type: String,
    default: 'right',
  },
  columnCount: {
    type: Number,
    default: 1,
  },
})
console.log(props.formOptions, 11)
const emits = defineEmits(['clickFormItem', 'changeSelect', 'changeUploadFile'])
// 动态 gutter
const gutter = ref(24)

// 根据列数动态计算每列的 span
const columnSpan = computed(() => 24 / props.columnCount)
// const labelCol = ref({
//   style: { width: '90px' },
//   //   span: 5,
// })
const wrapperCol = reactive({
  //   span: 17,
})
const formRef = ref()
// const formState: FormState = {
//   name: '',
//   region: '',
//   date1: undefined,
//   delivery: false,
//   type: [],
//   resource: '',
//   desc: '',
// }
const onSubmit = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        resolve(false)
      })
  })
}
const resetForm = () => {
  formRef.value.resetFields()
}
const clearValidate = () => {
  formRef.value.clearValidate()
}
// const rules = {
//   taskName: [{ required: true, message: 'Please input taskName', trigger: 'blur' }],
//   region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
//   date1: [{ required: true, message: 'Please pick a date', trigger: 'change', type: 'object' }],
//   type: [
//     {
//       type: 'array',
//       required: true,
//       message: 'Please select at least one activity type',
//       trigger: 'change',
//     },
//   ],
//   resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
//   desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
// }
const clickFormItem = (e: MouseEvent, item: formOptionsType) => {
  emits('clickFormItem', e, item)
}
const changeSelect = (e: MouseEvent, item: formOptionsType) => {
  emits('changeSelect', e, item)
}

const changeUploadFile = (value: any, item: formOptionsType) => {
  props.formState[item.props] = value
  emits('changeUploadFile', value, item)
}

defineExpose({
  onSubmit,
  resetForm,
  clearValidate,
})
</script>
