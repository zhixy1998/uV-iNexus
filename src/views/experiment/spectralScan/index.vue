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
            <!-- <a-select
              ref="select"
              v-model:value="formState.projectId"
              @change="handleChange"
              class="w-xs !ml-2"
            >
              <a-select-option
                v-for="(item, index) in dictArr.projectArr"
                :key="`${index}item`"
                :value="item.id"
                >{{ item.projectName }}</a-select-option
              >
            </a-select> -->
            <a-input
              v-model:value="formState.projectName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前任务</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
          <!-- <a-col :span="8" class="flex">
            <span>指定方法</span>
            <a-input v-model:value="value" placeholder="Basic usage" class="!w-xs !mr-2 !ml-2" />
            <SearchOutlined />
          </a-col> -->
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <methodsParams
      @method-id="getMethodsId"
      :projectId="formState.projectId"
      :projectName="formState.projectName"
      :methodsId="formState.methodId"
      @changeMethodsTask="changeMethodsTaskId"
      @update:chekedSampleKeys="updateChekedSampleKeys"
    />
    <!--        <result-data-->
    <!--          v-model:image-base64="imageBase64"-->
    <!--          ref="resultDataRef"-->
    <!--          :measureParams="{ projectId: formState.projectId, method_id: formState.methodId }"-->
    <!--          :taskId="formState.taskId"-->
    <!--          :messageId="formState.methodId"-->
    <!--          @addSampleSuccess="dataYuanAddFun"-->
    <!--        />-->
    <measureResult
      ref="resultDataRef"
      measureType="光谱扫描"
      :task-id="formState.taskId"
      :method-id="formState.methodId"
      @addSampleSuccess="dataYuanAddFun"
      :api="spectralApi"
      @update:chekedSampleKeys="updateChekedSampleKeys"
      source-page="光谱扫描"
    />
    <dataTransForm
      :methodsId="formState.methodId"
      ref="dataTransformRef"
      :task-id="formState.taskId"
      @change-list="changeListFun"
      :api="dataTransformApi"
    />
    <report-preview
      ref="reportPreviewRef"
      :image-base64="imageBase64"
      @screenshot="handleScreenshot"
      :taskId="formState.taskId"
      :measurementType="`光谱扫描`"
    />
    <create-task
      v-model:model-value="createTaskVisible"
      v-if="createTaskVisible"
      :project="{ projectId: formState.projectId, projectName: formState.projectName }"
      :meatureType="`光谱扫描`"
      @task-message="getTaskMessage"
    />
    <historyTaskDetail
      v-if="historyTaskVisible"
      v-model="historyTaskVisible"
      :taskParams="{
        projectId: formState.projectId,
        projectName: formState.projectName,
        measurementType: '光谱扫描',
      }"
    />
    <!--  <methodsSetting v-model="methodsVisible"/> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  addGaugePoint,
  addGaugePointRemarks,
  addOrDeleteSamplePort,
  addPeakValleyRemarks,
  advancedOperationsPort,
  changeTheListPort,
  deleteChangeListPort,
  deleteSampleListPort,
  differentialPort,
  downloadDocConciseSpectrumScanning,
  downloadDocConciseTimeSweep,
  downloadDocSpectrumScanning,
  downloadDocTimeSweep,
  fourOperationsPort,
  luminanceModeConversionPort,
  methodParameter,
  queryEssentialInformation,
  queryGaugePointPort,
  queryMeasurementParameters,
  queryNewMethodTaskInfo,
  queryPeakAndValleysPort,
  querySampleList,
  querySpectrumSampleHeads,
  restoreDeletedListData,
  sampleListPortList,
  saveLumneTask,
  seekingPeaksAndValleysPort,
  smoothnessPort,
  spectrumExportWord,
  spectrumScanningQueryAllProject,
  updateDataColor,
  uploadImage,
  useMethodToTest,
  zeroCalibrationPort,
} from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'

import createTask from '../experimentTest/components/createTask.vue'
import historyTaskDetail from '../experimentTest/components/historyTaskDetail.vue'
// import dataTransform from './components/dataTransform.vue'
import methodsParams from './components/methodsParams.vue'
import reportPreview from './components/reportPreviewNew.vue'
// 折叠面板
const createTaskVisible = ref<boolean>(false)
const historyTaskVisible = ref(false)
const resultDataRef = ref()
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
const activeKey = ref<string[]>(['1'])
const dataTransformRef = ref()
const spectralApi = {
  sampleListPortList: sampleListPortList,
  changeTheListPort: changeTheListPort,
  deleteSampleListPort: deleteSampleListPort,
  deleteChangeListPort: deleteChangeListPort,
  restoreDeletedListData: restoreDeletedListData,
  zeroCalibrationPort: zeroCalibrationPort,
  uploadImage: uploadImage,
  updateDataColor: updateDataColor,
  addGaugePoint: addGaugePoint,
  addGaugePointRemarks: addGaugePointRemarks,
  addPeakValleyRemarks: addPeakValleyRemarks,
  seekingPeaksAndValleysPort: seekingPeaksAndValleysPort,
  queryGaugePointPort: queryGaugePointPort,
  queryPeakAndValleysPort: queryPeakAndValleysPort,
  methodParameter: methodParameter,
  saveTask: saveLumneTask, // 保存任务接口
  exportTaskWord: spectrumExportWord, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning,
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep,
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning,
  downloadDocTimeSweep: downloadDocTimeSweep,
}
const sampleApi = ref({
  addOrDeleteSamplePort: addOrDeleteSamplePort, // 添加或删除样品
  querySampleList: querySampleList, // 查询样品列表
  querySampleHeads: querySpectrumSampleHeads, // 查询样品表头
})
const dataTransformApi = {
  advancedOperationsPort: advancedOperationsPort, // 高级运算接口
  differentialPort: differentialPort, // 谱图微分接口
  fourOperationsPort: fourOperationsPort, // 四则运算接口
  luminanceModeConversionPort: luminanceModeConversionPort, // 光度模式转换接口
  methodParameter: methodParameter, // 方法参数接口
  queryMeasurementParameters: queryMeasurementParameters, // 查询源测量数据接口
  saveTask: saveLumneTask, // 保存任务接口
  smoothnessPort: smoothnessPort, // 谱图平滑接口
  exportTaskWord: spectrumExportWord, // 导出任务Word接口
  downloadDocSpectrumScanning: downloadDocSpectrumScanning,
  downloadDocConciseTimeSweep: downloadDocConciseTimeSweep,
  downloadDocConciseSpectrumScanning: downloadDocConciseSpectrumScanning,
  downloadDocTimeSweep: downloadDocTimeSweep,
}
provide('sampleApi', sampleApi)
const dataYuanAddFun = () => {
  dataTransformRef.value.queryMeasurementParametersFun()
}
const imageBase64 = ref('')
const handleScreenshot = () => {
  resultDataRef.value.screenshot()
}
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string[]
}
const getMethodsId = (e: any) => {
  formState.value.methodId = e
}
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const handleCatTask = () => {
  historyTaskVisible.value = true
}
const reportPreviewRef = ref()
const updateChekedSampleKeys = (checkedSampleKeys: any) => {
  reportPreviewRef.value.updateChekedSampleKeys(checkedSampleKeys)
}
const changeListFun = () => {
  resultDataRef.value?.checkIsDelete()
}
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  dictArr.projectArr = data
  formState.value.projectId = data[0].id
  formState.value.projectName = data[0].projectName
}
const getTaskMessage = (message: any) => {
  formState.value.taskName = message.taskName
  formState.value.taskId = message.taskId
  formState.value.methodId = message.methodId
}
const findInitParams = async () => {
  const { code, data } = await queryEssentialInformation({
    measureType: '光谱扫描',
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
// 当前方法改变需要做的内容
const changeMethodsTaskId = (params: any) => {
  formState.value.taskId = params.taskId || formState.value.taskId
  formState.value.taskName = params.taskName || formState.value.taskName
  formState.value.methodId = params.methodId || formState.value.methodId
  resultDataRef.value.methodParameterFun(formState.value.methodId)
  dataTransformRef.value.methodParameterFun(formState.value.methodId)
}
const queryNewMethodTaskInfoFun = async () => {
  const { data, code } = await queryNewMethodTaskInfo({ taskId: route.query.taskId })
  formState.value = data
}

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
    queryNewMethodTaskInfoFun()
  } else if (route.query.methodId) {
    useMethods(route.query.methodId as string)
  } else {
    queryAllProject()
    findInitParams()
  }
})
</script>

<style scoped lang="less">
:deep(.ant-select-selector) {
  border: 1px solid #113371 !important;
}

:deep(.ant-input) {
  border-color: #113371 !important;
}
</style>
