<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot :parentActiveKey="activeKey" title="方法参数">
      <template #slot-header>
        <div class="flex">
          <uvHasIconBtn content="选择方法" class="!mr-[30px]" @click.stop="findMethods">
          </uvHasIconBtn>
          <!-- <uvHasIconBtn content="创建方法" @click.stop="handleEditParams('add')"> </uvHasIconBtn> -->
          <uvHasIconBtn content="修改参数" @click.stop="handleEditParams('edit')"></uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <uvDescriptions :groups="descriptOptions" />
      </template>
    </uvCollapseRightSlot>
    <projectDetail
      v-model="projectDetailVisible"
      v-if="projectDetailVisible"
      :project="{ projectId: props.projectId, projectName: props.projectName }"
      :meaturesType="`光度测量`"
      @useThisMethods="useThisMethods"
    />
    <editParams
      v-model="editParamsVisible"
      v-if="editParamsVisible"
      :addOrEdit="addOrEdit"
      :methodsParams="methodsParams"
      @handle-ok="findParams"
      :projectId="projectId"
    />
    <uvModal v-model="saveMethodsVisual" size="smail" title="保存方法">
      <template #content>
        <div class="flex items-center">
          <span class="w-25">请输入新方法名</span>
          <a-input v-model:value="value" class="!w-xs !m-2" />
        </div>
      </template>
    </uvModal>
  </section>
</template>
<script lang="ts" setup>
import { method } from 'lodash-es'
import { onMounted, reactive, ref } from 'vue'

import { queryMethodParam } from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvDescriptions from '@/components/uvDescriptions/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import projectDetail from '@/views/experiment/experimentTest/components/projectDetail.vue'

import editParams from './editParams.vue'

const activeKey = ref<string[]>(['1'])
const value = ref('')
const projectDetailVisible = ref(false)
const saveMethodsVisual = ref(false)
const emits = defineEmits(['getDeal', 'changeMethodsTask'])
const props = defineProps({
  projectId: {
    type: String,
    default: '',
  },
  projectName: {
    type: String,
    default: '',
  },
  methodId: {
    type: String,
    default: '',
  },
})
watch(
  () => props.methodId,
  (val) => {
    setTimeout(() => {
      findParams(val)
    }, 500)
  },
)
const descriptOptions = ref<any>([])

const defaultFormState = {
  measureType: 'spectralScan',
  methodName: '',
  luminosity: '',
  luminosityName: '',
  startWaveLength: '',
  endWaveLength: '',
  waveLengthInterval: '',
  repetitionPattern: '',
  repetitionTime: '',
  timeInterval: '',
  spectralBandwidth: '',
  responseTime: '',
  changeLampWaveLength: '',
  energyLamp: '钨灯',
  gain: '0',
  referenceStandardName: '',
  statisticalContent: [],
  samplePoolWayName: '',
}
const methodsParams = reactive(defaultFormState)
const findMethods = () => {
  projectDetailVisible.value = true
}
const addOrEdit = ref('add')
const editParamsVisible = ref(false)
const handleEditParams = (type: string) => {
  addOrEdit.value = type
  editParamsVisible.value = true
}
const handleSaveMethods = () => {
  saveMethodsVisual.value = true
}
const useThisMethods = (data: any) => {
  emits('changeMethodsTask')
  findParams(data.id)
}
const waveList = ref([])
const findParams = async (methodsId: string) => {
  const { code, data } = await queryMethodParam({
    methodId: methodsId,
  })
  if (code === 200) {
    Object.assign(methodsParams, data)
    waveList.value =
      data.waveLength?.map((item: string, index: number) => {
        return {
          label: `测量波长${index + 1}`,
          value: `${item}nm`,
        }
      }) || []
    const arr = [
      {
        title: '基本信息',
        items: [
          { label: '方法名称', value: methodsParams.methodName, width: '100%' },
          { label: '参考标准', value: methodsParams.referenceStandardName, width: '100%' },
        ],
      },
      {
        title: '测量参数',
        items: [
          ...waveList.value,
          {
            label: '光度模式',
            value: methodsParams.luminosityName,
            width: '100%',
          },
        ],
      },
      {
        title: '重复模式',
        items: [
          {
            label: '自动重复',
            value: methodsParams.repetitionPattern,
            width: '100%',
          },
          {
            label: '时间间隔',
            value: methodsParams.timeInterval ? `${methodsParams.timeInterval}秒` : '-',
            width: '100%',
          },
          // {
          //   label: '统计内容',
          //   value: methodsParams.statisticalContent
          //     ? `${methodsParams.statisticalContent.join(',')}`
          //     : '-',
          //   width: '100%',
          // },
          // { label: '多联池', value: methodsParams.samplePoolWayName || '-', width: '100%' },
        ],
      },
      {
        title: '仪器参数',
        items: [
          {
            label: '响应时间',
            value: methodsParams.responseTime ? `${methodsParams.responseTime}秒` : '-',
            width: '100%',
          },
          {
            label: '光谱带宽',
            value: methodsParams.spectralBandwidth ? `${methodsParams.spectralBandwidth}nm` : '-',
            width: '100%',
          },
          {
            label: '换灯波长',
            value: methodsParams.changeLampWaveLength
              ? `${methodsParams.changeLampWaveLength}nm`
              : '-',
            width: '100%',
          },
        ],
      },
    ]
    if (methodsParams.repetitionPattern === '单池重复') {
      descriptOptions.value = arr
    } else {
      arr[2].items = [
        {
          label: '自动重复',
          value: methodsParams.repetitionPattern,
          width: '100%',
        },
      ]
      descriptOptions.value = arr
    }
    emits('getDeal', data.preProcessParameters)
  }
}

onMounted(() => {})
defineExpose({
  methodsParams,
})
</script>
<style lang="less" scoped>
.custom-card .ant-card-grid.head-item {
  text-align: center;
  background-color: #e9f1fc;
  font-weight: bold;
  color: #153471;
}

.custom-card {
  .ant-card-grid {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 24px;
    font-size: 14px;
    border: none;

    &:nth-child(even) {
      background-color: #fafafa;
    }
  }
}
</style>
