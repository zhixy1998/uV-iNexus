<template>
  <uvModal v-model="model" title="项目详情">
    <template #content>
      <div class="flex justify-between items-center !mb-8">
        <span class="text-xl font-bold">项目1</span>
        <div class="flex gap-4 text-base">
          <span>创建人:Admin</span>
          <span>创建时间</span>
        </div>
      </div>
      <div class="gap-4 flex items-start !mb-8">
        <uvHasIconBtn content="新建方法" @click="handleCreateMethods">
          <template #icon>
            <DownloadOutlined />
          </template>
        </uvHasIconBtn>
        <uvHasIconBtn content="创建任务" @click="handleCreateTask">
          <template #icon>
            <DownloadOutlined />
          </template>
        </uvHasIconBtn>
      </div>
      <div class="flex gap-2 items-center teaxt-base !mb-8">
        <span>指定方法</span>
        <a-select ref="select" v-model:value="value1" style="width: 30%" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </div>
      <a-table :dataSource="dataSource" :columns="columns" :pagination="paginationConfig">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <uvHasIconBtn content="使用该方法" @click="goSpectralScan">
              <template #icon>
                <DownloadOutlined />
              </template>
            </uvHasIconBtn>
          </template>
          <template v-if="column.key === 'historyTask'">
            <a @click="handleHistoryTask">查看</a>
          </template>
        </template>
      </a-table>
    </template>
  </uvModal>
  <create-methods v-model="showCreateMethods" />
  <create-task v-model="showCreateTask" />
  <history-task-detail v-model="showHistoryTaskDtail" />
</template>
<script lang="ts" setup>
import { DownloadOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import uvHasIconBtn from '@/components/uvHasIconBtn/index.vue'
import uvModal from '@/components/uvModal/index.vue'

import createMethods from './createMethods.vue'
import createTask from './createTask.vue'
import historyTaskDetail from './historyTaskDetail.vue'
const model = defineModel()
const value1 = ref([])

const handleChange = (e: Event) => {}
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
])
const showCreateMethods = ref<boolean>(false)
const showCreateTask = ref<boolean>(false)
const showHistoryTaskDtail = ref<boolean>(false)
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
    key: 'operation',
    title: '操作',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '所有历史任务',
    key: 'historyTask',
  },
])
const paginationConfig = ref({})
const handleCreateMethods = () => {
  showCreateMethods.value = true
}
const handleCreateTask = () => {
  showCreateTask.value = true
}
const handleHistoryTask = () => {
  showHistoryTaskDtail.value = true
}
const router = useRouter()
const goSpectralScan = () => {
  router.push({
    name: 'spectralScan',
  })
}
</script>
