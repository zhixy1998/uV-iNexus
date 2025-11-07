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
                  <a-input v-model:value="formState.methodName" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="参考标准" name="referenceStandardName">
                  <div class="relative flex-1">
                    <a-input v-model:value="formState.referenceStandardName" />
                    <SearchOutlined
                      class="absolute right-2 top-1/2 -translate-y-1/2"
                      @click="() => (referenceStandardVisible = true)"
                    />
                  </div>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item
              :wrapperCol="{ span: 24 }"
              class="form-item-no-margin"
              label="参考后处理"
              name="preProcessParameters"
            >
              <uvTags title="" v-model:tags="formState.preProcessParameters" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">测量</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="波长值(nm)" name="waveLength">
                  <uvTags title="" v-model:tags="formState.waveLength" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="波长参数" name="waveLengthParams">
                  <uvTags title="" v-model:tags="formState.waveLengthParams" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="波长公式" name="waveLengthFormula">
                  <MathJax :formula="`$$${formState.waveLengthFormula}$$`" />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- <a-row>
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="微分方式" name="differentialMode">
                  <a-select ref="select" v-model:value="formState.differentialMode">
                    <a-select-option value="no_differential">不微分</a-select-option>
                    <a-select-option value="one_differential">一次微分</a-select-option>
                    <a-select-option value="two_differential">二次微分</a-select-option>
                    <a-select-option value="three_differential">三次微分</a-select-option>
                    <a-select-option value="four_differential">四次微分</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row> -->
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">曲线</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="曲线类型" name="curveType">
                  <a-select ref="select" v-model:value="formState.curveType">
                    <a-select-option value="1">一次曲线</a-select-option>
                    <a-select-option value="2">二次曲线</a-select-option>
                    <a-select-option value="3">三次曲线</a-select-option>
                    <a-select-option value="4">四次曲线</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="方程类型" name="equationType">
                  <a-select ref="select" v-model:value="formState.equationType">
                    <a-select-option value="f_Abs">C=f(Abs)</a-select-option>
                    <a-select-option value="f_C">Abs=f(C)</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="曲线公式" name="curveFormula">
                  <MathJax :formula="`$$${formState.curveFormula}$$`" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="系数方式" name="coefficientMode">
                  <a-radio-group
                    v-model:value="formState.coefficientMode"
                    :options="formOptions.xishufangshi"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="零点方式" name="zeroMethod">
                  <a-checkbox-group v-model:value="formState.zeroMethod">
                    <a-checkbox value="insert_zero">插入零点</a-checkbox>
                    <a-checkbox value="force_zero">强制过零点</a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-row v-if="formState.coefficientMode === 'direct'">
                  <a-col v-for="item in kArray" :key="item" :span="12">
                    <a-form-item class="form-item-no-margin" :label="`K${item}`">
                      <a-input v-model:value="kForm[`k${item}`]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row v-else>
                  <a-form-item label="推荐C(mg/L)" name="curveCoefficient">
                    <uvTags title="" v-model:tags="formState.curveCoefficient" />
                  </a-form-item>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1" class="!font-bold">
            <span class="formTip">重复</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="重复模式" name="repeatMode">
                  <a-select ref="select" v-model:value="formState.repeatMode">
                    <a-select-option value="单池重复">单池重复</a-select-option>
                    <a-select-option value="不重复">不重复</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="formState.repeatMode === '单池重复'">
                <a-form-item
                  label="重复次数"
                  name="repeatCount"
                  v-if="formState.repeatMode === '单池重复'"
                >
                  <a-input-number
                    v-model:value="formState.repeatCount"
                    :min="2"
                    :max="10"
                    :step="1"
                    :precision="0"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8" v-if="formState.repeatMode === '单池重复'">
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
            <!-- <a-row :gutter="16" v-if="formState.repeatMode === '单池重复'">
              <a-col :span="8">
                <a-form-item class="form-item-no-margin" label="统计内容" name="statisticalContent">
                  <a-checkbox-group v-model:value="formState.statisticalContent">
                    <a-checkbox value="平均值">平均值</a-checkbox>
                    <a-checkbox value="SD">SD</a-checkbox>
                    <a-checkbox value="RSD">RSD</a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
            </a-row> -->
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-6">
          <a-col :span="1">
            <span class="formTip">分析</span>
          </a-col>
          <a-col :span="23">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="拟合结果" name="samplePoolWay">
                  <a-radio-group
                    v-model:value="formState.samplePoolWay"
                    :options="formOptions.nihejieguo"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="单位" name="dw">
                  <a-input v-model:value="formState.dw" :maxlength="10" :minlength="0" show-count />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="输入参数" name="sampleInputParams">
              <uvTagsClickForm
                title=""
                v-model:tags="sampleInputParams"
                :customize="true"
                @addTags="customizeEvent('样品输入参数')"
                @tagClick="handleTagClick"
              />
            </a-form-item>
            <a-form-item label="待计算结果" name="resultParams">
              <uvTagsClickForm
                title=""
                v-model:tags="resultParams"
                :customize="true"
                @addTags="customizeEvent('待计算结果')"
                @tagClick="handleTagClick"
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
              />
            </a-form-item>
            <a-form-item class="form-item-no-margin" label="质控设置" name="qcParams">
              <uvTagsClickForm
                title=""
                v-model:tags="qcParams"
                :customize="true"
                @addTags="customizeEvent('质控设置')"
                @tagClick="handleTagClick"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-panel !mb-3 !pt-6">
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
                v-model:value="formState.spectralBandwidth"
                :options="deviceStatusStore.methodsParamsRange.bandWidth"
                :field-names="{ label: 'paramName', value: 'paramValue' }"
              >
              </a-select>
            </a-form-item>
            <a-form-item label="响应时间(秒)" name="responseTime">
              <a-select
                ref="select"
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
            <!-- <a-form-item
              v-if="formState.luminosity !== '1' && formState.luminosity !== '2'"
              label="能量灯"
              name="energyLamp"
            >
              <a-select ref="select" v-model:value="formState.energyLamp">
                <a-select-option value="0">钨灯</a-select-option>
                <a-select-option value="1">氘灯</a-select-option>
                <a-select-option value="2">汞灯</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="增益" name="gain">
              <a-input v-model:value="formState.gain" type="range" :min="0" :max="3" />
            </a-form-item> -->
          </a-col>
        </a-row>
      </div>
      <div v-else class="relative">
        <div class="sticky right-1 top-1 float-end !text-red-400" v-show="isDataChanged">
          已修改
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">测量</span></a-row>
          <a-form-item label="波长值(nm)" name="waveLength">
            <uvTags title="" v-model:tags="formState.waveLength" />
          </a-form-item>
          <a-form-item label="波长参数" name="waveLengthParams">
            <uvTags title="" v-model:tags="formState.waveLengthParams" :isCanRepeat="true" />
          </a-form-item>
          <a-form-item label="波长公式" name="waveLengthFormula">
            <MathJax :formula="`$$${formState.waveLengthFormula}$$`" />
          </a-form-item>
          <!-- <a-form-item label="微分方式" name="differentialMode">
            <a-select ref="select" v-model:value="formState.differentialMode">
              <a-select-option value="no_differential">不微分</a-select-option>
              <a-select-option value="one_differential">一次微分</a-select-option>
              <a-select-option value="two_differential">二次微分</a-select-option>
              <a-select-option value="three_differential">三次微分</a-select-option>
              <a-select-option value="four_differential">四次微分</a-select-option>
            </a-select>
          </a-form-item> -->
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">曲线</span></a-row>
          <a-form-item label="曲线类型" name="curveType">
            <a-select ref="select" v-model:value="formState.curveType">
              <a-select-option value="1">一次曲线</a-select-option>
              <a-select-option value="2">二次曲线</a-select-option>
              <a-select-option value="3">三次曲线</a-select-option>
              <a-select-option value="4">四次曲线</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="方程类型" name="equationType">
            <a-select ref="select" v-model:value="formState.equationType">
              <a-select-option value="f_Abs">C=f(Abs)</a-select-option>
              <a-select-option value="f_C">Abs=f(C)</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="曲线公式" name="curveFormula">
            <MathJax :formula="`$$${formState.curveFormula || '-'}$$`" />
          </a-form-item>
          <a-form-item label="系数方式" name="coefficientMode">
            <a-radio-group
              v-model:value="formState.coefficientMode"
              :options="formOptions.xishufangshi"
            />
          </a-form-item>
          <template v-if="formState.coefficientMode === 'direct'">
            <a-form-item v-for="item in kArray" :key="item" :label="`k${item}`" :name="`k${item}`">
              <a-input v-model:value="kForm[`k${item}`]" />
            </a-form-item>
          </template>
          <a-form-item
            v-if="formState.coefficientMode !== 'direct'"
            label="零点方式"
            name="zeroMethod"
          >
            <a-checkbox-group v-model:value="formState.zeroMethod">
              <a-checkbox value="insert_zero">插入零点</a-checkbox>
              <a-checkbox value="force_zero">强制过零点</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item
            label="推荐C(mg/L)"
            name="curveCoefficient"
            v-if="formState.coefficientMode !== 'direct'"
          >
            <uvTags title="" v-model:tags="formState.curveCoefficient" />
          </a-form-item>
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">重复</span></a-row>
          <a-form-item label="重复模式" name="repeatMode">
            <a-select ref="select" v-model:value="formState.repeatMode">
              <a-select-option value="单池重复">单池重复</a-select-option>
              <a-select-option value="不重复">不重复</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="重复次数"
            name="repeatCount"
            v-if="formState.repeatMode === '单池重复'"
          >
            <a-input-number
              v-model:value="formState.repeatCount"
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
            v-if="formState.repeatMode === '单池重复'"
          >
            <a-input-number
              class="!w-full"
              v-model:value="formState.timeInterval"
              :min="0"
              :max="60"
              :precision="1"
            />
          </a-form-item>
          <!-- <a-form-item
            label="统计内容"
            name="statisticalContent"
            v-if="formState.repeatMode === '单池重复'"
          >
            <a-checkbox-group v-model:value="formState.statisticalContent">
              <a-checkbox value="平均值">平均值</a-checkbox>
              <a-checkbox value="SD">SD</a-checkbox>
              <a-checkbox value="RSD">RSD</a-checkbox>
            </a-checkbox-group>
          </a-form-item> -->
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">分析</span></a-row>
          <a-form-item label="拟合结果" name="samplePoolWay">
            <a-radio-group
              v-model:value="formState.samplePoolWay"
              :options="formOptions.nihejieguo"
            />
          </a-form-item>
          <a-form-item label="单位" name="dw">
            <a-input v-model:value="formState.dw" :maxlength="10" :minlength="0" show-count />
          </a-form-item>
          <a-form-item label="输入参数" name="sampleInputParams">
            <uvTagsClickForm
              title=""
              v-model:tags="sampleInputParams"
              :customize="true"
              @addTags="customizeEvent('样品输入参数')"
              @tagClick="handleTagClick"
            />
          </a-form-item>
          <a-form-item label="待计算结果" name="resultParams">
            <uvTagsClickForm
              title=""
              v-model:tags="resultParams"
              :customize="true"
              @addTags="customizeEvent('待计算结果')"
              @tagClick="handleTagClick"
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
            />
          </a-form-item>
          <a-form-item class="form-item-no-margin" label="质控设置" name="qcParams">
            <uvTagsClickForm
              title=""
              v-model:tags="qcParams"
              :customize="true"
              @addTags="customizeEvent('质控设置')"
              @tagClick="handleTagClick"
            />
          </a-form-item>
        </div>
        <div class="simple-form-div">
          <a-row><span class="formSimpleTip">仪器</span></a-row>
          <a-form-item label="光谱带宽(nm)" name="spectralBandwidth">
            <a-select
              ref="select"
              v-model:value="formState.spectralBandwidth"
              :options="deviceStatusStore.methodsParamsRange.bandWidth"
              :field-names="{ label: 'paramName', value: 'paramValue' }"
            >
            </a-select>
          </a-form-item>
          <a-form-item label="响应时间(秒)" name="responseTime">
            <a-select
              ref="select"
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
          <!-- <a-form-item label="能量灯" name="energyLamp">
            <a-select ref="select" v-model:value="formState.energyLamp">
              <a-select-option value="0">钨灯</a-select-option>
              <a-select-option value="1">氘灯</a-select-option>
              <a-select-option value="2">汞灯</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="增益" name="gain">
            <a-input v-model:value="formState.gain" type="range" :min="0" :max="3" />
          </a-form-item> -->
        </div>
      </div>
    </a-form>
    <sampleParams
      :computedParams="formState.waveLength"
      :inputParams="inputParams"
      :sampleParams="samplesParmsTags"
      v-model="sampleVisual"
      :modelTitle="sampleParamsTitle"
      measureType="定量测定"
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
import { computed, ref, watch } from 'vue'

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
  originQuantityMethodsParams: {
    type: Object as () => SpectrumFormState,
    default: () => ({}),
  },
  addOrEdit: {
    type: String,
    default: 'add',
  },
  pageType: {
    type: String,
    default: 'default',
  },
})
const formRef = ref()
const emit = defineEmits(['update:methodsParams'])
const formOptions = {
  xishufangshi: [
    {
      label: '直接系数法',
      value: 'direct',
    },
    {
      label: '标准曲线法',
      value: 'standard',
    },
  ],
  nihejieguo: [
    {
      label: '浓度',
      value: '1',
    },
    // {
    //   label: '质量',
    //   value: '0',
    // },
  ],
}
const formState = ref<SpectrumFormState>(props.methodsParams)
const labelCol = { style: { width: '95px' } }
const formRules = ref<any>({
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
        if (!value || value.length > 3) {
          return Promise.reject('波长值最多输入3个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  waveLengthParams: [
    {
      validator: (_rule: any, value: any) => {
        if (value && value.length) {
          for (const item of value) {
            const regex = /^-?\d+(\.\d)?$/
            if (!regex.test(String(item))) {
              return Promise.reject('波长参数最多一位小数')
            }
          }
          if (
            formState.value.waveLength &&
            formState.value.waveLength.length &&
            value.length > formState.value.waveLength.length
          ) {
            return Promise.reject('波长参数与波长值个数一致！')
          }
        }

        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  sampleInputParams: [
    {
      validator: (_rule: any, value: any) => {
        if (value && value.length > 10) {
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
        if (value && value.length > 5) {
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
        if (value && value.length > 10) {
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
        if (value && value.length > 10) {
          return Promise.reject('质控设置最多输入10个！')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  methodName: [{ required: true, message: '请输入方法名称', trigger: 'blur' }],
  luminosity: [{ required: true, message: '请选择光度模式', trigger: 'change' }],
  startWaveLength: [{ required: true, message: '请输入起始波长(nm)', trigger: 'change' }],
  endWaveLength: [{ required: true, message: '请输入停止波长(nm)', trigger: 'change' }],
  waveLengthInterval: [{ required: true, message: '请选择扫描间隔', trigger: 'change' }],
  repeatMode: [{ required: true, message: '请选择重复模式', trigger: 'change' }],
})
const samplesParmsTags = ref<Record<string, any>>()
const sampleVisual = ref(false)
watch(
  () => [formState.value.waveLengthParams],
  ([newValueWaveLengthParams]) => {
    const formulaText = calculateFormula(formState.value.waveLength, newValueWaveLengthParams)
    formState.value.waveLengthFormula = formulaText
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
      }
    }
  },
  {
    deep: true,
  },
)
watch(
  () => formState.value.waveLengthParams,
  () => {
    if (formRef.value) {
      formRef.value.validateFields(['waveLengthParams'])
    }
  },
  { deep: true },
)
const originRepetition = computed(() => ({
  repeatCount: props.originQuantityMethodsParams.repeatCount,
  timeInterval: props.originQuantityMethodsParams.timeInterval,
  statisticalContent: props.originQuantityMethodsParams.statisticalContent,
}))
// 监听重复模式 为了简洁模式“已修改”状态
watch(
  () => formState.value.repeatMode,
  (newValue: any) => {
    if (newValue === '不重复') {
      formState.value.repeatCount = ''
      formState.value.timeInterval = ''
      formState.value.statisticalContent = []
    } else {
      formState.value.repeatCount = originRepetition.value.repeatCount || '2'
      formState.value.timeInterval = originRepetition.value.timeInterval || '0'
      formState.value.statisticalContent = []
    }
  },
  { deep: true },
)
// 生成波长公式
const calculateFormula = (arr1: any, arr2: any) => {
  if (!arr1) return null
  const result = []
  let resultFinal = ''
  for (let i = 0; i < arr1.length; i++) {
    const coefficient = arr2 && i < arr2.length ? arr2[i] : 1
    const resultStr = coefficient == 1 ? `Abs[${arr1[i]}nm]` : `${coefficient}Abs[${arr1[i]}nm]`
    result.push(resultStr)
  }
  for (let i = 0; i < result.length; i++) {
    const resultStrIAdd = i > 0 && !result[i].startsWith('-') ? `+${result[i]}` : result[i]
    resultFinal = resultFinal + resultStrIAdd
  }
  return `Abs=${resultFinal}`
}
const referenceStandardVisible = ref(false)
const sampleParamsTitle = ref('')
const sampleInputParams = ref<TagItem[]>([])
const resultParams = ref<TagItem[]>([])
const approxParams = ref<TagItem[]>([])
const qcParams = ref<TagItem[]>([])
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
  ([newSampleInputParams, newResultParams, newApproxParams, newQcParams]) => {
    if (newSampleInputParams.length > 10) {
      sampleInputParams.value.splice(10)
      formState.value.sampleInputParams.splice(10)
    }
    if (newResultParams.length > 5) {
      resultParams.value.splice(5)
      formState.value.resultParams.splice(5)
    }
    if (newApproxParams.length > 10) {
      approxParams.value.splice(10)
      formState.value.approxParams.splice(10)
    }
    if (newQcParams.length > 10) {
      qcParams.value.splice(10)
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
        sampleInputParams: sampleInputParams.value?.map((item) => item.params),
        resultParams: resultParams.value?.map((item) => item.params),
        qcParams: qcParams.value?.map((item) => item.params),
        approxParams: approxParams.value?.map((item) => item.params),
      },
      props.originQuantityMethodsParams,
    )
  },
  { deep: true },
)
const fillFormParams = (e: any) => {
  // 回显波长 参考前处理 标准名称
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
    qcParamsModelRef.value.showModel(resultParams.value, '定量测定', samplesParmsTags.value)
  } else if (sampleParamsTitle.value === '修约设置') {
    approxParamsModelRef.value.showModel(resultParams.value, '定量测定', samplesParmsTags.value)
  }
}
// 删除待计算结果参数
const updateResultParams = (value: any) => {
  const arr = resultParams.value
    .map((item) => item.params.resultIdentity)
    .concat(['fitConcentration'])
  approxParams.value = approxParams.value.filter((item) => arr.includes(item.params.resultIdentity))
}
const inputParams = computed(() => {
  return kArray.value
    .map((item: any) => ({
      params: {
        resultIdentity: `k${item}`,
      } as any,
    }))
    .concat(sampleInputParams.value)
})
const qcParamsModelRef = ref() //质控设置弹窗
const approxParamsModelRef = ref() //修约设置弹窗
const customizeEvent = (type: string) => {
  clickIndex.value = -1
  sampleParamsTitle.value = type
  samplesParmsTags.value = {}
  if (type === '待计算结果' || type === '样品输入参数') {
    sampleVisual.value = true
  } else if (type === '质控设置') {
    qcParamsModelRef.value.showModel(resultParams.value, '定量测定')
  } else if (type === '修约设置') {
    approxParamsModelRef.value.showModel(resultParams.value, '定量测定')
  }
}

const getParams = (e: any) => {
  if (clickIndex.value !== -1) {
    if (sampleParamsTitle.value === '样品输入参数') {
      sampleInputParams.value[clickIndex.value].params = e
      sampleInputParams.value[clickIndex.value].label =
        `标题:${e.paramName}  单位:${e.unit}  标识:${e.resultIdentity} `
    } else if (sampleParamsTitle.value === '待计算结果') {
      const mathContent = `\$\$${e.formulaText}$$`
      resultParams.value[clickIndex.value].params = e
      resultParams.value[clickIndex.value].label =
        `标题:${e.resultName}  单位:${e.unit}  标识:${e.resultIdentity} 公式:${mathContent}`
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

watch(
  () => formState.value.waveLength,
  (newValue, oldValue) => {
    if (newValue) {
      if (newValue.length > 3) {
        formState.value.waveLength.splice(3)
      }
      nextTick(() => {
        if (formRef.value) {
          formRef.value.validateFields(['waveLength'])
        }
      })
      const formulaText = calculateFormula(newValue, formState.value.waveLengthParams)
      formState.value.waveLengthFormula = formulaText
      // 添加波长变化时样品输入参数动态改变
      sampleInputParamsChange(newValue, oldValue)
    }
  },
  {
    deep: true,
  },
)
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
// 是否已修改
const isDataChanged = ref(false)
watch(
  () => formState.value,
  (newFormState) => {
    isDataChanged.value = useCheckDifferent(newFormState, props.originQuantityMethodsParams)
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

/******************************** 曲线类型 系数方式 ********************************/
const kForm = ref<any>({})
// 将填写的表单转换为后端想要的数组
watch(
  () => kForm.value,
  () => {
    const arr = JSON.parse(JSON.stringify(kArray.value)).reverse()
    const coefficientParams = arr.map((item: any) => kForm.value[`k${item}`] || '0')
    formState.value.coefficientParams = coefficientParams
  },
  {
    deep: true,
  },
)
// 为 k 系数动态添加校验规则
const addKRules = () => {
  // 清除旧的 k 规则
  Object.keys(formRules.value).forEach((key) => {
    if (key.startsWith('k')) {
      delete formRules.value[key]
    }
  })
  // 添加新的 k 规则
  kArray.value.forEach((item) => {
    formRules.value[`k${item}`] = [
      {
        required: true,
        validator: (_rule: any, value: any) => {
          const inputValue = kForm.value[`k${item}`]
          // 必填
          if (!inputValue) {
            return Promise.reject(`请输入k${item}值`)
          }
          // 最高位k不能为0
          if (item === kArray.value[0]) {
            if (inputValue === '0') {
              return Promise.reject(`k${item}值不能为0`)
            }
          }
          // double类型数字
          const stringValue = inputValue.trim()
          if (isNaN(Number(stringValue)) || !isFinite(Number(stringValue))) {
            return Promise.reject(`k${item}必须为有效数字`)
          }
          if (stringValue.includes('.')) {
            const decimalPart = stringValue.split('.')[1]
            if (decimalPart && decimalPart.length > 10) {
              return Promise.reject(`k${item}小数位数不能超过10位`)
            }
            if (!decimalPart) return Promise.reject(`k${item}必须为有效数字`)
          }
          return Promise.resolve()
        },
        trigger: ['blur', 'change'],
      },
    ]
  })
}
// k数组 [k4, k3, k2, k1, k0]
const kArray = computed(() => {
  const curveType = Number(formState.value.curveType)
  if (isNaN(curveType) || curveType < 1 || curveType > 4) {
    return []
  }
  return Array.from({ length: curveType + 1 }, (_, i) => i).reverse()
})
// 根据原始方法参数初始化kForm 主要用于回显
const handleInitKform = () => {
  kForm.value = Array.from(
    { length: Number(props.originQuantityMethodsParams.curveType) + 1 },
    (_, i) => i,
  ).reduce((acc: any, cur: any) => {
    acc[`k${cur}`] = props.originQuantityMethodsParams.coefficientParams[cur]
    return acc
  }, {})
}
// 监听曲线类型 方程类型 系数方式
watch(
  () => [formState.value.curveType, formState.value.equationType, formState.value.coefficientMode],
  ([newCurveType, newEquationType, newCoefficientMode]) => {
    if (newCurveType) {
      if (newEquationType) {
        // 曲线公式
        const x = newEquationType === 'f_Abs' ? 'C' : 'Abs'
        const y = newEquationType === 'f_C' ? 'C' : 'Abs'
        const curveFormula1 = `k1(${y})+k0`
        const curveFormula2 = `k2(${y}²) + ${curveFormula1}`
        const curveFormula3 = `k3(${y}³) + ${curveFormula2}`
        const curveFormula4 = `k4(${y}⁴) + ${curveFormula3}`
        if (newCurveType === '1') formState.value.curveFormula = `${x}=${curveFormula1}`
        else if (newCurveType === '2') formState.value.curveFormula = `${x}=${curveFormula2}`
        else if (newCurveType === '3') formState.value.curveFormula = `${x}=${curveFormula3}`
        else if (newCurveType === '4') formState.value.curveFormula = `${x}=${curveFormula4}`
      }
      addKRules() // 添加k0 k1...的校验
      if (newCoefficientMode === 'direct') {
        // 直接系数法
        if (newCurveType === props.originQuantityMethodsParams.curveType) {
          // 如果曲线类型和原始方法参数的曲线类型相同 获取之前的kForm并回显
          handleInitKform()
        } else {
          // 不相同 kForm置空字符串
          const arr = JSON.parse(JSON.stringify(kArray.value)).reverse()
          kForm.value = arr.reduce((acc: any, cur: any) => {
            acc[`k${cur}`] = ''
            return acc
          }, {})
        }
      } else {
        // 标准曲线法
        formState.value.coefficientParams = []
      }
    }
  },
  { deep: true, immediate: true },
)
// 根据原始方法参数的coefficientParams 初始化kForm
watch(
  () => props.originQuantityMethodsParams.coefficientParams,
  (newValue) => {
    if (newValue && newValue.length) handleInitKform()
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
  position: relative;
  margin: 0 auto;
  height: 100%;
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

:deep(.MJX-TEX) {
  white-space: normal !important;
}
</style>
