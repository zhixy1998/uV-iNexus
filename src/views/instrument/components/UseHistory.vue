<template>
  <section>
    <uv-collapse :parentActiveKey="activeKey" title="仪器使用记录" @changeCollapse="changeCollapse">
      <template #slot-content>
        <div class="!leading-9">
          <div class="!mb-3 text-[15px]">耗材使用记录</div>
          <uv-table :table-options="tableOptions">
            <template #table-operation>
              <text class="cursor-pointer !text-[#0038a8]">使用</text>
            </template>
          </uv-table>
        </div>
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { h, onMounted, ref } from 'vue'

import uvCollapse from '@/components/uvCollapse/index.vue'
import uvTable from '@/components/uvTable/index.vue'

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}

// 表格
const tableOptions = ref({
  rowKey: 'id',
  pagination: false,
  // rowSelection: {
  //   onChange: (selectedRowKeys: string[], selectedRows: { id?: string }[]) => {
  //     handleSelectTable(selectedRowKeys, selectedRows)
  //   },
  //   columnWidth: 50,
  //   fixed: true,
  // },
  columns: [
    {
      title: '序号',
      dataIndex: 'xh',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '器件类型',
      dataIndex: 'qjlx',
      ellipsis: true,
      resizable: true,
      width: 120,
    },
    {
      title: '统计',
      dataIndex: 'tj',
      ellipsis: true,
      resizable: true,
      width: 300,
    },
    {
      title: '健康状态',
      dataIndex: 'jkzt',
      ellipsis: true,
      resizable: true,
      customRender: (data: { text: 1 | 2 | 3 }) => {
        const statusMap = {
          1: '良好',
          2: '差',
          3: '建议更换',
        }
        const colorMap = {
          1: '#67c23a',
          2: '#ffae00',
          3: '#d40303',
        }
        return h(
          'span',
          {
            style: {
              color: colorMap[data.text],
            },
          },
          statusMap[data.text],
        )
      },
      width: 150,
    },
    {
      title: '上次更换时间',
      dataIndex: 'ghsj',
      ellipsis: true,
      resizable: true,
      customRender: (data: { text: number }) => {
        return h('span', data.text ? dayjs(data.text).format('YYYY年MM月DD日 HH:mm:ss') : '-')
      },
      width: 210,
    },
    // {
    //   type: 'operation',
    //   title: '操作',
    //   dataIndex: 'operation',
    //   ellipsis: true,
    //   resizable: true,
    //   fixed: 'right',
    //   width: 80,
    // },
  ],
  data: [
    {
      id: '1111',
      xh: '1',
      qjlx: '氘灯',
      tj: '氘灯使用时长：568/3000h',
      jkzt: 1,
      ghsj: 1749016152000,
    },
    {
      id: '2222',
      xh: '2',
      qjlx: '钨灯',
      tj: '钨灯使用时长：2568/3000h',
      jkzt: 2,
      ghsj: 1749016152000,
    },
    {
      id: '3333',
      xh: '3',
      qjlx: '汞灯',
      tj: '汞灯使用时长：3568/3000h',
      jkzt: 3,
      ghsj: 1749016152000,
    },
  ],
})
// const handleSelectTable = (selectedRowKeys: string[], selectedRows: { id?: string }[]) => {
//   console.log('selectedRowKeys: ', selectedRowKeys)
//   console.log('selectedRows: ', selectedRows)
// }

onMounted(async () => {})
</script>

<style scoped lang="less"></style>
