<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="样品设置" @handle-ok="handleOk">
    <template #content>
      <sampleTemplate
        v-model:templateHeads="templateHeads"
        :saveColum="columnSelf"
        :measureType="`定量测定`"
      />
      <sampleEdit
        ref="sampleEditRef"
        :task-id="projectDetail.taskId"
        :templateHeads="templateHeads"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import sampleTemplate from '@/components/measureResult/components/sampleTemplate.vue'
import { addQuantitySampleList } from '@/api'
import uvModal from '@/components/uvModal/index.vue'

import sampleEdit from './sampleEdit.vue'
import { ref } from 'vue'
interface columnHead {
  name: string
  identity: string
  [key: string]: any
}
const props = defineProps({
  projectDetail: {
    type: Object,
    default: () => ({
      taskId: '',
      taskName: '',
      methodId: '',
      methodName: '',
      projectId: '',
      projectName: '',
    }),
  },
})
const emits = defineEmits(['closeSampleEdit'])
const model = ref(false)
const sampleEditRef = ref()
const columnSelf = computed(() => {
  if (!sampleEditRef.value) return []
  if (sampleEditRef.value.activeKey === '0') {
    //标准样品
    return sampleEditRef.value.biaoColumn
  } else {
    return sampleEditRef.value.unkownColumn
  }
})
const templateHeads = ref<columnHead[]>([])
const showSampleEdit = () => {
  model.value = true
  nextTick(() => {
    sampleEditRef.value.activeKey = '0'
    sampleEditRef.value.getSampleList('0')
    sampleEditRef.value.querySampleHeadsFun('0')
    sampleEditRef.value.getSampleList('1')
    sampleEditRef.value.querySampleHeadsFun('1')
  })
}

const closeSampleEdit = () => {
  model.value = false
  sampleEditRef.value.deleteKeys = []
}

const handleOk = async () => {
  const { code, message } = await addQuantitySampleList({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
    newStandSamples: sampleEditRef.value.tableDataBiao,
    newUnknowSamples: sampleEditRef.value.tableDataUnknow,
    standHeads: sampleEditRef.value.biaoColumn,
    unknowHeads: sampleEditRef.value.unkownColumn,
    delSampleIds: sampleEditRef.value.deleteKeys,
  })
  if (code === 200) {
    notification.success({
      message: '成功',
      description: message,
      duration: 3,
    })
    emits('closeSampleEdit')
    closeSampleEdit()
  }
}

defineExpose({
  showSampleEdit,
})
</script>
