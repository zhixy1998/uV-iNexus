<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="uv-container flex flex-col gap-5">
    <uvCollapseRightSlot
      :parentActiveKey="activeKey"
      title="基本信息"
      @changeCollapse="changeCollapse"
    >
      <template #slot-header>
        <div class="flex gap-4">
          <uvHasIconBtn content="创建任务" @click.stop="handleCreateTask"> </uvHasIconBtn>
          <uvHasIconBtn content="查看任务" @click.stop="handleCatTask"> </uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <a-row>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前项目</span>
            <a-input
              v-model:value="formState.projectName"
              placeholder="请输入"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前任务</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder="请输入"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <methodsParams
      @method-id="getMethodsId"
      :projectId="formState.projectId"
      :projectName="formState.projectName"
      :methodId="formState.methodId"
      @changeMethodsTask="changeMethodsTaskId"
    />
    <!--    <result-data-->
    <!--      v-model:image-base64="imageBase64"-->
    <!--      ref="resultDataRef"-->
    <!--      :measureParams="{ projectId: formState.projectId, methodId: formState.methodId }"-->
    <!--      :taskId="formState.taskId"-->
    <!--      :messageId="formState.methodId"-->
    <!--      @addSampleSuccess="dataYuanAddFun"-->
    <!--      @update:chekedSampleKeys="updateChekedSampleKeys"-->
    <!--    />-->
    <measureResult
      :measureType="`时间扫描`"
      :task-id="formState.taskId"
      :method-id="formState.methodId"
      @addSampleSuccess="dataYuanAddFun"
      :api="spectralApi"
      :wsUrl="{
        xiaoZero: 'ws/zeroCalibration',
        measure: 'ws/timeScan',
        singleMeasure: 'ws/timeOneMeasure',
      }"
      @update:chekedSampleKeys="updateChekedSampleKeys"
      source-page="时间扫描"
    />
    <dataTransform
      :methodsId="formState.methodId"
      ref="dataTransformRef"
      :task-id="formState.taskId"
      @change-list="changeListFun"
    />
    <report-preview
      ref="reportPreviewRef"
      :image-base64="imageBase64"
      @screenshot="handleScreenshot"
      :taskId="formState.taskId"
      :measurementType="`时间扫描`"
    />
    <create-task
      v-model:model-value="createTaskVisible"
      v-if="createTaskVisible"
      :project="{ projectId: formState.projectId, projectName: formState.projectName }"
      :meatureType="`时间扫描`"
      @task-message="getTaskMessage"
    />
    <historyTaskDetail
      v-if="historyTaskVisible"
      v-model="historyTaskVisible"
      :taskParams="{
        projectId: formState.projectId,
        projectName: formState.projectName,
        measurementType: '时间扫描',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  getTimeEssentialInformation,
  queryNewMethodTaskInfo,
  spectrumScanningQueryAllProject,
  useMethodToTest,
} from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import reportPreview from '@/views/experiment/spectralScan/components/reportPreviewNew.vue'

import {
  addOrDeleteTimeSamplePort,
  addTimeGaugePoint,
  addTimeGaugePointRemarks,
  addTimePeakValleyRemarks,
  delTimeChangeTheListPort,
  delTimeSampleListPort,
  downloadDocConciseSpectrumScanning,
  downloadDocConciseTimeSweep,
  downloadDocSpectrumScanning,
  downloadDocTimeSweep,
  getTimeChangeTheListPort,
  getTimeGaugePointDataList,
  getTimeMethodParameter,
  getTimePeakValleyDataList,
  getTimeSampleHeaders,
  getTimeSampleList,
  getTimeSampleListPort,
  restoreTimeDeletedListData,
  seekingTimePeaksAndValleysPort,
  timeExportWordSimple,
  timeSaveDataSimple,
  timeUploadImage,
  updateTimeDataColor,
  zeroTime,
} from '@/api'
import createTask from '../experimentTest/components/createTask.vue'
import historyTaskDetail from '../experimentTest/components/historyTaskDetail.vue'
import dataTransform from './components/dataTransform.vue'
import methodsParams from './components/methodsParams.vue'
const spectralApi = {
  sampleListPortList: getTimeSampleListPort,
  changeTheListPort: getTimeChangeTheListPort,
  deleteSampleListPort: delTimeSampleListPort,
  deleteChangeListPort: delTimeChangeTheListPort,
  restoreDeletedListData: restoreTimeDeletedListData,
  zeroCalibrationPort: zeroTime,
  uploadImage: timeUploadImage,
  updateDataColor: updateTimeDataColor,
  addGaugePoint: addTimeGaugePoint,
  addGaugePointRemarks: addTimeGaugePointRemarks,
  addPeakValleyRemarks: addTimePeakValleyRemarks,
  seekingPeaksAndValleysPort: seekingTimePeaksAndValleysPort,
  queryGaugePointPort: getTimeGaugePointDataList,
  queryPeakAndValleysPort: getTimePeakValleyDataList,
  methodParameter: getTimeMethodParameter,
  saveTask: timeSaveDataSimple, // 保存任务接口
  exportTaskWord: timeExportWordSimple, // 导出任务Word接口
  downloadDocTimeSweep: downloadDocTimeSweep, // 导出任务Word接口
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep, // 导出任务Word接口
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning, // 导出任务Word接口
}
const sampleApi = {
  addOrDeleteSamplePort: addOrDeleteTimeSamplePort, // 添加或删除样品
  querySampleList: getTimeSampleList, // 查询样品列表
  querySampleHeads: getTimeSampleHeaders, // 查询样品表头
}
provide('sampleApi', sampleApi)
// 折叠面板
const activeKey = ref<string[]>(['1'])
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string[]
}

// 当前项目信息
interface ProjectItem {
  id: string
  projectName: string
}
const dictArr = reactive<{
  projectArr: ProjectItem[]
}>({
  projectArr: [],
})
const formState = ref<Record<string, any>>({
  projectId: '',
})
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  if (code === 200) {
    dictArr.projectArr = data
    // formState.value.projectId = data[0].id
    // formState.value.projectName = data[0].projectName
  }
}
const findInitParams = async () => {
  const { code, data } = await getTimeEssentialInformation({
    measureType: '时间扫描',
  })
  if (code === 200) {
    formState.value.taskName = data.taskName
    formState.value.taskId = data.taskId
    formState.value.projectId = data.projectId
    formState.value.projectName = data.projectName
    formState.value.methodId = data.methodId
    formState.value.methodName = data.methodName
  }
}

// 创建任务
const createTaskVisible = ref<boolean>(false)
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const getTaskMessage = (message: any) => {
  formState.value.methodId = message.methodId
  formState.value.taskId = message.taskId
  formState.value.taskName = message.taskName
}

// 查看历史任务
const historyTaskVisible = ref(false)
const handleCatTask = () => {
  historyTaskVisible.value = true
}

// 方法参数
const getMethodsId = (e: any) => {
  formState.value.methodId = e.methodId
}
// 选择该方法
const changeMethodsTaskId = (params: any) => {
  // 当前方法改变需要做的内容
  formState.value.methodId = params.methodId
}

// 结果数据
const resultDataRef = ref()
const dataYuanAddFun = () => {
  dataTransformRef.value.queryMeasurementParametersFun()
}
const updateChekedSampleKeys = (checkedSampleKeys: any) => {
  reportPreviewRef.value.updateChekedSampleKeys(checkedSampleKeys)
}

// 数据变换
const dataTransformRef = ref()
const changeListFun = () => {
  resultDataRef.value?.initListPortData()
}

// 报告预览
const reportPreviewRef = ref()
const imageBase64 = ref('')
const handleScreenshot = () => {
  resultDataRef.value.screenshot()
}

// 从查看历史任务 跳转详情进来的
const queryNewMethodTaskInfoFun = async () => {
  const { data, code } = await queryNewMethodTaskInfo({ taskId: route.query.taskId })
  if (code === 200) {
    formState.value = data
  }
}

// 从首页跳转过来的 使用该方法继续测量
const useMethods = async (methodId: string) => {
  const { code, data } = await useMethodToTest({
    methodId: methodId,
  })
  if (code === 200) {
    formState.value.projectId = data.projectId
    formState.value.projectName = data.projectName
    formState.value.taskId = data.taskId
    formState.value.taskName = data.taskName
    formState.value.methodId = data.methodId
    formState.value.methodName = data.methodName
  }
}

const route = useRoute()
onMounted(async () => {
  if (route.query.taskId) {
    // 从查看历史任务 跳转详情进来的
    queryNewMethodTaskInfoFun()
  } else if (route.query.methodId) {
    // 从首页跳转过来的 使用该方法继续测量
    useMethods(route.query.methodId as string)
  } else {
    queryAllProject()
    findInitParams()
  }
})
</script>

<style scoped lang="less"></style>
