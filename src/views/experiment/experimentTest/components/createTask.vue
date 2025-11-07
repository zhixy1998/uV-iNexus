<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="新建任务" @handleOk="createTask">
    <template #content>
      <uvForm
        ref="uvFormRef"
        :formOptions="formOptions"
        :formState="formState"
        :form-rules="formRules"
        @clickFormItem="clickFormItem"
        @changeSelect="changeSelect"
      />
      <div class="flex items-center gap-5">
        <div class="flex items-center">
          <span class="w-22">样品信息</span>
        </div>
      </div>
      <sampleEdit
        v-if="formState.measurementType === '光谱扫描'"
        ref="sampleEditSpectralRef"
        :deleteType="`UIDelete`"
        @columnData="getColumnData"
        :isCreate="true"
      />
      <sampleEditLumne
        v-model:sampleMessage="formState.specimens"
        v-if="formState.measurementType === '光度测量'"
        :deleteType="`UIDelete`"
        @columnData="getColumnData"
        :isCreate="true"
      />
      <sampleEditTime
        v-if="formState.measurementType === '时间扫描'"
        v-model:sampleMessage="formState.specimens"
      />
      <sampleEditQuantity
        ref="sampleEditQuantityRef"
        v-if="formState.measurementType === '定量测定'"
      />
    </template>
  </uvModal>

  <spectralSampleSetting v-model="spectralSampleVisible" v-if="props.meatureType === '光谱扫描'" />

  <sampleSetting v-model="sampleVisible" v-else />
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'

import {
  luminanceModeConversionPort,
  queryProjectAllMethods,
  spectrumScanningCreateTask,
} from '@/api'
import { spectrumScanningQueryAllProject } from '@/api'
import uvForm from '@/components/uvForm/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import sampleEditLumne from '@/views/experiment/lumneScence/components/sampleEdit.vue'
import sampleEditQuantity from '@/views/experiment/quantityDetermind/components/sampleEdit.vue'
import sampleEdit from '@/views/experiment/spectralScan/components/sampleEdit.vue'
import spectralSampleSetting from '@/views/experiment/spectralScan/components/spectralSampleSetting.vue'
import sampleEditTime from '@/views/experiment/timeScan/components/sampleEdit.vue'

import sampleSetting from './sampleSetting.vue'

interface selectOption {
  label: string
  value: string
}

import { message } from 'ant-design-vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  project: {
    type: Object as PropType<{
      projectId: string
      projectName: string
    }>,
    default: () => ({}),
  },
  meatureType: {
    type: String,
    default: '',
  },
  form: {
    type: Object as any,
    default: () => ({}),
  },
})
const sampleEditQuantityRef = ref()
const sampleEditSpectralRef = ref()
type formOptionsType = {
  type: 'text' | 'input' | 'select' | 'button' // 确保type限制为这几种类型
  label: string
  props: string
  options?: selectOption[] // 只有type为select时才会有options
  content?: string // 只有type为button时才会有content
  disabled?: boolean
  value?: string
}
const emit = defineEmits(['update:modelValue', 'taskMessage'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const formOptions = reactive<formOptionsType[]>([
  {
    type: !props.meatureType ? 'select' : 'input',
    label: '项目名称',
    props: !props.meatureType ? 'projectId' : 'projectName',
    options: [],
  },
  {
    type: 'input',
    label: '任务名称',
    props: 'taskName',
  },
  {
    type: 'select',
    label: '测量类型',
    props: 'measurementType',
    disabled: !props.meatureType ? false : true,
    options: [
      { label: '光度测量', value: '光度测量' },
      { label: '定量测定', value: '定量测定' },
      { label: '光谱扫描', value: '光谱扫描' },
      { label: '时间扫描', value: '时间扫描' },
    ],
  },
  {
    type: 'select',
    label: '方法名称',
    props: 'methodId',
    options: [],
  },
  {
    type: 'input',
    label: '使用仪器',
    props: 'deviceSerialNumber',
    disabled: true,
  },
])

const spectralSampleVisible = ref(false)
const uvFormRef = ref<InstanceType<typeof uvForm>>()

interface ListSpecimens {
  key: string

  [key: string]: any
}

const columnSelf = ref<ListSpecimens[]>([])
const formState = reactive<{
  projectName: string
  measurementType: string
  taskName: string
  projectId: string
  methodId: string
  specimens: ListSpecimens[]
  deviceSerialNumber: string
  head?: ListSpecimens[]
  [key: string]: any
}>(
  props.form && JSON.stringify(props.form) !== '{}'
    ? props.form
    : {
        projectName: props.project.projectName,
        projectId: props.project.projectId,
        measurementType: props.meatureType ? props.meatureType : '光谱扫描',
        taskName: '',
        methodId: '',
        specimens: [],
        deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
      },
)
watch(
  () => formState.projectId,
  (newValue) => {
    findMethods()
  },
)
const formRules = reactive({
  taskName: [
    {
      required: true,
      message: '请输入任务名称',
      trigger: 'blur',
    },
  ],
})
const sampleVisible = ref(false)
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  if (code === 200) {
    formOptions[0].options = data.map((item: any) => ({
      label: item.projectName,
      value: item.id,
    }))
  }
}
const clickFormItem = (e: MouseEvent, item: formOptionsType) => {
  console.log(item.type, item.props, 'specimens', props.meatureType)
  if (item.type === 'button' && item.props === 'specimens') {
    if (props.meatureType === '光谱扫描') {
      spectralSampleVisible.value = true
    } else {
      sampleVisible.value = true
    }
  }
}
const changeSelect = (e: MouseEvent, item: formOptionsType) => {
  if (item.type === 'select' && item.props === 'measurementType') {
    findMethods()
  }
}
const findMethods = async () => {
  const { code, data } = await queryProjectAllMethods({
    projectId: props.project.projectId || formState.projectId,
    methodType: formState.measurementType,
  })
  if (code === 200) {
    const field = formOptions.find((item) => item.props === 'methodId')
    if (field && field.type === 'select') {
      field.options = data.map((item: any) => ({
        label: item.methodName,
        value: item.id,
      }))
    }
  }
}
const createTask = async () => {
  if (!(await uvFormRef.value?.onSubmit())) return
  const params = {
    ...formState,
  }
  params.heads = JSON.parse(JSON.stringify(columnSelf.value))
  if (formState.measurementType === '定量测定') {
    params.rationStandHeads = sampleEditQuantityRef.value.biaoColumn
    params.rationUnknowHeads = sampleEditQuantityRef.value.unkownColumn
    params.rationStandData = sampleEditQuantityRef.value.tableDataBiao
    params.rationUnknowData = sampleEditQuantityRef.value.tableDataUnknow
  } else if (formState.measurementType === '光谱扫描') {
    params.specimens = sampleEditSpectralRef.value.tableData
  }
  const { code, data } = await spectrumScanningCreateTask(params)
  if (code === 200) {
    message.success('创建任务成功！')
    model.value = false
    emit('taskMessage', {
      taskName: formState.taskName,
      taskId: data.taskId,
      methodId: data.methodId,
    })
  }
}
const getColumnData = (columnData: any) => {
  columnSelf.value = columnData
  console.log('columnData外', columnData)
}
onMounted(() => {
  if (!props.meatureType) {
    queryAllProject()
  } else {
    findMethods()
  }
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
