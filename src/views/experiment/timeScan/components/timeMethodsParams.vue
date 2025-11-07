<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div style="line-height: 4">
    <a-form
      :model="formState"
      :label-col="labelCol"
      class="edit-model-form"
      :rules="formRules"
      ref="formRef"
      :disabled="formDisabled"
    >
      <div v-if="pageType === 'default'">
        <a-row class="!flex items-center item-box">
          <a-col :span="2">
            <div class="!flex items-center">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[16px] text-[#133379]">基本</span>
            </div>
          </a-col>
          <a-col :span="22">
            <a-row :gutter="40">
              <a-col :span="10" v-if="addOrEdit === 'edit'">
                <a-form-item label="方法名称" name="methodName">
                  <a-input v-model:value="formState.methodName" maxlength="256" showCount />
                </a-form-item>
              </a-col>
              <a-col :span="10">
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
              label="参考前处理"
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
        <a-row class="!flex items-center item-box">
          <a-col :span="2">
            <div class="!flex items-center">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[16px] text-[#133379]">测量</span>
            </div>
          </a-col>
          <a-col :span="22">
            <a-row :gutter="40">
              <a-col :span="10">
                <a-form-item label="光度模式" name="luminosity">
                  <a-select
                    ref="select"
                    v-model:value="formState.luminosity"
                    :options="deviceStatusStore.methodsParamsRange.luminosity"
                    :field-names="{ label: 'paramName', value: 'paramValue' }"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="波长值(nm)" name="waveLength">
                  <a-input-number
                    class="!w-full"
                    v-model:value="formState.waveLength"
                    :min="deviceStatusStore.methodsParamsRange?.minWavelength"
                    :max="deviceStatusStore.methodsParamsRange?.maxWavelength"
                    :precision="1"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="40">
              <a-col :span="10">
                <a-form-item label="扫描总时长" name="scanTime">
                  <div class="!flex items-center">
                    <a-input-number
                      class="!w-full !mr-[5px]"
                      v-model:value="formState.scanTime"
                      :min="1"
                      :max="10000"
                      :precision="1"
                    />
                    <a-radio-group v-model:value="formState.scanUnit" class="!flex">
                      <a-radio value="0">分</a-radio>
                      <a-radio value="1">秒</a-radio>
                    </a-radio-group>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="时间间隔(秒)" name="intervalTime">
                  <a-input-number
                    class="!w-full"
                    v-model:value="formState.intervalTime"
                    :min="0"
                    :max="100"
                    :precision="1"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="扫描总个数" name="totalNumber">
                  <span>{{ formState.totalNumber || '0' }}</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="30">
              <a-col :span="24">
                <a-form-item label="多联池模式" name="multiPoolMode" class="form-item-no-margin">
                  <a-radio-group v-model:value="formState.multiPoolMode" class="!flex items-center">
                    <a-radio value="0">顺序单池连续采样</a-radio>
                    <a-radio value="1">循环多池交替采样</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="flex items-stretch item-box">
          <a-col :span="2" class="!font-bold !text-[16px] text-[#133379]">
            <div class="!flex items-center">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#133379]"></div>
              <span class="!font-bold text-[16px] text-[#133379]">仪器</span>
            </div>
          </a-col>
          <a-col :span="14">
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
              label="能量灯"
              name="energyLamp"
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
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
              label="增益"
              name="gain"
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
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
      <div v-else-if="pageType === 'methodOptimization'" class="relative">
        <div class="sticky right-1 top-1 float-end !text-red-400" v-if="isDataChanged">已修改</div>
        <div>
          <div class="pt-[10px] pb-[10px] pl-[20px] pr-[20px]">
            <div class="!mb-[10px] !flex items-center">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#616170]"></div>
              <span class="!font-bold text-[16px] text-[#616170]">测量</span>
            </div>
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
              <a-input-number
                class="!w-full"
                v-model:value="formState.waveLength"
                :min="deviceStatusStore.methodsParamsRange?.minWavelength"
                :max="deviceStatusStore.methodsParamsRange?.maxWavelength"
                :precision="1"
              />
            </a-form-item>
            <a-form-item label="扫描总时长" name="scanTime">
              <div class="!flex items-center">
                <a-input-number
                  class="!w-full !mr-[5px]"
                  v-model:value="formState.scanTime"
                  :min="1"
                  :max="10000"
                  :precision="1"
                />
                <a-radio-group v-model:value="formState.scanUnit" class="!flex">
                  <a-radio value="0">分</a-radio>
                  <a-radio value="1">秒</a-radio>
                </a-radio-group>
              </div>
            </a-form-item>
            <a-form-item label="时间间隔(秒)" name="intervalTime">
              <a-input-number
                class="!w-full"
                v-model:value="formState.intervalTime"
                :min="0"
                :max="100"
                :precision="1"
              />
            </a-form-item>
            <a-form-item label="扫描总个数" name="totalNumber">
              <span>{{ formState.totalNumber || '0' }}</span>
            </a-form-item>
            <a-form-item label="多联池模式" name="multiPoolMode" class="form-item-no-margin">
              <a-radio-group
                v-model:value="formState.multiPoolMode"
                class="!flex items-center !leading-[30px]"
              >
                <a-row>
                  <a-col :span="24">
                    <a-radio value="0">顺序单池连续采样</a-radio>
                  </a-col>
                  <a-col :span="24">
                    <!--                    <a-radio value="1">循环多池交替采样</a-radio>-->
                  </a-col>
                </a-row>
              </a-radio-group>
            </a-form-item>
          </div>
          <div class="!mt-[10px] pt-[10px] pb-[10px] pl-[20px] pr-[20px]">
            <div class="!mb-[10px] !flex items-center">
              <div class="!mr-[5px] !w-[5px] !h-[5px] rounded-[50%] bg-[#616170]"></div>
              <span class="!font-bold text-[16px] text-[#616170]">仪器</span>
            </div>
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
              label="能量灯"
              name="energyLamp"
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
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
              label="增益"
              name="gain"
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
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
      </div>
    </a-form>
    <referenceStandard
      v-model="referenceStandardVisible"
      v-if="referenceStandardVisible"
      :condition="formState.referenceStandardName"
      @form-params="fillFormParams"
    />
  </div>
</template>
<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, watch } from 'vue'

import uvLight from '@/components/uvLight/index.vue'
import uvTags from '@/components/uvTags/index.vue'
import type { SpectrumFormState } from '@/types/experimentTypes'
import referenceStandard from '@/views/experiment/spectralScan/components/referenceStandard.vue'
import { compareFormState } from '@/composables'

const deviceStatusStore = useDeviceStatusStore()
const props = defineProps({
  methodsParams: {
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
const emit = defineEmits(['update:methodsParams'])

const labelCol = { style: { width: '105px' } }
const formRules = {
  methodName: [{ required: true, message: '请输入方法名称', trigger: ['change', 'blur'] }],
  luminosity: [{ required: true, message: '请选择光度模式', trigger: ['change', 'blur'] }],
  waveLength: [{ required: true, message: '请输入波长值', trigger: ['change', 'blur'] }],
}
const formState = ref<SpectrumFormState>(props.methodsParams)
const formRef = ref()
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

// 参考标准
const referenceStandardVisible = ref(false)
const isDataChanged = ref(false)
const originalFormState = ref<SpectrumFormState>(JSON.parse(JSON.stringify(props.methodsParams)))
watch(
  () => formState.value,
  (newValue) => {
    if (
      JSON.stringify(originalFormState.value) !== '{}' &&
      !compareFormState(newValue, originalFormState.value)
    ) {
      isDataChanged.value = true
    } else {
      isDataChanged.value = false
    }
    emit('update:methodsParams', newValue)
  },
  {
    deep: true,
  },
)
watch(
  () => [formState.value.scanTime, formState.value.intervalTime, formState.value.scanUnit],
  ([newValue1, newValue2, newValue3]) => {
    if (newValue1 && newValue2 && newValue3) {
      if (newValue3 === '0') {
        // 分
        formState.value.totalNumber = Math.ceil((newValue1 * 60) / newValue2) + 1
      } else {
        formState.value.totalNumber = Math.ceil(newValue1 / newValue2) + 1
      }
    }
  },
  { deep: true },
)
const appStore = useAppStore()
watch(
  () => isDataChanged.value,
  (newValue) => {
    appStore.setIsDataChanged(newValue)
  },
)
const fillFormParams = (e: any) => {
  formState.value.waveLength =
    typeof e.detectionParameters === 'string'
      ? e.detectionParameters
      : e.detectionParameters && e.detectionParameters.length
        ? e.detectionParameters[0]
        : ''
  formState.value.preProcessParameters =
    e.pretreatments.map((item: any) => item.pretreatmentDescription) || []
  formState.value.referenceStandardName = e.standardName
  formState.value = {
    ...formState.value,
  }
  console.log('formState.value', formState.value)
}
defineExpose({
  onSubmit,
  isDataChanged,
  originalFormState,
})
onMounted(() => {})
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
  width: 320px;
  margin: 0 auto;
  height: 100%;
  background: url('@/assets/images/experiment/lightline.png') no-repeat;
  background-size: auto 100%;
  position: relative;
  .wulight {
    position: absolute;
    top: -8%;
    right: 32%;
  }

  .chuanlight {
    position: absolute;
    top: 15%;
    right: 29%;
  }

  .gonglight {
    position: absolute;
    top: 25%;
    right: 11%;
  }
}

.item-box {
  margin-top: 20px;
  padding: 25px 40px;
  border-radius: 12px;
  background-color: #f1f1f1;
}

:deep(.ant-input-affix-wrapper) {
  padding: 0px 11px 0px 0px;
  border-color: #595757 !important;
  background-color: #f1f1f1;
}

:deep(.ant-input-number) {
  border-color: #595757 !important;
  background-color: #f1f1f1;
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
