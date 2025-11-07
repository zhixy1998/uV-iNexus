<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="text-[16px] uv-container-gap">
    <div v-for="item in detailList" :key="item.calibrationType" class="detail-card !relative">
      <div class="detail-card-title">{{ item.calibrationName }}</div>
      <div class="detail-card-content !pl-10 flex flex-row flex-wrap !pd-[0px]">
        <div
          v-for="(paramsItem, paramsIndex) in item.params"
          :key="paramsIndex"
          class="flex items-center flex-row !w-[280px]"
        >
          <div class="form-label">{{ paramsItem.paramName }}：</div>
          <text v-if="paramsItem.paramType === 0">{{
            paramsItem.data?.[0]?.dataValue || '-'
          }}</text>
          <a-input
            v-else-if="paramsItem.paramType === 1"
            style="width: 120px"
            v-model:value="ruleForm[paramsItem.param]"
            placeholder="请输入"
          />
          <a-select
            v-else-if="paramsItem.paramType === 2"
            v-model:value="ruleForm[paramsItem.param]"
            style="width: 120px"
            placeholder="请选择"
          >
            <a-select-option
              v-for="option in paramsItem.data"
              :key="option.dataValue"
              :value="option.dataValue"
            >
              {{ option.dataKey || option.dataValue }}
            </a-select-option>
          </a-select>
          <span
            v-if="
              paramsItem.paramName === '光谱带宽' ||
              paramsItem.paramName === '起始波长' ||
              paramsItem.paramName === '终止波长'
            "
            class="!ml-1"
            >nm</span
          >
        </div>
      </div>
      <div
        class="clear-btn cursor-pointer"
        v-if="item.calibrationType === 1"
        @click="handleClear(item)"
      >
        <undo-outlined class="!text-[#d40303]" />
        <text class="!ml-1 text-[14px] !text-[#d40303]">恢复出厂设置</text>
      </div>
      <div class="flex justify-center !mt-[20px]">
        <a-button type="primary" @click="handleCorrect(item)"> 校正 </a-button>
      </div>
    </div>
    <!-- <div class="detail-card">
      <div class="detail-card-title">多点波长校正</div>
      <div class="detail-card-content flex flex-wrap">
        <a-button type="primary" class="!flex flex-row items-center" @click="handleAddTable">
          <template #icon>
            <plus-outlined />
          </template>
          添加
        </a-button>
        <a-button
          type="primary"
          danger
          class="!flex flex-row items-center !ml-4 !text-[#fff]"
          @click="handleDeleteTable"
        >
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </div>
      <div class="!mt-6 flex flex-row justify-between">
        <div class="table-box">
          <uv-table :table-options="tableOptions" style="height: 300px; overflow-y: scroll">
          </uv-table>
        </div>
        <div class="chart-box">
          <echarts-line
            :legendData="['标准波长', '实际波长']"
            :xAxisOptions="chartOptions.xAxisOptions"
            :yAxisOptions="chartOptions.yAxisOptions"
            :seriesOptions="chartOptions.seriesOptions"
          />
        </div>
      </div>
      <a-divider />
    </div>
    <div class="detail-card">
      <div class="detail-card-title">衰减校正</div>
      <div class="detail-card-content !pl-10 flex flex-row flex-wrap">
        <div class="flex flex-row !mt-6" style="width: 50%">
          <div class="form-label">1%SBA：</div>
          <text class="!mr-50" style="width: 220px">_SampleOne</text>
        </div>
        <div class="flex flex-row !mt-6" style="width: 50%">
          <div class="form-label">10%SBA：</div>
          <text class="!mr-50" style="width: 220px">_SampleTen</text>
        </div>
        <div class="flex flex-row !mt-6" style="width: 50%">
          <div class="form-label">1%RBA：</div>
          <text class="!mr-50" style="width: 220px">lbl_RefOne</text>
        </div>
        <div class="flex flex-row !mt-6" style="width: 50%">
          <div class="form-label">10%RBA：</div>
          <text class="!mr-50" style="width: 220px">lbl_RefTen</text>
        </div>
      </div>
      <div class="icon-box flex flex-row items-center">
        <div class="cursor-pointer">
          <check-square-outlined class="!ml-10" :style="{ color: primaryColor }" />
          <text class="!ml-1 text-[14px]" :style="{ color: primaryColor }">校正</text>
        </div>
      </div>
    </div> -->
    <!-- <template v-else>
      <div class="debug-tool-home">
        <div class="not-developed">
          <div class="icon">🚧</div>
          <div class="text">请先查找仪器</div>
        </div>
      </div>
    </template> -->
  </section>
</template>

<script lang="ts" setup>
import {
  CheckSquareOutlined,
  DeleteOutlined,
  PlusOutlined,
  UndoOutlined,
} from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import { h, onMounted, reactive, type Ref, ref } from 'vue'

import { calibrationInstrument, getCalibrationInstrumentDetail } from '@/api'
import uvTable from '@/components/uvTable/index.vue'
import { useAppStore } from '@/stores'

const { primaryColor } = useAppStore()

const deviceSerialNumber = localStorage.getItem('deviceSerialNumber') || ''

// 详情
const detailList: Ref<any[]> = ref([])
const ruleForm: Ref<any> = ref({})
const getCalibrationInstrumentDetailFun = async () => {
  if (deviceSerialNumber) {
    const { code, data } = await getCalibrationInstrumentDetail({
      deviceSerialNumber,
    })
    if (code === 200) {
      detailList.value = data
      ruleForm.value =
        data && data.length
          ? data.reduce(
              (
                pre: { params: { param: string; data: string | null }[] } | any,
                cur: { params: { param: string; data: string | null }[] } | any,
              ) => {
                return {
                  ...pre,
                  ...cur.params.reduce(
                    (
                      preChildren: { param: string; data: string | null; lastValue: string | null },
                      curChildren: { param: string; data: string | null; lastValue: string | null },
                    ) => {
                      return {
                        ...preChildren,
                        [curChildren.param]: curChildren.lastValue || null,
                      }
                    },
                    {},
                  ),
                }
              },
              {},
            )
          : {}
    }
  }
}

// 恢复出厂设置
const handleClear = (item: any) => {
  console.log(item)
}

// 校正
const handleCorrect = async (item: any) => {
  const query = {
    calibrationName: item.calibrationName,
    calibrationType: item.calibrationType,
    data: item.params.map((p: { param: string }) => {
      return {
        dataKey: p.param,
        dataValue: ruleForm.value[p.param],
      }
    }),
  }
  const { code, message } = await calibrationInstrument(query)
  if (code === 200) {
    notification.success({
      message: '成功！',
      description: message,
      duration: 3,
    })
    await getCalibrationInstrumentDetailFun()
  }
}

// 多点波长校正
const tableOptions = ref({
  rowKey: 'id',
  pagination: false,
  rowSelection: {
    onChange: (selectedRowKeys: [], selectedRows: []) => {
      handleSelectTable(selectedRowKeys, selectedRows)
    },
    columnWidth: 50,
    fixed: true,
  },
  columns: [
    {
      title: '标准物质',
      dataIndex: 'bzwz',
      key: 'bzwz',
      ellipsis: true,
      resizable: true,
      customRender: (data: { text: string; record: any; index: number }) => {
        return h('input', {
          value: data.record.bzwz,
          onInput: (event: Event) => {
            const value = (event.target as HTMLInputElement).value
            const newData = [...tableOptions.value.data]
            newData[data.index] = {
              ...newData[data.index],
              bzwz: value,
            }
            tableOptions.value.data = newData
            chartOptions.xAxisOptions.data = newData.map((item) => item.bzwz)
          },
          style: {
            width: '100%',
            height: '32px',
            display: 'block',
            boxSizing: 'border-box',
            padding: '4px',
          },
        })
      },
      width: 90,
    },
    {
      title: '标准波长(nm)',
      dataIndex: 'bzbc',
      ellipsis: true,
      resizable: true,
      customRender: (data: { text: string; record: any; index: number }) => {
        return h('input', {
          value: data.record.bzbc,
          onInput: (event: Event) => {
            const value = (event.target as HTMLInputElement).value
            const newData = [...tableOptions.value.data]
            newData[data.index] = {
              ...newData[data.index],
              bzbc: value,
            }
            tableOptions.value.data = newData
            chartOptions.seriesOptions[0].data = newData.map((item) => item.bzbc)
          },
          style: {
            width: '100%',
            height: '32px',
            display: 'block',
            boxSizing: 'border-box',
            padding: '4px',
          },
        })
      },
      width: 90,
    },
    {
      title: '实测波长(nm)',
      dataIndex: 'scbc',
      ellipsis: true,
      resizable: true,
      customRender: (data: { text: string; record: any; index: number }) => {
        return h('input', {
          value: data.record.scbc,
          onInput: (event: Event) => {
            const value = (event.target as HTMLInputElement).value
            const newData = [...tableOptions.value.data]
            newData[data.index] = {
              ...newData[data.index],
              scbc: value,
            }
            tableOptions.value.data = newData
            chartOptions.seriesOptions[1].data = newData.map((item) => item.scbc)
          },
          style: {
            width: '100%',
            height: '32px',
            display: 'block',
            boxSizing: 'border-box',
            padding: '4px',
          },
        })
      },
      width: 90,
    },
  ],
  data: [
    {
      id: '1',
      bzwz: '',
      bzbc: '',
      scbc: '',
    },
    {
      id: '2',
      bzwz: '',
      bzbc: '',
      scbc: '',
    },
    {
      id: '3',
      bzwz: '',
      bzbc: '',
      scbc: '',
    },
    {
      id: '4',
      bzwz: '',
      bzbc: '',
      scbc: '',
    },
    {
      id: '5',
      bzwz: '',
      bzbc: '',
      scbc: '',
    },
  ],
})
const selectedRows = ref([])
const selectedRowKeys = ref<string[]>([])
const handleSelectTable = (newSelectedRowKeys: [], newSelectedRows: []) => {
  console.log('selectedRowKeys: ', selectedRowKeys)
  console.log('selectedRows: ', selectedRows)
  selectedRows.value = newSelectedRows
  selectedRowKeys.value = newSelectedRowKeys
}
const handleAddTable = () => {
  tableOptions.value.data.push({
    id: (tableOptions.value.data.length + 1).toString(),
    bzwz: '',
    bzbc: '',
    scbc: '',
  })
}
const handleDeleteTable = () => {
  tableOptions.value.data = tableOptions.value.data.filter(
    (item: { id: string }) => !selectedRowKeys.value.includes(item.id),
  )
  chartOptions.xAxisOptions.data = tableOptions.value.data.map((item) => item.bzwz)
  chartOptions.seriesOptions[0].data = tableOptions.value.data.map((item) => item.bzbc)
  chartOptions.seriesOptions[1].data = tableOptions.value.data.map((item) => item.scbc)
}
interface SeriesOption {
  name: string
  type: string
  lineStyle: { width: number }
  data: (string | number)[] // 明确 data 类型
}
const chartOptions = reactive<{
  xAxisOptions: {
    name: string
    data: string[] // 明确定义 xAxis data 类型
  }
  yAxisOptions: {
    name: string
  }
  seriesOptions: SeriesOption[]
}>({
  xAxisOptions: {
    name: '标准物质',
    data: ['', '', ''],
  },
  yAxisOptions: {
    name: '波长(nm)',
  },
  seriesOptions: [
    {
      name: '标准波长',
      type: 'line',
      lineStyle: {
        width: 3,
      },
      data: [],
    },
    {
      name: '实际波长',
      type: 'line',
      lineStyle: {
        width: 3,
      },
      data: [],
    },
  ],
})

// setTimeout(() => {
//   chartOptions.xAxisOptions.data.push('7月')
//   chartOptions.seriesOptions[0].data.push(70)
// }, 2000)

onMounted(() => {
  getCalibrationInstrumentDetailFun()
})
</script>

<style lang="less" scoped>
.clear-btn {
  position: absolute;
  top: 15px;
  right: 30px;
}

.table-box {
  width: calc(50% - 10px);
  margin-right: 50px;
}

.chart-box {
  width: 650px;
  height: 300px;
}

:deep(.ant-radio-wrapper) {
  margin-inline-end: 30px !important;
}

:deep(.ant-form-item-label > label) {
  font-size: 16px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

.debug-tool-home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  .not-developed {
    text-align: center;
    padding: 40px;

    .icon {
      font-size: 64px;
      margin-bottom: 20px;
      animation: pulse 2s infinite;
    }

    .text {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 12px;
    }

    .subtext {
      font-size: 16px;
      color: #7f8c8d;
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
