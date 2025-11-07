<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="0" tab="标准样品">
      <uvEditCellTable
        ref="uvEditCellTableBiaoRef"
        :initialColumns="column1"
        :thIsEdit="false"
        :showAddColumn="false"
        :showColumnConfig="true"
        v-model:initialData="tableDataBiao"
        @colInfo="getSelfBiaoColumn"
      >
        <template #operation="{ record }">
          <DeleteOutlined @click="deleteRow(record)" />
        </template>
      </uvEditCellTable>
    </a-tab-pane>
    <a-tab-pane key="1" tab="未知样品">
      <uvEditCellTable
        ref="uvEditCellTableUnknowRef"
        :initialColumns="column2"
        :thIsEdit="false"
        :showAddColumn="false"
        :showColumnConfig="true"
        @colInfo="getSelfUnkownColumn"
        v-model:initialData="tableDataUnknow"
      >
        <template #operation="{ record }">
          <DeleteOutlined @click="deleteRow(record)" />
        </template>
      </uvEditCellTable>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'

import { getQuantitySampleList, queryQuantitySampleHeads } from '@/api'
import uvEditCellTable from '@/components/uvEditCellTable/index.vue'

interface Column {
  title: string
  dataIndex: string
  key: string
  width?: number
  canDel?: boolean
  printTitle?: string
  locate?: string

  [key: string]: any
}

interface DataItem {
  key: string

  [key: string]: any
}

const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
  templateHeads: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
})
watch(
  () => props.templateHeads,
  (newValue) => {
    console.log('调用了这里', newValue)
    transformColumnData(newValue, activeKey.value)
  },
)
// tabs切换
const activeKey = ref('0')

const uvEditCellTableBiaoRef = ref()
const uvEditCellTableUnknowRef = ref()
const column1 = ref<Column[]>([
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])
const column1Copy = ref([
  {
    title: '编号',
    dataIndex: 'sampleNumber',
    key: 'sampleNumber',
    width: 200,
  },
  {
    title: '名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 200,
  },
  {
    title: '样品类型',
    dataIndex: 'sampleType',
    key: 'sampleType',
    width: 200,
    type: 'select',
    options: [
      {
        label: '空白样品',
        value: 'empty',
      },
      {
        label: '标准样品',
        value: 'stand',
      },
    ],
  },
  {
    title: '标准浓度',
    dataIndex: 'normalConcentration',
    key: 'normalConcentration',
    width: 200,
  },
  // {
  //   title: '样品位置',
  //   dataIndex: 'sampleLocation',
  //   key: 'sampleLocation',
  //   width: 200,
  // },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])
const column2 = ref<Column[]>([
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])
const column2Copy = ref([
  {
    title: '编号',
    dataIndex: 'sampleNumber',
    key: 'sampleNumber',
    width: 200,
  },
  {
    title: '名称',
    dataIndex: 'sampleName',
    key: 'sampleName',
    width: 200,
  },
  {
    title: '样品类型',
    dataIndex: 'sampleType',
    key: 'sampleType',
    width: 200,
    type: 'select',
    options: [
      {
        label: '空白样品',
        value: 'empty',
      },
      {
        label: '未知样品',
        value: 'unknown',
      },
    ],
  },
  {
    title: '稀释倍数',
    dataIndex: 'dilutionRatio',
    key: 'dilutionRatio',
    width: 200,
  },
  {
    title: '取样量',
    dataIndex: 'sampleVolume',
    key: 'sampleVolume',
    width: 200,
  },
  // {
  //   title: '样品位置',
  //   dataIndex: 'sampleLocation',
  //   key: 'sampleLocation',
  //   width: 200,
  // },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
  },
])
const biaoColumn = ref([])
const unkownColumn = ref([])
const tableDataBiao = ref()
const tableDataUnknow = ref()
const getSelfBiaoColumn = (columnData: any) => {
  biaoColumn.value = columnData
}
const getSelfUnkownColumn = (columnData: any) => {
  unkownColumn.value = columnData
}
const deleteKeys = ref<string[]>([])
const deleteRow = (record: { sampleId?: string; key?: string }) => {
  if (record.sampleId) deleteKeys.value.push(record.sampleId)
  if (activeKey.value === '0') {
    tableDataBiao.value = tableDataBiao.value.filter((item: any) =>
      item.sampleId ? item.sampleId !== record.sampleId : item.key !== record.key,
    )
  } else {
    tableDataUnknow.value = tableDataUnknow.value.filter((item: any) =>
      item.sampleId ? item.sampleId !== record.sampleId : item.key !== record.key,
    )
  }
}
const getSampleList = async (sampleKind: any) => {
  const { code, data } = await getQuantitySampleList({
    sampleKind: sampleKind,
    taskId: props.taskId,
  })
  if (code === 200)
    if (sampleKind === '0') {
      tableDataBiao.value = data.map((item: any) => ({
        ...item,
        key: item.sampleId,
      }))
    } else {
      tableDataUnknow.value = data.map((item: any) => ({
        ...item,
        key: item.sampleId,
      }))
    }
}
const querySampleHeadsFun = async (sampleKind: any) => {
  const { code, data } = await queryQuantitySampleHeads({
    sampleKind: sampleKind,
    taskId: props.taskId,
  })
  if (code === 200) {
    transformColumnData(data, sampleKind)
    if (sampleKind === '0') {
      biaoColumn.value = data
    } else if (sampleKind === '1') {
      unkownColumn.value = data
    }
  }
}
const transformColumnData = (columnData: any, activeKey: string) => {
  const columnArr = columnData.map((item: any) => {
    return {
      title: item.name,
      dataIndex: item.identity,
      width: 200,
      key: item.identity,
      locate: item.locate,
      canDel: false,
    }
  })
  columnArr.forEach((item: any) => {
    if (item.dataIndex === 'sampleType') {
      item.type = 'select'
      item.options =
        activeKey === '0'
          ? [
              {
                label: '空白样品',
                value: 'empty',
              },
              {
                label: '标准样品',
                value: 'stand',
              },
            ]
          : [
              {
                label: '空白样品',
                value: 'empty',
              },
              {
                label: '未知样品',
                value: 'unknown',
              },
            ]
    } else if (item.dataIndex === 'sampleLocation') {
      item.type = 'select'
      item.options = [
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
      ]
    }
  })
  if (activeKey === '0') {
    column1.value = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
      },
    ]
    const newColumns = [...column1.value]
    newColumns.splice(0, 0, ...reactive(columnArr))
    column1.value = newColumns
  } else {
    column2.value = [
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
      },
    ]
    const newColumns = [...column2.value]
    newColumns.splice(0, 0, ...reactive(columnArr))
    column2.value = newColumns
  }
}

defineExpose({
  tableDataBiao,
  tableDataUnknow,
  uvEditCellTableBiaoRef,
  uvEditCellTableUnknowRef,
  biaoColumn,
  unkownColumn,
  getSampleList,
  querySampleHeadsFun,
  activeKey,
  deleteKeys,
})
</script>
