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
            <a-row>
              <a-col :span="8" v-if="addOrEdit === 'edit'">
                <a-form-item label="方法名称" name="methodName">
                  <a-input v-model:value="formState.methodName" :maxlength="256" showCount />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="参考标准" name="referenceStandardName">
                  <a-input
                    v-model:value="formState.referenceStandardName"
                    :maxlength="256"
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
          <a-col :span="1">
            <span class="formTip">测量</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="6">
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
              <a-col :span="6">
                <a-form-item
                  class="form-item-no-margin"
                  label="起始波长(nm)"
                  name="startWaveLength"
                >
                  <a-input-number
                    v-model:value="formState.startWaveLength"
                    :min="deviceStatusStore.methodsParamsRange?.minWavelength"
                    :max="deviceStatusStore.methodsParamsRange?.maxWavelength"
                    :step="1"
                    :precision="1"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item class="form-item-no-margin" label="停止波长(nm)" name="endWaveLength">
                  <a-input-number
                    v-model:value="formState.endWaveLength"
                    :min="190"
                    :max="900"
                    :step="1"
                    :precision="1"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  class="form-item-no-margin"
                  label="扫描间隔(nm)"
                  name="waveLengthInterval"
                >
                  <a-select
                    ref="select"
                    v-model:value="formState.waveLengthInterval"
                    :options="deviceStatusStore.methodsParamsRange.scanInterval"
                    :field-names="{ label: 'paramName', value: 'paramValue' }"
                  >
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">重复</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item class="form-item-no-margin" label="重复模式" name="repetitionPattern">
                  <a-select ref="select" v-model:value="formState.repetitionPattern">
                    <a-select-option value="单池重复">单池重复</a-select-option>
                    <a-select-option value="不重复">不重复</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6" v-if="formState.repetitionPattern === '单池重复'">
                <a-form-item class="form-item-no-margin" label="重复次数" name="repetitionTime">
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
              <a-col :span="6" v-if="formState.repetitionPattern === '单池重复'">
                <a-form-item class="form-item-no-margin" label="时间间隔(秒)" name="timeInterval">
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
          </a-col>
        </a-row>
        <a-row class="form-panel !pt-6">
          <a-col :span="1">
            <span class="formTip">仪器</span>
          </a-col>
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
            <a-form-item label="扫描速度" name="scanSpeed">
              <a-select
                ref="select"
                v-model:value="formState.scanSpeed"
                :options="deviceStatusStore.methodsParamsRange.scanSpeed"
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
              label="阶梯校正"
              name="ladderCorrection"
              v-if="formState.luminosity === '1' || formState.luminosity === '2'"
            >
              <a-switch v-model:checked="formState.ladderCorrection" />
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
      <div v-else class="relative">
        <div class="sticky right-1 top-1 float-end !text-red-400" v-if="isDataChanged">已修改</div>
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
          <a-form-item label="起始波长(nm)" name="startWaveLength">
            <a-input-number
              v-model:value="formState.startWaveLength"
              :min="deviceStatusStore.methodsParamsRange?.minWavelength"
              :max="deviceStatusStore.methodsParamsRange?.maxWavelength"
              :step="1"
              :precision="1"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="停止波长(nm)" name="endWaveLength">
            <a-input-number
              v-model:value="formState.endWaveLength"
              :min="190"
              :max="900"
              :step="1"
              :precision="1"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="扫描间隔(nm)" name="waveLengthInterval">
            <a-select
              ref="select"
              v-model:value="formState.waveLengthInterval"
              :options="deviceStatusStore.methodsParamsRange.scanInterval"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
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
            class="form-item-no-margin"
            label="时间间隔"
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
          <a-form-item label="扫描速度" name="scanSpeed">
            <a-select
              ref="select"
              v-model:value="formState.scanSpeed"
              :options="deviceStatusStore.methodsParamsRange.scanSpeed"
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
            label="阶梯校正"
            name="ladderCorrection"
            v-if="formState.luminosity === '1' || formState.luminosity === '2'"
          >
            <a-switch v-model:checked="formState.ladderCorrection" />
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
import { ref, watch } from 'vue'

import { queryReferenceStandard } from '@/api'
import uvLight from '@/components/uvLight/index.vue'
import type { SpectrumFormState } from '@/types/experimentTypes'

import referenceStandard from './referenceStandard.vue'
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
const labelCol = { style: { width: '105px' } }
const emit = defineEmits(['update:methodsParams'])
const defaultFormState = {
  measureType: 'spectralScan',
  luminosity: '',
  startWaveLength: '',
  endWaveLength: '',
  waveLengthInterval: '',
  repetitionPattern: '',
  repetitionTime: '',
  timeInterval: '',
  spectralBandwidth: '',
  responseTime: '',
  changeLampWaveLength: '',
  energyLamp: '0',
  gain: 0,
}
const formState = ref<SpectrumFormState>(props.methodsParams)
const referenceStandardVisible = ref(false)
const formRules = {
  methodName: [{ required: true, message: '请输入方法名称', trigger: 'blur' }],
  luminosity: [{ required: true, message: '请选择光度模式', trigger: 'change' }],
  startWaveLength: [{ required: true, message: '请输入起始波长(nm)', trigger: 'change' }],
  endWaveLength: [{ required: true, message: '请输入停止波长(nm)', trigger: 'change' }],
  waveLengthInterval: [{ required: true, message: '请选择扫描间隔', trigger: 'change' }],
  repetitionPattern: [{ required: true, message: '请选择重复模式', trigger: 'change' }],
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
}
watch(
  () => props.methodsParams,
  (newValue) => {
    formState.value = newValue
  },
  {
    deep: true,
  },
)
const isDataChanged = ref(false)
const originalFormState = ref<SpectrumFormState>(JSON.parse(JSON.stringify(props.methodsParams)))
watch(
  () => formState.value,
  (newValue, oldValue) => {
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
const appStore = useAppStore()
watch(
  () => isDataChanged.value,
  (newValue) => {
    appStore.setIsDataChanged(newValue)
  },
)
const formRef = ref()
const onSubmit = () => {
  return new Promise((resolve, reject) => {
    formRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch((error: any) => {
        console.log('表单验证失败:', error)
        resolve(false)
      })
  })
}
const fillFormParams = (e: any) => {
  formState.value.preProcessParameters =
    e.pretreatments.map((item: any) => item.pretreatmentDescription) || []
  formState.value.referenceStandardName = e.standardName
}
defineExpose({
  onSubmit,
  isDataChanged,
  originalFormState,
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
  width: 320px;
  margin: 0 auto;
  height: 100%;
  background: url('@/assets/images/experiment/lightline.png') no-repeat;
  background-size: auto 100%;
  position: relative;

  .wulight {
    position: absolute;
    top: -8%;
    right: 20%;
  }

  .chuanlight {
    position: absolute;
    top: 15%;
    right: 17%;
  }

  .gonglight {
    position: absolute;
    top: 25%;
    right: -1%;
  }
}

:deep(.ant-form-item-label > label) {
  font-size: 15px !important;
}

:deep(.ant-form label) {
  font-size: 15px;
}

:deep(.ant-form-item-label) {
  width: 130px !important;
}
</style>
