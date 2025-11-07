<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <div class="flex flex-row items-center !mt-6 text-[16px]">
      <div>任务ID：{{ detail.rwId }}</div>
      <div class="!ml-15">用户：{{ detail.userName }}</div>
      <div class="!ml-15">检测项目：{{ detail.jcxm }}</div>
    </div>
    <vxeTable ref="tableRef" class="!mt-8" :options="tableOptions" @changePage="handlePageChange">
    </vxeTable>
    <!-- <uv-table :table-options="tableOptions" class="!mt-8"> </uv-table> -->
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

const detail = ref({
  rwId: '127272',
  userName: '甲',
  jcxm: '项目1',
  jcff: '方法1',
  yqbh: 'SN-XXXX-XX-XX-XX',
  kssj: 1749016152000,
  jssj: 1749016152000,
})
// 表格
const tableOptions = ref({
  loading: false,
  height: 500,
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
      field: 'sj',
      title: '时间',
      minWidth: 210,
      formatter: ({ row }: { row: any }) => {
        return row.sj ? dayjs(row.sj).format('YYYY年MM月DD日 HH:mm:ss') : '-'
      },
    },
    {
      field: 'xx',
      title: '信息',
      minWidth: 100,
    },
    {
      field: 'xq',
      title: '详情',
      minWidth: 250,
    },
  ],
  data: [
    {
      id: '1111',
      xh: '1',
      xx: '创建任务',
      xq: '创建任务，任务ID：xxxx',
      sj: 1749016152000,
    },
    {
      id: '112211',
      xh: '2',
      xx: '创建任务',
      xq: '创建任务，任务ID：xxxx',
      sj: 1749016152000,
    },
    {
      id: '1144411',
      xh: '3',
      xx: '创建任务',
      xq: '创建任务，任务ID：xxxx',
      sj: 1749016152000,
    },
  ],
})
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  // fetchData()
}
</script>

<style lang="less" scoped></style>
