<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" :title="modelTitle" @handle-ok="handleOk" :okTitle="'保存成新方法'">
    <template #content>
      <quantityMethodsParams v-model:methodsParams="formState" :addOrEdit="`edit`" />
    </template>
  </uvModal>
  <uvModal v-model="roundVisual" :size="'smail'" title="修约方式设置" @handle-ok="handleRoundOk">
    <template #content>
      <div class="flex items-center">
        <span class="w-30">需要修约的变量</span>
        <div class="!w-xs text-[#5565f8]">叶绿素含量/&</div>
      </div>
      <br />
      <div class="flex items-center">
        <span class="w-30">修约变量</span>
        <a-select ref="select" v-model:value="roundState.name" class="!w-xs !ml-2">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <br />
      <div class="flex items-center">
        <span class="w-30">修约条件</span>
        <a-input v-model:value="roundState.name" class="!w-xs !ml-2" />
      </div>
      <br />
      <div class="flex items-center">
        <span class="w-30">修约方式</span>
        <a-select ref="select" v-model:value="roundState.name" class="!w-xs !ml-2">
          <!-- <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
        </a-select>
      </div>
      <br />
      <div class="flex items-center">
        <span class="w-30">位数</span>
        <a-select ref="select" v-model:value="roundState.name" class="!w-xs !ml-2">
          <!-- <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
        </a-select>
      </div>
      <br />
    </template>
  </uvModal>
  <saveOtherMethods v-model="otherMethodsVisual" @handleOk="saveOtherNewMethods" />
</template>
<script lang="ts" setup>
import { computed, inject, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { editQuantityMethodParam } from '@/api'
import uvModal from '@/components/uvModal/index.vue'
import saveOtherMethods from '@/views/experiment/experimentTest/components/saveOtherMethods.vue'

import quantityMethodsParams from './quantityMethodsParams.vue'
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
})
const emit = defineEmits(['update:modelValue', 'handleOk'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const defaultFormState = {
  measureType: 'spectralScan',
  methodName: '',
  luminosity: '',
  startWaveLength: '',
  endWaveLength: '',
  waveLengthInterval: '',
  repetitionPattern: '',
  repetitionTime: '',
  timeInterval: '',
  spectralBandwidth: '',
  responseTime: '',
  changeLampWaveLength: '',
  energyLamp: '钨灯',
  gain: 0,
  waveLengthFormula: '',
  curveFormula: '',
}
const formState = ref<any>(defaultFormState)
const otherMethodsVisual = ref(false)
watch(
  () => props.addOrEdit,
  (val) => {
    if (val === 'edit') {
      // Object.assign(formState, { ...props.methodsParams })
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
const router = useRouter()
const roundState = reactive({
  name: '',
  region: undefined,
  date1: undefined,
  energyLamp: '钨灯',
  type: [],
  resource: '',
  desc: 0,
})
const tags = ref(['660', '450'])
const roundVisual = ref(false)
const handleRoundOk = () => {}
const handleClose = (removedTag: string) => {
  const tagsReset = tags.value.filter((tag) => tag !== removedTag)
  tags.value = tagsReset
}
const handleOk = () => {
  otherMethodsVisual.value = true
}
const saveOtherNewMethods = async () => {
  try {
    const { code, data } = await editQuantityMethodParam({
      ...formState.value,
      projectId: props.projectId,
    })
    // router.push({ name: 'spectralScan' })
  } catch (err) {
    console.log(err)
  }

  model.value = false
  // formState.value = { ...defaultFormState }
  emit('handleOk', formState.value.methodId)
}
</script>
