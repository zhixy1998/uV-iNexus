<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <div class="detail-card">
      <div class="flex items-center justify-between !mb-3">
        <div class="detail-card-title">追踪审计</div>
      </div>

      <!-- 内容容器 -->
      <div class="content-box">
        <!-- 采用flex容器确保左侧搜索区和右侧导出按钮的布局 -->
        <div class="search-container !mb-5">
          <!-- 左侧搜索区域：包含输入框和搜索/重置按钮 -->
          <div class="search-group">
            <div class="flex flex-row items-center">
              <span class="label mr-2">用户名：</span>
              <a-input
                v-model:value="searchParams.username"
                placeholder="请输入用户名"
                class="!w-[180px] !mr-4"
                @press-enter="handleSearch"
              />
            </div>

            <div class="flex flex-row items-center">
              <span class="label mr-2">操作IP：</span>
              <a-input
                v-model:value="searchParams.ip"
                placeholder="请输入IP地址"
                class="!w-[180px] !mr-4"
                @press-enter="handleSearch"
              />
            </div>

            <!-- 搜索/重置按钮区：优化图标与文字对齐 -->
            <div class="button-group">
              <a-button type="primary" class="search-btn !mr-2" @click="handleSearch">
                <template #icon>
                  <SearchOutlined class="icon" />
                </template>
                搜索
              </a-button>
              <a-button
                type="default"
                class="reset-btn"
                @click="handleMainReset"
                :disabled="!Object.values(searchParams).some((v) => v)"
              >
                <template #icon>
                  <ReloadOutlined class="icon" />
                </template>
                重置
              </a-button>
            </div>
          </div>

          <!-- 右侧导出按钮：固定在最右侧 -->
          <div class="export-group">
            <a-button type="primary" class="export-btn" @click="exportLog">
              <template #icon>
                <DownloadOutlined class="icon" />
              </template>
              导出
            </a-button>
          </div>
        </div>
      </div>

      <!-- 主表格组件：审计日志表格 -->
      <AuditTrailTable ref="auditTableRef" :primaryColor="primaryColor" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import { DownloadOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import AuditTrailTable from './auditTrailTable.vue'

// 全局状态：主题色
const { primaryColor } = useAppStore()
const auditTableRef = ref<any>()

// 搜索参数：包含用户名、模块、IP（模块虽未显示在页面，但保留参数避免异常）
const searchParams = ref({
  username: '',
  module: '',
  ip: '',
})

/**
 * 搜索事件：带条件查询列表
 */
const handleSearch = () => {
  if (auditTableRef.value) {
    // 传递当前搜索参数 + 重置页码为1
    auditTableRef.value.setSearchParams({
      ...searchParams.value,
      pageNum: 1,
    })
    // 刷新表格数据（加载搜索结果）
    auditTableRef.value.refresh()
  }
}

/**
 * 重置事件：清空搜索框 + 加载无条件的完整列表
 */
const handleMainReset = () => {
  // 1. 清空所有搜索参数（用户名、IP、模块）
  searchParams.value = {
    username: '',
    module: '',
    ip: '',
  }

  // 2. 通知子表格：传递空搜索参数 + 重置页码为1
  if (auditTableRef.value) {
    auditTableRef.value.setSearchParams({
      username: '',
      module: '',
      ip: '',
      pageNum: 1,
      pageSize: 10,
    })
    // 3. 刷新表格（加载无搜索条件的完整列表）
    auditTableRef.value.refresh()
  }
}

/**
 * 导出事件（暂未开发）
 */
const exportLog = () => {
  // 后续可补充导出逻辑，如调用导出接口传递当前搜索参数
  console.log('触发导出，当前搜索参数：', searchParams.value)
  // 示例：若有导出接口可这样调用
  // exportAuditLog({ ...searchParams.value }).then(res => {
  //   if (res.code === 200) {
  //     // 处理文件下载逻辑
  //   }
  // })
}

/**
 * 页面挂载初始化：加载无条件的完整列表
 */
onMounted(() => {
  auditTableRef.value?.refresh?.()
})
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.content-box {
  padding: 20px 0 0 0;
}

// 主搜索容器：确保左侧内容和右侧导出按钮布局
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; // 左侧搜索区和右侧导出按钮分开
  width: 100%;
  flex-wrap: wrap; // 适配小屏幕换行
  gap: 10px; // 换行时的间距
}

// 左侧搜索区域组合
.search-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap; // 小屏幕时输入框和按钮可换行
  gap: 16px; // 各元素之间的间距
}

// 标签样式优化
.label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  line-height: 32px;
  display: inline-block;
  white-space: nowrap; // 防止标签文字换行
}

// 按钮组样式
.button-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px; // 搜索和重置按钮间距
}

// 右侧导出按钮容器
.export-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

// 按钮图标与文字对齐优化
.search-btn,
.reset-btn,
.export-btn {
  display: inline-flex;
  align-items: center; // 垂直居中对齐
  justify-content: center; // 水平居中对齐
  padding: 0 16px;

  .icon {
    margin-right: 6px; // 图标与文字间距
    font-size: 14px; // 图标大小与文字匹配
  }

  span {
    font-size: 14px;
    line-height: 1; // 确保文字不占额外高度
  }
}

// 导出按钮特殊样式
.export-btn {
  background-color: #52c41a; // 导出按钮用绿色区分
  border-color: #52c41a;

  &:hover {
    background-color: #73d13d !important;
    border-color: #73d13d !important;
  }
}

// 响应式调整：小屏幕时元素换行
@media (max-width: 1024px) {
  .search-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .export-group {
    align-self: flex-end; // 导出按钮仍靠右
  }
}

@media (max-width: 768px) {
  .search-group {
    width: 100%;
  }

  .export-group {
    align-self: flex-start; // 极小屏幕导出按钮也换行到左侧
    margin-top: 10px;
  }
}
</style>
