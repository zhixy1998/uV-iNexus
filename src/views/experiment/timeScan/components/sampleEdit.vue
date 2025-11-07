<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-spin tip="Loading..." :spinning="loading">
    <uvEditCellTable
      :initialColumns="columns"
      v-model:initialData="tableData"
      :thIsEdit="true"
      :showAddColumn="true"
      @colInfo="getSelfColumn"
    >
      <template #operation="{ record }">
        <DeleteOutlined @click="deleteRow(record)" />
      </template>
    </uvEditCellTable>
  </a-spin>
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'

import { getTimeSampleHeaders } from '@/api'
import uvEditCellTable from '@/components/uvEditCellTable/index.vue'

interface DataItem {
  key: string
  [key: string]: any
}

const props = defineProps({
  sampleMessage: {
    type: Array as PropType<DataItem[]>,
    default: () => [],
  },
  columnSelf: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  deleteType: {
    type: String as PropType<'APIDelete' | 'UIDelete'>,
    default: 'UIDelete',
  },
  taskId: {
    type: String,
  },
  isCreate: {
    type: Boolean,
    default: false,
  },
})
watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      querySampleHeadsFun()
    }
  },
)
watch(
  () => props.columnSelf,
  (newValue) => {
    transformColumnData(newValue)
  },
)
const emit = defineEmits(['update:sampleMessage', 'deleteApi', 'columnData'])

const columns = ref([
  {
    title: '样品编号',
    dataIndex: 'sampleNumber',
    key: 'sampleNumber',
    width: 200,
  },
  {
    title: '样品名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 200,
  },
  {
    title: '样品位置',
    dataIndex: 'sampleLocation',
    key: 'sampleLocation',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])
const columnsCopy = ref([
  {
    title: '样品编号',
    dataIndex: 'sampleNumber',
    key: 'sampleNumber',
    width: 200,
  },
  {
    title: '样品名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 200,
  },
  {
    title: '样品位置',
    dataIndex: 'sampleLocation',
    key: 'sampleLocation',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])

const tableData = ref(props.sampleMessage)
watch(
  () => tableData.value,
  (newValue) => {
    const sampleMessage = newValue.map((item: any) => {
      const newItem = cloneDeep(item) // 创建浅拷贝
      delete newItem.key // 删除 key 属性
      return newItem
    })
    emit('update:sampleMessage', sampleMessage)
  },
  { deep: true },
)
const deleteRow = (record: any) => {
  if (props.deleteType === 'APIDelete' && record.sampleId) {
    emit('deleteApi', record.sampleId)
    tableData.value = tableData.value.filter((item) => item.key !== record.key)
  } else {
    tableData.value = tableData.value.filter((item) => item.key !== record.key)
  }
}
const getSelfColumn = (columnData: any) => {
  console.log('columnData', columnData)
  emit('columnData', columnData)
}
const loading = ref(true)
const querySampleHeadsFun = async () => {
  loading.value = true
  const { code, data } = await getTimeSampleHeaders({
    taskId: props.taskId || '',
  })
  if (code === 200) {
    await transformColumnData(data)
    loading.value = false
  }
}
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = async (columnData: any) => {
  const columnArr = columnData.map((item: any) => {
    return {
      title: item.name,
      dataIndex: item.identity,
      width: 200,
      key: item.identity,
      canDel: true,
    }
  })
  columns.value = JSON.parse(JSON.stringify(columnsCopy.value))
  const newColumns = [...columns.value]
  newColumns.splice(3, 0, ...reactive(columnArr))
  columns.value = newColumns
}
onMounted(() => {
  nextTick(() => {
    if (!props.isCreate) {
      querySampleHeadsFun()
    }
  })
})
</script>
