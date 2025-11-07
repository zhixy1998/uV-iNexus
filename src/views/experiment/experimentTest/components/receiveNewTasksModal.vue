<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <a-modal v-model:open="opneModal" title="接收新任务" @ok="handleOk" class="!w-[70%]">
    <div class="text-[17px] !mb-[20px]">
      <span class="!mr-[100px] !font-bold">当前样品数量：2</span>
      <span class="!font-bold">方法编码：GB 5009.182-2017</span>
    </div>
    <div class="flex items-center justify-between !mb-[20px]">
      <div class="flex items-center">
        <span class="!mr-[5px] text-[16px]">用户：</span>
        <a-select
          v-model:value="ruleForm.user"
          class="w-[160px]"
          :options="userOptions"
          placeholder="请选择用户"
        ></a-select>
        <span class="!ml-[50px] text-[16px]">查询条件：</span>
        <a-select
          v-model:value="ruleForm.groupName"
          class="w-[160px] !mr-[10px]"
          :options="groupOptions"
          placeholder="请选择样品组"
        ></a-select>
        <a-select
          v-model:value="ruleForm.sampleName"
          class="w-[160px] !mr-[70px]"
          :options="sampleOptions"
          placeholder="请选择样品"
        ></a-select>
        <uvHasIconBtn content="查询" @click="fetchData"> </uvHasIconBtn>
      </div>
      <div class="flex items-center gap-[20px]">
        <uvHasIconBtn content="导入工作站" @click="handleImport"> </uvHasIconBtn>
        <uvHasIconBtn content="设置" @click="handleSetting"> </uvHasIconBtn>
        <uvHasIconBtn content="导出" @click="handleExport"> </uvHasIconBtn>
      </div>
    </div>
    <vxeTable ref="tableRef" :options="tableOptions"> </vxeTable>
    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { ref } from 'vue'

const { primaryColor } = useAppStore()

// 表格数据
const ruleForm = ref({
  user: null,
  groupName: null,
  sampleName: null,
})
const userOptions = ref([
  { label: '张三', value: '张三' },
  { label: '李四', value: '李四' },
  { label: '王五', value: '王五' },
])
const groupOptions = ref([
  { label: '食品', value: '食品' },
  { label: '饮料', value: '饮料' },
])
const sampleOptions = ref([
  { label: '粉丝', value: '粉丝' },
  { label: '方便面', value: '方便面' },
])
const tableOptions = ref({
  loading: false,
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [
    { type: 'checkbox', fixed: 'left', width: 60 },
    {
      field: 'industry',
      title: '序号',
      minWidth: 100,
      fixed: 'left',
    },
    {
      field: 'status',
      title: '样品编号',
      minWidth: 100,
    },
    {
      field: 'standardName',
      title: '重量',
      minWidth: 170,
    },
    {
      field: 'industryType',
      title: '取样体积',
      minWidth: 100,
    },
    {
      field: 'releaseDate',
      title: '稀释倍数',
      minWidth: 150,
    },
    {
      field: 'effectiveDate',
      title: '样品类型',
      minWidth: 150,
    },
    {
      field: 'effectiveDate',
      title: '检测项目',
      minWidth: 150,
    },
  ],
  data: [] as any[],
})
const fetchData = async () => {
  tableOptions.value.loading = true
  tableOptions.value.loading = false
}
const handleImport = () => {}
const handleSetting = () => {}
const handleExport = () => {}

// 对话框
const opneModal = ref<boolean>(false)
const showModal = () => {
  opneModal.value = true
  fetchData()
}
const handleCancel = () => {
  opneModal.value = false
}
const handleOk = async () => {}

const emit = defineEmits([])
defineExpose({
  showModal,
})
</script>

<style lang="less" scoped></style>
