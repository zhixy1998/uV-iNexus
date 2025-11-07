<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="rounded-[20px] bg-[#F4FAFF] !h-full flex flex-col">
    <div class="title-box text-[18px] !font-bold flex-none">
      <span class="!font-bold">历史文件</span>
      <a-input-search
        v-model:value="search"
        placeholder="方法名称"
        style="width: 200px"
        @search="fetchData"
      />
    </div>
    <div class="container flex-1 overflow-hidden">
      <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
        <template #active="{ row }">
          <text
            class="cursor-pointer !mr-[10px]"
            :style="{ color: primaryColor }"
            @click="handleDetail(row)"
            >查看</text
          >
          <text class="cursor-pointer" :style="{ color: primaryColor }" @click="handleEdit(row)"
            >重命名</text
          >
          <!-- <text class="cursor-pointer" :style="{ color: primaryColor }">转换成向导结果</text> -->
        </template>
      </vxeTable>
    </div>
    <uvModal
      v-model="modelValue"
      title="重命名"
      width="40%"
      @handleOk="handleOk"
      @handleCancel="handleCancel"
    >
      <template #content>
        <uvForm ref="uvFormRef" :formState="ruleForm" :rules="rules" :formOptions="formOptions" />
      </template>
    </uvModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores'
import { conciseQueryHistoryTask, conciseUpdateTask } from '@/api'
import { notification } from 'ant-design-vue'

const { primaryColor } = useAppStore()

const props = defineProps({
  measureType: {
    type: String,
    default: '光度测量',
  },
})

const search = ref('')
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
}
const tableOptions = ref({
  loading: false,
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  height: '100%',
  columns: [
    {
      field: 'taskName',
      title: '数据名称',
    },
    {
      field: 'methodName',
      title: '对应方法',
    },
    {
      field: 'createTime',
      title: '创建时间',
    },
    {
      field: 'endSaveTime',
      title: '最后保存时间',
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      width: '25%',
      slots: {
        default: 'active',
      },
    },
  ],
  data: [] as any[],
})
const fetchData = async () => {
  tableOptions.value.loading = true
  const { code, data } = await conciseQueryHistoryTask({
    methodType: props.measureType,
    selectKey: search.value,
    pageNum: tableOptions.value.pagerConfig.currentPage,
    pageSize: tableOptions.value.pagerConfig.pageSize,
  })
  if (code === 200) {
    tableOptions.value.data = data.records
    tableOptions.value.pagerConfig.total = data.total
  }
  tableOptions.value.loading = false
}
const handleDetail = (row: any) => {
  const projectDetail = {
    taskId: row.id,
    taskName: row.taskName,
    methodId: row.methodKey,
    methodName: row.methodName,
  }
  const baseUrl = `${window.location.origin + window.location.pathname}?projectDetail=${JSON.stringify(projectDetail)}&measureType=${props.measureType}&sub=true`
  window.open(baseUrl, '_blank')
}

// 重命名
const ruleForm = reactive<any>({
  taskName: '',
  taskId: '',
})
const modelValue = ref(false)
const uvFormRef = ref()
const rules = ref({
  taskName: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<any[]>([
  {
    type: 'input',
    label: '文件名称',
    props: 'taskName',
  },
])
const showModal = (row: any) => {
  ruleForm.taskName = row.taskName
  ruleForm.taskId = row.id
  modelValue.value = true
}
const handleOk = async () => {
  const result = await uvFormRef.value?.onSubmit()
  if (result) {
    const { code } = await conciseUpdateTask({
      taskId: ruleForm.taskId,
      taskName: ruleForm.taskName,
    })
    if (code === 200) {
      fetchData()
      modelValue.value = false
      notification.success({
        message: '成功',
        description: '修改成功',
        duration: 3,
      })
    }
  }
}
const handleCancel = () => {
  uvFormRef.value?.resetForm()
}
const handleEdit = (row: any) => {
  showModal(row)
}

defineExpose({
  fetchData,
})

onMounted(() => {
  fetchData()
})
</script>
<style scoped lang="less">
.title-box {
  padding: 5px 17px;
  display: flex;
  justify-content: space-between;
  color: #153471;
  .button {
    padding: 2px 14px;
    font-size: 15px;
    border-radius: 10px;
    background-color: #c6edff;
    color: #616170;
  }
}

.container {
  position: relative;
  padding: 10px 17px;
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
}
</style>
