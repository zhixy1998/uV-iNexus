<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" :title="modelTitle" @handle-ok="handleOk">
    <template #content>
      <div v-if="modelTitle === '待计算结果'" class="!mb-5">
        <!-- 可参与计算的变量 {{ calcuationParams.join(',') }}&nbsp;&nbsp;&nbsp;&nbsp; -->
        可参与计算的变量&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-for="item in inputParams" :key="item">
          {{ item.params.resultIdentity }}&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>
      <uvForm
        ref="uvFormRef"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { computed, type PropType, reactive, ref, watch } from 'vue'

import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { formOptionsType } from '@/types/common'
import { conciseCheckFormula, conciseCheckSampleInputParam } from '@/api'
const props = defineProps({
  modelValue: Boolean,
  addOrEdit: {
    type: String,
    default: 'add',
  },
  modelTitle: {
    type: String,
    default: '输入参数',
  },
  sampleParams: {
    type: Object as PropType<Record<string, any>>,
  },
  inputParams: {
    type: Object as PropType<Record<string, any>>,
    default: () => {},
  },
  computedParams: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  measureType: {
    type: String,
    default: '',
  },
})
const uvFormRef = ref()
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '显示标题',
    props: 'projectName',
    maxlength: 50,
    minlength: 1,
  },
  {
    type: 'input',
    label: '标记(Qm)',
    props: 'remark',
    maxlength: 20,
    minlength: 1,
  },
  {
    type: 'input',
    label: '单位(mg)',
    props: 'unit',
    maxlength: 20,
    minlength: 1,
  },
])
const calcuationParams = computed(() => {
  return props.computedParams.map((item) => `${item}Abs`)
})
const emit = defineEmits(['update:modelValue', 'sampleParamsChange'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const formState = ref<Record<string, any>>({})
watch(
  () => props.sampleParams,
  (newValue) => {
    formState.value = newValue as Record<string, any>
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  () => props.modelTitle,
  (newValue) => {
    if (props.modelTitle === '待计算结果') {
      formOptions.value = [
        {
          type: 'input',
          label: '显示标题',
          props: 'resultName',
          maxlength: 50,
          minlength: 1,
        },
        {
          type: 'input',
          label: '结果标识',
          props: 'resultIdentity',
          maxlength: 20,
          minlength: 1,
        },
        {
          type: 'input',
          label: '结果单位',
          props: 'unit',
          maxlength: 20,
          minlength: 1,
        },
        {
          type: 'formula',
          label: '计算公式',
          props: 'formulaText',
          maxlength: 50,
          minlength: 1,
        },
      ]
    } else if (props.modelTitle === '修约设置') {
      formOptions.value = [
        {
          type: 'input',
          label: '修约变量',
          props: 'resultIdentity',
        },
        {
          type: 'input',
          label: '修约条件',
          props: 'roundingCondition',
          maxlength: 20,
          minlength: 1,
        },
        {
          type: 'select',
          label: '修约方式',
          props: 'roundingType',
          options: [
            {
              label: '有效位数',
              value: '有效位数',
            },
            {
              label: '小数位数',
              value: '小数位数',
            },
          ],
        },
        {
          type: 'select',
          label: '位数',
          props: 'decimalPlaces',
          options: [
            {
              label: '0',
              value: '0',
            },
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
            },
            {
              label: '5',
              value: '5',
            },
            {
              label: '6',
              value: '6',
            },
          ],
        },
      ]
    } else if (props.modelTitle === '质控设置') {
      formOptions.value = [
        {
          type: 'select',
          label: '质控类型',
          props: 'controlType',
          options: [
            {
              label: '吸光度质控',
              value: '吸光度质控',
            },
            {
              label: '空白质控',
              value: '空白质控',
            },
            {
              label: '平行样质控',
              value: '平行样质控',
            },
            {
              label: '标曲R质控',
              value: '标曲R质控',
            },
            {
              label: '加标回收质控',
              value: '加标回收质控',
            },
            {
              label: '标曲斜率质控',
              value: '标曲斜率质控',
            },
          ],
        },
        {
          type: 'input',
          label: '控制范围',
          props: 'controlFormula',
          maxlength: 20,
          minlength: 1,
        },
        {
          type: 'select',
          label: '超限操作',
          props: 'overLimitOperation',
          options: [
            {
              label: '停止测量',
              value: '停止测量',
            },
            {
              label: '继续测量下一个',
              value: '继续测量下一个',
            },
            {
              label: '重新测量',
              value: '重新测量',
            },
          ],
        },
      ]
    } else {
      formOptions.value = [
        {
          type: 'input',
          label: '显示标题',
          props: 'paramName',
          maxlength: 50,
          minlength: 1,
        },
        {
          type: 'input',
          label: '标记(Qm)',
          props: 'resultIdentity',
          maxlength: 20,
          minlength: 1,
        },
        {
          type: 'input',
          label: '单位(mg)',
          props: 'unit',
          maxlength: 20,
          minlength: 1,
        },
      ]
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
const formRules = ref({
  resultIdentity: [
    {
      validator: (_rule: any, value: any) => {
        if (!value || value.length === 0) {
          return Promise.resolve()
        }

        // 验证每个待计算结果的标识不能是A-Z
        if (/^[A-Z]$/.test(value)) {
          return Promise.reject('标识不能是A-Z字母')
        }

        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
})
const handleOk = async () => {
  if (!(await uvFormRef.value?.onSubmit())) return
  let res: any
  if (props.modelTitle === '样品输入参数') {
    res = await conciseCheckSampleInputParam({
      inputParamList: props.inputParams.map((item: any) => item.params),
      newInputParam: formState.value,
    })
  } else if (props.modelTitle === '待计算结果') {
    res = await conciseCheckFormula({
      inputParamList: props.inputParams.map((item: any) => item.params),
      newFormula: formState.value,
      measureType: props.measureType,
    })
  }
  if (res) {
    if (res.code === 200) {
      emit('sampleParamsChange', formState.value)
      model.value = false
    }
  } else {
    emit('sampleParamsChange', formState.value)
    model.value = false
  }
}
</script>
