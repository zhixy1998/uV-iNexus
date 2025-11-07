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
              placeholder="Basic usage"
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
            <!--            <a-select-->
            <!--              ref="select"-->
            <!--              v-model:value="formState.projectId"-->
            <!--              @change="handleChange"-->
            <!--              placeholder="请选择任务"-->
            <!--              class="w-xs !ml-2"-->
            <!--              readonly-->
            <!--            >-->
            <!--              <a-select-option-->
            <!--                v-for="(item, index) in dictArr.projectArr"-->
            <!--                :key="`${index}item`"-->
            <!--                :value="item.id"-->
            <!--                >{{ item.projectName }}</a-select-option-->
            <!--              >-->
            <!--            </a-select>-->
          </a-col>
          <a-col :span="12" class="flex">
            <span class="text-[16px] text-[#113371]">当前任务</span>
            <a-input
              v-model:value="formState.taskName"
              placeholder=""
              readonly
              class="!w-xs !mr-2 !ml-2"
            />
          </a-col>
        </a-row>
      </template>
    </uvCollapseRightSlot>
    <methodsParams :projectDetail="formState" ref="methodsParamsRef" />
    <quantityResultData
      ref="resultDataRef"
      :projectDetail="formState"
      :isRepeat="isRepeat"
      :apiParams="apiQuantityParams"
      :wsUrl="wsQuantityUrl"
    />
    <!-- <result-data
      v-model:image-base64="imageBase64"
      ref="resultDataRef"
      :projectDetail="formState"
      :isRepeat="isRepeat"
    /> -->
    <report-preview
      :image-base64="imageBase64"
      :task-id="formState.taskId"
      @screenshot="handleScreenshot"
    />
    <create-task
      v-model:model-value="createTaskVisible"
      v-if="createTaskVisible"
      :project="{ projectId: formState.projectId, projectName: formState.projectName }"
      :meatureType="`定量测定`"
      @task-message="getTaskMessage"
    />
    <historyTaskDetail
      v-if="historyTaskVisible"
      v-model="historyTaskVisible"
      :taskParams="{
        projectId: formState.projectId,
        projectName: formState.projectName,
        measurementType: '定量测定',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  addQuantitySampleList,
  deleteSampleTemplate,
  downloadDocQuantityDetermind,
  getQuantityCurrentInfo,
  getQuantityCurveInfo,
  getQuantitySampleList,
  getQuantityStandTableHead,
  getQuantityStandUnknowTableHead,
  getQuantityUnknowSampleData,
  quantitiyMeasurementZero,
  queryInputParam,
  queryNewMethodTaskInfo,
  queryQuantityInputParamMapTableHead,
  queryQuantitySampleData,
  queryQuantitySampleHeads,
  querySampleTemplate,
  revokeDelQuantity,
  saveQuantityInputParamMapTableHead,
  saveSampleTemplate,
  spectrumScanningQueryAllProject,
  useMethodToTest,
} from '@/api'
import { onMounted, reactive, ref } from 'vue'

import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import reportPreview from '@/views/experiment/spectralScan/components/reportPreviewNew.vue'

import createTask from '../experimentTest/components/createTask.vue'
import historyTaskDetail from '../experimentTest/components/historyTaskDetail.vue'
import methodsParams from './components/methodsParams.vue'

interface ProjectItem {
  id: string
  projectName: string
}

/******************************** 接口 *********************************/
// 结果数据
const apiQuantityParams = {
  getQuantityCurveInfo: getQuantityCurveInfo,
  queryQuantitySampleData: queryQuantitySampleData,
  getQuantityStandTableHead: getQuantityStandTableHead,
  getQuantityUnknowSampleData: getQuantityUnknowSampleData,
  getQuantityStandUnknowTableHead: getQuantityStandUnknowTableHead,
  quantitiyMeasurementZero: quantitiyMeasurementZero,
  revokeDelQuantity: revokeDelQuantity,
  // 列配置
  queryInputParamMapTableHead: queryQuantityInputParamMapTableHead,
  saveInputParamMapTableHead: saveQuantityInputParamMapTableHead,
  queryInputParam: queryInputParam,
  downloadDocQuantityDetermind: downloadDocQuantityDetermind,
}
// 样品
const apiQuantitySample = ref({
  addQuantitySampleList: addQuantitySampleList,
  deleteSampleTemplate: deleteSampleTemplate,
  querySampleTemplate: querySampleTemplate,
  saveSampleTemplate: saveSampleTemplate,
  getQuantitySampleList: getQuantitySampleList,
  queryQuantitySampleHeads: queryQuantitySampleHeads,
})
provide('sampleApi', apiQuantitySample)
// 测量
const wsQuantityUrl = 'ws/ration'

// 折叠面板
const activeKey = ref<string[]>(['1'])
const changeCollapse = (value: string | string[] | number) => {
  activeKey.value = value as string[]
}

// 基本信息 项目、任务、方法
const dictArr = reactive<{
  projectArr: ProjectItem[]
}>({
  projectArr: [],
})
const formState = ref<any>({
  taskId: '',
  taskName: '',
  methodId: '',
  methodName: '',
  projectId: '',
  projectName: '',
})
const createTaskVisible = ref<boolean>(false) // 创建任务
const historyTaskVisible = ref(false) // 查看任务
const methodsParamsRef = ref()
// const isRepeat = computed(() => {
//   return methodsParamsRef.value?.methodsParams.repetitionPattern === '单池重复'
// })
const isRepeat = ref(true)
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const handleCatTask = () => {
  historyTaskVisible.value = true
}
const queryAllProject = async () => {
  const { data, code } = await spectrumScanningQueryAllProject()
  if (code === 200) dictArr.projectArr = data
}
const getCurrentDetail = async () => {
  const { data, code } = await getQuantityCurrentInfo({ measureType: '定量测定' })
  if (code === 200) {
    formState.value = data
  }
}

// 报告预览
const imageBase64 = ref('')
const resultDataRef = ref()
const handleScreenshot = () => {
  resultDataRef.value.screenshot()
}
const route = useRoute()
const queryNewMethodTaskInfoFun = async () => {
  const { data, code } = await queryNewMethodTaskInfo({ taskId: route.query.taskId })
  formState.value = data
}
// 创建任务成功获取创建的任务方法Id
const getTaskMessage = (message: any) => {
  formState.value.taskName = message.taskName
  formState.value.taskId = message.taskId
  formState.value.methodId = message.methodId
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
onMounted(async () => {
  if (route.query.taskId) {
    queryNewMethodTaskInfoFun()
  } else if (route.query.methodId) {
    useMethods(route.query.methodId as string)
  } else {
    await queryAllProject()
    await getCurrentDetail()
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
