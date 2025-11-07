<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div style="line-height: 4.5" class="w-full md:w-auto">
    <a-form
      :model="formState"
      :label-col="labelCol"
      class="edit-model-form"
      :rules="formRules"
      :disabled="formDisabled"
      ref="formRef"
    >
      <div v-if="pageType === 'default'">
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">基本</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8" v-if="addOrEdit === 'edit'">
                <a-form-item label="方法名称" name="methodName">
                  <a-input v-model:value="formState.methodName" maxlength="256" showCount />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="参考标准" name="referenceStandardName">
                  <a-input
                    v-model:value="formState.referenceStandardName"
                    maxlength="256"
                    showCount
                  >
                    <template #suffix>
                      <SearchOutlined @click="() => (referenceStandardVisible = true)" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item
              :wrapperCol="{ span: 24 }"
              class="form-item-no-margin"
              label="参考后处理"
              name="preProcessParameters"
            >
              <uvTags
                title=""
                v-model:tags="formState.preProcessParameters"
                :disabled="formDisabled"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1"><span class="formTip">测量</span></a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="光度模式" name="luminosity">
                  <a-select
                    ref="select"
                    v-model:value="formState.luminosity"
                    :options="deviceStatusStore.methodsParamsRange.luminosity"
                    :field-names="{ label: 'paramName', value: 'paramValue' }"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item class="form-item-no-margin" label="波长值(nm)" name="waveLength">
                  <uvTags title="" v-model:tags="formState.waveLength" :disabled="formDisabled" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1"><span class="formTip">重复</span></a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="重复模式" name="repetitionPattern">
                  <a-select ref="select" v-model:value="formState.repetitionPattern">
                    <a-select-option value="单池重复">单池重复</a-select-option>
                    <a-select-option value="不重复">不重复</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="formState.repetitionPattern === '单池重复'">
                <a-form-item label="重复次数" name="repetitionTime">
                  <a-input-number
                    v-model:value="formState.repetitionTime"
                    :min="2"
                    :max="10"
                    :step="1"
                    :precision="0"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="formState.repetitionPattern === '单池重复'">
                <a-form-item label="时间间隔(秒)" name="timeInterval">
                  <a-input-number
                    class="!w-full"
                    v-model:value="formState.timeInterval"
                    :min="0"
                    :max="60"
                    :precision="1"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!--          <a-row :gutter="16" v-if="formState.repetitionPattern === '单池重复'">-->
            <!--            <a-col :span="8">-->
            <!--              <a-form-item class="form-item-no-margin" label="统计内容" name="statisticalContent">-->
            <!--                <a-checkbox-group v-model:value="formState.statisticalContent">-->
            <!--                  <a-checkbox value="平均值">平均值</a-checkbox>-->
            <!--                  <a-checkbox value="SD">SD</a-checkbox>-->
            <!--                  <a-checkbox value="RSD">RSD</a-checkbox>-->
            <!--                </a-checkbox-group>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--            <a-col :span="12">-->
            <!--              <a-form-item class="form-item-no-margin" label="样品池方式" name="samplePoolWay">-->
            <!--                <a-radio-group-->
            <!--                  v-model:value="formState.samplePoolWay"-->
            <!--                  :options="formOptions.yangpinchifang"-->
            <!--                />-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--          </a-row>-->
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">分析</span>
          </a-col>
          <a-col :span="23">
            <a-form-item label="输入参数" name="sampleInputParams">
              <uvTagsClickForm
                title=""
                v-model:tags="sampleInputParams"
                :customize="true"
                @addTags="customizeEvent('样品输入参数')"
                @tagClick="handleTagClick"
                :disabled="formDisabled"
              />
            </a-form-item>
            <a-form-item label="待计算结果" name="resultParams">
              <uvTagsClickForm
                title=""
                :dragDisabled="false"
                v-model:tags="resultParams"
                :customize="true"
                @addTags="customizeEvent('待计算结果')"
                @tagClick="handleTagClick"
                :disabled="formDisabled"
                @update:tags="updateResultParams"
              />
            </a-form-item>
            <a-form-item label="修约设置" name="approxParams">
              <uvTagsClickForm
                title=""
                v-model:tags="approxParams"
                :customize="true"
                @addTags="customizeEvent('修约设置')"
                @tagClick="handleTagClick"
                :disabled="formDisabled"
              />
            </a-form-item>
            <a-form-item class="form-item-no-margin" label="质控设置" name="qcParams">
              <uvTagsClickForm
                title=""
                v-model:tags="qcParams"
                :customize="true"
                @addTags="customizeEvent('质控设置')"
                @tagClick="handleTagClick"
                :disabled="formDisabled"
              />
            </a-form-item>
            <!-- <div class="flex items-center">
              <span class="w-22 flex-shrink-0">测量表格显示</span>
              <div class="flex !rounded-sm">
                <div
                  v-for="(item, index) in measureTableShow"
                  :key="`${index}div`"
                  class="text-white bg-[#153471] p-2 max-w-30 truncate"
                >
                  <a-tooltip>
                    <template #title>{{ item }}</template>
                    {{ item }}
                  </a-tooltip>
                </div>
              </div>
            </div> -->
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-3 !pt-6">
          <a-col :span="1"><span class="formTip">仪器</span></a-col>
          <a-col :span="15">
            <div class="lightline">
              <div
                class="lamp-container wulight"
                :class="{ lampShowBoder: formState.energyLamp === '0' }"
              >
                <uvLight
                  :brightness="formState.energyLamp === '0' ? Number(formState.gain) / 3 : 0"
                />
              </div>
              <div
                class="lamp-container chuanlight"
                :class="{ lampShowBoder: formState.energyLamp === '1' }"
              >
                <uvLight
                  color="#62ff3b"
                  :brightness="formState.energyLamp === '1' ? Number(formState.gain) / 3 : 0"
                />
              </div>
              <div
                class="lamp-container gonglight"
                :class="{ lampShowBoder: formState.energyLamp === '2' }"
              >
                <uvLight
                  color="#3afff5"
                  :brightness="formState.energyLamp === '2' ? Number(formState.gain) / 3 : 0"
                />
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <a-form-item label="光谱带宽(nm)" name="spectralBandwidth">
              <a-select
                ref="select"
                class="flex-1"
                v-model:value="formState.spectralBandwidth"
                :options="deviceStatusStore.methodsParamsRange.bandWidth"
                :field-names="{ label: 'paramName', value: 'paramValue' }"
              >
              </a-select>
            </a-form-item>
            <a-form-item label="响应时间(秒)" name="responseTime">
              <a-select
                ref="select"
                class="flex-1"
                v-model:value="formState.responseTime"
                :options="deviceStatusStore.methodsParamsRange.responseTime"
                :field-names="{ label: 'paramName', value: 'paramValue' }"
              >
              </a-select>
            </a-form-item>
            <a-form-item label="换灯波长(nm)" name="changeLampWaveLength">
              <a-input-number
                class="!w-full"
                v-model:value="formState.changeLampWaveLength"
                :min="290"
                :max="370"
                :precision="1"
              />
            </a-form-item>
            <a-form-item
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
              label="能量灯"
              name="energyLamp"
            >
              <a-select
                ref="select"
                v-model:value="formState.energyLamp"
                :options="deviceStatusStore.methodsParamsRange.lampType"
                :field-names="{ label: 'paramName', value: 'paramValue' }"
              >
              </a-select>
            </a-form-item>
            <a-form-item
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
              label="增益"
              name="gain"
            >
              <a-select
                ref="select"
                v-model:value="formState.gain"
                :options="deviceStatusStore.methodsParamsRange.gain"
                :field-names="{ label: 'paramName', value: 'paramValue' }"
              >
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div v-else class="relative">
        <div class="sticky right-1 top-1 float-end !text-red-400" v-show="isDataChanged">
          已修改
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">测量</span></a-row>
          <a-form-item label="光度模式" name="luminosity">
            <a-select
              ref="select"
              v-model:value="formState.luminosity"
              :options="deviceStatusStore.methodsParamsRange.luminosity"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="波长值(nm)" name="waveLength">
            <uvTags title="" v-model:tags="formState.waveLength" :disabled="formDisabled" />
          </a-form-item>
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">重复</span></a-row>
          <a-form-item label="重复模式" name="repetitionPattern">
            <a-select ref="select" v-model:value="formState.repetitionPattern">
              <a-select-option value="单池重复">单池重复</a-select-option>
              <a-select-option value="不重复">不重复</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="重复次数"
            name="repetitionTime"
            v-if="formState.repetitionPattern === '单池重复'"
          >
            <a-input-number
              v-model:value="formState.repetitionTime"
              :min="2"
              :max="10"
              :step="1"
              :precision="0"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item
            label="时间间隔(秒)"
            name="timeInterval"
            v-if="formState.repetitionPattern === '单池重复'"
          >
            <a-input-number
              class="!w-full"
              v-model:value="formState.timeInterval"
              :min="0"
              :max="60"
              :precision="1"
            />
          </a-form-item>
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">分析</span></a-row>
          <a-form-item label="输入参数" name="sampleInputParams">
            <uvTagsClickForm
              title=""
              v-model:tags="sampleInputParams"
              :customize="true"
              @addTags="customizeEvent('样品输入参数')"
              @tagClick="handleTagClick"
              :disabled="formDisabled"
            />
          </a-form-item>
          <a-form-item label="待计算结果" name="resultParams">
            <uvTagsClickForm
              title=""
              :dragDisabled="false"
              v-model:tags="resultParams"
              :customize="true"
              @addTags="customizeEvent('待计算结果')"
              @tagClick="handleTagClick"
              :disabled="formDisabled"
              @update:tags="updateResultParams"
            />
          </a-form-item>
          <a-form-item label="修约设置" name="approxParams">
            <uvTagsClickForm
              title=""
              v-model:tags="approxParams"
              :customize="true"
              @addTags="customizeEvent('修约设置')"
              @tagClick="handleTagClick"
              :disabled="formDisabled"
            />
          </a-form-item>
          <a-form-item label="质控设置" name="qcParams">
            <uvTagsClickForm
              title=""
              v-model:tags="qcParams"
              :customize="true"
              @addTags="customizeEvent('质控设置')"
              @tagClick="handleTagClick"
              :disabled="formDisabled"
            />
          </a-form-item>
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">仪器</span></a-row>
          <a-form-item label="光谱带宽(nm)" name="spectralBandwidth">
            <a-select
              ref="select"
              class="flex-1"
              v-model:value="formState.spectralBandwidth"
              :options="deviceStatusStore.methodsParamsRange.bandWidth"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="响应时间(秒)" name="responseTime">
            <a-select
              ref="select"
              class="flex-1"
              v-model:value="formState.responseTime"
              :options="deviceStatusStore.methodsParamsRange.responseTime"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="换灯波长(nm)" name="changeLampWaveLength">
            <a-input-number
              class="!w-full"
              v-model:value="formState.changeLampWaveLength"
              :min="290"
              :max="370"
              :precision="1"
            />
          </a-form-item>
          <a-form-item
            v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
            label="能量灯"
            name="energyLamp"
          >
            <a-select
              ref="select"
              v-model:value="formState.energyLamp"
              :options="deviceStatusStore.methodsParamsRange.lampType"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
            label="增益"
            name="gain"
          >
            <a-select
              ref="select"
              v-model:value="formState.gain"
              :options="deviceStatusStore.methodsParamsRange.gain"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
        </div>
      </div>
    </a-form>
    <sampleParams
      :computedParams="formState.waveLength"
      :inputParams="sampleInputParams"
      :sampleParams="samplesParmsTags"
      v-model="sampleVisual"
      v-if="sampleVisual"
      :modelTitle="sampleParamsTitle"
      measureType="光度测量"
      @sampleParamsChange="getParams"
    />
    <referenceStandard
      v-model="referenceStandardVisible"
      v-if="referenceStandardVisible"
      :condition="formState.referenceStandardName"
      @form-params="fillFormParams"
    />
    <approxParamsModel ref="approxParamsModelRef" @sampleParamsChange="getParams" />
    <qcParamsModel ref="qcParamsModelRef" @sampleParamsChange="getParams" />
  </div>
</template>
<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'

import uvLight from '@/components/uvLight/index.vue'
import uvTags from '@/components/uvTags/index.vue'
import type { TagItem } from '@/types/common'
import type { SpectrumFormState } from '@/types/experimentTypes'
import sampleParams from '@/views/experiment/lumneScence/components/sampleParams.vue'
import referenceStandard from '@/views/experiment/spectralScan/components/referenceStandard.vue'
import { useCheckDifferent } from '@/composables/useCheckDifferent'
import approxParamsModel from '@/views/experiment/quantityDetermind/components/approxParamsModel.vue'
import qcParamsModel from '@/views/experiment/quantityDetermind/components/qcParamsModel.vue'

const deviceStatusStore = useDeviceStatusStore()
const props = defineProps({
  methodsParams: {
    type: Object as () => SpectrumFormState,
    default: () => ({}),
  },
  originLumneMethodsParams: {
    type: Object as () => SpectrumFormState,
    default: () => ({}),
  },
  addOrEdit: {
    type: String,
    default: 'add',
  },
  formDisabled: {
    type: Boolean,
    default: false,
  },
  pageType: {
    type: String,
    default: 'default',
  },
})
const formRef = ref()
const referenceStandardVisible = ref(false)
const emit = defineEmits(['update:methodsParams'])
const formOptions = {
  yangpinchifang: [
    {
      label: '单次重复之后再移动',
      value: '0',
    },
    {
      label: '依次移动并重复',
      value: '1',
    },
  ],
}
watch(
  () => props.methodsParams,
  (val) => {
    formState.value = val
    initAPIParams()
  },
  {
    deep: true,
  },
)
const formState = ref<SpectrumFormState>(props.methodsParams)
const labelCol = { style: { width: '95px' } }
const basicRules = {
  methodName: [{ required: true, message: '请输入方法名称', trigger: 'blur' }],
  luminosity: [{ required: true, message: '请选择光度模式', trigger: 'change' }],
  waveLength: [
    { required: true, message: '请添加波长值', trigger: 'change' },
    {
      validator: (_rule: any, value: any) => {
        // 验证数组中的每个值
        for (const item of value) {
          const regex = /^\d+(\.\d)?$/
          if (
            !regex.test(String(item)) ||
            Number(item) < deviceStatusStore.methodsParamsRange?.minWavelength ||
            Number(item) > deviceStatusStore.methodsParamsRange?.maxWavelength
          ) {
            return Promise.reject(
              `波长值必须在${deviceStatusStore.methodsParamsRange?.minWavelength}-${deviceStatusStore.methodsParamsRange?.maxWavelength}范围内`,
            )
          }
        }
        if (!value || value.length > 26) {
          return Promise.reject('波长值最多输入26个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  sampleInputParams: [
    {
      validator: (_rule: any, value: any) => {
        if (sampleInputParams.value.length > 10) {
          return Promise.reject('样品输入参数最多输入10个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  resultParams: [
    {
      validator: (_rule: any, value: any) => {
        if (resultParams.value.length > 5) {
          return Promise.reject('待计算结果最多输入5个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  approxParams: [
    {
      validator: (_rule: any, value: any) => {
        if (approxParams.value.length > 10) {
          return Promise.reject('修约设置最多输入10个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  qcParams: [
    {
      validator: (_rule: any, value: any) => {
        if (qcParams.value.length > 10) {
          return Promise.reject('质控设置最多输入10个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  preProcessParameters: [
    {
      validator: (_rule: any, value: any) => {
        if (!value) return Promise.resolve()
        if (value.length > 10) {
          return Promise.reject('参考后处理最多10个成员！')
        }
        // 验证数组中的每个值
        for (const item of value) {
          if (item.length > 500) {
            return Promise.reject('参考后处理成员最多500个字符')
          }
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  repetitionPattern: [{ required: true, message: '请选择重复模式', trigger: 'change' }],
}
const formRules = computed(() => {
  if (formState.value.luminosity === '1' || formState.value.luminosity === '2') {
    return {
      ...basicRules,
    }
  } else
    return {
      ...basicRules,
      energyLamp: [{ required: true, message: '请选择能量灯', trigger: 'change' }],
      gain: [{ required: true, message: '请选择增益', trigger: 'change' }],
    }
})
const samplesParmsTags = ref<Record<string, any>>()
const sampleVisual = ref(false)
// 自定义的校验
watch(
  () => formState.value.preProcessParameters,
  (newValue, oldValue) => {
    if (formRef.value) {
      formRef.value.validateFields(['preProcessParameters'])
    }
  },
  {
    deep: true,
  },
)
watch(
  () => formState.value.luminosity,
  (newValue) => {
    if (newValue) {
      formState.value.luminosityName = {
        '1': 'Abs',
        '2': 'T%',
        '3': 'Es',
        '4': 'Er',
      }[newValue]
      if (newValue === '1' || newValue === '2') {
        formState.value.energyLamp = ''
        formState.value.gain = ''
      } else {
        formState.value.energyLamp = props.originLumneMethodsParams.energyLamp
          ? props.originLumneMethodsParams.energyLamp
          : deviceStatusStore.methodsParamsRange.lampType &&
              deviceStatusStore.methodsParamsRange.lampType.length
            ? deviceStatusStore.methodsParamsRange.lampType[0]?.paramValue
            : ''
        formState.value.gain = props.originLumneMethodsParams.gain
          ? props.originLumneMethodsParams.gain
          : deviceStatusStore.methodsParamsRange.gain &&
              deviceStatusStore.methodsParamsRange.gain.length
            ? deviceStatusStore.methodsParamsRange.gain[0]?.paramValue
            : ''
      }
      // sampleInputParamsChange(newValue, oldValue)
      const luminosityObj = {
        '1': 'Abs',
        '2': 'T%',
        '3': 'Es',
        '4': 'Er',
      }
      const luminosity =
        luminosityObj[formState.value.luminosity as keyof typeof luminosityObj] || ''
      sampleInputParams.value.forEach((item, index) => {
        if (formState.value.waveLength.includes(item.params.paramName)) {
          item.label = `标题:${item.params.paramName}  单位:${luminosity}  标识:${item.params.resultIdentity ?? String.fromCharCode(65 + index)} `
          item.props = 'sampleInputParams'
          item.params = {
            paramName: item.params.paramName,
            resultIdentity: item.params.resultIdentity ?? String.fromCharCode(65 + index),
            unit: luminosity,
          }
        }
      })
    }
  },
  {
    deep: true,
  },
)
const originRepetition = computed(() => ({
  repetitionTime: props.methodsParams.repetitionTime,
  timeInterval: props.methodsParams.timeInterval,
}))
// 监听重复模式 为了简洁模式“已修改”状态
watch(
  () => formState.value.repetitionPattern,
  (newValue: any) => {
    if (newValue === '不重复') {
      formState.value.repetitionTime = originRepetition.value.repetitionTime
      formState.value.timeInterval = originRepetition.value.timeInterval
    }
  },
  { deep: true },
)
const sampleInputParams = ref<TagItem[]>([])
const resultParams = ref<TagItem[]>([])
const approxParams = ref<TagItem[]>([])
const qcParams = ref<TagItem[]>([])
// 根据波长改变样品输入参数
const sampleInputParamsChange = (waveLength: string[], oldWaveLength: string[]) => {
  const luminosityObj = {
    '1': 'Abs',
    '2': 'T%',
    '3': 'Es',
    '4': 'Er',
  }
  const luminosity = luminosityObj[formState.value.luminosity as keyof typeof luminosityObj] || ''
  if (oldWaveLength && oldWaveLength.length)
    oldWaveLength.forEach((item) => {
      sampleInputParams.value = sampleInputParams.value.filter(
        (tag) => tag.params.paramName !== item,
      )
    })
  waveLength.forEach((item, index) => {
    const newSampleInputParams = {
      label: `标题:${item}  单位:${luminosity}  标识:${String.fromCharCode(65 + index)} `,
      props: 'sampleInputParams',
      params: {
        paramName: item,
        resultIdentity: String.fromCharCode(65 + index),
        unit: luminosity,
      },
    }
    if (!sampleInputParams.value.some((tag) => tag.params.paramName === item))
      sampleInputParams.value.unshift(newSampleInputParams)
  })
}
const initAPIParams = () => {
  sampleInputParams.value =
    formState.value.sampleInputParams?.map((item: any) => {
      return {
        label: `标题:${item.paramName || '-'}  单位:${item.unit || '-'}  标识:${item.resultIdentity || '-'} `,
        props: 'sampleInputParams',
        params: item,
      }
    }) || []
  resultParams.value =
    formState.value.resultParams?.map((item: any) => {
      return {
        label: `标题:${item.resultName || '-'}  单位:${item.unit || '-'}  标识:${item.resultIdentity || '-'} 公式:${item.formulaText || '-'}`,
        props: 'resultParams',
        params: item,
      }
    }) || []
  approxParams.value =
    formState.value.approxParams?.map((item: any) => {
      return {
        label: `${item.resultIdentityName || ''}的修约`,
        props: 'approxParams',
        params: item,
      }
    }) || []
  qcParams.value =
    formState.value.qcParams?.map((item: any) => {
      return {
        label: `${item.controlDesc || ''}`,
        props: 'qcParams',
        params: item,
      }
    }) || []
  formState.value = {
    ...formState.value,
    sampleInputParams: sampleInputParams.value.map((item) => item.params),
    resultParams: resultParams.value.map((item) => item.params),
    qcParams: qcParams.value.map((item) => item.params),
    approxParams: approxParams.value.map((item) => item.params),
  }
}
const measureTableShow = computed(() => {
  const sampleInputArr = sampleInputParams.value.map((item) => {
    const paramsArr = item.params.paramName.split('，')
    return `${paramsArr[0]}(${paramsArr[1]})`
  })
  const resultArr = resultParams.value.map((item) => {
    return `${item.params.resultName}(${item.params.unit})`
  })
  return [...sampleInputArr, ...resultArr]
})
watch(
  () => [sampleInputParams.value, resultParams.value, approxParams.value, qcParams.value],
  ([sampleInputParams, resultParams, approxParams, qcParams]) => {
    if (sampleInputParams.length > 10) {
      sampleInputParams.splice(10)
      formState.value.sampleInputParams.splice(10)
    }
    if (resultParams.length > 5) {
      resultParams.splice(5)
      formState.value.resultParams.splice(5)
    }
    if (approxParams.length > 10) {
      approxParams.splice(10)
      formState.value.approxParams.splice(10)
    }
    if (qcParams.length > 10) {
      qcParams.splice(10)
      formState.value.qcParams.splice(10)
    }
    nextTick(() => {
      if (formRef.value) {
        formRef.value.validateFields(['sampleInputParams'])
      }
    })
    isDataChanged.value = useCheckDifferent(
      {
        ...formState.value,
        sampleInputParams: sampleInputParams?.map((item) => item.params),
        resultParams: resultParams?.map((item) => item.params),
        qcParams: qcParams?.map((item) => item.params),
        approxParams: approxParams?.map((item) => item.params),
      },
      props.originLumneMethodsParams,
    )
  },
  { deep: true },
)
// 从标准中获取分析参数
const fillFormParams = (e: any) => {
  formState.value.waveLength = e.detectionParameters
  formState.value.preProcessParameters =
    e.pretreatments.map((item: any) => item.pretreatmentDescription) || []
  formState.value.referenceStandardName = e.standardName
  sampleInputParams.value = e.inputParams.map((item: any) => {
    return {
      label: `标题:${item.paramName || '-'}  单位:${item.unit || '-'}  标识:${item.resultIdentity || '-'} `,
      props: 'sampleInputParams',
      params: item,
    }
  })

  resultParams.value = e.calculationResults.map((item: any) => {
    return {
      label: `标题:${item.resultName || '-'}  单位:${item.unit || '-'}  标识:${item.resultIdentity || '-'} 公式:${item.formulaText || '-'}`,
      props: 'resultParams',
      params: item,
    }
  })

  approxParams.value = e.roundingSettings.map((item: any) => {
    return {
      label: `${item.resultIdentity || ''}${item.roundingCondition || ''}  ${item.roundingType || ''}${item.decimalPlaces || ''}`,
      props: 'approxParams',
      params: item,
    }
  })
  qcParams.value = e.qualityControls.map((item: any) => {
    return {
      label: `${item.controlType || ''} Abs${item.controlFormula || ''} ${item.overLimitOperation || ''}`,
      props: 'qcParams',
      params: item,
    }
  })
}
const duiYingMap = {
  sampleInputParams: '样品输入参数',
  resultParams: '待计算结果',
  approxParams: '修约设置',
  qcParams: '质控设置',
}
const clickIndex = ref(0)
const handleTagClick = (tag: Record<string, any>, index: number) => {
  clickIndex.value = index
  sampleParamsTitle.value =
    duiYingMap[tag.props as 'sampleInputParams' | 'resultParams' | 'approxParams' | 'qcParams']
  samplesParmsTags.value = tag.params
  if (sampleParamsTitle.value === '待计算结果' || sampleParamsTitle.value === '样品输入参数') {
    sampleVisual.value = true
  } else if (sampleParamsTitle.value === '质控设置') {
    qcParamsModelRef.value.showModel(resultParams.value, '光度测量', samplesParmsTags.value)
  } else if (sampleParamsTitle.value === '修约设置') {
    approxParamsModelRef.value.showModel(resultParams.value, '光度测量', samplesParmsTags.value)
  }
}
// 删除待计算结果参数
const updateResultParams = (value: any) => {
  const arr = resultParams.value.map((item) => item.params.resultIdentity)
  approxParams.value = approxParams.value.filter((item) => arr.includes(item.params.resultIdentity))
}
const sampleParamsTitle = ref('')
const qcParamsModelRef = ref() //质控设置弹窗
const approxParamsModelRef = ref() //修约设置弹窗
const customizeEvent = (type: string) => {
  clickIndex.value = -1
  sampleParamsTitle.value = type
  samplesParmsTags.value = {}
  if (type === '待计算结果' || type === '样品输入参数') {
    sampleVisual.value = true
  } else if (type === '质控设置') {
    qcParamsModelRef.value.showModel(resultParams.value, '光度测量')
  } else if (type === '修约设置') {
    approxParamsModelRef.value.showModel(resultParams.value, '光度测量')
  }
}
const getParams = (e: any) => {
  if (clickIndex.value !== -1) {
    if (sampleParamsTitle.value === '样品输入参数') {
      sampleInputParams.value[clickIndex.value].params = e
      sampleInputParams.value[clickIndex.value].label =
        `标题:${e.paramName}  单位:${e.unit}  标识:${e.resultIdentity} `
    } else if (sampleParamsTitle.value === '待计算结果') {
      resultParams.value[clickIndex.value].params = e
      resultParams.value[clickIndex.value].label =
        `标题:${e.resultName}  单位:${e.unit}  标识:${e.resultIdentity} 公式:${e.formulaText}`
    } else if (sampleParamsTitle.value === '修约设置') {
      approxParams.value[clickIndex.value].params = e
      approxParams.value[clickIndex.value].label = `${e.resultIdentityName}的修约`
    } else if (sampleParamsTitle.value === '质控设置') {
      qcParams.value[clickIndex.value].params = e
      qcParams.value[clickIndex.value].label = `${e.controlDesc}`
    }
  } else {
    // 代表新增
    const addparams = { params: e, label: '', props: '' }
    if (sampleParamsTitle.value === '样品输入参数') {
      addparams.label = `标题:${e.paramName}  单位:${e.unit}  标识:${e.resultIdentity} `
      addparams.props = 'sampleInputParams'
      sampleInputParams.value.push(addparams)
    } else if (sampleParamsTitle.value === '待计算结果') {
      addparams.label = `标题:${e.resultName}  单位:${e.unit}  标识:${e.resultIdentity} 公式:${e.formulaText}`
      addparams.props = 'resultParams'
      resultParams.value.push(addparams)
    } else if (sampleParamsTitle.value === '修约设置') {
      addparams.label = `${e.resultIdentityName}的修约`
      addparams.props = 'approxParams'
      approxParams.value.push(addparams)
    } else if (sampleParamsTitle.value === '质控设置') {
      addparams.label = `${e.controlDesc}`
      addparams.props = 'qcParams'
      qcParams.value.push(addparams)
    }
  }
  formState.value = {
    ...formState.value,
    sampleInputParams: sampleInputParams.value.map((item) => item.params),
    resultParams: resultParams.value.map((item) => item.params),
    qcParams: qcParams.value.map((item) => item.params),
    approxParams: approxParams.value.map((item) => item.params),
  }
}
// 是否已修改
const isDataChanged = ref(false)
watch(
  () => formState.value,
  (newFormState) => {
    isDataChanged.value = useCheckDifferent(newFormState, props.originLumneMethodsParams)
  },
  {
    deep: true,
  },
)
const appStore = useAppStore()
watch(
  () => isDataChanged.value,
  (newValue) => {
    appStore.setIsDataChanged(newValue)
  },
)
watch(
  () => formState.value.waveLength,
  (newValue, oldValue) => {
    if (newValue) {
      if (newValue.length > 26) {
        formState.value.waveLength.splice(26)
      }
      if (formRef.value) {
        formRef.value.validateFields(['waveLength'])
      }
      if (newValue.length > 26) newValue.splice(26, newValue.length - 3)
      // 添加波长变化时样品输入参数动态改变
      sampleInputParamsChange(newValue, oldValue)
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const onSubmit = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        resolve(false)
      })
  })
}
defineExpose({
  onSubmit,
  initAPIParams,
  formState,
  sampleInputParams,
  resultParams,
  qcParams,
  approxParams,
  isDataChanged,
})
onMounted(() => {
  initAPIParams()
})
</script>
<style scoped lang="less">
.lamp-container {
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lampShowBoder {
  border: 2px solid #aaa;
}

.lightline {
  width: 250px;
  height: 100%;
  position: relative;
  margin: 0 auto;
  background: url('@/assets/images/experiment/lightline.png') no-repeat;
  background-size: auto 100%;

  .wulight {
    position: absolute;
    top: -10%;
    right: 14%;
  }

  .chuanlight {
    position: absolute;
    top: 13%;
    right: 10%;
  }

  .gonglight {
    position: absolute;
    top: 23%;
    right: -9%;
  }
}

:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 110px !important;
}
</style>
