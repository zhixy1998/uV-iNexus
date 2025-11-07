<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="样品设置" @handleOk="addOrDeleteSampleFun">
    <template #content>
      <!-- <sampleTemplate v-model:templateHeads="templateHeads" /> -->
      <sampleEdit
        v-model:sampleMessage="sampleMessage"
        :columnSelf="templateHeads"
        v-if="showSampleMessage"
        @deleteApi="deleteSamplePortFun"
        @columnData="getColumnData"
        :deleteType="`APIDelete`"
        :taskId="props.taskId"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { computed, onMounted, ref, watch } from 'vue'

import { addOrDeleteTimeSamplePort, getTimeSampleList } from '@/api'
import uvModal from '@/components/uvModal/index.vue'

import sampleEdit from './sampleEdit.vue'
// import sampleTemplate from './sampleTemplate.vue'
const emit = defineEmits(['update:modelValue', 'sampleSaveSuccess'])
const props = defineProps({
  modelValue: Boolean,
  taskId: {
    type: String,
  },
  methodId: {
    type: String,
  },
})
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

watch(
  () => props.taskId,
  (newTaskId) => {
    getSampleListFun()
  },
)

interface DataItem {
  key: string
  [key: string]: any
}
interface columnHead {
  name: string
  identity: string
  [key: string]: any
}
const columnSelf = ref<columnHead[]>([])
const templateHeads = ref<columnHead[]>([])
const sampleMessage = ref<DataItem[]>([])
const showSampleMessage = ref(false)
const getSampleListFun = async () => {
  const params: { taskId: string; type?: string } = {
    taskId: props.taskId || '',
  }
  const { code, data } = await getTimeSampleList(params)
  if (code == 200) {
    sampleMessage.value = data
    sampleMessage.value.forEach((item: any) => {
      item.key = item.sampleId
    })
    showSampleMessage.value = true
  }
}
const delSampleIdArr = ref<string[]>([])
const deleteSamplePortFun = (sampleId: string) => {
  delSampleIdArr.value.push(sampleId)
}
const getColumnData = (columnData: any) => {
  columnSelf.value =
    columnData && columnData.length
      ? columnData.map((item: any) => ({
          ...item,
          locate: 'sample',
        }))
      : []
}
const addOrDeleteSampleFun = async () => {
  const params = {
    taskId: props.taskId || '',
    methodId: props.methodId,
    newSamples: sampleMessage.value,
    delSampleIds: delSampleIdArr.value,
    heads: columnSelf.value,
  }
  const { code, data } = await addOrDeleteTimeSamplePort(params)
  if (code == 200) {
    message.success('保存样品信息成功！')
    model.value = false
    emit('sampleSaveSuccess')
  }
}
onMounted(() => {
  getSampleListFun()
})
</script>
