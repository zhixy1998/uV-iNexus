<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="样品设置" @handleOk="addSamplePortFun">
    <template #content>
      <!-- <sampleTemplate
        v-model:templateHeads="templateHeads"
        :save-colum="columnSelf"
        :measureType="props.measureType"
      /> -->
      <sampleEdit
        :measureType="measureType"
        @deleteApi="deleteSamplePortFun"
        :templateHeads="templateHeads"
        @columnData="getColumnData"
        :deleteType="`APIDelete`"
        :taskId="props.taskId"
        ref="sampleEditRef"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import message from 'ant-design-vue/es/message'
import { cloneDeep } from 'lodash-es'
import { computed, ref } from 'vue'

import uvModal from '@/components/uvModal/index.vue'

import sampleEdit from './sampleEdit.vue'
import sampleTemplate from './sampleTemplate.vue'
const emit = defineEmits(['update:modelValue', 'addSampleSuccess'])
const props = defineProps({
  modelValue: Boolean,
  taskId: String,
  methodId: String,
  measureType: {
    type: String,
    default: '光谱扫描',
  },
})
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
interface columnHead {
  name: string
  identity: string
  [key: string]: any
}
const columnSelf = ref<columnHead[]>([])
const templateHeads = ref<columnHead[]>([])
const sampleEditRef = ref()
const delSampleIdArr = ref<string[]>([])
const deleteSamplePortFun = (sampleId: string) => {
  delSampleIdArr.value.push(sampleId)
}
const getColumnData = (columnData: any) => {
  columnSelf.value = columnData
}
const sampleApi: any = inject('sampleApi')
const addSamplePortFun = async () => {
  const params = cloneDeep(sampleEditRef.value.tableData)
  params.forEach((item: any) => {
    delete item.key
  })
  const APIParams = {
    taskId: props.taskId || '',
    newSamples: params,
    methodId: props.methodId,
    delSampleIds: delSampleIdArr.value,
    heads: columnSelf.value,
  }
  const { code, data } = await sampleApi.value.addOrDeleteSamplePort(APIParams)
  if (code == 200) {
    message.success('保存样品信息成功！')
    model.value = false
    emit('addSampleSuccess')
  }
}
onMounted(() => {})
</script>
