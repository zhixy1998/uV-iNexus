<template>
  <div class="editable-table-container">
    <a-table
      :row-selection="rowSelection"
      :columns="mergedColumns"
      :data-source="dataSource"
      :pagination="pagination"
      :row-key="rowKey"
      bordered
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button type="link" size="small" @click="handleSave(record)">保存</a-button>
            <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
          </a-space>
        </template>
        <template v-else-if="editableColumns.includes(column.dataIndex as string)">
          <div @click="handleCellClick(record, column.dataIndex as string, index)">
            <a-input
              v-if="editingCell[`${record[rowKey]}-${column.dataIndex}`]"
              v-model:value="record[column.dataIndex as string]"
              @blur="handleCellBlur(record, column.dataIndex as string)"
              @pressEnter="handleCellBlur(record, column.dataIndex as string)"
            />
            <template v-else>
              {{ record[column.dataIndex as string] }}
            </template>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import type { TablePaginationConfig } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import type { PropType } from 'vue'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
interface ColumnType {
  title: string
  dataIndex: string
  width?: number
  editable?: boolean
  [key: string]: any
}

interface TableProps {
  columns: ColumnType[]
  dataSource: any[]
  rowKey?: string
  pagination?: TablePaginationConfig | false
  selectedRowKeys?: (string | number)[]
  editableColumns?: string[]
}

export default defineComponent({
  name: 'uvEditCellTable',
  props: {
    columns: {
      type: Array as () => ColumnType[],
      required: true,
    },
    dataSource: {
      type: Array,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    pagination: {
      type: [Object, Boolean] as PropType<TablePaginationConfig | false>,
      default: () => ({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      }),
    },
    selectedRowKeys: {
      type: Array as () => (string | number)[],
      default: () => [],
    },
    editableColumns: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  emits: ['update:selectedRowKeys', 'update:dataSource', 'change', 'save', 'delete', 'cellEdit'],
  setup(props, { emit }) {
    const innerDataSource = ref(cloneDeep(props.dataSource))
    const selectedKeys = ref<(string | number)[]>(props.selectedRowKeys || [])
    const editingCell = reactive<Record<string, boolean>>({})

    // 合并列，添加操作列
    const mergedColumns = computed(() => {
      const columns = [...props.columns]
      if (columns.findIndex((col) => col.dataIndex === 'operation') === -1) {
        columns.push({
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
        })
      }
      return columns
    })

    // 行选择配置
    const rowSelection = computed(() => ({
      selectedRowKeys: selectedKeys.value,
      onChange: (selectedRowKeys: (string | number)[]) => {
        selectedKeys.value = selectedRowKeys
        emit('update:selectedRowKeys', selectedRowKeys)
      },
      getCheckboxProps: (record: any) => ({
        disabled: record.disabled, // 可以配置某些行不可选
      }),
    }))

    // 处理表格变化（分页、排序、筛选）
    const handleTableChange = (pag: TablePaginationConfig, filters: any, sorter: any) => {
      emit('change', pag, filters, sorter)
    }

    // 单元格点击开始编辑
    const handleCellClick = (record: any, dataIndex: string, index: number) => {
      if (props.editableColumns.includes(dataIndex)) {
        const key = `${record[props.rowKey]}-${dataIndex}`
        editingCell[key] = true
      }
    }

    // 单元格失去焦点结束编辑
    const handleCellBlur = (record: any, dataIndex: string) => {
      const key = `${record[props.rowKey]}-${dataIndex}`
      editingCell[key] = false
      emit('cellEdit', { record, dataIndex, value: record[dataIndex] })
    }

    // 保存行数据
    const handleSave = (record: any) => {
      emit('save', record)
    }

    // 删除行
    const handleDelete = (record: any) => {
      emit('delete', record)
    }

    // 监听外部数据源变化
    watch(
      () => props.dataSource,
      (newVal) => {
        innerDataSource.value = cloneDeep(newVal)
      },
      { deep: true },
    )

    // 监听选中的行变化
    watch(
      () => props.selectedRowKeys,
      (newVal) => {
        if (newVal) {
          selectedKeys.value = newVal
        }
      },
    )

    return {
      mergedColumns,
      rowSelection,
      editingCell,
      handleTableChange,
      handleCellClick,
      handleCellBlur,
      handleSave,
      handleDelete,
    }
  },
})
</script>

<style scoped>
.editable-table-container {
  width: 100%;
}

.editable-table-container :deep(.ant-table-cell) {
  padding: 8px;
}

.editable-table-container :deep(.ant-table-cell:hover) {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
