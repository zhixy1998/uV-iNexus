<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <uvEditCellTable
      :initialColumns="columns"
      v-model:initialData="tableData"
      :thIsEdit="false"
      :showAddColumn="false"
      :showColumnConfig="true"
      :columnConfigHeaders="columnConfigHeaders"
      :defaultSampleType="'unknown'"
      :measureType="measureType"
      @colInfo="getSelfColumn"
    >
      <template #operation="{ record }">
        <DeleteOutlined @click="deleteRow(record)" />
      </template>
    </uvEditCellTable>
    <div v-if="isRepeat" class="text-[#FF0101] !mt-[20px]">注意：样品编号重复</div>
  </div>
</template>
<script lang="ts" setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { type PropType, watch } from 'vue'

import uvEditCellTable from '@/components/uvEditCellTable/index.vue'

const props = defineProps({
  measureType: {
    type: String,
    default: '光谱扫描',
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
  templateHeads: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
})
watch(
  () => props.templateHeads,
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
  // transformColumnData(columnData)
  emit('columnData', columnData)
}
const sampleApi: any = inject('sampleApi')
const columnConfigHeaders = ref([])
const querySampleHeadsFun = async () => {
  const { code, data } = await sampleApi.value.querySampleHeads({
    taskId: props.taskId,
  })
  if (code === 200) {
    columnConfigHeaders.value = data
    transformColumnData(data)
  }
}
const querySampleListFun = async () => {
  const params: { taskId: string; type?: string } = {
    taskId: props.taskId || '',
  }
  const { code, data } = await sampleApi.value.querySampleList(params)
  if (code == 200) {
    tableData.value = data || []
    tableData.value.forEach((item: any) => {
      item.key = item.sampleId
      if (props.measureType === '光度测量') item.sampleType = item.sampleType ?? 'unknown'
    })
  }
}
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = (columnData: any) => {
  const columnArr = columnData.map((item: any) => {
    return {
      title: item.name,
      dataIndex: item.identity,
      printTitle: item.printTitle || item.name,
      width: 200,
      key: item.identity,
      locate: item.locate,
      canDel: false,
    }
  })
  columnArr.forEach((item: any) => {
    if (item.dataIndex === 'sampleType') {
      item.type = 'select'
      if (props.measureType === '光度测量') {
        item.options = [
          {
            label: '未知样品',
            value: 'unknown',
          },
        ]
        item.defaultValue = 'unknown'
      } else {
        item.options = [
          {
            label: '空白样品',
            value: 'empty',
          },
          {
            label: '标准样品',
            value: 'stand',
          },
          {
            label: '空白样品',
            value: 'empty',
          },
          {
            label: '未知样品',
            value: 'unknown',
          },
        ]
      }
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
  columns.value = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
    },
  ]
  // columns.value = JSON.parse(JSON.stringify(columnsCopy.value))
  const newColumns = [...columns.value]
  newColumns.splice(0, 0, ...reactive(columnArr))
  // newColumns.splice(3, 0, ...reactive(columnArr))

  columns.value = newColumns
}

// 检查数组中是否有重复值
const isRepeat = computed(() => {
  if (tableData.value && tableData.value.length) {
    return tableData.value.some((item: any, index: number) => {
      return (
        tableData.value.findIndex((item2: any) => item2.sampleNumber === item.sampleNumber) !==
        index
      )
    })
  }
})

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
