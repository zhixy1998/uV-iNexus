<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="activation-table">
    <!-- 表格 -->
    <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
      <!-- 操作列插槽 -->
      <template v-if="showOperationColumn" #active="{ row }">
        <text class="cursor-pointer" :style="{ color: '#f5222d' }" @click="handleDelete(row)">
          删除
        </text>
      </template>

      <!-- 激活状态插槽 -->
      <template #activationStatus="scope">
        <span
          class="cursor-pointer activation-status-cell"
          :style="{
            color: scope.row.activationStatus === 1 ? '#52c41a' : '#faad14',
          }"
          @click="handleActivationClick(scope.row)"
        >
          {{ activationStatusMap[scope.row.activationStatus as 0 | 1] }}
        </span>
      </template>
      <template #isAddStatus="scope">
        <span class="cursor-pointer activation-status-cell">
          {{ isAddStatusMap[scope.row.isAddStatus as 0 | 1 | 2] }}
        </span>
      </template>
    </vxeTable>

    <!-- 激活确认模态框 -->
    <a-modal
      v-model:visible="activationModalVisible"
      title="激活设备"
      ok-text="确认激活"
      cancel-text="取消"
      @ok="handleConfirmActivation"
      :confirmLoading="activationLoading"
    >
      <a-form
        layout="vertical"
        :model="activationForm"
        :rules="activationRules"
        ref="activationFormRef"
      >
        <a-form-item name="deviceNumber" label="设备序列号" required>
          <a-input v-model:value="activationForm.deviceNumber" placeholder="设备序列号" disabled />
        </a-form-item>
        <a-form-item name="activationCode" label="激活码" required>
          <!-- 激活码输入框 + 文件选择区域（动态禁用） -->
          <div class="activation-code-container">
            <a-input
              v-model:value="activationForm.activationCode"
              placeholder="请输入激活码或选择文件"
              :disabled="isInputDisabled"
            />
            <!-- 文件选择按钮 -->
            <a-button type="primary" class="file-select-btn" @click="selectActivationFile">
              选择激活码文件
            </a-button>
            <!-- 已选文件信息展示 -->
            <div class="selected-file-info" v-if="selectedFileName">
              已选择文件：{{ selectedFileName }}
            </div>
            <!-- 隐藏的文件选择器 -->
            <input
              type="file"
              ref="fileInputRef"
              class="file-input-hidden"
              accept=".txt"
              @change="handleFileSelect"
              style="display: none"
            />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import { message, Modal, notification } from 'ant-design-vue'
import { defineExpose, defineProps, onMounted, ref } from 'vue'

// 导入API
import {
  delSoftwareActivation,
  getSoftwareActivationDetail,
  getSoftwareActivationList,
  PostActivate,
  queryDevices,
} from '@/api/softwareActivation'
import vxeTable from '@/components/vxeTable/index.vue'

// 定义Props
const props = defineProps({
  showOperationColumn: {
    type: Boolean,
    default: true,
  },
  primaryColor: {
    type: String,
    default: '#1890ff',
  },
  isQueryModal: {
    type: Boolean,
    default: false,
  },
})

// 状态映射
const activationStatusMap = {
  0: '点击激活',
  1: '已激活',
}

const isAddStatusMap = {
  0: '旧设备',
  1: '重复设备',
  2: '新设备',
}

// 表格配置
const tableOptions = ref({
  height: '100%',
  loading: false,
  sortConfig: { remote: true },
  pagerConfig: { total: 0, currentPage: 1, pageSize: 20 },
  columns: [
    { type: 'checkbox', fixed: 'left', width: 60 },
    { field: 'deviceNumber', title: '设备序列号', minWidth: 100, fixed: 'left' },
    { field: 'deviceIp', title: '设备IP', minWidth: 90, fixed: 'left' },
    { field: 'type', title: '类型', minWidth: 40, fixed: 'left' },
    {
      field: 'activationStatus',
      title: '激活状态',
      minWidth: 50,
      slots: { default: 'activationStatus' },
    },
    { field: 'activationTime', title: '激活时间', minWidth: 120 },
    { field: 'modificationTime', title: '修改时间', minWidth: 120 },
    {
      field: 'isAddStatus',
      title: '设备状态',
      minWidth: 60,
      slots: { default: 'isAddStatus' },
    },
    { field: 'additionalFunctions', title: '附加功能', minWidth: 100 },
    ...(props.showOperationColumn
      ? [
          {
            title: '操作',
            field: 'operation',
            fixed: 'right',
            minWidth: 60,
            slots: { default: 'active' },
          },
        ]
      : []),
  ],
  data: [] as any[],
})

// 激活相关状态
const activationModalVisible = ref(false)
const activationLoading = ref(false)
const activationFormRef = ref<FormInstance>()
const activationForm = ref({
  id: '',
  deviceNumber: '',
  activationCode: '',
})
const currentActivationRow = ref<any>(null)

// 文件选择相关
const fileInputRef = ref<HTMLInputElement | null>(null)
const tableRef = ref<any>(null)
const selectedFileName = ref('')
const isInputDisabled = ref(false) // 控制输入框是否禁用

// 搜索表单
const searchForm = ref({
  deviceNumber: '',
})

// 搜索参数
interface SearchParams {
  deviceNumber: string
  [key: string]: any
}
const currentSearchParams = ref<SearchParams>({
  deviceNumber: '',
})

// 激活表单规则
const activationRules = ref({
  activationCode: [
    { required: true, message: '请输入激活码或选择文件', trigger: 'blur' },
    { min: 6, message: '激活码长度不能少于6位', trigger: 'blur' },
  ],
})

// 保存搜索参数
const setSearchParams = (params: Partial<SearchParams>) => {
  currentSearchParams.value = { ...currentSearchParams.value, ...params }
}

// 点击激活逻辑
const handleActivationClick = async (rowData: any) => {
  if (rowData.activationStatus !== 0) {
    message.info('该设备已激活')
    return
  }

  try {
    const res = await getSoftwareActivationDetail(rowData.id)
    if (res.code === 200) {
      currentActivationRow.value = rowData
      activationForm.value = {
        id: res.data.id,
        deviceNumber: res.data.deviceNumber,
        activationCode: '',
      }
      selectedFileName.value = ''
      isInputDisabled.value = false // 打开弹窗时允许输入
      activationModalVisible.value = true
    } else {
      message.error(res.message || '获取设备信息失败')
    }
  } catch (error) {
    console.error('获取设备详情失败', error)
    message.error('获取设备信息失败，请重试')
  }
}

// 确认激活逻辑
const handleConfirmActivation = async () => {
  if (!activationFormRef.value) return
  const valid = await activationFormRef.value.validate()
  if (!valid) return

  try {
    activationLoading.value = true
    const res = await PostActivate({
      id: activationForm.value.id,
      activationCode: activationForm.value.activationCode,
    })

    if (res.code === 200) {
      notification.success({ message: '激活成功', description: '设备已成功激活', duration: 3 })
      activationModalVisible.value = false

      if (props.isQueryModal) {
        const queryRes = await queryDevices({
          needAdd: false,
          pageNum: tableOptions.value.pagerConfig.currentPage,
          pageSize: tableOptions.value.pagerConfig.pageSize,
          deviceNumber: currentSearchParams.value.deviceNumber || '',
        })
        if (queryRes.code === 200) {
          tableOptions.value.data = queryRes.data.data || []
          tableOptions.value.pagerConfig.total = queryRes.data.total || 0
        }
      } else {
        await fetchData()
      }
    } else {
      notification.error({
        message: '激活失败',
        description: res.message || '激活失败，请检查激活码',
        duration: 3,
      })
    }
  } catch (error) {
    console.error('激活失败', error)
    notification.error({
      message: '激活错误',
      description: '激活码与设备序列号不匹配',
      duration: 3,
    })
  } finally {
    activationLoading.value = false
    activationForm.value.activationCode = ''
    currentActivationRow.value = null
  }
}

// 触发文件选择
const selectActivationFile = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

// 处理文件选择
const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
    message.error('请选择TXT格式的文件')
    return
  }

  selectedFileName.value = file.name
  isInputDisabled.value = true // 选择文件后禁用输入框

  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const content = event.target?.result as string
      const match = content.match(/激活码：(.+)/)
      activationForm.value.activationCode = match?.[1]?.trim() || content.trim()

      if (activationForm.value.activationCode.length < 6) {
        message.warning('文件中的激活码格式不正确')
      }
    } catch (err) {
      console.error('解析文件失败', err)
      message.error('文件解析失败，请检查文件格式')
    }
  }
  reader.onerror = () => {
    message.error('文件读取失败，请重试')
  }
  reader.readAsText(file, 'utf-8')
}

// 搜索方法
const handleSearch = (data: any[] | string) => {
  if (Array.isArray(data)) {
    if (props.isQueryModal) {
      const filteredData = data.filter((item) => item.isAddStatus === 1 || item.isAddStatus === 2)
      tableOptions.value.data = filteredData
      tableOptions.value.pagerConfig.total = filteredData.length
    } else {
      tableOptions.value.data = data
      tableOptions.value.pagerConfig.total = data.length
    }
    tableOptions.value.loading = false
    setSearchParams({ deviceNumber: '' })
  } else {
    searchForm.value.deviceNumber = data
    tableOptions.value.pagerConfig.currentPage = 1
    setSearchParams({ deviceNumber: data })
    fetchData()
  }
}

// 表格数据请求
const fetchData = async () => {
  tableOptions.value.loading = true
  try {
    const { code, data } = await getSoftwareActivationList({
      pageNum: tableOptions.value.pagerConfig.currentPage,
      pageSize: tableOptions.value.pagerConfig.pageSize,
      deviceNumber: searchForm.value.deviceNumber,
    })
    if (code === 200) {
      tableOptions.value.data = data.data || []
      tableOptions.value.pagerConfig.total = data.total || 0
    }
  } catch (error) {
    console.error('获取数据失败', error)
    message.error('获取数据失败，请重试')
  } finally {
    tableOptions.value.loading = false
  }
}

// 分页变化逻辑
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize

  if (!(tableOptions.value.data.length && tableOptions.value.data[0].isAddStatus !== undefined)) {
    fetchData()
  }
}

// 单行删除逻辑
const handleDelete = (record: any) => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除这条记录吗？',
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      try {
        const res = await delSoftwareActivation(record.id)
        if (res.code === 200) {
          notification.success({ message: '删除成功', description: '记录已成功删除', duration: 3 })
          if (
            tableOptions.value.data.length &&
            tableOptions.value.data[0].isAddStatus !== undefined
          ) {
            tableOptions.value.data = tableOptions.value.data.filter(
              (item: any) => item.id !== record.id,
            )
            tableOptions.value.pagerConfig.total--
          } else {
            await fetchData()
          }
        } else {
          notification.error({
            message: '删除失败',
            description: res.message || '删除失败，请重试',
            duration: 3,
          })
        }
      } catch (error) {
        console.error('删除失败', error)
        notification.error({ message: '删除错误', description: '删除过程中发生错误', duration: 3 })
      }
    },
  })
}

// 初始化
onMounted(() => {
  if (!props.isQueryModal) {
    fetchData()
  } else {
    tableOptions.value.data = []
  }
})

// 暴露给父组件的方法
defineExpose({
  handleSearch,
  refresh: fetchData,
  tableRef,
  setSearchParams,
})
</script>

<style scoped lang="less">
.activation-table {
  width: 100%;
}

:deep(.vxe-table .vxe-cell) {
  &.activation-status-cell {
    cursor: pointer;
  }
}

// 激活码输入框布局
.activation-code-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

// 文件选择按钮样式
.file-select-btn {
  white-space: nowrap;
}

// 已选文件信息样式
.selected-file-info {
  color: #666;
  font-size: 12px;
  margin-top: 4px;
}

// 隐藏文件选择器
.file-input-hidden {
  display: none;
}
</style>
