<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <uvCollapseRightSlot title="结果数据">
      <template #slot-header>
        <div class="flex gap-4 items-center" @click.stop>
          <div class="flex items-center">
            <span class="text-[14px] text-[#595757]">Abs显示位数</span>
            <a-input-number
              v-model:value="digit"
              class="w-xs !m-2"
              :min="0"
              :max="10"
              :step="1"
              @blur="queryDataInfoFun"
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
            <a-checkbox value="1">
              <span class="text-[14px] text-[#595757]">同时显示Abs与T%</span>
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </template>
      <template #slot-content>
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
            <uvHasIconBtn content="测量" @click="measure('')" :loading="finished === '1'">
            </uvHasIconBtn>
          </div>
          <!-- <div class="showWord">
            <div class="!mr-[20px]">{{ measureData.nm }}nm</div>
            <div>{{ measureData.abs }}abs</div>
          </div> -->
          <div>
            <span class="!mr-[10px] flex-shrink-0 text-[16px] text-[#113371]">前处理操作</span>
            <a-select ref="select" v-model:value="beforeOperation" class="w-xs">
              <a-select-option v-for="item in props.dealArr" :key="item"
                >{{ item }}
              </a-select-option>
            </a-select>
          </div>
          <div class="flex items-center">
            <uvHasIconBtn content="保存" class="!mr-[30px]" @click="saveLumneTaskFun">
            </uvHasIconBtn>
            <uvHasIconBtn content="导出到word" @click="downloadDocLumneFun"></uvHasIconBtn>
          </div>
        </div>
        <a-row>
          <uvHasIconBtn content="列配置" @click="configColumn()"></uvHasIconBtn>
        </a-row>

        <div class="table-box">
          <a-table
            size="small"
            :dataSource="tableOptions.data"
            :columns="tableOptions.columns"
            :pagination="tableOptions.pagination"
            :rowSelection="true"
            rowKey="sampleId"
            @resizeColumn="handleResizeColumn"
          >
            <template #indexField="{ record, index }">
              <span v-if="record.deleteType === '1'">[X]</span>
              {{ index + 1 }}
            </template>
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
                  v-if="record.deleteType === '0'"
                  @click="deleteOneSampleFun(record)"
                />
                <RollbackOutlined v-if="record.deleteType === '1'" @click="revokeDelFun(record)" />
                <SyncOutlined
                  :spin="finished === '1' && measureSampleId === record.sampleId"
                  @click.stop="finished !== '1' && measureSingle(record.sampleId)"
                />
              </div>
            </template>
          </a-table>
        </div>
      </template>
    </uvCollapseRightSlot>
    <uvModal v-model="saveVisual" size="smail" title="保存">
      <template #content>
        <div class="flex items-center">
          <div class="w-20">数据名称</div>
          <a-input ref="select" v-model:value="value1" class="w-xs !ml-2"></a-input>
        </div>
        <br />
      </template>
    </uvModal>
    <!--  <spectralSampleSetting-->
    <!--    v-model="sampleSetVisible"-->
    <!--    v-if="sampleSetVisible"-->
    <!--    :taskId="formState.taskId"-->
    <!--    :methodId="formState.methodId"-->
    <!--    @sampleSaveSuccess="refreshTable"-->
    <!--  />-->
    <sampleSetting
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
      :apiParams="columnApi"
      @saveParamMapTableHeadSuccess="getTableHeadFun"
    />
  </section>
</template>
<script lang="ts" setup>
import {
  CloseOutlined,
  DeleteOutlined,
  RollbackOutlined,
  SyncOutlined,
} from '@ant-design/icons-vue'
import { Input, message } from 'ant-design-vue'
import { sample } from 'lodash-es'
import {
  computed,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  type PropType,
  reactive,
  ref,
  watch,
} from 'vue'

import {
  addOrDeleteLumneSample,
  getLumneSampleList,
  queryLumneSampleHeads,
  deleteLumneOneSample,
  downloadDocLumne,
  getLumneCurrentInfo,
  getLumneTableHead,
  queryLumneDataInfo,
  queryNewMethodTaskInfo,
  revokeLumneDel,
  saveLumneDataInfoRemark,
  saveLumneTask,
  zeroPhotometricMeasurement,
  queryInputParamMapTableHead,
  saveInputParamMapTableHead,
} from '@/api'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import webSocketService from '@/utils/websocket'
import columnModel from '@/views/experiment/quantityDetermind/components/columnModel.vue'

import spectralSampleSetting from './spectralSampleSetting.vue'
import sampleSetting from '@/components/measureResult/components/sampleSetting.vue'
const props = defineProps({
  imageBase64: String,
  dealArr: {
    type: Array,
    default: () => [],
  },
  taskId: String,
  isRepeat: {
    type: Boolean,
    default: false,
  },
})
watch(
  () => props.taskId,
  (newValue) => {
    if (newValue) {
      formState.value.taskId = newValue
      setTimeout(() => {
        queryDataInfoFun()
        getTableHeadFun()
      }, 500)
    } else {
      tableOptions.value.columns = JSON.parse(JSON.stringify(tableOptionsCopy.value.columns))
      tableOptions.value.data = []
    }
  },
)
const sampleApi = {
  addOrDeleteSamplePort: addOrDeleteLumneSample, // 添加或删除样品
  querySampleList: getLumneSampleList, // 查询样品列表
  querySampleHeads: queryLumneSampleHeads, // 查询样品表头
}
const columnApi = {
  queryInputParamMapTableHead: queryInputParamMapTableHead, //  查询映射关系及表头
  saveInputParamMapTableHead: saveInputParamMapTableHead, // 查询已绑定的映射关系
}
provide('sampleApi', sampleApi)
const digit = ref<number>(4)
const statisticalContent = ref([])
const formState = ref<Record<string, any>>({})
const beforeOperation = ref('')
const tableOptions = ref({
  rowKey: 'sampleNumber',
  columns: [
    {
      title: '序号',
      width: 100,
      slots: { customRender: 'indexField' },
      resizable: true,
    },
    {
      title: '编号',
      dataIndex: 'sampleNumber',
      width: 80,
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
    // {
    //   title: '660Abs',
    //   dataIndex: 'abs1',
    //   width: 200,
    //   slots: { customRender: 'abs' },
    // },
    // {
    //   title: '450Abs',
    //   dataIndex: 'abs2',
    //   width: 200,
    //   slots: { customRender: 'abs' },
    // },
    // {
    //   title: '660T%',
    //   dataIndex: '660T',
    //   key: '660T',
    //   width: 200,
    // },
    // {
    //   title: '450%T',
    //   dataIndex: '450%T',
    //   key: '450%T',
    //   width: 200,
    // },
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
const tableOptionsCopy = ref({
  rowKey: 'sampleNumber',
  columns: [
    {
      title: '序号',
      width: 100,
      slots: { customRender: 'indexField' },
      resizable: true,
    },
    {
      title: '编号',
      dataIndex: 'sampleNumber',
      width: 80,
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
    // {
    //   title: '660Abs',
    //   dataIndex: 'abs1',
    //   width: 200,
    //   slots: { customRender: 'abs' },
    // },
    // {
    //   title: '450Abs',
    //   dataIndex: 'abs2',
    //   width: 200,
    //   slots: { customRender: 'abs' },
    // },
    // {
    //   title: '660T%',
    //   dataIndex: '660T',
    //   key: '660T',
    //   width: 200,
    // },
    // {
    //   title: '450%T',
    //   dataIndex: '450%T',
    //   key: '450%T',
    //   width: 200,
    // },
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
const columnVisual = ref(false)
const configColumn = () => {
  columnVisual.value = true
}
const refreshTable = () => {
  getTableHeadFun()
  queryDataInfoFun()
}
const tableHeadData = ref([])
const getTableHeadFun = async () => {
  const { code, data } = await getLumneTableHead({
    taskId: formState.value.taskId,
    methodId: formState.value.methodId,
    allDisplay: checkValue.value.includes('1'),
  })
  if (code === 200) {
    // const columnArr = data.map((item: any) => {
    //   return {
    //     title: item.name,
    //     dataIndex: item.identity,
    //     minWidth: 80,
    //     width: 150,
    //     resizable: true,
    //     // slots: { customRender: 'abs' }
    //   }
    // })
    tableHeadData.value = data
    // tableOptions.value.columns = JSON.parse(JSON.stringify(tableOptionsCopy.value.columns))
    // tableOptions.value.columns.splice(3, 0, ...columnArr)
    tableOptions.value.columns = transformColumnData(data)
  }
}
// 将动态列数据变成表格列数据格式并添加到表格列中
const transformColumnData = (data: any) => {
  const column = [
    {
      title: '序号',
      width: 100,
      slots: { customRender: 'indexField' },
      resizable: true,
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
        width: 150,
      }
    } else {
      return {
        title: item.name,
        dataIndex: item.identity,
        ellipsis: true,
        resizable: true,
        width: 150,
      }
    }
  })
  column.splice(1, 0, ...dataColumn)
  return column
}
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w
}

const queryDataInfoFun = async () => {
  const { code, data } = await queryLumneDataInfo({
    taskId: formState.value.taskId || '',
    allDisplay: checkValue.value.includes('0'),
    digit: digit.value,
    option: statisticalContent.value,
  })
  if (code === 200) {
    tableOptions.value.data = data
  }
}
const saveLumneTaskFun = async () => {
  const { code, data } = await saveLumneTask({
    taskId: formState.value.taskId || '',
  })
  if (code === 200) {
    message.success('数据保存成功！')
  }
}
const downloadDocLumneFun = async () => {
  const res = await downloadDocLumne({
    taskId: formState.value.taskId,
    allDisplay: checkValue.value.includes('1'),
  })
  useDownloadFile(res, '光度测量列表.docx')
}
const appStore = useAppStore()
const zeroLoading = ref(false)
const xiaoZero = async () => {
  if (!formState.value.methodId) message.error('请创建方法！')
  zeroLoading.value = true
  try {
    const { code, data } = await zeroPhotometricMeasurement({
      methodId: formState.value.methodId,
      taskId: formState.value.taskId,
    })
    if (code === 200) {
      message.success('校零成功！')
      appStore.setNm('0')
      appStore.setAbs('0')
      zeroLoading.value = false
    }
  } catch (err) {
    zeroLoading.value = false
  }
}
const revokeDelFun = async (record: { sampleId: any }) => {
  const { code, data } = await revokeLumneDel({
    taskId: formState.value.taskId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('撤销删除成功！')
    queryDataInfoFun()
  }
}
const deleteOneSampleFun = async (record: { sampleId: any }) => {
  const { code, data } = await deleteLumneOneSample({
    taskId: formState.value.taskId,
    sampleId: record.sampleId,
  })
  if (code === 200) {
    message.success('删除成功！')
    queryDataInfoFun()
  }
}
const getCurrentInfoFun = async () => {
  const { data, code } = await getLumneCurrentInfo({ measureType: '光度测量' })
  formState.value.projectId = data.projectId
  formState.value.projectName = data.projectName
  formState.value.taskId = data.taskId
  formState.value.methodId = data.methodId
}
const activeKey = ref('所有光谱')
const tabPaneArr = ref(['所有光谱'])
// const tabPaneArr = ref(['所有光谱', '样品1', '样品2', '样品1+样品2'])
const lineChartRef = ref()
const emit = defineEmits(['update:imageBase64'])

const measureData = reactive({
  nm: 0,
  abs: 0,
})
const task_id = ref('')
const handleMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  // chartData.value.push(...data.data)
  // data.data.forEach((item: any) => {
  //   measureData.nm = item.x
  //   measureData.abs = item.y
  // })
  console.log('收到消息:', data)
  tableOptions.value.data.forEach((item: any) => {
    if (item.sampleId === data.sampleId) {
      item[data.key] = data.value
    }
  })
  if (data.result === 'finish') {
    finished.value = '0'
  }
}
const measureSampleId = ref('')
const finished = ref('0') //1测量中
const measureSingle = async (sampleId: string) => {
  await measure(sampleId)
  setTimeout(() => {
    measureSampleId.value = sampleId
    queryDataInfoFun()
  }, 500)
}
const measure = async (sampleId?: string) => {
  // chartData.value = []
  webSocketService.setBaseUrl('ws/photometric')
  webSocketService.setCallbacks({
    onMessage: handleMessage,
    onOpen: (event) => console.log('WebSocket 连接已建立', event),
    onClose: (event) => console.log('WebSocket 连接已关闭', event),
    onError: (event) => console.error('WebSocket 错误', event),
  })
  webSocketService.connect({
    method_id: formState.value.methodId,
    taskId: formState.value.taskId,
    sampleId: sampleId || '',
    deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '30-U1604-01-0010',
  })
  finished.value = '1'
}
const checkValue = ref<string[]>([])
watch(
  () => checkValue.value,
  (newValue) => {
    getTableHeadFun()
    queryDataInfoFun()
  },
)
const value1 = ref('')
const saveVisual = ref(false)
const yShowRange = reactive({
  min: '',
  max: '',
})
const sampleSetVisible = ref(false)
//显示样品信息
const showSampleSetting = () => {
  sampleSetVisible.value = true
}
const queryNewMethodTaskInfoFun = async () => {
  const { data, code } = await queryNewMethodTaskInfo({ taskId: route.query.taskId })
  formState.value.projectId = data.projectId
  formState.value.projectName = data.projectName
  formState.value.taskName = data.taskName
  formState.value.taskId = data.taskId
  formState.value.methodId = data.methodId
}
// 保存备注
const saveDataInfoRemarkFun = async (record: any) => {
  const { data, code } = await saveLumneDataInfoRemark({
    taskId: formState.value.taskId,
    sampleId: record.sampleId,
    remark: record.remark,
  })
  if (code === 200) {
    queryDataInfoFun()
  }
}
const route = useRoute()
onMounted(() => {
  if (route.query.taskId) {
    queryNewMethodTaskInfoFun().then(() => {
      getTableHeadFun()
      queryDataInfoFun()
    })
  } else {
    getCurrentInfoFun().then(() => {
      getTableHeadFun()
      queryDataInfoFun()
    })
  }
})
onUnmounted(() => {
  webSocketService.close()
})
</script>
<style scoped lang="less">
.table-box {
  padding: 4px 15px 10px;
  background: #fff;
  border-radius: 4px;
}

.showWord {
  color: #3c8528;
  display: flex;
  align-content: center;
  font-weight: bold !important;
  font-size: 18px;

  > div {
    font-weight: bold !important;
  }
}
</style>
