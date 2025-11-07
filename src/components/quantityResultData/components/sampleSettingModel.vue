<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="样品设置" @handle-ok="handleOk">
    <template #content>
      <!-- <sampleTemplate
        v-model:templateHeads="templateHeads"
        :saveColum="columnSelf"
        :measureType="`定量测定`"
      /> -->
      <sampleEditModel
        ref="sampleEditRef"
        :task-id="projectDetail.taskId"
        :templateHeads="templateHeads"
        :methodsParams="methodsParams"
      />
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message, notification } from 'ant-design-vue'
import sampleTemplate from '@/components/measureResult/components/sampleTemplate.vue'

import sampleEditModel from './sampleEditModel.vue'
import { ref } from 'vue'
import type { SpectrumFormState } from '@/types/experimentTypes'
import { debounce } from 'lodash-es'
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
    }),
  },
  methodsParams: {
    type: Object as () => SpectrumFormState,
    default: () => ({}),
  },
})
const sampleApi: any = inject('sampleApi') // 接口

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
    if (props.methodsParams.coefficientMode === 'direct') {
      // 直接系数法
      sampleEditRef.value.activeKey = '1'
      sampleEditRef.value.getSampleList('1')
      sampleEditRef.value.querySampleHeadsFun('1')
    } else {
      // 标准曲线法
      sampleEditRef.value.activeKey = '0'
      sampleEditRef.value.getSampleList('0')
      sampleEditRef.value.querySampleHeadsFun('0')
      sampleEditRef.value.getSampleList('1')
      sampleEditRef.value.querySampleHeadsFun('1')
    }
  })
}

const closeSampleEdit = () => {
  model.value = false
  sampleEditRef.value.deleteKeys = []
}

const handleOk = debounce(async () => {
  const normalConcentration = sampleEditRef.value.tableDataBiao.filter(
    (item: any) => !item.normalConcentration,
  )
  if (normalConcentration.length) {
    message.error('请填写完整标准浓度')
    return
  }
  if (props.projectDetail?.taskId) {
    const { code } = await sampleApi.value.addQuantitySampleList({
      taskId: props.projectDetail?.taskId,
      methodId: props.projectDetail?.methodId,
      newStandSamples: sampleEditRef.value.tableDataBiao,
      newUnknowSamples: sampleEditRef.value.tableDataUnknow,
      standHeads: sampleEditRef.value.biaoColumn,
      unknowHeads: sampleEditRef.value.unkownColumn,
      delSampleIds: sampleEditRef.value.deleteKeys,
    })
    if (code === 200) {
      message.success('保存样品信息成功！')
      model.value = false
      emits('closeSampleEdit')
      closeSampleEdit()
    }
  }
}, 300)

defineExpose({
  showSampleEdit,
})
</script>
