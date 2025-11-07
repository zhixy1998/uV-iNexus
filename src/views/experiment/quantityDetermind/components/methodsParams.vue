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
          <uvHasIconBtn content="选择方法" @click.stop="findMethods"></uvHasIconBtn>
          <uvHasIconBtn content="修改参数" @click.stop="handleEditParams('edit')"></uvHasIconBtn>
        </div>
      </template>
      <template #slot-content>
        <uvDescriptions :groups="descriptionsGroups" />
      </template>
    </uvCollapseRightSlot>
    <projectDetailVue
      v-model="projectDetailVisible"
      v-if="projectDetailVisible"
      :project="{ projectId: projectDetail.projectId, projectName: projectDetail.projectName }"
      @useThisMethods="useThisMethods"
      :meaturesType="`定量测定`"
    />
    <editParams
      v-model="editParamsVisible"
      v-if="editParamsVisible"
      :addOrEdit="addOrEdit"
      :methodsParams="methodsParams"
      @handle-ok="findParams"
      :projectId="projectDetail.projectId"
    />
    <!-- <uvModal v-model="saveMethodsVisual" size="smail" title="保存方法">
      <template #content>
        <div class="flex items-center">
          <span class="w-25">请输入新方法名</span>
          <a-input v-model:value="value" class="!w-xs !m-2" />
        </div>
      </template>
    </uvModal> -->
  </section>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'

import { getQuantityMethodParam } from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvDescriptions from '@/components/uvDescriptions/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import projectDetailVue from '@/views/experiment/experimentTest/components/projectDetail.vue'

import editParams from './editParams.vue'

const props = defineProps({
  projectDetail: {
    type: Object,
    default: () => ({
      taskId: '',
      taskName: '',
      methodId: '',
      methodName: '',
      projectId: '',
      projectName: '',
    }),
  },
})

// 折叠面板
const activeKey = ref<string[]>(['1'])

// 选择方法
const projectDetailVisible = ref(false)
const findMethods = () => {
  projectDetailVisible.value = true
}
const useThisMethods = (data: any) => {
  console.log('data', data)
  Object.assign(methodsParams, data)
}

// 修改参数
const methodsParams = reactive<any>({})
const editParamsVisible = ref(false)

const addOrEdit = ref('add')

const handleEditParams = (type: string) => {
  addOrEdit.value = type
  editParamsVisible.value = true
}

// 保存方法
// const saveMethodsVisual = ref(false)
// const value = ref('')
// const handleSaveMethods = () => {
//   saveMethodsVisual.value = true
// }

// 表格
const descriptionsGroups = ref<any>([])
const findParams = async () => {
  const { code, data } = await getQuantityMethodParam({ methodId: props.projectDetail?.methodId })
  if (code === 200) {
    Object.assign(methodsParams, data)
    const arr = [
      {
        title: '基本信息',
        items: [
          { label: '方法名称', value: methodsParams.methodName || '-', width: '50%' },
          { label: '参考标准', value: methodsParams.referenceStandardName || '-', width: '50%' },
        ],
      },
      {
        title: '测量参数',
        items:
          data?.waveLength && data?.waveLength.length
            ? data?.waveLength
                .map((item: string, index: number) => ({
                  label: '测量波长' + (index + 1),
                  value: `${item}nm`,
                  width: '100%',
                }))
                .concat([
                  {
                    label: '微分方式',
                    value: methodsParams?.differentialModeName || '-',
                    width: '100%',
                  },
                ])
            : [
                {
                  label: '微分方式',
                  value: methodsParams?.differentialModeName || '-',
                  width: '100%',
                },
              ],
      },
      {
        title: '曲线方式',
        items: [
          { label: '曲线类型', value: methodsParams?.curveTypeName || '-' },
          { label: '方程类型', value: methodsParams?.equationTypeName || '-' },
          {
            label: '系数方式',
            value: methodsParams?.coefficientModeName,
          },
          {
            label: '零点方式',
            value: methodsParams?.zeroMethodName || '-',
          },
        ],
      },
      {
        title: '重复模式',
        items: [
          { label: '自动重复', value: methodsParams?.repeatMode || '-' },
          { label: '时间间隔', value: methodsParams?.timeInterval || '-' },
          {
            label: '统计内容',
            value:
              methodsParams?.statisticalContent && methodsParams?.statisticalContent.length
                ? methodsParams?.statisticalContent.join(',')
                : '-',
          },
        ],
      },
      {
        title: '仪器参数',
        items: [
          { label: '响应时间', value: methodsParams?.responseTime || '-' },
          {
            label: '光谱带宽',
            value: methodsParams.spectralBandwidth ? `${methodsParams?.spectralBandwidth}nm` : '-',
          },
          {
            label: '换灯波长',
            value: methodsParams.changeLampWaveLength
              ? `${methodsParams?.changeLampWaveLength}nm`
              : '-',
          },
        ],
      },
    ]
    if (methodsParams.repeatMode === '单池重复') {
      descriptionsGroups.value = arr
    } else {
      arr[3].items = [{ label: '自动重复', value: methodsParams.repeatMode }]
      descriptionsGroups.value = arr
    }
  }
}

watch(
  () => props.projectDetail.methodId,
  (val) => {
    if (val) {
      findParams()
    }
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
