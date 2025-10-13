<template>
  <uvModal v-model="model" title="所有历史任务">
    <template #content>
      <div class="text-xl font-bold !mb-8">项目名称：项目1</div>
      <div class="flex items-center justify-between !mb-8">
        <span>方法名称：方法一</span>
        <a-range-picker v-model:value="value3" />
      </div>
      <a-table :dataSource="dataSource" :columns="columns" :pagination="paginationConfig">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'dataDetail'">
            <a @click="goLumneScence">数据详情</a>
          </template>
        </template>
      </a-table>
    </template>
  </uvModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import uvModal from '@/components/uvModal/index.vue'
const model = defineModel()
const value3 = ref([])
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
])
const paginationConfig = ref({})
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
    title: '详情',
    key: 'dataDetail',
  },
])
const router = useRouter()
// 跳转到光度测量
const goLumneScence = () => {
  router.push({ name: 'lumneScence' })
}
</script>
