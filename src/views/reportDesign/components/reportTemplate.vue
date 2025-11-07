<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <div class="flex items-center justify-between !mb-3 pl-[20px] pr-[20px]">
      <div class="flex items-center">
        <div class="title !mr-20" :style="{ color: primaryColor }">{{ title }}</div>
        <a-input-search v-model:value="name" placeholder="请输入查询条件" @search="handleSearch" />
      </div>
      <div v-if="menuType !== 2" class="flex">
        <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleImport">
          <template #icon>
            <upload-outlined />
          </template>
          导入模板
        </a-button>
        <a-button type="primary" class="!flex flex-row items-center" @click="handleExport">
          <template #icon>
            <download-outlined />
          </template>
          导出模板
        </a-button>
      </div>
    </div>
    <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
    <div class="content-box">
      <vxeTable
        ref="tableRef"
        :options="tableOptions"
        @changePage="handlePageChange"
        @currentRowChange="handleCurrentRowChange"
        @sortChange="handleSortChange"
      >
        <template #active="{ row }">
          <text
            class="cursor-pointer !mr-5"
            :style="{ color: primaryColor }"
            @click.stop="handleEdit(row)"
            >编辑</text
          >
          <text class="cursor-pointer" :style="{ color: '#f5222d' }" @click.stop="handleDelete(row)"
            >刪除</text
          >
        </template>
      </vxeTable>
    </div>
    <editModal
      ref="editModalRef"
      title="编辑"
      :formState="formState"
      :formOptions="formOptions"
      :rules="rules"
      @update:modelValue="updateLabel"
    />
  </section>
  <import-modal
    ref="importModalRef"
    :acceptTypes="'.docx'"
    importUrl="/template/upload_template"
    @import-success="importSuccess"
  />
</template>

<script setup lang="ts">
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { Modal, notification } from 'ant-design-vue'
import { onMounted, reactive, ref, watch } from 'vue'

import {
  delReportList,
  editReportList,
  getAllReportList,
  getCalibrationList,
  getInstallationList,
  getReportContent,
  getReportList,
} from '@/api'
import vxeTable from '@/components/vxeTable/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import { useAppStore } from '@/stores'
import type { formOptionsType } from '@/types/common'

import editModal from '../components/editModal.vue'

const { primaryColor } = useAppStore()

const props = defineProps({
  // 0：报告模板  1：校准管理  2：安装验收模板  3：编辑模板
  menuType: {
    type: Number,
    default: 0,
    required: true,
  },
  // 报告模板需要传
  activeTab: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
  columns: {
    type: Array,
    default: () => [],
    required: true,
  },
  // 用来另存为新模板时 更新数据
  updateData: {
    type: Boolean,
    default: false,
  },
  // 选中的模板Id
  templateId: {
    type: Number,
    default: null,
  },
  // 接口函数
  aipFun: {
    type: Function,
    default: null,
  },
})

// 搜索
const name = ref('')
const handleSearch = (value: string) => {
  fetchData()
}

// 表格数据
const tableRef = ref()
const tableOptions = ref({
  loading: false,
  rowConfig: {
    isCurrent: true,
    isHover: true,
  },
  sortConfig: {
    remote: true,
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [],
  data: [],
})

watch(
  () => props.columns,
  (newValue: any) => {
    tableOptions.value.columns = newValue
  },
  { immediate: true, deep: true },
)

watch(
  () => props.updateData,
  () => {
    fetchData()
  },
)

watch(
  () => props.activeTab,
  () => {
    tableOptions.value.pagerConfig.currentPage = 1
    fetchData()
  },
)

const currentDataRow = ref()
const fetchData = async () => {
  tableOptions.value.loading = true
  let apiFun: any
  const params = {
    name: name.value,
    desc: sortQuery.value.desc,
    sort_field: sortQuery.value.sort_field,
    page: tableOptions.value.pagerConfig.currentPage,
    page_size: tableOptions.value.pagerConfig.pageSize,
  }
  switch (props.menuType) {
    case 0:
      apiFun = getReportList({
        ...params,
        type: props.activeTab,
      })
      break
    case 1:
      apiFun = getCalibrationList(params)
      break
    case 2:
      apiFun = getInstallationList(params)
      break
    case 3:
      apiFun = getAllReportList(params)
      break
  }
  const { code, data } = await apiFun
  if (code === 200) {
    tableOptions.value.data = data.template_list
    tableOptions.value.pagerConfig.total = data.sum_count || 0
    if (data.template_list.length > 0) {
      const flag = tableOptions.value.data.find(
        (item: { id: number }) => item.id === props.templateId,
      )
      currentDataRow.value = flag ?? tableOptions.value.data[0]
      tableRef.value.gridRef.setCurrentRow(currentDataRow.value)
      emit('handleCurrentRowChange', currentDataRow.value)
    }
  }
  tableOptions.value.loading = false
}
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
}

// 选中行
const emit = defineEmits(['handleCurrentRowChange'])
const handleCurrentRowChange = (row: { id: string }) => {
  emit('handleCurrentRowChange', row)
}

// 排序
const sortQuery = ref<{
  desc: number | null
  sort_field: number | null
}>({
  desc: null,
  sort_field: null,
})
const handleSortChange = async (field: string, order: string) => {
  sortQuery.value.desc = order === 'desc' ? 1 : 0
  sortQuery.value.sort_field = field === 'id' ? 0 : field === 'create_datetime' ? 1 : 2
  await fetchData()
}

// 编辑
const formState = reactive<{
  name: string
}>({
  name: '',
})
const rules = ref({
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const formOptions = ref<formOptionsType[]>([
  {
    type: 'input',
    label: '模板名称',
    props: 'name',
  },
])
const editModalRef = ref()
const handleEdit = (row: { id: number; name: string }) => {
  editModalRef.value.showModal(row)
}
const updateLabel = async (query: { id: number; name: string }) => {
  const { code, message } = await editReportList({
    id: query.id,
    name: query.name,
  })
  if (code === 200) {
    notification.success({
      message: '成功！',
      description: message,
      duration: 3,
    })
    editModalRef.value.uvFormRef.resetForm()
    fetchData()
  }
}

// 删除
const handleDelete = (row: { id: number }) => {
  Modal.confirm({
    title: '提示',
    content: '是否确认删除？',
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      const { code, message } = await delReportList({
        id: row.id,
      })
      if (code === 200) {
        notification.success({
          message: '成功！',
          description: message,
          duration: 3,
        })
        fetchData()
      }
    },
    onCancel() {},
  })
}

// 导入
const importModalRef = ref()
const handleImport = () => {
  importModalRef.value.showModal()
}
const importSuccess = (res: any) => {
  if (res.code == 200) {
    notification.success({
      message: '成功！',
      description: res.message || '导入成功！',
      duration: 3,
    })
    importModalRef.value.handleCancel()
    fetchData()
  }
}

// 导出
const handleExport = async () => {
  const { code, data } = await getReportContent({
    template_id: props.templateId,
  })
  if (code === 200) {
    useDownloadFile(data.template_content, `${currentDataRow.value.name}.docx`)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="less" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.content-box {
  padding: 35px 20px 15px;
}
</style>
