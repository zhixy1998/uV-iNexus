<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="参考标准" @handleOk="queryMultiTablesFun">
    <template #content>
      <div class="flex items-center !mb-10">
        <span class="w-30">标准名称</span>
        <a-input v-model:value="checkMethods" @keyup.enter="fetchData" />
      </div>
      <a-table
        :dataSource="tableOptions.data"
        :columns="tableOptions.columns"
        :pagination="tableOptions.pagination"
        :row-class-name="getRowClassName"
        :customRow="customRow"
        :scroll="{ x: 1500 }"
        rowKey="id"
      >
      </a-table>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue'

const props = defineProps({
  modelValue: Boolean,
  condition: {
    type: String,
    default: '',
  },
})
import { queryCanKaoQianDetail, queryMultiTables } from '@/api'
const emit = defineEmits(['update:modelValue', 'formParams'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const checkMethods = ref(props.condition)
const pagination = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    fetchData()
  },
  onShowSizeChange: (current: number, size: number) => {
    pagination.current = current
    pagination.pageSize = size
    fetchData()
  },
})
interface TableDataType {
  standardName: string
  [key: string]: unknown
}
interface TableOptions {
  data: TableDataType[]
  [key: string]: unknown
}
const tableOptions = ref<TableOptions>({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 60,
      customRender: (data: { text: string; record: any; index: number }) => {
        const { current, pageSize } = pagination // 假设有唯一id
        return (current - 1) * pageSize + data.index + 1
      },
    },
    {
      title: '检测方法',
      dataIndex: 'standardIdentity',
      ellipsis: true,
      resizable: true,
    },
    {
      title: '行业',
      dataIndex: 'industry',
      ellipsis: true,
      resizable: true,
    },
    {
      title: '标准号',
      dataIndex: 'standardNumber',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
    {
      title: '标准名称',
      dataIndex: 'standardName',
      ellipsis: true,
      resizable: true,
      width: 300,
    },
    {
      title: '标准类型',
      dataIndex: 'industryType',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
    {
      title: '发布时间',
      dataIndex: 'releaseDate',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '生效时间',
      dataIndex: 'effectiveDate',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '失效时间',
      dataIndex: 'expirationDate',
      ellipsis: true,
      resizable: true,
    },
  ],
  data: [],
  pagination: {
    ...pagination,
  },
})
const selectedRowKeys = ref(null)
const getRowClassName = (record: any) => {
  return record.id === selectedRowKeys.value ? 'selected-row' : ''
}
const handleRowClick = (record: any) => {
  console.log('res', '调用了rowClick', record)
  selectedRowKeys.value = record.id === selectedRowKeys.value ? null : record.id
}
const customRow = (record: any) => {
  return {
    onClick: () => {
      handleRowClick(record)
    },
  }
}

const rowSelection = ref({
  type: 'radio', // 单选模式
  fixed: 'left',
  selectedRowKeys,
  onChange: (selectedKeys: any) => {
    console.log('selectedKeys', selectedKeys)
    selectedRowKeys.value = selectedKeys
  },
})
const fetchData = async () => {
  const { code, data } = await queryCanKaoQianDetail({
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
    standard_name: checkMethods.value,
  })
  tableOptions.value.data = data.data
  pagination.total = data.total
  tableOptions.value = {
    ...tableOptions.value,
    pagination: {
      ...pagination,
    },
  }
}

const queryMultiTablesFun = async () => {
  if (!selectedRowKeys.value) {
    message.error('请选择参考标准！')
    return
  }
  const { code, data } = await queryMultiTables(selectedRowKeys.value)
  const row: TableDataType | undefined = tableOptions.value.data.find(
    (item: any) => item.id === selectedRowKeys.value,
  )
  if (code === 200) {
    model.value = false
    emit('formParams', { ...data, standardName: row?.standardName })
  }
}
onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped>
:deep(.selected-row) {
  background-color: #8794a3 !important;
}
:deep(.ant-table-cell-row-hover) {
  background-color: transparent !important;
}
:deep(.ant-table-tbody > tr > td) {
  background-color: transparent !important;
}
</style>
