<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="uv-container overflow-x-hidden">
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
            <!--            <template #active="{ row }">-->
            <!--              <IconFont type="icon-glasses-classic" class="cursor-pointer" />-->
            <!--            </template>-->
          </vxeTable>
        </template>
      </custom-card>
    </VueDraggable>
  </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import {
  getProjectsManagementList,
  getTasksManagementList,
  listOfMethods,
  methodsAndTasksNum,
  queryPanelOrder,
  queryProjectStatistics,
  savePanelOrder,
} from '@/api'
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
interface MethodChartData {
  methodNumber: string
  methodtype: string
}
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
const showCardList = ref<(typeof cardList.value)[number][]>([])
const methodsValue = ref('')
const projectValue = ref('')
const taskValue = ref('')
const selectType = ref('光度测量')
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
const statistics = ref({
  taskCount: 0,
  projectCount: 0,
  methodCount: 0,
  data: [] as StatisticsDataItem[],
})
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
const queryProjectStatisticsFun = async () => {
  const { code, data } = await queryProjectStatistics()
  if (code === 200) {
    statistics.value = data
    statistics.value.data = [...data.data]
  }
}
const handleTypeBottomClick = (key: any) => {
  selectType.value = key.label
  listOfTaskFun()
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
const selectedRowKeys = ref([])
const handleCheckboxChange = (checkedArr: any, title: string) => {
  if (title === '方法管理') {
    selectedRowKeys.value = checkedArr
  }
}
const handleCardClose = async () => {
  const cardConfigArr = showCardList.value
    .map((item) => {
      if (item.show) return item.sign
    })
    .filter((item) => item)
  await savePanelOrderFun(cardConfigArr as string[])
}
const savePanelOrderFun = async (cardConfig: string[]) => {
  const query = {
    panelOrder: cardConfig,
  }
  const { code } = await savePanelOrder(query)
}
const onEnd = async (e: any) => {
  const cardConfigArr = showCardList.value
    .map((item) => {
      if (item.show) return item.sign
    })
    .filter((item) => item)
  await savePanelOrderFun(cardConfigArr as string[])
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

<style lang="less" scoped></style>
