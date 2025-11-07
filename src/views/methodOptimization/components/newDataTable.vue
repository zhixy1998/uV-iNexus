<!--
- 版权所有 (C) 2025 北京普析通用仪器有限责任公司。保留所有权利。
- 本软件受商业机密法和版权法保护。
- 本代码仅限与北京普析通用仪器有限责任公司签订有效协议的授权用户内部使用。
- 任何未经明确许可的复制、使用、修改、分发或公开均被严格禁止。
-->
<template>
  <div class="!h-full">
    <a-input-search
      v-model:value="search"
      placeholder="数据名称"
      style="width: 200px"
      @search="fetchData"
    />
    <div class="!mt-[10px] !h-full">
      <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
        <template #active="{ row }">
          <text
            class="cursor-pointer !mr-[10px]"
            :style="{ color: primaryColor }"
            @click="handleDetail(row)"
            >查看</text
          >
          <text
            class="cursor-pointer !mr-[10px]"
            :style="{ color: primaryColor }"
            @click="handleEdit(row)"
            >重命名</text
          >
          <text class="cursor-pointer" :style="{ color: primaryColor }" @click="handleDelete(row)"
            >删除</text
          >
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
import { conciseQueryHistoryTask, conciseUpdateTask, simpleModeDelTask } from '@/api'
import { Modal, notification, Radio, RadioGroup } from 'ant-design-vue'

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
      width: '180px',
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
const handleDelete = (row: any) => {
  Modal.confirm({
    title: '提示',
    content: '确定要删除该历史文件吗?',
    onOk: () => {
      simpleModeDelTaskFun(row.id)
    },
    okText: '确定', // 自定义确定按钮文字
    cancelText: '取消',
  })
}
const simpleModeDelTaskFun = async (taskId: string) => {
  const { code } = await simpleModeDelTask({ taskId })
  if (code === 200) {
    notification.success({
      message: '成功',
      description: '删除成功',
      duration: 3,
    })
    fetchData()
  }
}
defineExpose({
  fetchData,
})

onMounted(() => {
  fetchData()
})
</script>
<style scoped lang="less">
:deep(.vxe-grid--table-wrapper) {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
</style>
