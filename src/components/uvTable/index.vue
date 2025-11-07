<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <a-table
      :dataSource="tableOptions.data"
      :columns="tableOptions.columns"
      :pagination="tableOptions.pagination"
      :row-selection="tableOptions.rowSelection"
      :row-key="tableOptions.rowKey || 'id'"
      @resizeColumn="handleResizeColumn"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <slot name="table-operation" :record="record"></slot>
          <!-- 使用时 -->
          <!-- <template #table-operation>
            <text class="!text-[#0038a8]">使用</text>
          </template> -->
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
// 定义表格列的类型
type TableColumn = {
  title?: string
  dataIndex?: string
  key?: string // 如果设置了dataIndex 可以忽略这个属性
  width?: number
  ellipsis?: boolean
  resizable?: boolean
  type?: string
  fixed?: string
}
type TProps = {
  tableOptions: {
    rowKey?: string
    // 可选值 Object | false
    pagination?: { pageSize: number; total: number } | boolean
    rowSelection?: any
    // 表格列
    columns: TableColumn[]
    // 表格数据
    data: any[]
  }
}
const props = withDefaults(defineProps<TProps>(), {
  tableOptions: () => ({
    rowKey: 'id',
    pagination: {
      pageSize: 10,
      total: 0,
    },
    rowSelection: {
      onChange: (selectedRows: { id?: string }[]) => {},
      columnWidth: 50,
      fixed: true,
    },
    columns: [] as TableColumn[], // 明确类型，空数组作为默认值
    data: [] as any[],
  }),
})
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}
</script>

<style lang="less" scoped>
:deep(.ant-table) {
  border-radius: 0px !important;
}

:deep(.ant-table-thead > tr > th) {
  font-size: 15px !important;
  text-align: center;
  font-weight: bold;
  // background: #153471;
  padding: 0px;
  // color: #fff;
  height: 40px;
}

:deep(.ant-table-tbody > tr > td) {
  height: 50px;
  text-align: center;
  font-size: 15px !important;
  padding: 0px;
}

:deep(
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
      [colspan]
    )::before
) {
  background-color: #fff;
}
</style>
