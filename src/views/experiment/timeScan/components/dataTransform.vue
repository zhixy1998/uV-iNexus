<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="数据变换">
      <template #slot-content>
        <a-row :gutter="32">
          <a-col :span="12">
            <div class="flex flex-col gap-5">
              <a-tabs v-model:activeKey="activeKey" class="left-box">
                <a-tab-pane key="1" tab="四则运算" class="!leading-[5]">
                  <div class="flex items-center gap-4">
                    <span class="w-20">源1</span>
                    <div class="flex items-center flex-1">
                      <a-select
                        ref="select"
                        v-model:value="formState.measureDataId1"
                        class="w-full"
                      >
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20">操作</span>
                    <a-radio-group name="radioGroup" v-model:value="formState.arithmeticOperators">
                      <a-radio value="0">加</a-radio>
                      <a-radio value="1">减</a-radio>
                      <a-radio value="2">乘</a-radio>
                      <a-radio value="3">除</a-radio>
                    </a-radio-group>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20">源2</span>
                    <a-radio-group name="radioGroup" v-model:value="formState.dataType">
                      <a-radio value="0">数值</a-radio>
                      <a-radio value="1">图谱</a-radio>
                    </a-radio-group>
                  </div>
                  <div class="flex items-center gap-4" v-if="formState.dataType === '0'">
                    <div class="w-20 h-15"></div>
                    <a-input-number
                      v-model:value="formState.measureDataId2"
                      placeholder="请输入"
                      class="flex-1"
                    />
                  </div>
                  <div class="flex items-center gap-4" v-if="formState.dataType === '1'">
                    <span class="w-20">样品</span>
                    <div class="flex items-center flex-1">
                      <a-select
                        ref="select"
                        v-model:value="formState.measureDataId2"
                        class="w-full"
                      >
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">变换名称</span>
                    <a-input v-model:value="formState.analysisDataName" placeholder="请输入" />
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="高级运算" class="!leading-[4.5]">
                  <div class="flex items-center gap-4">
                    <span class="w-20">源</span>
                    <div class="flex items-center flex-1">
                      <a-select ref="select" v-model:value="formState.measureDataId" class="w-full">
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <a-radio-group
                    name="radioGroup"
                    v-model:value="formState.dataType"
                    class="!ml-24"
                  >
                    <a-radio value="4">对数</a-radio>
                    <a-radio value="5">倒数</a-radio>
                  </a-radio-group>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">变换名称</span>
                    <a-input v-model:value="formState.analysisDataNameGao" placeholder="请输入" />
                  </div>
                </a-tab-pane>
                <a-tab-pane key="3" tab="谱图平滑" class="!leading-[4.5]">
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">源</span>
                    <div class="flex items-center flex-1">
                      <a-select
                        ref="select"
                        v-model:value="formState.measureDataIdHua"
                        class="w-full"
                      >
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">点数</span>
                    <a-select ref="select" v-model:value="formState.pointNum" class="flex-1">
                      <a-select-option value="5">5</a-select-option>
                      <a-select-option value="7">7</a-select-option>
                      <a-select-option value="9">9</a-select-option>
                      <a-select-option value="11">11</a-select-option>
                    </a-select>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="w-20 flex-shrink-0">系数</div>
                    <a-input ref="select" v-model:value="formState.coefficient"></a-input>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">变换名称</span>
                    <a-input v-model:value="formState.analysisDataNameHua" placeholder="请输入" />
                  </div>
                </a-tab-pane>
                <a-tab-pane key="4" tab="谱图微分" class="!leading-[4.5]">
                  <div class="flex items-center gap-4">
                    <span class="w-20">源</span>
                    <div class="flex items-center flex-1">
                      <a-select
                        ref="select"
                        v-model:value="formState.measureDataIdFen"
                        class="w-full"
                      >
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20">次数</span>
                    <a-select ref="select" v-model:value="formState.differentialNum" class="flex-1">
                      <a-select-option value="1">一次微分</a-select-option>
                      <a-select-option value="2">二次微分</a-select-option>
                      <a-select-option value="3">三次微分</a-select-option>
                      <a-select-option value="4">四次微分</a-select-option>
                    </a-select>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20">点数</span>
                    <a-select ref="select" v-model:value="formState.pointNumFen" class="flex-1">
                      <a-select-option value="5">5</a-select-option>
                      <a-select-option value="7">7</a-select-option>
                      <a-select-option value="9">9</a-select-option>
                      <a-select-option value="11">11</a-select-option>
                    </a-select>
                  </div>
                  <div class="flex items-center gap-4">
                    <div class="w-20 flex-shrink-0">系数</div>
                    <a-input ref="select" v-model:value="formState.coefficientFen"></a-input>
                  </div>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">变换名称</span>
                    <a-input v-model:value="formState.analysisDataNameFen" placeholder="请输入" />
                  </div>
                </a-tab-pane>
                <a-tab-pane key="5" tab="光度模式转换" class="!leading-[4.5]">
                  <div class="flex items-center gap-4">
                    <span class="w-20">源</span>
                    <div class="flex items-center flex-1">
                      <a-select
                        ref="select"
                        v-model:value="formState.measureDataIdHuan"
                        class="w-full"
                      >
                        <a-select-option
                          v-for="item in dictArr.measureDataList"
                          :key="item.measureId"
                          >{{ item.sampleName }}</a-select-option
                        >
                      </a-select>
                    </div>
                  </div>
                  <a-radio-group
                    name="radioGroup"
                    v-model:value="formState.dataTypeHuan"
                    class="!ml-24"
                  >
                    <a-radio :value="item.value" v-for="item in radioMode" :key="item">{{
                      item.label
                    }}</a-radio>
                  </a-radio-group>
                  <div class="flex items-center gap-4">
                    <span class="w-20 flex-shrink-0">变换名称</span>
                    <a-input v-model:value="formState.analysisDataNameHuan" placeholder="请输入" />
                  </div>
                </a-tab-pane>
              </a-tabs>
              <div class="flex justify-around">
                <uvHasIconBtn content="取消"> </uvHasIconBtn>
                <uvHasIconBtn content="确认" @click="handleConfirm"> </uvHasIconBtn>
              </div>
            </div>
          </a-col>
          <a-col :span="12">
            <lineChart
              class="!w-full !h-full"
              :showMark="false"
              :initial-data="getCahrtData"
              :xAxisOptions="xShowRange"
            />
          </a-col>
        </a-row>
        <div class="!mr-[-30px] !ml-[-30px]">
          <a-divider :style="{ backgroundColor: primaryColor, margin: '15px 0px' }" />
        </div>
        <div class="flex justify-end">
          <uvHasIconBtn content="保存" class="!mr-[60px]" @click="showSaveVisual">
            <template #icon>
              <download-outlined />
            </template>
          </uvHasIconBtn>
          <uvHasIconBtn content="导出到word" @click="spectrumExportWordFun">
            <template #icon>
              <download-outlined />
            </template>
          </uvHasIconBtn>
        </div>
      </template>
    </uvCollapseRightSlot>
  </section>
  <!-- <uvModal v-model="saveVisual" size="smail" title="保存">
    <template #content>
      <a-alert
        message="检测到表格标题有修改，如果你希望下一次打开数据时使用新的表格标题，请将参数"
        type="info"
      />
      <br />
      <div class="flex justify-center">
        <uvHasIconBtn content="保存到新方法"></uvHasIconBtn>
      </div>
      <br />
      <div class="flex items-center">
        <div class="w-20">数据名称</div>
        <a-input ref="select" v-model:value="value1"> </a-input>
      </div>
      <br />
    </template>
  </uvModal> -->
</template>
<script lang="ts" setup>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, reactive, ref, watch } from 'vue'

import {
  getTimeArithmeticSourceData,
  timeAdvancedOperationsPort,
  timeDifferentialPort,
  timeExportWord,
  timeFourOperationsPort,
  timeLuminanceModeConversionPort,
  timeSaveData,
  timeSmoothnessPort,
} from '@/api'
import lineChart from '@/components/lineChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import { useAppStore } from '@/stores'
import type { ChartDataItem } from '@/types/experimentTypes'

const { primaryColor } = useAppStore()

const props = defineProps({
  methodsId: String,
  taskId: String,
})

watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      queryMeasurementParametersFun()
    } else {
      dictArr.measureDataList = []
    }
  },
)
const emits = defineEmits(['changeList'])

const formState = reactive<{ [key: string]: any }>({
  name: '',
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

// 下拉选择数据
interface measureDataItem {
  id: string
  [key: string]: any
}
const dictArr = reactive<{
  measureDataList: measureDataItem[]
}>({
  measureDataList: [],
})
const queryMeasurementParametersFun = async () => {
  const { code, data } = await getTimeArithmeticSourceData({
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) dictArr.measureDataList = data
}

// 确认
const handleConfirm = () => {
  switch (activeKey.value) {
    case '1':
      fourOperationsPortFun()
      break
    case '2':
      advancedOperationsPortFun()
      break
    case '3':
      smoothnessPortFun()
      break
    case '4':
      differentialPortFun()
      break
    case '5':
      luminanceModeConversionPortFun()
      break
  }
}

// x坐标轴范围
const xShowRange = reactive({
  min: 0,
  max: 800,
})
const getCahrtData = computed(() => {
  switch (activeKey.value) {
    case '1':
      return chartData.value
    case '2':
      return chartDataGao.value
    case '3':
      return chartDataHua.value
    case '4':
      return chartDataFen.value
    case '5':
      return chartDataHuan.value
    default:
      return []
  }
})

// 四则运算
const chartData = ref<ChartDataItem[]>([])
const fourOperationsPortFun = async () => {
  const { code, data } = await timeFourOperationsPort({
    measureDataId1: formState.measureDataId1,
    measureDataId2: formState.measureDataId2,
    arithmeticOperators: formState.arithmeticOperators,
    analysisDataName: formState.analysisDataName,
    dataType: formState.dataType,
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) {
    xShowRange.min = Math.min(...data.map((item: { x: string }) => item.x))
    xShowRange.max = Math.max(...data.map((item: { x: string }) => item.x))
    chartData.value.push(...data)
    emits('changeList')
  }
}

// 高级运算
const chartDataGao = ref<ChartDataItem[]>([])
const advancedOperationsPortFun = async () => {
  const { code, data } = await timeAdvancedOperationsPort({
    measureDataId: formState.measureDataId,
    dataType: formState.dataType,
    analysisDataName: formState.analysisDataNameGao,
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) {
    xShowRange.min = Math.min(...data.map((item: { x: string }) => item.x))
    xShowRange.max = Math.max(...data.map((item: { x: string }) => item.x))
    chartDataGao.value.push(...data)
    emits('changeList')
  }
}

// 谱图平滑
const chartDataHua = ref<ChartDataItem[]>([])
const smoothnessPortFun = async () => {
  const { code, data } = await timeSmoothnessPort({
    measureDataId: formState.measureDataIdHua,
    analysisDataName: formState.analysisDataNameHua,
    coefficient: formState.coefficient,
    pointNum: formState.pointNum,
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) {
    xShowRange.min = Math.min(...data.map((item: { x: string }) => item.x))
    xShowRange.max = Math.max(...data.map((item: { x: string }) => item.x))
    chartDataHua.value.push(...data)
    emits('changeList')
  }
}

// 谱图微分
const chartDataFen = ref<ChartDataItem[]>([])
const differentialPortFun = async () => {
  const { code, data } = await timeDifferentialPort({
    measureDataId: formState.measureDataIdFen,
    analysisDataName: formState.analysisDataNameFen,
    coefficient: formState.coefficientFen,
    pointNum: formState.pointNumFen,
    differentialNum: formState.differentialNum,
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) {
    xShowRange.min = Math.min(...data.map((item: { x: string }) => item.x))
    xShowRange.max = Math.max(...data.map((item: { x: string }) => item.x))
    chartDataFen.value.push(...data)
    emits('changeList')
  }
}

// 光度模式转换
const radioMode = ref([
  { label: 'Abs<->T%', value: '1' },
  { label: 'Abs<->R%', value: '2' },
])
const chartDataHuan = ref<ChartDataItem[]>([])
const luminanceModeConversionPortFun = async () => {
  const { code, data } = await timeLuminanceModeConversionPort({
    measureDataId: formState.measureDataIdHuan,
    dataType: formState.dataTypeHuan,
    analysisDataName: formState.analysisDataNameHuan,
    methodId: props.methodsId,
    taskId: props.taskId ? props.taskId : '',
  })
  if (code === 200) {
    xShowRange.min = Math.min(...data.map((item: { x: string }) => item.x))
    xShowRange.max = Math.max(...data.map((item: { x: string }) => item.x))
    chartDataHuan.value.push(...data)
    emits('changeList')
  }
}

// 保存
const value1 = ref('') // 暂时没用到
const saveVisual = ref(false) // 暂时没用到
const showSaveVisual = async () => {
  // saveVisual.value = true
  const { code, data } = await timeSaveData({
    taskId: props.taskId || '',
  })
  if (code === 200) {
    message.success('数据保存成功！')
  }
}

// 导出到word
const spectrumExportWordFun = async () => {
  const res = await timeExportWord({
    taskId: props.taskId ? props.taskId : '',
  })
  useDownloadFile(res, '光谱扫描内容.docx')
}

defineExpose({
  queryMeasurementParametersFun,
})
const activeKey = ref('1')
</script>

<style lang="less" scoped>
.left-box {
  padding: 0px 20px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
