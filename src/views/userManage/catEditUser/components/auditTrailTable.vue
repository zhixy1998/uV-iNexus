<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="audit-trail-table">
    <!-- 审计日志表格 -->
    <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
      <!-- 状态列插槽：1-成功（绿色），0-失败（红色） -->
      <template #status="scope">
        <span
          :style="{
            color: scope.row.status === 1 ? '#52c41a' : '#f5222d',
            fontWeight: 500,
          }"
        >
          {{ scope.row.status === 1 ? '成功' : '失败' }}
        </span>
      </template>

      <!-- 时间格式化插槽：将UTC时间转为本地时间 -->
      <template #createTime="scope">
        <span>{{ formatDateTime(scope.row.createTime) }}</span>
      </template>

      <!-- 参数/结果预览插槽：点击显示详情弹窗 -->
      <template #params="scope">
        <span
          class="cursor-pointer text-primary"
          @click="showDetailModal('请求参数', scope.row.params)"
        >
          查看
        </span>
      </template>
      <template #result="scope">
        <span
          v-if="scope.row.result"
          class="cursor-pointer text-primary"
          @click="showDetailModal('返回结果', scope.row.result)"
        >
          查看
        </span>
        <span v-else class="text-gray-400">无</span>
      </template>

      <!-- 错误信息插槽：失败时显示错误信息 -->
      <template #errorMsg="scope">
        <span
          v-if="scope.row.errorMsg"
          class="text-red-500 cursor-pointer"
          @click="showDetailModal('错误信息', scope.row.errorMsg)"
        >
          查看
        </span>
        <span v-else class="text-gray-400">无</span>
      </template>
    </vxeTable>

    <!-- 详情弹窗：查看参数/结果/错误信息 -->
    <a-modal
      v-model:visible="detailModalVisible"
      :title="detailModalTitle"
      width="600"
      ok-text="关闭"
      @ok="detailModalVisible = false"
    >
      <div class="detail-content">
        <pre>{{ formattedDetailContent }}</pre>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { computed, defineExpose, defineProps, onMounted, ref } from 'vue'
// 引入审计日志接口
import { getauditTrailData } from '@/api/userManage'
// 引入表格组件
import vxeTable from '@/components/vxeTable/index.vue'

/**
 * 定义Props：仅保留主题色（审计日志无需操作列和查询模态框）
 */
const props = defineProps({
  primaryColor: {
    type: String,
    default: '#1890ff',
  },
})

/**
 * 表格配置：适配审计日志数据结构
 */
const tableOptions = ref({
  loading: false,
  sortConfig: { remote: true }, // 远程排序（如需支持可扩展）
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50], // 支持切换页大小
  },
  columns: [
    // 序号列
    { type: 'checkbox', width: 60, fixed: 'left' },
    // 用户名（固定列）
    { field: 'username', title: '操作用户', minWidth: 120, fixed: 'left' },
    // 操作模块
    { field: 'module', title: '操作模块', minWidth: 120 },
    // 操作描述
    { field: 'description', title: '操作描述', minWidth: 120 },
    // 返回结果（查看弹窗）
    { field: 'result', title: '返回结果', minWidth: 100, slots: { default: 'result' } },
    // 操作IP
    { field: 'ip', title: '操作IP', minWidth: 120 },
    // 操作状态（成功/失败）
    { field: 'status', title: '操作状态', minWidth: 100, slots: { default: 'status' } },
    // 错误信息（查看弹窗）
    { field: 'errorMsg', title: '错误信息', minWidth: 100, slots: { default: 'errorMsg' } },
    // 操作时间（格式化）
    { field: 'createTime', title: '操作时间', minWidth: 180, slots: { default: 'createTime' } },
  ],
  data: [] as any[], // 审计日志数据列表
})

/**
 * 详情弹窗状态
 */
const detailModalVisible = ref(false)
const detailModalTitle = ref('')
const detailContent = ref('')
// 格式化详情内容（JSON字符串转格式化JSON）
const formattedDetailContent = computed(() => {
  try {
    // 尝试解析JSON（参数/结果是JSON字符串）
    return JSON.stringify(JSON.parse(detailContent.value), null, 2)
  } catch (error) {
    // 非JSON格式直接返回（如错误信息）
    return detailContent.value
  }
})

/**
 * 搜索参数：整合分页+查询条件
 */
const currentSearchParams = ref({
  pageNum: 1,
  pageSize: 10,
  username: '', // 用户名模糊查询
  module: '', // 操作模块模糊查询
  ip: '', // IP模糊查询
})

/**
 * 表格引用
 */
const tableRef = ref<any>()

/**
 * 格式化UTC时间为本地时间（如：2025-09-09 12:14:45）
 */
const formatDateTime = (utcTime: string) => {
  if (!utcTime) return ''
  const date = new Date(utcTime)
  return date
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-')
}

/**
 * 显示详情弹窗（参数/结果/错误信息）
 */
const showDetailModal = (title: string, content: string) => {
  detailModalTitle.value = title
  detailContent.value = content || '无数据'
  detailModalVisible.value = true
}

/**
 * 设置搜索参数（接收父组件传递的查询条件）
 */
const setSearchParams = (params: Partial<typeof currentSearchParams.value>) => {
  currentSearchParams.value = { ...currentSearchParams.value, ...params }
}

/**
 * 加载审计日志数据
 */
const fetchData = async () => {
  tableOptions.value.loading = true
  try {
    // 调用审计日志接口：传递分页+搜索参数
    const res = await getauditTrailData(currentSearchParams.value)
    if (res.code === 200 && res.data) {
      // 更新表格数据
      tableOptions.value.data = res.data.data || []
      // 更新分页信息
      tableOptions.value.pagerConfig = {
        total: res.data.total || 0,
        currentPage: res.data.pageNum || 1,
        pageSize: res.data.pageSize || 10,
        pageSizes: [10, 20, 50],
      }
    } else {
      message.error(res.message || '获取审计日志失败')
    }
  } catch (error) {
    console.error('获取审计日志异常：', error)
    message.error('获取审计日志失败，请重试')
  } finally {
    tableOptions.value.loading = false
  }
}

/**
 * 分页变化事件（页码/页大小改变）
 */
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  currentSearchParams.value.pageNum = currentPage
  currentSearchParams.value.pageSize = pageSize
  fetchData()
}

/**
 * 页面挂载时初始化数据
 */
onMounted(() => {
  fetchData()
})

/**
 * 暴露给父组件的方法
 */
defineExpose({
  refresh: fetchData, // 刷新表格
  setSearchParams, // 设置搜索参数
  tableRef, // 表格引用（如需扩展）
})
</script>

<style scoped lang="less">
.audit-trail-table {
  width: 100%;
}

// 详情弹窗内容样式
.detail-content {
  max-height: 400px;
  overflow-y: auto;
  pre {
    white-space: pre-wrap;
    word-break: break-all;
    color: #333;
    font-size: 14px;
  }
}

// 状态列/链接文字样式
.text-primary {
  // color: @primary-color;
  &:hover {
    text-decoration: underline;
  }
}

.text-gray-400 {
  color: #ccc;
}

.text-red-500 {
  color: #f5222d;
}

// 表格tooltip样式（适配方法名过长）
:deep(.vxe-tooltip-content) {
  max-width: 600px !important;
  white-space: pre-wrap !important;
}
</style>
