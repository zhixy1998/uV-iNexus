<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="选择方法" okTitle="使用该方法" @handleOk="useThisMethods">
    <template #content>
      <div class="flex justify-between items-center !mb-8">
        <span class="text-xl font-bold">{{ project.projectName }}</span>
      </div>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="pagination"
        :row-key="(record: any) => record.id"
        :rowSelection="rowSelection"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <!-- <uvHasIconBtn content="使用该方法" @click="goSpectralScan">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn> -->
            <a-space>
              <a-tooltip>
                <template #title>查看历史任务</template>
                <IconFont type="icon-chakanlishirenwu" @click="handleHistoryTask(record)" />
              </a-tooltip>
              <!-- <a-tooltip>
                <template #title>使用该方法</template>
                <DownloadOutlined @click="useThisMethods(record)" />
              </a-tooltip> -->
            </a-space>
          </template>
        </template>
      </a-table>
    </template>
  </uvModal>
  <create-methods v-if="showCreateMethods" v-model="showCreateMethods" />
  <create-task v-if="showCreateTask" v-model="showCreateTask" />
  <history-task-detail
    v-if="showHistoryTaskDtail"
    v-model="showHistoryTaskDtail"
    :taskParams="{
      projectId: project.projectId,
      projectName: project.projectName,
      measurementType: props.meaturesType,
    }"
    :methodsParams="methodsObject"
  />
</template>
<script lang="ts" setup>
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { queryMethodProt } from '@/api'
import uvModal from '@/components/uvModal/index.vue'

import createMethods from './createMethods.vue'
import createTask from './createTask.vue'
import historyTaskDetail from './historyTaskDetail.vue'

const props = defineProps({
  modelValue: Boolean,
  meaturesType: {
    type: String,
    default: '光谱扫描',
  },
  project: {
    type: Object as PropType<{
      projectId: string
      projectName: string
    }>,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue', 'useThisMethods'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const handleChange = (e: Event) => {}
const dataSource = ref([])
const showCreateMethods = ref<boolean>(false)
const showCreateTask = ref<boolean>(false)
const showHistoryTaskDtail = ref<boolean>(false)
const methodsObject = ref({
  methodId: '',
  methodName: '',
})
const columns = ref([
  {
    title: '方法名称',
    dataIndex: 'methodName',
    key: 'methodName',
  },
  {
    key: 'operation',
    title: '操作',
  },
  {
    title: '方法创建人',
    dataIndex: 'methodCreator',
    key: 'methodCreator',
  },
  {
    title: '方法创建时间',
    dataIndex: 'methodCreateTime',
    key: 'methodCreateTime',
  },
  {
    title: '历史任务数量',
    dataIndex: 'taskCount',
    key: 'taskCount',
  },
  {
    title: '最近任务时间',
    dataIndex: 'lastTaskTime',
    key: 'lastTaskTime',
  },
])
const selectedRowKeys = ref([])
const rowSelection = ref({
  type: 'radio', // 单选模式
  selectedRowKeys,
  onChange: (selectedKeys: any) => {
    selectedRowKeys.value = selectedKeys
  },
})
const pagination = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    queryMethodProtFun()
  },
  onShowSizeChange: (current: number, size: number) => {
    pagination.current = 1
    pagination.pageSize = size
    queryMethodProtFun()
  },
})
const useThisMethods = (record: any) => {
  const selectedRows = dataSource.value.find((item: any) => item.id === selectedRowKeys.value[0])
  emit('useThisMethods', selectedRows)
  model.value = false
}
const handleHistoryTask = (record: { id: any; methodName: any }) => {
  showHistoryTaskDtail.value = true
  methodsObject.value.methodId = record.id
  methodsObject.value.methodName = record.methodName
  console.log(methodsObject.value, 'methodsObject.value')
}
const router = useRouter()
const goSpectralScan = () => {
  router.push({
    name: 'spectralScan',
  })
}
const queryMethodProtFun = async () => {
  const { code, data } = await queryMethodProt({
    projectId: props.project.projectId,
    measureType: props.meaturesType,
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
  })
  if (code === 200) {
    dataSource.value = data.records
  }
}
onMounted(() => {
  queryMethodProtFun()
})
</script>
