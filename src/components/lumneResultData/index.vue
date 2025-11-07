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
              class="w-xs !m-2"
              :min="0"
              :max="10"
              :step="1"
              @blur="changeDigit"
            />
          </div>
          <a-checkbox-group
            v-if="isRepeat"
            v-model:value="statisticalContent"
            @change="queryDataInfoFun"
          >
            <a-checkbox value="avg">平均值</a-checkbox>
            <a-checkbox value="sd">SD</a-checkbox>
            <a-checkbox value="rsd">RSD</a-checkbox>
          </a-checkbox-group>
          <a-checkbox-group v-model:value="checkValue">
            <a-checkbox value="0">
              <span class="text-[14px] text-[#595757]">显示已删除的数据</span>
            </a-checkbox>
            <a-checkbox value="1" v-if="luminosityProps !== '3' && luminosityProps !== '4'">
              <span class="text-[14px] text-[#595757]">同时显示Abs与T%</span>
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </template>
      <template #slot-content>
        <template v-if="pageType === 'default'">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex items-center">
              <uvHasIconBtn content="样品" class="!mr-[20px]" @click="showSampleSetting">
              </uvHasIconBtn>
              <uvHasIconBtn
                content="校零"
                class="!mr-[20px]"
                @click="xiaoZero"
                :loading="zeroLoading"
              >
              </uvHasIconBtn>
              <uvHasIconBtn content="测量" @click="measure('')" :loading="finished === '1'">
              </uvHasIconBtn>
            </div>
            <div>
              <span class="!mr-[10px] flex-shrink-0 text-[16px] text-[#113371]">前处理操作</span>
              <a-select ref="select" v-model:value="beforeOperation" class="w-xs">
                <a-select-option v-for="item in props.dealArr" :key="item"
                  >{{ item }}
                </a-select-option>
              </a-select>
            </div>
            <div class="flex items-center">
              <uvHasIconBtn content="保存" class="!mr-[20px]" @click="saveLumneTaskFun">
              </uvHasIconBtn>
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
          <a-row class="!mt-[10px]">
            <uvHasIconBtn content="列配置" @click="configColumn()"></uvHasIconBtn>
          </a-row>
        </template>
        <template v-else>
          <div class="flex items-center justify-between flex-wrap">
            <div class="nav-box flex flex-wrap px-4 pb-4 gap-2">
              <div v-for="item in navList.slice(0, 3)" :key="item.icon" @click="item.clickFun">
                <div v-show="item.isShow" style="padding: 4px 10px" class="nav-item">
                  <div
                    v-if="item.name !== '测量' || (item.name === '测量' && finished === '0')"
                    class="icon-box"
                    :style="{ backgroundImage: `url(${item.icon})` }"
                  ></div>
                  <component
                    v-else
                    class="!mr-[15px] text-[20px] !text-[#137921]"
                    :is="item.icon"
                  />
                  <div class="!font-bold !text-[18px]" :style="{ color: item.color }">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="nav-box flex flex-wrap px-4 pb-4 gap-2">
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

        <div class="overflow-x-auto">
          <a-table
            size="small"
            :dataSource="tableOptions.data"
            :columns="tableOptions.columns"
            :pagination="tableOptions.pagination"
            :expandedRowKeys="expandedRowKeys"
            :rowKey="tableOptions.rowKey"
            :rowClassName="rowClassName"
            @resizeColumn="handleResizeColumn"
            @expand="handleExpand"
          >
            <template #abs="{ record }">
              <div>
                {{ record.abs1 }}
                <IconFont type="icon-up" />
                <IconFont type="icon-arrdown" />
              </div>
            </template>
            <template #remark="{ record }">
              <a-input
                v-model:value="record.remark"
                placeholder="请输入备注"
                @blur="saveDataInfoRemarkFun(record)"
              />
            </template>
            <template #operation="{ record }">
              <div class="flex justify-around gap-4">
                <DeleteOutlined
                  v-if="record && record.deleteType && record.deleteType === '0'"
                  @click="deleteOneSampleFun(record)"
                />
                <RollbackOutlined
                  v-if="record && record.deleteType && record.deleteType === '1'"
                  @click="revokeDelFun(record)"
                />
                <SyncOutlined
                  v-if="isRepeat ? record && record.children : true"
                  :spin="record && finished === '1' && measureSampleId === record.sampleId"
                  @click.stop="record && finished !== '1' && measureSingle(record.sampleId)"
                />
              </div>
            </template>
          </a-table>
        </div>
      </template>
    </uvCollapseRightSlot>
    <sampleSettingModel
      v-model="sampleSetVisible"
      v-if="sampleSetVisible"
      :taskId="formState.taskId"
      :methodId="formState.methodId"
      :measureType="`光度测量`"
      @addSampleSuccess="refreshTable"
    />
    <columnModel
      v-if="columnVisual"
      v-model="columnVisual"
      size="smail"
      :taskId="formState.taskId"
      :methodId="formState.methodId"
      :measureType="`光度测量`"
      :tableHeadData="tableHeadData"
      :apiParams="{
        queryInputParamMapTableHead: apiParams.queryInputParamMapTableHead, //  查询映射关系及表头
        saveInputParamMapTableHead: apiParams.saveInputParamMapTableHead, // 查询已绑定的映射关系
        queryInputParam: apiParams.queryInputParam,
      }"
      @saveParamMapTableHeadSuccess="getTableHeadFun"
    />
    <save-modal-tip v-model="tipVisual" @confirm="saveDraft" />
    <save-as-modal ref="saveAsModelRef" @update:modelValue="saveAsTask" />
    <report-preview
      v-model="reportPreviewVisible"
      :taskId="formState.taskId"
      :measureType="`光度测量`"
      :showAbsOrT="checkValue.includes('1') ? '1' : '0'"
      v-if="reportPreviewVisible"
      :footer="null"
    />
  </section>
</template>
<script lang="ts" setup>
import {
  DeleteOutlined,
  LoadingOutlined,
  RollbackOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { Input, message, Modal, notification } from 'ant-design-vue'
import { h, onUnmounted, reactive, ref, watch } from 'vue'

import columnModel from '@/components/quantityResultData/components/columnModel.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import webSocketService from '@/utils/websocket'

import {
  conciseCopy,
  conciseLumneAddDraft,
  conciseLumneCreateSample,
  conciseLumneReAnalyze,
} from '@/api'
import analyzeIcon from '@/assets/images/experiment/analyze.png'
import column from '@/assets/images/experiment/column.png'
import copyIcon from '@/assets/images/experiment/copy.png'
import importIcon from '@/assets/images/experiment/import.png'
import measureIcon from '@/assets/images/experiment/measure.png'
import newIcon from '@/assets/images/experiment/new.png'
import sampleIcon from '@/assets/images/experiment/sample.png'
import saveIcon from '@/assets/images/experiment/save.png'
import zeroIcon from '@/assets/images/experiment/zero.png'
import sampleSettingModel from '@/components/measureResult/components/sampleSetting.vue'
import saveAsModal from '@/views/methodOptimization/components/saveAsModal.vue'
import SaveModalTip from '@/views/methodOptimization/components/saveModalTip.vue'

const appStore = useAppStore()
const userStore = useUserStore()

const props = defineProps({
  dealArr: {
    type: Array,
    default: () => [],
  },
  isRepeat: {
    type: Boolean,
    default: false,
  },
  projectDetail: {
    type: Object,
    default: () => ({}),
  },
  pageType: {
    type: String,
    default: 'default',
  },
  wsUrl: {
    type: String,
    default: '',
  },
  luminosityProps: {
    type: String,
    default: '',
  },
  apiParams: {
    type: Object,
    required: true,
    validator(value: Record<string, any>) {
      return [
        'getLumneCurrentInfo',
        'deleteLumneOneSample',
        'downloadDocLumne',
        'getLumneTableHead',
        'queryLumneDataInfo',
        'queryNewMethodTaskInfo',
        'revokeLumneDel',
        'saveLumneDataInfoRemark',
        'saveLumneTask',
        'zeroPhotometricMeasurement',
        'queryInputParamMapTableHead',
        'saveInputParamMapTableHead',
        'getLumneSampleList',
        'querySampleHeads',
        'addOrDeleteLumneSample',
        'queryInputParam',
      ].every((key) => key in value)
    },
  },
})

const formState = ref<Record<string, any>>({})
const reportPreviewVisible = ref(false)
const emit = defineEmits(['addDraftSuccess', 'changePoolNum'])

// 按钮
const navList = ref([
  {
    name: '样品',
    icon: sampleIcon,
    className: 'w-[38px]',
    color: '#C649A1',
    clickFun: () => showSampleSetting(),
    isShow: true,
  },
  {
    name: '校零',
    icon: zeroIcon,
    className: 'w-[57px]',
    color: '#133379',
    clickFun: () => xiaoZero(),
    isShow: props.luminosityProps === '1' || props.luminosityProps === '2' ? true : false,
  },
  {
    name: '测量',
    icon: measureIcon,
    className: 'w-[39px]',
    color: '#137921',
    clickFun: () => measure(''),
    isShow: true,
  },
  {
    name: '重新分析',
    icon: analyzeIcon,
    className: 'w-[20px]',
    color: '#135679',
    clickFun: () => reAnalyze(),
    isShow: true,
  },
  {
    name: '新建',
    icon: newIcon,
    className: 'w-[33px]',
    color: '#135679',
    clickFun: () => addDraft(),
    isShow: true,
  },
  {
    name: '保存',
    icon: saveIcon,
    className: 'w-[57px]',
    color: '#FF9138',
    clickFun: () => saveLumneTaskFun(),
    isShow: true,
  },
  {
    name: '另存为',
    icon: saveIcon,
    className: 'w-[57px]',
    color: '#FF9138',
    isShow: true,
    clickFun: () => saveAs(),
  },
  // {
  //   name: '导出列表',
  //   icon: importIcon,
  //   className: 'w-[57px]',
  //   color: '#A48FFF',
  //   clickFun: () => downloadDocLumneFunDzy(),
  // },
  // {
  //   name: '复制',
  //   icon: copyIcon,
  //   className: 'w-[57px]',
  //   color: '#06B8C3',
  //   isShow: true,
  // },
  {
    name: '报告',
    icon: copyIcon,
    className: 'w-[57px]',
    color: '#06B8C3',
    isShow: true,
    clickFun: () => {
      reportPreviewVisible.value = true
    },
  },
  {
    name: '列配置',
    icon: column,
    className: 'w-[57px]',
    color: '#5B0D97',
    clickFun: () => configColumn(),
    isShow: true,
  },
])
watch(
  () => props.luminosityProps,
  (newValue: any) => {
    if (newValue) {
      navList.value.forEach((item: any) => {
        if (item.name === '校零') {
          item.isShow = newValue === '1' || newValue === '2'
        } else {
          item.isShow = true
        }
      })
    }
  },
  { deep: true, immediate: true },
)
/*********************************** 参数查询 abs| ************************************/
const digit = ref<number>(4) // abs
const changeDigit = async () => {
  if (!digit.value) digit.value = 4
  await queryDataInfoFun()
}
const statisticalContent = ref<string[]>([]) // 平均值|SD|RSD
const beforeOperation = ref('') // 前处理
// 显示已删除
const checkValue = ref<string[]>([])
watch(
  () => checkValue.value,
  (newValue) => {
    refreshTable()
  },
)

/*********************************** 表格数据 ************************************/
const tableOptions = ref({
  rowKey: 'id',
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
      resizable: true,
      width: 60,
    },
    {
      title: '编号',
      dataIndex: 'sampleNumber',
      width: 60,
      resizable: true,
    },
    {
      title: '名称',
      dataIndex: 'sampleName',
      width: 200,
      resizable: true,
    },
    {
      title: '位置',
      dataIndex: 'sampleLocation',
      width: 200,
      resizable: true,
    },
    {
      title: '采样时间',
      dataIndex: 'samplingTime',
      width: 200,
      resizable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 200,
      resizable: true,
      slots: { customRender: 'remark' },
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      slots: { customRender: 'operation' },
    },
  ],
  data: [],
  pagination: false,
})
const rowClassName = (record: any) => {
  return record && record.deleteType && record.deleteType === '1' ? 'deleted-row' : ''
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
const tableHeadData = ref([])
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = async (data: any) => {
  const column = [
    {
      title: '序号',
      dataIndex: 'id',
      ellipsis: true,
      resizable: true,
      width: 50,
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
        customRender: (data: { text: string; record: any; index: number; column: any }) => {
          return h(Input, {
            value: data.text,
            'onUpdate:value': (value: string) => {
              data.record[data.column.dataIndex] = value
            },
            onBlur: (e: Event) => {
              saveDataInfoRemarkFun(data)
            },
            placeholder: '请输入内容',
          })
        },
        width: item.identity === 'sampleNumber' ? 60 : 150,
        locate: item.locate,
      }
    } else {
      return {
        title: item.name,
        dataIndex: item.identity,
        ellipsis: true,
        resizable: true,
        width: item.identity === 'sampleNumber' ? 60 : 150,
        locate: item.locate,
      }
    }
  })
  column.splice(1, 0, ...dataColumn)
  return column
}
// 表头
const getTableHeadFun = async () => {
  const { code, data } = await props.apiParams.getLumneTableHead({
    taskId: formState.value.taskId,
    methodId: formState.value.methodId,
    allDisplay: checkValue.value.includes('1'),
  })
  if (code === 200) {
    tableHeadData.value = data?.filter((item: any) => item.locate !== 'analyze')
    tableOptions.value.columns = await transformColumnData(data)
  }
}
// 表格数据
const queryDataInfoFun = async () => {
  const { code, data } = await props.apiParams.queryLumneDataInfo({
    taskId: formState.value.taskId || '',
    allDisplay: checkValue.value.includes('0'),
    digit: digit.value,
    option: statisticalContent.value,
  })
  if (code === 200) {
    data.forEach((item: any, index: number) => {
      item.id = index + 1
      expandedRowKeys.value.push(index + 1)
      item.children?.forEach((child: any, indexx: number) => {
        child.id = index + 1 + '-' + (indexx + 1)
      })
    })
    tableOptions.value.data = data
  }
}
defineExpose({
  getTableHeadFun,
  queryDataInfoFun,
})
// 删除
const deleteOneSampleFun = async (record: { sampleId: any }) => {
  Modal.confirm({
    title: '您确定要删除吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      const { code, data } = await props.apiParams.deleteLumneOneSample({
        taskId: formState.value.taskId,
        sampleId: record.sampleId,
      })
      if (code === 200) {
        message.success('删除成功！')
        queryDataInfoFun()
      }
    },
  })
}
// 撤销删除
const revokeDelFun = async (record: { sampleId: any }) => {
  const { code, data } = await props.apiParams.revokeLumneDel({
    taskId: formState.value.taskId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    queryDataInfoFun()
  }
}
// 保存备注
const saveDataInfoRemarkFun = async (rowData: any) => {
  const { data, code } = await props.apiParams.saveLumneDataInfoRemark({
    taskId: formState.value.taskId,
    sampleId: rowData.record.sampleId,
    data: {
      [rowData.column.dataIndex]: rowData.text,
    },
  })
  if (code === 200) {
    queryDataInfoFun()
  }
}
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}

/*********************************** 重新分析 *************************************/
const reAnalyze = async () => {
  const { code } = await conciseLumneReAnalyze({
    taskId: formState.value.taskId,
  })
  if (code === 200) {
    message.success('重新分析成功！')
  }
  refreshTable()
}

/*********************************** 新建草稿 *************************************/
const tipVisual = ref(false)
const addDraft = async () => {
  tipVisual.value = true
}
const saveDraft = async (value: any) => {
  if (formState.value.methodId) {
    const { code } = await conciseLumneAddDraft({
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

/*********************************** 样品按钮 ************************************/
const sampleSetVisible = ref(false)
//显示样品信息
const showSampleSetting = () => {
  sampleSetVisible.value = true
}
const refreshTable = () => {
  getTableHeadFun()
  queryDataInfoFun()
}

/*********************************** 校零 ************************************/
const zeroLoading = ref(false)
const xiaoZero = async () => {
  if (!formState.value.methodId) message.error('请创建方法！')
  if (!(await useIsMethodApply())) return
  Modal.confirm({
    content: '请插入校零样品！',
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      zeroLoading.value = true
      props.apiParams
        .zeroPhotometricMeasurement({
          methodId: formState.value.methodId,
          taskId: formState.value.taskId,
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

/*********************************** 测量 ************************************/
const measureData = reactive({
  nm: 0,
  abs: 0,
})
const handleMessage = async (event: MessageEvent) => {
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
    if (data.result === 'finish') {
      finished.value = '0'
      useQuerySaveState(formState.value.taskId)
      queryDataInfoFun()
    }
  }
}
const measureSampleId = ref('')
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
  if (sampleId === '') {
    if (!(await useIsMethodApply())) return
  }
  const modal = Modal.confirm({
    content: '请插入样品！',
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      modal.destroy()
      if (!sampleId) await handleAutoSample()
      await queryDataInfoFun()
      await handleWebSocket(sampleId || '')
    },
  })
}
// 没样品的时候自动添加样品
const handleAutoSample = async () => {
  await conciseLumneCreateSample({
    taskId: formState.value.taskId,
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
  webSocketService.setBaseUrl(props.wsUrl)
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: (event) => {
      finished.value = '0'
      console.log('WebSocket 连接已关闭', event)
    },
    onError: (event) => console.error('WebSocket 错误', event),
  })
  webSocketService.connect({
    taskId: formState.value.taskId,
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

/*********************************** 保存 ************************************/
const saveLumneTaskFun = async () => {
  const { code, data } = await props.apiParams.saveLumneTask({
    taskId: formState.value.taskId || '',
  })
  if (code === 200) {
    message.success('保存成功！')
    await useQuerySaveState(formState.value.taskId)
  }
}

const downloadDocLumneFunDzy = async () => {
  const res = await props.apiParams.downloadDocLumne({
    taskId: formState.value.taskId,
    allDisplay: checkValue.value.includes('1'),
  })
  useDownloadFile(res, '光度测量列表.docx')
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

/*********************************** 导出 ************************************/
const handleExportMenuClickLj = (menuItem: { key: string }) => {
  const fileType = menuItem.key // 拿到选择的类型："word" 或 "xlsx"
  downloadDocLumneFun(fileType) // 调用导出方法并传递fileType
}

// 修改：导出方法新增fileType参数，传递给接口
const downloadDocLumneFun = async (fileType: string) => {
  // 1. 校验必要参数（避免无任务ID时请求）
  if (!formState.value.taskId) {
    message.error('请先选择任务，再进行导出！')
    return
  }

  try {
    // 2. 调用接口：新增fileType参数，传递选择的导出类型
    const res = await props.apiParams.downloadDocLumne({
      taskId: formState.value.taskId,
      allDisplay: checkValue.value.includes('1'),
      fileType: fileType, // 新增：传递下拉选择的类型（word/xlsx）
      digit: digit.value,
      option: statisticalContent.value.join(','),
    })

    // 3. 处理下载：根据fileType动态设置文件名后缀
    const fileSuffixMap = {
      word: 'docx',
      xlsx: 'xlsx',
      txt: 'txt',
    }
    const fileSuffix = fileSuffixMap[fileType as keyof typeof fileSuffixMap] || 'txt'
    const fileName = `光度测量数据_${new Date().toLocaleDateString().replace(/\//g, '-')}.${fileSuffix}`
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

/*********************************** 列配置 ************************************/
const columnVisual = ref(false)
const configColumn = () => {
  columnVisual.value = true
}

/*********************************** 生命周期 ************************************/
const queryNewMethodTaskInfoFun = async () => {
  const { data, code } = await props.apiParams.queryNewMethodTaskInfo({
    taskId: route.query.taskId,
  })
  formState.value.projectId = data.projectId
  formState.value.projectName = data.projectName
  formState.value.taskName = data.taskName
  formState.value.taskId = data.taskId
  formState.value.methodId = data.methodId
}
const route = useRoute()
// onMounted(async () => {
//   if (route.query.taskId) {
//     await queryNewMethodTaskInfoFun()
//     await getTableHeadFun()
//     await queryDataInfoFun()
//   }
// })
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
    if (newTaskId) {
      await queryDataInfoFun()
    }
    if (newTaskId || newMethodId) {
      await getTableHeadFun()
    }
  },
  { deep: true },
)
onUnmounted(() => {
  webSocketService.close()
})

// const getCurrentInfoFun = async () => {
//   const { data, code } = await props.apiParams.getLumneCurrentInfo({ measureType: '光度测量' })
//   formState.value.projectId = data.projectId
//   formState.value.projectName = data.projectName
//   formState.value.taskId = data.taskId
//   formState.value.methodId = data.methodId
// }

// const value1 = ref('')
// const saveVisual = ref(false)
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

:deep(.ant-table-tbody) {
  min-height: 300px;
}

:deep(.ant-table-tbody) {
  min-height: 300px;
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
