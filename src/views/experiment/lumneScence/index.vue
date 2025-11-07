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
        <div class="flex">
          <uvHasIconBtn content="创建任务" class="!mr-[30px]" @click.stop="handleCreateTask">
          </uvHasIconBtn>
          <uvHasIconBtn content="查看任务" @click.stop="handleCatTask"> </uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <a-row>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前项目</span>
            <a-input
              v-model:value="formState.projectName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
            <!-- <a-select
                ref="select"
                v-model:value="formState.projectId"
                @change="handleChangeProject"
                class="w-xs !ml-2"
              >
                <a-select-option
                  v-for="(item, index) in dictArr.projectArr"
                  :key="`${index}item`"
                  :value="item.id"
                  >{{ item.projectName }}</a-select-option
                >
              </a-select> -->
          </a-col>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前任务</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
            <!-- <a-select ref="select" v-model:value="formState.taskId" class="w-xs !ml-2">
                <a-select-option
                  v-for="(item, index) in dictArr.taskArr"
                  :key="`${index}item`"
                  :value="item.id"
                  >{{ item.taskName }}</a-select-option
                >
              </a-select> -->
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
      :methodId="formState.methodId"
      :projectId="formState.projectId"
      :projectName="formState.projectName"
      ref="methodsParamsRef"
      @get-deal="getDealFun"
      @changeMethodsTask="changeMethodsTaskId"
    />
    <!-- <result-data
      v-model:image-base64="imageBase64"
      ref="resultDataRef"
      :taskId="formState.taskId"
      :dealArr="dealArr"
      :isRepeat="isRepeat"
    /> -->
    <lumneResultData
      ref="resultDataRef"
      :projectDetail="formState"
      :dealArr="dealArr"
      :isRepeat="isRepeat"
      :apiParams="apiLumneParams"
      :wsUrl="wsLumneUrl"
    />
    <report-preview
      :image-base64="imageBase64"
      @screenshot="handleScreenshot"
      :taskId="formState.taskId"
      :measurementType="`光度测量`"
    />
    <create-task
      v-model:model-value="createTaskVisible"
      v-if="createTaskVisible"
      :project="{ projectId: formState.projectId, projectName: formState.projectName }"
      :meatureType="`光度测量`"
      @task-message="getTaskMessage"
    />
    <historyTaskDetail
      v-if="historyTaskVisible"
      v-model="historyTaskVisible"
      :taskParams="{
        projectId: formState.projectId,
        projectName: formState.projectName,
        measurementType: '光度测量',
      }"
    />
    <!--  <methodsSetting v-model="methodsVisible"/> -->
  </div>
</template>

<script lang="ts" setup>
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { onMounted, provide, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  // getLumneCurrentInfo,
  // queryNewMethodTaskInfo,
  spectrumScanningQueryAllProject,
  useMethodToTest,
  // 光度测量
  queryInputParam,
  getLumneCurrentInfo,
  deleteLumneOneSample,
  downloadDocLumne,
  getLumneTableHead,
  queryLumneDataInfo,
  queryNewMethodTaskInfo,
  revokeLumneDel,
  saveLumneDataInfoRemark,
  saveLumneTask,
  zeroPhotometricMeasurement,
  queryInputParamMapTableHead,
  saveInputParamMapTableHead,
  getLumneSampleList,
  queryLumneSampleHeads,
  addOrDeleteLumneSample,
  deleteSampleTemplate,
  querySampleTemplate,
  saveSampleTemplate,
} from '@/api'
import createTask from '../experimentTest/components/createTask.vue'
import historyTaskDetail from '../experimentTest/components/historyTaskDetail.vue'
import reportPreview from '../spectralScan/components/reportPreviewNew.vue'
import dataTransform from './components/dataTransform.vue'
import methodsParams from './components/methodsParams.vue'
// import resultData from './components/resultDataLumne.vue'

// 结果数据
const apiLumneParams = {
  getLumneCurrentInfo: getLumneCurrentInfo,
  deleteLumneOneSample: deleteLumneOneSample,
  downloadDocLumne: downloadDocLumne,
  getLumneTableHead: getLumneTableHead,
  queryLumneDataInfo: queryLumneDataInfo,
  queryNewMethodTaskInfo: queryNewMethodTaskInfo,
  revokeLumneDel: revokeLumneDel,
  saveLumneDataInfoRemark: saveLumneDataInfoRemark,
  saveLumneTask: saveLumneTask,
  zeroPhotometricMeasurement: zeroPhotometricMeasurement,
  // 列配置
  queryInputParamMapTableHead: queryInputParamMapTableHead,
  saveInputParamMapTableHead: saveInputParamMapTableHead,
  queryInputParam: queryInputParam,
}
// 样品
const apiLumneSample = ref({
  deleteSampleTemplate: deleteSampleTemplate,
  querySampleTemplate: querySampleTemplate,
  saveSampleTemplate: saveSampleTemplate,
  addOrDeleteSamplePort: addOrDeleteLumneSample, // 添加或删除样品
  querySampleList: getLumneSampleList, // 查询样品列表
  querySampleHeads: queryLumneSampleHeads, // 查询样品表头
})
provide('sampleApi', apiLumneSample)
// 测量
const wsLumneUrl = 'ws/photometric'

// 折叠面板
const createTaskVisible = ref<boolean>(false)
const historyTaskVisible = ref(false)
const resultDataRef = ref()
interface ProjectItem {
  id: string
  projectName: string
}
interface TaskItem {
  id: string
  taskName: string
}
const methodsParamsRef = ref()
const isRepeat = computed(() => {
  return methodsParamsRef.value?.methodsParams.repetitionPattern === '单池重复'
})
const dictArr = reactive<{
  projectArr: ProjectItem[]
  taskArr: TaskItem[]
}>({
  projectArr: [],
  taskArr: [],
})
const formState = ref<Record<string, any>>({
  projectId: '',
})
const activeKey = ref<string[]>(['1'])
const imageBase64 = ref('')
const handleScreenshot = () => {
  resultDataRef.value.screenshot()
}
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string[]
}
const getMethodsId = (e: any) => {
  formState.value.methods_id = e
}
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const handleCatTask = () => {
  historyTaskVisible.value = true
}
const handleChangeProject = (val: string) => {
  const obj = dictArr.projectArr.find((item) => item.id === val)
  formState.value.projectName = obj?.projectName
}
// 当前方法改变需要做的内容
const changeMethodsTaskId = () => {
  formState.value.taskId = ''
  formState.value.taskName = ''
}
const dealArr = ref([])
const getDealFun = (el: any) => {
  dealArr.value = el
}
const value = ref('')
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  dictArr.projectArr = data
  formState.value.projectId = data[0].id
  formState.value.projectName = data[0].projectName
}
const getCurrentInfoFun = async () => {
  const { data, code } = await getLumneCurrentInfo({ measureType: '光度测量' })
  formState.value.projectId = data.projectId
  formState.value.projectName = data.projectName
  formState.value.taskId = data.taskId
  formState.value.taskName = data.taskName
  formState.value.methodId = data.methodId
}
const getTaskMessage = (message: any) => {
  formState.value.taskName = message.taskName
  formState.value.taskId = message.taskId
  formState.value.methodId = message.methodId
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
  // console.log(route.query, 'route.query')
  if (route.query.taskId) {
    queryNewMethodTaskInfoFun()
  } else if (route.query.methodId) {
    useMethods(route.query.methodId as string)
  } else {
    getCurrentInfoFun()
    queryAllProject()
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
