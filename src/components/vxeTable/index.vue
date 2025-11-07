<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="vxe-grid-container !h-full">
    <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents">
      <!-- 动态插槽：支持所有名称的插槽 -->
      <!-- 操作列 -->
      <template v-for="slotName in Object.keys($slots)" :key="slotName" #[slotName]="scope">
        <slot :name="slotName" v-bind="scope" />
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import { max, merge } from 'lodash-es'
import { ref, watch } from 'vue'
import type { VxeGridInstance, VxeGridListeners } from 'vxe-table'

const props = defineProps<{
  options: any
}>()

// 表格实例引用
const gridRef = ref<VxeGridInstance>()

// Grid 配置选项
const gridOptions = ref<any>({
  round: true,
  border: true,
  minHeight: 50,
  // maxHeight: max([window.innerHeight - 400, 500]),
  height: null,
  columnConfig: {
    resizable: true,
  },
  rowConfig: {
    keyField: 'id',
    isHover: true,
    autoHeight: true, // 启用自动行高
  },
  cellConfig: {
    height: 'auto',
  },
  headerCellConfig: {
    height: 'auto',
    // color: '#f5f5f5',
  },
  headerCellStyle: {
    background: '#F3F5F7',
    color: '#595757',
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  editConfig: {
    trigger: 'click', // manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）
    mode: 'cell', // cell（单元格编辑模式）,row（行编辑模式）
    enabled: true,
  },
  checkboxConfig: {
    // 设置复选框支持分页勾选，需要设置 keyField 行数据主键
    reserve: true,
  },
  showOverflow: 'tooltip',
  showHeaderOverflow: 'tooltip',
  sortConfig: {
    remote: true,
  },
  // tooltipConfig: {
  //   showAll: true,
  //   theme: 'dark',
  // },
})

watch(
  () => props.options,
  (newVal) => {
    gridOptions.value = merge(gridOptions.value, newVal)
    gridOptions.value.data = newVal.data
  },
  { immediate: true, deep: true },
)

const emit = defineEmits([
  'changePage',
  'currentRowChange',
  'sortChange',
  'rowDragend',
  'checkboxChange',
  'cellClick',
])

// 表格事件
const gridEvents: VxeGridListeners = {
  // 修改分页
  pageChange({ pageSize, currentPage }) {
    gridOptions.value.pagerConfig.currentPage = currentPage
    gridOptions.value.pagerConfig.pageSize = pageSize
    emit('changePage', gridOptions.value.pagerConfig)
  },
  // 选中当前行
  currentRowChange({ row }) {
    emit('currentRowChange', row)
  },
  // 排序
  sortChange({ field, order }) {
    emit('sortChange', field, order)
  },
  // 行拖拽完成
  rowDragend({ newRow, oldRow, dragPos }) {
    emit('rowDragend', newRow, oldRow, dragPos)
  },
  checkboxChange() {
    const selectedRowKeys = gridRef.value?.getCheckboxRecords().map((item) => item.id)
    emit('checkboxChange', selectedRowKeys)
  },
  cellClick({ row, column }) {
    emit('cellClick', row, column)
  },
  checkboxAll() {
    const selectedRowKeys = gridRef.value?.getCheckboxRecords().map((item) => item.id)
    emit('checkboxChange', selectedRowKeys)
  },
}
defineExpose({
  gridRef,
})
</script>

<style scoped lang="less">
:deep(.vxe-cell--wrapper) {
  text-align: center;
  justify-content: center;
  font-size: 14px;
}

:deep(.vxe-cell--title) {
  font-weight: bold !important;
}

:deep(.vxe-cell--col-resizable) {
  width: 1.5px;
  background: #e6e6e6;
}

:deep(.vxe-cell--col-resizable) {
  right: 0px;
}
</style>
