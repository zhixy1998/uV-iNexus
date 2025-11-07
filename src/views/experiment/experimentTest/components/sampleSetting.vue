<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="样品设置">
    <template #content>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="标准样品">
          <uvEditCellTable />
        </a-tab-pane>
        <a-tab-pane key="2" tab="未知样品">
          <uvEditCellTable />
        </a-tab-pane>
      </a-tabs>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

import uvEditCellTable from '@/components/uvEditCellTable/index.vue'
import uvModal from '@/components/uvModal/index.vue'
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const activeKey = ref('1')
const columns = ref([
  {
    title: '序号',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '编号',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
])
const tableData = ref([
  {
    id: '1',
    name: '张三',
    age: 30,
    address: '北京市朝阳区',
  },
  {
    id: '2',
    name: '李四',
    age: 25,
    address: '上海市浦东新区',
  },
  {
    id: '3',
    name: '王五',
    age: 28,
    address: '广州市天河区',
  },
])
const selectedRowKeys = ref<string[]>([])
const handleSelectChange = (keys: string) => {
  selectedRowKeys.value = [keys]
  console.log('选中行:', keys)
}

const handleCellEdit = ({
  record,
  dataIndex,
  value,
}: {
  record: string
  dataIndex: number
  value: unknown
}) => {
  console.log('单元格编辑:', record, dataIndex, value)
  // 这里可以调用API保存单元格数据
}
</script>
