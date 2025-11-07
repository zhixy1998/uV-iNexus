<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="rounded-[20px] bg-[#F4FAFF] !h-full flex flex-col">
    <div class="title-box flex justify-between items-center text-[18px] flex-none">
      <span class="!font-bold">附件设置</span>
      <div class="flex items-center gap-[10px]">
        <!--        <div class="button" @click="handleClick(1)">多联池空比色皿匹配</div>-->
        <!--        <div class="button" @click="handleClick(2)">清空</div>-->
      </div>
    </div>
    <div class="text-[16px] leading-[36px] text-[#616170] flex-1 overflow-hidden">
      <div v-if="!deviceSerialNumber" class="flex justify-center !mt-[50px]">
        <a-empty description="请先连接仪器" />
      </div>
      <div v-else class="container h-full flex flex-col">
        <span>当前附件：{{ currentDetail.attachmentTypeName }}</span>
        <div class="flex items-center">
          <span>自动切换样品池：</span>
          <a-switch
            v-model:checked="currentDetail.isAutoChangePool"
            :disabled="tableOptions.data && tableOptions.data.length > 1 ? false : true"
            @change="handleChangePool"
          />
        </div>
        <div class="flex-1 overflow-hidden">
          <vxeTable ref="tableRef" :options="tableOptions" @cellClick="handleCurrentRow">
          </vxeTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { h, onMounted, ref, watch } from 'vue'
import selectedIcon from '@/assets/images/methodOptimization/selected_icon.png'
import {
  conciseChangeSampleAttachmentInfo,
  conciseQuerySampleAttachmentInfo,
  conciseSetCurrentPool,
} from '@/api'
import { message } from 'ant-design-vue'

const deviceSerialNumber = localStorage.getItem('deviceSerialNumber')

const props = defineProps({
  taskId: {
    type: String,
    default: '',
  },
  currentPoolNum: {
    type: String,
    default: '',
  },
  measureType: {
    type: String,
    default: '',
  },
})

watch(
  () => props.currentPoolNum,
  (newValue) => {
    currentDetail.value.currentPoolNum = newValue
  },
)

watch(
  () => props.measureType,
  (newValue) => {
    if (newValue) {
      tableOptions.value.columns.forEach((item: any) => {
        if (item.field === 'poolPurpose')
          item.cellRender.options =
            newValue === '光谱扫描'
              ? [
                  {
                    label: '基线',
                    value: 2,
                  },
                  {
                    label: '测量',
                    value: 3,
                  },
                ]
              : [
                  {
                    label: '校零',
                    value: 1,
                  },
                  {
                    label: '测量',
                    value: 3,
                  },
                ]
      })
    }
  },
  { deep: true },
)

// 表格数据
const tableOptions = ref({
  loading: false,
  height: '100%',
  pagerConfig: {
    enabled: false,
  },
  columns: [
    {
      field: 'currentPoolNum',
      title: '定位到',
      width: '20%',
      slots: {
        default: ({ row }: any) => {
          if (row.poolNum == currentDetail.value.currentPoolNum)
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              [
                h(ArrowRightOutlined, {
                  class: '!text-[18px]',
                }),
              ],
            )
        },
      },
    },
    {
      field: 'currentPoolNum2',
      title: '',
      width: '15%',
      slots: {
        default: ({ row }: any) => {
          if (row.poolNum == currentDetail.value.currentPoolNum)
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
              [
                h('img', {
                  src: selectedIcon,
                  class: 'w-[18px] h-[18px]', // 添加左边距使图标间有间隔
                }),
              ],
            )
        },
      },
    },
    {
      field: 'poolName',
      title: '池号',
      width: '15%',
    },
    {
      field: 'poolPurpose',
      title: '样品用途',
      width: '25%',
      cellRender: {
        name: 'VxeSelect',
        options:
          props.measureType === '光谱扫描'
            ? [
                {
                  label: '基线',
                  value: 2,
                },
                {
                  label: '测量',
                  value: 3,
                },
              ]
            : [
                {
                  label: '校零',
                  value: 1,
                },
                {
                  label: '测量',
                  value: 3,
                },
              ],
        events: {
          change: ({ row }: any) => {
            handleEditStatus({
              poolNum: row.poolNum,
              poolPurpose: row.poolPurpose,
            })
          },
        },
      },
    },
    {
      field: 'poolStatus',
      title: '是否可用',
      width: '25%',
      cellRender: {
        name: 'VxeSwitch',
        props: {
          openValue: true,
          closeValue: false,
        },
        events: {
          change: ({ row }: any) => {
            handleEditStatus({
              poolNum: row.poolNum,
              poolStatus: row.poolStatus,
              taskId: props.taskId,
            })
          },
        },
      },
    },
  ],
  data: [] as any[],
})
const handleCurrentRow = async (row: any, column: any) => {
  if (column.field !== 'poolPurpose' && column.field !== 'poolStatus') {
    tableOptions.value.loading = true
    const { code } = await conciseSetCurrentPool({
      poolNum: row.poolNum,
    })
    if (code === 200) {
      message.success('设置成功')
      fetchData()
      emit('update:attachSetting')
    }
  }
}
// 当前信息
const currentDetail: any = ref({
  attachmentTypeName: '',
  isAutoChangePool: false,
})
const fetchData = async () => {
  if (deviceSerialNumber) {
    tableOptions.value.loading = true
    const { code, data } = await conciseQuerySampleAttachmentInfo({
      deviceSerialNumber,
    })
    if (code === 200) {
      currentDetail.value = data
      tableOptions.value.data = data.poolStatusList
    }
    tableOptions.value.loading = false
  }
}
// 修改
const handleChangePool = () => {
  handleEditStatus({
    isAutoChangePool: currentDetail.value.isAutoChangePool,
    taskId: props.taskId,
  })
}
const emit = defineEmits(['update:attachSetting'])
const handleEditStatus = async (params: any) => {
  const { code } = await conciseChangeSampleAttachmentInfo({
    deviceSerialNumber,
    ...params,
  })
  if (code === 200) {
    message.success('修改成功')
    fetchData()
    emit('update:attachSetting')
  }
}
const handleClick = (type: number) => {}

onMounted(() => {
  fetchData()
})
</script>
<style scoped lang="less">
.title-box {
  padding: 8px 17px;
  color: #153471;
  .button {
    padding: 2px 14px;
    font-size: 15px;
    border-radius: 10px;
    background-color: #c6edff;
    color: #616170;
  }
}

.container {
  position: relative;
  padding: 10px 17px;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%; /* 可调整起始位置 */
    transform: translateX(-50%);
    width: 100%; /* 控制边框长度 */
    height: 1px; /* 高度为边框粗细 */
    background-color: #153471;
  }
}
</style>
