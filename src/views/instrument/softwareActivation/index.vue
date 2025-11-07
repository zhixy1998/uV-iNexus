<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section class="!h-full uv-container">
    <div class="detail-card !h-full flex flex-col">
      <div class="flex items-center justify-between !mb-3">
        <div class="detail-card-title">软件激活</div>
      </div>

      <!-- 内容容器 -->
      <div class="content-box">
        <!-- 顶部布局：搜索 + 操作按钮 同一行 -->
        <div class="flex flex-row items-center justify-between !mb-5">
          <!-- 搜索区域 -->
          <div class="flex flex-row items-center">
            <span class="label mr-4">激活状态信息</span>
            <a-input
              v-model:value="searchDeviceNumber"
              placeholder="请输入序列号"
              class="!w-[230px] !mr-4"
              @press-enter="handleSearch"
            >
              <template #suffix>
                <SearchOutlined style="cursor: pointer; color: #666" @click="handleSearch" />
              </template>
            </a-input>
            <!-- 重置按钮 -->
            <a-button
              type="default"
              class="!mr-4 reset-btn"
              @click="handleMainReset"
              :disabled="!searchDeviceNumber"
            >
              <template #icon>
                <ReloadOutlined class="reset-icon" />
              </template>
              重置
            </a-button>
          </div>

          <!-- 操作按钮区 -->
          <div class="flex flex-row items-center">
            <a-button type="primary" class="!mr-4" @click="deviceQueryModalVisible = true">
              设备发现
            </a-button>

            <a-button
              type="primary"
              danger
              class="!flex flex-row items-center !mr-4 !text-[#fff]"
              @click="handleBatchDelete"
            >
              <template #icon>
                <DeleteOutlined />
              </template>
              批量删除
            </a-button>
          </div>
        </div>
      </div>

      <!-- 主表格组件 -->
      <ActivationTable
        class="flex-1"
        ref="activationTableRef"
        :showOperationColumn="true"
        :primaryColor="primaryColor"
      />

      <!-- 添加激活记录模态框 -->
      <a-modal
        v-model:visible="addModalVisible"
        title="添加软件激活记录"
        ok-text="确认"
        cancel-text="取消"
        @ok="handleAddSubmit"
      >
        <a-form layout="vertical" :model="addForm" :rules="addRules" ref="addFormRef">
          <a-form-item name="deviceNumber" label="设备序列号" required>
            <a-input v-model:value="addForm.deviceNumber" placeholder="请输入设备序列号" />
          </a-form-item>
          <a-form-item name="deviceIp" label="设备IP" required>
            <a-input v-model:value="addForm.deviceIp" placeholder="请输入设备IP" />
          </a-form-item>
          <a-form-item name="type" label="类型" required>
            <a-input v-model:value="addForm.type" placeholder="请输入类型（如T800）" />
          </a-form-item>
          <a-form-item name="activationStatus" label="激活状态" required>
            <a-select
              v-model:value="addForm.activationStatus"
              placeholder="请选择激活状态"
              disabled
            >
              <a-select-option value="0">点击激活</a-select-option>
              <a-select-option value="1">已激活</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="activationTime" label="激活时间">
            <a-date-picker
              v-model:value="addForm.activationTime"
              format="YYYY-MM-DD"
              placeholder="请选择激活时间"
            />
          </a-form-item>
          <a-form-item name="modificationTime" label="修改时间">
            <a-date-picker
              v-model:value="addForm.modificationTime"
              format="YYYY-MM-DD"
              placeholder="请选择修改时间"
            />
          </a-form-item>
          <a-form-item name="additionalFunctions" label="附加功能">
            <a-input v-model:value="addForm.additionalFunctions" placeholder="请输入附加功能" />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 设备查询弹窗 -->
      <a-modal
        v-model:visible="deviceQueryModalVisible"
        title="设备发现"
        width="1050px"
        @ok="handleModalClose"
        @cancel="handleModalClose"
        :footer="null"
      >
        <!-- 弹窗内容区域 -->
        <div class="modal-content">
          <!-- 设备查询模式切换区域 -->
          <div class="mb-4">
            <div class="select-mode">
              <a-radio-group v-model:value="queryMode" @change="handleQueryModeChange">
                <a-radio value="auto">自动扫描新设备</a-radio>
                <a-radio value="manual">指定设备序列号查找新设备</a-radio>
              </a-radio-group>
            </div>

            <!-- 自动扫描模式 -->
            <div v-if="queryMode === 'auto'" class="select-mode">
              <a-button
                type="primary"
                class="!mr-4"
                @click="handleAutoQuery"
                :disabled="isScanning"
              >
                查询
              </a-button>
              <a-button type="default" @click="handleStopQuery" :disabled="!isScanning">
                停止
              </a-button>

              <!-- 进度条展示在查询按钮下方 -->
              <div v-if="isScanning" class="progress-container">
                <p class="progress-message">{{ progressMessage }}</p>
                <a-progress :percent="progressPercent" status="active" class="progress-bar" />
              </div>
            </div>

            <!-- 手动查询模式 -->
            <div v-if="queryMode === 'manual'" class="select-mode">
              <span class="label mr-3">序列号：</span>
              <a-input
                v-model:value="manualQuerySerial"
                placeholder="请输入序列号"
                class="!w-[230px] !mr-4"
                @press-enter="handleManualQuery"
                :disabled="isScanning"
              />
              <a-button
                type="primary"
                class="!mr-4"
                @click="handleManualQuery"
                :disabled="isScanning || !manualQuerySerial"
              >
                查询
              </a-button>
              <a-button type="default" @click="handleStopQuery" :disabled="!isScanning">
                停止
              </a-button>

              <!-- 进度条展示在查询按钮下方 -->
              <div v-if="isScanning" class="progress-container">
                <p class="progress-message">{{ progressMessage }}</p>
                <a-progress :percent="progressPercent" status="active" class="progress-bar" />
              </div>
            </div>

            <div v-if="showNoResult" class="mt-2 text-red-500">
              没有找到任何仪器，请检查仪器是否连接正常！
            </div>
          </div>
          <!-- 弹窗表格组件 -->
          <ActivationTable
            :showOperationColumn="false"
            :primaryColor="primaryColor"
            ref="queryActivationTableRef"
            :isQueryModal="true"
          />
        </div>

        <!-- 自定义底部按钮（居中显示） -->
        <div class="modal-footer">
          <a-button type="primary" @click="handleModalClose" :disabled="isScanning" class="!mr-4">
            确认
          </a-button>
          <a-button type="default" @click="handleModalClose" :disabled="isScanning">
            取消
          </a-button>
        </div>
      </a-modal>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DeleteOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { message, Modal, notification } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'

// 导入API
import {
  delBatchSoftwareActivation,
  PostSoftwareActivation,
  queryDevices,
  resetAllDeviceAddStatus,
} from '@/api/softwareActivation'
import { useAppStore } from '@/stores'

// 导入表格组件（仅保留表格组件，不抽离其他组件）
import ActivationTable from './components/ActivationTable.vue'

// 全局状态
const { primaryColor } = useAppStore()
const activationTableRef = ref<any>()
const queryActivationTableRef = ref<any>()

// 搜索相关
const searchDeviceNumber = ref('')

// 设备查询弹窗状态
const deviceQueryModalVisible = ref<boolean>(false)
const queryMode = ref<'auto' | 'manual'>('auto')
const manualQuerySerial = ref('')
const showNoResult = ref(false)

// 扫描相关状态
const isScanning = ref(false)
const progressPercent = ref(0)
const progressMessage = ref('正在扫描设备，稍作等待！')
const scanInterval = ref<number | null>(null)

// 添加记录表单
const addModalVisible = ref(false)
const addFormRef = ref<FormInstance>()
const addForm = ref<any>({
  deviceNumber: '',
  type: '',
  deviceIp: '',
  activationStatus: 0,
  activationTime: null,
  modificationTime: null,
  additionalFunctions: '',
})
const addRules = ref({
  deviceNumber: [{ required: true, message: '请输入设备序列号', trigger: 'blur' }],
  deviceIp: [
    { required: true, message: '请输入设备IP', trigger: 'blur' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '请输入正确的IP地址格式',
      trigger: 'blur',
    },
  ],
  type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
  activationStatus: [{ required: true, message: '请选择激活状态', trigger: 'change' }],
})

// 主页面搜索
const handleSearch = () => {
  activationTableRef.value?.handleSearch?.(searchDeviceNumber.value)
}

// 显示添加模态框
const showAddModal = () => {
  addModalVisible.value = true
  addFormRef.value?.resetFields()
  addForm.value = { ...addForm.value, activationStatus: 0 }
}

// 提交添加表单
const handleAddSubmit = async () => {
  if (!addFormRef.value) return
  const valid = await addFormRef.value.validate()
  if (!valid) return

  try {
    const params = {
      ...addForm.value,
      activationStatus: Number(addForm.value.activationStatus),
      activationTime: addForm.value.activationTime?.format('YYYY-MM-DD') || null,
      modificationTime: addForm.value.modificationTime?.format('YYYY-MM-DD') || null,
    }

    const res = await PostSoftwareActivation(params)
    if (res.code === 200) {
      notification.success({ message: '成功', description: '激活记录添加成功', duration: 3 })
      addModalVisible.value = false
      activationTableRef.value?.refresh?.()
    } else {
      notification.error({
        message: '失败',
        description: res.message || '激活记录添加失败',
        duration: 3,
      })
    }
  } catch (error) {
    console.error('添加失败', error)
    notification.error({ message: '错误', description: '添加过程中发生错误', duration: 3 })
  }
}

// 批量删除
const handleBatchDelete = () => {
  const selection = activationTableRef.value?.tableRef?.gridRef?.getCheckboxRecords()
  if (!selection?.length) {
    message.warning('请先选择要删除的记录')
    return
  }

  Modal.confirm({
    title: '确认删除',
    content: `确定要删除选中的${selection.length}条记录吗？`,
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      try {
        const ids = selection.map((item: any) => item.id)
        const res = await delBatchSoftwareActivation(ids)
        if (res.code === 200) {
          notification.success({ message: '删除成功', description: '记录已成功删除', duration: 3 })
          activationTableRef.value?.refresh?.()
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

// 设备查询模式切换
const handleQueryModeChange = () => {
  // 重置状态
  showNoResult.value = false
  manualQuerySerial.value = ''
  stopScan()
  queryActivationTableRef.value?.handleSearch([]) // 调用表格的搜索方法并传入空数组
}

// 处理进度条
const startProgress = (duration: number, callback: () => void) => {
  // 重置进度状态
  showNoResult.value = false
  progressPercent.value = 0
  isScanning.value = true
  progressMessage.value = '正在扫描设备，稍作等待！'

  // 计算每100ms增加的百分比
  const increment = 100 / (duration * 10)

  // 清除可能存在的旧定时器
  if (scanInterval.value) {
    clearInterval(scanInterval.value)
  }

  // 设置新定时器
  scanInterval.value = window.setInterval(() => {
    progressPercent.value += increment
    if (progressPercent.value >= 100) {
      progressPercent.value = 100
      clearInterval(scanInterval.value as number)
      progressMessage.value = '扫描结束'
      // 延迟执行以显示完成状态
      setTimeout(() => {
        isScanning.value = false
        callback()
      }, 500)
    }
  }, 100)
}

// 停止扫描
const stopScan = () => {
  if (scanInterval.value) {
    clearInterval(scanInterval.value)
    scanInterval.value = null
  }

  if (isScanning.value) {
    isScanning.value = false
    // 立即执行查询
    if (queryMode.value === 'auto') {
      executeAutoQuery()
    } else if (queryMode.value === 'manual') {
      executeManualQuery()
    }
  }
}

// 自动扫描设备查询
const handleAutoQuery = () => {
  showNoResult.value = false
  // 5秒进度条
  startProgress(5, executeAutoQuery)
}

// 执行自动查询
const executeAutoQuery = async () => {
  try {
    const res = await queryDevices({
      needAdd: true,
      pageNum: 1,
      pageSize: 20,
      deviceNumber: '',
    })

    if (res.code === 200) {
      const deviceList = res.data.data || []
      showNoResult.value = !deviceList.length
      if (queryActivationTableRef.value) {
        queryActivationTableRef.value.handleSearch(deviceList)
        queryActivationTableRef.value.setSearchParams({ deviceNumber: '' })
      }
    } else {
      message.error(res.message || '自动扫描设备失败')
      showNoResult.value = false
    }
  } catch (error) {
    console.error('自动扫描失败', error)
    message.error('自动扫描设备失败，请重试')
    showNoResult.value = false
  }
}

// 手动查询设备
const handleManualQuery = () => {
  showNoResult.value = false
  if (!manualQuerySerial.value) {
    message.warning('请输入序列号')
    return
  }

  // 1秒进度条
  startProgress(1, executeManualQuery)
}

// 执行手动查询
const executeManualQuery = async () => {
  if (!manualQuerySerial.value) return

  try {
    const res = await queryDevices({
      needAdd: false,
      pageNum: 1,
      pageSize: 20,
      deviceNumber: manualQuerySerial.value,
    })

    if (res.code === 200) {
      const deviceList = res.data.data || []
      showNoResult.value = !deviceList.length
      queryActivationTableRef.value?.handleSearch(deviceList)
      queryActivationTableRef.value?.setSearchParams({ deviceNumber: manualQuerySerial.value })
    } else {
      message.error(res.message || '查询失败')
      showNoResult.value = false
    }
  } catch (error) {
    console.error('手动查询失败', error)
    message.error('查询失败，请重试')
    showNoResult.value = false
  }
}

// 停止查询
const handleStopQuery = () => {
  stopScan()
  message.info('已停止查询')
}

// 关闭弹窗（统一处理确认和取消按钮逻辑）
const handleModalClose = async () => {
  // 停止可能正在进行的扫描
  stopScan()
  // 调用重置状态接口
  try {
    await resetAllDeviceAddStatus() // 新增的API调用
  } catch (error) {
    console.error('重置设备状态失败', error)
  }
  deviceQueryModalVisible.value = false
  queryMode.value = 'auto'
  showNoResult.value = false
  manualQuerySerial.value = ''
  queryActivationTableRef.value?.handleSearch([])
  // 刷新主页面表格
  activationTableRef.value?.refresh?.()
}

// 主页面重置
const handleMainReset = () => {
  searchDeviceNumber.value = ''
  activationTableRef.value?.handleSearch('')
}

// 弹窗查询重置
const handleQueryReset = async () => {
  manualQuerySerial.value = ''
  try {
    const res = await queryDevices({
      needAdd: false,
      pageNum: 1,
      pageSize: 20,
      deviceNumber: '',
    })
    if (res.code === 200) {
      const deviceList = res.data.data || []
      queryActivationTableRef.value?.handleSearch(deviceList)
      queryActivationTableRef.value?.setSearchParams({ deviceNumber: '' })
    } else {
      message.error(res.message || '重置失败')
    }
  } catch (error) {
    console.error('弹窗重置失败', error)
    message.error('重置失败，请重试')
  }
}

// 监听弹窗显示，重置状态
watch(
  () => deviceQueryModalVisible.value,
  (newVal) => {
    if (newVal) {
      queryMode.value = 'auto'
      showNoResult.value = false
      manualQuerySerial.value = ''
      stopScan()
    }
  },
)

// 组件卸载时清理定时器
onUnmounted(() => {
  if (scanInterval.value) {
    clearInterval(scanInterval.value)
  }
})

onMounted(() => {
  // 初始化主页面表格
  activationTableRef.value?.refresh?.()
})
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.content-box {
  padding: 20px 0px 0px 0px;
}

.label {
  font-size: 15px;
  font-weight: bold;
  color: #666;
  line-height: 32px;
  display: inline-block;
  margin-right: 10px;
}

// 重置按钮样式
.reset-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 32px;

  .reset-icon {
    margin-right: 4px;
    font-size: 14px;
  }

  span {
    font-size: 14px;
    line-height: 1;
  }
}

:deep(.vxe-table .vxe-cell) {
  &.activation-status-cell {
    cursor: pointer;
  }
}

.select-mode {
  margin-bottom: 10px;
}

// 进度条样式
.progress-container {
  margin-top: 12px;
  padding-left: 0;
  width: 60%;
}

.progress-message {
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.progress-bar {
  width: 100%;
}

// 弹窗内容容器（避免底部按钮覆盖内容）
.modal-content {
  margin-bottom: 60px; // 给底部按钮留出空间
}

// 自定义弹窗底部样式（居中显示）
.modal-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  text-align: center;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: center; // 水平居中
}
</style>
