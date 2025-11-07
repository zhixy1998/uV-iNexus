<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <section>
    <section>
      <div class="flex items-center justify-between !mb-3">
        <div class="title" :style="{ color: primaryColor }">标准列表</div>
        <div class="flex">
          <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleImport">
            <template #icon>
              <upload-outlined />
            </template>
            导入
          </a-button>
          <a-button type="primary" class="!flex flex-row items-center !mr-10" @click="handleExport">
            <template #icon>
              <download-outlined />
            </template>
            导出
          </a-button>
          <a-button
            type="primary"
            class="!flex flex-row items-center !mr-10"
            @click="handleUpgrade()"
          >
            <template #icon>
              <rise-outlined />
            </template>
            升级
          </a-button>
          <a-button
            type="primary"
            danger
            class="!flex flex-row items-center !text-[#fff]"
            @click="handleDelete(1)"
          >
            <template #icon>
              <delete-outlined />
            </template>
            批量删除
          </a-button>
        </div>
      </div>
      <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
      <div class="content-box">
        <div class="flex flex-row flex-wrap justify-between !mb-4">
          <div class="flex flex-row flex-wrap">
            <div class="!mr-6 !mt-5 search-item">
              <a-input
                v-model:value="ruleForm.standard_name"
                placeholder="请输入"
                class="!w-[230px]"
              />
              <div class="label">标准名称</div>
            </div>
            <div class="!mr-6 !mt-5 search-item">
              <a-range-picker
                v-model:value="ruleForm.dateRange"
                valueFormat="YYYY-MM-DD"
                :placeholder="['开始日期', '结束日期']"
                class="!w-[230px]"
              />
              <div class="label">发布时间</div>
            </div>
            <div class="!mt-5 search-item">
              <a-input v-model:value="ruleForm.industry" placeholder="请输入" class="!w-[230px]" />
              <div class="label">行业</div>
            </div>
          </div>
          <div class="!mt-5 flex flex-row items-center">
            <a-button @click="handleSearch(0)">清空</a-button>
            <a-button type="primary" class="!ml-4" @click="handleSearch(1)">搜索</a-button>
          </div>
        </div>
        <vxeTable ref="tableRef" :options="tableOptions" @changePage="handlePageChange">
          <template #active="{ row }">
            <text
              class="cursor-pointer !mr-5"
              :style="{ color: primaryColor }"
              @click="handleDetail(row)"
              >详情</text
            >
            <text class="cursor-pointer" :style="{ color: '#f5222d' }" @click="handleDelete(2, row)"
              >刪除</text
            >
          </template>
        </vxeTable>
      </div>
    </section>
    <section>
      <div class="title !mb-3" :style="{ color: primaryColor }">标准统计</div>
      <a-divider :style="{ backgroundColor: primaryColor, margin: 0 }" />
      <div class="flex justify-between content-box">
        <div class="echarts-box">
          <div class="text-[14px] !font-bold">按类型统计</div>
          <echarts-rose :seriesData="seriesDataType" id="echartsRoseType" />
        </div>
        <div class="echarts-box">
          <div class="text-[14px] !font-bold">按行业统计</div>
          <echarts-rose :seriesData="seriesDataIndustry" id="echartsRoseIndustry" />
        </div>
      </div>
    </section>
    <upgrade-modal ref="upgradeModalRef" @fetchData="fetchData" />
    <import-modal
      ref="importModalRef"
      :acceptTypes="'.xls,.xlsx'"
      importUrl="/com/persee/workstation/uv-inexus/parseReport/import"
      @import-success="importSuccess"
    />
    <detail-modal ref="detailModalRef" />
  </section>
</template>

<script setup lang="ts">
import {
  DeleteOutlined,
  DownloadOutlined,
  RiseOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue'
import { message, Modal, notification } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

import {
  delBatchStandard,
  delStandard,
  exportStandard,
  getStandardIndustry,
  getStandardList,
  getStandardType,
} from '@/api'
import EchartsRose from '@/components/echartsRose/index.vue'
import vxeTable from '@/components/vxeTable/index.vue'
import { useDownloadFile } from '@/composables/useDownloadFile'
import { useAppStore } from '@/stores'

import detailModal from './components/detailModal.vue'
import upgradeModal from './components/upgradeModal.vue'

const { primaryColor } = useAppStore()

// 筛选
const ruleForm = ref({
  standard_name: '',
  industry: '',
  dateRange: [],
})
const handleSearch = (type: number) => {
  if (!type)
    ruleForm.value = {
      standard_name: '',
      industry: '',
      dateRange: [],
    }
  tableOptions.value.pagerConfig.currentPage = 1
  fetchData()
}

// 表格数据
const tableRef = ref()
const tableOptions = ref({
  loading: false,
  sortConfig: {
    remote: true,
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
  },
  columns: [
    { type: 'checkbox', fixed: 'left', width: 60 },
    {
      field: 'industry',
      title: '行业',
      minWidth: 100,
      fixed: 'left',
    },
    {
      field: 'standardNumber',
      title: '标准号',
      minWidth: 100,
      fixed: 'left',
    },
    {
      field: 'standardName',
      title: '标准名称',
      minWidth: 170,
      fixed: 'left',
    },
    {
      field: 'industryType',
      title: '标准类型',
      minWidth: 100,
    },
    {
      field: 'releaseDate',
      title: '发布时间',
      minWidth: 150,
    },
    {
      field: 'effectiveDate',
      title: '生效日期',
      minWidth: 150,
    },
    {
      field: 'expirationDate',
      title: '失效时间',
      minWidth: 150,
    },
    {
      field: 'count',
      title: '对应的检测方法数量',
      minWidth: 160,
      formatter: ({ row }: { row: any }) => {
        return row.count + '个'
      },
    },
    {
      field: 'releaseStatus',
      title: '状态',
      minWidth: 100,
    },
    {
      title: '操作',
      field: 'operation',
      fixed: 'right',
      minWidth: 120,
      slots: {
        default: 'active', // 关键点：将这一列的渲染绑定到 table-active 插槽
      },
    },
  ],
  data: [] as any[],
})
const fetchData = async () => {
  tableOptions.value.loading = true
  const { code, data } = await getStandardList({
    pageNum: tableOptions.value.pagerConfig.currentPage,
    pageSize: tableOptions.value.pagerConfig.pageSize,
    standard_name: ruleForm.value.standard_name,
    industry: ruleForm.value.industry,
    startDate:
      ruleForm.value.dateRange && ruleForm.value.dateRange.length
        ? ruleForm.value.dateRange[0]
        : '',
    endDate:
      ruleForm.value.dateRange && ruleForm.value.dateRange.length
        ? ruleForm.value.dateRange[1]
        : '',
  })
  if (code === 200) {
    tableOptions.value.data = data.data
    tableOptions.value.pagerConfig.total = data.total || 0
  }
  tableOptions.value.loading = false
}
const handlePageChange = ({ currentPage, pageSize }: { currentPage: number; pageSize: number }) => {
  tableOptions.value.pagerConfig.currentPage = currentPage
  tableOptions.value.pagerConfig.pageSize = pageSize
  fetchData()
}

// 导入
const importModalRef = ref()
const handleImport = () => {
  importModalRef.value.showModal()
}
const importSuccess = (res: any) => {
  if (res.code == 200) {
    if (res.data) {
      notification.success({
        message: '成功！',
        description: res.message || '导入成功！',
        duration: 3,
      })
      importModalRef.value.handleCancel()
      fetchData()
    } else {
      Modal.confirm({
        title: '提示',
        content: res.message || '导入失败！',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {},
      })
    }
  }
}
// 导出
const handleExport = async () => {
  const selection = tableRef.value.gridRef.getCheckboxRecords()
  const exportIds = selection.map((item: any) => item.id)
  const query = {
    isAll: exportIds.length ? 0 : 1,
    exportIds: exportIds.join(','),
    queryParams: {
      standard_name: ruleForm.value.standard_name,
      industry: ruleForm.value.industry,
      startDate:
        ruleForm.value.dateRange && ruleForm.value.dateRange.length
          ? ruleForm.value.dateRange[0]
          : '',
      endDate:
        ruleForm.value.dateRange && ruleForm.value.dateRange.length
          ? ruleForm.value.dateRange[1]
          : '',
    },
  }
  const res = await exportStandard(query)
  useDownloadFile(res, '标准列表.xlsx')
}

// 升级
const upgradeModalRef = ref()
const handleUpgrade = () => {
  upgradeModalRef.value.showModal()
}

// 删除
const handleDelete = (type: number, record?: any) => {
  Modal.confirm({
    title: '提示',
    content: '是否确认删除？',
    okText: '确认',
    cancelText: '取消',
    centered: true,
    onOk: async () => {
      let res: any
      if (type === 1) {
        // 批量删除
        const selection = tableRef.value.gridRef.getCheckboxRecords()
        if (!selection.length) {
          message.warning('未选中任何行！')
          return
        } else {
          const ids = selection.map((item: any) => item.id)
          if (!ids.length) {
            message.warning('选中的数据不符合操作条件！')
            return
          }
          res = await delBatchStandard(ids)
        }
      } else {
        // 单个删除
        res = await delStandard(record.id)
      }
      if (res.code === 200) {
        notification.success({
          message: '成功！',
          description: res.message,
          duration: 3,
        })
        fetchData()
      }
    },
    onCancel() {},
  })
}

// 详情
const detailModalRef = ref()
const handleDetail = (record: any) => {
  console.log('handleDetail', record)
  detailModalRef.value.showModal(record.id)
}

// 按类型统计
const seriesDataType = ref([])
const getStandardTypeEcharts = async () => {
  const { code, data } = await getStandardType()
  if (code === 200) {
    seriesDataType.value = data.map((item: { name: string; num: number }) => {
      return {
        name: item.name,
        value: item.num,
      }
    })
  }
}

// 按行业统计
const seriesDataIndustry = ref([])
const getStandardIndustryEcharts = async () => {
  const { code, data } = await getStandardIndustry()
  if (code === 200) {
    seriesDataIndustry.value = data.map((item: { name: string; num: number }) => {
      return {
        name: item.name,
        value: item.num,
      }
    })
  }
}

onMounted(() => {
  fetchData()
  getStandardTypeEcharts()
  getStandardIndustryEcharts()
})
</script>

<style scoped lang="less">
.title {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.search-item {
  position: relative;
  .label {
    position: absolute;
    top: -15px;
    left: 10px;
    margin: 0px 2px;
    font-size: 15px;
    font-weight: bold;
    background-color: #fff;
    color: #666;
  }
}

.content-box {
  padding: 10px 20px;
  .echarts-box {
    margin-top: 5px;
    width: 50%;
  }
}
</style>
