<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="新建方法" @handle-ok="saveNewMethods">
    <template #content>
      <uvForm
        ref="uvFormRef"
        :formOptions="formOptions"
        :formRules="formRules"
        @changeSelect="changeSelect"
        :formState="formState"
      />
      <div>
        <methodsParamsLight
          v-model:methodsParams="formState.params"
          ref="methodsParamsLightRef"
          v-if="measureType === '光谱扫描'"
        />
        <lumneScenceParams
          v-model:methodsParams="formState.params"
          ref="lumneScenceParamsRef"
          v-else-if="measureType === '光度测量'"
        />
        <quantityMethodsParams
          v-model:methodsParams="formState.params"
          ref="quantityMethodsParamsRef"
          v-else-if="measureType === '定量测定'"
        />
        <timeMethodsParams
          v-model:methodsParams="formState.params"
          ref="timeMethodsParamsRef"
          v-else-if="measureType === '时间扫描'"
        />
      </div>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { reactive, ref, watch } from 'vue'
import { computed } from 'vue'

import { createMethodPort } from '@/api'
import { spectrumScanningQueryAllProject } from '@/api'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import type { SpectrumFormState } from '@/types/experimentTypes'
import lumneScenceParams from '@/views/experiment/lumneScence/components/lumneScenceParams.vue'
import quantityMethodsParams from '@/views/experiment/quantityDetermind/components/quantityMethodsParams.vue'
import methodsParamsLight from '@/views/experiment/spectralScan/components/methodsParamsLight.vue'
import timeMethodsParams from '@/views/experiment/timeScan/components/timeMethodsParams.vue'

const uvFormRef = ref<InstanceType<typeof uvForm>>()
const lumneScenceParamsRef = ref()
const methodsParamsLightRef = ref()
const quantityMethodsParamsRef = ref()
const timeMethodsParamsRef = ref()

interface selectOption {
  label: string
  value: string
}

const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue', 'createMethodsSuccess'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
type formOptionsType = {
  type: 'text' | 'input' | 'select' | 'button' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
}
const formOptions = ref<formOptionsType[]>([
  {
    type: 'select',
    label: '项目名称',
    props: 'projectId',
    options: [],
  },
  {
    type: 'input',
    label: '方法名称',
    props: 'methodName',
  },
  {
    type: 'select',
    label: '测量类型',
    props: 'methodType',
    options: [
      { label: '光度测量', value: '光度测量' },
      { label: '定量测定', value: '定量测定' },
      { label: '光谱扫描', value: '光谱扫描' },
      { label: '时间扫描', value: '时间扫描' },
    ],
  },
])

interface methodsFormState {
  projectId: string
  methodName: string
  methodType: string
  params: SpectrumFormState
  [key: string]: any
}

const formState = ref<methodsFormState>({
  projectId: '',
  methodName: '',
  methodType: '光谱扫描',
  params: {
    gain: '0',
  } as SpectrumFormState,
})
const formRules = reactive({
  methodName: [
    {
      required: true,
      message: '请输入方法名称',
      trigger: 'blur',
    },
  ],
  projectId: [
    {
      required: true,
      message: '请选择项目',
      trigger: 'change',
    },
  ],
})
watch(
  () => formState.value.methodType,
  (newValue) => {
    if (newValue === '时间扫描') {
      formState.value.params = {
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
        scanSpeed: '1',
      }
    } else if (newValue === '光谱扫描') {
      formState.value.params = {
        gain: '0',
        luminosity: '1',
        startWaveLength: '900',
        endWaveLength: '190',
        repetitionPattern: '不重复',
        repetitionTime: '2',
        timeInterval: '0',
        spectralBandwidth: '2',
        changeLampWaveLength: '361',
        energyLamp: '1',
        scanSpeed: '1',
      }
    } else if (newValue === '光度测量') {
      formState.value.params = {
        luminosity: '1',
        waveLength: ['660.5'],
        repetitionPattern: '不重复',
        repetitionTime: '2',
        timeInterval: '0',
        spectralBandwidth: '2',
        responseTime: '0.5',
        changeLampWaveLength: '361',
        energyLamp: '1',
        gain: '3',
        scanSpeed: '1',
      }
    } else if (newValue === '定量测定') {
      formState.value.params = {
        luminosity: '1',
        waveLength: ['660.5'],
        repetitionPattern: '不重复',
        repetitionTime: '2',
        timeInterval: '0',
        spectralBandwidth: '2',
        responseTime: '0.5',
        changeLampWaveLength: '361',
        energyLamp: '1',
        gain: '3',
        scanSpeed: '1',
      }
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

const measureType = ref('光谱扫描')
const changeSelect = (e: MouseEvent, item: formOptionsType) => {
  if (item.type === 'select' && item.props === 'methodType') {
    measureType.value = formState.value.methodType as string
    if (measureType.value === '定量测定') {
      formState.value.params.curveFormula = null
    }
  }
}
const methodsParamsValidate = async () => {
  if (measureType.value === '定量测定') {
    return await quantityMethodsParamsRef.value?.onSubmit()
  } else if (measureType.value === '光谱扫描') {
    return await methodsParamsLightRef.value?.onSubmit()
  } else if (measureType.value === '光度测量') {
    return await lumneScenceParamsRef.value?.onSubmit()
  } else if (measureType.value === '时间扫描') {
    return await timeMethodsParamsRef.value?.onSubmit()
  }
}
const saveNewMethods = async () => {
  const paramsValid = await methodsParamsValidate()
  const formValid = await uvFormRef.value?.onSubmit()
  console.log(formValid, paramsValid, '验证是否返回')
  if (!(formValid === true && paramsValid === true)) return
  if (measureType.value === '光度测量') {
    formState.value.params = JSON.parse(JSON.stringify(lumneScenceParamsRef.value.formState))
    formState.value.params.resultParams = lumneScenceParamsRef.value.resultParams.map(
      (item: any) => item.params,
    )
    formState.value.params.sampleInputParams = lumneScenceParamsRef.value.sampleInputParams.map(
      (item: any) => item.params,
    )
    formState.value.params.qcParams = lumneScenceParamsRef.value.qcParams.map(
      (item: any) => item.params,
    )
    formState.value.params.approxParams = lumneScenceParamsRef.value.approxParams.map(
      (item: any) => item.params,
    )
  } else if (measureType.value === '定量测定') {
    formState.value.params = JSON.parse(JSON.stringify(quantityMethodsParamsRef.value.formState))

    formState.value.params.sampleInputParams = quantityMethodsParamsRef.value.sampleInputParams.map(
      (item: any) => item.params,
    )
    formState.value.params.qcParams = quantityMethodsParamsRef.value.qcParams.map(
      (item: any) => item.params,
    )
    formState.value.params.approxParams = quantityMethodsParamsRef.value.approxParams.map(
      (item: any) => item.params,
    )
  }
  const { code, data } = await createMethodPort(formState.value)
  if (code === 200) {
    message.success('创建方法成功！')
    model.value = false
    emit('createMethodsSuccess')
  }
}
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  if (code === 200) {
    formOptions.value[0].options = data.map((item: any) => ({
      label: item.projectName,
      value: item.id,
    }))
  }
}
onMounted(() => {
  queryAllProject()
})
</script>

<style lang="less" scoped>
:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 100px !important;
}
</style>
