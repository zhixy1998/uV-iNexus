<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uv-collapse
      :parentActiveKey="activeKey"
      title="仪器使用记录"
      style-name="background: #F4FAFF"
      @changeCollapse="changeCollapse"
    >
      <template #slot-content>
        <div class="!leading-9">
          <div class="!mb-3 text-[15px] !font-bold">耗材使用记录</div>
          <vxeTable ref="tableRef" :options="tableOptions"> </vxeTable>
        </div>
      </template>
    </uv-collapse>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { h, onMounted, ref } from 'vue'

import light1 from '@/assets/images/instrument/light1.png'
import light2 from '@/assets/images/instrument/light2.png'
import uvCollapse from '@/components/uvCollapse/index.vue'

// 折叠面板
const activeKey = ref<string>('')
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string
}

// 表格
const tableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  columns: [
    {
      field: 'xh',
      title: '序号',
      width: 120,
    },
    {
      field: 'qjlx',
      title: '器件类型',
      width: 150,
      slots: {
        default: ({ row }: any) => {
          return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              },
            },
            [
              h('img', {
                src: row.qjlx === '钨灯' ? light1 : light2,
                style: {
                  width: '30px',
                  height: '30px',
                },
              }),
              h('span', row.qjlx),
            ],
          )
        },
      },
    },
    {
      field: 'tj',
      title: '统计',
    },
    {
      field: 'jkzt',
      title: '健康状态',
      width: 150,
      slots: {
        default: ({ row }: any) => {
          const statusMap: any = {
            1: '良好',
            2: '差',
            3: '建议更换',
          }
          const colorMap: any = {
            1: '#67c23a',
            2: '#ffae00',
            3: '#d40303',
          }
          return h(
            'span',
            {
              style: {
                color: colorMap[row.jkzt],
              },
            },
            statusMap[row.jkzt],
          )
        },
      },
    },
    {
      field: 'ghsj',
      title: '上次更换时间',
      width: 230,
      formatter: (row: { ghsj: number }) => {
        return dayjs(row.ghsj).format('YYYY年MM月DD日 HH:mm:ss')
      },
    },
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
