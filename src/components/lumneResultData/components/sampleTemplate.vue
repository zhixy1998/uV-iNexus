<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="sampleTemplate">
    <div class="flex gap-4 absolute right-[18px]">
      <uvHasIconBtn content="查询样品模板" @click="catSampleVisualFun" />
      <uvHasIconBtn content="保存样品模板" @click="saveSampleVisual = true" />
    </div>
  </div>
  <uvModal v-model="catSampleVisual" title="查询样品模板" @handleOk="useThisTemplateFun">
    <template #content>
      <div class="flex items-center !mb-2">
        <span class="w-30">模板名称</span>
        <a-input v-model:value="templateName" @keyup.enter="fetchData" />
      </div>
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="tableData"
        size="small"
        :rowSelection="rowSelection"
      >
        <template #operation="{ record }">
          <DeleteOutlined class="cursor-pointer" @click="deleteSampleTemplateFun(record)" />
        </template>
      </a-table>
    </template>
  </uvModal>
  <uvModal
    v-model="saveSampleVisual"
    title="保存样品模板"
    size="small"
    @handleOk="saveSampleVisualFun"
  >
    <template #content>
      <uvForm
        ref="uvFormRef"
        :formOptions="formOptions"
        :formState="formState"
        :formRules="formRules"
      />
    </template>
  </uvModal>
</template>

<script setup lang="ts">
import { DeleteOutlined } from '@ant-design/icons-vue'
import { message, Modal, notification } from 'ant-design-vue'
import { reactive, ref } from 'vue'

import type { formOptionsType } from '@/types/common'

const props = defineProps({
  measureType: {
    type: String,
    default: '光度测量',
  },
  templateHeads: {
    type: Array as PropType<Record<string, any>>,
    default: () => [],
  },
  saveColum: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
})
const apiLumneSample: any = inject('apiLumneSample')

const emits = defineEmits(['update:templateHeads'])
const formState = ref<{
  templateName: string
  templateDesc: string
}>({
  templateName: '',
  templateDesc: '',
})
const formRules = reactive({
  templateName: [
    {
      required: true,
      message: '请输入模板名称',
      trigger: 'blur',
    },
  ],
})
const catSampleVisual = ref(false)
const saveSampleVisual = ref(false)
const columns = ref([
  { title: '模板名称', dataIndex: 'templateName', width: 150 },
  {
    title: '模板描述',
    dataIndex: 'templateDesc',
  },
  {
    title: '模板表头信息',
    dataIndex: 'templateHeadsStr',
  },
  {
    title: '操作',
    width: 100,
    key: 'operation',
    slots: { customRender: 'operation' },
  },
])
const selectedRowKeys = ref([])
const rowSelection = ref({
  type: 'radio', // 单选模式
  fixed: 'left',
  selectedRowKeys,
  onChange: (selectedKeys: any) => {
    selectedRowKeys.value = selectedKeys
  },
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '模板名称',
    props: 'templateName',
  },
  {
    type: 'input',
    label: '模板描述',
    props: 'templateDesc',
  },
])
const tableData = ref<Record<string, any>>([])
const templateName = ref('')
const fetchData = async () => {
  const { code, data } = await apiLumneSample.querySampleTemplate({
    measureType: props.measureType,
    search: templateName.value,
  })
  data.forEach((item: any) => {
    item.templateHeadsStr = item.templateHeads.map((item: any) => item.name).join(' | ')
  })
  tableData.value = data
}

const catSampleVisualFun = () => {
  catSampleVisual.value = true
  fetchData()
}
const deleteSampleTemplateFun = async (record: any) => {
  const { code, data } = await apiLumneSample.deleteSampleTemplate({
    templateId: record.id,
  })
  if (code === 200) {
    message.success('删除成功！')
    fetchData()
  }
}
const saveSampleVisualFun = async () => {
  const templateHeads = JSON.parse(JSON.stringify(props.saveColum))
  templateHeads.forEach((item: any) => {
    item.locate = 'sample'
  })
  const { code, data } = await apiLumneSample.saveSampleTemplate({
    ...formState.value,
    measureType: props.measureType,
    templateHeads: templateHeads,
  })
  if (code === 200) {
    message.success('样品模板保存成功！')
    saveSampleVisual.value = false
  }
}
const useThisTemplateFun = async () => {
  const record = tableData.value.find((item: any) => item.id === selectedRowKeys.value[0])
  console.log(record, 'record', tableData.value, selectedRowKeys.value)
  emits('update:templateHeads', record.templateHeads)
  catSampleVisual.value = false
}
onMounted(() => {})
</script>

<style scoped lang="less">
.sampleTemplate {
  position: relative;
  z-index: 999;
}
</style>
