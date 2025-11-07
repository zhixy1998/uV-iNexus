<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <vxe-grid
    ref="gridRef"
    border
    show-overflow
    :data="tableData"
    :columns="tableColumns"
    :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }"
    :checkbox-config="{ range: selectable }"
    :keyboard-config="{ isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true }"
    @edit-actived="handleEdit"
    @edit-closed="handleEdit"
  >
    <!-- 自定义工具栏插槽 -->
    <template #toolbar_buttons>
      <slot name="toolbar"></slot>
    </template>
  </vxe-grid>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { VxeColumnPropTypes, VxeGridInstance } from 'vxe-table'
import { type VxeColumnProps, VxeGrid, type VxeGridProps } from 'vxe-table'

interface TableColumn extends VxeColumnProps {
  field: string
  title: string
  editRender?: VxeColumnPropTypes.EditRender
  // 其他自定义属性
}

interface Props {
  initialData?: any[]
  initialColumns?: TableColumn[]
  editable?: boolean
  selectable?: boolean
  copyPaste?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => [],
  initialColumns: () => [],
  editable: true,
  selectable: true,
  copyPaste: true,
})

const emit = defineEmits(['update:data', 'update:columns', 'cell-edit', 'column-edit'])

const gridRef = ref<VxeGridInstance>()
const tableData = ref<any[]>(props.initialData)
const tableColumns = ref<TableColumn[]>(props.initialColumns)

// 添加表头编辑方法
// const startEditHeader = (column: TableColumn) => {
//   if (gridRef.value) {
//     gridRef.value.setHeaderEdit(column.field)
//   }
// }

// 表头编辑完成
const handleHeaderEdit = ({ column, $event }: any) => {
  updateColumnTitle(column.property, $event.target.value)
}

// 动态添加行
const addRow = (rowData: any = {}, index?: number) => {
  if (typeof index === 'number') {
    tableData.value.splice(index, 0, rowData)
  } else {
    tableData.value.push(rowData)
  }
}

// 动态添加列
const addColumn = (column: TableColumn, index?: number) => {
  const newColumn = {
    ...column,
    editRender: props.editable ? { name: 'input' } : undefined,
  }

  if (typeof index === 'number') {
    tableColumns.value.splice(index, 0, newColumn)
  } else {
    tableColumns.value.push(newColumn)
  }
}

// 删除行
const removeRow = (rowIndex: number) => {
  tableData.value.splice(rowIndex, 1)
}

// 删除列
const removeColumn = (field: string) => {
  const index = tableColumns.value.findIndex((col) => col.field === field)
  if (index >= 0) {
    tableColumns.value.splice(index, 1)
  }
}

// 更新列名
const updateColumnTitle = (field: string, newTitle: string) => {
  const column = tableColumns.value.find((col) => col.field === field)
  if (column) {
    column.title = newTitle
    emit('column-edit', { field, title: newTitle })
  }
}

// 单元格编辑
const handleEdit = ({ row, column }: any) => {
  emit('cell-edit', { row, column: column.property })
}

// 暴露方法
defineExpose({
  addRow,
  addColumn,
  removeRow,
  removeColumn,
  updateColumnTitle,
  getTableData: () => tableData.value,
  getTableColumns: () => tableColumns.value,
  getGridRef: () => gridRef.value,
})

// 监听数据变化
watch(
  tableData,
  (newVal) => {
    emit('update:data', newVal)
  },
  { deep: true },
)

watch(
  tableColumns,
  (newVal) => {
    emit('update:columns', newVal)
  },
  { deep: true },
)

// 选中的数据
const selectedData = ref<any[]>([])

// 框选配置
const selectConfig = reactive({
  mode: 'range', // 范围选择模式
  area: 'all', // 可以选择所有区域
  checkMethod: ({ row, column }: any) => {
    // 可以自定义选择条件
    return true
  },
})

// 复制功能
const copySelection = () => {
  if (gridRef.value) {
    const selectRecords = gridRef.value.getCheckboxRecords()
    if (selectRecords.length > 0) {
      const text = selectRecords
        .map((row) => {
          return tableColumns.value.map((col) => row[col.field]).join('\t')
        })
        .join('\n')

      navigator.clipboard.writeText(text).then(() => {
        // 可以添加通知或日志
        console.log('复制成功')
      })
    }
  }
}

// 粘贴功能
const pasteData = async (startRow = 0, startCol = 0) => {
  try {
    const text = await navigator.clipboard.readText()
    const rows = text.split('\n').filter((row) => row.trim())

    rows.forEach((row, rowIndex) => {
      const cols = row.split('\t')
      const dataRow = tableData.value[startRow + rowIndex] || {}

      cols.forEach((value, colIndex) => {
        const column = tableColumns.value[startCol + colIndex]
        if (column) {
          dataRow[column.field] = value
        }
      })

      if (!tableData.value[startRow + rowIndex]) {
        tableData.value.push(dataRow)
      }
    })
  } catch (error) {
    console.error('粘贴失败:', error)
  }
}

// 键盘事件监听
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 'c') {
      copySelection()
    } else if (event.key === 'v') {
      pasteData()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* 自定义样式 */
</style>
