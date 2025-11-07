<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <section class="nav-box">
      <div
        v-for="item in navList"
        :key="item.icon"
        class="flex flex-col items-center justify-center nav-item"
        @click="handleToPath(item)"
      >
        <div :style="{ width: item.width, height: 'auto' }">
          <img :src="item.icon" class="icon" />
        </div>
        <div class="!mt-[13px] text-[16px]" :style="{ color: item.color }">{{ item.name }}</div>
      </div>
    </section>
    <div class="experiment-container">
      <a-row class="!mb-5">
        <a-col :span="9">
          <div class="flex gap-4">
            <uvHasIconBtn :content="t('button.newProject')" @click.stop="handleCreateProject">
              <template #icon>
                <div class="add-img">
                  <img src="@/assets/images/experiment/add_icon.png" />
                </div>
              </template>
            </uvHasIconBtn>
            <uvHasIconBtn content="新建方法" @click.stop="() => (methodsVisible = true)">
              <template #icon>
                <div class="add-img">
                  <img src="@/assets/images/experiment/add_icon.png" />
                </div>
              </template>
            </uvHasIconBtn>
            <uvHasIconBtn content="创建任务" @click.stop="handleCreateTask">
              <template #icon>
                <div class="add-img">
                  <img src="@/assets/images/experiment/add_icon.png" />
                </div>
              </template>
            </uvHasIconBtn>
            <uvHasIconBtn content="方法调优"></uvHasIconBtn>
            <uvHasIconBtn content="接收新任务"></uvHasIconBtn>
            <uvHasIconBtn content="查看UVWin数据"></uvHasIconBtn>
          </div>
          <!-- <div class="experiment-left">
          <circleShow />
        </div> -->
        </a-col>
        <a-col :span="15" class="!overflow-hidden">
          <div class="!mb-4">
            <!-- <headTitle title="最近的任务">
            <template #btn>
              <div class="gap-4 flex">
                <uvHasIconBtn content="接受新任务">
                  <template #icon>
                    <DownloadOutlined />
                  </template>
                </uvHasIconBtn>
              </div>
            </template>
          </headTitle> -->
            <div class="flex justify-between items-center">
              <!-- <uvHasIconBtn content="接受新任务">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn> -->
            </div>
            <div>
              <!-- <customCard v-for="item in permissExperiment" :key="`${item}`">
              <template #left>
                <div class="!font-bold">地表水202505241426</div>
              </template>
              <template #right>
                <div>
                  <span class="float-right"><a href="#">用此方法直接测量</a></span>
                  <p>使用方法：地表水二氧化硫测量国标方法</p>
                  <p>使用方法：地表水二氧化硫测量国标方法</p>
                  <p>使用方法：地表水二氧化硫测量国标方法</p>
                  <p>使用方法：地表水二氧化硫测量国标方法</p>
                </div>
              </template>
            </customCard> -->
              <!-- <div class="flex justify-between flex-wrap gap-4">
              <a-card
                title="地表水202505241426"
                v-for="item in permissExperiment"
                :key="`${item}`"
                style="width: 49%"
              >
                <template #extra><a href="#">用此方法直接测量</a></template>
                <p>使用方法：地表水二氧化硫测量国标方法</p>
                <p>使用方法：地表水二氧化硫测量国标方法</p>
                <p>使用方法：地表水二氧化硫测量国标方法</p>
              </a-card>
            </div> -->
            </div>
          </div>
        </a-col>
      </a-row>
      <VueDraggable
        v-model="experimentList"
        ghostClass="ghost"
        :animation="150"
        class="flex flex-col gap-6"
      >
        <div
          v-for="(item, index) in experimentList"
          :key="`${index}${item.type}`"
          class="cursor-move"
        >
          <div class="top-box" v-if="item.type === 'task'">
            <a-row>
              <a-col :span="12" class="overflow-hidden flex items-center">
                <circleShow @moduleSelect="moduleSelect" />
              </a-col>
              <a-col :span="12" class="overflow-x-auto top-table">
                <!-- <div class="titleHead">{{ t('title.recentTask') }}</div> -->
                <a-tabs v-model:activeKey="activeKeyTask">
                  <a-tab-pane key="1" :tab="t('title.recentTask')"></a-tab-pane>
                  <a-tab-pane key="0" tab="最近创建任务"></a-tab-pane>
                </a-tabs>
                <uv-table :table-options="tableOptions"></uv-table>
              </a-col>
            </a-row>
          </div>
          <a-row v-if="item.type === 'project'">
            <a-col :span="24">
              <uvCollapseRightSlot :parentActiveKey="activeKey" title="项目统计">
                <template #slot-content>
                  <a-row>
                    您一共参与了<span>{{ statistics.projectCount }}</span
                    >个项目， 其中建立方法<span>{{ statistics.methodCount }}</span
                    >个， 完成测量任务<span>{{ statistics.taskCount }}</span
                    >个
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <div style="height: 100%">
                        <uv3DColumnChart
                          :data1="statistics.data.map((item) => item.methodCount)"
                          :data2="statistics.data.map((item) => item.taskCount)"
                          :nameArr="statistics.data.map((item) => item.projectName)"
                          :legendName="['方法数', '任务数']"
                          @click="click3DColumn"
                        />
                      </div>
                    </a-col>
                    <a-col :span="12">
                      <!-- <uv-table :table-options="tableProjectOptions"></uv-table> -->
                      <a-card :title="statistics.data[dataIndex]?.projectName">
                        <!-- <template #extra>查看详情</template> -->
                        <!-- <p>创建人 Admin</p>
                      <p>创建时间 2025-06-10</p>
                      <p>最近更新人 2025-06-22</p>
                      <p>最近更新时间 2025-06-22</p>
                      <p>方法个数 8</p> -->
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >创建人
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >{{ statistics.data[dataIndex]?.creator }}
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >创建时间
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >{{ statistics.data[dataIndex]?.createTime }}
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >最近更新人
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >{{ statistics.data[dataIndex]?.updateBy }}
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >最近更新时间
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >{{ statistics.data[dataIndex]?.updateTime }}
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >方法个数
                        </a-card-grid>
                        <a-card-grid style="width: 50%; text-align: center" :hoverable="false"
                          >{{ statistics.data[dataIndex]?.methodCount }}
                        </a-card-grid>
                      </a-card>
                    </a-col>
                  </a-row>

                  <!-- <a-table :dataSource="dataSource" :columns="columns" :paginatio="false">
                    <template #bodyCell="{ column }">
                      <template v-if="column.key === 'operation'">
                        <uvHasIconBtn content="项目详情" @click="catProjectDetail">
                          <template #icon>
                            <DownloadOutlined />
                          </template>
                        </uvHasIconBtn>
                      </template>
                    </template>
                  </a-table> -->
                </template>
              </uvCollapseRightSlot>
            </a-col>
          </a-row>
          <a-row v-if="item.type === 'methods'">
            <a-col :span="24">
              <uvCollapseRightSlot :parentActiveKey="activeKey" title="方法列表">
                <template #slot-center>
                  <div class="flex items-center">
                    <div class="relative">
                      <a-input v-model:value="methodsValue" placeholder="搜索方法" />
                      <SearchOutlined class="absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </template>
                <template #slot-header>
                  <a-button
                    type="primary"
                    class="!flex flex-row items-center !mr-10"
                    @click.stop="handleImport"
                  >
                    <template #icon>
                      <upload-outlined />
                    </template>
                    导入
                  </a-button>
                  <a-button
                    type="primary"
                    class="!flex flex-row items-center !mr-10"
                    @click.stop="handleExport"
                  >
                    <template #icon>
                      <download-outlined />
                    </template>
                    导出
                  </a-button>
                </template>
                <template #slot-content>
                  <a-table
                    :dataSource="tableMethodsOptions.data"
                    :columns="tableMethodsOptions.columns"
                    :rowKey="tableMethodsOptions.rowKey"
                    :row-selection="rowSelection"
                    :pagination="tableMethodsOptions.pagination"
                    @change="handleTableChange"
                  >
                    <template #lastUseTime="{ text }">
                      {{ text }}
                    </template>
                    <template #operation="{ record }">
                      <div class="flex w-full justify-around">
                        <IconFont
                          type="icon-glasses-classic"
                          class="cursor-pointer"
                          @click="catMethodsDetail(record)"
                        />
                      </div>
                    </template>
                  </a-table>
                </template>
              </uvCollapseRightSlot>
            </a-col>
          </a-row>
        </div>
      </VueDraggable>
    </div>
    <create-project
      v-model="projectVisible"
      v-if="projectVisible"
      @projectCreateSuccess="queryProjectStatisticsFun"
    />
    <create-methods
      v-model="methodsVisible"
      v-if="methodsVisible"
      @createMethodsSuccess="queryProjectStatisticsFun"
    />
    <create-task
      v-model:model-value="createTaskVisible"
      v-if="createTaskVisible"
      @taskMessage="taskSuccess"
    />
    <import-modal
      ref="importModalRef"
      :acceptTypes="'.xls,.xlsx'"
      importUrl="/com/persee/workstation/uv-inexus/experimenttest/sys/methodImport"
      @import-success="importSuccess"
    />
    <editParamsLumne
      v-model="editParamsLumneVisible"
      v-if="editParamsLumneVisible"
      :form-disabled="true"
      :addOrEdit="`edit`"
      :methodsParams="methodsParams"
    />
    <editParamsTime
      v-model="editParamsTimeVisible"
      v-if="editParamsTimeVisible"
      :form-disabled="true"
      :addOrEdit="`edit`"
      :methodsParams="methodsParams"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { color } from 'echarts'
import { computed, h, onMounted, reactive, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useRouter } from 'vue-router'

import {
  listOfMethods,
  methodExport,
  queryMethodParam,
  queryProjectStatistics,
  recentlyAccomplishTask,
  recentlyCreatedTasks,
} from '@/api'
import doubleGroupMeasurementIcon from '@/assets/images/experiment/double_group_measurement_icon.png'
import photometricMeasurementIcon from '@/assets/images/experiment/photometric_measurement_icon.png'
import quantitativeDeterminationIcon from '@/assets/images/experiment/quantitative_determination_icon.png'
import spectralScanningIcon from '@/assets/images/experiment/spectral_scanning_icon.png'
import timeScanIcon from '@/assets/images/experiment/time_scan_icon.png'
import uv3DColumnChart from '@/components/uv3DColumnChart/index.vue'
import uvCollapseRightSlot from '@/components/uvCollapseRightSlot/index.vue'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvTable from '@/components/uvTable/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import editParamsLumne from '@/views/experiment/lumneScence/components/editParams.vue'
import editParamsTime from '@/views/experiment/timeScan/components/editParams.vue'

import circleShow from './components/circleShow.vue'
import createMethods from './components/createMethods.vue'
import createProject from './components/createProject.vue'
import createTask from './components/createTask.vue'

const selectedRowKeys = ref<string[]>([])
const experimentList = ref([
  {
    type: 'task',
    show: true,
  },
  {
    type: 'methods',
    show: true,
  },
  {
    type: 'project',
    show: true,
  },
])
const { t } = useI18n()
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (selectedKeys: string[]) => {
    selectedRowKeys.value = selectedKeys
  },
  columnWidth: 40,
}))
const methodsValue = ref('')
const navList = [
  {
    name: '光度测量',
    icon: photometricMeasurementIcon,
    width: '40px',
    height: '51px',
    color: '#5CB265',
    toPath: '/experiment/lumneScence',
  },
  {
    name: '定量测定',
    icon: quantitativeDeterminationIcon,
    width: '45px',
    height: '48px',
    color: '#5B81D1',
    toPath: '/experiment/quantityDetermind',
  },
  {
    name: '光谱扫描',
    icon: spectralScanningIcon,
    width: '64px',
    height: '48px',
    color: '#937DDA',
    toPath: '/experiment/spectralScan',
  },
  {
    name: '时间扫描',
    icon: timeScanIcon,
    width: '46px',
    height: '46px',
    color: '#DAB27D',
    toPath: '/experiment/timeScan',
  },
  {
    name: '双分组测量',
    icon: doubleGroupMeasurementIcon,
    width: '64px',
    height: '48px',
    color: '#D57DDA',
    toPath: '/experiment/twoComponentMeasure',
  },
]
const handleToPath = (item: { toPath: string }) => {
  router.push({ path: item.toPath })
}
const editParamsLumneVisible = ref(false)
const permissExperiment = ref([
  {
    pemissLabel: '光度测量',
    path: 'lumneScence',
  },
  {
    pemissLabel: '定量测定',
    path: 'quantityDetermind',
  },
  {
    pemissLabel: '光谱扫描',
    path: 'spectralScan',
  },
  {
    pemissLabel: '光谱扫描',
    path: 'spectralScan',
  },
])
const tableOptions = ref({
  rowKey: 'id',
  // rowSelection: {
  //   onChange: (selectedRowKeys: string[], selectedRows: { id?: string }[]) => {
  //     handleSelectTable(selectedRowKeys, selectedRows)
  //   },
  //   columnWidth: 50,
  //   fixed: true,
  // },
  columns: [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'ghsj',
      resizable: true,
      customRender: (data: { record: any; index: number; text: number }) => {
        return h(
          'a',
          {
            style: {
              color: '#3578ca',
            },
            onClick: (event) => {
              event.preventDefault()
              // 这里可以访问当前行数据 record
              useMethodsToPage(data.record)
            },
          },
          '用该方法继续测量',
        )
      },
      width: 140,
    },
    {
      title: '使用方法',
      dataIndex: 'methodName',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '所在项目',
      dataIndex: 'projectName',
      ellipsis: true,
      resizable: true,
      width: 100,
    },
    {
      title: '测量样品',
      dataIndex: 'measurementSample',
      ellipsis: true,
      resizable: true,
      width: 90,
    },
    // {
    //   title: '查看',
    //   dataIndex: 'ghsj',
    //   // ellipsis: true,
    //   resizable: true,
    //   customRender: (data: { text: number }) => {
    //     return h('span', '样品数据')
    //   },
    //   width: 100,
    // },
    {
      title: '测量起始时间',
      dataIndex: 'measurementStartTime',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
    {
      title: '测量终止时间',
      dataIndex: 'measurementEndTime',
      ellipsis: true,
      resizable: true,
      width: 150,
    },
  ],
  data: [],
  pagination: false,
})
const paginationMethods = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    paginationMethods.current = page
    paginationMethods.pageSize = pageSize
    listOfMethodsFun()
  },
  onShowSizeChange: (current: number, size: number) => {
    paginationMethods.current = current
    paginationMethods.pageSize = size
    listOfMethodsFun()
  },
})
const tableMethodsOptions = ref({
  rowKey: 'id',
  // rowSelection: {
  //   onChange: (selectedRowKeys: string[], selectedRows: { id?: string }[]) => {
  //     handleSelectTable(selectedRowKeys, selectedRows)
  //   },
  //   columnWidth: 50,
  //   fixed: true,
  // },
  columns: [
    {
      title: '方法名称',
      dataIndex: 'methodName',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '所属项目',
      dataIndex: 'project',
    },
    {
      title: '最近使用时间',
      dataIndex: 'recentUsageTime',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: '操作',
      slots: { customRender: 'operation' },
    },
  ],
  data: [{}],
  pagination: paginationMethods,
})
const seriesDataProject = [
  {
    name: '项目1',
    value: 100,
  },
  {
    name: '项目2',
    value: 80,
  },
  {
    name: '项目3',
    value: 60,
  },
  {
    name: '项目4',
    value: 40,
  },
  {
    name: '项目5',
    value: 20,
  },
]
const editParamsVisible = ref(false)
const value = ref('')
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    key: 'operation',
    title: '操作',
  },
])
const methodsParams = reactive({})
const editParamsTimeVisible = ref(false)
const catMethodsDetail = async (record: any) => {
  await findParams(record.id)
  console.log(record)
  if (record.measurementType === '光度测量') {
    editParamsLumneVisible.value = true
  } else if (record.measurementType === '时间扫描') {
    editParamsTimeVisible.value = true
  }
}
const findParams = async (methodsId: string) => {
  const { code, data } = await queryMethodParam({
    methodId: methodsId,
  })
  if (code === 200) {
    Object.assign(methodsParams, data)
  }
}
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`)
}
// 导入
const importModalRef = ref()
const handleImport = () => {
  importModalRef.value.showModal()
}
const importSuccess = () => {
  listOfMethodsFun()
}

// 导出
const handleExport = async () => {
  if (!selectedRowKeys.value.length) {
    message.warn('请选择需要导出的数据！')
    return
  }
  const query = {
    ids: selectedRowKeys.value,
  }
  const res = await methodExport(query)
  useDownloadFile(res, '方法列表.xlsx')
}

const useMethodsToPage = async (record: any) => {
  if (measureType.value === '光度测量') {
    router.push({
      name: 'lumneScence',
      query: {
        // taskId: record.taskId,
        methodId: record.methodId,
      },
    })
  } else if (measureType.value === '光谱扫描') {
    router.push({
      name: 'spectralScan',
      query: {
        // taskId: record.taskId,
        methodId: record.methodId,
      },
    })
  } else if (measureType.value === '定量测定') {
    router.push({
      name: 'quantityDetermind',
      query: {
        methodId: record.methodId,
      },
    })
  } else if (measureType.value === '时间扫描') {
    router.push({
      name: 'timeScan',
      query: {
        methodId: record.methodId,
      },
    })
  }
}
const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log(pagination, filters, sorter)
  listOfMethodsFun(sorter.order)
}
// 新建任务成功之后
const taskSuccess = () => {
  if (activeKeyTask.value === '1') {
    recentlyAccomplishTaskLight()
  } else {
    recentlyCreatedTasksFun()
  }
  queryProjectStatisticsFun()
}
const router = useRouter()
// 折叠面板
const activeKey = ref<string[]>(['1'])
const activeKeyTask = ref('1')
watch(
  () => activeKeyTask.value,
  (newValue) => {
    tableOptions.value.data = []
    if (activeKeyTask.value === '1') {
      recentlyAccomplishTaskLight()
    } else {
      recentlyCreatedTasksFun()
    }
  },
)
const goOtherPage = (item: any) => {
  // router.push({ name: path })
  if (item.pemissLabel === '光谱扫描') {
    editParamsVisible.value = true
  }
}
const createTaskVisible = ref<boolean>(false)
const envVisible = ref<boolean>(false)
const projectVisible = ref<boolean>(false)
const methodsVisible = ref<boolean>(false)
const detailPvisible = ref<boolean>(false)
const handleCreateTask = () => {
  createTaskVisible.value = true
}
const handleEnvParams = () => {
  envVisible.value = true
}
const handleCreateProject = () => {
  projectVisible.value = true
}
const catProjectDetail = () => {
  detailPvisible.value = true
}
const moduleSelect = (value: string) => {
  measureType.value = value
  tableOptions.value.data = []
  if (activeKeyTask.value === '1') {
    recentlyAccomplishTaskLight()
  } else {
    recentlyCreatedTasksFun()
  }
}
const measureType = ref<string>('光谱扫描')
const recentlyAccomplishTaskLight = async () => {
  const { code, data } = await recentlyAccomplishTask({
    measureType: measureType.value,
  })
  if (code === 200) {
    tableOptions.value.data = data
  }
}
const recentlyCreatedTasksFun = async () => {
  const { code, data } = await recentlyCreatedTasks({
    measureType: measureType.value,
  })
  if (code === 200) {
    tableOptions.value.data = data
  }
}
const listOfMethodsFun = async (sort?: string) => {
  const { code, data } = await listOfMethods({
    pageNum: tableMethodsOptions.value.pagination.current,
    pageSize: tableMethodsOptions.value.pagination.pageSize,
    methodName: methodsValue.value,
    sort: sort === 'descend' ? '0' : '1',
  })
  tableMethodsOptions.value.data = data.data
  tableMethodsOptions.value.pagination.total = data.total
}

interface StatisticsDataItem {
  projectName: string
  projectId: string
  creator: string
  createTime: string
  updateBy: string | null
  updateTime: string | null
  methodCount: string
  taskCount: string
}

const statistics = ref({
  taskCount: 0,
  projectCount: 0,
  methodCount: 0,
  data: [] as StatisticsDataItem[],
})
const queryProjectStatisticsFun = async () => {
  const { code, data } = await queryProjectStatistics()
  if (code === 200) {
    statistics.value = data
    statistics.value.data = [...data.data]
  }
}
const dataIndex = ref(0)
// 点击柱子
const click3DColumn = (value: { dataIndex: number }) => {
  dataIndex.value = value.dataIndex
}
onMounted(() => {
  if (activeKeyTask.value === '1') {
    recentlyAccomplishTaskLight()
  } else {
    recentlyCreatedTasksFun()
  }
  queryProjectStatisticsFun()
  listOfMethodsFun()
})
</script>
<style lang="less" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.nav-box {
  margin: 0px -30px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav-item {
    width: 20%;
    margin: 0px 30px;
    padding: 20px 0px;
    box-shadow: 0px 6px 11px 2px rgba(147, 147, 147, 0.33);
    border-radius: 28px;
    background: #f4faff;
    cursor: pointer;

    .icon {
      width: 100%;
      height: 100%;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}

.experiment-container {
  background: #ffffff;
  box-shadow: 8px 8px 27px 2px #c5c5c5;
  border-radius: 30px;
  padding: 20px;

  .add-img {
    width: 16px;
    height: 16px;
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .top-box {
    // padding: 15px;
    border-radius: 22px;
    background-color: rgba(233, 241, 253, 0.5);

    .top-table {
      padding: 20px;
    }
  }
}

.experiment-left {
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  // background: url('@/assets/images/experiment/bg.png') no-repeat center center / cover;
}

.titleHead {
  margin-bottom: 20px;
  position: relative;
  top: -5px;
  padding: 0px 0px 5px;
  font-size: 16px;
  font-weight: bold;
  color: #153471;
  border-bottom: 1px solid #153471;
}

.ant-card {
  // height: 100%;
}

.ant-card /deep/ .ant-card-head {
  color: #fff;
  background-color: #153471;
  padding: 10px !important;
  min-height: 30px !important;
}

.ant-card .ant-card-grid {
  padding: 10px !important;
}
</style>
