<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal
    v-model="model"
    :title="modelTitle"
    :bodyStyle="{ padding: '0px' }"
    @handle-ok="saveOtherNewMethods"
    :okTitle="'保存成新方法'"
    :footer="formDisabled ? null : true"
  >
    <template #content>
      <timeMethodsParams
        ref="methodsParamsRef"
        v-model:methodsParams="formState"
        :addOrEdit="addOrEdit"
        :formDisabled="props.formDisabled"
      />
    </template>
  </uvModal>
  <saveOtherMethods v-model="otherMethodsVisual" @handleOk="saveOtherNewMethods" />
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { updateTimeMethodParameter } from '@/api'
import uvModal from '@/components/uvModal/index.vue'
import saveOtherMethods from '@/views/experiment/experimentTest/components/saveOtherMethods.vue'

import timeMethodsParams from './timeMethodsParams.vue'
const props = defineProps({
  modelValue: Boolean,
  addOrEdit: {
    type: String,
    default: 'add',
  },
  modelTitle: {
    type: String,
    default: '修改方法参数',
  },
  methodsParams: {
    type: Object as () => Partial<typeof defaultFormState>,
    default: () => ({}),
  },
  projectId: {
    type: String,
    default: '',
  },
  formDisabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'getMethodId'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const defaultFormState = {
  measureType: 'timeScan',
  methodName: '',
  luminosity: '1',
  waveLength: '660',
  referenceStandardName: '',
  preProcessParameters: [],
  scanTime: '60',
  scanUnit: '0',
  intervalTime: '1',
  totalNumber: '3600',
  multiPoolMode: '1',
  spectralBandwidth: '2',
  responseTime: '0.5',
  changeLampWaveLength: '361',
  energyLamp: '1',
  gain: '3',
}
const formState = ref(defaultFormState)
const otherMethodsVisual = ref(false)
watch(
  () => props.addOrEdit,
  (val) => {
    if (val === 'edit') {
      formState.value = { ...defaultFormState, ...props.methodsParams }
    } else {
      formState.value = { ...defaultFormState }
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
const handleOk = () => {
  otherMethodsVisual.value = true
}
const methodsParamsRef = ref()
const saveOtherNewMethods = async () => {
  if (!(await methodsParamsRef.value?.onSubmit())) return
  const { code, data } = await updateTimeMethodParameter({
    ...formState.value,
    projectId: props.projectId,
  })
  model.value = false
  if (code === 200) {
    emit('getMethodId', data)
  }
}
</script>
