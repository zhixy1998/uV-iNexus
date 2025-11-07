<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="结果数据" not-collapse>
      <template #slot-header>
        <div class="flex gap-4 items-center" @click.stop>
          <div class="flex items-center">
            <span class="text-[14px] text-[#595757]">测量值显示位数</span>
            <a-input-number
              v-model:value="digit"
              :min="0"
              :max="10"
              :step="1"
              class="w-xs !m-2"
              @blur="changeDigit"
            />
          </div>
          <a-checkbox-group v-if="isRepeat" v-model:value="statisticalContent" @change="fetchData">
            <a-checkbox value="avg">平均值</a-checkbox>
            <a-checkbox value="sd">SD</a-checkbox>
            <a-checkbox value="rsd">RSD</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group v-model:value="checkValue" @change="handleCheckChange">
            <a-checkbox value="0">
              <span class="text-[14px] text-[#595757]">显示已删除的数据</span>
            </a-checkbox>
            <a-checkbox value="1">
              <span class="text-[14px] text-[#595757]">同时显示Abs与T%</span>
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </template>
      <template #slot-content>
        <template v-if="pageType === 'default'">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex items-center">
              <uvHasIconBtn content="样品" class="!mr-[30px]" @click="showSampleSetting">
              </uvHasIconBtn>
              <uvHasIconBtn
                content="校零"
                class="!mr-[30px]"
                @click="xiaoZero"
                :loading="zeroLoading"
              >
              </uvHasIconBtn>
              <uvHasIconBtn content="测量" @click="measure"></uvHasIconBtn>
            </div>
            <div>
              <span class="!mr-[10px] flex-shrink-0 text-[16px] text-[#113371]">前处理操作</span>
              <a-select ref="select" v-model:value="beforeOperation" class="w-xs">
                <a-select-option value="1"
                  >样品：取样，加液，检测。标曲：取标液，稀释定容，加液(加碘化钾)，后检测
                </a-select-option>
                <a-select-option value="2">第二种处理方法</a-select-option>
                <a-select-option value="3">第三种处理方法</a-select-option>
                <a-select-option value="4">第四种处理方法</a-select-option>
              </a-select>
            </div>
            <div class="flex items-center">
              <uvHasIconBtn content="保存" class="!mr-[30px]"></uvHasIconBtn>
              <a-dropdown placement="bottomRight">
                <!-- 下拉触发按钮（保持和原按钮样式一致） -->
                <uvHasIconBtn content="导出" class="!mr-[20px]"></uvHasIconBtn>
                <!-- 下拉菜单选项 -->
                <template #overlay>
                  <a-menu @click="handleExportMenuClickLj">
                    <a-menu-item key="word">
                      <!-- key对应fileType值 -->
                      导出为word
                    </a-menu-item>
                    <a-menu-item key="xlsx">
                      <!-- key对应fileType值 -->
                      导出为excel
                    </a-menu-item>
                    <a-menu-item key="txt">
                      <!-- key对应fileType值 -->
                      导出为txt
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex items-center justify-between flex-wrap">
            <div class="nav-box flex flex-wrap px-4 pb-3 gap-2">
              <div
                v-for="item in navList.slice(0, 3)"
                style="padding: 4px 10px"
                :key="item.icon"
                class="nav-item"
                @click="item.clickFun"
              >
                <div
                  v-if="item.name !== '测量' || (item.name === '测量' && finished === '0')"
                  class="icon-box"
                  :style="{ backgroundImage: `url(${item.icon})` }"
                ></div>
                <component v-else class="!mr-[15px] text-[20px] !text-[#137921]" :is="item.icon" />
                <div class="!font-bold !text-[18px]" :style="{ color: item.color }">
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="nav-box flex flex-wrap px-4 pb-3 gap-2">
              <div
                v-for="item in navList.slice(3)"
                :key="item.icon"
                class="nav-item"
                @click="item.clickFun"
              >
                <div class="icon-box" :style="{ backgroundImage: `url(${item.icon})` }"></div>
                <div class="!font-bold" :style="{ color: item.color }">
                  {{ item.name }}
                </div>
              </div>
              <a-dropdown placement="bottomRight">
                <!-- 下拉触发按钮（保持和原按钮样式一致） -->
                <div class="nav-item">
                  <div class="icon-box" :style="{ backgroundImage: `url(${importIcon})` }"></div>
                  <div class="!font-bold" :style="{ color: '#A48FFF' }">导出</div>
                </div>
                <!-- 下拉菜单选项 -->
                <template #overlay>
                  <a-menu @click="handleExportMenuClickLj">
                    <a-menu-item key="word">
                      <!-- key对应fileType值 -->
                      导出为word
                    </a-menu-item>
                    <a-menu-item key="xlsx">
                      <!-- key对应fileType值 -->
                      导出为excel
                    </a-menu-item>
                    <a-menu-item key="txt">
                      <!-- key对应fileType值 -->
                      导出为txt
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </template>
        <a-row :gutter="16">
          <a-col :span="16" v-if="methodsParams.coefficientMode !== 'direct'">
            <a-row class="items-center gap-x-4">
              <div class="h2-title flex items-center">
                <a-radio v-model:checked="checkedStandard" @change="handleChangeStandard"></a-radio>
                标准样品
                <div v-if="pageType === 'default'" class="px-4">
                  <uvHasIconBtn content="列配置" @click="configColumn('0')"></uvHasIconBtn>
                </div>
                <div v-else class="nav-box px-4 gap-2">
                  <div class="nav-item" @click="configColumn('0')">
                    <div class="icon-box" :style="{ backgroundImage: `url(${column})` }"></div>
                    <div class="!font-bold" :style="{ color: '#5B0D97' }">列配置</div>
                  </div>
                </div>
              </div>
            </a-row>
            <div class="overflow-x-auto">
              <a-table
                size="small"
                rowKey="id"
                :dataSource="tableOptions.data"
                :columns="tableOptions.columns"
                :pagination="tableOptions.pagination"
                :expandedRowKeys="expandedRowKeys"
                :rowClassName="rowClassName"
                @resizeColumn="handleResizeColumn"
                @expand="handleExpand"
              >
                <!-- <template #id="{ record }">
                  <div class="!truncate">
                    {{ record.id
                    }}{{
                      record && record.deleteType && record.deleteType === '1' ? '（已删除）' : ''
                    }}
                  </div>
                </template> -->
                <template #operation="{ record }">
                  <div class="flex justify-around gap-4">
                    <DeleteOutlined
                      v-if="record && record.deleteType === '0'"
                      @click="deleteOneSampleFun(record)"
                    />
                    <RollbackOutlined
                      v-if="record && record.deleteType === '1'"
                      @click="revokeDelFun(record, 0)"
                    />
                    <SyncOutlined
                      v-if="isRepeat ? record && record.children : true"
                      :spin="finished === '1' && measureSampleId === record.sampleId"
                      @click.stop="finished !== '1' && measureSingle(record.sampleId)"
                    />
                  </div>
                </template>
              </a-table>
            </div>
          </a-col>
          <a-col :span="methodsParams.coefficientMode !== 'direct' ? 8 : 24">
            <div class="h-10 bg-[#153471] text-[#fff] leading-10 !pl-5 text-[16px]">
              <span>标准曲线</span>
            </div>
            <uvLineHasScatter
              class="chart-container !w-full !h-80"
              :yAxisOptions="yShowRange"
              :lineMarkSelect="lineMarkSelect"
              :initial-data="chartData"
              :lineName="lineOptions.xLineName"
              :yAxisName="lineOptions.yLineName"
              :scatter-data="scatterChartData"
            />
            <div class="curveFormula-box">
              <div class="flex items-center">
                <span class="flex-shrink-0">曲线方程</span>
                <MathJax
                  :formula="`$$${lineOptions.curveFormula || props.methodsParams.curveFormula}$$`"
                  class="flex-shrink-0"
                />
              </div>
              <div v-if="lineOptions.r">r={{ lineOptions.r }}</div>
              <div v-if="lineOptions.r2">r²={{ lineOptions.r2 }}</div>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <div class="!mt-[10px] h2-title flex items-center">
            <a-radio v-model:checked="checkedUnknown" @change="handleChangeUnknow"></a-radio>
            未知样品
            <div class="nav-box px-4">
              <div v-if="pageType === 'default'" class="px-4">
                <uvHasIconBtn content="列配置" @click="configColumn('1')"></uvHasIconBtn>
              </div>
              <div v-else class="nav-item" @click="configColumn('1')">
                <div class="icon-box" :style="{ backgroundImage: `url(${column})` }"></div>
                <div class="!font-bold" :style="{ color: '#5B0D97' }">列配置</div>
              </div>
            </div>
          </div>
        </a-row>
        <div class="overflow-x-auto">
          <a-table
            size="small"
            rowKey="id"
            :dataSource="tableOptionsUn.data"
            :columns="tableOptionsUn.columns"
            :pagination="tableOptionsUn.pagination"
            :expandedRowKeys="expandedRowKeysUn"
            :default-expand-all-rows="true"
            :rowClassName="rowClassName"
            @expand="handleExpandUn"
          >
            <template #abs="{ record }">
              <div>
                {{ record.abs1 }}
                <IconFont type="icon-up" />
                <IconFont type="icon-arrdown" />
              </div>
            </template>
            <template #operation="{ record }">
              <div class="flex justify-around gap-4">
                <DeleteOutlined
                  v-if="record && record.deleteType === '0'"
                  @click="deleteOneSampleFun(record)"
                />
                <RollbackOutlined
                  v-if="record && record.deleteType === '1'"
                  @click="revokeDelFun(record, 1)"
                />
                <SyncOutlined
                  v-if="isRepeat ? record && record.children : true"
                  :spin="finished === '1' && measureSampleId === record.sampleId"
                  @click.stop="finished !== '1' && measureSingle(record.sampleId)"
                />
              </div>
            </template>
          </a-table>
        </div>
      </template>
    </uvCollapseRightSlot>

    <!--  列配置   sampleKind 0 标准样品 1 未知样品-->
    <columnModel
      v-if="columnVisual"
      v-model="columnVisual"
      :taskId="projectDetail?.taskId"
      :methodId="projectDetail?.methodId"
      :tableHeadData="columnConfigSample === '1' ? tableUnHeadData : tableHeadData"
      :measureType="`定量测定`"
      :sampleKind="columnConfigSample"
      @saveParamMapTableHeadSuccess="saveParamMapTableHeadSuccess"
      size="smail"
      :apiParams="{
        queryInputParamMapTableHead: apiParams.queryInputParamMapTableHead,
        saveInputParamMapTableHead: apiParams.saveInputParamMapTableHead,
        queryInputParam: apiParams.queryInputParam,
      }"
    />
    <!-- 样品按钮 -->
    <sampleSettingModel
      ref="sampleSettingRef"
      :projectDetail="projectDetail"
      :methodsParams="methodsParams"
      @closeSampleEdit="closeSampleEdit"
    />
    <save-modal-tip v-model="tipVisual" @confirm="saveDraft" />
    <report-preview
      v-model="reportPreviewVisible"
      :taskId="formState.taskId"
      :showAbsOrT="checkValue.includes('1') ? '1' : '0'"
      :measureType="`定量测定`"
      v-if="reportPreviewVisible"
      :footer="null"
    />
    <save-as-modal ref="saveAsModelRef" @update:modelValue="saveAsTask" />
    <uvModal
      v-model="modelValue"
      title="标准浓度"
      width="40%"
      @handleOk="handleOk"
      @handleCancel="formConcentrationRef.resetForm()"
    >
      <template #content>
        <a-form
          :model="formConcentration"
          class="edit-model-form"
          :rules="formConcentrationRules"
          ref="formConcentrationRef"
        >
          <a-form-item label="标准浓度" name="normalConcentration">
            <a-input-number
              v-model:value="formConcentration.normalConcentration"
              :min="0"
              :step="1"
              style="width: 100%"
            />
          </a-form-item>
        </a-form>
      </template>
    </uvModal>
  </section>
</template>
<script lang="ts" setup>
import {
  DeleteOutlined,
  LoadingOutlined,
  RollbackOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { message, Modal, notification } from 'ant-design-vue'
import { h, onUnmounted, type PropType, reactive, ref, watch } from 'vue'

import { useDownloadFile } from '@/composables/useDownloadFile'
import webSocketService from '@/utils/websocket'

import {
  conciseCopy,
  conciseQuantityCheckAllSampleTestStatus,
  conciseQuantityCreateSample,
  conciseQuantityNewDraft,
} from '@/api'
import column from '@/assets/images/experiment/column.png'
import copyIcon from '@/assets/images/experiment/copy.png'
import importIcon from '@/assets/images/experiment/import.png'
import measureIcon from '@/assets/images/experiment/measure.png'
import newIcon from '@/assets/images/experiment/new.png'
import sampleIcon from '@/assets/images/experiment/sample.png'
import saveIcon from '@/assets/images/experiment/save.png'
import zeroIcon from '@/assets/images/experiment/zero.png'
import type { SpectrumFormState } from '@/types/experimentTypes'
import saveAsModal from '@/views/methodOptimization/components/saveAsModal.vue'
import SaveModalTip from '@/views/methodOptimization/components/saveModalTip.vue'
import { Input } from 'ant-design-vue'
import columnModel from './components/columnModel.vue'
import sampleSettingModel from './components/sampleSettingModel.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const props = defineProps({
  projectDetail: {
    type: Object as PropType<Record<string, any>>,
  },
  methodsParams: {
    type: Object as () => SpectrumFormState,
    default: () => ({}),
  },
  // 是否重复 是否展示平均值 SD RSD
  isRepeat: {
    type: Boolean,
    default: false,
  },
  pageType: {
    type: String,
    default: 'default',
  },
  wsUrl: {
    type: String,
    default: '',
  },
  apiParams: {
    type: Object,
    required: true,
    validator(value: Record<string, any>) {
      return [
        'getQuantityCurveInfo',
        'queryQuantitySampleData',
        'getQuantityStandTableHead',
        'getQuantityUnknowSampleData',
        'getQuantityStandUnknowTableHead',
        'quantitiyMeasurementZero',
        'revokeDelQuantity',
        'queryQuantityInputParamMapTableHead',
        'saveQuantityInputParamMapTableHead',
        'addQuantitySampleList',
        'getQuantitySampleList',
        'queryQuantitySampleHeads',
        'queryInputParam',
        'downloadDocQuantityDetermind',
      ].every((key) => key in value)
    },
  },
})
const task_id = ref('')
const reportPreviewVisible = ref(false)
// 按钮
const navList = ref([
  {
    name: '样品',
    icon: sampleIcon,
    className: 'w-[38px]',
    color: '#C649A1',
    clickFun: () => showSampleSetting(),
  },
  {
    name: '校零',
    icon: zeroIcon,
    className: 'w-[57px]',
    color: '#133379',
    clickFun: () => xiaoZero(),
  },
  {
    name: '测量',
    icon: measureIcon,
    className: 'w-[39px]',
    color: '#137921',
    clickFun: () => measure(),
  },
  {
    name: '新建',
    icon: newIcon,
    className: 'w-[33px]',
    color: '#135679',
    clickFun: () => addDraft(),
  },
  {
    name: '保存',
    icon: saveIcon,
    className: 'w-[57px]',
    color: '#FF9138',
    clickFun: () => saveQuantityTaskFun(),
  },
  {
    name: '另存为',
    icon: saveIcon,
    className: 'w-[57px]',
    color: '#FF9138',
    clickFun: () => saveAs(),
  },
  // {
  //   name: '导出列表',
  //   icon: importIcon,
  //   className: 'w-[57px]',
  //   color: '#A48FFF',
  //   // clickFun: () => downloadDocLumneFun(),
  // },
  // {
  //   name: '复制',
  //   icon: copyIcon,
  //   className: 'w-[57px]',
  //   color: '#06B8C3',
  // },
  {
    name: '报告',
    icon: copyIcon,
    className: 'w-[57px]',
    color: '#06B8C3',
    clickFun: () => {
      reportPreviewVisible.value = true
    },
  },
])
const emit = defineEmits(['addDraftSuccess', 'changePoolNum'])

/**************************** abs 平均值 查询参数 *****************************/
const digit = ref<number>(4) // abs显示位数
const changeDigit = async () => {
  if (!digit.value) digit.value = 4
  await fetchData()
  await getCurveInfoFun()
}
const allDisplay = ref(false) // 显示已删除数据
const checkValue = ref<string[]>([]) //标记点
const statisticalContent = ref<string[]>([]) // 平均值|SD|RSD
// 显示已删除数据|同时显示Abs与T%
const handleCheckChange = (value: string[]) => {
  getTableHead()
  getUnTableHead()
  fetchData()
}

/**************************** 前处理 *****************************/
const beforeOperation = ref('')

/*********************************** 新建草稿 *************************************/
const tipVisual = ref(false)
const addDraft = async () => {
  tipVisual.value = true
}
const saveDraft = async (value: any) => {
  if (formState.value.methodId) {
    const { code } = await conciseQuantityNewDraft({
      methodId: formState.value.methodId,
      taskId: formState.value.taskId,
      isSave: value == 1 ? true : false,
    })
    if (code === 200) {
      notification.success({
        message: '成功',
        description: '新建草稿成功',
      })
      emit('addDraftSuccess')
    }
  }
}

/*********************************** 保存 ************************************/
const saveQuantityTaskFun = async () => {
  const { code, data } = await props.apiParams.saveQuantityTask({
    taskId: formState.value.taskId || '',
  })
  if (code === 200) {
    message.success('保存成功！')
    await useQuerySaveState(formState.value.taskId)
  }
}

/*********************************** 另存为 ************************************/
const saveAsModelRef = ref()
const saveAs = () => {
  saveAsModelRef.value.showModal(formState.value.taskId)
}
const saveAsTask = async (ruleForm: any) => {
  const { code } = await conciseCopy({
    taskId: formState.value.taskId,
    taskName: ruleForm.taskName,
  })
  if (code === 200) {
    saveAsModelRef.value.closeModal()
    notification.success({
      message: '成功',
      description: '另存为成功',
      duration: 3,
    })
    emit('addDraftSuccess')
  }
}

/**************************** 样品按钮 *****************************/
const sampleSettingRef = ref()
const showSampleSetting = () => {
  sampleSettingRef.value.showSampleEdit()
}
const closeSampleEdit = async () => {
  getTableHead()
  getUnTableHead()
  await fetchData()
  await getCurveInfoFun() // 获取曲线数据
}

/**************************** 校零 *****************************/
const zeroLoading = ref(false)
const xiaoZero = async () => {
  if (!props.projectDetail?.methodId) message.error('请创建方法！')
  if (!(await useIsMethodApply())) return
  Modal.confirm({
    content: '请插入校零样品！',
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      zeroLoading.value = true
      props.apiParams
        .quantitiyMeasurementZero({
          methodId: props.projectDetail?.methodId,
          taskId: props.projectDetail?.taskId,
        })
        .then(({ code, data }: any) => {
          if (code === 200) {
            message.success('校零成功！')
            // appStore.setNm(data.waveLength)
            // appStore.setAbs('')
          }
          zeroLoading.value = false
        })
        .catch(() => {
          zeroLoading.value = false
        })
      // 立即关闭模态框
      return Promise.resolve()
    },
  })
}

/**************************** 测量 *****************************/
const handleMessage = async (sampleId = '', event: MessageEvent) => {
  const data = JSON.parse(event.data)
  if (data && data.error) {
    notification.error({
      message: '错误',
      description: data.error,
      duration: 5,
    })
  } else if (data && data.success) {
    notification.success({
      message: '成功',
      description: data.success,
      duration: 5,
    })
  } else {
    if (data.waveLength) appStore.setNm(data.waveLength)
    if (data.currentValue) appStore.setAbs(data.currentValue)
    if (data.currentPoolNum) {
      emit('changePoolNum', data.currentPoolNum)
    }
    if (checkedStandard.value) {
      // 标准样品
      if (data.key && !data.identity) {
        tableOptions.value.data.forEach((item: any) => {
          if (item.sampleId === data.sampleId) {
            item[data.key] = data.value
          }
        })
      } else if (data.identity && data.key) {
        // 重复模式是多次的情况
        const rowNum = data.identity.split('-').pop()
        tableOptions.value.data.forEach((item: any, index: number) => {
          if (item.sampleId === data.sampleId) {
            expandedRowKeys.value = [...new Set([...expandedRowKeys.value, data.value])]
            if (!item.children) item.children = []
            if (item.children && item.children[rowNum]) {
              //行数据已经存在
              item.children[rowNum][data.key] = data.value
            } else {
              item.children[rowNum] = {
                id: index + 1 + '-' + (Number(rowNum) + 1),
              }
              item.children[rowNum][data.key] = data.value
            }
          }
        })
      }
      if (data.point) {
        lineMarkSelect.value.push(pointerStandOption(data.point.x, data.point.y))
        yShowRange.max = Math.max(yShowRange.max, Math.ceil(data.point.y))
        yShowRange.min = Math.min(yShowRange.max, Math.floor(data.point.y))
      }
    } else {
      // 未知样品
      if (data.key && !data.identity) {
        tableOptionsUn.value.data.forEach((item: any) => {
          if (item.sampleId === data.sampleId) {
            item[data.key] = data.value
          }
        })
      } else if (data.identity && data.key) {
        // 重复模式是多次的情况
        const rowNum = data.identity.split('-').pop()
        tableOptionsUn.value.data.forEach((item: any, index: number) => {
          if (item.sampleId === data.sampleId) {
            expandedRowKeysUn.value.push(data.id)
            if (!item.children) item.children = []
            if (item.children && item.children[rowNum]) {
              //行数据已经存在
              item.children[rowNum][data.key] = data.value
            } else {
              item.children[rowNum] = {
                id: index + 1 + '-' + Number(rowNum) + 1,
              }
              item.children[rowNum][data.key] = data.value
            }
          }
        })
      }
      if (data.point) {
        lineMarkSelect.value.push(pointerUnStandOption(data.point.x, data.point.y))
        yShowRange.max = Math.max(yShowRange.max, Math.ceil(data.point.y))
        yShowRange.min = Math.min(yShowRange.max, Math.floor(data.point.y))
      }
    }
    if (data.curveType) {
      chartData.value = []
      lineOptions.value.curveFormula = ''
      lineOptions.value.r = null
      lineOptions.value.r2 = null
      const dataList = data.dataList || []
      chartData.value.push(...dataList)
      // if (data.equationType === 'C=f(Abs)') {
      //   lineOptions.value.xLineName = 'Abs'
      //   lineOptions.value.yLineName = 'C'
      // }
      lineOptions.value.curveFormula = data.equation
      lineOptions.value.r = data.r
      lineOptions.value.r2 = data.r2
    }
    if (data.result === 'finish') {
      task_id.value = data.task_id
      finished.value = '0'
      // if (sampleId) {
      await fetchData()
      await getCurveInfoFun() // 获取曲线数据
      useQuerySaveState(formState.value.taskId)
      // }
    }
  }
}
const measureSampleId = ref('') // 当前正在测量的样品id
const finished = ref('0') //1测量中
watch(
  () => finished.value,
  (newValue) => {
    appStore.setMeasureMode(newValue)
    navList.value.forEach((item: any) => {
      if (item.name === '测量') {
        if (newValue === '0') {
          item.icon = measureIcon
          item.clickFun = () => measure('')
        } else item.icon = LoadingOutlined
      }
    })
  },
)
const measureSingle = async (sampleId: string) => {
  if (!(await useIsMethodApply())) return
  await measure(sampleId)
}
const measure = async (sampleId?: string) => {
  if (!sampleId || sampleId === '') {
    if (!(await useIsMethodApply())) return
  }
  const modal = Modal.confirm({
    content: '请插入样品！',
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      modal.destroy()
      await getSampleStatus(sampleId)
    },
  })
}
// 填写标准浓度
const modelValue = ref(false)
const formConcentrationRef = ref()
const formConcentration = ref({
  normalConcentration: '',
})
const formConcentrationRules = {
  normalConcentration: [{ required: true, message: '请填写标准浓度' }],
}
const handleOk = async () => {
  const result = await formConcentrationRef.value?.validate()
  if (result) {
    modelValue.value = false
    await handleAutoSample(formConcentration.value)
    await fetchData()
    await handleWebSocket('')
  }
}
// 获取样品是否全部测量状态
const getSampleStatus = async (sampleId?: string) => {
  // 只有在标准样品且没有指定sampleId时才检查状态
  if (checkedStandard.value && !sampleId) {
    const { code, data } = await conciseQuantityCheckAllSampleTestStatus({
      taskId: formState.value.taskId,
    })
    if (code === 200) {
      if (data) {
        // 需要显示模态框
        modelValue.value = true
      } else {
        await handleWebSocket(sampleId || '')
      }
      return
    }
  }
  // 不需要显示模态框或不是标准样品情况下的统一处理逻辑
  if (!sampleId) await handleAutoSample()
  await fetchData()
  await handleWebSocket(sampleId || '')
}
// 没样品的时候自动添加样品
const handleAutoSample = async (query?: any) => {
  await conciseQuantityCreateSample({
    taskId: formState.value.taskId,
    sampleKind: checkedStandard.value ? '0' : '1',
    normalConcentration: query ? query.normalConcentration : '',
  })
}
// 连接websocket
const handleWebSocket = async (sampleId?: string) => {
  if (sampleId) {
    tableOptions.value.columns.forEach((col: any) => {
      tableOptions.value.data.forEach((item: any) => {
        if (item.sampleId === sampleId && col.locate === 'measure') {
          item[col.dataIndex] = ''
          if (item.children) {
            item.children.forEach((child: any) => {
              child[col.dataIndex] = ''
            })
          }
        }
      })
    })
  }
  webSocketService.setBaseUrl(sampleId ? '/ws/concise/rationReMeasureOne' : props.wsUrl)
  webSocketService.setCallbacks({
    onMessage: (event) => handleMessage(sampleId, event),
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: (event) => {
      finished.value = '0'
      console.log('WebSocket 连接已关闭', event)
    },
    onError: (event) => console.error('WebSocket 错误', event),
  })
  webSocketService.connect({
    sampleKind: checkedStandard.value ? '0' : '1',
    taskId: props.projectDetail?.taskId,
    sampleId: sampleId || '',
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
    digit: digit.value,
    avg: statisticalContent.value.includes('avg') ? true : false,
    sd: statisticalContent.value.includes('sd') ? true : false,
    rsd: statisticalContent.value.includes('rsd') ? true : false,
    updateBy: userStore.userName,
  })
  finished.value = '1'
}

/**************************** 列配置（标准样品|未知样品） *****************************/
const columnVisual = ref(false) // model显示
const columnConfigSample = ref('') // sampleKind 0 标准样品 1 未知样品
// 打开弹窗
const configColumn = (type: string) => {
  columnVisual.value = true
  columnConfigSample.value = type
}
// 保存
const saveParamMapTableHeadSuccess = () => {
  if (columnConfigSample.value === '0') {
    getTableHead()
  } else {
    getUnTableHead()
  }
}

/**************************** 标准样品表格 *****************************/
// 勾选
const checkedStandard = ref<boolean>(true)
const handleChangeStandard = () => {
  if (checkedUnknown.value) {
    checkedUnknown.value = false
  }
}
// 表格折叠
const expandedRowKeys = ref<(string | number)[]>([])
const handleExpand = (expanded: boolean, record: any) => {
  if (expanded) {
    expandedRowKeys.value = [...expandedRowKeys.value, record.id]
  } else {
    expandedRowKeys.value = expandedRowKeys.value.filter((key) => key !== record.id)
  }
}
// 表格
const tableOptions = ref({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 60,
    },
    {
      title: '操作',
      slots: { customRender: 'operation' },
      ellipsis: true,
      resizable: true,
      fixed: 'right',
      width: 80,
    },
  ] as any[],
  data: [],
  pagination: false,
})

function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}

const rowClassName = (record: any) => {
  return record && record.deleteType && record.deleteType === '1' ? 'deleted-row' : ''
}

// 表头
const tableHeadData = ref([])
const getTableHead = async () => {
  const { code, data } = await props.apiParams.getQuantityStandTableHead({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
    allDisplay: checkValue.value.includes('1'),
  })
  if (code === 200) {
    if (data && data.length) {
      tableHeadData.value = data?.filter((item: any) => item.locate !== 'analyze')
      tableOptions.value.columns = await transformColumnData(data)
    }
  }
}
// 获取数据
const fetchData = async () => {
  const params = {
    allDisplay: checkValue.value.includes('0'),
    taskId: props.projectDetail?.taskId,
    digit: digit.value,
    option: statisticalContent.value || [],
  }
  const { code, data } = await props.apiParams.queryQuantitySampleData(params)
  data.standSampleData.forEach((item: any, index: number) => {
    item.id = index + 1
    expandedRowKeys.value.push(index + 1)
    item.children?.forEach((child: any, indexx: number) => {
      child.id = index + 1 + '-' + (indexx + 1)
    })
  })
  data.unknowSampleData.forEach((item: any, index: number) => {
    item.id = index + 1
    expandedRowKeysUn.value.push(index + 1)
    item.children?.forEach((child: any, indexx: number) => {
      child.id = index + 1 + '-' + (indexx + 1)
    })
  })
  if (code === 200) {
    tableOptions.value.data = data.standSampleData
    tableOptionsUn.value.data = data.unknowSampleData
  }
}

/**************************** 未知样品表格 *****************************/
// 勾选
const checkedUnknown = ref<boolean>(false)
const handleChangeUnknow = () => {
  if (checkedStandard.value) {
    checkedStandard.value = false
  }
}
//表格折叠
const expandedRowKeysUn = ref<(string | number)[]>([])
const handleExpandUn = (expanded: boolean, record: any) => {
  if (expanded) {
    expandedRowKeysUn.value = [...expandedRowKeysUn.value, record.id]
  } else {
    expandedRowKeysUn.value = expandedRowKeysUn.value.filter((key) => key !== record.id)
  }
}
// 表格
const tableOptionsUn = ref({
  rowKey: 'id',
  columns: [] as any[],
  data: [],
  pagination: false,
})
// 表头
const tableUnHeadData = ref([])
const getUnTableHead = async () => {
  const { code, data } = await props.apiParams.getQuantityStandUnknowTableHead({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
    allDisplay: checkValue.value.includes('1'),
  })
  if (code === 200) {
    tableUnHeadData.value = data
    tableOptionsUn.value.columns = await transformColumnData(data)
  }
}
// 删除
const deleteOneSampleFun = async (record: { sampleId: any }) => {
  Modal.confirm({
    title: '您确定要删除吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      const { code, data } = await props.apiParams.deleteQuantityOneSample({
        taskId: formState.value.taskId,
        sampleId: record.sampleId,
      })
      if (code === 200) {
        message.success('删除成功！')
        await fetchData()
        await getCurveInfoFun()
      }
    },
  })
}
// 撤销删除
const revokeDelFun = async (record: { sampleId: any }, type: number) => {
  const { code } = await props.apiParams.revokeDelQuantity({
    taskId: props.projectDetail?.taskId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    await fetchData()
    await getCurveInfoFun()
  }
}
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = async (data: any) => {
  const column = [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 60,
      customRender: ({ record }: { record: any }) => {
        return h('div', { class: 'flex items-center justify-center text-overflow' }, [
          h('span', record.id),
          record && record.deleteType && record.deleteType === '1'
            ? h('span', { class: 'ml-1 text-red-500 text-xs' }, '（已删除）')
            : null,
        ])
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      ellipsis: true,
      resizable: true,
      fixed: 'right',
      width: 80,
    },
  ]
  const dataColumn = data.map((item: any) => {
    if (item.locate === 'data') {
      return {
        title: item.name,
        dataIndex: item.identity,
        customRender: (data: { text: string; record: any; index: number }) => {
          return h(Input, {
            value: data.text,
            onBlur: (e: Event) => {
              // e.target.vale record
              // 可以添加其他处理逻辑
            },
            placeholder: '请输入内容',
          })
        },
        width: item.identity === 'sampleNumber' ? 90 : 150,
        locate: item.locate,
      }
    } else {
      return {
        title: item.name,
        dataIndex: item.identity,
        ellipsis: true,
        resizable: true,
        width: item.identity === 'sampleNumber' ? 90 : 150,
        locate: item.locate,
      }
    }
  })
  column.splice(1, 0, ...dataColumn)
  return column
}

/**************************** 标准曲线|曲线方程 *****************************/
const lineOptions = ref({
  curveFormula: '', // 曲线方程
  xLineName: '', // X轴名称
  yLineName: '', // Y轴名称
  r: null,
  r2: null,
})
watch(
  () => props.methodsParams.curveFormula,
  (newValue: any) => {
    if (newValue === 'C=f(Abs)') {
      lineOptions.value.xLineName = 'Abs'
      lineOptions.value.yLineName = 'C'
    } else {
      lineOptions.value.xLineName = 'C'
      lineOptions.value.yLineName = 'Abs'
    }
  },
  { deep: true },
)
const yShowRange = reactive<any>({
  min: '',
  max: '',
})
const lineMarkSelect = ref<any[]>([])
const chartLineData = Array.from({ length: 10 }, (_, i) => ({
  x: i + 1,
  y: Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000, // 2000~5000 随机数
  marked: 0,
  feng: Math.random() < 0.5 ? 0 : 1,
  gu: Math.random() < 0.5 ? 0 : 1,
}))
const chartData = ref<typeof chartLineData>([])
const scatterChartData = ref<{ x: string | number; y: string | number }[]>([])
const tags = ref()
watch(tags, (val) => {
  chartData.value.forEach((item) => {
    item.marked = val?.includes(item.x) ? 1 : 0
  })
})
const pointerStandOption = (x: any, y: any) => {
  return {
    name: '标准样品',
    color: '#137921',
    x: x,
    y: y,
    symbol: 'circle',
    label: {
      show: false, // 改为始终显示
      position: 'top',
      formatter: `标准样品\n(${x}, ${y})`,
    },
    emphasis: {
      label: {
        show: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: '#fff',
        padding: [4, 8],
        borderRadius: 4,
      },
    },
  }
}
const pointerUnStandOption = (x: any, y: any) => {
  return {
    name: '未知样品',
    color: '#ff9138',
    x: x,
    y: y,
    symbol: 'circle',
    label: {
      show: false, // 改为始终显示
      position: 'top',
      formatter: `未知样品\n(${x}, ${y})`,
    },
    emphasis: {
      label: {
        show: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: '#fff',
        padding: [4, 8],
        borderRadius: 4,
      },
    },
  }
}
// 获取曲线数据
const getCurveInfoFun = async () => {
  const { code, data } = await props.apiParams.getQuantityCurveInfo({
    taskId: props.projectDetail?.taskId,
    methodId: props.projectDetail?.methodId,
  })
  if (code === 200) {
    const dataList = data.dataList || []
    chartData.value = [] // 统计图清空
    lineMarkSelect.value = [] // 标准样品未知样品标记清空
    scatterChartData.value = [] // point清空
    lineOptions.value.curveFormula = ''
    lineOptions.value.r = null
    lineOptions.value.r2 = null
    chartData.value.push(...dataList)
    lineOptions.value.curveFormula = data.equation
    lineOptions.value.r = data.r
    lineOptions.value.r2 = data.r2
    const standPoints =
      data.standPoints && data.standPoints.length
        ? data.standPoints.map((item: any) => pointerStandOption(item.x, item.y))
        : []
    const unknowPoints =
      data.unknowPoints && data.unknowPoints.length
        ? data.unknowPoints.map((item: any) => pointerUnStandOption(item.x, item.y))
        : []
    lineMarkSelect.value = standPoints.concat(unknowPoints)
    yShowRange.max = Math.max(
      ...dataList.map((item: any) => Math.ceil(item.y)),
      ...lineMarkSelect.value.map((item: any) => Math.ceil(item.y)),
    )
    yShowRange.min = Math.min(
      ...dataList.map((item: any) => Math.floor(item.y)),
      ...lineMarkSelect.value.map((item: any) => Math.floor(item.y)),
    )
  }
}

/**************************** 生命周期 *****************************/
const formState = ref()
watch(
  () => props.projectDetail,
  () => {
    formState.value = props.projectDetail
  },
  { deep: true, immediate: true },
)
watch(
  () => [formState.value.taskId, formState.value.methodId],
  async ([newTaskId, newMethodId]) => {
    if (newTaskId && newMethodId) {
      await getTableHead()
      await getUnTableHead()
      await fetchData()
      await getCurveInfoFun() // 获取曲线数据
    }
  },
  { deep: true },
)

onUnmounted(() => {
  webSocketService.close()
})

/*********************************** 导出 ************************************/
const handleExportMenuClickLj = (menuItem: { key: string }) => {
  const fileType = menuItem.key // 拿到选择的类型："word" 或 "xlsx"
  downloadDocLumneFun(fileType) // 调用导出方法并传递fileType
}

// 修正：从props.projectDetail获取taskId，而非未定义的formState
const downloadDocLumneFun = async (fileType: string) => {
  // 1. 校验必要参数（保留原有逻辑）
  if (!props.projectDetail) {
    message.error('项目信息未加载，请刷新页面重试！')
    return
  }
  const { taskId, methodId } = props.projectDetail
  if (!taskId) {
    message.error('请先选择或创建任务，再进行导出！')
    return
  }
  if (!methodId) {
    message.error('方法ID未配置，无法导出！')
    return
  }

  try {
    // 2. 调用接口：支持txt格式（fileType动态传递）
    const res = await props.apiParams.downloadDocQuantityDetermind({
      taskId: taskId,
      methodId: methodId,
      allDisplay: checkValue.value.includes('1'),
      fileType: fileType,
      digit: digit.value,
      option: statisticalContent.value.join(','),
      // analysisIds: 选中的样品ID列表
    })

    // 3. 处理下载：根据fileType动态设置文件名和MIME类型
    // 文件名后缀适配：word→docx，xlsx→xlsx，txt→txt
    const fileSuffixMap = {
      word: 'docx',
      xlsx: 'xlsx',
      txt: 'txt',
    }
    const fileSuffix = fileSuffixMap[fileType as keyof typeof fileSuffixMap] || 'txt'
    const fileName = `定量测定数据_${new Date().toLocaleDateString().replace(/\//g, '-')}.${fileSuffix}`

    // MIME类型适配：txt对应text/plain
    const mimeTypeMap = {
      word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      txt: 'text/plain',
    }
    const mimeType = mimeTypeMap[fileType as keyof typeof mimeTypeMap] || 'text/plain'

    // 执行下载
    useDownloadFile(res, fileName, mimeType)

    // 提示信息适配
    message.success(
      `导出${fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'}文件成功！`,
    )
  } catch (error: any) {
    // 错误提示适配
    const errorMsg =
      error.response?.data?.message ||
      `导出${
        fileType === 'word' ? 'Word' : fileType === 'xlsx' ? 'Excel' : 'txt'
      }文件失败，请重试！`
    message.error(errorMsg)
    console.error('导出接口调用失败：', error)
  }
}

defineExpose({
  getTableHead,
  getUnTableHead,
  fetchData,
})

// const value1 = ref('')
// const saveVisual = ref(false)

// const chartFixedDomRef = ref<HTMLElement | null>()
// const lineChartRefDiv = ref<HTMLElement | null>()
// let observer: IntersectionObserver
// const linChartFixed = () => {
//   const chartEl = lineChartRefDiv.value // 获取组件真实 DOM 元素
//   const chartFixedRef = chartFixedDomRef.value
//   if (!chartEl || !chartFixedRef) return
//   // 创建 IntersectionObserver
//   observer = new IntersectionObserver(
//     ([entry]) => {
//       if (!entry.isIntersecting) {
//         // 图表离开视口，开始固定
//         // chartEl.style.visibility = 'hidden'
//         chartFixedRef.style.visibility = 'visible'
//       } else {
//         // 图表回到视口，取消固定
//         // chartEl.style.visibility = 'visible'
//         chartFixedRef.style.visibility = 'hidden'
//       }
//     },
//     {
//       threshold: 0, // 只要有一部分离开就触发
//       rootMargin: '0px 0px 300px 0px',
//     },
//   )
//   observer.observe(chartEl)
// }
// const closeSmallChart = () => {
//   const chartFixedRef = chartFixedDomRef.value
//   if (!chartFixedRef) return
//   chartFixedRef.style.visibility = 'hidden'
// }

// onMounted(() => {
//   linChartFixed()
// })
</script>

<style scoped lang="less">
.nav-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;

  .nav-item {
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 28px;
    cursor: pointer;
    background-color: @button-bg-color;

    &:hover {
      transform: scale(1.05);
    }

    .icon-box {
      width: 30px;
      height: 30px;
      background-size: auto 60%;
      background-position: center center;
      background-repeat: no-repeat;
      margin-right: 5px;
    }
  }
}

.curveFormula-box {
  background-color: #153471;
  color: #fff;
  // display: flex;
  // justify-content: center;
  width: 100%;
  // height: 40px;
  line-height: 24px;
  overflow-x: auto;
  white-space: nowrap; // 防止内容换行
  padding: 5px 10px;

  // 确保内部元素不会被压缩
  > * {
    flex-shrink: 0;
  }
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// // 已删除行的样式 - 应用到单元格而不是整行
// :deep(.deleted-row > td) {
//   position: relative;

//   &::after {
//     content: '';
//     position: absolute;
//     top: 50%;
//     left: 0;
//     right: 0;
//     height: 1px;
//     background-color: #666;
//     transform: translateY(-50%);
//     z-index: 1;
//   }
// }

// // 移除固定右侧列的删除线
// :deep(.deleted-row > td.ant-table-cell-fix-right::after) {
//   display: none;
// }
</style>
