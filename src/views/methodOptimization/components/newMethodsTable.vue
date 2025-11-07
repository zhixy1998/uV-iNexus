<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="!h-full">
    <a-input-search
      v-model:value="search"
      placeholder="方法名称"
      class="!w-[200px]"
      @search="fetchData"
    />
    <div class="!mt-[10px]">
      <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
        <template #expandContent="{ row }">
          <div class="!px-8 !py-4 flex flex-col gap-x-5 gap-y-2">
            <template v-if="measureType === '光度测量'">
              <span>
                <span class="!font-bold">光度模式：</span>
                {{ row.measurementParamInfo?.luminosityName || '-' }}
              </span>
              <span>
                <span class="!font-bold">波长值：</span>
                {{ row.measurementParamInfo?.waveLengthName }}
              </span>
              <span>
                <span class="!font-bold">重复模式：</span>
                {{ row.measurementParamInfo?.repetitionPattern || '-' }}
              </span>
              <template v-if="row.measurementParamInfo?.repetitionPattern === '单池重复'">
                <span>
                  <span class="!font-bold">重复次数：</span>
                  {{ row.measurementParamInfo?.repetitionTime || '0' }}次
                </span>
                <span>
                  <span class="!font-bold">时间间隔：</span>
                  {{ row.measurementParamInfo?.timeInterval || '0' }}秒
                </span>
              </template>
              <span>
                <span class="!font-bold">样品输入参数：</span>
                {{ row.measurementParamInfo?.sampleInputParamsName }}
              </span>
              <span>
                <span class="!font-bold">待计算结果：</span>
                {{ row.measurementParamInfo?.resultParamsName }}
              </span>
              <span>
                <span class="!font-bold">修约设置：</span>
                {{ row.measurementParamInfo?.approxParamsName }}
              </span>
              <span>
                <span class="!font-bold">质控设置：</span>
                {{ row.measurementParamInfo?.qcParamsName }}
              </span>
              <span>
                <span class="!font-bold">光谱带宽(nm)：</span>
                {{ row.measurementParamInfo?.spectralBandwidth || '-' }}
              </span>
              <span>
                <span class="!font-bold">响应时间(秒)：</span>
                {{ row.measurementParamInfo?.responseTime || '-' }}
              </span>
              <span>
                <span class="!font-bold">换灯波长(nm)：</span>
                {{ row.measurementParamInfo?.changeLampWaveLength || '-' }}
              </span>
              <!-- Abs和T%不显示能量灯和增益 -->
              <template
                v-if="
                  row.measurementParamInfo &&
                  row.measurementParamInfo.luminosity !== '1' &&
                  row.measurementParamInfo.luminosity !== '2'
                "
              >
                <span>
                  <span class="!font-bold">能量灯：</span>
                  {{ row.measurementParamInfo?.energyLampName || '-' }}
                </span>
                <span>
                  <span class="!font-bold">增益：</span>
                  {{ row.measurementParamInfo?.gain || '-' }}
                </span>
              </template>
            </template>
            <template v-else-if="measureType === '定量测定'">
              <span>
                <span class="!font-bold">波长值(nm)：</span>
                {{ row.measurementParamInfo?.waveLengthName }}
              </span>
              <span>
                <span class="!font-bold">波长参数：</span>
                {{ row.measurementParamInfo?.waveLengthParamsName }}
              </span>
              <span>
                <span class="!font-bold">波长公式：</span>
                {{ row.measurementParamInfo?.waveLengthFormula || '-' }}
              </span>
              <span>
                <span class="!font-bold">微分方式：</span>
                {{ row.measurementParamInfo?.differentialModeName || '-' }}
              </span>
              <span>
                <span class="!font-bold">曲线类型：</span>
                {{ row.measurementParamInfo?.curveTypeName || '-' }}
              </span>
              <span>
                <span class="!font-bold">方程类型：</span>
                {{ row.measurementParamInfo?.equationTypeName || '-' }}
              </span>
              <span>
                <span class="!font-bold">曲线公式：</span>
                {{ row.measurementParamInfo?.curveFormula || '-' }}
              </span>
              <span>
                <span class="!font-bold">系数方式：</span>
                {{ row.measurementParamInfo?.coefficientModeName || '-' }}
              </span>
              <span>
                <span class="!font-bold">零点方式：</span>
                {{ row.measurementParamInfo?.zeroMethodName || '-' }}
              </span>
              <span>
                <span class="!font-bold">推荐C(mg/L)：</span>
                {{ row.measurementParamInfo?.curveCoefficientName || '-' }}
              </span>
              <span>
                <span class="!font-bold">重复模式：</span>
                {{ row.measurementParamInfo?.repeatMode || '-' }}
              </span>
              <template v-if="row.measurementParamInfo?.repeatMode === '单池重复'">
                <span>
                  <span class="!font-bold">重复次数：</span>
                  {{ row.measurementParamInfo?.repeatCount || '0' }}次
                </span>
                <span>
                  <span class="!font-bold">时间间隔：</span>
                  {{ row.measurementParamInfo?.timeInterval || '0' }}秒
                </span>
              </template>
              <span>
                <span class="!font-bold">拟合结果：</span>
                {{
                  row.measurementParamInfo?.samplePoolWay == 1
                    ? '浓度'
                    : row.measurementParamInfo?.samplePoolWay == 0
                      ? '质量'
                      : '-'
                }}
              </span>
              <span>
                <span class="!font-bold">单位：</span>
                {{ row.measurementParamInfo?.dw || '-' }}
              </span>
              <span>
                <span class="!font-bold">样品输入参数：</span>
                {{ row.measurementParamInfo?.sampleInputParamsName }}
              </span>
              <span>
                <span class="!font-bold">待计算结果：</span>
                {{ row.measurementParamInfo?.resultParamsName }}
              </span>
              <span>
                <span class="!font-bold">修约设置：</span>
                {{ row.measurementParamInfo?.approxParamsName }}
              </span>
              <span>
                <span class="!font-bold">质控设置：</span>
                {{ row.measurementParamInfo?.qcParamsName }}
              </span>
              <span>
                <span class="!font-bold">光谱带宽(nm)：</span>
                {{ row.measurementParamInfo?.spectralBandwidth || '-' }}
              </span>
              <span>
                <span class="!font-bold">响应时间(秒)：</span>
                {{ row.measurementParamInfo?.responseTime || '-' }}
              </span>
              <span>
                <span class="!font-bold">换灯波长(nm)：</span>
                {{ row.measurementParamInfo?.changeLampWaveLength || '-' }}
              </span>
            </template>
            <template v-else-if="measureType === '光谱扫描'">
              <span>
                <span class="!font-bold">光度模式：</span>
                {{ getLuminosityName(row.measurementParamInfo.luminosity) }}
              </span>
              <span>
                <span class="!font-bold">起始波长(nm)：</span>
                {{ row.measurementParamInfo?.startWaveLength || '-' }}
              </span>
              <span>
                <span class="!font-bold">停止波长(nm)：</span>
                {{ row.measurementParamInfo?.endWaveLength || '-' }}
              </span>
              <span>
                <span class="!font-bold">扫描间隔(秒)：</span>
                {{ row.measurementParamInfo?.waveLengthInterval || '-' }}
              </span>
              <span>
                <span class="!font-bold">重复模式：</span>
                {{ row.measurementParamInfo?.repetitionPattern || '-' }}
              </span>
              <template v-if="row.measurementParamInfo?.repetitionPattern === '单池重复'">
                <span>
                  <span class="!font-bold">重复次数：</span>
                  {{ row.measurementParamInfo?.repetitionTime || '0' }}次
                </span>
                <span>
                  <span class="!font-bold">时间间隔：</span>
                  {{ row.measurementParamInfo?.timeInterval || '0' }}秒
                </span>
              </template>
              <span>
                <span class="!font-bold">光谱带宽(nm)：</span>
                {{ row.measurementParamInfo?.spectralBandwidth || '-' }}
              </span>
              <span>
                <span class="!font-bold">扫描速度：</span>
                {{ getScanSpeedName(row.measurementParamInfo?.scanSpeed) }}
              </span>
              <span>
                <span class="!font-bold">换灯波长(nm)：</span>
                {{ row.measurementParamInfo?.changeLampWaveLength || '-' }}
              </span>
              <span>
                <span class="!font-bold">阶梯校正：</span>
                {{ row.measurementParamInfo?.ladderCorrection ? '开启' : '关闭' }}
              </span>
              <span>
                <span class="!font-bold">能量灯：</span>
                {{ row.measurementParamInfo?.energyLampName || '-' }}
              </span>
              <span>
                <span class="!font-bold">增益：</span>
                {{ row.measurementParamInfo?.gain || '-' }}
              </span>
            </template>
            <template v-else-if="measureType === '时间扫描'">
              <span>
                <span class="!font-bold">光度模式：</span>
                {{ getLuminosityName(row.measurementParamInfo.luminosity) }}
              </span>
              <span>
                <span class="!font-bold">波长值(nm)：</span>
                {{ row.measurementParamInfo?.waveLength || '-' }}
              </span>
              <span>
                <span class="!font-bold"
                  >扫描总时长({{
                    row.measurementParamInfo?.scanUnit == 0
                      ? '分'
                      : row.measurementParamInfo?.scanUnit == 1
                        ? '秒'
                        : ''
                  }})：</span
                >
                {{ row.measurementParamInfo?.scanTime || '-' }}
              </span>
              <span>
                <span class="!font-bold">时间间隔(秒)：</span>
                {{ row.measurementParamInfo?.intervalTime || '-' }}
              </span>
              <span>
                <span class="!font-bold">扫描总个数：</span>
                {{ row.measurementParamInfo?.totalNumber || '-' }}
              </span>
              <span>
                <span class="!font-bold">多联池模式：</span>
                {{
                  row.measurementParamInfo?.multiPoolMode == 0
                    ? '顺序单池连续采样'
                    : row.measurementParamInfo?.multiPoolMode == 1
                      ? '循环多池交替采样'
                      : '-'
                }}
              </span>
              <span>
                <span class="!font-bold">光谱带宽(nm)：</span>
                {{ row.measurementParamInfo?.spectralBandwidth || '-' }}
              </span>
              <span>
                <span class="!font-bold">响应时间(秒)：</span>
                {{ row.measurementParamInfo?.responseTime || '-' }}
              </span>
              <span>
                <span class="!font-bold">换灯波长(nm)：</span>
                {{ row.measurementParamInfo?.changeLampWaveLength || '-' }}
              </span>
              <span>
                <span class="!font-bold">能量灯：</span>
                {{ row.measurementParamInfo?.energyLampName || '-' }}
              </span>
              <span>
                <span class="!font-bold">增益：</span>
                {{ row.measurementParamInfo?.gain || '-' }}
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
          <text
            class="cursor-pointer !mr-[10px]"
            :style="{ color: primaryColor }"
            @click="handleEdit(row)"
            >重命名</text
          >
          <text class="cursor-pointer" :style="{ color: primaryColor }" @click="handleDelete(row)"
            >删除</text
          >
          <!-- <text class="cursor-pointer" :style="{ color: primaryColor }">转换成向导方法</text> -->
        </template>
      </vxeTable>
    </div>
    <uvModal
      v-model="modelValue"
      title="重命名"
      width="40%"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    >
      <template #content>
        <uvForm ref="uvFormRef" :formState="ruleForm" :rules="rules" :formOptions="formOptions" />
      </template>
    </uvModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores'
import { conciseQueryHistoryMethod, conciseUpdateMethod, simpleModeDelMethod } from '@/api'
import type { formOptionsType } from '@/types/common'
import { Modal, notification } from 'ant-design-vue'

const { primaryColor } = useAppStore()

const props = defineProps({
  measureType: {
    type: String,
    default: '光度测量',
  },
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
      field: 'methodUseTime',
      title: '最新应用时间',
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
const handleDelete = (row: any) => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除该历史方法吗?',
    onOk: () => {
      simpleModeDelMethodFun(row.id)
    },
    okText: '确定', // 自定义确定按钮文字
    cancelText: '取消',
  })
}
const simpleModeDelMethodFun = async (methodId: string) => {
  const { code } = await simpleModeDelMethod({ methodId })
  if (code === 200) {
    notification.success({
      message: '成功',
      description: '删除成功',
      duration: 3,
    })
    fetchData()
  }
}
const fetchData = async () => {
  tableOptions.value.loading = true
  const { code, data } = await conciseQueryHistoryMethod({
    methodType: props.measureType,
    selectKey: search.value,
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
            measurementParamInfo: {
              ...item.measurementParamInfo,
              waveLengthName:
                props.measureType === '时间扫描'
                  ? item.measurementParamInfo?.waveLength
                  : item.measurementParamInfo?.waveLength &&
                      item.measurementParamInfo?.waveLength.length
                    ? item.measurementParamInfo?.waveLength.join(',')
                    : '-',
              waveLengthParamsName:
                item.measurementParamInfo?.waveLengthParams &&
                item.measurementParamInfo?.waveLengthParams.length
                  ? item.measurementParamInfo?.waveLengthParams.join(',')
                  : '-',
              curveCoefficientName:
                item.measurementParamInfo?.curveCoefficient &&
                item.measurementParamInfo?.curveCoefficient.length
                  ? item.measurementParamInfo?.curveCoefficient.join(',')
                  : '-',
              sampleInputParamsName:
                item.measurementParamInfo?.sampleInputParams &&
                item.measurementParamInfo?.sampleInputParams.length
                  ? item.measurementParamInfo?.sampleInputParams
                      .map(
                        (param: any) =>
                          `标题：${param.paramName || '-'}  单位：${param.unit || '-'}  标识：${param.resultIdentity || '-'}`,
                      )
                      .join('；')
                  : '-',
              resultParamsName:
                item.measurementParamInfo?.resultParams &&
                item.measurementParamInfo?.resultParams.length
                  ? item.measurementParamInfo?.resultParams
                      .map(
                        (param: any) =>
                          `标题：${param.resultName || '-'}  单位：${param.unit || '-'}  标识：${param.resultIdentity || '-'}  公式：${param.formulaText || '-'}`,
                      )
                      .join('；')
                  : '-',
              approxParamsName:
                item.measurementParamInfo?.approxParams &&
                item.measurementParamInfo?.approxParams.length
                  ? item.measurementParamInfo?.approxParams
                      .map((param: any) => `${param.resultIdentityName}的修约`)
                      .join('；')
                  : '-',
              qcParamsName:
                item.measurementParamInfo?.qcParams && item.measurementParamInfo?.qcParams.length
                  ? item.measurementParamInfo?.qcParams
                      .map((param: any) => `${param.controlDesc}`)
                      .join('；')
                  : '-',
              zeroMethodName:
                item.measurementParamInfo?.zeroMethod &&
                item.measurementParamInfo?.zeroMethod.length
                  ? item.measurementParamInfo?.zeroMethod
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

// 重命名
const ruleForm = reactive<any>({
  methodName: '',
  methodId: '',
})
const modelValue = ref(false)
const uvFormRef = ref()
const rules = ref({
  methodName: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '方法名称',
    props: 'methodName',
  },
])
const showModal = (row: any) => {
  ruleForm.methodName = row.methodName
  ruleForm.methodId = row.id
  modelValue.value = true
}
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    const { code } = await conciseUpdateMethod({
      methodId: ruleForm.methodId,
      methodName: ruleForm.methodName,
    })
    if (code === 200) {
      fetchData()
      modelValue.value = false
      notification.success({
        message: '成功',
        description: '修改成功',
        duration: 3,
      })
    }
  }
}
const handleCancel = () => {
  uvFormRef.value?.resetForm()
}
const handleEdit = (row: any) => {
  showModal(row)
}

// 应用
const emit = defineEmits(['update:apply'])
const applyMethodSimple = (row: any) => {
  emit('update:apply', row.id, row.measurementParamInfo)
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
<style scoped lang="less">
:deep(.vxe-grid--table-wrapper) {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
