<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="three-column-layout relative">
    <leftCollapsePanel
      direction="left"
      :container-width="350"
      :class="{
        '!mr-[10px]': !leftCollapse,
      }"
      class="resizeLayout"
      v-model:is-panel-collapsed="leftCollapse"
    >
      <div class="left-column rounded-[20px]">
        <!-- 方法参数 -->
        <leftCollapsePanel direction="bottom" class="bg-[#F4FAFF] rounded-[20px]">
          <div class="title-box flex justify-between items-center text-[18px]">
            <span class="!font-bold" @click="isMethodFullScreen = !isMethodFullScreen"
              >自定义方法参数</span
            >
            <div class="flex items-center gap-[8px]">
              <div class="button" @click="handleDefaultParams">恢复默认</div>
              <SearchOutlined @click="findMethodFun" />
              <div class="button" @click="applyMethodSimple('methodParams')">
                <div class="icon-box">
                  <img src="@/assets/images/experiment/saveblue.png" />
                </div>
                应用
              </div>
            </div>
          </div>
          <div class="overflow-y-auto h-[calc(100%-45.8px)]">
            <methodsParamsLight
              v-model:methodsParams="spectralMethodsParams"
              ref="spectralParamsRef"
              :page-type="`simpleMode`"
              v-if="measureType === '光谱扫描'"
            />
            <lumneScenceParams
              v-else-if="measureType === '光度测量'"
              ref="lumneMethodsParamsRef"
              v-model:methodsParams="lumneMethodsParams"
              :page-type="`simpleMode`"
              :originLumneMethodsParams="originLumneMethodsParams"
            />
            <quantityParams
              v-else-if="measureType === '定量测定'"
              v-model:methodsParams="quantityMethodsParams"
              ref="quantityMethodsParamsRef"
              :page-type="`simpleMode`"
              :originQuantityMethodsParams="originQuantityMethodsParams"
            />
            <timeMethodsParams
              v-model:methodsParams="timeMethodsParam"
              ref="timeMethodsParamsRef"
              pageType="methodOptimization"
              v-else-if="measureType === '时间扫描'"
            />
          </div>
        </leftCollapsePanel>
        <!-- 附件设置 -->
        <leftCollapsePanel direction="top" class="bg-[#F4FAFF] rounded-[20px]">
          <attachSetting
            ref="attachSettingRef"
            :taskId="formState.taskId"
            :currentPoolNum="currentPoolNum"
            :measureType="measureType"
            @update:attachSetting="updateAttachSetting"
          />
        </leftCollapsePanel>
      </div>
    </leftCollapsePanel>
    <div v-if="leftCollapse" class="h-full absolute left-0 z-99 top-[41.6%]">
      <span class="vertical-text"
        >方法参数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;附件设置</span
      >
    </div>
    <div class="overflow-y-auto flex flex-col gap-5">
      <measureResult
        v-if="props.measureType === '光谱扫描'"
        ref="resultDataRef"
        :measureType="measureType"
        :task-id="formState.taskId"
        :method-id="formState.methodId"
        :api="spectralApi"
        :wsUrl="wsUrl"
        :is-simple-mode="true"
        :source-page="`光谱扫描`"
        @addSampleSuccess="dataYuanAddFun"
        @addDraftSuccess="addDraftSuccess"
        @changePoolNum="changePoolNum"
      />
      <measureResult
        v-if="props.measureType === '时间扫描'"
        ref="resultDataRef"
        :measureType="measureType"
        :task-id="formState.taskId"
        :method-id="formState.methodId"
        :api="timeApi"
        :wsUrl="wsUrl"
        :is-simple-mode="true"
        :source-page="`时间扫描`"
        @addSampleSuccess="dataYuanAddFun"
        @addDraftSuccess="addDraftSuccess"
        @changePoolNum="changePoolNum"
      />
      <dataTransForm
        v-if="props.measureType === '光谱扫描'"
        :methodsId="formState.methodId"
        :measureType="measureType"
        ref="dataTransformRef"
        :task-id="formState.taskId"
        @change-list="changeListFun"
        :api="dataTransformApi"
        :is-simple-mode="true"
      />
      <dataTransForm
        v-if="props.measureType === '时间扫描'"
        :methodsId="formState.methodId"
        :measureType="measureType"
        ref="dataTransformRef"
        :task-id="formState.taskId"
        @change-list="changeListFun"
        :api="dataTransformTimeApi"
        :is-simple-mode="true"
      />
      <lumneResultData
        ref="lumneResultDataRef"
        v-if="props.measureType === '光度测量'"
        :projectDetail="formState"
        :dealArr="dealArr"
        :isRepeat="isRepeat"
        :luminosityProps="luminosity"
        :apiParams="apiLumneParams"
        :wsUrl="wsLumneUrl"
        pageType="methodOptimization"
        @addDraftSuccess="addDraftSuccess"
        @changePoolNum="changePoolNum"
      />
      <quantityResultData
        ref="quantityResultDataRef"
        v-if="props.measureType === '定量测定'"
        :projectDetail="formState"
        :isRepeat="isRepeat"
        :apiParams="apiQuantityParams"
        :wsUrl="wsQuantityUrl"
        :methodsParams="originQuantityMethodsParams"
        pageType="methodOptimization"
        @addDraftSuccess="addDraftSuccess"
        @changePoolNum="changePoolNum"
      />
    </div>
    <div v-if="rightCollapse" @click="handleRightDrawer('1')" class="right-drawer-box">
      <div class="flex flex-col items-center" @click.stop="handleRightDrawer('1')">
        <div class="img">
          <img src="@/assets/images/experiment/history_data_icon.png" />
        </div>
        <div>历史文件</div>
      </div>
      <div class="!mt-[40px] flex flex-col items-center" @click.stop="handleRightDrawer('2')">
        <div class="img">
          <img src="@/assets/images/experiment/history_method_icon.png" />
        </div>
        <div>历史方法</div>
      </div>
      <div class="left-arrow-box">
        <div class="img">
          <img src="@/assets/images/experiment/left_arrow.png" />
        </div>
      </div>
      <!-- <span class="vertical-text">历史方法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历史文件</span> -->
    </div>
    <!-- <leftCollapsePanel
      :class="{
        '!ml-[10px]': !rightCollapse,
      }"
      direction="right"
      container-width="520"
      v-model:is-panel-collapsed="rightCollapse"
    >
      <div class="right-column">
        <leftCollapsePanel direction="bottom" class="bg-[#F4FAFF] rounded-[20px]">
          <methodsTable
            ref="methodsTableRef"
            :measureType="measureType"
            @update:apply="
              (id, measurementParamInfo) =>
                applyMethodSimple('historyMethod', id, measurementParamInfo)
            "
          />
        </leftCollapsePanel>
        <leftCollapsePanel direction="top" class="bg-[#F4FAFF] rounded-[20px]">
          <dataTable ref="dataTableRef" :measureType="measureType" />
        </leftCollapsePanel>
      </div>
    </leftCollapsePanel> -->
    <find-methods
      v-model="findMethodsVisual"
      v-if="findMethodsVisual"
      :measureType="measureType"
      @methods-params-obj="paramsFromFindMethods"
      :task-id="formState.taskId"
      :methodId="formState.methodId"
      @update:apply="applyFindMethods"
    />
    <save-modal-tip v-model="tipVisual" @confirm="saveModalConfirm"></save-modal-tip>
    <!-- 光度 定量 检查参数 -->
    <check-method-params-modal
      ref="checkMethodParamsModalRef"
      @update:modelValue="handleApplicationMethod"
    />
    <!-- 历史方法 历史文件 -->
    <history-drawer
      ref="historyDrawerRef"
      @update:drawer="
        (id, measurementParamInfo) => applyMethodSimple('historyMethod', id, measurementParamInfo)
      "
    />
    "
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import {
  addGaugePointRemarksSimple,
  addGaugePointSimple,
  addOrDeleteSamplePortSimple,
  addOrDeleteTimeSamplePortSimple,
  addPeakValleyRemarksSimple,
  addTimeGaugePointRemarksSimple,
  addTimeGaugePointSimple,
  addTimePeakValleyRemarksSimple,
  advancedOperationsPortSimple,
  applyMethod,
  applyMethodTime,
  changeTheListPortSimple,
  conciseLumneAddOrDeleteSample,
  conciseLumneApplyMethod,
  conciseLumneCheckParam,
  conciseLumneDeleteOneSample,
  conciseLumneGetCurrentInfo,
  conciseLumneGetSampleList,
  conciseLumneGetTableHead,
  conciseLumneQueryDataInfo,
  conciseLumneQueryInputParam,
  conciseLumneQueryInputParamMapTableHead,
  conciseLumneQueryMethodParam,
  conciseLumneQueryNewMethodTaskInfo,
  conciseLumneQuerySampleHeads,
  conciseLumneRevokeDel,
  conciseLumneSaveDataInfo,
  conciseLumneSaveInputParamMapTableHead,
  conciseLumneSaveTask,
  conciseLumneZero,
  conciseQuantityAddOrDeleteSample,
  conciseQuantityApplyMethod,
  conciseQuantityCheckParam,
  conciseQuantityDeleteOneSample,
  // 定量测定
  conciseQuantityGetCurrentInfo,
  conciseQuantityGetCurveInfo,
  conciseQuantityGetSampleList,
  conciseQuantityGetStandTableHead,
  conciseQuantityGetUnknowTableHead,
  conciseQuantityQueryInputParam,
  conciseQuantityQueryInputParamMapTableHead,
  conciseQuantityQueryMethodParam,
  conciseQuantityQuerySampleData,
  conciseQuantityQuerySampleHeads,
  conciseQuantityRevokeDel,
  conciseQuantitySaveInputParamMapTableHead,
  conciseQuantityZero,
  createDraftButton,
  deleteChangeListPortSimple,
  deleteSampleListPortSimple,
  delTimeChangeTheListPortSimple,
  delTimeSampleListPortSimple,
  differentialPortSimple,
  downloadDocConciseLumneSimple,
  downloadDocConciseQuantitativeMeasurement,
  downloadDocConciseSpectrumScanning,
  downloadDocConciseTimeSweep,
  downloadDocSpectrumScanning,
  downloadDocTimeSweep,
  fourOperationsPortSimple,
  getTimeArithmeticSourceDataSimple,
  getTimeChangeTheListPortSimple,
  getTimeGaugePointDataListSimple,
  getTimePeakValleyDataListSimple,
  getTimeSampleHeadersSimple,
  getTimeSampleListPortSimple,
  getTimeSampleListSimple,
  luminanceModeConversionPortSimple,
  queryGaugePointPortSimple,
  queryMeasurementParametersSimple,
  queryMethodParameterSimple,
  queryNearestMethodData,
  queryNearestMethodDataTime,
  queryPeakAndValleysPortSimple,
  querySampleListSimple,
  querySpectrumSampleHeadsSimple,
  restoreDeletedListDataSimple,
  restoreTimeDeletedListDataSimple,
  sampleListPortListSimple,
  saveLumneTask,
  seekingPeaksAndValleysPortSimple,
  seekingTimePeaksAndValleysPortSimple,
  smoothnessPortSimple,
  spectrumExportWord,
  timeAdvancedOperationsPortSimple,
  timeDifferentialPortSimple,
  timeExportWordSimple,
  timeFourOperationsPortSimple,
  timeLuminanceModeConversionPortSimple,
  timeSaveDataSimple,
  timeSmoothnessPortSimple,
  timeUploadImageSimple,
  updateDataColorSimple,
  updateTimeDataColorSimple,
  uploadImageSimple,
  whetherSaveData,
  conciseQuantitySaveTask,
} from '@/api'
import lumneScenceParams from '@/views/experiment/lumneScence/components/lumneScenceParams.vue'
import quantityParams from '@/views/experiment/quantityDetermind/components/quantityMethodsParams.vue'
import methodsParamsLight from '@/views/experiment/spectralScan/components/methodsParamsLight.vue'
import timeMethodsParams from '@/views/experiment/timeScan/components/timeMethodsParams.vue'
import attachSetting from './attachSetting.vue'
import dataTable from './dataTable.vue'
import findMethods from './findMethods.vue'
import methodsTable from './methodsTable.vue'

import SaveModalTip from '@/views/methodOptimization/components/saveModalTip.vue'
import { Modal, notification } from 'ant-design-vue'
import { ref } from 'vue'
import checkMethodParamsModal from './checkMethodParamsModal.vue'
import historyDrawer from './historyDrawer.vue'
import interact from 'interactjs'
import router from '@/router'

const props = defineProps({
  measureType: {
    type: String,
    default: '光度测量',
  },
})
const rightCollapse = ref(true)
const leftCollapse = ref(true)
const formState = ref<Record<string, any>>({
  taskId: '',
  methodId: '',
})
watch(
  () => formState.value.taskId,
  (newVal) => {
    if (newVal) {
      useQuerySaveState(newVal)
    }
  },
)
provide('updateTaskId', (taskId: string) => {
  formState.value.taskId = taskId
})
const isMethodFullScreen = ref(false)
const tipVisual = ref(false)
const spectralMethodsParams = reactive<Record<string, any>>({})
const timeMethodsParam = reactive<Record<string, any>>({})
const dealArr = ref([]) //前处理数组内容
const appStore = useAppStore()
const spectralApi = {
  sampleListPortList: sampleListPortListSimple,
  changeTheListPort: changeTheListPortSimple,
  deleteSampleListPort: deleteSampleListPortSimple,
  deleteChangeListPort: deleteChangeListPortSimple,
  restoreDeletedListData: restoreDeletedListDataSimple,
  uploadImage: uploadImageSimple,
  updateDataColor: updateDataColorSimple,
  addGaugePoint: addGaugePointSimple,
  addGaugePointRemarks: addGaugePointRemarksSimple,
  addPeakValleyRemarks: addPeakValleyRemarksSimple,
  seekingPeaksAndValleysPort: seekingPeaksAndValleysPortSimple,
  queryGaugePointPort: queryGaugePointPortSimple,
  queryPeakAndValleysPort: queryPeakAndValleysPortSimple,
  methodParameter: queryMethodParameterSimple,
  saveTask: saveLumneTask, // 保存任务接口
  exportTaskWord: spectrumExportWord, // 导出任务Word接
  downloadDocSpectrumScanning: downloadDocSpectrumScanning, // 下载导出文档接口
  downloadDocTimeSweep: downloadDocTimeSweep, // 下载导出文档接口
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning, // 下载导出文档接口
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep, // 下载导出文档接口
}
const timeApi = {
  sampleListPortList: getTimeSampleListPortSimple,
  changeTheListPort: getTimeChangeTheListPortSimple,
  deleteSampleListPort: delTimeSampleListPortSimple,
  deleteChangeListPort: delTimeChangeTheListPortSimple,
  restoreDeletedListData: restoreTimeDeletedListDataSimple,
  uploadImage: timeUploadImageSimple,
  updateDataColor: updateTimeDataColorSimple,
  addGaugePoint: addTimeGaugePointSimple,
  addGaugePointRemarks: addTimeGaugePointRemarksSimple,
  addPeakValleyRemarks: addTimePeakValleyRemarksSimple,
  seekingPeaksAndValleysPort: seekingTimePeaksAndValleysPortSimple,
  queryGaugePointPort: getTimeGaugePointDataListSimple,
  queryPeakAndValleysPort: getTimePeakValleyDataListSimple,
  methodParameter: queryMethodParameterSimple,
  saveTask: timeSaveDataSimple, // 保存任务接口
  exportTaskWord: timeExportWordSimple, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning, // 下载导出文档接口
  downloadDocTimeSweep: downloadDocTimeSweep, // 下载导出文档接口
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning, // 下载导出文档接口
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep, // 下载导出文档接口
}
const sampleApi = {
  addOrDeleteSamplePort: addOrDeleteSamplePortSimple, // 添加或删除样品
  querySampleList: querySampleListSimple, // 查询样品列表
  querySampleHeads: querySpectrumSampleHeadsSimple, // 查询样品表头
}
const sampleTimeApi = {
  addOrDeleteSamplePort: addOrDeleteTimeSamplePortSimple, // 添加或删除样品
  querySampleList: getTimeSampleListSimple, // 查询样品列表
  querySampleHeads: getTimeSampleHeadersSimple, // 查询样品表头
}
const wsUrl = computed(() => {
  return {
    xiaoZero:
      props.measureType === '光谱扫描' ? 'ws/concise/baseLine' : 'ws/concise/zeroCalibration',
    measure: props.measureType === '光谱扫描' ? 'ws/concise/scan' : 'ws/concise/timeScan',
    singleMeasure:
      props.measureType === '光谱扫描' ? 'ws/concise/onceScan' : 'ws/concise/timeOneMeasure',
  }
})
const dataTransformApi = {
  advancedOperationsPort: advancedOperationsPortSimple, // 高级运算接口
  differentialPort: differentialPortSimple, // 谱图微分接口
  fourOperationsPort: fourOperationsPortSimple, // 四则运算接口
  luminanceModeConversionPort: luminanceModeConversionPortSimple, // 光度模式转换接口
  methodParameter: queryMethodParameterSimple, // 方法参数接口
  queryMeasurementParameters: queryMeasurementParametersSimple, // 查询源测量数据接口
  saveTask: saveLumneTask, // 保存任务接口
  smoothnessPort: smoothnessPortSimple, // 谱图平滑接口
  exportTaskWord: spectrumExportWord, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning,
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep,
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning,
  downloadDocTimeSweep: downloadDocTimeSweep,
}
const dataTransformTimeApi = {
  advancedOperationsPort: timeAdvancedOperationsPortSimple, // 高级运算接口
  differentialPort: timeDifferentialPortSimple, // 谱图微分接口
  fourOperationsPort: timeFourOperationsPortSimple, // 四则运算接口
  luminanceModeConversionPort: timeLuminanceModeConversionPortSimple, // 光度模式转换接口
  methodParameter: queryMethodParameterSimple, // 方法参数接口
  queryMeasurementParameters: getTimeArithmeticSourceDataSimple, // 查询源测量数据接口
  saveTask: timeSaveDataSimple, // 保存任务接口
  smoothnessPort: timeSmoothnessPortSimple, // 谱图平滑接口
  exportTaskWord: timeExportWordSimple, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning,
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep,
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning,
  downloadDocTimeSweep: downloadDocTimeSweep,
}

/******************************** 定量测定 *********************************/
// 结果数据
const apiQuantityParams = {
  getQuantityCurveInfo: conciseQuantityGetCurveInfo,
  deleteQuantityOneSample: conciseQuantityDeleteOneSample, // TODO
  queryQuantitySampleData: conciseQuantityQuerySampleData,
  getQuantityStandTableHead: conciseQuantityGetStandTableHead,
  getQuantityStandUnknowTableHead: conciseQuantityGetUnknowTableHead,
  quantitiyMeasurementZero: conciseQuantityZero,
  revokeDelQuantity: conciseQuantityRevokeDel,
  saveQuantityTask: conciseQuantitySaveTask,
  // 列配置
  queryInputParamMapTableHead: conciseQuantityQueryInputParamMapTableHead,
  saveInputParamMapTableHead: conciseQuantitySaveInputParamMapTableHead,
  queryInputParam: conciseQuantityQueryInputParam,
  downloadDocQuantityDetermind: downloadDocConciseQuantitativeMeasurement,
}
// 样品
const apiQuantitySample = {
  addQuantitySampleList: conciseQuantityAddOrDeleteSample,
  getQuantitySampleList: conciseQuantityGetSampleList,
  queryQuantitySampleHeads: conciseQuantityQuerySampleHeads,
}
// 测量
const wsQuantityUrl = 'ws/concise/ration'

/******************************** 光度测量 *********************************/
// 结果数据
const apiLumneParams = {
  getLumneCurrentInfo: conciseLumneGetCurrentInfo,
  deleteLumneOneSample: conciseLumneDeleteOneSample,
  downloadDocLumne: downloadDocConciseLumneSimple,
  getLumneTableHead: conciseLumneGetTableHead,
  queryLumneDataInfo: conciseLumneQueryDataInfo,
  queryNewMethodTaskInfo: conciseLumneQueryNewMethodTaskInfo,
  revokeLumneDel: conciseLumneRevokeDel,
  saveLumneDataInfoRemark: conciseLumneSaveDataInfo,
  saveLumneTask: conciseLumneSaveTask,
  zeroPhotometricMeasurement: conciseLumneZero,
  // 列配置
  queryInputParamMapTableHead: conciseLumneQueryInputParamMapTableHead,
  saveInputParamMapTableHead: conciseLumneSaveInputParamMapTableHead,
  queryInputParam: conciseLumneQueryInputParam,
}
// 样品
const apiLumneSample = {
  addOrDeleteSamplePort: conciseLumneAddOrDeleteSample, // 添加或删除样品
  querySampleList: conciseLumneGetSampleList, // 查询样品列表
  querySampleHeads: conciseLumneQuerySampleHeads, // 查询样品表头
}
// 测量
const wsLumneUrl = 'ws/concise/photometric'
const currentPoolNum = ref('') // 当前池号
const addDraftSuccess = async () => {
  if (props.measureType === '光度测量' || props.measureType === '定量测定') {
    await refreshData()
  }
  // methodsTableRef.value.fetchData()
  if (dataTableRef.value) dataTableRef.value.fetchData()
}
const changePoolNum = (value: string) => {
  currentPoolNum.value = value
}

// 创建响应式的 sampleApi
const sampleApiComputed = computed(() => {
  return props.measureType === '光度测量'
    ? apiLumneSample
    : props.measureType === '定量测定'
      ? apiQuantitySample
      : props.measureType === '光谱扫描'
        ? sampleApi
        : sampleTimeApi
})
provide('sampleApi', sampleApiComputed)

/********************************** 项目详情 **********************************/
const getProjectDetail = async () => {
  let apiFun: any
  if (props.measureType === '光度测量') apiFun = conciseLumneGetCurrentInfo
  else if (props.measureType === '定量测定') apiFun = conciseQuantityGetCurrentInfo
  if (apiFun) {
    const { code, data } = await apiFun({
      measureType: props.measureType,
    })
    if (code === 200) {
      formState.value = data
    }
  }
}

/********************************** 方法参数 **********************************/
const quantityMethodsParams = ref<Record<string, any>>({})
const lumneMethodsParams = ref<Record<string, any>>({})
const lumneMethodsParamsRef = ref()
const quantityMethodsParamsRef = ref()
const originLumneMethodsParams = ref<Record<string, any>>({})
const originQuantityMethodsParams = ref<Record<string, any>>({})
// 默认参数
const handleDefaultParams = async () => {
  const defaultParams = await getDefaultParams(props.measureType)
  if (props.measureType === '光度测量')
    lumneMethodsParams.value = JSON.parse(JSON.stringify(defaultParams))
  else if (props.measureType === '定量测定')
    quantityMethodsParams.value = JSON.parse(JSON.stringify(defaultParams))
  else if (props.measureType === '光谱扫描') Object.assign(spectralMethodsParams, defaultParams)
  else if (props.measureType === '时间扫描') Object.assign(timeMethodsParam, defaultParams)
}
// 获取方法参数详情
const getMethodsParamsTimeOrSpectral = async () => {
  let apiFun: any
  if (props.measureType === '光谱扫描' || props.measureType === '时间扫描') {
    apiFun = queryMethodParameterSimple
  }
  if (apiFun) {
    const { code, data } = await apiFun({
      methodId: formState.value.methodId,
    })

    if (code === 200) {
      if (props.measureType === '光谱扫描') Object.assign(spectralMethodsParams, data)
      else if (props.measureType === '时间扫描') Object.assign(timeMethodsParam, data)
    }
  }
}
// 获取方法参数详情
const getMethodsParams = async () => {
  let apiFun: any
  if (props.measureType === '光度测量') {
    apiFun = conciseLumneQueryMethodParam
  } else if (props.measureType === '定量测定') {
    apiFun = conciseQuantityQueryMethodParam
  }
  if (apiFun) {
    const { code, data } = await apiFun({
      methodId: formState.value.methodId,
    })
    if (code === 200) {
      if (props.measureType === '光度测量') {
        lumneMethodsParams.value = JSON.parse(JSON.stringify(data))
        originLumneMethodsParams.value = JSON.parse(JSON.stringify(data))
        luminosity.value = lumneMethodsParams.value.luminosity
        isRepeat.value = lumneMethodsParams.value.repetitionPattern !== '不重复'
        appStore.setLuminosity(data.luminosityName)
      } else if (props.measureType === '定量测定') {
        quantityMethodsParams.value = JSON.parse(JSON.stringify(data))
        originQuantityMethodsParams.value = JSON.parse(JSON.stringify(data))
        isRepeat.value = quantityMethodsParams.value.repeatMode !== '不重复'
        appStore.setLuminosity('Abs')
      }
    }
  }
}
// 处理请求参数
const handleQueryMethodParams = (type: 'methodParams' | 'historyMethod') => {
  const defaultRef =
    props.measureType === '光度测量' ? lumneMethodsParamsRef.value : quantityMethodsParamsRef.value
  let query: any
  if (type === 'historyMethod') {
    query = {
      currentMethodId: formState.value.methodId,
      currentTaskId: formState.value.taskId,
      measureType: props.measureType,
      methodName: formState.value.methodName,
    }
  } else {
    query = {
      newMethodParam: {
        ...defaultRef.formState,
        resultParams: defaultRef.resultParams.map((item: any) => item.params),
        sampleInputParams: defaultRef.sampleInputParams.map((item: any) => item.params),
        qcParams: defaultRef.qcParams.map((item: any) => item.params),
        approxParams: defaultRef.approxParams.map((item: any) => item.params),
      },
      currentMethodId: formState.value.methodId,
      currentTaskId: formState.value.taskId,
      measureType: props.measureType,
      methodName: formState.value.methodName,
    }
  }
  delete query.newMethodParam?.methodId
  delete query.newMethodParam?.methodName
  delete query.newMethodParam?.measurementType
  return query
}
const saveStatus: any = inject('saveStatus')
const historyMethodId = ref<any>('')
const methodsParamsValidate = async () => {
  if (props.measureType === '定量测定') {
    if (quantityMethodsParamsRef.value) return await quantityMethodsParamsRef.value?.onSubmit()
    else return true
  } else if (props.measureType === '光谱扫描') {
    if (spectralParamsRef.value) return await spectralParamsRef.value?.onSubmit()
    else return true
  } else if (props.measureType === '光度测量') {
    if (lumneMethodsParamsRef.value) return await lumneMethodsParamsRef.value?.onSubmit()
    else return true
  } else if (props.measureType === '时间扫描') {
    if (timeMethodsParamsRef.value) return await timeMethodsParamsRef.value?.onSubmit()
    else return true
  }
}
const isUseRepeat = computed(() => {
  return props.measureType === '光谱扫描'
    ? !spectralParamsRef.value.isDataChanged
    : !timeMethodsParamsRef.value.isDataChanged
})
const applyType = ref('')
const newMeasurementParamInfo = ref<Record<string, any>>({})
const applyMethodSimple = async (
  type: 'methodParams' | 'historyMethod',
  newMethodId?: string,
  newMeasurementParam?: any,
) => {
  if (
    (props.measureType === '光谱扫描' || props.measureType === '时间扫描') &&
    type === 'methodParams'
  ) {
    if (isUseRepeat.value) {
      notification.error({
        message: '请勿重复使用！',
      })
      return
    }
  }
  const paramsValid = await methodsParamsValidate()
  if (!paramsValid) return
  historyMethodId.value = newMethodId
  newMeasurementParamInfo.value = newMeasurementParam
  applyType.value = type
  if (props.measureType === '光度测量' || props.measureType === '定量测定') {
    await handleCheckMethod(type, newMethodId)
  } else if (props.measureType === '光谱扫描' || props.measureType === '时间扫描') {
    applyMethodsJudge()
    // const params: any = {
    //   methodId: formState.value.methodId,
    //   measureType: props.measureType,
    //   params: props.measureType === '光谱扫描' ? spectralMethodsParams : timeMethodsParam,
    //   type: '1',
    //   taskId: formState.value.taskId,
    // }
    // if (type === 'historyMethod') {
    //   params.methodId2 = historyMethodId.value
    // }
    // const { taskId, methodId } = await useApplyMethodsFun(params)
    // formState.value.taskId = taskId
    // formState.value.methodId = methodId
    // if (formState.value.taskId) {
    //   if (props.measureType === '光谱扫描') {
    //     spectralParamsRef.value.isDataChanged = false
    //     if (type !== 'historyMethod') {
    //       spectralParamsRef.value.originalFormState = JSON.parse(
    //         JSON.stringify(spectralMethodsParams),
    //       )
    //     } else {
    //       spectralParamsRef.value.originalFormState = JSON.parse(
    //         JSON.stringify(newMeasurementParamInfo),
    //       )
    //       Object.keys(spectralMethodsParams).forEach((key) => {
    //         delete spectralMethodsParams[key]
    //       })
    //       Object.assign(spectralMethodsParams, newMeasurementParamInfo)
    //     }
    //   } else if (props.measureType === '时间扫描') {
    //     timeMethodsParamsRef.value.isDataChanged = false
    //     if (type !== 'historyMethod') {
    //       timeMethodsParamsRef.value.originalFormState = JSON.parse(
    //         JSON.stringify(timeMethodsParam),
    //       )
    //     } else {
    //       timeMethodsParamsRef.value.originalFormState = JSON.parse(
    //         JSON.stringify(newMeasurementParamInfo),
    //       )
    //       Object.keys(timeMethodsParam).forEach((key) => {
    //         delete timeMethodsParam[key]
    //       })
    //       Object.assign(timeMethodsParam, newMeasurementParamInfo)
    //     }
    //   }
    //   if (methodsTableRef.value) methodsTableRef.value.fetchData()
    // }
  }
}
// 应用查找出的方法参数
const applyFindMethods = (params: any) => {
  console.log('applyFindMethods', params)

  findMethodsVisual.value = false
  if (props.measureType === '光度测量')
    lumneMethodsParams.value = JSON.parse(JSON.stringify(params))
  else if (props.measureType === '定量测定')
    quantityMethodsParams.value = JSON.parse(JSON.stringify(params))
  else if (props.measureType === '光谱扫描') {
    Object.keys(spectralMethodsParams).forEach((key) => {
      delete spectralMethodsParams[key]
    })
    Object.assign(spectralMethodsParams, JSON.parse(JSON.stringify(params)))
  } else if (props.measureType === '时间扫描') {
    Object.keys(timeMethodsParam).forEach((key) => {
      delete timeMethodsParam[key]
    })
    Object.assign(timeMethodsParam, JSON.parse(JSON.stringify(params)))
  }
  setTimeout(async () => {
    await applyMethodSimple('methodParams')
  }, 100)
}
const quickModeStore = useQuickModeStore()
const applyMethodsJudge = () => {
  if (props.measureType === '光谱扫描') {
    if (!quickModeStore.quickModeObj.saveStatus) {
      tipVisual.value = true
    } else {
      applyMethodsFun()
    }
  } else {
    if (!quickModeStore.quickModeObj.saveStatus) {
      tipVisual.value = true
    } else {
      applyMethodsFun()
    }
  }
}
const applyMethodsFun = async () => {
  let apiFun: any
  switch (props.measureType) {
    case '光谱扫描':
      apiFun = applyMethod
      break
    case '时间扫描':
      apiFun = applyMethodTime
      break
    default:
      break
  }
  const params: any = {
    methodId: formState.value.methodId,
    measureType: props.measureType,
    type: '1',
    parameter: props.measureType === '光谱扫描' ? spectralMethodsParams : timeMethodsParam,
  }
  if (applyType.value === 'historyMethod') {
    params.methodId2 = historyMethodId.value
  }
  const { code, data } = await apiFun(params)
  if (code === 200) {
    appStore.setLuminosity(
      {
        '1': 'Abs',
        '2': 'T%',
        '3': 'Es',
        '4': 'Er',
      }[params.luminosity as string] as string,
    )
    formState.value.taskId = data.taskId
    formState.value.methodId = data.method.id
    if (formState.value.taskId) {
      if (props.measureType === '光谱扫描') {
        spectralParamsRef.value.isDataChanged = false
        if (applyType.value !== 'historyMethod') {
          spectralParamsRef.value.originalFormState = JSON.parse(
            JSON.stringify(spectralMethodsParams),
          )
        } else {
          spectralParamsRef.value.originalFormState = JSON.parse(
            JSON.stringify(newMeasurementParamInfo.value),
          )
          Object.keys(spectralMethodsParams).forEach((key) => {
            delete spectralMethodsParams[key]
          })
          Object.assign(spectralMethodsParams, newMeasurementParamInfo.value)
        }
      } else if (props.measureType === '时间扫描') {
        timeMethodsParamsRef.value.isDataChanged = false
        if (applyType.value !== 'historyMethod') {
          timeMethodsParamsRef.value.originalFormState = JSON.parse(
            JSON.stringify(timeMethodsParam),
          )
        } else {
          timeMethodsParamsRef.value.originalFormState = JSON.parse(
            JSON.stringify(newMeasurementParamInfo.value),
          )
          Object.keys(timeMethodsParam).forEach((key) => {
            delete timeMethodsParam[key]
          })
          Object.assign(timeMethodsParam, newMeasurementParamInfo.value)
        }
      }
      if (methodsTableRef.value) methodsTableRef.value.fetchData()
    }
  }
}
const saveModalConfirm = async (type: string) => {
  const { code, data } = await whetherSaveData({
    taskId: formState.value.taskId,
    isSave: type === '1',
  })
  if (code === 200) {
    await applyMethodsFun()
  }
}
const createDraftButtonFun = async () => {
  const { code, data } = await createDraftButton({
    methodId: formState.value.methodId,
  })
  if (code === 200) {
    formState.value.taskId = data
  }
}
// 检查方法参数
const checkMethodParamsModalRef = ref()
const handleCheckMethod = async (type: 'methodParams' | 'historyMethod', newMethodId?: string) => {
  let apiFun: any
  if (props.measureType === '光度测量') apiFun = conciseLumneCheckParam
  else if (props.measureType === '定量测定') apiFun = conciseQuantityCheckParam
  if (apiFun) {
    const { code, data } = await apiFun({
      ...handleQueryMethodParams(type),
      newMethodId,
    })
    if (code === 200) {
      if (data.clearDataRange === 'newMethod' || data.clearDataRange === 'noData')
        handleApplicationMethod(type, {
          clearDataRange: data.clearDataRange,
          isSaveDraft: true,
          newMethodId,
        })
      else {
        if (quickModeObj.value.saveStatus && data.clearDataRange === 'measure')
          handleApplicationMethod(type, {
            clearDataRange: data.clearDataRange,
            isSaveDraft: true,
            newMethodId,
          })
        else {
          checkMethodParamsModalRef.value.showModel(data.clearDataRange, type, newMethodId)
        }
      }
    }
  }
}
// 应用方法参数
const handleApplicationMethod = async (
  type: 'methodParams' | 'historyMethod',
  otherParams: any,
) => {
  let apiFun: any
  if (props.measureType === '光度测量') apiFun = conciseLumneApplyMethod
  else if (props.measureType === '定量测定') apiFun = conciseQuantityApplyMethod
  if (apiFun) {
    const { code, data } = await apiFun({
      ...handleQueryMethodParams(type),
      ...otherParams,
    })
    if (code === 200) {
      notification.success({
        message: '成功',
        description: '应用成功!',
      })
      checkMethodParamsModalRef.value.closeModel()
      if (type === 'historyMethod' && route.query.projectDetail) {
        await router.replace({
          query: {
            projectDetail: JSON.stringify({
              taskId: data.taskId,
              taskName: data.taskName,
              methodId: data.methodId,
              methodName: data.methodName,
            }),
            measureType: props.measureType,
            sub: 'true',
          },
        })
      }
      await refreshData()
      if (methodsTableRef.value) methodsTableRef.value.fetchData()
      // dataTableRef.value.fetchData()
    }
  }
}
const findMethodsVisual = ref(false)
const resultDataRef = ref()
const changeListFun = () => {
  resultDataRef.value?.checkIsDelete()
}
const spectralParamsRef = ref()
const timeMethodsParamsRef = ref()
const queryNearestMethodDataFun = async () => {
  let apiFun: any
  if (props.measureType === '光谱扫描') {
    apiFun = queryNearestMethodData
  } else {
    apiFun = queryNearestMethodDataTime
  }
  if (apiFun) {
    const { code, data } = await apiFun({
      measureType: props.measureType,
    })
    if (code === 200) {
      if (props.measureType === '光谱扫描') {
        Object.assign(spectralMethodsParams, data.methodParam)
        formState.value.methodId = data.methodId
        formState.value.taskId = data.taskId
        if (spectralParamsRef.value) {
          spectralParamsRef.value.originalFormState = data.methodParam
        }
      } else {
        Object.assign(timeMethodsParam, data.methodParam)
        formState.value.methodId = data.methodId
        formState.value.taskId = data.taskId
        if (timeMethodsParamsRef.value) {
          timeMethodsParamsRef.value.originalFormState = data.methodParam
        }
        // if (data?.parameter?.waveLength) {
        //   console.log('data.parameter.waveLength', data.parameter.waveLength)
        //   appStore.setNm(data.parameter.waveLength) // 将波长值存入全局状态
        // } else {
        //   console.warn('未获取到有效的波长数据')
        //   appStore.setNm('') // 无数据时清空，避免存旧值
        // }
      }
      appStore.setLuminosity(data.methodParam.luminosityName)
    }
  }
}
// 1. 监听「时间扫描」的 waveLength 变化（回显值存在 timeMethodsParam 中）
// watch(
//   () => timeMethodsParam.waveLength, // 监听响应式对象的 waveLength 属性
//   (newWaveLength, oldWaveLength) => {
//     if (newWaveLength !== oldWaveLength && newWaveLength) {
//       // 排除初始值/空值/重复值
//       console.log('时间扫描 waveLength 回显变化：', newWaveLength)
//       appStore.setNmss(newWaveLength) // 自动更新到 store
//     }
//   },
//   { immediate: true }, // 可选：组件初始化时立即执行一次（同步初始回显值到 store）
// )

// 2. 监听「光谱扫描」的 waveLength 变化（回显值存在 spectralMethodsParams 中）
// watch(
//   () => spectralMethodsParams.waveLength,
//   (newWaveLength, oldWaveLength) => {
//     if (newWaveLength !== oldWaveLength && newWaveLength) {
//       console.log('光谱扫描 waveLength 回显变化：', newWaveLength)
//       appStore.setNmss(newWaveLength) // 自动更新到 store
//     }
//   },
//   { immediate: true }, // 可选：同步初始回显值
// )
const findMethodFun = () => {
  findMethodsVisual.value = true
}
const paramsFromFindMethods = async (params: any) => {
  if (props.measureType === '光谱扫描') {
    Object.assign(spectralMethodsParams, params.parameter)
    formState.value.taskId = params.taskId
    spectralParamsRef.value.originalFormState = params.parameter
  } else if (props.measureType === '时间扫描') {
    Object.assign(timeMethodsParam, params.parameter)
    formState.value.taskId = params.taskId
    spectralParamsRef.value.originalFormState = params.parameter
  }
}

/********************************** 附件设置 **********************************/
const lumneResultDataRef = ref()
const quantityResultDataRef = ref()
const updateAttachSetting = () => {
  if (props.measureType === '光度测量') {
    lumneResultDataRef.value.getTableHeadFun()
    lumneResultDataRef.value.queryDataInfoFun()
  } else if (props.measureType === '定量测定') {
    quantityResultDataRef.value.getTableHead()
    quantityResultDataRef.value.getUnTableHead()
    quantityResultDataRef.value.fetchData()
  } else if (props.measureType === '时间扫描' || props.measureType === '光谱扫描') {
    resultDataRef.value.sampleListPortListFun()
  }
}

/********************************** 历史方法 | 历史文件 **********************************/
const historyDrawerRef = ref()
const handleRightDrawer = (type: string) => {
  historyDrawerRef.value.showDrawer(props.measureType, type)
}
const methodsTableRef = ref()
const dataTableRef = ref()

const route = useRoute()
const refreshData = async () => {
  if (!route.query.projectDetail) {
    // 不是历史文件查看
    if (props.measureType === '光度测量' || props.measureType === '定量测定') {
      await getProjectDetail()
      await getMethodsParams()
    } else {
      await queryNearestMethodDataFun()
    }
  } else {
    // 历史文件的查看
    const query = JSON.parse(route.query.projectDetail as any)
    nextTick(async () => {
      formState.value = query
      if (props.measureType === '光度测量' || props.measureType === '定量测定') {
        await getMethodsParams()
      } else {
        await getMethodsParamsTimeOrSpectral()
      }
    })
  }
}
const isRepeat = ref(false) //方法是否是单池重复
const luminosity = ref('')
watch(
  () => props.measureType,
  async (newValue) => {
    if (newValue) {
      // lumneMethodsParams.value = JSON.parse(JSON.stringify(originLumneMethodsParams.value))
      // quantityMethodsParams.value = JSON.parse(JSON.stringify(originQuantityMethodsParams.value))
      await refreshData()
      if (lumneMethodsParamsRef.value) lumneMethodsParamsRef.value.initAPIParams()
      if (quantityMethodsParamsRef.value) quantityMethodsParamsRef.value.initAPIParams()
      if (methodsTableRef.value) methodsTableRef.value.fetchData()
      if (dataTableRef.value) dataTableRef.value.fetchData()
      provide('sampleApi', sampleApiComputed)
      // if (newValue === '时间扫描') {
      //   appStore.setUnit('s')
      // } else {
      //   appStore.setUnit('nm')
      // }
    }
  },
  { deep: true },
)
const dataTransformRef = ref()
const dataYuanAddFun = () => {
  dataTransformRef.value.queryMeasurementParametersFun()
}
const isMethodsParamsNotSave = computed(() => {
  return (
    (props.measureType === '光谱扫描' &&
      spectralParamsRef.value &&
      spectralParamsRef.value.isDataChanged) ||
    (props.measureType === '时间扫描' &&
      timeMethodsParamsRef.value &&
      timeMethodsParamsRef.value.isDataChanged) ||
    (props.measureType === '光度测量' &&
      lumneMethodsParamsRef.value &&
      lumneMethodsParamsRef.value.isDataChanged) ||
    (props.measureType === '定量测定' &&
      quantityMethodsParamsRef.value &&
      quantityMethodsParamsRef.value.isDataChanged)
  )
})

const quickModeObj = computed(() => useQuickModeStore().quickModeObj)

onBeforeRouteLeave(async (to, from) => {
  if (!isMethodsParamsNotSave.value) {
    return true
  }
  // 如果方法参数已修改，显示确认对话框
  return new Promise((resolve) => {
    Modal.confirm({
      title: h(
        'span',
        {
          class: 'text-[16px] !font-bold',
        },
        '确认离开',
      ),
      content: h(
        'span',
        {
          class: 'text-[14px]',
        },
        '您将离开该页面，您的自定义方法参数已修改，修改的方法参数不会被保存，确认离开吗？',
      ),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        // 用户确认离开
        resolve(true)
      },
      onCancel() {
        // 用户取消，阻止导航
        resolve(false)
      },
    })
  })
})

onMounted(async () => {
  // 仅光度测量和定量测定
  refreshData()
  // 初始化拖拽调整
  nextTick(() => {
    interact('.resizeLayout').resizable({
      edges: { right: true },
      listeners: {
        start: function (event) {
          // 拖拽开始时禁用文本选择
          const container = document.querySelector('.three-column-layout') as HTMLElement
          if (container) {
            container.style.userSelect = 'none'
          }
        },
        move: function (event) {
          let { x, y } = event.target.dataset

          x = (parseFloat(x) || 0) + event.deltaRect.left
          y = (parseFloat(y) || 0) + event.deltaRect.top

          Object.assign(event.target.style, {
            width: `${event.rect.width / 16}rem`,
          })

          Object.assign(event.target.dataset, { x, y })
        },
        end: function (event) {
          // 拖拽结束时恢复文本选择
          const container = document.querySelector('.three-column-layout') as HTMLElement
          if (container) {
            container.style.userSelect = ''
          }
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 350, height: Infinity }, // 最小宽度300px，最小高度100px
          max: { width: 600, height: Infinity }, // 最大宽度800px，高度不限制
        }),
      ],
    })
  })
})
defineExpose({
  taskId: computed(() => formState.value.taskId),
  isMethodsParamsNotSave,
})
</script>
<style scoped lang="less">
.three-column-layout {
  display: grid;
  grid-template-columns: auto 1fr auto; /* 左列自适应内容，中列占剩余空间，右列自适应内容 */
  grid-template-rows: auto 1fr; /* 第一行自适应内容，第二行占剩余高度 */
  height: calc(100vh - 269px); /* 或具体高度 */
  //gap: 10px; /* 可选，设置间距 */
  overflow-y: hidden;

  > div {
    max-height: calc(100vh - 269px);
    height: calc(100vh - 269px);
  }
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;

  > :deep(.container) {
    flex: 1;
    height: 50%;
  }
}

.title-box {
  padding: 8px 17px;
  border-bottom: 1px solid #153471;
  color: #153471;

  .button {
    padding: 2px 10px;
    font-size: 15px;
    border-radius: 10px;
    background-color: @button-bg-color;
    color: @button-color;
    cursor: pointer;
    display: flex;
    align-items: center;

    .icon-box {
      width: 15px;
      margin-right: 5px;
      margin-bottom: 1px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  color: #595757;
  font-size: 12px;
}

.already-edit-text {
  position: sticky;
  float: right;
  color: #ff0f0f;
}

.right-drawer-box {
  position: relative;
  margin-left: 17px;
  height: 100%;
  padding: 20px 10px;
  box-shadow: 4px 4px 9px 1px rgba(197, 197, 197, 0.72);
  border-radius: 10px;
  font-size: 10px;
  z-index: 99;
  color: #616170;
  background: #f4faff;

  .img {
    width: 18px;
    height: 20px;
    margin-bottom: 3px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .left-arrow-box {
    width: 22px;
    height: 160px;
    position: absolute;
    left: 0px;
    top: calc(50% - 80px);
    cursor: pointer;
    background: rgba(199, 210, 228, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 8px 8px 0px;

    .img {
      width: 11px;
      height: 25px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
