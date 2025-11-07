<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <a-row class="p-2">
      <DeleteOutlined class="text-xl cursor-pointer" />
    </a-row>
    <a-table
      :dataSource="tableMethodsOptions.data"
      :columns="tableMethodsOptions.columns"
      :rowKey="tableMethodsOptions.rowKey"
      :row-selection="rowSelection"
      :pagination="tableMethodsOptions.pagination"
      size="middle"
    >
      <template #lastUseTime="{ text }">
        {{ text }}
      </template>
      <template #operation>
        <div class="flex w-full justify-around">
          <SaveOutlined class="text-xl cursor-pointer" />
        </div>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

import { listOfMethods } from '@/api'
const selectedRowKeys = ref<string[]>([])
const paginationMethods = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `共 ${total} 项`,
  onChange: (page: number, pageSize: number) => {
    paginationMethods.current = page
    paginationMethods.pageSize = pageSize
    listOfMethodsFun()
  },
  onShowSizeChange: (current: number, size: number) => {
    paginationMethods.current = current
    paginationMethods.pageSize = size
    listOfMethodsFun()
  },
})
const tableMethodsOptions = ref({
  rowKey: 'id',
  columns: [
    {
      title: '临时数据',
      dataIndex: 'methodName',
    },
    {
      title: '对应方法',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      slots: { customRender: 'operation' },
    },
  ],
  data: [{}],
  pagination: paginationMethods,
})
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (selectedKeys: string[]) => {
    selectedRowKeys.value = selectedKeys
  },
  columnWidth: 40,
}))
const listOfMethodsFun = async (sort?: string) => {
  const { code, data } = await listOfMethods({
    pageNum: tableMethodsOptions.value.pagination.current,
    pageSize: tableMethodsOptions.value.pagination.pageSize,
    // methodName: methodsValue.value,
    sort: sort === 'descend' ? '0' : '1',
  })
  tableMethodsOptions.value.data = data.data
  tableMethodsOptions.value.pagination.total = data.total
}
</script>

<style scoped lang="less"></style>
