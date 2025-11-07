<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div>
    <!--    <div class="flex justify-between">-->
    <!--      <div class="flex gap-4">-->
    <!--        <div class="top-button bg-[#C6EDFF]" @click="handleClick(1)">-->
    <!--          <span class="text">接收新任务</span>-->
    <!--        </div>-->
    <!--        <div class="top-button bg-[#FEE9BB]" @click="handleClick(2)">-->
    <!--          <span class="text">数据订阅</span>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="top-setting" @click="handleClick(3)">-->
    <!--        <div class="w-[23px] h-[auto]">-->
    <!--          <img-->
    <!--            class="w-[100%] h-[100%]"-->
    <!--            src="@/assets/images/methodOptimization/setting_icon.png"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="shadow shadow-gray-400/50 flex flex-row items-center rounded-[30px] bg-[#eef4fa]">
      <div
        v-for="item in buttonList"
        :key="item.id"
        class="button-item"
        @click.stop="item.onClick()"
      >
        <div class="icon-box !mr-[15px]" :style="{ width: item.width }" v-if="item.iconSrc">
          <img :src="item.iconSrc" :alt="item.text" />
        </div>
        <div :style="{ color: item.color }" class="text-[18px] !font-bold">
          {{ item.text }}
        </div>
      </div>
    </div>

    <div class="page-container shadow shadow-gray-400/50">
      <!-- 经典模式 -->
      <div class="title">经典模式</div>
      <div class="content-box">
        <section class="nav-box">
          <div
            v-for="item in navList"
            :key="item.icon"
            class="flex items-center justify-center nav-item shadow shadow-gray-400/50"
            @click="clickToSimpleMode(item.name)"
          >
            <div class="icon-box" :style="{ backgroundImage: `url(${item.icon})` }"></div>
            <div class="text-[18px] !font-bold" :style="{ color: item.color }">{{ item.name }}</div>
          </div>
        </section>
      </div>
      <!-- 向导模式 -->
      <div class="title">向导模式</div>
      <div class="content-box">
        <!-- 筛选 -->
        <div class="flex items-center">
          <div class="flex items-center">
            <a-input
              v-model:value="taskQuery.selectKey"
              placeholder="搜索"
              class="!w-[400px]"
              @pressEnter="fetchTaskListData"
            />
            <div class="w-[28px] h-[auto] !ml-[15px]" @click="fetchTaskListData">
              <img
                class="w-[100%] h-[100%]"
                src="@/assets/images/methodOptimization/search_icon.png"
              />
            </div>
          </div>
          <div class="!ml-[70px] flex items-center gap-6">
            <div class="search-title">筛选条件：</div>
            <div class="flex items-center gap-2">
              <div
                v-for="item in taskTypeOptions"
                :key="item.value"
                class="tab-item"
                :class="{ 'tab-item-active': taskQuery.taskType === item.value }"
                @click="handleTypeClick(item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
        <!-- tab栏 -->
        <div class="!mt-[25px] flex">
          <!-- 选项 -->
          <div class="!mr-[30px]">
            <div
              class="w-[140px] h-[50px] flex items-center justify-center text-[16px] cursor-pointer"
              :class="
                taskQuery.status === '1'
                  ? 'text-[#fff] bg-[#113371]'
                  : 'text-[#113371] bg-[#E6E6E6]'
              "
              @click="taskQuery.status = '1'"
            >
              <HomeOutlined class="text-[20px] !mr-[10px]" />
              <span class="">已完成任务</span>
            </div>
            <div
              class="!mt-[30px] w-[140px] h-[50px] flex items-center justify-center text-[16px] cursor-pointer"
              :class="
                taskQuery.status === '0'
                  ? 'text-[#fff] bg-[#113371]'
                  : 'text-[#113371] bg-[#E6E6E6]'
              "
              @click="taskQuery.status = '0'"
            >
              <AppstoreOutlined class="text-[20px] !mr-[10px]" />
              <span>未完成任务</span>
            </div>
          </div>
          <!-- 内容 -->
          <div v-if="taskQuery.status === '1'" class="tab-content-right">
            <div class="flex items-center text-[15px] text-[#5E5E6C]">
              <span>以下显示最近完成的</span>
              <a-input-number
                v-model:value="taskQuery.needSelectNum"
                :min="1"
                class="!ml-[5px] !mr-[5px]"
                @pressEnter="fetchTaskListData"
                @step="fetchTaskListData"
              />
              <span>个任务，最多50个</span>
            </div>
            <div class="!mt-[20px]">
              <vxeTable ref="tableRef" :options="finishedTableOptions">
                <template #active="{ row }">
                  <text
                    class="cursor-pointer !mr-5"
                    :style="{ color: primaryColor }"
                    @click="handleClick(4, row)"
                    >复用该任务设置生成新任务</text
                  >
                  <text
                    class="cursor-pointer"
                    :style="{ color: primaryColor }"
                    @click="handleClick(5, row)"
                    >查看该任务</text
                  >
                </template>
              </vxeTable>
            </div>
          </div>
          <div v-else class="tab-content-right">
            <div class="flex items-center text-[15px] text-[#5E5E6C]">
              <span>以下显示最近完成的</span>
              <a-input-number
                v-model:value="taskQuery.needSelectNum"
                :min="1"
                class="!ml-[5px] !mr-[5px]"
                @pressEnter="fetchTaskListData"
                @step="fetchTaskListData"
              />
              <span>个任务，最多50个</span>
            </div>
            <!-- <div class="flex items-center text-[15px] text-[#5E5E6C]">
              有以下{{ unFinishedTableOptions.pagerConfig.total }}个未完成任务
            </div> -->
            <div class="!mt-[20px]">
              <vxeTable ref="tableRef" :options="unFinishedTableOptions">
                <template #active="{ row }">
                  <text
                    class="cursor-pointer !mr-5"
                    :style="{ color: primaryColor }"
                    @click="handleClick(6, row)"
                    >设置任务参数并测量</text
                  >
                  <text
                    class="cursor-pointer"
                    :style="{ color: primaryColor }"
                    @click="handleClick(7, row)"
                    >继续完成测量</text
                  >
                </template>
              </vxeTable>
            </div>
          </div>
        </div>
      </div>
      <div class="draggable-box">
        <VueDraggable
          v-model="showCardList"
          ghostClass="ghost"
          :animation="150"
          class="grid grid-cols-2 gap-4"
          style="align-items: start"
          @end="onEnd"
        >
          <custom-card
            :title="item.title"
            :dynamicTabs="item.tab"
            :description="showDescription(item.title)"
            v-for="(item, index) in showCardList"
            :key="`${index}card`"
            v-model="item.show"
            :class="{ 'col-span-2': index === 0 && showCardList.length % 2 === 1 }"
            @close="handleCardClose"
          >
            <template #center>
              <div v-if="item.title === '方法管理'" class="relative w-[150%]" @click.stop>
                <a-input v-model:value="methodsValue" placeholder="搜索方法" />
                <SearchOutlined
                  class="absolute right-2 top-1/2 -translate-y-1/2"
                  @click="listOfMethodsFun()"
                />
              </div>
              <div v-if="item.title === '项目管理'" class="relative w-[150%]" @click.stop>
                <a-input v-model:value="projectValue" placeholder="搜索项目" />
                <SearchOutlined
                  class="absolute right-2 top-1/2 -translate-y-1/2"
                  @click="listOfProjectFun()"
                />
              </div>
            </template>
            <template #extra>
              <div v-if="item.title === '方法管理'">
                <uvHasIconBtn content="新建方法" @click.stop="() => (methodsVisible = true)">
                  <template #icon>
                    <div class="w-[15px] h-[15px] !mr-[5px]">
                      <img
                        class="w-[100%] h-[100%]"
                        src="@/assets/images/experiment/add_icon_gray.png"
                      />
                    </div>
                  </template>
                </uvHasIconBtn>
              </div>
              <div v-if="item.title === '项目管理'">
                <uvHasIconBtn content="新建项目" @click.stop="() => (projectVisible = true)">
                  <template #icon>
                    <div class="w-[15px] h-[15px] !mr-[5px]">
                      <img
                        class="w-[100%] h-[100%]"
                        src="@/assets/images/experiment/add_icon_gray.png"
                      />
                    </div>
                  </template>
                </uvHasIconBtn>
              </div>
              <div v-if="item.title === '任务管理'">
                <uvHasIconBtn content="新建任务" @click.stop="() => handleCreateTask()">
                  <template #icon>
                    <div class="w-[15px] h-[15px] !mr-[5px]">
                      <img
                        class="w-[100%] h-[100%]"
                        src="@/assets/images/experiment/add_icon_gray.png"
                      />
                    </div>
                  </template>
                </uvHasIconBtn>
              </div>
              <uvHasIconBtn
                content="导入"
                class="shallow-green-btn"
                @click.stop="handleImport(item.title)"
              >
                <template #icon>
                  <div class="w-[15px] h-[15px] !mr-[5px]">
                    <img
                      class="w-[100%] h-[100%]"
                      src="@/assets/images/experiment/import_icon_gray.png"
                    />
                  </div>
                </template>
              </uvHasIconBtn>
              <uvHasIconBtn
                content="导出"
                class="shallow-yellow-btn"
                @click.stop="handleExport(item.title)"
              >
                <template #icon>
                  <div class="w-[15px] h-[15px] !mr-[5px]">
                    <img
                      class="w-[100%] h-[100%]"
                      src="@/assets/images/experiment/import_icon_gray.png"
                    />
                  </div>
                </template>
              </uvHasIconBtn>
            </template>
            <template #chart>
              <echarts-horizontal-bar
                v-if="item.title === '方法管理'"
                :yAxisOptions="methodChartOptions.yAxisOptions"
                :seriesData="methodChartOptions.seriesData"
              />
              <uv3DColumnChart
                v-if="item.title === '任务管理'"
                :data1="statisticsData.taskChartData.data1"
                :data2="statisticsData.taskChartData.data2"
                :nameArr="statisticsData.taskChartData.nameX"
                :legendName="['已完成', '待完成']"
              />
              <uv3DColumnChart
                v-if="item.title === '项目管理'"
                :data1="statistics.data.map((item) => item.methodCount)"
                :data2="statistics.data.map((item) => item.taskCount)"
                :nameArr="statistics.data.map((item) => item.projectName)"
                :legendName="['方法数', '任务数']"
              />
            </template>
            <template #table>
              <div v-if="item.title === '任务管理'" class="relative !w-xs">
                <a-input v-model:value="taskValue" placeholder="搜索任务" />
                <SearchOutlined
                  class="absolute right-2 top-1/2 -translate-y-1/2"
                  @click="listOfTaskFun()"
                />
              </div>
              <div class="!my-[15px] flex items-center gap-6" v-if="item.title === '任务管理'">
                <div class="search-title">筛选条件</div>
                <div class="flex items-center gap-2">
                  <div
                    v-for="item in taskTypeOptions"
                    :key="item.value"
                    class="tab-item"
                    :class="{ 'tab-item-active': selectType === item.label }"
                    @click="handleTypeBottomClick(item)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>

              <vxeTable
                ref="tableRef"
                :options="item.tableOptions"
                @changePage="handlePageChange($event, item.title)"
                @checkboxChange="handleCheckboxChange($event, item.title)"
                @sortChange="(field, order) => handleSortChange(field, order, item.title)"
              >
                <template #active="{ row }">
                  <IconFont
                    type="icon-glasses-classic"
                    class="cursor-pointer"
                    @click="catMethodsDetail(row)"
                  />
                </template>
              </vxeTable>
            </template>
          </custom-card>
        </VueDraggable>
      </div>
    </div>
    <receiveNewTasksModal ref="receiveNewTasksModalRef" />
    <dataSubscriptionModal ref="dataSubscriptionModalRef" />
    <environParamsModal ref="environParamsModalRef" />
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
      :form="projectDetail"
      :meatureType="taskQuery.taskType"
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
    <editParamsSpectral
      v-model="editParamsSpectralVisible"
      v-if="editParamsSpectralVisible"
      :form-disabled="true"
      :addOrEdit="`edit`"
      :methodsParams="methodsParams"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  DownloadOutlined,
  SearchOutlined,
  ToolOutlined,
  UploadOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import doubleGroupMeasurementIcon from '@/assets/images/experiment/double_group_measurement_icon.png'
import photometricMeasurementIcon from '@/assets/images/experiment/photometric_measurement_icon.png'
import quantitativeDeterminationIcon from '@/assets/images/experiment/quantitative_determination_icon.png'
import spectralScanningIcon from '@/assets/images/experiment/spectral_scanning_icon.png'
import timeScanIcon from '@/assets/images/experiment/time_scan_icon.png'
import { useAppStore } from '@/stores'
import environParamsModal from './components/environParamsModal.vue'
import receiveNewTasksModal from './components/receiveNewTasksModal.vue'
import dataSubscriptionModal from './components/dataSubscriptionModal.vue'
import {
  listOfMethods,
  queryMethodParam,
  queryProjectStatistics,
  methodExport,
  methodsAndTasksNum,
  getTasksManagementList,
  getProjectsManagementList,
  getExperimentTestTasksList,
  queryPanelOrder,
  savePanelOrder,
} from '@/api'
import { VueDraggable } from 'vue-draggable-plus'
import editParamsLumne from '@/views/experiment/lumneScence/components/editParams.vue'
import editParamsTime from '@/views/experiment/timeScan/components/editParams.vue'
import editParamsSpectral from '@/views/experiment/spectralScan/components/editParams.vue'
import createMethods from './components/createMethods.vue'
import createProject from './components/createProject.vue'
import createTask from './components/createTask.vue'
import EchartsHorizontalBar from '@/components/echartsHorizontalBar/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
const { primaryColor } = useAppStore()
import setIcon from '@/assets/images/methodOptimization/setting_icon.png'
import router from '@/router'
const buttonList = [
  {
    id: '0',
    text: '接受新任务',
    color: '#113371',
    width: '31px',
    onClick: () => {},
  },
  {
    id: '1',
    text: '数据订阅',
    color: '#67c23a',
    width: '32px',
    onClick: () => {},
  },
  {
    id: '3',
    iconSrc: setIcon,
    color: '#FF0F0F',
    width: '25px',
    onClick: () => {},
  },
]

/************************* 顶部操作：接收新任务|数据订阅|设置 ***********************/
// 接收新任务
const receiveNewTasksModalRef = ref()
const dataSubscriptionModalRef = ref()
// 设置参数
const environParamsModalRef = ref()

/************************************* 经典模式 ********************************/
const navList = [
  {
    name: '光度测量',
    icon: photometricMeasurementIcon,
    className: 'w-[33px]',
    color: '#5CB265',
    toPath: '/experiment/lumneScence',
  },
  {
    name: '定量测定',
    icon: quantitativeDeterminationIcon,
    className: 'w-[38px]',
    color: '#5B81D1',
    toPath: '/experiment/quantityDetermind',
  },
  {
    name: '光谱扫描',
    icon: spectralScanningIcon,
    className: 'w-[57px]',
    color: '#937DDA',
    toPath: '/experiment/spectralScan',
  },
  {
    name: '时间扫描',
    icon: timeScanIcon,
    className: 'w-[39px]',
    color: '#DAB27D',
    toPath: '/experiment/timeScan',
  },
  // {
  //   name: '双分组测量',
  //   icon: doubleGroupMeasurementIcon,
  //   className: 'w-[57px]',
  //   color: '#D57DDA',
  //   toPath: '/experiment/twoComponentMeasure',
  // },
]

/************************************* 向导模式 ********************************/
// 筛选
const taskQuery = ref({
  selectKey: '', // 任务名称模糊搜索
  taskType: '定量测定', // 任务类型
  needSelectNum: 5, // 显示几个任务
  status: '1', // 已完成'1' 未完成'0'
})
const taskTypeOptions = ref([
  {
    label: '光度测量',
    value: '光度测量',
    active: false,
  },
  {
    label: '定量测定',
    value: '定量测定',
    active: true,
  },
  {
    label: '光谱扫描',
    value: '光谱扫描',
    active: false,
  },
  {
    label: '时间扫描',
    value: '时间扫描',
    active: false,
  },
  {
    label: '双分组测定',
    value: '双分组测定',
    active: false,
  },
])
const handleTypeClick = (key: any) => {
  taskQuery.value.taskType = key.value
}
const handleTypeBottomClick = (key: any) => {
  selectType.value = key.label
  listOfTaskFun()
}
// 已完成任务
const finishedTableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  maxHeight: 500,
  columns: [
    {
      field: 'taskName',
      title: '任务名称',
    },
    {
      field: 'methodName',
      title: '使用方法',
    },
    {
      field: 'projectName',
      title: '所在项目',
    },
    {
      field: 'sampleNumber',
      title: '已测样品个数',
    },
    {
      field: 'startTime',
      title: '创建时间',
    },
    {
      field: 'endTime',
      title: '完成时间',
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      width: 310,
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
    },
  ],
  data: [] as any[],
})
// 未完成任务
const unFinishedTableOptions = ref({
  loading: false,
  pagerConfig: {
    enabled: false,
  },
  columns: [
    {
      field: 'taskName',
      title: '任务名称',
    },
    {
      field: 'status',
      title: '当前状态',
    },
    {
      field: 'methodName',
      title: '使用方法',
    },
    {
      field: 'projectName',
      title: '所在项目',
    },
    {
      field: 'sampleNumber',
      title: '已测样品个数',
    },
    {
      field: 'createTime',
      title: '创建时间',
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      width: 280,
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
    },
  ],
  data: [] as any[],
})
const fetchTaskListData = async () => {
  if (taskQuery.value.status === '1') finishedTableOptions.value.loading = true
  else unFinishedTableOptions.value.loading = true
  const { code, data } = await getExperimentTestTasksList({
    ...taskQuery.value,
  })
  if (code === 200) {
    if (taskQuery.value.status === '1') {
      finishedTableOptions.value.data = data.tasks
      finishedTableOptions.value.loading = false
    } else {
      unFinishedTableOptions.value.data = data.tasks
      unFinishedTableOptions.value.loading = false
    }
  }
}
watch(
  () => [taskQuery.value.taskType, taskQuery.value.status],
  () => {
    taskQuery.value.needSelectNum = 5
    fetchTaskListData()
  },
  { deep: true, immediate: true },
)

/************************************* 操作 ********************************/
const projectDetail = ref<any>({})
const handleClick = (key: number, row?: any) => {
  console.log(key, row)
  switch (key) {
    case 1:
      // 接收新任务
      receiveNewTasksModalRef.value.showModal()
      break
    case 2:
      // 数据订阅
      dataSubscriptionModalRef.value.showModal()
      break
    case 3:
      // 设置参数
      environParamsModalRef.value.showModal()
      break
    case 4:
      // 复用该任务设置生成新任务
      projectDetail.value = {
        projectName: row.projectName,
        projectId: row.projectId,
        measurementType: row.measureType,
        taskName: row.taskName,
        methodId: row.methodId,
        specimens: [],
        deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
      }
      createTaskVisible.value = true
      break
    case 5:
    case 7:
      // 查看该任务:
      // 继续完成测量:
      // 跳转到详情页面
      if (row.measureType === '光度测量')
        router.push(`/experiment/wizardMode/lumneScence?taskId=${row?.id}`)
      else if (row.measureType === '定量测定')
        router.push(`/experiment/wizardMode/quantityDetermind?taskId=${row?.id}`)
      else if (row.measureType === '光谱扫描')
        router.push(`/experiment/wizardMode/spectralScan?taskId=${row?.id}`)
      else router.push(`/experiment/wizardMode/timeScan?taskId=${row?.id}`)
      break
    case 6:
      // 设置任务参数并测量
      projectDetail.value = {
        projectName: row.projectName,
        projectId: row.projectId,
        measurementType: row.measureType,
        taskName: row.taskName,
        methodId: row.methodId,
        specimens: [],
        deviceSerialNumber: localStorage.getItem('deviceSerialNumber') || '',
      }
      createTaskVisible.value = true
      break
    default:
      break
  }
}
/************************************* 项目方法任务列表 ********************************/
const cardList = ref([
  {
    title: '任务管理',
    sign: 'task',
    tab: [
      {
        title: '任务统计',
        slotName: 'chart',
      },
      {
        title: '任务列表',
        slotName: 'table',
      },
    ],
    tableOptions: {
      loading: false,
      pagerConfig: {
        total: 50,
        pageSize: 5,
        currentPage: 1,
      },
      columns: [
        { type: 'checkbox', fixed: 'left', width: 50 },
        {
          field: 'methodName',
          title: '使用方法',
          minWidth: 120,
          fixed: 'left',
        },
        {
          field: 'projectName',
          title: '所在项目',
          minWidth: 100,
        },
        {
          field: 'measureType',
          title: '测量模式',
          minWidth: 170,
        },
        {
          field: 'project',
          title: '任务状态',
          minWidth: 100,
        },
        {
          field: 'project',
          title: '测量样品个数',
          minWidth: 100,
        },
        {
          field: 'startTime',
          title: '测量起始时间',
          minWidth: 150,
        },
        {
          title: '操作',
          field: 'operation',
          fixed: 'right',
          minWidth: 80,
          slots: {
            default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
          },
        },
      ],
      data: [] as any[],
    },
    show: true,
  },
  {
    title: '方法管理',
    sign: 'method',
    tab: [
      {
        title: '方法统计',
        slotName: 'chart',
      },
      {
        title: '方法列表',
        slotName: 'table',
      },
    ],
    tableOptions: {
      loading: false,
      pagerConfig: {
        total: 50,
        pageSize: 5,
        currentPage: 1,
      },
      columns: [
        { type: 'checkbox', fixed: 'left', width: 50 },
        {
          field: 'methodName',
          title: '方法名称',
          minWidth: 120,
          fixed: 'left',
        },
        {
          field: 'creator',
          title: '创建人',
          minWidth: 100,
        },
        {
          field: 'createTime',
          title: '创建时间',
          minWidth: 170,
        },
        {
          field: 'project',
          title: '所属项目',
          minWidth: 100,
        },
        {
          field: 'recentUsageTime',
          title: '最近使用时间',
          minWidth: 150,
          sortable: true,
        },
        {
          title: '操作',
          field: 'operation',
          fixed: 'right',
          minWidth: 80,
          slots: {
            default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
          },
        },
      ],
      data: [] as any[],
    },
    show: true,
  },
  {
    title: '项目管理',
    sign: 'project',
    tab: [
      {
        title: '项目统计',
        slotName: 'chart',
      },
      {
        title: '项目列表',
        slotName: 'table',
      },
    ],
    tableOptions: {
      loading: false,
      pagerConfig: {
        total: 50,
        pageSize: 5,
        currentPage: 1,
      },
      columns: [
        // { type: 'checkbox', fixed: 'left', width: 50 },
        {
          field: 'projectName',
          title: '项目名称',
          minWidth: 120,
          fixed: 'left',
        },
        {
          field: 'creatorKey',
          title: '创建人',
          minWidth: 100,
        },
        {
          field: 'createTime',
          title: '创建时间',
          minWidth: 100,
        },
        {
          field: 'methodNum',
          title: '方法个数',
          minWidth: 100,
        },
        {
          field: 'taskNum',
          title: '任务个数',
          minWidth: 100,
        },
        {
          field: 'lastUpdatedTime',
          title: '更新时间',
          minWidth: 100,
        },
        {
          title: '操作',
          field: 'operation',
          fixed: 'right',
          minWidth: 80,
          slots: {
            default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
          },
        },
      ],
      data: [] as any[],
    },
    show: true,
  },
])
const methodsVisible = ref(false)
const createTaskVisible = ref(false)
const projectVisible = ref(false)
const methodsValue = ref('')
const projectValue = ref('')
const taskValue = ref('')
const selectType = ref('光度测量')
const editParamsLumneVisible = ref(false)
const editParamsTimeVisible = ref(false)
const editParamsSpectralVisible = ref(false)
const methodsParams = reactive({})
const handleCreateTask = () => {
  projectDetail.value = {}
  createTaskVisible.value = true
}
const methodChartOptions = computed(() => {
  return {
    yAxisOptions: {
      data: statisticsData.value.methodChartData.map((item) => item.methodtype),
    },
    seriesData: statisticsData.value.methodChartData.map((item) => item.methodNumber),
  }
})
const showDescription = computed(() => (type: string) => {
  if (type === '项目管理') {
    return `您一共参与了<span class="text-[#113371]">${statistics.value.projectCount}</span>个项目，其中建立了方法<span class="text-[#113371]">${statistics.value.methodCount}</span>个，完成测量任务<span class="text-[#113371]">${statistics.value.taskCount}</span>个`
  } else if (type === '方法管理') {
    return `您一共创建了<span class="text-[#113371]">${statisticsData.value.allMethodNum}</span>个方法，使用了<span class="text-[#113371]">${statisticsData.value.usedMethodNum}</span>个方法完成测量任务`
  } else if (type === '任务管理') {
    return `您一共参与了<span class="text-[#113371]">${statisticsData.value.allTaskNum}</span>个任务，其中<span class="text-[#113371]">${statisticsData.value.finishTaskNum}</span>个已完成`
  }
})

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
interface MethodChartData {
  methodNumber: string
  methodtype: string
}
const statisticsData = ref({
  allMethodNum: 0,
  usedMethodNum: 0,
  allTaskNum: 0,
  finishTaskNum: 0,
  methodChartData: [] as MethodChartData[],
  taskChartData: {
    data1: [] as string[],
    data2: [] as string[],
    nameX: [] as string[],
  },
})
const methodsAndTasksNumFun = async () => {
  const { code, data } = await methodsAndTasksNum()
  if (code === 200) {
    statisticsData.value.allMethodNum = data.allMethodNum
    statisticsData.value.usedMethodNum = data.usedMethodNum
    statisticsData.value.allTaskNum = data.allTaskNum
    statisticsData.value.finishTaskNum = data.finishTaskNum
    statisticsData.value.methodChartData = [...data.methodCounts]
    // statisticsData.value.taskChartData = [...data.taskCounts]
    const valueArr = Object.values(data.taskCounts)
    const keyArr = Object.keys(data.taskCounts).map((item: string) => {
      const obj: Record<string, string> = {
        all: '所有',
        halfYear: '最近半年',
        lastMonth: '最近一个月',
        lastWeek: '最近一周',
        lastYear: '最近一年',
        threeYears: '最近三年',
      }
      return obj[item]
    })
    statisticsData.value.taskChartData.data1 = valueArr.map((item: any) => item.finishedCount)
    statisticsData.value.taskChartData.data2 = valueArr.map((item: any) => item.unFinishedCount)
    statisticsData.value.taskChartData.nameX = keyArr
  }
}

// 新建任务成功之后
const taskSuccess = () => {
  // if (activeKeyTask.value === '1') {
  //   recentlyAccomplishTaskLight()
  // } else {
  //   recentlyCreatedTasksFun()
  // }
  // queryProjectStatisticsFun()
}
const handlePageChange = (
  { currentPage, pageSize }: { currentPage: number; pageSize: number },
  title: string,
) => {
  const methodCardConfig = cardList.value.find((item) => item.title === title)
  if (!methodCardConfig || !methodCardConfig.tableOptions) {
    return
  }
  methodCardConfig.tableOptions.pagerConfig.currentPage = currentPage
  methodCardConfig.tableOptions.pagerConfig.pageSize = pageSize
  if (title === '方法管理') {
    listOfMethodsFun()
  } else if (title === '项目管理') {
    listOfProjectFun()
  } else if (title === '任务管理') {
    listOfTaskFun()
  }
}
const handleSortChange = (field: string, order: string, title: string) => {
  console.log(field, order, title, 'sansnas')
  if (title === '方法管理') {
    listOfMethodsFun(order)
  }
}
const listOfMethodsFun = async (sort?: string) => {
  const methodCardConfig = cardList.value.find((item) => item.title === '方法管理')
  if (!methodCardConfig || !methodCardConfig.tableOptions) {
    return
  }
  const { code, data } = await listOfMethods({
    pageNum: methodCardConfig.tableOptions.pagerConfig.currentPage,
    pageSize: methodCardConfig.tableOptions.pagerConfig.pageSize,
    methodName: methodsValue.value,
    sort: sort === 'desc' ? '0' : '1',
  })
  methodCardConfig.tableOptions.data = data.data
  methodCardConfig.tableOptions.pagerConfig.total = data.total
}
const listOfProjectFun = async (sort?: string) => {
  const methodCardConfig = cardList.value.find((item) => item.title === '项目管理')
  if (!methodCardConfig || !methodCardConfig.tableOptions) {
    return
  }
  const { code, data } = await getProjectsManagementList({
    page: methodCardConfig.tableOptions.pagerConfig.currentPage,
    size: methodCardConfig.tableOptions.pagerConfig.pageSize,
    keyword: projectValue.value,
    sort: sort === 'desc' ? '0' : '1',
  })
  methodCardConfig.tableOptions.data = data.records
  methodCardConfig.tableOptions.pagerConfig.total = data.total
}
const listOfTaskFun = async (sort?: string) => {
  const methodCardConfig = cardList.value.find((item) => item.title === '任务管理')
  if (!methodCardConfig || !methodCardConfig.tableOptions) {
    return
  }
  const { code, data } = await getTasksManagementList({
    page: methodCardConfig.tableOptions.pagerConfig.currentPage,
    size: methodCardConfig.tableOptions.pagerConfig.pageSize,
    keyword: taskValue.value,
    selectType: selectType.value,
    sort: sort === 'desc' ? '0' : '1',
  })
  methodCardConfig.tableOptions.data = data.records
  methodCardConfig.tableOptions.pagerConfig.total = data.total
}
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
const importSuccess = () => {
  listOfMethodsFun()
}
const selectedRowKeys = ref([])
const handleCheckboxChange = (checkedArr: any, title: string) => {
  if (title === '方法管理') {
    selectedRowKeys.value = checkedArr
  }
}
// 导入
const importModalRef = ref()
const handleImport = (type: string) => {
  importModalRef.value.showModal()
}
// 导出
const handleExport = async (type: string) => {
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
const showCardList = ref<(typeof cardList.value)[number][]>([])
const queryPanelOrderFun = async () => {
  const { code, data } = await queryPanelOrder()
  if (code === 200) {
    showCardList.value = []
    data?.forEach((item: string) => {
      const cardObj = cardList.value.find((cardItem) => cardItem.sign === item)
      if (cardObj) {
        showCardList.value.push(cardObj)
      }
    })
  }
}
const savePanelOrderFun = async (cardConfig: string[]) => {
  const query = {
    panelOrder: cardConfig,
  }
  const { code } = await savePanelOrder(query)
}
const handleCardClose = async () => {
  const cardConfigArr = showCardList.value
    .map((item) => {
      if (item.show) return item.sign
    })
    .filter((item) => item)
  await savePanelOrderFun(cardConfigArr as string[])
}
const onEnd = async (e: any) => {
  const cardConfigArr = showCardList.value
    .map((item) => {
      if (item.show) return item.sign
    })
    .filter((item) => item)
  await savePanelOrderFun(cardConfigArr as string[])
}
const clickToSimpleMode = (measureMode: string) => {
  router.push({
    name: 'methodOptimizationHome',
    query: {
      measureType: measureMode,
    },
  })
}
onMounted(() => {
  queryProjectStatisticsFun()
  listOfMethodsFun()
  methodsAndTasksNumFun()
  listOfProjectFun()
  listOfTaskFun()
  queryPanelOrderFun()
})
</script>
<style lang="less" scoped>
.button-item {
  padding: 5px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-right: 2px solid #c5c5c5;
  cursor: pointer;
  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.top-button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  border-radius: 0px 20px 20px 20px;
  font-weight: bold;
  font-size: 16px;
  color: #616170;
  text-align: center;
  cursor: pointer;
}
.nav-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .nav-item {
    margin: 0px 20px;
    padding: 4px 20px;
    border-radius: 28px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
    .icon-box {
      width: 30px;
      height: 30px;
      background-size: auto 80%;
      background-position: center center;
      background-repeat: no-repeat;
      margin-right: 5px;
    }
  }
}
.top-setting {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e6e6e6;
  border-radius: 0px 20px 20px 20px;
  text-align: center;
  cursor: pointer;
}

.page-container {
  margin-top: 15px;
  border-radius: 30px;
  background: #ffffff;
  .title {
    padding: 8px 30px;
    font-size: 18px;
    font-weight: bold;
    color: #153471;
  }
  .content-box {
    position: relative;
    padding: 20px 30px;
    :deep(.ant-input) {
      height: 36px;
      border-radius: 19px;
      font-size: 15px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%; /* 可调整起始位置 */
      transform: translateX(-50%);
      width: 100%; /* 控制边框长度 */
      height: 1px; /* 高度为边框粗细 */
      background-color: #153471;
    }
    .tab-content-right {
      width: calc(100% - 170px - 20px);
      .task-item {
        padding: 15px 25px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        line-height: 30px;
        background-color: #f4f8fe;
        // width: calc(100% - 170px - 20px);
        .task-item-left {
          width: 270px;
          margin-right: 20px;
          font-size: 20px;
          font-weight: bold;
          color: #5e5e6c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .task-item-right {
          padding: 10px 0px 0px 30px;
          border-left: 1px solid #113371;
          font-size: 15px;
          width: calc(100% - 270px - 20px);
        }
        .task-item-button {
          margin-top: 10px;
          display: flex;
          justify-content: end;
          .button {
            padding: 0px 5px;
            font-size: 14px;
            color: #113371;
            background: #c4c4c4;
            cursor: pointer;
          }
        }
      }
    }
  }
  .search-title {
    font-size: 16px;
    color: #5e5e6c;
  }
}

.tab-item {
  width: 101px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
  color: #113371;
  background: rgba(233, 241, 253, 0.5);

  &:hover {
    background-color: #153471;
    color: #fff;
  }
}

.tab-item-active {
  background-color: #153471;
  color: #fff;
}

.draggable-box {
  padding: 20px 30px;
}

:deep(.ant-tabs-tab) {
  padding: 8px 24px 8px 0px !important;
}
</style>
