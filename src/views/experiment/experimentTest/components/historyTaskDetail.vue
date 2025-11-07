<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <uvModal v-model="model" title="所有历史任务" @handle-ok="handleOk" :footer="null">
    <template #content>
      <div class="!mb-4">项目名称：{{ taskParams.projectName }}</div>
      <div class="!mb-4">方法类型：{{ taskParams.measurementType }}</div>
      <div class="flex items-center justify-between !mb-8">
        <div class="flex items-center gap-5">
          <div class="flex items-center">
            <span class="w-22">指定方法</span>
            <div v-if="methodsParams.methodId">
              {{ methodsParams.methodName }}
            </div>
            <a-select
              v-else
              v-model:value="methodsArr"
              :options="options"
              mode="multiple"
              placeholder="Please select"
              style="width: 200px"
            >
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <div class="flex items-center">
            <span class="w-22">创建时间</span>
            <a-range-picker v-model:value="timeArr" :valueFormat="`YYYY-MM-DD HH:mm:ss`" />
          </div>
        </div>
        <div class="flex items-center gap-5">
          <uvHasIconBtn content="查询" @click.stop="pagination.onShowSizeChange"> </uvHasIconBtn>
        </div>
      </div>
      <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'dataDetail'">
            <a @click="goLumneScence(record)">数据详情</a>
          </template>
        </template>
      </a-table>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { computed, onMounted, type PropType, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { queryProjectAllMethods, queryTaskPort } from '@/api'
import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'
const props = defineProps({
  modelValue: Boolean,
  taskParams: {
    type: Object as PropType<{
      projectId: string
      projectName: string
      measurementType: string
    }>,
    default: () => ({}),
  },
  methodsParams: {
    type: Object as PropType<{
      methodId: string
      methodName: string
    }>,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
const methodsArr = ref<string[]>([])
const timeArr = ref([])
const dataSource = ref([])
const options = ref<{ label: string; value: string }[]>([])
const pagination = reactive({
  pageSize: 10,
  total: 0,
  current: 1,
  showTotal: (total: number) => `Total ${total} items`,
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    queryTaskPortTest()
  },
  onShowSizeChange: (current: number, size: number) => {
    pagination.current = 1
    // pagination.pageSize = size
    queryTaskPortTest()
  },
})
const columns = ref([
  {
    title: '任务名称',
    dataIndex: 'taskName',
  },
  {
    title: '用户',
    dataIndex: 'userId',
  },
  {
    dataIndex: 'isDelete',
    title: '创建时间',
  },
  // {
  //   title: '结束时间',
  //   dataIndex: 'address',
  // },
  {
    title: '详情',
    key: 'dataDetail',
  },
])
const findMethods = async () => {
  const { code, data } = await queryProjectAllMethods({
    projectId: props.taskParams.projectId,
    methodType: props.taskParams.measurementType,
  })
  if (code === 200) {
    options.value = data.map((item: any) => ({
      label: item.methodName,
      value: item.id,
    }))
  }
}
const queryTaskPortTest = async () => {
  const params = {
    projectId: props.taskParams.projectId,
    measurementType: props.taskParams.measurementType,
    methodIds: props.methodsParams.methodId ? [props.methodsParams.methodId] : methodsArr.value,
    pageNum: pagination.current,
    pageSize: pagination.pageSize,
    startTime: timeArr.value ? timeArr.value[0] : '',
    endTime: timeArr.value ? timeArr.value[1] : '',
  }
  const { code, data } = await queryTaskPort(params)
  if (code === 200) {
    pagination.total = data.total
    dataSource.value = data.records
  }
}
onMounted(async () => {
  findMethods().then((res) => {
    queryTaskPortTest()
  })
})
const router = useRouter()
// 跳转到光度测量
const goLumneScence = (record: any) => {
  if (props.taskParams.measurementType === '光度测量') {
    console.log('record', record)
    const routeUrl = router.resolve({
      name: 'lumneScence',
      query: {
        taskId: record.id,
      },
    })
    window.open(routeUrl.href, '_blank')
  } else if (props.taskParams.measurementType === '光谱扫描') {
    const routeUrl = router.resolve({
      name: 'spectralScan',
      query: {
        taskId: record.id,
      },
    })
    window.open(routeUrl.href, '_blank')
  } else if (props.taskParams.measurementType === '时间扫描') {
    const routeUrl = router.resolve({
      name: 'timeScan',
      query: {
        taskId: record.id,
      },
    })
    window.open(routeUrl.href, '_blank')
  } else if (props.taskParams.measurementType === '定量测定') {
    const routeUrl = router.resolve({
      name: 'quantityDetermind',
      query: {
        taskId: record.id,
      },
    })
    window.open(routeUrl.href, '_blank')
  }
}
const handleOk = () => {
  model.value = false
}
</script>
