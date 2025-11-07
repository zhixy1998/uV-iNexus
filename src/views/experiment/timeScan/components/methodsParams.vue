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
        <div class="flex gap-4">
          <uvHasIconBtn content="选择方法" @click.stop="findMethods"> </uvHasIconBtn>
          <!-- <uvHasIconBtn content="创建方法" @click.stop="handleEditParams('add')"> </uvHasIconBtn> -->
          <uvHasIconBtn content="修改参数" @click.stop="handleEditParams('edit')"> </uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <uvDescriptions
          :groups="[
            {
              title: '基本信息',
              items: [
                { label: '方法名称', value: methodsParams.methodName, width: '50%' },
                {
                  label: '参考标准',
                  value: methodsParams.referenceStandardName,
                  width: '50%',
                },
              ],
            },
            {
              title: '测量参数',
              items: [
                {
                  label: '测量波长',
                  value: methodsParams.waveLength ? methodsParams.waveLength + 'nm' : '-',
                  width: '100%',
                },
              ],
            },
            {
              title: '重复模式',
              items: [
                // { label: '自动重复', value: methodsParams.repetitionTime },
                {
                  label: '时间间隔',
                  value: methodsParams.intervalTime ? methodsParams.intervalTime + '秒' : '-',
                },
                // { label: '统计内容', value: 'SD,RSD,平均值' },
                {
                  label: '多联池',
                  value:
                    methodsParams.multiPoolMode === '0'
                      ? '顺序单池连续采样'
                      : methodsParams.multiPoolMode === '1'
                        ? '循环多池交替采样'
                        : '-',
                  width: '100%',
                },
              ],
            },
            {
              title: '仪器参数',
              items: [
                {
                  label: '响应时间',
                  value: methodsParams.responseTime ? methodsParams.responseTime + '秒' : '-',
                },
                {
                  label: '光谱带宽',
                  value: methodsParams.spectralBandwidth
                    ? methodsParams.spectralBandwidth + 'nm'
                    : '-',
                },
                {
                  label: '换灯波长',
                  value: methodsParams.changeLampWaveLength
                    ? methodsParams.changeLampWaveLength + 'nm'
                    : '-',
                },
              ],
            },
          ]"
        />
      </template>
    </uvCollapseRightSlot>
    <projectDetail
      v-model="projectDetailVisible"
      v-if="projectDetailVisible"
      :project="{ projectId: props.projectId, projectName: props.projectName }"
      :meaturesType="`时间扫描`"
      @useThisMethods="useThisMethods"
    />
    <editParams
      v-model="editParamsVisible"
      v-if="editParamsVisible"
      :addOrEdit="addOrEdit"
      :methodsParams="methodsParams"
      @getMethodId="getMethodParams"
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
import { reactive, ref, watch } from 'vue'

import { getTimeMethodParameter, useTimeMethodToTest } from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvDescriptions from '@/components/uvDescriptions/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import { useAppStore } from '@/stores'
import projectDetail from '@/views/experiment/experimentTest/components/projectDetail.vue'

import editParams from './editParams.vue'
const activeKey = ref<string[]>(['1'])
const value = ref('')
const projectDetailVisible = ref(false)
const saveMethodsVisual = ref(false)
const emits = defineEmits(['methodId', 'changeMethodsTask'])
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
const defaultFormState = {
  measureType: 'timeScan',
  methodName: '',
  gain: '0',
  scanTime: '',
  scanUnit: '',
  energyLamp: '',
  waveLength: '',
  totalNumber: '',
  baselineData: {},
  intervalTime: '',
  responseTime: '',
  multiPoolMode: '',
  spectralBandwidth: '',
  changeLampWaveLength: '',
  preProcessParameters: [],
  referenceStandardName: '',
}
const methodsParams = reactive(defaultFormState)
const findMethods = () => {
  projectDetailVisible.value = true
}
const addOrEdit = ref('edit')
const editParamsVisible = ref(false)
const handleEditParams = (type: string) => {
  addOrEdit.value = type
  editParamsVisible.value = true
}
const appStore = useAppStore()
const methodParameterFun = async (methodId: string) => {
  const { code, data } = await getTimeMethodParameter({ methodId: methodId })
  if (code === 200) {
    Object.assign(methodsParams, data)
    appStore.setLuminosity(
      {
        1: 'Abs',
        2: 'T%',
        3: 'Es',
        4: 'Er',
      }[data.luminosity as string] as string,
    )
    emits('methodId', code === 200 ? data : '')
  }
}
// 保存成新方法的时候获取方法参数
const getMethodParams = (methodId: string) => {
  emits('changeMethodsTask', { methodId: methodId })
  methodParameterFun(methodId)
}
const useThisMethods = async (messageInfo: any) => {
  const { code, data } = await useTimeMethodToTest({ methodId: messageInfo.id })
  if (code === 200) {
    emits('changeMethodsTask', data)
  }
  methodParameterFun(messageInfo.id)
}
watch(
  () => props.methodId,
  (newValue) => {
    if (newValue) methodParameterFun(newValue)
  },
)
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
