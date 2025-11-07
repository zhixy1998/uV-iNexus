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
        <a-checkbox
          value="1"
          v-model:checked="checkDeleteValue"
          @click.stop
          @change="initListPortData"
        >
          <span class="text-[14px] text-[#595757]">显示已删除的数据</span>
        </a-checkbox>
        <div class="flex gap-4 items-center" @click.stop>
          <a-checkbox-group v-model:value="checkValue">
            <a-checkbox value="波峰">
              <span class="text-[14px] text-[#595757]">波峰</span>
            </a-checkbox>
            <a-checkbox value="波谷">
              <span class="text-[14px] text-[#595757]">波谷</span>
            </a-checkbox>
            <a-checkbox value="标记点">
              <span class="text-[14px] text-[#595757]">标记点</span>
            </a-checkbox>
          </a-checkbox-group>
          <div class="flex items-center">
            <span class="text-[14px] text-[#595757]">Y显示范围</span>
            <a-input-number v-model:value="yShowRange.min" class="w-xs !m-2" />
            <span>——</span>
            <a-input-number v-model:value="yShowRange.max" class="w-xs !m-2" />
          </div>
          <div class="flex items-center">
            <span class="text-[14px] text-[#595757]">{{ appStore.luminosity }}显示位数</span>
            <a-input-number v-model:value="absDigit" class="w-xs !m-2" />
          </div>
        </div>
      </template>
      <template #slot-content>
        <div class="flex justify-between items-center flex-wrap">
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
            <uvHasIconBtn content="测量" :loading="doubleMeasure" @click.stop="measure">
            </uvHasIconBtn>
          </div>
        </div>
        <br />
        <a-row :gutter="16">
          <a-col :span="6">
            <div class="uv-panel">
              <a-tree
                defaultExpandAll
                v-model:checkedKeys="checkedKeys"
                class="uv-ant-tree"
                checkable
                :tree-data="treeData"
                @check="handleCheckTree"
              >
                <template #title="{ data }">
                  <div class="flex justify-between gap-4">
                    <div>{{ data.title }}</div>
                    <div v-if="!data.children" class="flex items-center gap-1">
                      <ColorInput
                        v-model="data.color"
                        class="!w-3 !h-3"
                        @change="changeColor(data)"
                      />
                      <DeleteOutlined
                        v-if="data.deleteType === '0'"
                        @click="deleteOneSampleFun(data)"
                      />
                      <RollbackOutlined
                        v-if="data.deleteType === '1'"
                        @click="restoreDeletedListDataFun(data)"
                      />
                      <SyncOutlined
                        v-if="data.type === '0'"
                        :spin="finished === '1' && measureKey === data.key"
                        @click.stop="measureSingle(data)"
                      />
                    </div>
                  </div>
                </template>
              </a-tree>
            </div>
          </a-col>
          <a-col :span="18">
            <div class="uv-panel">
              <div class="flex items-center justify-end z-9">
                <!-- <uvHasIconBtn content="添加到报表" class="!mr-[10px]" @click="handleReportFormsAdd">
                </uvHasIconBtn> -->
                <IconFont
                  type="icon-tupianshangchuan"
                  class="text-xl !mr-[20px]"
                  :style="{ color: '#153471' }"
                  @click="captureScreenshotFun"
                />
                <uvHasIconBtn content="查看报表" @click="handleReportFormsDetail"> </uvHasIconBtn>
              </div>
              <a-tabs v-model:activeKey="activeKey" :destroyInactiveTabPane="false">
                <a-tab-pane v-for="item in tabPaneArr" :key="item.value" :tab="item.title">
                  <div v-if="activeKey === item.value">
                    <a-row
                      v-if="item.value === '重叠' || item.value === '平铺' || item.value === '3D'"
                    >
                      <a-col :span="24" class="overflow-y-auto overflow-x-hidden">
                        <div class="h-80 relative" v-show="item.value === '重叠'">
                          <uvLinesChart
                            id="lineChartDieRef"
                            class="chart-container"
                            :lines="chartLines"
                            :xAxisOptions="xShowRangeNew[item.value]"
                            :mark-select="checkValue"
                            :yAxisOptions="yShowRange"
                            :yAxisName="appStore.luminosity"
                            xAxisName="时间(s)"
                          />
                        </div>
                        <div class="h-80 relative" v-show="item.value === '平铺'">
                          <div id="lineChartPingRef">
                            <div
                              class="h-50"
                              v-for="(item, index) in chartLines"
                              :key="`${index}line`"
                            >
                              <lineChart
                                class="chart-container !w-full !h-full"
                                :yAxisOptions="yShowRange"
                                :markSelect="checkValue"
                                :xAxisOptions="xShowRangeNew[item.key]"
                                :initial-data="item.data"
                                :color="item.color"
                                :lineName="item.name"
                                :key="`${index}chartFixedDomRef`"
                                :yAxisName="appStore.luminosity"
                                xAxisName="时间(s)"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="h-100 relative" v-show="item.value === '3D'">
                          <div id="lineChart3DRef" class="w-full h-full">
                            <uv3DLineChart :series="series3DData" />
                          </div>
                        </div>
                      </a-col>
                      <a-table
                        class="!mt-10 overflow-x-auto"
                        :dataSource="tableOptionsIn.data"
                        :columns="tableOptionsIn.columns"
                        :pagination="tableOptionsIn.pagination"
                        @resizeColumn="handleResizeColumn"
                      >
                      </a-table>
                    </a-row>
                    <div
                      v-if="item.value !== '重叠' && item.value !== '平铺' && item.value !== '3D'"
                    >
                      <a-row class="!h-80 !relative">
                        <!-- <IconFont
                          type="icon-tupianshangchuan"
                          class="text-xl absolute right-4 cursor-pointer z-9"
                          :style="{ color: '#153471' }"
                          @click="captureScreenshotFun('lineChartOther')"
                        /> -->
                        <lineChart
                          id="lineChartOther"
                          class="chart-container !w-full !h-full"
                          :yAxisOptions="yShowRange"
                          :xAxisOptions="xShowRangeNew[item.value]"
                          :markSelect="checkValue"
                          :initial-data="
                            activeKey === measureKey ? measureChartData : chartDataUnion
                          "
                          :color="chartDataUnionColor"
                          :lineName="item.title"
                          :yAxisName="appStore.luminosity"
                          xAxisName="时间(s)"
                        />
                      </a-row>
                      <a-row class="!mt-5">
                        <a-tabs v-model:activeKey="activeKeySample" tab-position="left">
                          <a-tab-pane key="寻峰">
                            <template #tab>
                              <span>
                                <android-outlined />
                                寻峰
                              </span>
                            </template>
                            <a-row :gutter="32">
                              <a-col :span="8">
                                <div class="!mt-5">
                                  <h3>寻峰参数</h3>
                                  <br />
                                  <div class="flex items-center gap-4">
                                    <span class="w-20 flex-shrink-0">峰谷差</span>
                                    <a-input
                                      v-model:value="formState.height"
                                      placeholder="请输入"
                                    />
                                    <span class="absolute right-1">%</span>
                                  </div>
                                  <br />
                                  <div class="flex items-center gap-4">
                                    <span class="w-20 flex-shrink-0">峰间距</span>
                                    <a-input
                                      v-model:value="formState.distance"
                                      placeholder="请输入"
                                    />
                                  </div>
                                  <br />
                                  <div class="flex justify-around">
                                    <uvHasIconBtn content="取消"></uvHasIconBtn>
                                    <uvHasIconBtn
                                      content="确认"
                                      @click="confirmSearchPeak"
                                    ></uvHasIconBtn>
                                  </div>
                                </div>
                              </a-col>
                              <a-col :span="16" class="!overflow-x-auto">
                                <a-table
                                  :dataSource="tableOptions.data"
                                  :columns="tableOptions.columns"
                                  @resizeColumn="handleResizeColumn"
                                >
                                  <template #remark="{ record }">
                                    <a-input
                                      v-model:value="record.remark"
                                      placeholder="请输入备注"
                                      @blur="savePeakAndValleysRemark(record)"
                                    />
                                  </template>
                                </a-table>
                              </a-col>
                            </a-row>
                          </a-tab-pane>
                          <a-tab-pane key="标记">
                            <template #tab>
                              <span>
                                <android-outlined />
                                标记
                              </span>
                            </template>
                            <a-row :gutter="32">
                              <a-col :span="8" class="!mt-5">
                                <uvTags title="标记点(nm)" v-model:tags="chartMarkArr" />
                                <br />
                                <div class="flex justify-around">
                                  <uvHasIconBtn content="取消"></uvHasIconBtn>
                                  <uvHasIconBtn
                                    content="确认"
                                    @click="addGaugePointFun"
                                  ></uvHasIconBtn>
                                </div>
                              </a-col>
                              <a-col :span="16" class="!overflow-x-auto !pr-10">
                                <a-table
                                  :dataSource="tableOptionsBiao.data"
                                  :columns="tableOptionsBiao.columns"
                                  :pagination="tableOptionsBiao.pagination"
                                  @resizeColumn="handleResizeColumn"
                                >
                                  <template #remark="{ record }">
                                    <a-input
                                      v-model:value="record.remark"
                                      placeholder="请输入备注"
                                      @blur="saveGaugePointRemark(record)"
                                    />
                                  </template>
                                </a-table>
                              </a-col>
                            </a-row>
                          </a-tab-pane>
                          <a-tab-pane key="峰面积">
                            <template #tab>
                              <span>
                                <android-outlined />
                                峰面积
                              </span>
                            </template>
                          </a-tab-pane>
                        </a-tabs>
                      </a-row>
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
        </a-row>

        <div ref="chartFixedDomRef" class="chartFixedDomRef">
          <div style="height: 270px" class="relative">
            <CloseOutlined
              class="absolute right-2 top-2 cursor-pointer z-30"
              @click="closeSmallChart"
            />
            <uvLinesChart
              class="chart-container !w-full !h-full"
              key="chartFixedDomRef"
              :lines="chartLines"
              :mark-select="checkValue"
              :show-mark="true"
              style="height: 400px"
            />
          </div>
        </div>
      </template>
    </uvCollapseRightSlot>
  </section>

  <uvModal v-model="saveVisual" size="smail" title="提示" @handle-ok="measureReal">
    <template #content>
      <div class="!mb-5">
        检测到您是在打开的原有的任务上进行测量，为保证原有任务的数据
        完整性，您需要对任务进行以下操作
      </div>
      <a-radio-group name="radioGroup" v-model:value="measureTaskParams.abadonon">
        <a-radio value="1">在新页面创建新任务，并沿用原有的数据</a-radio>
        <a-radio value="2">在新页面创建新任务，但放弃原数据</a-radio>
      </a-radio-group>
      <br />
      <div class="flex items-center !mt-5">
        <div class="w-25">新任务名称</div>
        <a-input ref="select" v-model:value="measureTaskParams.newTaskName" class="w-xs !ml-2">
        </a-input>
      </div>
      <br />
    </template>
  </uvModal>
  <spectralSampleSetting
    v-model="sampleSetVisible"
    v-if="sampleSetVisible"
    :taskId="taskId"
    :methodId="measureParams?.methodId"
    @sampleSaveSuccess="sampleSaveSuccess"
  />
  <reportFormsContent ref="reportFormsContentRef" />
</template>
<script lang="ts" setup>
import {
  AndroidOutlined,
  CloseOutlined,
  DeleteOutlined,
  RollbackOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'
import { set } from 'lodash-es'
import { computed, h, onMounted, onUnmounted, type PropType, reactive, ref, watch } from 'vue'
import ColorInput from 'vue-color-input'

// API 接口导入
import {
  addTimeGaugePoint,
  addTimeGaugePointRemarks,
  addTimePeakValleyRemarks,
  delTimeChangeTheListPort,
  delTimeSampleListPort,
  getTimeChangeTheListPort,
  getTimeGaugePointDataList,
  getTimeMethodParameter,
  getTimePeakValleyDataList,
  getTimeSampleListPort,
  restoreTimeDeletedListData,
  seekingTimePeaksAndValleysPort,
  timeUploadImage,
  updateTimeDataColor,
  zeroTime,
} from '@/api'
// 组件导入
import lineChart from '@/components/lineChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import uvTags from '@/components/uvTags/index.vue'
// 状态管理
import { useAppStore } from '@/stores'
// 类型导入
import type { Series3DLineData } from '@/types/common'
import type { ChartDataItem } from '@/types/experimentTypes'
// 工具函数导入
import { captureScreenshot } from '@/utils/screenshotUtils'
import webSocketService from '@/utils/websocket'

import reportFormsContent from './reportFormsContent.vue'
// 子组件导入
import spectralSampleSetting from './spectralSampleSetting.vue'
const appStore = useAppStore()

// ==================== 组件属性定义 ====================
const props = defineProps({
  imageBase64: String,
  measureParams: {
    type: Object as PropType<{
      projectId: string
      methodId: string
    }>,
  },
  taskId: String,
  messageId: String,
})

// ==================== 结果数据显示操作 ====================
// 检查删除状态值
const checkDeleteValue = ref(false)
// 波峰波谷标记点
const checkValue = ref([])
// X轴显示范围
// const xShowRange = reactive({
//   min: 0,
//   max: 60,
// })
const xShowRangeNew = reactive<any>({
  重叠: {
    min: 0,
    max: 60,
  },
  平铺: {
    min: 0,
    max: 60,
  },
  '3D': {
    min: 0,
    max: 60,
  },
})
// Y轴显示范围
const yShowRange = reactive({
  min: '',
  max: '',
})
// abs显示位数
const absDigit = ref()
watch(
  () => absDigit.value,
  async () => {
    initListPortData()
    if (activeKey.value !== '重叠' && activeKey.value !== '平铺' && activeKey.value !== '3D') {
      queryPeakAndValleysPortFun() // 获取寻峰列表
      queryGaugePointPortFun() // 获取标记点列表
    }
  },
)

// ==================== 样品列表 变化 树形列表相关 ====================
// 样品列表选中项
const checkedKeys = ref<string[]>([])
// 树节点接口定义
interface TreeNode {
  title: string
  key: string
  children: TreeNode[]
  color?: string
  data?: ChartDataItem[]
  measureType?: 0 | 1 // 1测量中, 0测量完成
  deleteType?: 0 | 1 // 0正常, 1删除
  type?: '0' | '1' //0样品列表 1变化列表
  measureId?: string
  [key: string]: unknown
}
// 选中的样品数据
const paramsData = ref({
  sampleId: '',
  dataId: '',
  // type: '',
})
// 树形数据结构
const treeData = ref<TreeNode[]>([
  {
    title: '样品列表',
    key: '0-0',
    children: [
      // 示例数据被注释掉
    ],
  },
  {
    title: '变化列表',
    key: '1-0',
    children: [
      // 示例数据被注释掉
    ],
  },
])
// 获取样品列表端口数据
const getSampleListPortFun = async () => {
  const { code, data } = await getTimeSampleListPort({
    taskId: props.taskId || '',
    type: checkDeleteValue.value ? '1' : '0', // 是否显示已删除数据
    digit: absDigit.value,
  })
  if (code == 200) {
    // 处理返回的数据
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key = `yangpin-${index}`
      item.data = item.data || []
    })
    sampleList.value = data
    treeData.value[0].children = data
    // 过滤掉已选中的项
    checkedKeys.value = sampleList.value
      .map((item: any) => item.key)
      .filter((item: any) => item !== '1-0')

    // 生成报告需要勾选的样品Id
    emit('update:chekedSampleKeys', data[0]?.sampleId)
  }
}
// 获取变化列表端口数据
const getChangeTheListPortFun = async () => {
  const { code, data } = await getTimeChangeTheListPort({
    taskId: props.taskId || '',
    type: checkDeleteValue.value ? '1' : '0', // 是否显示已删除数据
    digit: absDigit.value,
  })
  if (code == 200) {
    // 处理返回的数据
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key = `bianhua-${index}`
      item.data = item.data || []
    })
    treeData.value[1].children = data
    // 过滤掉已选中的项
    checkedKeys.value = checkedKeys.value.filter((item) => item !== '0-0')
  }
}
// 删除样品
const deleteOneSampleFun = async (record: any) => {
  // if (record.type === '0') {
  //   // 删除样品
  //   const { code } = await delTimeSampleListPort({
  //     taskId: props.taskId || '',
  //     sampleId: record.sampleId,
  //   })
  //   if (code === 200) {
  //     message.success('删除成功！')
  //     initListPortData()
  //   }
  // } else if (record.type === '1') {
  //   // 删除变化列表项
  //   const { code } = await delTimeChangeTheListPort({
  //     analysisId: record.measureId,
  //   })
  //   if (code === 200) {
  //     message.success('删除成功！')
  //     initListPortData()
  //   }
  // }
}
// 撤销删除
const restoreDeletedListDataFun = async (record: any) => {
  const { code } = await restoreTimeDeletedListData({
    taskId: props.taskId || '',
    paramId: record.sampleId || record.measureId || '',
    // type: record.type,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    initListPortData()
  }
}
// 更新数据
const initListPortData = () => {
  getChangeTheListPortFun()
  getSampleListPortFun()
}
// 监听任务ID变化
watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      initListPortData()
    } else {
      treeData.value[1].children = []
      treeData.value[0].children = []
    }
  },
  { immediate: true },
)
// 处理树节点选中
const handleCheckTree = () => {}
// 监听选中项和树形数据变化
watch(
  () => [checkedKeys.value, treeData.value],
  ([NewCheckedKeys, newTreeData]) => {
    const NewCheckedKeysFilter = NewCheckedKeys.filter(
      (item: any) => item !== '1-0' && item !== '0-0',
    )
    // 更新图表线条数据
    chartLines.value = getChartLineData(treeData.value) as ChartLinesData[]
    series3DData.value = get3DLineChartData(treeData.value)
    // 初始化表格列
    tableOptionsIn.value.columns = [
      {
        title: '时间(s)',
        dataIndex: 'x',
        width: 150,
        fixed: 'left',
      },
    ]
    // 设置图表颜色
    chartDataUnionColor.value = findColorByKey(activeKey.value) as string
    // 更新表格数据
    chartLines.value.forEach((item, index) => {
      tableOptionsIn.value.columns.push({
        title: item.name,
        dataIndex: NewCheckedKeysFilter[index],
        width: 180,
        ellipsis: true,
      })
      item.data?.forEach((itemData, itemIndex) => {
        tableOptionsIn.value.data[itemIndex] = { ...tableOptionsIn.value.data[itemIndex] }
        tableOptionsIn.value.data[itemIndex][NewCheckedKeysFilter[index] as string] = itemData.y
        tableOptionsIn.value.data[itemIndex].x = itemData.x
      })
    })
    // 更新标签页标题
    titles.value = getNonFirstLevelTitles(newTreeData as TreeNode[])

    // 获取不同样品的x坐标范围
    if (chartLines.value && chartLines.value.length) {
      const tabsArr = tabPaneArr.value.concat(titles.value)
      // const xData = tableOptionsIn.value.data.map((itemData) => itemData.x)
      // xShowRange.min = Math.min(...xData)
      // xShowRange.max = Math.max(...xData)
      tabsArr.forEach((tabItem: any) => {
        if (tabItem.title === '重叠' || tabItem.title === '3D') {
          let xData: any = []
          chartLines.value.forEach((chartItem) => {
            xData = xData.concat(chartItem.data?.map((item) => item.x))
          })
          xShowRangeNew[tabItem.title].min = Math.min(...xData)
          xShowRangeNew[tabItem.title].max = Math.max(...xData)
        } else {
          chartLines.value.forEach((chartItem) => {
            const xData = chartItem.data?.map((item) => item.x)
            set(xShowRangeNew, chartItem.key, {
              min: xData && xData ? Math.min(...xData.map(Number)) : 0,
              max: xData && xData.length ? Math.max(...xData.map(Number)) : 60,
            })
          })
        }
      })
    }
  },
  {
    deep: true,
  },
)

// 修改颜色
const changeColor = async (node: any) => {
  const { code } = await updateTimeDataColor({
    dataId: node.sampleId,
    // type: node.type,
    color: node.color,
  })
  if (code === 200) {
    message.success('修改颜色成功！')
    initListPortData()
  }
}

// ==================== 标签页相关 ====================
// 标签页数组
const tabPaneArr = ref([
  { title: '重叠', value: '重叠' },
  { title: '平铺', value: '平铺' },
  { title: '3D', value: '3D' },
])
const activeKey = ref('重叠') // 标签页默认选中
const activeKeySample = ref('寻峰') // 具体样品中的 标签页默认选中 （寻峰 标记 峰面积）
watch(
  // 监听标签页切换
  () => activeKey.value,
  (newValue) => {
    // 当切换到非"重叠"、"平铺"、"3D"的标签页时（即具体样品页）
    if (newValue !== '重叠' && newValue !== '平铺' && newValue !== '3D') {
      const params = findNodeByKey(newValue)
      // 更新图表联合数据和颜色
      chartDataUnion.value = params?.data as ChartDataItem[]
      chartDataUnionColor.value = params?.color as string
      // console.log(params, 'params')
      // 更新参数数据
      paramsData.value = {
        sampleId: params?.sampleId as string,
        dataId: params?.measureId as string,
        // type: params?.type as string,
      }
      // 更新标记点数组
      chartMarkArr.value = chartDataUnion.value
        .map((item) => (item.marked == 1 ? item.x : null))
        .filter((item) => item !== null)
      if (paramsData.value.dataId) {
        queryPeakAndValleysPortFun() // 获取寻峰初始列表
        queryGaugePointPortFun() // 获取标记点初始列表
      } else {
        tableOptions.value.data = []
        tableOptionsBiao.value.data = []
      }
      emit('update:chekedSampleKeys', paramsData.value?.sampleId) // 生成报告需要勾选的样品Id
    } else {
      // 生成报告需要勾选的样品Id
      const checkedKeysFilter = checkedKeys.value.filter(
        (item: any) => item !== '1-0' && item !== '0-0',
      )
      if (checkedKeysFilter && checkedKeysFilter.length)
        emit('update:chekedSampleKeys', findNodeByKey(checkedKeysFilter[0])?.sampleId)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
const titles = ref() // 具体样品列表 标签页 会和tabPaneArr拼一起
watch(
  // 具体样品列表 监听变化
  () => titles.value,
  (newValue) => {
    tabPaneArr.value = [
      { title: '重叠', value: '重叠' },
      { title: '平铺', value: '平铺' },
      { title: '3D', value: '3D' },
    ]
    tabPaneArr.value.push(...newValue)
  },
)

// ==================== 图表数据相关 ====================
// 折线图数据接口定义
interface ChartLinesData {
  name: string
  color?: string
  data?: ChartDataItem[]
  key: string
}
const chartLines = ref<ChartLinesData[]>([])

// 图表联合数据（用于显示单个样品数据）
const chartDataUnion = ref<ChartDataItem[]>([])

// 图表联合颜色
const chartDataUnionColor = ref('')

// 测量返回的图表数据
const measureChartData = ref<ChartDataItem[]>([])

// 3D
const series3DData = ref<Series3DLineData[]>([])
const get3DLineChartData = (tree: TreeNode[]) => {
  const chart3DLines: Series3DLineData[] = []
  const traverse = (nodes: TreeNode[], level: number) => {
    for (const [indexNode, node] of nodes.entries()) {
      if (level > 1 && checkedKeys.value.includes(node.key)) {
        const arr =
          node.data?.map((item, index) => {
            return {
              x: Number(item.x),
              y: indexNode + 2,
              z: Number(item.y),
            }
          }) || []
        chart3DLines.push({
          name: node.title,
          data: arr,
          color: node.color,
          lineWidth: 4,
        })
      }
      if (node.children) {
        traverse(node.children, level + 1)
      }
    }
  }
  traverse(tree, 1)
  return chart3DLines
}

// ==================== 表格配置 ====================
// 表格选项接口定义
interface tableOptions {
  columns: {
    [key: string]: any
  }[]
  data: {
    [key: string]: any
  }[]
  pagination?: {
    pageSize?: string | number
    total?: string | number
    current?: string | number
    [key: string]: any
  }
}
// 处理列宽调整
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}
// 分页配置
const pagination = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    // fetchData()
  },
  onShowSizeChange: (current: number, size: number) => {
    pagination.current = current
    pagination.pageSize = size
    // fetchData()
  },
})

// ==================== 重叠|平铺|3D 表格 ====================
const tableOptionsIn = ref<tableOptions>({
  columns: [
    {
      title: '时间(s)',
      dataIndex: 'x',
      width: 150,
      fixed: 'left',
    },
  ],
  data: [],
  pagination: {
    total: 0,
    showTotal: (total: number) => `Total ${total} items`,
  },
})

// ==================== 寻峰 ====================
const tableOptions = ref({
  rowKey: 'serialNumber',
  columns: [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      ellipsis: true,
      resizable: true,
      width: 80,
    },
    {
      title: '时间(s)',
      dataIndex: 'x',
      ellipsis: true,
      resizable: true,
      width: 120,
    },
    {
      title: appStore.luminosity,
      dataIndex: 'y',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      resizable: true,
      width: 120,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      resizable: true,
      width: 150,
      slots: { customRender: 'remark' },
    },
  ],
  data: [],
  pagination: false,
})
const queryPeakAndValleysPortFun = async () => {
  const { code, data } = await getTimePeakValleyDataList({
    dataId: paramsData.value.dataId,
    // type: paramsData.value.type,
    digit: absDigit.value,
  })
  if (code === 200) {
    tableOptions.value.data =
      data && data.length
        ? data.map((item: any, index: number) => ({
            ...item,
            serialNumber: index + 1,
          }))
        : []
  }
}
const formState = reactive<{ [key: string]: any }>({})
const confirmSearchPeak = async () => {
  if (!paramsData.value.dataId) {
    message.error('请先扫描获取测量数据！')
  }
  const params = {
    dataId: paramsData.value.dataId,
    // type: paramsData.value.type,
    height: formState.height,
    distance: formState.distance,
  }
  const { code, data } = await seekingTimePeaksAndValleysPort(params)
  if (code == 200) {
    tableOptions.value.data =
      data && data.length
        ? data.map((item: any, index: number) => ({
            ...item,
            serialNumber: index + 1,
          }))
        : []
    await getSampleListPortFun()
    await getChangeTheListPortFun()
    chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    // if (paramsData.value.type === '0') {
    //   await getSampleListPortFun()
    //   chartDataUnion.value = findDataByKey(paramsData.value.dataId) as ChartDataItem[]
    // } else {
    //   await getChangeTheListPortFun()
    //   chartDataUnion.value = findDataByKey(paramsData.value.dataId) as ChartDataItem[]
    // }
  }
}
const savePeakAndValleysRemark = async (record: any) => {
  const { code } = await addTimePeakValleyRemarks({
    ...record,
    dataId: paramsData.value.dataId,
    // dataType: paramsData.value.type,
  })
  if (code === 200) {
    message.success('添加备注成功')
  }
}

// ==================== 标记 ====================
const tableOptionsBiao = ref({
  rowKey: 'serialNumber',
  columns: [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      ellipsis: true,
      resizable: true,
      width: 80,
    },
    {
      title: '时间(s)',
      dataIndex: 'x',
      ellipsis: true,
      resizable: true,
      width: 120,
    },
    {
      title: appStore.luminosity,
      dataIndex: 'y',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      resizable: true,
      width: 150,
      slots: { customRender: 'remark' },
    },
  ],
  data: [],
  pagination: false,
})
const queryGaugePointPortFun = async () => {
  const { code, data } = await getTimeGaugePointDataList({
    dataId: paramsData.value.dataId,
    // type: paramsData.value.type,
    digit: absDigit.value,
  })
  if (code === 200) {
    tableOptionsBiao.value.data =
      data && data.length
        ? data.map((item: any, index: number) => ({
            ...item,
            serialNumber: index + 1,
          }))
        : []
  }
}
const saveGaugePointRemark = async (record: any) => {
  const { code } = await addTimeGaugePointRemarks({
    ...record,
    dataId: paramsData.value.dataId,
    // dataType: paramsData.value.type,
  })
  if (code === 200) {
    message.success('添加备注成功')
  }
}

// ==================== 测量相关 ====================
// 测量数据
const measureData = reactive({
  nm: 0,
  abs: 0,
})
// 测量键值（当前测量的样品key）
const measureKey = ref('')
// 测量是否结束 0未测量/完成 1测量中
const finished = ref('0')
// 当前测量的样品索引（用于连续测量）
const currentIndex = ref(0)
// 循环测量状态（用于连续测量）
const doubleMeasure = ref(false)
// 测量样品列表
const sampleList = ref<Record<string, any>>([])
// 执行测量
const measure = () => {
  // 启用循环测量模式
  doubleMeasure.value = true
  // 测量第一个样品
  measureSingle(sampleList.value[0])
}
// 某个样品测量
const measureSingle = (data: any) => {
  // 如果正在测量中，不允许再次测量
  if (finished.value === '1') {
    message.error('测量过程进行中！')
    return
  }
  // 设置当前活动标签页和测量键值
  activeKey.value = data.key
  measureKey.value = data.key
  // 清空测量数据
  measureChartData.value = []
  // 如果当前样品未被选中，则添加到选中项中
  if (!checkedKeys.value.includes(data.key)) checkedKeys.value.push(data.key)
  // 清空图表联合数据
  chartDataUnion.value = []
  setTimeout(() => {
    // 清空当前样品的图表数据
    chartLines.value.forEach((item) => {
      if (item.key === data.key) item.data = []
    })
    // 开始实际测量
    measureReal(data.sampleId)
  }, 500)
}
// 处理WebSocket消息
const handleMessage = (event: MessageEvent) => {
  // console.log('WebSocket 收到消息', event)
  if (event.data === '扫描失败' || event.data === '当前测试未结束,无法开启新的测试') {
    message.error(event.data)
    webSocketService.close()
    doubleMeasure.value = false
    currentIndex.value = 0
    return
  }
  const data = JSON.parse(event.data)
  // 将接收到的数据添加到测量图表数据中
  if (!data.result) measureChartData.value.push(data)
  // 获取X轴显示范围
  const xData = measureChartData.value.map((itemData: any) => itemData.x)
  // xShowRange.min = Math.min(...xData)
  // xShowRange.max = Math.max(...xData)
  xShowRangeNew[activeKey.value].min = Math.min(...xData)
  xShowRangeNew[activeKey.value].max = Math.max(...xData)
  // 将数据添加到对应的图表线条中
  const changeChartObj = chartLines.value.find((item) => item.key === measureKey.value)
  if (!data.result) changeChartObj?.data?.push(data)
  // 更新全局状态中的nm和abs值
  const appStore = useAppStore()
  measureData.nm = data.x
  appStore.setNm(data.x)
  appStore.setAbs(data.y)
  measureData.abs = data.y
}
// 关闭WebSocket 继续下一个测量样品
const handleClose = async () => {
  console.log('WebSocket 连接已关闭')
  finished.value = '0'
  webSocketService.close()
  await getChangeTheListPortFun()
  await getSampleListPortFun()
  measureChartData.value = findDataByKey(measureKey.value) as ChartDataItem[]
  emit('addSampleSuccess')
  if (doubleMeasure.value) {
    currentIndex.value++
    if (currentIndex.value < sampleList.value.length) {
      measureSingle(sampleList.value[currentIndex.value])
    } else {
      doubleMeasure.value = false
      currentIndex.value = 0
      // measureKey.value = ''
    }
  }
}
// 实际测量函数
const measureReal = async (sampleId: string = '') => {
  chartData.value = []
  // 设置WebSocket基础URL
  webSocketService.setBaseUrl('ws/timeScan')
  // 设置WebSocket回调函数
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: handleClose,
    onError: (event) => {
      console.error('WebSocket 错误', event)
      doubleMeasure.value = false
    },
  })
  // 连接WebSocket
  webSocketService.connect({
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010',
    taskId: props.taskId,
    sampleId: sampleId,
  })
  // 设置测量状态为进行中
  finished.value = '1'
}

// ==================== 样品按钮 ====================
// 样品设置可见性
const sampleSetVisible = ref(false)
// 显示样品设置
const showSampleSetting = () => {
  sampleSetVisible.value = true
}
// 添加样品
const sampleSaveSuccess = async () => {
  await getSampleListPortFun()
  // if (checkedKeys.value && checkedKeys.value.length && checkedKeys.value.includes('0-0')) {
  //   sampleList.value.forEach((item: any) => {
  //     if (!checkedKeys.value.includes(item.key)) checkedKeys.value.push(item.key)
  //   })
  // }
}

// ==================== 校零按钮 ====================
// 校零加载状态
const zeroLoading = ref(false)
// 执行校零操作
const xiaoZero = async () => {
  // 检查是否已创建方法
  if (!props.measureParams?.methodId) message.error('请创建方法！')
  zeroLoading.value = true
  try {
    const { code } = await zeroTime({
      serialNumber: localStorage.getItem('deviceSerialNumber') || '',
      methodId: props.measureParams?.methodId,
      taskId: props.taskId || '',
    })
    if (code === 200) {
      message.success('校零成功！')
      // 更新全局状态中的nm和abs值
      appStore.setNm('0')
      appStore.setAbs('0')
    }
    zeroLoading.value = false
  } catch (err) {
    zeroLoading.value = false
  }
}

// ==================== 树节点操作相关 ====================
// 根据key查找树节点
const findNodeByKey = (key: string, tree: TreeNode[] = treeData.value): TreeNode | null => {
  // 如果树为空，直接返回 null
  if (!tree || tree.length === 0) {
    return null
  }
  for (const node of tree) {
    if (node.key === key) {
      return node || []
    }
    if (node.children && node.children.length > 0) {
      const result = findNodeByKey(key, node.children)
      if (result) {
        return result
      }
    }
  }
  return null
}
// 根据key查找数据
const findDataByKey = (key: string, tree: TreeNode[] = treeData.value): ChartDataItem[] | null => {
  // 如果树为空，直接返回 null
  if (!tree || tree.length === 0) {
    return null
  }
  for (const node of tree) {
    if (node.key === key) {
      return node.data || []
    }
    if (node.children && node.children.length > 0) {
      const result = findDataByKey(key, node.children)
      if (result) {
        return result
      }
    }
  }
  return null
}
const findDataByMeasureId = (
  measureId: string,
  tree: TreeNode[] = treeData.value,
): ChartDataItem[] | null => {
  // 如果树为空，直接返回 null
  if (!tree || tree.length === 0) {
    return null
  }
  for (const node of tree) {
    if (node.measureId === measureId) {
      return node.data || []
    }
    if (node.children && node.children.length > 0) {
      const result = findDataByMeasureId(measureId, node.children)
      if (result) {
        return result
      }
    }
  }
  return null
}
// 根据key查找颜色
const findColorByKey = (key: string, tree: TreeNode[] = treeData.value): string | null => {
  // 如果树为空，直接返回 null
  if (!tree || tree.length === 0) {
    return null
  }
  for (const node of tree) {
    if (node.key === key) {
      return node.color || ''
    }
    if (node.children && node.children.length > 0) {
      const result = findColorByKey(key, node.children)
      if (result) {
        return result
      }
    }
  }
  return null
}
// 获取非第一级标题
const getNonFirstLevelTitles = (tree: TreeNode[]) => {
  const titles: { title: string; value: string }[] = []
  const traverse = (nodes: TreeNode[], level: number) => {
    for (const node of nodes) {
      // 只获取第二级及以下的节点，并且是已选中的节点
      if (level > 1 && node.title && checkedKeys.value.includes(node.key)) {
        titles.push({ title: node.title, value: node.key })
      }
      if (node.children) {
        traverse(node.children, level + 1)
      }
    }
  }
  traverse(tree, 1)
  return titles
}
// 获取图表线条数据
const getChartLineData = (tree: TreeNode[]) => {
  const chartLines: ChartLinesData[] = []
  const traverse = (nodes: TreeNode[], level: number) => {
    for (const node of nodes) {
      // 只获取第二级及以下的节点，并且是已选中的节点
      if (level > 1 && checkedKeys.value.includes(node.key)) {
        chartLines.push({
          name: node.title,
          data: node.data,
          color: node.color,
          key: node.key,
        })
      }
      if (node.children) {
        traverse(node.children, level + 1)
      }
    }
  }
  traverse(tree, 1)
  return chartLines
}

// ==================== 图表标记相关 ====================
// 图表数据示例
const chartLineData = Array.from({ length: 10 }, (_, i) => ({
  x: i + 1,
  y: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, // 2000~5000 随机数
  marked: 0,
  feng: Math.random() < 0.5 ? 0 : 1,
  gu: Math.random() < 0.5 ? 0 : 1,
}))
// 图表数据
const chartData = ref<typeof chartLineData>([])
// 标签
const tags = ref()
// 监听图表数据变化
watch(
  () => chartData.value,
  (newValue) => {
    tags.value = newValue.map((item) => (item.marked === 1 ? item.x : null)).filter((item) => item)
  },
  {
    deep: true,
  },
)
// 监听标签变化
watch(tags, (val) => {
  chartData.value.forEach((item) => {
    item.marked = val?.includes(item.x) ? 1 : 0
  })
})
// 标记点
const chartMarkArr = ref<(string | number)[]>([])
const addGaugePointFun = async () => {
  const { code, data } = await addTimeGaugePoint({
    gaugePoints: chartMarkArr.value,
    ...paramsData.value,
  })
  if (code === 200) {
    message.success('标记添加成功')
    // 根据类型更新对应列表
    // if (paramsData.value.type === '0') {
    //   await getSampleListPortFun()
    //   chartDataUnion.value = findDataByKey(paramsData.value.dataId) as ChartDataItem[]
    // } else {
    //   await getChangeTheListPortFun()
    //   chartDataUnion.value = findDataByKey(paramsData.value.dataId) as ChartDataItem[]
    // }
    await getSampleListPortFun()
    await getChangeTheListPortFun()
    chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    await queryGaugePointPortFun()
  }
}

// ==================== 截图相关 ====================
// 截图功能
const screenshot = async () => {
  // const imageBase64 = await lineChartRef.value?.captureChart()
  // emit('update:imageBase64', imageBase64)
}

// 图表固定DOM引用
const chartFixedDomRef = ref<HTMLElement | null>()

// 图表引用DIV
const lineChartRefDiv = ref<HTMLElement | null>()

// 监听器
let observer: IntersectionObserver

// 图表固定功能
const linChartFixed = () => {
  const chartEl = lineChartRefDiv.value
  const chartFixedRef = chartFixedDomRef.value
  if (!chartEl || !chartFixedRef) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        // 图表离开视口，开始固定
        chartFixedRef.style.visibility = 'visible'
      } else {
        // 图表回到视口，取消固定
        chartFixedRef.style.visibility = 'hidden'
      }
    },
    {
      threshold: 0,
      rootMargin: '0px 0px 300px 0px',
    },
  )
  observer.observe(chartEl)
}

// 关闭小图表
const closeSmallChart = () => {
  const chartFixedRef = chartFixedDomRef.value
  if (!chartFixedRef) return
  chartFixedRef.style.visibility = 'hidden'
}

// 截图上传函数
const captureScreenshotFun = async () => {
  let id = '' // 折线图id
  let imageType // 图片类型
  let type // 类型
  if (activeKey.value === '重叠') {
    id = 'lineChartDieRef'
    imageType = '1'
    type = '0'
  } else if (activeKey.value === '平铺') {
    id = 'lineChartPingRef'
    imageType = '1'
    type = '1'
  } else if (activeKey.value === '3D') {
    id = 'lineChart3DRef'
    imageType = '1'
    type = '2'
  } else {
    id = 'lineChartOther'
    imageType = '0'
    type = ''
    // type = paramsData.value.type
  }
  const lineChartDiv = document.getElementById(id) as HTMLElement
  lineChartDiv.style.backgroundColor = '#ffffff'
  const pictureBlob = await captureScreenshot(lineChartDiv as HTMLElement, 'base64')
  if (pictureBlob) {
    const { code } = await timeUploadImage({
      id: paramsData.value.dataId ? paramsData.value.dataId : props.taskId,
      type,
      image: pictureBlob,
      imageType,
    })
    if (code === 200) {
      message.success('上传图片成功')
    }
  }
}

// ==================== 创建新任务模态框 ====================
const saveVisual = ref(false) // 是否显示
const measureTaskParams = ref<Record<string, any>>({}) //参数

// ==================== 报表内容 ====================
const reportFormsContentRef = ref()
// const handleReportFormsAdd = async () => {}
const handleReportFormsDetail = () => {
  reportFormsContentRef.value.showDrawer()
}

// 组件卸载时
onUnmounted(() => {
  webSocketService.close()
})

// ==================== 事件发射 ====================
const emit = defineEmits(['update:imageBase64', 'addSampleSuccess', 'update:chekedSampleKeys'])

// ==================== 暴露方法 ====================
defineExpose({ screenshot, initListPortData })
</script>
<style scoped lang="less">
.tree-box {
  padding: 8px 20px !important;
  border-radius: 22px;
  background-color: #fff;
}

.chartFixedDomRef {
  position: fixed;
  bottom: 50px;
  right: -10%;
  transform: translateX(-50%);
  z-index: 9;
  width: 400px;
  height: 300px;
  visibility: hidden;
  border: 1.5px solid #153471;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}

:deep(.ant-tree) {
  background: rgba(233, 241, 253, 0);
}

// :deep(.ant-tree-indent) {
//   display: none !important;
// }
</style>
