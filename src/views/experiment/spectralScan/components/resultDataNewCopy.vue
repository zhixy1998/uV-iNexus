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
        <div class="flex items-center !mr-4">
          <a-checkbox
            value="1"
            v-model:checked="checkDeleteValue"
            @click.stop
            @change="checkIsDelete"
          >
            <span class="text-[14px] text-[#595757]">显示已删除的数据</span>
          </a-checkbox>
        </div>
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
            <span class="text-[14px] text-[#595757]">Abs显示位数</span>
            <a-input-number v-model:value="digit" class="w-xs !m-2" @blur="changeInputNumberAbs" />
          </div>
        </div>
      </template>
      <template #slot-content>
        <div class="flex justify-between items-center flex-wrap">
          <div class="flex items-center">
            <uvHasIconBtn content="样品" class="!mr-[30px]" @click="showSampleSetting">
            </uvHasIconBtn>
            <uvHasIconBtn
              content="基线"
              class="!mr-[30px]"
              @click="xiaoZero"
              :loading="zeroLoading"
            >
            </uvHasIconBtn>
            <uvHasIconBtn content="扫描" :loading="doubleMeasure" @click.stop="measure">
            </uvHasIconBtn>
          </div>
          <!-- <div class="showWord">
            <div class="!mr-[20px]">{{ measureData.nm }}nm</div>
            <div>{{ measureData.abs }}abs</div>
          </div> -->
        </div>
        <br />
        <a-row :gutter="16">
          <a-col :span="4">
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
                        @change="updateDataColorFun(data)"
                      />
                      <!-- <a-progress type="circle" :percent="30" :width="80" /> -->
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
          <a-col :span="20">
            <div class="uv-panel">
              <a-tabs v-model:activeKey="activeKey" :destroyInactiveTabPane="false">
                <a-tab-pane v-for="item in tabPaneArr" :key="item.value" :tab="item.title">
                  <div v-if="activeKey === item.value">
                    <a-row
                      v-if="item.value === '重叠' || item.value === '平铺' || item.value === '3D'"
                    >
                      <a-col :span="14" class="overflow-y-auto overflow-x-hidden">
                        <div class="h-100 relative" v-show="item.value === '重叠'">
                          <uvLinesChart
                            class="chart-container"
                            :lines="chartLines"
                            :xAxisOptions="xShowRange"
                            id="lineChartDieRef"
                            :mark-select="checkValue"
                            :yAxisOptions="yShowRange"
                            :y-axis-name="appStore.luminosity"
                          />
                          <IconFont
                            @click="captureScreenshotFun"
                            type="icon-tupianshangchuan"
                            class="text-xl absolute top-1 right-2 cursor-pointer"
                            :style="{ color: '#153471' }"
                          />
                        </div>
                        <div class="h-100 relative" v-show="item.value === '平铺'">
                          <IconFont
                            type="icon-tupianshangchuan"
                            class="text-xl absolute top-1 right-2 cursor-pointer z-9"
                            :style="{ color: '#153471' }"
                            @click="captureScreenshotFun"
                          />
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
                                :xAxisOptions="xShowRange"
                                :initial-data="item.data"
                                :color="item.color"
                                :lineName="item.name"
                                :y-axis-name="appStore.luminosity"
                                :key="`${index}chartFixedDomRef`"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="h-100 relative" v-show="item.value === '3D'">
                          <IconFont
                            type="icon-tupianshangchuan"
                            class="text-xl absolute top-1 right-2 cursor-pointer z-9"
                            :style="{ color: '#153471' }"
                            @click="captureScreenshotFun"
                          />
                          <div id="lineChart3DRef" class="w-full h-full">
                            <uv3DLineChart :series="series3DData" />
                          </div>
                        </div>
                      </a-col>
                      <a-col :span="10" class="!overflow-x-auto">
                        <a-table
                          class="w-full"
                          :dataSource="tableOptionsIn.data"
                          :columns="tableOptionsIn.columns"
                          :pagination="tableOptionsIn.pagination"
                          @resizeColumn="handleResizeColumn"
                        >
                        </a-table>
                      </a-col>
                    </a-row>
                    <div
                      v-if="item.value !== '重叠' && item.value !== '平铺' && item.value !== '3D'"
                    >
                      <a-row class="!h-80 !relative">
                        <IconFont
                          type="icon-tupianshangchuan"
                          class="text-xl absolute top-1 right-4 cursor-pointer z-9"
                          :style="{ color: '#153471' }"
                          @click="captureScreenshotFun"
                        />
                        <lineChart
                          id="lineChartOther"
                          class="chart-container !w-full !h-full"
                          :yAxisOptions="yShowRange"
                          :xAxisOptions="xShowRange"
                          :markSelect="checkValue"
                          :initial-data="
                            activeKey === measureKey ? measureChartData : chartDataUnion
                          "
                          :color="chartDataUnionColor"
                          :y-axis-name="appStore.luminosity"
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
                                      @click="seekingPeaksAndValleysPortFun"
                                    ></uvHasIconBtn>
                                  </div>
                                </div>
                              </a-col>
                              <a-col :span="16" class="!overflow-x-auto">
                                <a-table
                                  :dataSource="tableOptions.data"
                                  :columns="tableOptions.columns"
                                  :pagination="tableOptions.pagination"
                                  @resizeColumn="handleResizeColumn"
                                >
                                  <template #beizhu="{ record }">
                                    <a-input
                                      v-model:value="record.remark"
                                      placeholder="请输入备注"
                                      @blur="addPeakValleyRemarksFun(record)"
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
                                  <template #beizhu="{ record }">
                                    <a-input
                                      v-model:value="record.remark"
                                      placeholder="请输入备注"
                                      @blur="addGaugePointRemarksFun(record)"
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
          <!--          <a-col :span="4">-->
          <!--            <reportContent />-->
          <!--          </a-col>-->
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
    :methodId="measureParams?.method_id"
    @addSampleSuccess="sampleListPortListFun"
  />
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
import ColorInput from 'vue-color-input'

import {
  addGaugePoint,
  addGaugePointRemarks,
  addPeakValleyRemarks,
  changeTheListPort,
  deleteChangeListPort,
  deleteSampleListPort,
  methodParameter,
  queryGaugePointPort,
  queryMeasuredData,
  queryPeakAndValleysPort,
  queryTheTaskImage,
  restoreDeletedListData,
  sampleListPortList,
  seekingPeaksAndValleysPort,
  updateDataColor,
  uploadImage,
  zeroCalibrationPort,
} from '@/api'
import lineChart from '@/components/lineChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import uvTable from '@/components/uvTable/index.vue'
import uvTags from '@/components/uvTags/index.vue'
import type { Series3DLineData } from '@/types/common'
import type { ChartDataItem } from '@/types/experimentTypes'
import { captureScreenshot } from '@/utils/screenshotUtils'
import webSocketService from '@/utils/websocket'

import spectralSampleSetting from './spectralSampleSetting.vue'

const props = defineProps({
  imageBase64: String,
  measureParams: {
    type: Object as PropType<{
      projectId: string
      method_id: string
    }>,
  },
  taskId: String,
  messageId: String,
})
const checkedKeys = ref<string[]>([])

interface ChartLinesData {
  name: string
  color?: string
  data?: ChartDataItem[]
  key: string
}

const chartLines = ref<ChartLinesData[]>([])
const series3DData = ref<Series3DLineData[]>([])

interface TreeNode {
  title: string
  key: string
  children: TreeNode[]
  color?: string
  data?: ChartDataItem[]
  measureType?: 0 | 1 // 1测量中, 0测量完成
  deleteType?: 0 | 1 // 0正常, 1删除
  type?: '0' | '1' // 0样品列表 1变化列表
  measureId?: string

  [key: string]: unknown
}

const formState = reactive<{ [key: string]: any }>({})
const measureTaskParams = ref<Record<string, any>>({})
const treeData = ref<TreeNode[]>([
  {
    title: '样品列表',
    key: '0-0',
    children: [
      // {
      //   title: '样品1',
      //   key: '0-0-0',
      //   color: '#0038a8',
      //   data: [
      //     { x: 1, y: 100, marked: 1, feng: 0, gu: 0 },
      //     { x: 2, y: 200, marked: 0, feng: 1, gu: 0 },
      //     { x: 3, y: 150, marked: 0, feng: 0, gu: 1 },
      //   ],
      //   measureType: 0, //1测量中,0测量完成
      //   deleteType: 0, //0正常,1删除
      // },
      // {
      //   title: '样品2',
      //   key: '0-0-1',
      //   color: '#FF0000',
      //   data: [
      //     { x: 1, y: 50, marked: 0, feng: 1, gu: 0 },
      //     { x: 2, y: 80, marked: 1, feng: 0, gu: 0 },
      //     { x: 3, y: 30, marked: 0, feng: 0, gu: 1 },
      //   ],
      //   measureType: 0, //1测量中,0测量完成
      //   deleteType: 0, //0正常,1删除
      // },
    ],
  },
  {
    title: '变化列表',
    key: '1-0',
    children: [
      // {
      //   title: '样品1+样品2',
      //   key: '1-0-1',
      //   color: '#0038a8',
      //   data: [
      //     { x: 1, y: 100, marked: 1, feng: 0, gu: 0 },
      //     { x: 2, y: 200, marked: 0, feng: 1, gu: 0 },
      //     { x: 3, y: 150, marked: 0, feng: 0, gu: 1 },
      //   ],
      //   measureType: 0, //1测量中,0测量完成
      //   deleteType: 0, //0正常,1删除
      // },
      // {
      //   title: '样品1平滑',
      //   key: '1-0-2',
      //   color: '#0038a8',
      //   data: [
      //     { x: 1, y: 100, marked: 1, feng: 0, gu: 0 },
      //     { x: 2, y: 200, marked: 0, feng: 1, gu: 0 },
      //     { x: 3, y: 150, marked: 0, feng: 0, gu: 1 },
      //   ],
      //   measureType: 0, //1测量中,0测量完成
      //   deleteType: 0, //0正常,1删除
      // },
    ],
  },
])
const chartDataUnion = ref<ChartDataItem[]>([])
const tabPaneArr = ref([
  { title: '重叠', value: '重叠' },
  { title: '平铺', value: '平铺' },
  { title: '3D', value: '3D' },
])
const digit = ref<number>()
const appStore = useAppStore()
const zeroLoading = ref(false)
const instance = getCurrentInstance()
const xiaoZero = async () => {
  if (!props.measureParams?.method_id) message.error('请创建方法！')
  zeroLoading.value = true
  const params = {
    methodId: props.messageId || '',
  } as Record<string, any>
  if (props.taskId) params.taskId = props.taskId
  try {
    const { code, data } = await zeroCalibrationPort(params)
    if (code === 200) {
      message.success('校零成功！')
      appStore.setNm('0')
      appStore.setAbs('0')
      if (!props.taskId) {
        // instance?.parent.exposed.findInitParams()
      }
    }
    zeroLoading.value = false
  } catch (err) {
    zeroLoading.value = false
  }
}
const activeKeySample = ref('寻峰')
const titles = ref()
watch(
  () => [checkedKeys.value, treeData.value],
  ([NewCheckedKeys, newTreeData]) => {
    chartLines.value = getChartLineData(treeData.value) as ChartLinesData[]
    series3DData.value = get3DLineChartData(treeData.value)
    tableOptionsIn.value.columns = [
      {
        title: '波长nm',
        dataIndex: 'x',
      },
    ]
    chartDataUnionColor.value = findColorByKey(activeKey.value) as string
    chartLines.value.forEach((item, index) => {
      tableOptionsIn.value.columns.push({
        title: item.name,
        dataIndex: item.key,
      })
      if (item.data) {
        while (tableOptionsIn.value.data.length < item.data.length) {
          tableOptionsIn.value.data.push({ x: 0 })
        }
        // 填充数据
        item.data?.forEach((itemData, itemIndex) => {
          tableOptionsIn.value.data[itemIndex][item.key] = itemData.y || ''
          tableOptionsIn.value.data[itemIndex].x = itemData.x
        })
      }
    })
    titles.value = getNonFirstLevelTitles(newTreeData as TreeNode[])
  },
  {
    deep: true,
  },
)
watch(
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
watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      checkIsDelete()
    } else {
      treeData.value[1].children = []
      treeData.value[0].children = []
    }
  },
)
watch(
  () => props.messageId,
  (newValue) => {
    if (newValue) {
      methodParameterFun(newValue)
    }
  },
  {
    deep: true,
  },
)
const checkDeleteValue = ref(false)
const checkIsDelete = () => {
  changeTheListPortFun()
  sampleListPortListFun()
}
const changeInputNumberAbs = () => {
  checkIsDelete()
  if (paramsData.value.dataId) {
    // 获取标记点列表 获取峰谷列表
    queryGaugePointPortFun()
    queryPeakAndValleysPortFun()
  }
}
const methodParameterFun = async (methodId: string) => {
  const { code, data } = await methodParameter({ methodId: methodId })
  if (code === 200) {
    xShowRange.value.min = Number(data.endWaveLength)
    xShowRange.value.max = Number(data.startWaveLength)
  }
}
const measureSingle = (data: any) => {
  if (finished.value === '1') {
    message.error('测量过程进行中！')
    return
  }
  activeKey.value = data.key
  measureKey.value = data.key
  console.log('measureKey.value', measureKey.value, finished.value)
  measureChartData.value = []
  if (!checkedKeys.value.includes(data.key)) checkedKeys.value.push(data.key)
  chartDataUnion.value = []

  setTimeout(() => {
    chartLines.value.forEach((item) => {
      if (item.key === data.key) item.data = []
    })
    measureReal(data.sampleId)
  }, 500)
}
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
const getNonFirstLevelTitles = (tree: TreeNode[]) => {
  const titles: { title: string; value: string }[] = []
  const traverse = (nodes: TreeNode[], level: number) => {
    for (const node of nodes) {
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
const getChartLineData = (tree: TreeNode[]) => {
  const chartLines: ChartLinesData[] = []
  const traverse = (nodes: TreeNode[], level: number) => {
    for (const node of nodes) {
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
const pagination = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    fetchData()
  },
  onShowSizeChange: (current: number, size: number) => {
    pagination.current = current
    pagination.pageSize = size
    fetchData()
  },
})
const tableOptions = ref({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      ellipsis: true,
      resizable: true,
      width: 60,
      customRender: (data: { text: string; record: any; index: number }) => {
        return data.index + 1
      },
    },
    {
      title: '波长nm',
      dataIndex: 'x',
      ellipsis: true,
      resizable: true,
    },
    {
      title: 'Abs',
      dataIndex: 'y',
      ellipsis: true,
      resizable: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      ellipsis: true,
      resizable: true,
      // customRender: (data: { text: '0' | '1' | '2' }) => {
      //   const statusMap = {
      //     '0': '-',
      //     '1': '波峰',
      //     '2': '波谷',
      //   }
      //   return h('span', statusMap[data.text])
      // },
      filters: [
        {
          text: '波峰',
          value: '波峰',
        },
        {
          text: '波谷',
          value: '波谷',
        },
      ],
      onFilter: (value: string, record: any) => record.type.indexOf(value as string) === 0,
    },
    {
      title: '备注',
      dataIndex: 'beizhu',
      ellipsis: true,
      resizable: true,
      slots: { customRender: 'beizhu' },
    },
  ],
  data: [{}],
  pagination: false,
})
const tableOptionsBiao = ref({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      ellipsis: true,
      resizable: true,
      width: 60,
      customRender: (data: { text: string; record: any; index: number }) => {
        return data.index + 1
      },
    },
    {
      title: '波长nm',
      dataIndex: 'x',
      ellipsis: true,
      resizable: true,
    },
    {
      title: 'Abs',
      dataIndex: 'y',
      ellipsis: true,
      resizable: true,
    },
    {
      title: '备注',
      dataIndex: 'tag',
      ellipsis: true,
      resizable: true,
      slots: { customRender: 'beizhu' },
    },
  ],
  data: [],
  pagination: false,
})

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

const tableOptionsIn = ref<tableOptions>({
  columns: [
    {
      title: '波长nm',
      dataIndex: 'x',
    },
  ],
  data: [],
  pagination: {
    total: 0,
    showTotal: (total: number) => `Total ${total} items`,
  },
})

function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}

const handleCheckTree = () => {}
//分页表格数据请求
const fetchData = async () => {
  const { code, data } = await queryMeasuredData({
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
    taskId: task_id.value,
  })
  tableOptions.value.data = data.data
  pagination.total = data.total
  tableOptions.value = {
    ...tableOptions.value,
    // pagination: {
    //   ...pagination,
    // },
  }
}
const activeKey = ref('重叠')
const chartDataUnionColor = ref('')
const chartMarkArr = ref<(string | number)[]>([])
const paramsData = ref({
  sampleId: '',
  dataId: '',
  type: '',
})
watch(
  () => activeKey.value,
  (newValue) => {
    if (newValue !== '重叠' && newValue !== '平铺' && newValue !== '3D') {
      const params = findNodeByKey(newValue)
      // chartDataUnion.value = findDataByKey(newValue) as ChartDataItem[]
      // chartDataUnionColor.value = findColorByKey(newValue) as string
      chartDataUnion.value = params?.data as ChartDataItem[]
      chartDataUnionColor.value = params?.color as string
      console.log(params, 'params')
      paramsData.value = {
        sampleId: params?.sampleId as string,
        dataId: params?.measureId as string,
        type: params?.type as string,
      }
      chartMarkArr.value = chartDataUnion.value
        .map((item) => (item.marked == 1 ? item.x : null))
        .filter((item) => item !== null)
      if (paramsData.value.dataId) {
        // 获取标记点列表 获取峰谷列表
        queryGaugePointPortFun()
        queryPeakAndValleysPortFun()
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
const lineChartDieRef = ref<HTMLElement | null>()
const emit = defineEmits(['update:imageBase64', 'addSampleSuccess', 'update:chekedSampleKeys'])
const chartLineData = Array.from({ length: 10 }, (_, i) => ({
  x: i + 1,
  y: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, // 2000~5000 随机数
  marked: 0,
  feng: Math.random() < 0.5 ? 0 : 1,
  gu: Math.random() < 0.5 ? 0 : 1,
}))
const chartData = ref<typeof chartLineData>([])
const tags = ref()
watch(
  () => chartData.value,
  (newValue) => {
    tags.value = newValue.map((item) => (item.marked === 1 ? item.x : null)).filter((item) => item)
  },
  {
    deep: true,
  },
)

const measureData = reactive({
  nm: 0,
  abs: 0,
})
const task_id = ref('')
// 测量的样品key
const measureKey = ref('')
// 测量返回的chart数据
const measureChartData = ref<ChartDataItem[]>([])
// 测量是否结束
const finished = ref('0') //1测量中
const currentIndex = ref(0) //测量的样品index
const handleClose = async () => {
  console.log('webSocket关闭------------------------------')
  finished.value = '0'
  webSocketService.close()
  await changeTheListPortFun()
  await sampleListPortListFun()
  measureChartData.value = findDataByKey(measureKey.value) as ChartDataItem[]
  emit('addSampleSuccess')
  if (doubleMeasure.value) {
    currentIndex.value++
    if (currentIndex.value < sampleList.value.length) {
      measureSingle(sampleList.value[currentIndex.value])
    } else {
      doubleMeasure.value = false
      measureKey.value = ''
      currentIndex.value = 0
    }
  }
  // measureKey.value = ''
}
const handleMessage = async (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  measureChartData.value.push(...data.data)
  const changeChartObj = chartLines.value.find((item) => item.key === measureKey.value)
  if (data.data) {
    changeChartObj?.data?.push(...data.data)
    const appStore = useAppStore()
    data.data.forEach((item: any) => {
      measureData.nm = item.x
      appStore.setNm(item.x)
      appStore.setAbs(item.y)
      measureData.abs = item.y
    })
  }
  console.log(data, '监听到的数据', data.result)
}
const sampleList = ref<Record<string, any>>([])
const doubleMeasure = ref(false)
const measure = () => {
  // const limit = pLimit(1)
  // sampleList.value.map((item) => {
  //   limit(() => measureReal(item))
  // })
  // saveVisual.value = true
  doubleMeasure.value = true
  measureSingle(sampleList.value[0])
}
const measureReal = async (sampleId: string = '') => {
  chartData.value = []
  webSocketService.setBaseUrl('ws/device')
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: handleClose,
    onError: (event) => console.error('WebSocket 错误', event),
  })
  webSocketService.connect({
    // method_id: props.measureParams?.method_id,
    // project_id: props.measureParams?.projectId,
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010',
    taskId: props.taskId,
    sampleId: sampleId,
  })
  finished.value = '1'
  console.log(finished.value, measureKey.value, 'finished.value,measureKey.value')
}
watch(tags, (val) => {
  chartData.value.forEach((item) => {
    item.marked = val?.includes(item.x) ? 1 : 0
  })
})
const checkValue = ref([])
const saveVisual = ref(false)
const yShowRange = reactive({
  min: '',
  max: '',
})
const xShowRange = ref({
  min: 0,
  max: 800,
})
const screenshot = async () => {
  // const imageBase64 = await lineChartRef.value?.captureChart()
  // emit('update:imageBase64', imageBase64)
}
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
const sampleSetVisible = ref(false)
//显示样品信息
const showSampleSetting = () => {
  sampleSetVisible.value = true
}
const changeTheListPortFun = async () => {
  const params: { taskId: string; type?: string; digit?: number } = {
    taskId: props.taskId || '',
  }
  if (digit.value) {
    params.digit = digit.value
  }
  if (checkDeleteValue.value) {
    params.type = '1'
  }
  const { code, data } = await changeTheListPort(params)
  if (code == 200) {
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key = item.measureId
      item.data = item.data || []
    })
    treeData.value[1].children = data
    checkedKeys.value = checkedKeys.value.filter((item) => item !== '0-0')
  }
}
const sampleListPortListFun = async () => {
  const params: { taskId: string; type?: string; digit?: number } = {
    taskId: props.taskId || '',
  }
  if (digit.value) {
    params.digit = digit.value
  }
  if (checkDeleteValue.value) {
    params.type = '1'
  }
  const { code, data } = await sampleListPortList(params)
  if (code == 200) {
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key = item.measureId || item.sampleId
      item.data = item.data || []
    })
    sampleList.value = data
    treeData.value[0].children = data
    checkedKeys.value = sampleList.value
      .map((item: any) => item.key)
      .filter((item: any) => item !== '1-0')

    // 生成报告需要勾选的样品Id
    emit('update:chekedSampleKeys', data[0]?.sampleId)
  }
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
    type = paramsData.value.type
  }
  const lineChartDiv = document.getElementById(id) as HTMLElement
  lineChartDiv.style.backgroundColor = '#ffffff'
  const pictureBlob = await captureScreenshot(lineChartDiv as HTMLElement, 'base64')
  if (pictureBlob) {
    const { code } = await uploadImage({
      id: imageType === '0' ? paramsData.value.dataId : props.taskId,
      type,
      image: pictureBlob,
      imageType,
    })
    if (code === 200) {
      message.success('上传图片成功')
    }
  }
}
const queryTheTaskImageFun = async () => {
  const { code, data } = await queryTheTaskImage({
    id: paramsData.value.dataId,
    type: paramsData.value.type,
  })
  console.log('data', data)
}
// 添加标记点
const addGaugePointFun = async () => {
  const { code, data } = await addGaugePoint({
    gaugePoints: chartMarkArr.value,
    ...paramsData.value,
  })
  if (code === 200) {
    message.success('标记添加成功')
    if (paramsData.value.type === '0') {
      await sampleListPortListFun()
      chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    } else {
      await changeTheListPortFun()
      chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    }
    console.log(chartDataUnion.value, 'chartDataUnion.value')
    queryGaugePointPortFun()
  }
}
//撤销删除
const restoreDeletedListDataFun = async (record: any) => {
  const { code, data } = await restoreDeletedListData({
    taskId: props.taskId || '',
    paramId: record.sampleId || record.measureId || '',
    type: record.type,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    checkIsDelete()
  }
}
// 删除
const deleteOneSampleFun = async (record: any) => {
  console.log(record, 'record')
  if (record.type === '0') {
    // 样品
    const { code, data } = await deleteSampleListPort({
      taskId: props.taskId || '',
      sampleId: record.sampleId,
    })
    if (code === 200) {
      message.success('删除成功！')
      checkIsDelete()
    }
  } else if (record.type === '1') {
    const { code, data } = await deleteChangeListPort({
      analysisId: record.measureId,
    })
    if (code === 200) {
      message.success('删除成功！')
      checkIsDelete()
    }
  }
}
//寻峰寻谷
const seekingPeaksAndValleysPortFun = async () => {
  if (!paramsData.value.dataId) {
    message.error('请先扫描获取测量数据！')
  }
  const params: Record<string, any> = {
    dataId: paramsData.value.dataId,
    type: paramsData.value.type,
    height: formState.height,
    distance: formState.distance,
  }
  if (digit.value) {
    params.digit = digit.value
  }
  const { code, data } = await seekingPeaksAndValleysPort(params)
  if (code == 200) {
    if (paramsData.value.type === '0') {
      await sampleListPortListFun()
      chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    } else {
      await changeTheListPortFun()
      chartDataUnion.value = findDataByMeasureId(paramsData.value.dataId) as ChartDataItem[]
    }
    queryPeakAndValleysPortFun()
  }
}
// 获取标记点列表
const queryGaugePointPortFun = async () => {
  const params: Record<string, any> = {
    dataId: paramsData.value.dataId,
    type: paramsData.value.type,
  }
  if (digit.value) {
    params.digit = digit.value
  }
  const { code, data } = await queryGaugePointPort(params)
  if (code === 200) {
    tableOptionsBiao.value.data = data || []
  }
}
// 获取峰谷的列表
const queryPeakAndValleysPortFun = async () => {
  const params: Record<string, any> = {
    dataId: paramsData.value.dataId,
    type: paramsData.value.type,
  }
  if (digit.value) {
    params.digit = digit.value
  }
  const { code, data } = await queryPeakAndValleysPort(params)
  if (code === 200) {
    tableOptions.value.data = data || []
  }
}
// 添加标记点备注
const addGaugePointRemarksFun = async (record: any) => {
  const params = {
    dataId: paramsData.value.dataId,
    dataType: paramsData.value.type,
    ...record,
  }
  const { code, data } = await addGaugePointRemarks(params)
  if (code === 200) {
  }
}
// 添加峰谷备注
const addPeakValleyRemarksFun = async (record: any) => {
  const params = {
    dataId: paramsData.value.dataId,
    dataType: paramsData.value.type,
    ...record,
  }
  const { code, data } = await addPeakValleyRemarks(params)
  if (code === 200) {
  }
}
// 更改颜色接口
const updateDataColorFun = async (record: any) => {
  const params = {
    dataId: record.sampleId || record.measureId,
    type: record.type,
    color: record.color,
  }
  const { code, data } = await updateDataColor(params)
  if (code === 200) {
  }
}
onMounted(() => {
  // changeTheListPortFun()
  // sampleListPortListFun()
})
onUnmounted(() => {
  webSocketService.close()
})

defineExpose({ screenshot, checkIsDelete, methodParameterFun })
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
</style>
