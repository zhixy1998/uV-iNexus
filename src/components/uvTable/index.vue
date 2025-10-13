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
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'operation'">
          <slot name="table-operation"></slot>
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
    rowSelection?: {
      onChange?: (selectedRows: { id?: string }[]) => void
      columnWidth?: number
      fixed?: boolean
    }
    // 表格列
    columns: TableColumn[]
    // 表格数据
    data: { id?: string }[]
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
    data: [] as { id?: string }[],
  }),
})
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}
</script>

<style></style>
