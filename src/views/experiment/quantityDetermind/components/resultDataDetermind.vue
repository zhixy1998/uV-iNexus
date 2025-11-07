<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="结果数据">
      <template #slot-header>
        <div class="flex gap-4 items-center" @click.stop>
          <div class="flex items-center">
            <span class="text-[14px] text-[#595757]">Abs显示位数</span>
            <a-input-number
              v-model:value="digit"
              :min="0"
              :max="10"
              :step="1"
              class="w-xs !m-2"
              @blur="closeSampleEdit"
            />
          </div>
          <a-checkbox-group v-if="isRepeat" v-model:value="statisticalContent" @change="fetchData">
            <a-checkbox value="avg">平均值</a-checkbox>
            <a-checkbox value="sd">SD</a-checkbox>
            <a-checkbox value="rsd">RSD</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group v-model:value="checkValue" @change="handleCheckChange">
            <a-checkbox value="0">
              <span class="text-[14px] text-[#595757]">显示已删除的数据</span>
            </a-checkbox>
            <a-checkbox value="1">
              <span class="text-[14px] text-[#595757]">同时显示Abs与T%</span>
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </template>
      <template #slot-content>
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex items-center">
            <uvHasIconBtn content="样品" class="!mr-[30px]" @click="showSampleSetting">
            </uvHasIconBtn>
            <uvHasIconBtn
              content="校零"
              class="!mr-[30px]"
              @click="xiaoZero"
              :loading="zeroLoading"
            >
            </uvHasIconBtn>
            <uvHasIconBtn content="测量" @click="measure"></uvHasIconBtn>
          </div>
          <!-- <div class="showWord">
            <div class="!mr-[20px]">{{ measureData.nm }}nm</div>
            <div>{{ measureData.abs }}abs</div>
          </div> -->
          <div>
            <span class="!mr-[10px] flex-shrink-0 text-[16px] text-[#113371]">前处理操作</span>
            <a-select ref="select" v-model:value="beforeOperation" class="w-xs">
              <a-select-option value="1"
                >样品：取样，加液，检测。标曲：取标液，稀释定容，加液(加碘化钾)，后检测
              </a-select-option>
              <a-select-option value="2">第二种处理方法</a-select-option>
              <a-select-option value="3">第三种处理方法</a-select-option>
              <a-select-option value="4">第四种处理方法</a-select-option>
            </a-select>
          </div>
          <div class="flex items-center">
            <uvHasIconBtn content="保存" class="!mr-[30px]"></uvHasIconBtn>
            <uvHasIconBtn content="导出到word"></uvHasIconBtn>
          </div>
        </div>
        <br />
        <a-row :gutter="16">
          <a-col :span="16">
            <a-row class="items-center gap-x-4">
              <div class="h2-title flex items-center">
                <a-radio v-model:checked="checkedStandard" @change="handleChangeStandard"></a-radio>
                标准样品
                <uvHasIconBtn content="列配置" @click="configColumn('0')"></uvHasIconBtn>
              </div>
            </a-row>
            <div class="overflow-x-auto">
              <a-table
                size="small"
                rowKey="id"
                :dataSource="tableOptions.data"
                :columns="tableOptions.columns"
                :pagination="tableOptions.pagination"
                :expandedRowKeys="expandedRowKeys"
                :rowSelection="rowSelection"
                @resizeColumn="handleResizeColumn"
                @expand="handleExpand"
              >
                <template #operation="{ record }">
                  <div class="flex justify-around gap-4">
                    <DeleteOutlined v-if="record.revokeDelFun === '0'" />
                    <RollbackOutlined
                      v-if="record.revokeDelFun === '1'"
                      @click="revokeDelFun(record, 0)"
                    />
                    <SyncOutlined
                      :spin="finished === '1' && measureSampleId === record.sampleId"
                      @click.stop="finished !== '1' && measureSingle(record.sampleId)"
                    />
                  </div>
                </template>
              </a-table>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="h-10 bg-[#153471] text-[#fff] leading-10 !pl-5 text-[16px]">
              <span>标准曲线</span>
            </div>
            <uvLineHasScatter
              class="chart-container !w-full !h-80"
              :yAxisOptions="yShowRange"
              :markSelect="checkValue"
              :initial-data="chartData"
              :lineName="lineOptions.xLineName"
              :yAxisName="lineOptions.yLineName"
              :scatter-data="scatterChartData"
            />
            <div class="!h-10 bg-[#153471] text-[#fff] flex items-center justify-center">
              <span>曲线方程</span>
              <MathJax :formula="`$$${lineOptions.curveFormula}$$`" />
            </div>
          </a-col>
        </a-row>
        <a-row>
          <div class="!mt-[10px] h2-title flex items-center">
            <a-radio v-model:checked="checkedUnknown" @change="handleChangeUnknow"></a-radio>
            未知样品
            <uvHasIconBtn content="列配置" @click="configColumn('1')"></uvHasIconBtn>
          </div>

          <div class="overflow-x-auto">
            <a-table
              size="small"
              rowKey="id"
              :dataSource="tableOptionsUn.data"
              :columns="tableOptionsUn.columns"
              :pagination="tableOptionsUn.pagination"
              :expandedRowKeys="expandedRowKeysUn"
              :rowSelection="rowSelectionUn"
              :default-expand-all-rows="true"
              @expand="handleExpandUn"
            >
              <template #abs="{ record }">
                <div>
                  {{ record.abs1 }}
                  <IconFont type="icon-up" />
                  <IconFont type="icon-arrdown" />
                </div>
              </template>
              <template #operation="{ record }">
                <div class="flex justify-around gap-4">
                  <DeleteOutlined v-if="record.deleteType === '0'" />
                  <RollbackOutlined
                    v-if="record.deleteType === '1'"
                    @click="revokeDelFun(record, 1)"
                  />
                  <SyncOutlined
                    :spin="finished === '1' && measureSampleId === record.sampleId"
                    @click.stop="finished !== '1' && measureSingle(record.sampleId)"
                  />
                </div>
              </template>
            </a-table>
          </div>
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <uvModal v-model="saveVisual" size="smail" title="保存">
      <template #content>
        <div class="flex items-center">
          <div class="w-20">数据名称</div>
          <a-input ref="select" v-model:value="value1" class="w-xs !ml-2"></a-input>
        </div>
        <br />
      </template>
    </uvModal>
    <!--  sampleKind 0 标准样品 1 未知样品-->
    <columnModel
      v-if="columnVisual"
      v-model="columnVisual"
      :taskId="projectDetail?.taskId"
      :methodId="projectDetail?.methodId"
      :tableHeadData="columnConfigSample === '1' ? tableUnHeadData : tableHeadData"
      :measureType="`定量测定`"
      :sampleKind="columnConfigSample"
      :apiParams="standUnKownApi"
      @saveParamMapTableHeadSuccess="saveParamMapTableHeadSuccess"
      size="smail"
    />
    <spectralSampleSetting
      ref="spectralSampleSettingRef"
      :projectDetail="projectDetail"
      @closeSampleEdit="closeSampleEdit"
    />
  </section>
</template>
<script lang="ts" setup>
import { DeleteOutlined, RollbackOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import {
  computed,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  type PropType,
  reactive,
  ref,
  watch,
} from 'vue'

import {
  getQuantityCurveInfo,
  queryQuantitySampleData,
  getQuantityStandTableHead,
  getQuantityUnknowSampleData,
  getQuantityStandUnknowTableHead,
  quantitiyMeasurementZero,
  revokeDelQuantity,
  queryQuantityInputParamMapTableHead,
  saveQuantityInputParamMapTableHead,
} from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import webSocketService from '@/utils/websocket'

import columnModel from './columnModel.vue'
import spectralSampleSetting from './spectralSampleSetting.vue'

const props = defineProps({
  projectDetail: {
    type: Object as PropType<Record<string, any>>,
  },
  isRepeat: {
    type: Boolean,
    default: false,
  },
})
const standUnKownApi = {
  queryInputParamMapTableHead: queryQuantityInputParamMapTableHead, //  查询映射关系及表头
  saveInputParamMapTableHead: saveQuantityInputParamMapTableHead, // 查询已绑定的映射关系
}
const lineOptions = ref({
  curveFormula: '',
  xLineName: '',
  yLineName: '',
})
// 前处理
const beforeOperation = ref('')
// 自定义列
const columnVisual = ref(false)

const digit = ref<number>(4)

// 多选框 显示已删除数据 同时显示...
const allDisplay = ref(false)
const statisticalContent = ref([])
const checkValue = ref([])
const handleCheckChange = (value: string[]) => {
  allDisplay.value = value.includes('1')
  getTableHead()
  getUnTableHead()
  fetchData()
}
const appStore = useAppStore()
// 校零
const zeroLoading = ref(false)
const xiaoZero = async () => {
  if (!props.projectDetail?.methodId) message.error('请创建方法！')
  zeroLoading.value = true
  try {
    const { code, data } = await quantitiyMeasurementZero({
      methodId: props.projectDetail?.methodId,
      taskId: props.projectDetail?.taskId,
    })
    if (code === 200) {
      message.success('校零成功！')
      appStore.setNm('0')
      appStore.setAbs('0')
      zeroLoading.value = false
    }
  } catch (err) {
    zeroLoading.value = false
  }
}
const columnConfigSample = ref('')
// 标准样品列表
const checkedStandard = ref<boolean>(true)
const configColumn = (type: string) => {
  columnVisual.value = true
  columnConfigSample.value = type
}
const handleChangeStandard = () => {
  if (checkedUnknown.value) {
    checkedUnknown.value = false
  }
}
const rowSelection = {
  columnWidth: 60, // 设置多选列宽度
  fixed: 'left', // 固定多选列在左侧
}
const tableOptions = ref({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '操作',
      slots: { customRender: 'operation' },
      ellipsis: true,
      resizable: true,
      fixed: 'right',
      width: 80,
    },
  ] as any[],
  data: [],
  pagination: false,
})
const closeSampleEdit = () => {
  fetchData()
}
//分页表格数据请求
const expandedRowKeys = ref<(string | number)[]>([])
const expandedRowKeysUn = ref<(string | number)[]>([])
const fetchData = async () => {
  const params = {
    allDisplay: allDisplay.value,
    taskId: props.projectDetail?.taskId,
    digit: digit.value,
    option: statisticalContent.value || [],
  }
  const { code, data } = await queryQuantitySampleData(params)
  data.standSampleData.forEach((item: any, index: number) => {
    item.id = index + 1
    expandedRowKeys.value.push(index + 1)
    item.children?.forEach((child: any, indexx: number) => {
      child.id = index + 1 + '-' + (indexx + 1)
    })
  })
  data.unknowSampleData.forEach((item: any, index: number) => {
    item.id = index + 1
    expandedRowKeysUn.value.push(index + 1)
    item.children?.forEach((child: any, indexx: number) => {
      child.id = index + 1 + '-' + (indexx + 1)
    })
  })
  if (code === 200) {
    tableOptions.value.data = data.standSampleData
    tableOptionsUn.value.data = data.unknowSampleData
  }
}

function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}

// 表格折叠
const handleExpand = (expanded: boolean, record: any) => {
  if (expanded) {
    expandedRowKeys.value = [...expandedRowKeys.value, record.id]
  } else {
    expandedRowKeys.value = expandedRowKeys.value.filter((key) => key !== record.id)
  }
}
const handleExpandUn = (expanded: boolean, record: any) => {
  if (expanded) {
    expandedRowKeysUn.value = [...expandedRowKeysUn.value, record.id]
  } else {
    expandedRowKeysUn.value = expandedRowKeysUn.value.filter((key) => key !== record.id)
  }
}

// 未知样品列表
const checkedUnknown = ref<boolean>(false)
const handleChangeUnknow = () => {
  if (checkedStandard.value) {
    checkedStandard.value = false
  }
}
const rowSelectionUn = {
  columnWidth: 60, // 设置多选列宽度
  fixed: 'left', // 固定多选列在左侧
}
const tableOptionsUn = ref({
  rowKey: 'id',
  columns: [] as any[],
  data: [],
  pagination: false,
})
const tableUnHeadData = ref([])
const tableHeadData = ref([])
const getUnTableHead = async () => {
  const { code, data } = await getQuantityStandUnknowTableHead({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
    allDisplay: allDisplay.value,
  })
  if (code === 200) {
    tableUnHeadData.value = data
    tableOptionsUn.value.columns = transformColumnData(data)
  }
}
const getTableHead = async () => {
  const { code, data } = await getQuantityStandTableHead({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
    allDisplay: allDisplay.value,
  })
  if (code === 200) {
    if (data && data.length) {
      tableHeadData.value = data
      tableOptions.value.columns = transformColumnData(data)
    }
  }
}
import { Input } from 'ant-design-vue'
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = (data: any) => {
  const column = [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      ellipsis: true,
      resizable: true,
      fixed: 'right',
      width: 80,
    },
  ]
  const dataColumn = data.map((item: any) => {
    if (item.locate === 'data') {
      return {
        title: item.name,
        dataIndex: item.identity,
        customRender: (data: { text: string; record: any; index: number }) => {
          return h(Input, {
            value: data.text,
            onBlur: (e: Event) => {
              // e.target.vale record
              // 可以添加其他处理逻辑
            },
            placeholder: '请输入内容',
          })
        },
        width: 150,
      }
    } else {
      return {
        title: item.name,
        dataIndex: item.identity,
        ellipsis: true,
        resizable: true,
        width: 150,
      }
    }
  })
  column.splice(1, 0, ...dataColumn)
  console.log(column, 'column')
  return column
}
const saveParamMapTableHeadSuccess = () => {
  if (columnConfigSample.value === '0') {
    getTableHead()
  } else {
    getUnTableHead()
  }
}
//获取未知样品数据接口
const fetchUnData = async () => {
  const { code, data } = await getQuantityUnknowSampleData({
    allDisplay: allDisplay.value,
    taskId: props.projectDetail?.taskId,
    digit: digit.value,
  })
  data.forEach((item: any, index: number) => {
    item.id = index + 1
    expandedRowKeysUn.value.push(index + 1)
    item.children?.forEach((child: any, indexx: number) => {
      child.id = index + 1 + '-' + (indexx + 1)
    })
  })
  if (code === 200) {
    tableOptionsUn.value.data = data || []
  }
}

// 撤销删除
const revokeDelFun = async (record: { sampleId: any }, type: number) => {
  const { code } = await revokeDelQuantity({
    taskId: props.projectDetail?.taskId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    if (type) fetchData()
    else fetchUnData()
  }
}

const activeKey = ref('所有光谱')
const tabPaneArr = ref(['所有光谱'])
// const tabPaneArr = ref(['所有光谱', '样品1', '样品2', '样品1+样品2'])
const lineChartRef = ref()
const chartLineData = Array.from({ length: 10 }, (_, i) => ({
  x: i + 1,
  y: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, // 2000~5000 随机数
  marked: 0,
  feng: Math.random() < 0.5 ? 0 : 1,
  gu: Math.random() < 0.5 ? 0 : 1,
}))
const chartData = ref<typeof chartLineData>([])
const scatterChartData = ref<{ x: string | number; y: string | number }[]>([])
const tags = ref()

const measureData = reactive({
  nm: 0,
  abs: 0,
})
const task_id = ref('')
const handleMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  if (checkedStandard.value) {
    // 标准样品
    if (data.key && !data.identity) {
      tableOptions.value.data.forEach((item: any) => {
        if (item.sampleId === data.sampleId) {
          item[data.key] = data.value
        }
      })
    } else if (data.identity && data.key) {
      // 重复模式是多次的情况
      const rowNum = data.identity.split('-').pop()
      tableOptions.value.data.forEach((item: any, index: number) => {
        if (item.sampleId === data.sampleId) {
          expandedRowKeys.value.push(data.id)
          if (!item.children) item.children = []
          if (item.children && item.children[rowNum]) {
            //行数据已经存在
            item.children[rowNum][data.key] = data.value
          } else {
            item.children[rowNum] = {
              id: index + 1 + '-' + Number(rowNum) + 1,
            }
            item.children[rowNum][data.key] = data.value
          }
        }
      })
    }
  } else {
    // 未知样品
    if (data.key && !data.identity) {
      tableOptionsUn.value.data.forEach((item: any) => {
        if (item.sampleId === data.sampleId) {
          item[data.key] = data.value
        }
      })
    } else if (data.identity && data.key) {
      // 重复模式是多次的情况
      const rowNum = data.identity.split('-').pop()
      tableOptionsUn.value.data.forEach((item: any, index: number) => {
        if (item.sampleId === data.sampleId) {
          expandedRowKeysUn.value.push(data.id)
          if (!item.children) item.children = []
          if (item.children && item.children[rowNum]) {
            //行数据已经存在
            item.children[rowNum][data.key] = data.value
          } else {
            item.children[rowNum] = {
              id: index + 1 + '-' + Number(rowNum) + 1,
            }
            item.children[rowNum][data.key] = data.value
          }
        }
      })
    }
  }
  if (data.point) {
    scatterChartData.value.push(data.point)
  }
  if (data.curveType) {
    const dataList = data.dataList || []
    chartData.value.push(...dataList)
    if (data.equationType === 'C=f(Abs)') {
      lineOptions.value.xLineName = 'Abs'
      lineOptions.value.yLineName = 'C'
    }
    lineOptions.value.curveFormula = data.equation
  }
  // chartData.value.push({
  //   x: data.x as number,
  //   y: data.y as number,
  //   marked: 0,
  //   feng: Math.floor(Math.random() * 2),
  //   gu: Math.floor(Math.random() * 2),
  // })
  // chartData.value.push(...data.data)

  // measureData.nm = data.nm
  // measureData.abs = data.col3
  // data.data.forEach((item: any) => {
  //   measureData.nm = item.x
  //   measureData.abs = item.y
  // })
  console.log('收到消息:', data)
  if (data.result === 'finish') {
    task_id.value = data.task_id
    // fetchData()
  }
}
const getCurveInfoFun = async () => {
  const { code, data } = await getQuantityCurveInfo({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
  })
  if (code === 200) {
    const dataList = data.dataList || []
    chartData.value.push(...dataList)
    if (data.equationType === 'C=f(Abs)') {
      lineOptions.value.xLineName = 'Abs'
      lineOptions.value.yLineName = 'C'
    }
    lineOptions.value.curveFormula = data.equation
  }
}
const measureSampleId = ref('') // 当前正在测量的样品id
const finished = ref('0') //1测量中
const measureSingle = (sampleId: string) => {
  measureSampleId.value = sampleId
  measure(sampleId)
}
const measure = async (sampleId?: string) => {
  webSocketService.setBaseUrl('ws/ration')
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: (event) => console.log('WebSocket 连接已关闭', event),
    onError: (event) => console.error('WebSocket 错误', event),
  })
  webSocketService.connect({
    sampleKind: checkedStandard.value ? '0' : '1',
    taskId: props.projectDetail?.taskId,
    sampleId: '',
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
  })
}
watch(tags, (val) => {
  chartData.value.forEach((item) => {
    item.marked = val?.includes(item.x) ? 1 : 0
  })
})

const value1 = ref('')
const saveVisual = ref(false)
const yShowRange = reactive({
  min: '',
  max: '',
})
const chartFixedDomRef = ref<HTMLElement | null>()
const lineChartRefDiv = ref<HTMLElement | null>()
let observer: IntersectionObserver
const linChartFixed = () => {
  const chartEl = lineChartRefDiv.value // 获取组件真实 DOM 元素
  const chartFixedRef = chartFixedDomRef.value
  if (!chartEl || !chartFixedRef) return
  // 创建 IntersectionObserver
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        // 图表离开视口，开始固定
        // chartEl.style.visibility = 'hidden'
        chartFixedRef.style.visibility = 'visible'
      } else {
        // 图表回到视口，取消固定
        // chartEl.style.visibility = 'visible'
        chartFixedRef.style.visibility = 'hidden'
      }
    },
    {
      threshold: 0, // 只要有一部分离开就触发
      rootMargin: '0px 0px 300px 0px',
    },
  )
  observer.observe(chartEl)
}
const closeSmallChart = () => {
  const chartFixedRef = chartFixedDomRef.value
  if (!chartFixedRef) return
  chartFixedRef.style.visibility = 'hidden'
}
//显示样品信息
const spectralSampleSettingRef = ref()
const showSampleSetting = () => {
  spectralSampleSettingRef.value.showSampleEdit()
}

onMounted(() => {
  linChartFixed()
})

watch(
  () => [props.projectDetail?.methodId, props.projectDetail?.taskId],
  ([newMethodId, newTaskId]) => {
    if (newMethodId && newTaskId) {
      getTableHead()
      getUnTableHead()
      fetchData()
      getCurveInfoFun()
    }
  },
  { deep: true, immediate: true },
)

onUnmounted(() => {
  webSocketService.close()
})
</script>
<style scoped lang="less">
.showWord {
  color: #3c8528;
  display: flex;
  align-content: center;
  font-weight: bold !important;
  font-size: 18px;

  > div {
    font-weight: bold !important;
  }
}
</style>
