<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" :footer="null" title="方法查找">
    <template #content>
      <div class="!h-[600px] flex flex-col gap-4">
        <a-input-search
          v-model:value="search"
          placeholder="方法名称"
          class="!w-[400px]"
          @search="fetchData"
        />
        <div class="flex-1 overflow-hidden">
          <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
            <template #expandContent="{ row }">
              <div class="!px-8 !py-4 flex flex-col gap-x-5 gap-y-2">
                <template v-if="measureType === '光度测量'">
                  <span>
                    <span class="!font-bold">光度模式：</span>
                    {{ row.methodParam?.luminosityName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">波长值：</span>
                    {{ row.methodParam?.waveLengthName }}
                  </span>
                  <span>
                    <span class="!font-bold">重复模式：</span>
                    {{ row.methodParam?.repetitionPattern || '-' }}
                  </span>
                  <template v-if="row.methodParam?.repetitionPattern === '单池重复'">
                    <span>
                      <span class="!font-bold">重复次数：</span>
                      {{ row.methodParam?.repetitionTime || '0' }}次
                    </span>
                    <span>
                      <span class="!font-bold">时间间隔：</span>
                      {{ row.methodParam?.timeInterval || '0' }}秒
                    </span>
                  </template>
                  <span>
                    <span class="!font-bold">样品输入参数：</span>
                    {{ row.methodParam?.sampleInputParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">待计算结果：</span>
                    {{ row.methodParam?.resultParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">修约设置：</span>
                    {{ row.methodParam?.approxParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">质控设置：</span>
                    {{ row.methodParam?.qcParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">光谱带宽(nm)：</span>
                    {{ row.methodParam?.spectralBandwidth || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">响应时间(秒)：</span>
                    {{ row.methodParam?.responseTime || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">换灯波长(nm)：</span>
                    {{ row.methodParam?.changeLampWaveLength || '-' }}
                  </span>
                  <!-- Abs和T%不显示能量灯和增益 -->
                  <template
                    v-if="
                      row.methodParam &&
                      row.methodParam.luminosity !== '1' &&
                      row.methodParam.luminosity !== '2'
                    "
                  >
                    <span>
                      <span class="!font-bold">能量灯：</span>
                      {{ row.methodParam?.energyLampName || '-' }}
                    </span>
                    <span>
                      <span class="!font-bold">增益：</span>
                      {{ row.methodParam?.gain || '-' }}
                    </span>
                  </template>
                </template>
                <template v-else-if="measureType === '定量测定'">
                  <span>
                    <span class="!font-bold">波长值(nm)：</span>
                    {{ row.methodParam?.waveLengthName }}
                  </span>
                  <span>
                    <span class="!font-bold">波长参数：</span>
                    {{ row.methodParam?.waveLengthParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">波长公式：</span>
                    {{ row.methodParam?.waveLengthFormula || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">微分方式：</span>
                    {{ row.methodParam?.differentialModeName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">曲线类型：</span>
                    {{ row.methodParam?.curveTypeName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">方程类型：</span>
                    {{ row.methodParam?.equationTypeName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">曲线公式：</span>
                    {{ row.methodParam?.curveFormula || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">系数方式：</span>
                    {{ row.methodParam?.coefficientModeName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">零点方式：</span>
                    {{ row.methodParam?.zeroMethodName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">推荐C(mg/L)：</span>
                    {{ row.methodParam?.curveCoefficientName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">重复模式：</span>
                    {{ row.methodParam?.repeatMode || '-' }}
                  </span>
                  <template v-if="row.methodParam?.repeatMode === '单池重复'">
                    <span>
                      <span class="!font-bold">重复次数：</span>
                      {{ row.methodParam?.repeatCount || '0' }}次
                    </span>
                    <span>
                      <span class="!font-bold">时间间隔：</span>
                      {{ row.methodParam?.timeInterval || '0' }}秒
                    </span>
                  </template>
                  <span>
                    <span class="!font-bold">拟合结果：</span>
                    {{
                      row.methodParam?.samplePoolWay == 1
                        ? '浓度'
                        : row.methodParam?.samplePoolWay == 0
                          ? '质量'
                          : '-'
                    }}
                  </span>
                  <span>
                    <span class="!font-bold">单位：</span>
                    {{ row.methodParam?.dw || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">样品输入参数：</span>
                    {{ row.methodParam?.sampleInputParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">待计算结果：</span>
                    {{ row.methodParam?.resultParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">修约设置：</span>
                    {{ row.methodParam?.approxParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">质控设置：</span>
                    {{ row.methodParam?.qcParamsName }}
                  </span>
                  <span>
                    <span class="!font-bold">光谱带宽(nm)：</span>
                    {{ row.methodParam?.spectralBandwidth || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">响应时间(秒)：</span>
                    {{ row.methodParam?.responseTime || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">换灯波长(nm)：</span>
                    {{ row.methodParam?.changeLampWaveLength || '-' }}
                  </span>
                </template>
                <template v-else-if="measureType === '光谱扫描'">
                  <span>
                    <span class="!font-bold">光度模式：</span>
                    {{ getLuminosityName(row.methodParam.luminosity) }}
                  </span>
                  <span>
                    <span class="!font-bold">起始波长(nm)：</span>
                    {{ row.methodParam?.startWaveLength || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">停止波长(nm)：</span>
                    {{ row.methodParam?.endWaveLength || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">扫描间隔(秒)：</span>
                    {{ row.methodParam?.waveLengthInterval || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">重复模式：</span>
                    {{ row.methodParam?.repetitionPattern || '-' }}
                  </span>
                  <template v-if="row.methodParam?.repetitionPattern === '单池重复'">
                    <span>
                      <span class="!font-bold">重复次数：</span>
                      {{ row.methodParam?.repetitionTime || '0' }}次
                    </span>
                    <span>
                      <span class="!font-bold">时间间隔：</span>
                      {{ row.methodParam?.timeInterval || '0' }}秒
                    </span>
                  </template>
                  <span>
                    <span class="!font-bold">光谱带宽(nm)：</span>
                    {{ row.methodParam?.spectralBandwidth || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">扫描速度：</span>
                    {{ getScanSpeedName(row.methodParam?.scanSpeed) }}
                  </span>
                  <span>
                    <span class="!font-bold">换灯波长(nm)：</span>
                    {{ row.methodParam?.changeLampWaveLength || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">阶梯校正：</span>
                    {{ row.methodParam?.ladderCorrection ? '开启' : '关闭' }}
                  </span>
                  <span>
                    <span class="!font-bold">能量灯：</span>
                    {{ row.methodParam?.energyLampName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">增益：</span>
                    {{ row.methodParam?.gain || '-' }}
                  </span>
                </template>
                <template v-else-if="measureType === '时间扫描'">
                  <span>
                    <span class="!font-bold">光度模式：</span>
                    {{ getLuminosityName(row.methodParam.luminosity) }}
                  </span>
                  <span>
                    <span class="!font-bold">波长值(nm)：</span>
                    {{ row.methodParam?.waveLength || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold"
                      >扫描总时长({{
                        row.methodParam?.scanUnit == 0
                          ? '分'
                          : row.methodParam?.scanUnit == 1
                            ? '秒'
                            : ''
                      }})：</span
                    >
                    {{ row.methodParam?.scanTime || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">时间间隔(秒)：</span>
                    {{ row.methodParam?.intervalTime || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">扫描总个数：</span>
                    {{ row.methodParam?.totalNumber || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">多联池模式：</span>
                    {{
                      row.methodParam?.multiPoolMode == 0
                        ? '顺序单池连续采样'
                        : row.methodParam?.multiPoolMode == 1
                          ? '循环多池交替采样'
                          : '-'
                    }}
                  </span>
                  <span>
                    <span class="!font-bold">光谱带宽(nm)：</span>
                    {{ row.methodParam?.spectralBandwidth || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">响应时间(秒)：</span>
                    {{ row.methodParam?.responseTime || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">换灯波长(nm)：</span>
                    {{ row.methodParam?.changeLampWaveLength || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">能量灯：</span>
                    {{ row.methodParam?.energyLampName || '-' }}
                  </span>
                  <span>
                    <span class="!font-bold">增益：</span>
                    {{ row.methodParam?.gain || '-' }}
                  </span>
                </template>
              </div>
            </template>
            <template #active="{ row }">
              <text
                class="cursor-pointer !mr-[10px]"
                :style="{ color: primaryColor }"
                @click="applyMethodSimple(row)"
                >应用</text
              >
              <!-- <text class="cursor-pointer" :style="{ color: primaryColor }">转换成向导方法</text> -->
            </template>
          </vxeTable>
        </div>
      </div></template
    >
  </uvModal>
</template>
<script lang="ts" setup>
import { lumneSearchMethodButton, searchMethodSpectrum, searchMethodButtonTime } from '@/api'
const { primaryColor } = useAppStore()
const props = defineProps({
  modelValue: Boolean,
  measureType: {
    type: String,
    default: '光度测量',
  },
})
const emit = defineEmits(['update:modelValue', 'update:apply'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const tableRef = ref()
watch(
  () => props.measureType,
  () => {
    tableRef.value.gridRef.clearRowExpand()
  },
)

const search = ref('')
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
}
const tableOptions = ref({
  height: '100%',
  loading: false,
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  // height: '1100px',
  columns: [
    {
      type: 'expand',
      width: 60,
      slots: { content: 'expandContent' },
    },
    {
      field: 'methodName',
      title: '方法名称',
    },
    {
      field: 'methodCreateTime',
      title: '保存时间',
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      width: '180px',
      slots: {
        default: 'active',
      },
    },
  ],
  data: [] as any[],
})

const fetchData = async () => {
  tableOptions.value.loading = true
  const api =
    props.measureType === '光谱扫描'
      ? searchMethodSpectrum
      : props.measureType === '时间扫描'
        ? searchMethodButtonTime
        : lumneSearchMethodButton
  const { code, data } = await api({
    measureType: props.measureType,
    methodName: search.value,
    pageNum: tableOptions.value.pagerConfig.currentPage,
    pageSize: tableOptions.value.pagerConfig.pageSize,
  })
  if (code === 200) {
    const nameMap: Record<string, string> = {
      insert_zero: '插入零点',
      force_zero: '强制过零点',
    }
    tableOptions.value.data =
      data.records && data.records.length
        ? data.records.map((item: any) => ({
            ...item,
            methodParam: {
              ...item.methodParam,
              waveLengthName:
                props.measureType === '时间扫描'
                  ? item.methodParam?.waveLength
                  : item.methodParam?.waveLength && item.methodParam?.waveLength.length
                    ? item.methodParam?.waveLength.join(',')
                    : '-',
              waveLengthParamsName:
                item.methodParam?.waveLengthParams && item.methodParam?.waveLengthParams.length
                  ? item.methodParam?.waveLengthParams.join(',')
                  : '-',
              curveCoefficientName:
                item.methodParam?.curveCoefficient && item.methodParam?.curveCoefficient.length
                  ? item.methodParam?.curveCoefficient.join(',')
                  : '-',
              sampleInputParamsName:
                item.methodParam?.sampleInputParams && item.methodParam?.sampleInputParams.length
                  ? item.methodParam?.sampleInputParams
                      .map(
                        (param: any) =>
                          `标题：${param.paramName || '-'}  单位：${param.unit || '-'}  标识：${param.resultIdentity || '-'}`,
                      )
                      .join('；')
                  : '-',
              resultParamsName:
                item.methodParam?.resultParams && item.methodParam?.resultParams.length
                  ? item.methodParam?.resultParams
                      .map(
                        (param: any) =>
                          `标题：${param.resultName || '-'}  单位：${param.unit || '-'}  标识：${param.resultIdentity || '-'}  公式：${param.formulaText || '-'}`,
                      )
                      .join('；')
                  : '-',
              approxParamsName:
                item.methodParam?.approxParams && item.methodParam?.approxParams.length
                  ? item.methodParam?.approxParams
                      .map(
                        (param: any) =>
                          `${param.resultIdentity}${param.roundingCondition}  ${param.roundingType}${param.decimalPlaces}`,
                      )
                      .join('；')
                  : '-',
              qcParamsName:
                item.methodParam?.qcParams && item.methodParam?.qcParams.length
                  ? item.methodParam?.qcParams
                      .map(
                        (param: any) =>
                          `${param.controlType} Abs${param.controlFormula} ${param.overLimitOperation}`,
                      )
                      .join('；')
                  : '-',
              zeroMethodName:
                item.methodParam?.zeroMethod && item.methodParam?.zeroMethod.length
                  ? item.methodParam?.zeroMethod
                      .map((method: any) => nameMap[method] || method)
                      .join(',')
                  : '-',
            },
          }))
        : []
    tableOptions.value.pagerConfig.total = data.total
  }
  tableOptions.value.loading = false
  tableRef.value.gridRef.clearRowExpand()
}

const getLuminosityName = (luminosity: any) => {
  const data: any = {
    1: 'Abs',
    2: 'T%',
    3: 'Es',
    4: 'Er',
  }
  return luminosity ? data[luminosity] : '-'
}

const getScanSpeedName = (scanSpeed: any) => {
  const data: any = {
    0: '慢速',
    1: '中速',
    2: '快速',
    3: '极快',
  }
  return scanSpeed ? data[scanSpeed] : '-'
}

const applyMethodSimple = (row: any) => {
  emit('update:apply', row.methodParam)
  // else if (props.measureType === '光谱扫描') {
  //   if (saveStatus.value.spectral) {
  //     tipVisual.value = true
  //   } else {
  //     createDraftButtonFun()
  //   }
  // } else if (props.measureType === '时间扫描') {
  //   if (saveStatus.value.time) {
  //     tipVisual.value = true
  //   } else {
  //     createDraftButtonFun()
  //   }
  // }
}

defineExpose({
  fetchData,
})

onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped></style>
