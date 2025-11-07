<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
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
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'

import { querySampleList, querySpectrumSampleHeads } from '@/api'
import uvEditCellTable from '@/components/uvEditCellTable/index.vue'

interface DataItem {
  key: string

  [key: string]: any
}

const props = defineProps({
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
    type: 'select',
    options: [
      {
        label: '样品池1',
        value: '1',
      },
      {
        label: '样品池2',
        value: '2',
      },
      {
        label: '样品池3',
        value: '3',
      },
      {
        label: '样品池4',
        value: '4',
      },
      {
        label: '样品池5',
        value: '5',
      },
    ],
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
    type: 'select',
    options: [
      {
        label: '样品池1',
        value: '1',
      },
      {
        label: '样品池2',
        value: '2',
      },
      {
        label: '样品池3',
        value: '3',
      },
      {
        label: '样品池4',
        value: '4',
      },
      {
        label: '样品池5',
        value: '5',
      },
    ],
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])

const tableData = ref([])
const deleteRow = (record: { key: any; sampleId: any }) => {
  if (props.deleteType === 'APIDelete' && record.sampleId) {
    emit('deleteApi', record.sampleId)
    tableData.value = tableData.value.filter((item: any) => item.key !== record.key)
  } else {
    tableData.value = tableData.value.filter((item: any) => item.key !== record.key)
  }
}
const getSelfColumn = (columnData: any) => {
  emit('columnData', columnData)
}
const querySampleHeadsFun = async () => {
  const { code, data } = await querySpectrumSampleHeads({
    taskId: props.taskId,
  })
  if (code === 200) {
    transformColumnData(data)
  }
}
const querySampleListFun = async () => {
  const params: { taskId: string; type?: string } = {
    taskId: props.taskId || '',
  }
  const { code, data } = await querySampleList(params)
  if (code == 200) {
    tableData.value = data || []
    tableData.value.forEach((item: any) => {
      item.key = item.sampleId
    })
  }
}
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = (columnData: any) => {
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
      querySampleListFun()
    }
  })
})

defineExpose({
  tableData,
})
</script>
