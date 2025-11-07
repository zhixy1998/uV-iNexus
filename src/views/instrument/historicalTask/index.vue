<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="uv-container h-full">
    <div class="detail-card h-full flex flex-col gap-5">
      <div class="flex items-center justify-between !mb-3">
        <div class="detail-card-title">历史检测任务</div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-row">
          <div class="search-item">
            <a-input v-model:value="ruleForm.search" placeholder="请输入" style="width: 380px" />
            <div class="label">搜索</div>
          </div>
          <div class="!ml-[20px] search-item">
            <a-range-picker
              v-model:value="ruleForm.dateRange"
              :placeholder="['请选择开始日期', '请选择结束日期']"
            />
            <div class="label">日期范围</div>
          </div>
        </div>
        <div class="flex flex-row items-center !ml-[20px]">
          <a-button @click="handleSearch(0)">清空</a-button>
          <a-button type="primary" class="!ml-[20px]" @click="handleSearch(1)">搜索</a-button>
        </div>
      </div>
      <!-- <uv-table :table-options="tableOptions" class="!mt-10">
        <template #table-operation="{ record }">
          <text class="cursor-pointer" :style="{ color: primaryColor }" @click="handleDetail(record)"
            >详情</text
          >
        </template>
      </uv-table> -->
      <vxeTable
        ref="tableRef"
        class="flex-1"
        :options="tableOptions"
        @changePage="handlePageChange"
      >
        <template #active="{ row }">
          <text
            class="cursor-pointer !mr-5"
            :style="{ color: primaryColor }"
            @click="handleDetail(row)"
            >详情</text
          >
        </template>
      </vxeTable>
    </div>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()
const router = useRouter()

// 筛选
const ruleForm = ref({
  search: '',
  dateRange: [],
})
const handleSearch = (type: number) => {
  console.log('handleSearch', type)
  if (!type)
    ruleForm.value = {
      search: '',
      dateRange: [],
    }
}
// 表格
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
    {
      field: 'kssj',
      title: '开始时间',
      minWidth: 210,
      formatter: ({ row }: { row: any }) => {
        return row.kssj ? dayjs(row.kssj).format('YYYY年MM月DD日 HH:mm:ss') : '-'
      },
    },
    {
      field: 'jssj',
      title: '结束时间',
      minWidth: 210,
      formatter: ({ row }: { row: any }) => {
        return row.jssj ? dayjs(row.jssj).format('YYYY年MM月DD日 HH:mm:ss') : '-'
      },
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      minWidth: 80,
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
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
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  // fetchData()
}
const handleDetail = (row: any) => {
  console.log('handleDetail', row)
  router.push({ name: 'historicalTaskDetail', query: { id: row.id } })
}
</script>

<style lang="less" scoped>
.search-item {
  position: relative;
  .label {
    position: absolute;
    top: -15px;
    left: 10px;
    margin: 0px 2px;
    font-size: 15px;
    font-weight: bold;
    background-color: #fff;
    color: #666;
  }
}
</style>
