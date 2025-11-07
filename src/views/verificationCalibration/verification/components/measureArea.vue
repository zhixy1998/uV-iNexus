<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <a-tabs v-model:activeKey="activeType" type="card" :tab-position="`bottom`">
      <a-tab-pane v-for="(item, index) in activeTypeArr" :key="`type${index}`" :tab="item">
        <div class="h-[300px]">
          <vxeTable ref="tableRef" class="flex-1" :options="tableOptions"></vxeTable>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-model:activeKey="activeChart" size="small">
      <a-tab-pane key="1" tab="Tab 1">
        <lineChart class="chart-container !w-full !h-[200px]" :initial-data="data" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  treeData: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
})
const activeTypeArr = computed(() => {
  return props.treeData.map((item) => item.title)
})
const tableOptions = ref({
  loading: false,
  height: '100%',
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [
    {
      field: 'xh',
      title: '序号',
      minWidth: 80,
      fixed: 'left',
    },
    {
      field: 'rwId',
      title: '任务ID',
      minWidth: 120,
      fixed: 'left',
    },
    {
      field: 'userName',
      title: '用户',
      minWidth: 100,
    },
    {
      field: 'jcxm',
      title: '检测项目',
      minWidth: 150,
    },
    {
      field: 'jcff',
      title: '检测方法',
      minWidth: 150,
    },
    {
      field: 'yqbh',
      title: '仪器编号',
      minWidth: 150,
    },
  ],
  data: [
    {
      id: '1111',
      xh: '1',
      rwId: '127272',
      userName: '甲',
      jcxm: '项目1',
      jcff: '方法1',
      yqbh: 'SN-XXXX-XX-XX-XX',
      kssj: 1749016152000,
      jssj: 1749016152000,
    },
    {
      id: '22222',
      xh: '2',
      rwId: '127224235372',
      userName: '甲',
      jcxm: '项目1',
      jcff: '方法1',
      yqbh: '1',
      kssj: 1749016152000,
      jssj: 1749016152000,
    },
    {
      id: '11133331',
      xh: '3',
      rwId: '1272722432',
      userName: '甲',
      jcxm: '项目3',
      jcff: '方法3',
      yqbh: '3',
      kssj: 1749016152000,
      jssj: 1749016152000,
    },
  ],
})
const activeType = ref(props.treeData.map((item) => item.title)[0]) //检验类型
const activeChart = ref('1')
const data = [
  { x: 1, y: 100 },
  { x: 2, y: 200 },
  { x: 3, y: 150 },
]
</script>

<style scoped lang="less"></style>
