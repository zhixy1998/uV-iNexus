<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="结果数据" not-collapse>
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
            <span class="text-[14px] text-[#595757]">测量值显示位数</span>
            <a-input-number
              v-model:value="digit"
              class="w-xs !m-2"
              :min="0"
              :precision="0"
              @blur="changeInputNumberAbs"
            />
          </div>
        </div>
      </template>
      <template #slot-content>
        <div class="flex justify-between items-center flex-wrap !mb-4" v-if="!props.isSimpleMode">
          <div class="flex items-center">
            <uvHasIconBtn content="样品" class="!mr-[30px]" @click="showSampleSetting">
            </uvHasIconBtn>
            <uvHasIconBtn
              :content="showContent('zero')"
              class="!mr-[30px]"
              @click="xiaoZeroFun(showContent('zero') as string)"
            >
            </uvHasIconBtn>
            <uvHasIconBtn :content="showContent('measure')" @click.stop="measure"></uvHasIconBtn>
          </div>
          <div class="flex items-center justify-end gap-2 z-9 !mt-1">
            <IconFont
              @click="captureScreenshotFun"
              type="icon-tupianshangchuan"
              class="text-xl"
              :style="{ color: '#153471' }"
            />
            <uvHasIconBtn content="查看报表" @click="handleReportFormsDetail"></uvHasIconBtn>
            <a-dropdown placement="bottomRight">
              <!-- 下拉触发按钮（保持和原按钮样式一致） -->
              <uvHasIconBtn content="导出" class="!mr-[20px]"></uvHasIconBtn>
              <!-- 下拉菜单选项 -->
              <template #overlay>
                <a-menu @click="handleExportMenuClickLj">
                  <a-menu-item key="word">
                    <!-- key对应fileType值 -->
                    导出为word
                  </a-menu-item>
                  <a-menu-item key="xlsx">
                    <!-- key对应fileType值 -->
                    导出为excel
                  </a-menu-item>
                  <a-menu-item key="txt">
                    <!-- key对应fileType值 -->
                    导出为txt
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="flex justify-between items-center flex-wrap">
          <div v-if="props.isSimpleMode" class="nav-box flex px-4 pb-4 gap-2 flex-wrap">
            <template v-for="item in navList.slice(0, 3)" :key="item.icon">
              <div
                v-if="!item.notShow"
                style="padding: 4px 10px"
                class="nav-item"
                @click="item.clickFun"
              >
                <div class="icon-box" :style="{ backgroundImage: `url(${item.icon})` }"></div>
                <div class="!font-bold !text-[18px]" :style="{ color: item.color }">
                  {{ item.type ? showContent(item.type) : item.name }}
                </div>
              </div>
            </template>
          </div>
          <div v-if="props.isSimpleMode" class="nav-box flex px-4 pb-4 gap-2 flex-wrap">
            <div
              v-for="item in navList.slice(3)"
              :key="item.icon"
              class="nav-item"
              @click="item.clickFun"
            >
              <div class="icon-box" :style="{ backgroundImage: `url(${item.icon})` }"></div>
              <div class="!font-bold" :style="{ color: item.color }">
                {{ item.type ? showContent(item.type) : item.name }}
              </div>
            </div>
            <a-dropdown placement="bottomRight">
              <!-- 下拉触发按钮（保持和原按钮样式一致） -->
              <div class="nav-item">
                <div class="icon-box" :style="{ backgroundImage: `url(${importIcon})` }"></div>
                <div class="!font-bold" :style="{ color: '#A48FFF' }">导出</div>
              </div>
              <!-- 下拉菜单选项 -->
              <template #overlay>
                <a-menu @click="handleExportMenuClickLj1">
                  <a-menu-item key="word">
                    <!-- key对应fileType值 -->
                    导出为word
                  </a-menu-item>
                  <a-menu-item key="xlsx">
                    <!-- key对应fileType值 -->
                    导出为excel
                  </a-menu-item>
                  <a-menu-item key="txt">
                    <!-- key对应fileType值 -->
                    导出为txt
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <IconFont
              @click="captureScreenshotFun"
              type="icon-tupianshangchuan"
              class="text-xl"
              :style="{ color: '#153471' }"
            />
          </div>
        </div>
        <a-row :gutter="10" class="!flex">
          <a-col
            :style="{ width: !panelCollase ? '30%' : '10px', minWidth: '10px' }"
            class="flex flex-col"
          >
            <leftCollapsePanel
              class="flex-1"
              v-model:is-panel-collapsed="panelCollase"
              direction="left"
            >
              <div class="uv-panel !h-full max-h-[728px]">
                <a-tree
                  defaultExpandAll
                  v-model:checkedKeys="checkedKeys"
                  class="uv-ant-tree"
                  checkable
                  :tree-data="treeData"
                  @check="handleCheckTree"
                >
                  <template #title="{ data }">
                    <div
                      class="flex justify-between items-center text-[#595757] min-h-[50px]"
                      :class="{
                        '!border-t-2 !border-dashed !border-[#bdbdbd]': !data.children,
                      }"
                    >
                      <div class="w-[40%]">
                        <span>{{ data.title }}</span>
                      </div>
                      <div v-if="!data.children" class="flex items-center gap-3">
                        <span
                          v-if="!data.children && data.type !== '1'"
                          class="flex items-center gap-0.5"
                        >
                          <div
                            class="w-[16px] h-[16px] rounded-[50%] bg-[#DEE3FF] flex items-center justify-center"
                          >
                            <img
                              class="w-[60%]"
                              src="@/assets/images/methodOptimization/pool.png"
                            />
                          </div>
                          {{ data.sampleLocation ? `${data.sampleLocation}号` : '-' }}</span
                        >
                        <ColorInput
                          v-if="data.data && data.data.length"
                          v-model="data.color"
                          class="!w-3 !h-3"
                          @change="updateDataColorFun(data)"
                        />
                        <!-- <a-progress type="circle" :percent="30" :width="80" /> -->
                        <DeleteOutlined
                          class="!text-[#586FE7]"
                          v-if="data.deleteType === '0' && data.data && data.data.length"
                          @click="deleteOneSampleFun(data)"
                        />
                        <RollbackOutlined
                          class="!text-[#586FE7]"
                          v-if="data.deleteType === '1' && data.data && data.data.length"
                          @click="restoreDeletedListDataFun(data)"
                        />
                        <SyncOutlined
                          class="!text-[#586FE7]"
                          v-if="data.type === '0'"
                          :spin="finished === '1' && measureKey === data.key"
                          @click.stop="measureSingle(data)"
                        />
                      </div>
                    </div>
                  </template>
                </a-tree>
              </div>
            </leftCollapsePanel>
          </a-col>
          <a-col :style="{ flex: 1, minWidth: 0 }" class="flex flex-col">
            <div class="uv-panel">
              <a-tabs v-model:activeKey="activeKey" :destroyInactiveTabPane="false">
                <a-tab-pane v-for="item in tabPaneArr" :key="item.value" :tab="item.title">
                  <div v-if="activeKey === item.value" class="h-full overflow-hidden">
                    <a-row
                      v-if="item.value === '重叠' || item.value === '平铺' || item.value === '3D'"
                    >
                      <a-col :span="24">
                        <div class="h-78 overflow-y-auto" v-show="item.value === '重叠'">
                          <uvLinesChart
                            class="chart-container"
                            :lines="chartLines"
                            :xAxisOptions="xShowRange"
                            id="lineChartDieRef"
                            :mark-select="checkValue"
                            :yAxisOptions="yShowRange"
                            :y-axis-name="appStore.luminosity"
                            :xAxisName="props.measureType === '光谱扫描' ? '波长(nm)' : '时间(s)'"
                          />
                        </div>
                        <div class="h-78 overflow-y-auto" v-show="item.value === '平铺'">
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
                                :xAxisName="
                                  props.measureType === '光谱扫描' ? '波长(nm)' : '时间(s)'
                                "
                                :key="`${index}chartFixedDomRef`"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="h-78 overflow-y-auto" v-show="item.value === '3D'">
                          <div id="lineChart3DRef" class="w-full h-full">
                            <uv3DLineChart :series="series3DData" />
                          </div>
                        </div>
                      </a-col>
                      <a-col :span="24" class="!overflow-hidden !mt-2">
                        <a-table
                          size="small"
                          :scroll="{ x: 'max-content', y: 200 }"
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
                        <lineChart
                          id="lineChartOther"
                          class="chart-container !w-full !h-full"
                          :yAxisOptions="yShowRange"
                          :xAxisOptions="
                            finished === '1' && props.measureType === '时间扫描'
                              ? xShowRangeTimeMeasure
                              : xShowRange
                          "
                          :markSelect="checkValue"
                          :initial-data="
                            activeKey === measureKey ? measureChartData : chartDataUnion
                          "
                          :color="chartDataUnionColor"
                          :y-axis-name="appStore.luminosity"
                          :xAxisName="props.measureType === '光谱扫描' ? '波长(nm)' : '时间(s)'"
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
                              <a-col :span="16" class="overflow-hidden">
                                <a-table
                                  size="small"
                                  :dataSource="tableOptions.data"
                                  :columns="tableOptions.columns"
                                  :pagination="tableOptions.pagination"
                                  :scroll="{ y: 230 }"
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
                                <uvTags title="标记点" v-model:tags="chartMarkArr" />
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
        </a-row>
      </template>
    </uvCollapseRightSlot>
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
    <sampleSetting
      v-model="sampleSetVisible"
      v-if="sampleSetVisible"
      :taskId="taskId"
      :methodId="methodId"
      :measureType="props.measureType"
      @addSampleSuccess="sampleListPortListFun"
    />
    <reportFormsContent ref="reportFormsContentRef" />
    <save-modal-tip v-model="tipVisual" @confirm="saveModalConfirm" />
    <save-as-modal ref="saveAsModelRef" @update:modelValue="saveAsTask" />
    <report-preview
      v-model="reportPreviewVisible"
      :taskId="taskId"
      :sample-id="sampleIds"
      :analysis-id="analysisIds"
      :measureType="measureType"
      :pictureBlob="pictureBlob"
      :digit="digit"
      :isRepeatMode="isRepeatMode"
      v-if="reportPreviewVisible"
      :footer="null"
    />
  </section>
</template>
<script lang="ts" setup>
import lineChart from '@/components/lineChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import uvTags from '@/components/uvTags/index.vue'
import type { Series3DLineData } from '@/types/common'
import type { ChartDataItem } from '@/types/experimentTypes'
import { captureScreenshot } from '@/utils/screenshotUtils'
import webSocketService from '@/utils/websocket'
import reportFormsContent from '@/views/experiment/timeScan/components/reportFormsContent.vue'
import {
  AndroidOutlined,
  DeleteOutlined,
  RollbackOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import message from 'ant-design-vue/es/message'
import { onMounted, onUnmounted, type PropType, reactive, ref, watch } from 'vue'
import ColorInput from 'vue-color-input'

import {
  conciseCopy,
  createDraftButton,
  createDraftButtonTime,
  getSampleListSimple,
  whetherSaveData,
} from '@/api'
import copyIcon from '@/assets/images/experiment/copy.png'
import importIcon from '@/assets/images/experiment/import.png'
import measureIcon from '@/assets/images/experiment/measure.png'
import newIcon from '@/assets/images/experiment/new.png'
import sampleIcon from '@/assets/images/experiment/sample.png'
import saveIcon from '@/assets/images/experiment/save.png'
import zeroIcon from '@/assets/images/experiment/zero.png'
import { useDownloadFile } from '@/composables/useDownloadFile.ts'
import saveAsModal from '@/views/methodOptimization/components/saveAsModal.vue'
import SaveModalTip from '@/views/methodOptimization/components/saveModalTip.vue'
import { Modal, notification } from 'ant-design-vue'
import sampleSetting from './components/sampleSetting.vue'
// import { queryNearestMethodData} from
// 定义所有 API 函数的参数类型
type ApiParams = {
  sampleListPortList: Record<string, any> // 获取样品列表接口
  changeTheListPort: Record<string, any> // 获取变换列表接口
  deleteSampleListPort: Record<string, any> // 删除样品数据列表接口
  deleteChangeListPort: Record<string, any> // 删除变换数据列表接口
  restoreDeletedListData: Record<string, any> // 撤销删除数据接口
  uploadImage: Record<string, any> // 上传图片接口
  updateDataColor: Record<string, any> // 更改折线图颜色接口
  addGaugePoint: Record<string, any> // 添加标记点接口
  addGaugePointRemarks: Record<string, any> // 添加标记点备注接口
  addPeakValleyRemarks: Record<string, any> // 添加峰谷点备注接口
  seekingPeaksAndValleysPort: Record<string, any> // 寻峰寻谷接口
  queryGaugePointPort: Record<string, any> // 获取标记点列表接口
  queryPeakAndValleysPort: Record<string, any> // 获取峰谷点列表接口
  methodParameter: Record<string, any> // 方法参数接口
  saveTask: Record<string, any> //保存接口
  exportTaskWord: Record<string, any> //导出到word接口
  downloadDocSpectrumScanning: Record<string, any> // 下载导出文档接口
  downloadDocTimeSweep: Record<string, any> // 下载导出文档接口
  downloadDocConciseSpectrumScanning: Record<string, any> // 下载导出文档接口
  downloadDocConciseTimeSweep: Record<string, any> // 下载导出文档接口
}

const props = defineProps({
  taskId: String,
  methodId: String,
  sourcePage: {
    type: String,
    required: true, // 强制要求父组件传值，避免遗漏
    validator: (value: string) => {
      // 限制只能传这两个值，确保接口匹配正确
      return ['光谱扫描', '时间扫描'].includes(value)
    },
    description: '页面来源标识，用于动态匹配导出接口（光谱扫描/时间扫描）',
  },
  api: {
    type: Object as PropType<{
      [K in keyof ApiParams]: any
    }>,
    required: true,
    validator(value: Record<string, any>) {
      return [
        'sampleListPortList',
        'changeTheListPort',
        'deleteSampleListPort',
        'deleteChangeListPort',
        'restoreDeletedListData',
        'uploadImage',
        'updateDataColor',
        'addGaugePoint',
        'addGaugePointRemarks',
        'addPeakValleyRemarks',
        'seekingPeaksAndValleysPort',
        'queryGaugePointPort',
        'queryPeakAndValleysPort',
        'methodParameter',
        'saveTask',
        'exportTask',
        'downloadDocSpectrumScanning',
        'downloadDocTimeSweep',
        'downloadDocConciseSpectrumScanning',
        'downloadDocConciseTimeSweep',
      ].every((key) => key in value)
    },
  },
  measureType: {
    type: String,
    default: '光谱扫描',
  },
  wsUrl: {
    type: Object,
    default: () => ({
      singleMeasure: 'ws/deviceOneMeasure',
      measure: 'ws/device',
      xiaoZero: 'ws/baseLine',
    }),
  },
  isSimpleMode: {
    type: Boolean,
    default: false,
  },
})
const querySaveStateFun = inject<() => void>('querySaveStateFun')
const notShowZero = ref(false)
const navList = computed(() => {
  return [
    {
      name: '样品',
      icon: sampleIcon,
      className: 'w-[38px]',
      color: '#C649A1',
      clickFun: () => showSampleSetting(),
    },
    {
      name: '校零',
      type: 'zero',
      icon: zeroIcon,
      className: 'w-[57px]',
      color: '#133379',
      clickFun: () => xiaoZeroFun(showContent.value('zero') as string),
      notShow: notShowZero.value,
    },
    {
      name: '测量',
      type: 'measure',
      icon: measureIcon,
      className: 'w-[39px]',
      color: '#137921',
      clickFun: () => measure(),
    },
    {
      name: '新建',
      icon: newIcon,
      className: 'w-[33px]',
      color: '#135679',
      clickFun: async () => {
        const taskId = await useCreateDraftButtonFun({
          measureType: props.measureType,
          taskId: props.taskId as string,
          methodId: props.methodId as string,
        })
        updateTaskId(taskId)
        if (taskId) {
          emit('addDraftSuccess')
        }
      },
    },
    {
      name: '保存',
      icon: saveIcon,
      className: 'w-[57px]',
      color: '#FF9138',
      clickFun: () => {
        useSaveDraftButton(props.taskId as string)
      },
    },
    {
      name: '另存为',
      icon: saveIcon,
      className: 'w-[57px]',
      color: '#FF9138',
      clickFun: () => saveAs(),
    },
    // {
    //   name: '复制',
    //   icon: copyIcon,
    //   className: 'w-[57px]',
    //   color: '#06B8C3',
    // },
    {
      name: '报告',
      icon: copyIcon,
      className: 'w-[57px]',
      color: '#06B8C3',
      clickFun: async () => {
        await changePictureBlob()
        reportPreviewVisible.value = true
        // useReportDocsDownlodadFun(
        //   {
        //     taskId: props.taskId as string,
        //     sampleIds: checkedKeys.value.map((item) => item && item.split('-')[0]),
        //   },
        //   `${props.measureType}报告.docx`,
        //   true,
        // )
      },
    },
  ]
})
const checkedKeys = ref<string[]>([])
const sampleIds = computed(() => {
  let sampleIdsArr: string[] = []
  if (activeKey.value === '重叠' || activeKey.value === '平铺' || activeKey.value === '3D') {
    sampleIdsArr = [
      ...new Set(
        checkedKeys.value
          .filter((item) => item && item.length > 4 && (findDataByKey(item) || [])?.length > 0)
          .map((item) => item && item.split('-')[0]),
      ),
    ]
    return sampleIdsArr
  } else {
    if ((findDataByKey(activeKey.value) || [])?.length > 0) {
      sampleIdsArr = [activeKey.value.split('-')[0]]
    }
    return sampleIdsArr
  }
})
const analysisIds = computed(() => {
  const analysisIds: string[] = []
  if (activeKey.value === '重叠' || activeKey.value === '平铺' || activeKey.value === '3D') {
    checkedKeys.value.forEach((item) => {
      const params = findNodeByKey(item)
      if (params?.analysisId && params.data && params.data.length > 0) {
        analysisIds.push(params.analysisId)
      }
    })
  } else {
    if ((findDataByKey(activeKey.value) || [])?.length > 0) {
      analysisIds.push(paramsData.value.dataId)
    }
  }
  return analysisIds
})
const pictureBlob = ref<Blob | string>('')

interface ChartLinesData {
  name: string
  color?: string
  data?: ChartDataItem[]
  originalData?: ChartDataItem[]
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
  originalData?: ChartDataItem[]
  measureType?: 0 | 1 // 1测量中, 0测量完成
  deleteType?: 0 | 1 // 0正常, 1删除
  type?: '0' | '1' //0样品列表 1变化列表
  measureId?: string
  analysisId?: string

  [key: string]: unknown
}

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

const isMultiPoolMode = ref(false) //是否是时间扫描中的循环多池交替采样
const isRepeatMode = ref(false) //是否是单池重复
const showContent = computed(() => (type: string) => {
  if (type === 'zero') {
    // if (zeroLoading.value) {
    //   return '停止'
    // } else
    if (props.measureType === '光谱扫描') {
      return '基线'
    } else {
      return '校零'
    }
  } else if (type === 'measure') {
    // if (doubleMeasure.value) {
    //   return '停止'
    // } else
    if (props.measureType === '光谱扫描') {
      return '扫描'
    } else {
      return '测量'
    }
  }
})
const panelCollase = ref(false)
const formState = reactive<{ [key: string]: any }>({})
const measureTaskParams = ref<Record<string, any>>({})
const treeData = ref<TreeNode[]>([
  {
    title: '样品列表',
    key: '0-0',
    children: [],
  },
  {
    title: '变化列表',
    key: '1-0',
    children: [],
  },
])
const chartDataUnion = ref<ChartDataItem[]>([])
const tabPaneArr = ref([
  { title: '重叠', value: '重叠' },
  { title: '平铺', value: '平铺' },
  { title: '3D', value: '3D' },
])
const digit = ref<number>(4)
const appStore = useAppStore()
const zeroLoading = ref(false)
const handleZeroMessage = (event: any) => {
  try {
    // 检查是否为有效的JSON格式
    if (
      (typeof event.data === 'string' && event.data.startsWith('{')) ||
      event.data.startsWith('[')
    ) {
      const numData = JSON.parse(event.data)
      if (props.measureType === '光谱扫描') {
        appStore.setNm(numData.data.nm + 'nm')
      } else {
        appStore.setNm(numData.nm)
      }
      appStore.setAbs('')
    } else {
      if (event.data.includes('成功')) {
        notification.success({
          message: '成功',
          description: event.data,
          duration: 3,
        })
        zeroLoading.value = false
      } else {
        notification.error({
          message: props.measureType === '光谱扫描' ? '基线失败！' : '校零失败！',
          description: event.data,
          duration: 3,
        })
      }
    }
  } catch (error) {
    console.error(error)
  }
}
const xiaoZeroFun = async (type: string) => {
  if (!(await useIsMethodApply())) return
  if (type === '停止') {
    webSocketService.send('close')
  } else {
    // TODO：若用户设置提醒的话，提醒 请插入基线样品
    Modal.confirm({
      content: props.measureType === '光谱扫描' ? '请插入基线样品！' : '请插入校零样品！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        zeroLoading.value = !zeroLoading.value
        webSocketService.setBaseUrl(props.wsUrl.xiaoZero)
        webSocketService.setCallbacks({
          onMessage: handleZeroMessage,
          onOpen: (event) => console.log('WebSocket 连接已建立', event),
          onClose: (event) => (zeroLoading.value = false),
          onError: (event) => console.error('WebSocket 错误', event),
        })
        webSocketService.connect({
          deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010',
          taskId: props.taskId,
          methodId: props.methodId,
        })
      },
    })
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
        title: props.measureType === '光谱扫描' ? '波长nm' : '时间s',
        dataIndex: 'x',
        width: 80,
      },
    ]
    chartDataUnionColor.value = findColorByKey(activeKey.value) as string
    chartLines.value.forEach((item, index) => {
      tableOptionsIn.value.columns.push({
        title: item.name,
        dataIndex: NewCheckedKeys[index],
        width: 80,
      })
      item.originalData?.forEach((itemData, itemIndex) => {
        tableOptionsIn.value.data[itemIndex] = { ...tableOptionsIn.value.data[itemIndex] }
        tableOptionsIn.value.data[itemIndex][NewCheckedKeys[index] as string] = itemData.y
        tableOptionsIn.value.data[itemIndex].x = itemData.x
      })
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
  () => props.methodId,
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
const tipVisual = ref(false)
const reportPreviewVisible = ref(false)
const saveStatus: any = inject('saveStatus')
const updateTaskId = inject<(taskId: string) => void>('updateTaskId')!
const isNeedSave = () => {
  if (props.measureType === '光谱扫描') {
    if (!saveStatus.value) {
      tipVisual.value = true
    } else {
      createDraftButtonFun()
    }
  } else if (props.measureType === '时间扫描') {
    if (!saveStatus.value) {
      tipVisual.value = true
    } else {
      createDraftButtonFun()
    }
  }
}
const saveModalConfirm = async (type: string) => {
  const { code, data } = await whetherSaveData({
    taskId: props.taskId,
    isSave: type === '1',
  })
  if (code === 200) {
    await createDraftButtonFun()
  }
}
const createDraftButtonFun = async () => {
  const apiFun = props.measureType === '光谱扫描' ? createDraftButton : createDraftButtonTime
  const { code, data } = await apiFun({
    methodId: props.methodId,
  })
  if (code === 200) {
    updateTaskId(data)
  }
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
  const { code, data } = await props.api.methodParameter({ methodId: methodId })
  if (code === 200) {
    if (props.measureType === '光谱扫描') {
      xShowRange.value.min = Number(data.endWaveLength)
      xShowRange.value.max = Number(data.startWaveLength)
    } else {
      xShowRange.value.min = 'dataMin'
      xShowRange.value.max = 'dataMax'
      xShowRangeTimeMeasure.value.max =
        data.scanUnit === '1' ? Number(data.scanTime) : Number(data.scanTime) * 60
      if (data.multiPoolMode && data.multiPoolMode === '1') {
        isMultiPoolMode.value = true
      } else {
        isMultiPoolMode.value = false
      }
    }
    if (data.luminosity === '1' || data.luminosity === '2') {
      notShowZero.value = false
    } else {
      notShowZero.value = true
    }
    if (data.repetitionPattern === '单池重复') {
      isRepeatMode.value = true
    } else {
      isRepeatMode.value = false
    }
  }
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
const findDataById = (
  idName: string,
  id: string,
  tree: TreeNode[] = treeData.value,
): ChartDataItem[] | null => {
  // 如果树为空，直接返回 null
  if (!tree || tree.length === 0) {
    return null
  }
  for (const node of tree) {
    if (node[idName] === id) {
      return node.data || []
    }
    if (node.children && node.children.length > 0) {
      const result = findDataById(idName, id, node.children)
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
          data: node.originalData,
          originalData: node.data,
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
          node.originalData?.map((item, index) => {
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
      title: props.measureType === '光谱扫描' ? '波长nm' : '时间s',
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
      title: props.measureType === '光谱扫描' ? '波长nm' : '时间s',
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

const tableOptionsIn = ref<tableOptions>({
  columns: [
    {
      title: props.measureType === '光谱扫描' ? '波长nm' : '时间s',
      dataIndex: 'x',
      width: 100,
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
const activeKey = ref('重叠')
const chartDataUnionColor = ref('')
const chartMarkArr = ref<(string | number)[]>([])
const paramsData = ref({
  dataId: '',
  type: '',
})
const changePictureBlob = async () => {
  let id = ''
  if (activeKey.value === '重叠') {
    id = 'lineChartDieRef'
  } else if (activeKey.value === '平铺') {
    id = 'lineChartPingRef'
  } else if (activeKey.value === '3D') {
    id = 'lineChart3DRef'
  } else {
    id = 'lineChartOther'
  }
  const lineChartDiv = document.getElementById(id) as HTMLElement
  if (lineChartDiv) {
    lineChartDiv.style.backgroundColor = '#ffffff'
    pictureBlob.value = (await captureScreenshot(lineChartDiv as HTMLElement, 'base64')) as
      | string
      | Blob
  }
}
watch(
  () => activeKey.value,
  (newValue) => {
    if (newValue !== '重叠' && newValue !== '平铺' && newValue !== '3D') {
      const params = findNodeByKey(newValue)
      // chartDataUnion.value = findDataByKey(newValue) as ChartDataItem[]
      // chartDataUnionColor.value = findColorByKey(newValue) as string
      chartDataUnion.value = params?.originalData as ChartDataItem[]
      chartDataUnionColor.value = params?.color as string
      console.log(params, 'params')
      paramsData.value = {
        dataId: params?.analysisId as string,
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
    }
  },
  {
    deep: true,
  },
)
const lineChartDieRef = ref<HTMLElement | null>()
const emit = defineEmits([
  'addSampleSuccess',
  'update:chekedSampleKeys',
  'addDraftSuccess',
  'changePoolNum',
]) // 1.测量结束调用
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

/*********************************** 另存为 ************************************/
const saveAsModelRef = ref()
const saveAs = () => {
  saveAsModelRef.value.showModal(props.taskId)
}
const saveAsTask = async (ruleForm: any) => {
  const { code } = await conciseCopy({
    taskId: props.taskId,
    taskName: ruleForm.taskName,
  })
  if (code === 200) {
    saveAsModelRef.value.closeModal()
    message.success('另存为成功')
    emit('addDraftSuccess')
  }
}

// ========================================测量============================
// 测量的样品key
const measureKey = ref('')
// 测量返回的chart数据
const measureChartData = ref<ChartDataItem[]>([])
// 测量是否结束
const finished = ref('0') //1测量中
watch(
  () => finished.value,
  (newValue) => {
    appStore.setMeasureMode(newValue)
  },
)
watch(
  () => zeroLoading.value,
  (newValue) => {
    appStore.setZeroLoading(newValue)
  },
)
const currentIndex = ref(0) //测量的样品index
const handleClose = async () => {
  finished.value = '0'
  webSocketService.close()
  await changeTheListPortFun()
  await sampleListPortListFun()
  if (paramsData.value.dataId) {
    await queryPeakAndValleysPortFun()
  }
  emit('addSampleSuccess')
  if (doubleMeasure.value) {
    doubleMeasure.value = false
  }
}
const handleMessage = (event: MessageEvent) => {
  // if (!event.data) {
  //   message.error(event as any)
  //   webSocketService.close()
  //   return
  // }
  try {
    if (
      (typeof event.data === 'string' && event.data.startsWith('{')) ||
      event.data.startsWith('[')
    ) {
      const data = JSON.parse(event.data)
      const changeChartObj = chartLines.value.find((item) => item.key === measureKey.value)
      if (doubleMeasure.value && !isMultiPoolMode.value) {
        // 设置当前活动标签页和测量键值
        const keyData =
          props.measureType === '光谱扫描' ? `${data.sampleId}-${data.count}` : data.sampleId
        if (keyData !== measureKey.value && data.sampleId) {
          measureKey.value = keyData
          activeKey.value = keyData
          measureChartData.value = []
        }
      } else {
      }
      if (data.currentPoolNum) {
        emit('changePoolNum', data.currentPoolNum)
      }
      if (data.data) {
        // 实时数据追加到图表
        changeChartObj?.data?.push(...data.data)
        measureChartData.value.push(...data.data)

        // 实时更新 appStore（无历史数据时，这里会成为主要数据来源）
        const appStore = useAppStore()
        // data.data.forEach((item: any) => {
        //   appStore.setNm(`${item.x}${item.xType}`)
        //   appStore.setAbs(`${item.y}${item.yType}`)
        // })
        for (let i = 0; i < data.data.length; i++) {
          const item = data.data[0]
          appStore.setNm(`${item.x}${item.xType}`)
          appStore.setAbs(`${item.y}${item.yType}`)
        }
      }
    } else {
      if (event.data.includes('成功')) {
        // 处理纯文本消息
        notification.success({
          message: '成功',
          description: event.data,
          duration: 5,
        })
      } else {
        // 处理纯文本消息
        notification.error({
          message: '错误',
          description: event.data,
          duration: 5,
        })
      }
    }
  } catch (error) {
    console.error(error)
  }

  // if (data.result === 'finish') {
  //   setTimeout(() => {
  //     handleClose()
  //   },5000)
  // }
}
// 监听选中样品变化，同步更新历史数据最后一条
watch(
  checkedKeys,
  () => {
    updateAppStoreWithLastHistoryData()
  },
  { deep: true },
)
const sampleList = ref<Record<string, any>>([])
const doubleMeasure = ref(false)
const measure = async () => {
  if (!(await useIsMethodApply())) return
  if (finished.value === '1') {
    webSocketService.send('close')
  } else {
    Modal.confirm({
      content: props.measureType === '光谱扫描' ? '请插入样品！' : '请插入样品！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        doubleMeasure.value = !doubleMeasure.value
        if (doubleMeasure.value) {
          measureSingle()
          appStore.setNm(appStore.nmss)
        } else {
          webSocketService.close()
        }
      },
    })
  }
}
const showMeasureModal = () => {
  return new Promise((resolve) => {
    Modal.confirm({
      content: '测量过程进行中,是否要停止测量？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        resolve(true)
      },
      onCancel() {
        resolve(false)
      },
    })
  })
}
const measureSingle = async (data?: any) => {
  if (data) {
    if (!(await useIsMethodApply())) return
  }

  // 如果正在测量中，不允许再次测量
  if (finished.value === '1') {
    if (await showMeasureModal()) {
      webSocketService.send('close')
      finished.value = '0'
    }
    return
  }

  if (data) {
    // 清空测量数据
    measureChartData.value = []
    // 清空图表联合数据
    chartDataUnion.value = []
    // 设置当前活动标签页和测量键值
    activeKey.value = data.key
    measureKey.value = data.key
    // 如果当前样品未被选中，则添加到选中项中
    if (!checkedKeys.value.includes(data.key)) checkedKeys.value.push(data.key)
    setTimeout(() => {
      // 清空当前样品的图表数据
      chartLines.value.forEach((item) => {
        if (item.key === data.key) item.data = []
      })
      // 开始实际测量
      measureReal(data)
    }, 500)
  } else {
    const res = await useIsHasNotMeasureSampleFun(props.taskId as string)
    if (res) {
      await sampleListPortListFun()
    }
    console.log(res, 'res')
    // 找到第一个没有分析id的数据
    // treeData.value[0].children
    const noDataObject = treeData.value[0].children.find((item) => !item.analysisId)
    // if (!noDataObject) {
    //   message.error('所有样品都已测量，请重新添加样品！')
    //   doubleMeasure.value = false
    //   return
    // }
    if (noDataObject) {
      // 清空测量数据
      measureChartData.value = []
      // 清空图表联合数据
      chartDataUnion.value = []
      activeKey.value = noDataObject.key
      measureKey.value = noDataObject.key
      // 如果当前样品未被选中，则添加到选中项中
      if (!checkedKeys.value.includes(noDataObject.key)) checkedKeys.value.push(noDataObject.key)
      await measureReal()
    }
  }
}
const userStore = useUserStore()
const measureReal = async (data?: any) => {
  chartData.value = []
  let wsMeasureUrl = ''
  wsMeasureUrl = data ? props.wsUrl.singleMeasure : props.wsUrl.measure
  webSocketService.setBaseUrl(wsMeasureUrl)
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: handleClose,
    onError: (event) => console.error('WebSocket 错误', event),
  })
  const params: Record<string, any> = {
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010',
    taskId: props.taskId,
    updateBy: userStore.userName,
    digit: digit.value,
  }
  if (data) {
    params.sampleId = data.sampleId
    params.analysisNumber = data.analysisNumber
  }
  webSocketService.connect(params)
  finished.value = '1'
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

interface xAxisType {
  min: number | string
  max: number | string
}

const xShowRange = ref<xAxisType>({
  min: 0,
  max: 800,
})
const xShowRangeTimeMeasure = ref<xAxisType>({
  min: 0,
  max: 800,
}) //测量中的时间扫描的显示范围

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
  const { code, data } = await props.api.changeTheListPort(params)
  if (code == 200) {
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key = `bianhua-${index}`
      item.data = item.data || []
    })
    treeData.value[1].children = data
    checkedKeys.value = checkedKeys.value.filter((item) => item !== '0-0')
  }
}
// ============================ 样品 =====================================
//撤销删除
const restoreDeletedListDataFun = async (record: any) => {
  const { code, data } = await props.api.restoreDeletedListData({
    taskId: props.taskId || '',
    type: record.type,
    analysisId: record.analysisId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    checkIsDelete()
  }
}
// 删除
const deleteOneSampleFun = async (record: any) => {
  // if (record.type === '0') {
  //   // 样品
  //   const { code, data } = await props.api.deleteSampleListPort({
  //     taskId: props.taskId || '',
  //     analysisId: record.analysisId
  //   })
  //   if (code === 200) {
  //     message.success('删除成功！')
  //     checkIsDelete()
  //   }
  // } else if (record.type === '1') {
  const params: Record<string, any> = {
    taskId: props.taskId || '',
    sampleId: record.sampleId,
    analysisId: record.analysisId,
  }
  if (record.type === '0') {
    const { code, data } = await props.api.deleteSampleListPort(params)
    if (code === 200) {
      message.success('删除成功！')
      checkIsDelete()
    }
  } else {
    const { code, data } = await props.api.deleteChangeListPort({
      analysisId: record.analysisId,
    })
    if (code === 200) {
      message.success('删除成功！')
      checkIsDelete()
    }
  }

  // }
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
  const { code, data } = await props.api.sampleListPortList(params)
  // console.log(33333333333333333333333,data);

  if (code == 200) {
    data.forEach((item: any, index: number) => {
      item.measureType = 0
      item.key =
        props.measureType === '光谱扫描' ? `${item.sampleId}-${item.analysisNumber}` : item.sampleId
      item.data = item.data || []
      item.originalData = item.originalData || []
    })
    sampleList.value = data
    treeData.value[0].children = data
    checkedKeys.value = sampleList.value
      .map((item: any) => item.key)
      .filter((item: any) => item !== '1-0')
    // 测量没有数据的样品，测量完成后获取测量id
    const params = findNodeByKey(activeKey.value)
    chartDataUnion.value = params?.originalData as ChartDataItem[]
    measureChartData.value = params?.originalData as ChartDataItem[]
    paramsData.value = {
      dataId: params?.analysisId as string,
      type: params?.type as string,
    }
    // 生成报告需要勾选的样品Id
    emit('update:chekedSampleKeys', data[0]?.sampleId)
    // 新增：处理历史数据的最后一条，更新到 appStore
    updateAppStoreWithLastHistoryData()
  }
}
// 新增：提取当前选中样品的历史数据最后一条，更新 appStore
const updateAppStoreWithLastHistoryData = () => {
  // 1. 获取当前选中的第一个样品（若有选中）
  const firstCheckedKey = checkedKeys.value[0]
  if (!firstCheckedKey) return
  // console.log(333333333,props.measureType);

  // 2. 从树形数据中找到该样品的历史数据
  const targetNode = findNodeByKey(firstCheckedKey)
  const historyData = targetNode?.data || []

  // 3. 若有历史数据，取最后一条更新 appStore
  // if (historyData.length > 0) {
  //   const lastItem: any = historyData[historyData.length - 1]
  //   if (props.measureType === '光谱扫描') {
  //     appStore.setNm(lastItem.x) // 更新波长/时间
  //     appStore.setAbs(lastItem.y) // 更新 Abs 值
  //   } else {
  //   }
  // }
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
    const { code } = await props.api.uploadImage({
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
// ================================= 标记点 =====================================
// 添加标记点
const addGaugePointFun = async () => {
  const { code, data } = await props.api.addGaugePoint({
    gaugePoints: chartMarkArr.value,
    ...paramsData.value,
  })
  if (code === 200) {
    message.success('标记添加成功')
    if (paramsData.value.type === '0') {
      await sampleListPortListFun()
    } else {
      await changeTheListPortFun()
    }
    console.log(chartDataUnion.value, 'chartDataUnion.value')
    queryGaugePointPortFun()
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
  const { code, data } = await props.api.queryGaugePointPort(params)
  if (code === 200) {
    tableOptionsBiao.value.data = data || []
  }
}
// 添加标记点备注
const addGaugePointRemarksFun = async (record: any) => {
  const params = {
    dataId: paramsData.value.dataId,
    dataType: paramsData.value.type,
    ...record,
  }
  const { code, data } = await props.api.addGaugePointRemarks(params)
  if (code === 200) {
  }
}
// ======================= 峰谷 ==========================
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
  const { code, data } = await props.api.seekingPeaksAndValleysPort(params)
  if (code == 200) {
    if (paramsData.value.type === '0') {
      await sampleListPortListFun()
    } else {
      await changeTheListPortFun()
    }
    queryPeakAndValleysPortFun()
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
  const { code, data } = await props.api.queryPeakAndValleysPort(params)
  if (code === 200) {
    tableOptions.value.data = data || []
  }
}

// 添加峰谷备注
const addPeakValleyRemarksFun = async (record: any) => {
  const params = {
    dataId: paramsData.value.dataId,
    dataType: paramsData.value.type,
    ...record,
  }
  const { code, data } = await props.api.addPeakValleyRemarks(params)
  if (code === 200) {
  }
}
// 更改颜色接口
const updateDataColorFun = async (record: any) => {
  const params = {
    dataId: record.analysisId,
    type: record.type,
    color: record.color,
  }
  const { code, data } = await props.api.updateDataColor(params)
  if (code === 200) {
  }
}
// ==================== 报表内容 ====================
const reportFormsContentRef = ref()
const handleReportFormsDetail = () => {
  reportFormsContentRef.value.showDrawer()
}
const showSaveVisual = async () => {
  // saveVisual.value = true
  const { code, data } = await props.api.saveTask({
    taskId: props.taskId || '',
  })
  if (code === 200) {
    message.success('数据保存成功！')
  }
}

// 导出到word
const spectrumExportWordFun = async () => {
  const res = await props.api.exportTaskWord({
    taskId: props.taskId ? props.taskId : '',
  })
  useDownloadFile(res, '光谱扫描内容.docx')
}

/*********************************** 导出 ************************************/
// 1. 新增：筛选已勾选节点的analysisId（支持样品列表和变化列表）
const getCheckedAnalysisIds = (): string => {
  const analysisIds: string[] = []

  // 遍历树形结构（递归处理子节点）
  const traverseTree = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      // 条件1：节点已勾选 + 条件2：节点有analysisId（排除无数据节点）
      if (checkedKeys.value.includes(node.key) && node.analysisId) {
        analysisIds.push(node.analysisId) // 收集valid的analysisId
      }
      // 递归处理子节点（如果有）
      if (node.children && node.children.length > 0) {
        traverseTree(node.children)
      }
    })
  }

  // 遍历“样品列表”（treeData[0].children）和“变化列表”（treeData[1].children）
  if (treeData.value[0]?.children) traverseTree(treeData.value[0].children)
  if (treeData.value[1]?.children) traverseTree(treeData.value[1].children)

  // 用逗号分隔返回（空数组返回空字符串，避免后端接收null/undefined）
  return analysisIds.join(',')
}

// 2. 下拉菜单点击触发导出
const handleExportMenuClickLj = (menuItem: { key: string }) => {
  const fileType = menuItem.key
  console.log('fileType', fileType)

  downloadDocLumneFun(fileType)
}

// 3. 导出核心函数（动态匹配接口 + 动态文件名）
const downloadDocLumneFun = async (fileType: string) => {
  // 1. 基础参数校验（原有逻辑保留）
  if (!props.taskId) {
    message.error('请先选择或创建任务，再进行导出！')
    return
  }
  if (!props.methodId) {
    message.error('方法ID未配置，无法导出！')
    return
  }

  // 2. 获取已勾选的analysisId（原有逻辑保留）
  const analysisIds = getCheckedAnalysisIds()
  if (!analysisIds) {
    const confirmResult = await Modal.confirm({
      title: '提示',
      content: '未勾选任何样品/变化数据',
      okText: '确定',
      cancelText: '取消',
    })
    if (!confirmResult) return
  }

  try {
    /******************************** 核心修改：动态选择接口 ********************************/
    // ① 根据 sourcePage 匹配对应的导出接口（光谱扫描→downloadDocSpectrumScanning；时间扫描→downloadDocTimeSweep）
    let exportApi
    console.log('props.sourcePage', props.sourcePage)

    if (props.sourcePage === '光谱扫描') {
      exportApi = props.api.downloadDocSpectrumScanning // 光谱扫描接口
    } else if (props.sourcePage === '时间扫描') {
      exportApi = props.api.downloadDocTimeSweep // 时间扫描接口
    } else {
      // 若传了其他值（被Props validator拦截，理论不会走到这）
      message.error('页面来源错误，无法匹配导出接口！')
      return
    }

    // ② 调用匹配的接口（参数格式通用，直接传递）
    const res = await exportApi({
      taskId: props.taskId,
      allDisplay: true,
      fileType: fileType,
      analysisIds: analysisIds, // 已勾选的analysisId（逗号分隔）
      digit: digit.value,
    })

    /******************************** 优化：动态生成文件名 ********************************/
    // 根据 sourcePage 生成对应文件名（如“光谱扫描数据_2024-05-20.docx”）
    const fileSuffixMap = {
      word: 'docx',
      xlsx: 'xlsx',
      txt: 'txt',
    }
    const fileSuffix = fileSuffixMap[fileType as keyof typeof fileSuffixMap] || 'txt'
    const fileName = `${props.sourcePage}数据_${new Date().toLocaleDateString().replace(/\//g, '-')}.${fileSuffix}`

    // 3. 处理下载文件（原有逻辑保留，用动态文件名）
    const mimeTypeMap = {
      word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      txt: 'text/plain',
    }
    const mimeType = mimeTypeMap[fileType as keyof typeof mimeTypeMap] || 'text/plain'

    // 执行下载
    useDownloadFile(res, fileName, mimeType)

    // 提示信息适配
    message.success(
      `导出${fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'}文件成功！`,
    )
  } catch (error: any) {
    // 错误提示适配
    const errorMsg =
      error.response?.data?.message ||
      `导出${
        fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'
      }文件失败，请重试！`
    message.error(errorMsg)
    console.error('导出接口调用失败：', error)
  }
}

// 3. 导出核心函数（动态匹配接口 + 动态文件名）
const handleExportMenuClickLj1 = (menuItem: { key: string }) => {
  const fileType = menuItem.key
  console.log('fileType', fileType)

  downloadDocLumneFun1(fileType)
}

// 3. 导出核心函数（动态匹配接口 + 动态文件名）
const downloadDocLumneFun1 = async (fileType: string) => {
  // 1. 基础参数校验（原有逻辑保留）
  if (!props.taskId) {
    message.error('请先选择或创建任务，再进行导出！')
    return
  }
  if (!props.methodId) {
    message.error('方法ID未配置，无法导出！')
    return
  }
  console.log('digit.value,', digit.value)

  // 2. 获取已勾选的analysisId（修改提示逻辑）
  const analysisIds = getCheckedAnalysisIds()
  if (!analysisIds) {
    // 直接提示不可下载，需要先勾选样品
    message.error('请先勾选需要导出的有数据的样品！')
    return
  }

  try {
    /******************************** 核心修改：动态选择接口 ********************************/
    // ① 根据 sourcePage 匹配对应的导出接口（光谱扫描→downloadDocSpectrumScanning；时间扫描→downloadDocTimeSweep）
    let exportApi
    console.log('props.sourcePage', props.sourcePage)

    if (props.measureType === '光谱扫描') {
      exportApi = props.api.downloadDocConciseSpectrumScanning // 光谱扫描接口
    } else if (props.measureType === '时间扫描') {
      exportApi = props.api.downloadDocConciseTimeSweep // 时间扫描接口
    } else {
      // 若传了其他值（被Props validator拦截，理论不会走到这）
      message.error('页面来源错误，无法匹配导出接口！')
      return
    }

    // ② 调用匹配的接口（参数格式通用，直接传递）
    const res = await exportApi({
      taskId: props.taskId,
      allDisplay: true,
      fileType: fileType,
      analysisIds: analysisIds, // 已勾选的analysisId（逗号分隔）
      digit: digit.value,
    })

    /******************************** 优化：动态生成文件名 ********************************/
    // 根据 sourcePage 生成对应文件名（如“光谱扫描数据_2024-05-20.docx”）
    const fileSuffixMap = {
      word: 'docx',
      xlsx: 'xlsx',
      txt: 'txt',
    }
    const fileSuffix = fileSuffixMap[fileType as keyof typeof fileSuffixMap] || 'txt'
    const fileName = `${props.sourcePage}数据_${new Date().toLocaleDateString().replace(/\//g, '-')}.${fileSuffix}`

    // 3. 处理下载文件（原有逻辑保留，用动态文件名）
    const mimeTypeMap = {
      word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      txt: 'text/plain',
    }
    const mimeType = mimeTypeMap[fileType as keyof typeof mimeTypeMap] || 'text/plain'

    // 执行下载
    useDownloadFile(res, fileName, mimeType)

    // 提示信息适配
    message.success(
      `导出${fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'}文件成功！`,
    )
  } catch (error: any) {
    // 错误提示适配
    const errorMsg =
      error.response?.data?.message ||
      `导出${
        fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'
      }文件失败，请重试！`
    message.error(errorMsg)
    console.error('导出接口调用失败：', error)
  }
}
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const target = event.target as HTMLElement | null
    if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
      return
    }
    measure()
  }
}
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  webSocketService.close()
  document.removeEventListener('keydown', handleKeydown)
})

defineExpose({ checkIsDelete, methodParameterFun, sampleListPortListFun })
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

.nav-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .nav-item {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 28px;
    cursor: pointer;
    background-color: @button-bg-color;

    &:hover {
      transform: scale(1.05);
    }

    .icon-box {
      width: 30px;
      height: 30px;
      background-size: auto 60%;
      background-position: center center;
      background-repeat: no-repeat;
      margin-right: 5px;
    }
  }
}
</style>
